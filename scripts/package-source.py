"""Empaqueta solo los archivos de fuente; no incluye secretos, dependencias o estado local."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
root=Path(__file__).resolve().parent.parent
include=['supabase','public','docs','scripts','tests','README.md','package.json','package-lock.json','.gitignore','.openai/hosting.json']
with ZipFile(root/'dist'/'la-montevideana.zip','w',ZIP_DEFLATED) as z:
 for name in include:
  p=root/name
  files=sorted(p.rglob('*')) if p.is_dir() else [p]
  for f in files:
   if f.is_file() and '__pycache__' not in f.parts:
    z.write(f,Path('la-montevideana')/f.relative_to(root))
print('Código y documentación empaquetados sin secretos.')
