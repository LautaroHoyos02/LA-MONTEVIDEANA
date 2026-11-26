# Sucursales y WhatsApp

Las cuatro opciones de retiro se agrupan en Capital y La Banda. Ninguna se selecciona automáticamente. Datos proporcionados por el propietario el 24 de noviembre de 2026:

| Ciudad | Sucursal / ubicación | Contacto | ID estable |
| --- | --- | --- | --- |
| Capital | Av. Solís Oeste 1511 | 3855967173 | `solis` |
| Capital | Barrio Parque del Río | 3856250819 | `parque-rio` |
| Capital | Barrio Autonomía | 3856251509 | `autonomia` |
| La Banda | Ruta 1, Villa Rosita | 3854816874 | `villa-rosita` |

Los enlaces usan formato móvil internacional argentino: `54 9` seguido del número proporcionado. La interfaz muestra el número local. No se enviaron mensajes para verificar titularidad. Los horarios y numeraciones adicionales no fueron proporcionados y no se inventan.

Se retiró Libertad de las opciones actuales. Su historial se conserva; volver a consultar un pedido de esa sucursal exige elegir explícitamente una vigente. Los contactos públicos confirmados reemplazan ajustes antiguos de las sucursales conservadas al recargar.

## Incorporar datos para todos los visitantes

1. En VS Code abrí `public/data.js` desde la raíz del proyecto.
2. Buscá `branches:` dentro de `export const config`.
3. En el objeto de la sucursal correcta, actualizá únicamente los valores de `address`, `whatsapp` y, opcionalmente, `hours` con datos confirmados. Conservá `id` y `name`. El WhatsApp debe incluir código de país; no incluyas una URL.
4. Guardá el archivo. En la terminal de esa misma carpeta ejecutá `npm run check`, `npm test` y `npm run build:cloudflare`.
5. Hacé commit y push a `origin/main`. Cloudflare lo desplegará si la integración de Git está activa. Sites necesita su publicación independiente.
6. Probá elegir cada sucursal y revisá el destinatario y el mensaje antes de enviarlo. No mandes mensajes de prueba a terceros.

Con Supabase activado, el panel **Administración → Configuración** permite guardar contactos en la base compartida para todos los visitantes. `public/data.js` y el seed SQL son solo configuración inicial y respaldo; no pisan los contactos ya editados en la base. La selección de retiro sigue guardándose en cada navegador.

## Comportamiento

La selección persiste en este navegador. La revisión del pedido exige una sucursal. El mensaje incluye productos, cantidades por caja/bulto, sucursal, observaciones y preguntas sobre stock, pago, retiro y envío. No se solicitan tarjetas ni transferencias.

Sin teléfono de la sucursal elegida se permite copiar la consulta pero se desactiva abrir WhatsApp. No hay contacto alternativo automático. Las consultas guardadas mantienen la sucursal elegida originalmente y usan el número vigente de esa misma sucursal al reabrirlas.
