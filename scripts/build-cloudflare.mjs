import {cp,mkdir,rm,readFile,writeFile,readdir,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {dirname,resolve,join} from 'node:path';
// Cloudflare Pages publica archivos estáticos en la raíz del dominio.
// No requiere Python, credenciales ni el manifiesto privado de alojamiento de Sites.
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const output=join(root,'dist');
await rm(output,{recursive:true,force:true});
await mkdir(output,{recursive:true});
await cp(join(root,'public'),output,{recursive:true});
const index=await readFile(join(output,'index.html'),'utf8');
if(!index.includes('id="app"'))throw Error('No se encontró el punto de entrada de la aplicación.');
const required=['app.js','catalog.js','data.js','domain.js','backend.js','auth-errors.js','supabase-config.js','vendor/supabase.js','styles.css','visual.css','assets/logo-montevideana.webp'];
for(const file of required){await stat(join(output,file));}
async function verifySize(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const path=join(dir,entry.name);if(entry.isDirectory())await verifySize(path);else if((await stat(path)).size>25*1024*1024)throw Error('Archivo mayor al límite de Pages: '+entry.name)}}
await verifySize(output);
await writeFile(join(output,'_headers'),'/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n');
console.log('Cloudflare Pages: sitio generado en dist/ (sin ZIP de fuente ni documentación técnica pública).');
