import {readFile,writeFile} from 'node:fs/promises';
const files=['supabase/migrations/001_accounts.sql','supabase/migrations/002_catalog.sql'];
await writeFile('supabase/INSTALAR.sql','-- LA MONTEVIDEANA: ejecutar completo en SQL Editor.\n-- No asigna administradores ni modifica los precios ya guardados.\n\n'+(await Promise.all(files.map(f=>readFile(f,'utf8')))).join('\n'));
