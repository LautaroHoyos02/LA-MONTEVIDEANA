import {cp,mkdir,rm,readFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
const config=JSON.parse(await readFile('.openai/hosting.json','utf8'));
if(!config.project_id)throw Error('Falta project_id');
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});await cp('public','dist',{recursive:true});
// La documentación técnica se entrega en el ZIP de fuente, fuera de la interfaz comercial.
execFileSync(process.platform==='win32'?'py':'python3',['scripts/package-source.py'],{stdio:'inherit'});
console.log('Build completo: dist/');
