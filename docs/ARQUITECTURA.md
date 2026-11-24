# Arquitectura — La Montevideana

## Alcance actual

Frontend estático HTML/CSS y módulos JavaScript con navegación hash y estado en localStorage. Catálogo mayorista de cajas/bultos, precio único, selección de retiro y consultas manuales por WhatsApp. No hay pagos online, procesamiento bancario, reserva de stock, autenticación comercial ni base compartida.

`public/data.js` centraliza identidad, catálogo y tres sucursales. `domain.js` valida la selección, combina configuración compatible, calcula referencias y prepara texto y URL de WhatsApp. `app.js` gestiona vistas y estado local. `catalog.js` mantiene la migración de las 50 referencias y preserva ediciones e historial.

## Datos

Sucursal: ID estable, nombre fijo, dirección, WhatsApp y horario. Se ignoran sucursales locales desconocidas; los números de otras sucursales o el contacto global nunca se usan como reemplazo.

Consulta local: ID, referencia, fecha, líneas históricas, subtotal de referencia, sucursal elegida (`branchSnapshot`), notas opcionales, huella para evitar duplicar consultas idénticas y seguimiento (`Consulta preparada`, `En seguimiento`, `Consulta cerrada`). La entrega conserva modo retiro, branchId y costo/fecha/hora `null`. El carrito se conserva. Preparar una consulta no descuenta stock ni acredita pago.

Los precios $0 están pendientes. El stock global no representa existencias por sucursal y no bloquea consultas. La sucursal confirma disponibilidad por WhatsApp. La página no genera estados de despacho ni exige acreditación bancaria. Los registros antiguos se preservan y no se presentan como transacciones confirmadas.

Los favoritos, perfil opcional, consultas, inventario, configuración local y actividad no se sincronizan entre usuarios. La administración local no representa seguridad de servidor. No hay una bandeja central de pedidos; el canal comercial es el mensaje enviado manualmente por el comprador.

## Publicación

Cloudflare Pages sirve `dist` mediante `npm run build:cloudflare`. Sites conserva su identidad y audiencia mediante `.openai/hosting.json` y `npm run build`. Los datos públicos iniciales solo cambian con actualización y despliegue del código.

## Si se incorpora administración compartida

Agregar una API con PostgreSQL/Supabase, autenticación administrada y permisos de servidor para propietario, técnico y empleados. Modelar productos, sucursales, inventario por sucursal, consultas y auditoría compartida. Validar datos en servidor y conservar líneas históricas. No incorporar pagos online salvo una nueva decisión explícita del negocio. Mantener mínimos datos personales, copias de seguridad y controles legales argentinos aplicables.
