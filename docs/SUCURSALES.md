# Sucursales y WhatsApp

Las opciones fijas de retiro son Avenida Solís (`solis`), Barrio Autonomía (`autonomia`) y Libertad (`libertad`). No se asigna ninguna automáticamente. Las direcciones exactas, contactos y horarios no están confirmados.

## Incorporar datos para todos los visitantes

1. En VS Code abrí `public/data.js` desde la raíz del proyecto.
2. Buscá `branches:` dentro de `export const config`.
3. En el objeto de la sucursal correcta, reemplazá solo las cadenas vacías de `address`, `whatsapp` y, opcionalmente, `hours` con datos confirmados. Conservá `id` y `name`. El WhatsApp debe incluir código de país; no incluyas una URL.
4. Guardá el archivo. En la terminal de esa misma carpeta ejecutá `npm run check`, `npm test` y `npm run build:cloudflare`.
5. Hacé commit y push a `origin/main`. Cloudflare lo desplegará si la integración de Git está activa. Sites necesita su publicación independiente.
6. Probá elegir cada sucursal y revisá el destinatario y el mensaje antes de enviarlo. No mandes mensajes de prueba a terceros.

El panel **Administración → Configuración** permite editar y probar estos campos en el navegador actual. No publica esas ediciones para otros visitantes. Para publicar contactos confirmados usá el archivo anterior. Los valores públicos no vacíos prevalecen sobre ajustes locales antiguos; las sucursales mantienen sus IDs al recargar.

## Comportamiento

La selección persiste en este navegador. La revisión del pedido exige una sucursal. El mensaje incluye productos, cantidades por caja/bulto, sucursal, observaciones y preguntas sobre stock, pago, retiro y envío. No se solicitan tarjetas ni transferencias.

Sin teléfono de la sucursal elegida se permite copiar la consulta pero se desactiva abrir WhatsApp. No hay contacto alternativo automático. Las consultas guardadas mantienen la sucursal elegida originalmente y usan el número vigente de esa misma sucursal al reabrirlas.
