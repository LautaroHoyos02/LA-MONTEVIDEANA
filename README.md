# La Montevideana

Catálogo mayorista de productos envasados por caja o bulto. Identidad azul #003796, rojo #D10F11 y blanco, logo original y 50 fotografías recibidas, conservadas sin modificar. Nombres orientativos editables; precios iniciales $0 pendientes de carga, no gratuitos.

## Recorrido actual

1. Agregar productos y cantidades al pedido.
2. Elegir retiro en **Avenida Solís**, **Barrio Autonomía** o **Libertad**.
3. Revisar y preparar la consulta de WhatsApp con productos, cantidades, sucursal y observaciones opcionales.
4. Consultar stock, medios de pago, importe final, fecha de retiro y, si corresponde, fecha y costo de envío.

**No hay pagos en la página, registro obligatorio, reservas automáticas ni confirmación automática de pedidos.** Preparar o abrir WhatsApp no prueba el envío del mensaje. El usuario lo revisa y envía desde WhatsApp.

Las direcciones exactas y teléfonos de las tres sucursales están vacíos hasta recibirlos. Se puede copiar el mensaje; sin teléfono confirmado de la sucursal, su enlace de WhatsApp permanece desactivado. Nunca se usa otra sucursal ni el antiguo contacto global como reemplazo.

## Funciones

Catálogo, búsqueda y filtros por presentación y tipo, ordenamiento, detalles, favoritos, cantidades, consultas guardadas y repetición de selección. Edición local de productos, precios, imágenes, inventario, CSV, contactos por sucursal y actividad.

Los datos se guardan **solo en el navegador**. El panel no tiene autenticación ni base de datos compartida: sus cambios no modifican automáticamente el catálogo público de otros visitantes. No sirve como bandeja central de pedidos. La consulta llega al negocio cuando el comprador la envía por WhatsApp.

## Ejecutar y comprobar

Abrí esta carpeta en VS Code y elegí **Terminal → Nueva terminal**. Desde la raíz del proyecto, con Node.js 22 y Python 3:

```sh
npm ci
npm run check
npm test
npm run build
python3 -m http.server 5173 --directory dist
```

Abrí `http://localhost:5173`. En Windows podés usar `py` en vez de `python3`. Guardá con Ctrl+S, repetí el build y recargá.

Para Cloudflare Pages: framework **None**, comando **npm run build:cloudflare**, salida **dist**, rama **main**, raíz vacía, Node **22**. Este build solo publica el frontend; no incluye código fuente, ZIP ni documentación técnica.

## Archivos

| Cambio | Archivo |
| --- | --- |
| Identidad y datos públicos de las tres sucursales | `public/data.js`, buscar `export const config` y `branches` |
| Catálogo inicial | `public/data.js`, buscar `seedProducts` |
| Fotografías y trazabilidad | `public/assets/productos/` y `public/assets/catalog-manifest.json` |
| Mensaje de consulta, selección de sucursal, cálculos | `public/domain.js` |
| Vistas y eventos | `public/app.js` |
| Estilos base y portada/componentes nuevos | `public/styles.css`, `public/visual.css` |
| Migración de catálogo sin perder ediciones/historial | `public/catalog.js` |

La clave interna `la-montevideana-demo-v2` se conserva para no perder datos existentes. No se muestra en la interfaz. Los pedidos anteriores mantienen sus líneas históricas y se les pide elegir sucursal si no la tenían.

## Guardar y publicar cambios

La fuente está en https://github.com/LautaroHoyos02/LA-MONTEVIDEANA, rama `main`.

```sh
git status
git add public tests docs README.md
git commit -m "Describe el cambio"
git push origin main
```

Sites usa su propio repositorio de fuente y publicación; no cambia automáticamente por un push a GitHub. Cloudflare actualizará desde GitHub si su integración está configurada. Instrucciones: `docs/CLOUDFLARE.md` y `docs/GITHUB-Y-NUBE.md`.

Sitio existente: https://la-montevideana.excellentshark16.chatgpt.site. El build para Sites incluye ZIP descargable con fuente y documentación; excluye secretos y datos del navegador.

## Documentación

- `docs/SUCURSALES.md`: cómo incorporar direcciones y WhatsApp confirmados.
- `docs/ARQUITECTURA.md`: modelo e implementación.
- `docs/ESTADO.md`: verificación y pendientes.
- `docs/ACTIVACION.md`: datos necesarios para atención comercial.
- `docs/RECURSOS.md`: incorporación de recursos originales.
