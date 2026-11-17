export const config = {name:'Distribuidora Libertad',city:'Santiago del Estero',demo:true,shipping:2500,freeShipping:30000,wholesaleMin:6,volumeQty:12,volumeDiscount:.05,coupon:'LIBERTAD10',couponDiscount:.1,couponMin:10000,coverage:['Centro DEMO','Norte DEMO','Sur DEMO'],contact:{address:'Dirección pendiente de confirmar · DEMO',email:'contacto@libertad.example',hours:'Lunes a sábado, de 9 a 18 h · EJEMPLO'},colors:{blue:'#164b91',red:'#ed4946',sky:'#e6f3fc'}};
export const categories=[{id:'todos',name:'Todos los helados',image:'vainilla'},{id:'familiares',name:'Para compartir',subtitle:'Potes y baldes familiares',image:'vainilla',color:'#eaf4fc'},{id:'individuales',name:'Un gustito para vos',subtitle:'Potes individuales',image:'chocolate',color:'#faeadd'},{id:'palitos',name:'Palitos y bombones',subtitle:'Pequeñas alegrías',image:'dulce',color:'#fce8ed'},{id:'cucuruchos',name:'Cucuruchos',subtitle:'Un clásico irresistible',image:'frutilla',color:'#fff1d5'},{id:'comercios',name:'Para tu comercio',subtitle:'Presentaciones grandes',image:'comercio',color:'#e7f2ed'}];
const make=(id,name,flavor,category,image,price,extra={})=>({id,name,flavor,category,image:'/assets/'+image+'.jpg',price,wholesale:Math.round(price*.78/100)*100,brand:'Nube Helados',size:'1 litro',stock:24,active:true,description:'Una propuesta de sabor para disfrutar en cualquier momento. Producto ficticio de demostración. La imagen muestra una presentación ilustrativa del sabor; el envase comercial está pendiente de definir.',...extra});
export const seedProducts=[
make('p01','Clásico de vainilla','Vainilla','familiares','vainilla',6800,{oldPrice:8000,badge:'15% OFF',featured:true,size:'Pote · 1 litro'}),
make('p02','Chocolate tentación','Chocolate','individuales','chocolate',3200,{featured:true,size:'Pote · 250 ml',brand:'Cremolino'}),
make('p03','Frutilla a la crema','Frutilla','cucuruchos','frutilla',2400,{featured:true,size:'Cucurucho · 1 unidad',badge:'Favorito'}),
make('p04','Palito frutos rojos','Frutos rojos','palitos','palitos-frambuesa',1800,{oldPrice:2250,badge:'20% OFF',featured:true,size:'Palito · 1 unidad',brand:'Brisa Fría'}),
make('p05','Dulce de leche clásico','Dulce de leche','familiares','vainilla',7200,{size:'Pote · 1 litro',brand:'Cremolino'}),
make('p06','Chocolate para compartir','Chocolate','familiares','chocolate',12500,{size:'Balde · 3 litros',oldPrice:14000}),
make('p07','Palito de moras','Mora','palitos','familia',2100,{brand:'Brisa Fría',size:'Palito · 1 unidad'}),
make('p08','Vainilla confeti','Vainilla','individuales','comercio',3500,{size:'Pote · 250 ml',brand:'Cremolino',badge:'Nuevo'}),
make('p09','Cucurucho doble frutilla','Frutilla','cucuruchos','frutilla',2900,{size:'Cucurucho doble · 1 unidad'}),
make('p10','Crema americana','Crema','familiares','comercio',11800,{brand:'Cremolino',size:'Balde · 3 litros'}),
make('p11','Vainilla para tu comercio','Vainilla','comercios','vainilla',32000,{size:'Balde · 10 litros',brand:'Nube Profesional',stock:12}),
make('p12','Chocolate profesional','Chocolate','comercios','chocolate',35000,{size:'Balde · 10 litros',brand:'Nube Profesional',stock:8}),
make('p13','Caja palitos de crema','Frutos rojos','comercios','dulce',17500,{brand:'Brisa Fría',size:'Caja · 12 unidades',oldPrice:21000}),
make('p14','Mora familiar','Mora','familiares','familia',7900,{size:'Pote · 1 litro',brand:'Brisa Fría'}),
make('p15','Vainilla de bolsillo','Vainilla','individuales','vainilla',2600,{size:'Pote · 150 ml'}),
make('p16','Dulce de leche cremoso','Dulce de leche','individuales','vainilla',3100,{brand:'Cremolino',size:'Pote · 250 ml'}),
make('p17','Combo tarde en familia','Vainilla','familiares','comercio',14500,{size:'Combo · 2 potes de 1 litro',oldPrice:17000,badge:'Combo'}),
make('p18','Cucurucho crema y frutilla','Frutilla','cucuruchos','frutilla',2500,{size:'Cucurucho · 1 unidad'}),
make('p19','Frutilla para tu kiosco','Frutilla','comercios','frutilla',25000,{brand:'Nube Profesional',size:'Caja · 12 cucuruchos'}),
make('p20','Palito frutal especial','Mora','palitos','familia',1900,{size:'Palito · 1 unidad',brand:'Brisa Fría',stock:0})
];
export const demoWholesale=[{id:'w-example',name:'Comercio de ejemplo',email:'comercio@example.invalid',business:'Kiosco DEMO',status:'Pendiente',created:'2026-11-17T12:00:00Z'}];
