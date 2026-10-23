"""Prepara el audio de una pieza del Open House 2026.

    python herramientas/preparar_audio.py <archivo crudo> <codigo>

Toma lo que llegó (.opus de WhatsApp, .m4a de iPhone, .mp3, un video…) y deja
open-2026/audio/<codigo>.m4a listo para publicar:

  · AAC en .m4a, mono, 40 kbps (32, 24, 20 o 15 si hace falta para no pasar de 400 kB:
    las grabaciones no se cortan).
    No Opus en .ogg: no se reproduce en iPhones viejos.
  · El volumen normalizado con loudnorm, en dos pasadas (−16 LUFS): el chico
    tímido y el que grita salen igual de fuerte.
  · Sin el silencio del principio y del final.
  · Sin metadatos.

Después anota el audio en open2026/piezas.py. Hace falta ffmpeg instalado
(winget install Gyan.FFmpeg). El archivo crudo no se toca ni se copia al
repositorio.
"""
import argparse
import json
import os
import pathlib
import re
import shutil
import subprocess
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import _piezas  # noqa: E402

OBJETIVO = 'I=-16:TP=-1.5:LRA=11'
# El silencio se recorta antes de normalizar, con un umbral relativo al volumen
# de la grabación: 20 dB por debajo de la voz. Con un umbral fijo, al susurro se
# le sube también el ruido de fondo y el silencio no se va.
DEBAJO_DE_LA_VOZ = 20
MAX_KB = 400


def programa(nombre):
    """ffmpeg o ffprobe: del PATH o de donde los deja winget."""
    hallado = shutil.which(nombre)
    if hallado:
        return hallado
    for base in (os.environ.get('LOCALAPPDATA', ''), os.environ.get('ProgramFiles', '')):
        for cand in pathlib.Path(base, 'Microsoft', 'WinGet').glob(f'**/{nombre}.exe'):
            return str(cand)
    sys.exit(f'No encuentro {nombre}. Instalalo con: winget install Gyan.FFmpeg')


def corre(args):
    r = subprocess.run(args, capture_output=True, text=True, encoding='utf-8', errors='replace')
    if r.returncode:
        sys.exit('ffmpeg falló:\n' + r.stderr[-1500:])
    return r


def duracion(ffprobe, ruta):
    r = corre([ffprobe, '-v', 'error', '-show_entries', 'format=duration', '-of', 'json', str(ruta)])
    return float(json.loads(r.stdout)['format']['duration'])


def main():
    _piezas.utf8()
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('crudo')
    ap.add_argument('codigo')
    ap.add_argument('--no-anotar', action='store_true', help='no tocar piezas.py')
    ap.add_argument('--numero', type=int, default=1,
                    help='2 para el audio del segundo problema del mismo alumno')
    a = ap.parse_args()
    crudo = pathlib.Path(a.crudo)
    cod = a.codigo.strip().lower()
    if not crudo.is_file():
        sys.exit(f'No existe {crudo}')
    if not _piezas.CODIGO.match(cod):
        sys.exit(f'«{cod}» no es un código (por ejemplo 3-07)')
    if not a.no_anotar and not _piezas.existe(cod):
        sys.exit(f'{cod} no está en open2026/piezas.py. ¿Está bien escrito el código?')
    ffmpeg, ffprobe = programa('ffmpeg'), programa('ffprobe')

    # 1.ª pasada: medir el volumen
    r = corre([ffmpeg, '-hide_banner', '-nostats', '-i', str(crudo), '-vn',
               '-af', f'highpass=f=80,loudnorm={OBJETIVO}:print_format=json', '-f', 'null', '-'])
    medido = json.loads(re.findall(r'\{[^{}]*"input_i"[^{}]*\}', r.stderr)[-1])
    if not re.fullmatch(r'-?\d+(\.\d+)?', str(medido['input_i']).strip()) or float(medido['input_i']) < -70:
        sys.exit(f'{crudo.name}: la grabación está en silencio (volumen {medido["input_i"]} LUFS). '
                 'Pedile al alumno que la vuelva a mandar.')
    ln = (f'loudnorm={OBJETIVO}:measured_I={medido["input_i"]}:measured_TP={medido["input_tp"]}'
          f':measured_LRA={medido["input_lra"]}:measured_thresh={medido["input_thresh"]}'
          f':offset={medido["target_offset"]}:linear=true')
    umbral = float(medido['input_i']) - DEBAJO_DE_LA_VOZ
    corta = (f'silenceremove=start_periods=1:start_threshold={umbral:.1f}dB:start_silence=0.3'
             ':detection=rms')
    filtro = f'highpass=f=80,{corta},areverse,{corta},areverse,{ln}'

    # 2.ª pasada: recortar, normalizar y codificar
    destino = _piezas.MODULO / 'audio' / _piezas.nombre_archivo(cod, a.numero, '.m4a')
    destino.parent.mkdir(parents=True, exist_ok=True)
    # Los escalones bajos son solo para las grabaciones muy largas: no se cortan.
    # El último baja también el muestreo, que para voz alcanza y suena mejor a 15 kbps.
    for kbps, hz in ((40, 44100), (32, 44100), (24, 44100), (20, 44100), (15, 22050)):
        corre([ffmpeg, '-hide_banner', '-nostats', '-y', '-i', str(crudo), '-vn', '-sn', '-dn',
               '-af', filtro, '-ac', '1', '-ar', str(hz), '-c:a', 'aac', '-b:a', f'{kbps}k',
               '-map_metadata', '-1', '-movflags', '+faststart', str(destino)])
        kb = destino.stat().st_size / 1024
        if kb <= MAX_KB:
            break
    seg_crudo, seg = duracion(ffprobe, crudo), duracion(ffprobe, destino)
    print(f'{cod}: {crudo.name} ({seg_crudo:.1f} s, {float(medido["input_i"]):.0f} LUFS) → '
          f'{destino.relative_to(_piezas.RAIZ).as_posix()} ({seg:.1f} s, {kb:.0f} kB, {kbps} kbps)')
    if seg < 3:
        print('  ¡Ojo! Quedó de menos de 3 segundos: ¿la grabación está cortada o es casi todo silencio?')
    if kb > MAX_KB:
        print(f'  ¡Ojo! Pesa más de {MAX_KB} kB: dura {seg:.0f} s. Habría que recortarla.')
    if not a.no_anotar:
        antes = _piezas.pone(cod, 'audio', destino.name, a.numero)
        print(f'  piezas.py: audio {antes!r} → {destino.name!r}. Falta correr build.py.')


if __name__ == '__main__':
    main()
