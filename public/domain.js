export function totals(cart,products,settings,{delivery='pickup',coupon='',wholesale=false}={}){
 const lines=cart.map(l=>{const p=products.find(p=>p.id===l.id&&p.active);if(!p)return null;const qty=Math.max(0,Math.min(Math.floor(Number(l.qty)||0),p.stock));const unit=wholesale&&qty>=settings.wholesaleMin?p.wholesale:p.price;return{...p,qty,unit,total:unit*qty};}).filter(l=>l&&l.qty>0);
 const subtotal=lines.reduce((s,l)=>s+l.total,0);const count=lines.reduce((s,l)=>s+l.qty,0);
 const volume=count>=settings.volumeQty?Math.round(subtotal*settings.volumeDiscount):0;
 const couponDiscount=coupon.toUpperCase()===settings.coupon&&subtotal>=settings.couponMin?Math.round((subtotal-volume)*settings.couponDiscount):0;
 const shipping=delivery==='delivery'&&subtotal<settings.freeShipping?settings.shipping:0;
 return{lines,subtotal,count,volume,couponDiscount,shipping,total:subtotal-volume-couponDiscount+shipping};
}
export function csvEscape(v){return '"'+String(v??'').replace(/^[=+\-@\t\r]/,"'$&").replaceAll('"','""')+'"';}
export function parseCSV(input){
 const rows=[];let row=[],cell='',quoted=false;const data=input.replace(/^\uFEFF/,'');
 for(let i=0;i<data.length;i++){const c=data[i];if(c==='"'){if(quoted&&data[i+1]==='"'){cell+='"';i++;}else quoted=!quoted;}else if(c===','&&!quoted){row.push(cell);cell='';}else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&data[i+1]==='\n')i++;row.push(cell);if(row.some(Boolean))rows.push(row);row=[];cell='';}else cell+=c;}
 if(quoted)throw Error('CSV con comillas sin cerrar');row.push(cell);if(row.some(Boolean))rows.push(row);return rows;
}
