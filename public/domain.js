export function totals(cart,products){
 const lines=cart.map(l=>{const p=products.find(p=>p.id===l.id&&p.active);if(!p)return null;const qty=Math.max(0,Math.min(9999,Math.floor(Number(l.qty)||0)));return{...p,qty,unit:p.price,total:p.price*qty};}).filter(l=>l&&l.qty>0);
 const subtotal=lines.reduce((s,l)=>s+l.total,0),count=lines.reduce((s,l)=>s+l.qty,0);
 return{lines,count,subtotal,total:subtotal,pricesPending:lines.some(l=>l.price===0),stockUnknown:lines.some(l=>l.stock===null),stockIssues:lines.filter(l=>l.stock!==null&&l.qty>l.stock),missingProducts:cart.some(l=>!products.some(p=>p.id===l.id&&p.active)),shipping:null,deliveryStatus:'A coordinar por WhatsApp',paymentStatus:'A consultar por WhatsApp'};
}
export function whatsappURL(phone,message){const value=String(phone||'').trim();if(!/^\+?[1-9][0-9\s()-]{7,22}$/.test(value))return null;const digits=value.replace(/\D/g,'');return digits.length>=8&&digits.length<=15?'https://wa.me/'+digits+'?text='+encodeURIComponent(message):null}
export function mergeBranches(defaults,saved=[]){
 return defaults.map(branch=>{const prior=saved.find(b=>b.id===branch.id)||{};return{...branch,address:branch.address||prior.address||'',whatsapp:branch.whatsapp||prior.whatsapp||'',hours:branch.hours||prior.hours||''}});
}
export function selectedBranch(branches,id){const branch=branches.find(b=>b.id===id);if(!branch)throw Error('Elegí una sucursal para retirar tu pedido.');return branch}
export function inquiryMessage(lines,{branch,orderNumber='',notes='',priceTier='retail'}={}){
 if(!branch?.id||!branch?.name)throw Error('Elegí una sucursal para retirar tu pedido.');
 const valid=lines.filter(p=>Number.isInteger(p.qty)&&p.qty>0&&p.qty<=9999);
 if(!valid.length)throw Error('Agregá productos para preparar la consulta.');
 const ars=n=>new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(n);
 const priced=valid.every(p=>Number.isSafeInteger(p.unit??p.price)&&(p.unit??p.price)>=0);
 const sum=valid.reduce((total,p)=>total+(p.unit??p.price??0)*p.qty,0);
 const pricing=priced?'\n\nLista '+(priceTier==='wholesale'?'mayorista':'minorista')+'. Subtotal de referencia: '+ars(sum)+(valid.some(p=>(p.unit??p.price)===0)?' (incluye precios pendientes de carga).':'.'):'';
 const items=valid.map(p=>`• ${p.qty} ${p.saleUnit==='bulto'?(p.qty===1?'bulto':'bultos'):(p.qty===1?'caja':'cajas')} de ${p.name}${priced?' · '+ars(p.unit??p.price)+' por '+(p.saleUnit==='bulto'?'bulto':'caja'):''}`).join('\n');
 return `Hola, La Montevideana. Quiero consultar este pedido para retirar en la sucursal ${branch.name}.${orderNumber?' Referencia: '+orderNumber+'.':''}\n\n${items}${pricing}\n\n¿Tienen stock disponible de estos productos y cantidades?\n¿Qué medios de pago aceptan y cuál sería el importe final?\n¿Para qué fecha estaría disponible para retirar en esta sucursal?\nSi ofrecen envío, ¿cuál sería la fecha disponible y su costo?${String(notes).trim()?'\n\nObservaciones: '+String(notes).trim().slice(0,500):''}\n\nLa consulta no confirma ni reserva el pedido.`;
}
export function csvEscape(v){return '"'+String(v??'').replace(/^[=+\-@\t\r]/,"'$&").replaceAll('"','""')+'"';}
export function parseCSV(input){const rows=[];let row=[],cell='',quoted=false;const data=input.replace(/^\uFEFF/,'');for(let i=0;i<data.length;i++){const c=data[i];if(c==='"'){if(quoted&&data[i+1]==='"'){cell+='"';i++;}else quoted=!quoted;}else if(c===','&&!quoted){row.push(cell);cell='';}else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&data[i+1]==='\n')i++;row.push(cell);if(row.some(Boolean))rows.push(row);row=[];cell='';}else cell+=c;}if(quoted)throw Error('CSV con comillas sin cerrar');row.push(cell);if(row.some(Boolean))rows.push(row);return rows;}
