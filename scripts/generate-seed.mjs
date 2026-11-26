import {writeFile} from 'node:fs/promises';
import {seedProducts,config} from '../public/data.js';
const lit=x=>"'"+JSON.stringify(x).replaceAll("'","''")+"'::jsonb";
let sql='-- Catálogo inicial. No pisa productos, precios o sucursales ya cargados.\nbegin;\n';
for(const p of seedProducts){const {price,stock,active,...data}=p;sql+=`insert into public.products(id,data,retail_price,stock,active) values('${p.id}',${lit(data)},0,null,true) on conflict(id) do nothing;\ninsert into public.wholesale_prices(product_id,price) values('${p.id}',0) on conflict(product_id) do nothing;\n`;}
for(const b of config.branches)sql+=`insert into public.branches(id,data) values('${b.id}',${lit(b)}) on conflict(id) do nothing;\n`;
sql+=`insert into public.site_settings(id,data) values('brand',${lit({name:config.name,city:config.city,logo:config.logo,colors:config.colors})}) on conflict(id) do nothing;\ncommit;\n`;
await writeFile('supabase/migrations/002_catalog.sql',sql);
