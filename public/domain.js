export function totals(cart,products){
 const lines=cart.map(l=>{const p=products.find(p=>p.id===l.id&&p.active);if(!p)return null;const qty=Math.max(0,Math.min(9999,Math.floor(Number(l.qty)||0)));return{...p,qty,unit:p.price,total:p.price*qty};}).filter(l=>l&&l.qty>0);
 const subtotal=lines.reduce((s,l)=>s+l.total,0),count=lines.reduce((s,l)=>s+l.qty,0);
 return{lines,count,subtotal,total:subtotal,pricesPending:lines.some(l=>l.price===0),stockUnknown:lines.some(l=>l.stock===null),stockIssues:lines.filter(l=>l.stock!==null&&l.qty>l.stock),missingProducts:cart.some(l=>!products.some(p=>p.id===l.id&&p.active)),shipping:null,deliveryStatus:'A coordinar por WhatsApp',paymentStatus:'Pendiente de pago'};
}
export function whatsappURL(phone,message){const value=String(phone||'').trim();if(!/^\+?[1-9][0-9\s()-]{7,22}$/.test(value))return null;const digits=value.replace(/\D/g,'');return digits.length>=8&&digits.length<=15?'https://wa.me/'+digits+'?text='+encodeURIComponent(message):null}
export function inquiryMessage(lines,{orderNumber='',type='stock'}={}){
 const items=lines.map(p=>`• ${p.qty} ${p.saleUnit==='bulto'?(p.qty===1?'bulto':'bultos'):(p.qty===1?'caja':'cajas')} de ${p.name}`).join('\n');
 if(type==='delivery')return `Hola, La Montevideana. Quiero coordinar la entrega del pedido ${orderNumber}.\n${items}\n¿Me confirman el costo de entrega, el día y el horario? También quisiera acordar la forma de pago. No tengo una entrega confirmada todavía.`;
 return `Hola, La Montevideana. Antes de confirmar mi pedido quiero consultar disponibilidad:\n${items}\n¿Hay stock de estas cantidades por caja o bulto? También necesito confirmar el precio mayorista vigente. La consulta no confirma ni reserva el pedido.`;
}
export function canDispatch(order){return order.payment==='Acreditado'&&!order.pricesPending&&order.total>0}
export function csvEscape(v){return '"'+String(v??'').replace(/^[=+\-@\t\r]/,"'$&").replaceAll('"','""')+'"';}
export function parseCSV(input){const rows=[];let row=[],cell='',quoted=false;const data=input.replace(/^\uFEFF/,'');for(let i=0;i<data.length;i++){const c=data[i];if(c==='"'){if(quoted&&data[i+1]==='"'){cell+='"';i++;}else quoted=!quoted;}else if(c===','&&!quoted){row.push(cell);cell='';}else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&data[i+1]==='\n')i++;row.push(cell);if(row.some(Boolean))rows.push(row);row=[];cell='';}else cell+=c;}if(quoted)throw Error('CSV con comillas sin cerrar');row.push(cell);if(row.some(Boolean))rows.push(row);return rows;}
