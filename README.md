# La Montevideana

Código de la tienda mayorista de productos envasados por caja o bulto.

- **Repositorio:** https://github.com/LautaroHoyos02/LA-MONTEVIDEANA
- **Página alojada:** https://la-montevideana.excellentshark16.chatgpt.site
- **Guía de sincronización con GitHub:** [docs/GITHUB-Y-NUBE.md](docs/GITHUB-Y-NUBE.md)

Los archivos editables están descomprimidos en este repositorio. Se respetó la eliminación del ZIP anterior realizada por el propietario. El alojamiento actual no se actualiza automáticamente al hacer push a GitHub.

---

# Detalles técnicos y estado funcional

Actualización del modelo comercial: distribución a heladerías de productos envasados por caja o bulto. Un único precio mayorista. Condiciones de pago a coordinar por WhatsApp. Costo, día y horario de entrega a coordinar por WhatsApp.

**No habilitada para ventas reales.** Los precios están en $0 como pendientes de carga, no como productos gratuitos. Las solicitudes se guardan localmente y no confirman compras, pagos, stock ni entregas.

## Recursos originales incorporados

Se abrió el nuevo archivo `montevideana .zip` (15.136.945 bytes). Contiene 50 imágenes de producto numeradas y el logo de La Montevideana. Se copiaron sin alterar sus bytes.

- Logo: `public/assets/logo-montevideana.webp`.
- Productos: `public/assets/productos/lm-001.webp` a `lm-050.webp`.
- Paleta extraída del logo: azul `#003796`, rojo `#D10F11` y blanco.
- Correspondencia, dimensiones y hashes: `public/assets/catalog-manifest.json`.
- Catálogo: 50 referencias con nombres intuitivos orientativos, editables desde el panel.

Una imagen puede mostrar una unidad individual. La venta continúa siendo por caja o bulto completo. La cantidad de unidades y el contenido por presentación **no se deducen de las fotos** y siguen pendientes de confirmación. Todos los precios iniciales permanecen en $0 y el stock, a consultar.

## Qué funciona

- Catálogo con 50 fotos, búsqueda, filtros por caja/bulto y tipo de producto, orden y detalle.
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
| Componentes base y responsive | `public/styles.css` |
| Portada comercial, gráficos y presentación visual | `public/visual.css` |

El logo y la paleta ya están incorporados en `config`. Para sustituirlos en el futuro, actualizar `config.logo` y `config.colors`, conservando los archivos originales.

Los datos del panel viven en `la-montevideana-demo-v2`. Los datos anteriores permanecen en una clave separada, sin migrar productos ficticios de la primera marca a esta modalidad. La actualización a catálogo 3 incorpora las 50 referencias automáticamente. Conserva el historial, los contactos y los productos personalizados; archiva las seis referencias ilustrativas anteriores. No reemplaza silenciosamente productos de un carrito anterior: permite revisarlos y quitarlos. Recargar conserva nombres y precios editados. `public/catalog.js` documenta esta actualización. Podés exportar o restablecer los datos desde Mi cuenta.

## Versionado y publicación

El proyecto conserva el identificador de Sites y su audiencia privada. La dirección de la página se actualizó a `la-montevideana`, sin la etiqueta de demostración. El almacenamiento local está ligado al origen del navegador: la nueva dirección tiene almacenamiento independiente; no se afirma que los datos del origen anterior se transfieran automáticamente.

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

## Actualización visual de portada

La portada usa una composición de productos reales sobre azul profundo, rojo del logo y blanco. Incluye accesos visuales a seis familias, una selección de productos, bloques de potes/postres y una guía de pedido. Las formas, trama, ondas e iconos son elementos CSS/SVG; las fotografías y el logo se conservan sin modificar.

Los enlaces de categorías usan el filtro existente por tipo de producto. Las acciones de WhatsApp y carrito mantienen su comportamiento. Los estilos nuevos están en `public/visual.css`; el orden de carga es primero `styles.css` y después `visual.css`. Se incluyen reglas para móvil y para preferencia de movimiento reducido.

## Presentación comercial y límites funcionales

Se retiraron las etiquetas de demostración de la interfaz, formularios, estados visibles, mensajes y archivos exportados. La documentación técnica conserva el estado real del proyecto: almacenamiento local, sin autenticación comercial de servidor ni proveedor de pagos activo. La página usa “borrador” para el guardado local; no presenta un cobro, envío o compra como confirmados.

El sitio se publica en https://la-montevideana.excellentshark16.chatgpt.site y la fuente descargable se entrega como `la-montevideana.zip`. La documentación técnica permanece en ese ZIP y no se copia al directorio público de documentación.

## Condiciones de pago

Se retiró la exigencia visible de pago anticipado de portada, productos, carrito, formulario, ayuda, contacto, condiciones y mensajes de WhatsApp. La forma y condiciones de pago se coordinan por ese canal. No se agregan cobros, aprobaciones de pago ni modalidades de pago supuestas.

## Sincronización de cambios

El código de este repositorio se mantiene actualizado desde el entorno de trabajo mediante commits y push. El usuario solicitó sincronización de código; no se configuraron nuevos alojamientos ni bases de datos. Ver [docs/GITHUB-Y-NUBE.md](docs/GITHUB-Y-NUBE.md).
