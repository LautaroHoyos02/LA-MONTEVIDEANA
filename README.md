# La Montevideana — DEMO mayorista

Actualización del modelo comercial: distribución a heladerías de productos envasados por caja o bulto. Un único precio mayorista. Pago anticipado. Costo, día y horario de entrega a coordinar por WhatsApp.

**No habilitada para ventas reales.** Los precios están en $0 como pendientes de carga, no como productos gratuitos. Las solicitudes se guardan localmente y no confirman compras, pagos, stock ni entregas.

## Recursos originales pendientes

El archivo `LA MONTEVIDEANA.zip` adjunto supera el límite de transferencia de 32 MiB de la herramienta disponible. No se pudo abrir ni inventariar. No se afirma haber inspeccionado su logo o sus fotos.

Para completar la identidad y catálogo: adjuntar el logo por separado y las fotos en ZIPs menores de 32 MB cada uno. Hasta entonces se usa una marca textual, paleta pendiente de confirmar e ilustraciones de cajas/bultos identificadas como pendientes. Los seis productos actuales tienen nombres orientativos: no se afirma que sean el inventario confirmado del ZIP.

## Qué funciona

- Catálogo, búsqueda, filtros por caja/bulto, orden y detalle.
- Favoritos y pedido con cantidades expresadas en cajas o bultos completos.
- Precio único mayorista editable, admitiendo $0 como pendiente.
- Stock desconocido separado de agotado: `null` = consultar; `0` = agotado informado.
- Consulta de stock desde producto, carrito y checkout. Prepara texto de WhatsApp con productos y cantidades antes de confirmar.
- WhatsApp con número configurado abre un mensaje para revisión y envío manual. Sin número permite copiar el texto sin inventar un contacto.
- Solicitudes DEMO dentro de la página, historial y recompra.
- Pago pendiente y bloqueo de preparación/despacho sin acreditación.
- Entrega excluida del subtotal: costo, día y horario pendientes de WhatsApp.
- Panel DEMO: edición de productos, fotografía propia, inventario, pedidos, configuración, CSV y actividad.

## Qué ya no aplica

No hay lista minorista, aprobación de cuentas para obtener otro precio, descuento automático por cantidad, cupones, envío gratis, tarifa fija de entrega ni turno automático. Las URL antiguas de ofertas y mayoristas llevan a Cómo comprar para conservar la navegación.

## Probar sin instalar

1. Abrí la URL privada entregada en el chat.
2. Abrí **Catálogo mayorista** y agregá cajas/bultos.
3. En **Tu pedido**, probá **Consultar stock del pedido**. El mensaje indica producto y cantidad; no confirma existencia.
4. Sin WhatsApp comercial configurado no hay destinatario ni envío. Copiá el texto o configurá el número confirmado desde el panel.
5. Guardá una solicitud DEMO con datos ficticios, por ejemplo `cliente@example.invalid`.
6. Revisá que quede **Pendiente de precio DEMO** y con pago pendiente. No se descuenta stock ni se promete entrega.
7. En **Panel DEMO → Productos**, editá nombre, precio y presentación. Se admite $0.
8. En **Pedidos**, intentá avanzar a preparación: debe bloquearse por falta de pago acreditado.

## Archivos y comandos

Carpeta original: `/workspace/sites/libertad` (la ruta técnica se conserva; el negocio se llama La Montevideana).

En VS Code: **Archivo → Abrir carpeta**, elegí el proyecto y abrí **Terminal → Nueva terminal**. Con Node.js 22+ y Python 3 instalados:

```sh
npm ci
npm run check
npm test
npm run build
python3 -m http.server 5173 --directory dist
```

En Windows, el último comando puede ser `py -m http.server 5173 --directory dist`. Abrí `http://localhost:5173`. Guardá cambios con Ctrl+S/Cmd+S, ejecutá `npm run build` y recargá.

| Modificación | Archivo y referencia exacta |
| --- | --- |
| Nombre, WhatsApp inicial, logo y paleta | `public/data.js`, buscar `export const config` |
| Productos iniciales | `public/data.js`, buscar `seedProducts` |
| Foto y texto de producto desde interfaz | Panel DEMO → Productos → Editar |
| Cálculos, stock y mensaje WhatsApp | `public/domain.js`, buscar `totals`, `inquiryMessage` y `whatsappURL` |
| Interfaz | `public/app.js` |
| Componentes y responsive | `public/styles.css` |

Al recibir el logo: copiarlo a `public/assets/`, actualizar `config.logo` y `config.logoConfirmed`, extraer la paleta del archivo inspeccionado y actualizar `config.colors`. No adivinar los colores por el nombre del negocio.

Los datos del panel viven en `la-montevideana-demo-v2`. Los datos anteriores permanecen en una clave separada, sin migrar productos ficticios de la primera marca a esta modalidad. Los cambios en semillas no sobreescriben automáticamente ediciones locales. Podés exportar o restablecer los datos de esta versión desde Mi cuenta.

## Versionado y publicación

El proyecto conserva el identificador de Sites y su audiencia privada. El nombre de la URL anterior se mantiene por compatibilidad; el título y contenido se actualizaron a La Montevideana.

Después de verificar cambios:

```sh
git status
git add public docs tests scripts README.md package.json package-lock.json
git commit -m "Describe el cambio"
git push
```

El remoto de fuente es administrado por Sites, no se creó un repositorio GitHub del usuario. Las credenciales de publicación nunca se guardan en el código. El ZIP descargable incluye fuente y documentación, sin secretos ni datos del navegador.

## Documentación

- `docs/ARQUITECTURA.md`: modelo actual y controles de producción.
- `docs/ESTADO.md`: cambios, pendientes y verificación.
- `docs/ACTIVACION.md`: activación comercial y pagos.
- `docs/RECURSOS.md`: recursos pendientes y procedimiento de incorporación.
