# Estado — 20 de noviembre de 2026

## Incorporado

Nuevo ZIP `montevideana .zip` abierto correctamente. Logo original y 50 imágenes de productos incorporados. Azul #003796, rojo #D10F11 y blanco aplicados a la identidad del sitio. El bloqueo del ZIP anterior quedó resuelto con este archivo nuevo.

Catálogo de 50 referencias con nombres descriptivos orientativos. Todos los precios iniciales permanecen en $0 y la disponibilidad, a consultar. Se mantiene venta por caja/bulto, precio único mayorista y coordinación de pago y entrega por WhatsApp.

Filtros por presentación y tipo de producto, búsqueda, favoritos, selección, consultas de stock y solicitudes DEMO. Se preservan edición de productos, inventario, CSV y actividad.

## Actualización de datos locales

La versión del catálogo incorpora las fotos en navegadores que conservaban la demo anterior. Archiva las seis referencias ilustrativas, conserva pedidos históricos, configuración y productos personalizados. Los carritos antiguos se revisan sin sustituir automáticamente sus productos. Recargar no pisa nombres y precios editados del nuevo catálogo.

## Pendiente

Número comercial de WhatsApp, contenido exacto por caja/bulto, precios, stock real, fichas técnicas y datos institucionales. Los nombres comerciales pueden ajustarse desde el panel. No se configuraron cobros reales ni base compartida. La versión sigue siendo DEMO y usa almacenamiento del navegador.

## Verificación

Pruebas automatizadas de precio único, $0 pendiente, stock, mensajes WhatsApp, pago previo, recorridos, actualización del catálogo y conservación del historial. Validación de los 51 archivos WebP por SHA-256 contra el manifiesto y de la relación entre las 50 referencias y sus imágenes.

Resultado: 22 pruebas automatizadas aprobadas. Tras el rediseño de portada se volvieron a comprobar los recorridos existentes. La vista previa administrada falló al conectar el navegador en el puerto 4173 (timed out waiting for relay readiness); status informó detenido. La revisión visual responsive permanece pendiente; los tests de DOM no equivalen a una inspección visual ni a pagos reales.

## Rediseño visual

Portada con fondo azul profundo, fotografías en composición de tres productos, acentos rojos, trama y ondas SVG decorativas. Categorías con imágenes originales, paneles de potes y postres, iconos de modalidad comercial y guía de pedido. Tarjetas con etiqueta de presentación, jerarquía de precios y acceso de consulta de stock.

El cambio es de presentación. No modifica catálogo, precios, pedidos, almacenamiento, permisos o medios de pago. No agrega testimonios, ventas o promociones ficticias.

## Corrección de superposición en portada

Se recorta el contenido decorativo al límite de `.showcase` con `overflow: hidden`. El círculo azul del pseudoelemento dejaba de respetar el límite inferior de la portada y cubría el bloque de beneficios. La onda y el resto del diseño se conservan dentro de esa sección.

## Limpieza de etiquetas de demostración

Se eliminan de la interfaz las menciones a DEMO, pruebas y datos ficticios. Se reemplazan por información operativa: borradores locales, precios pendientes y pago sin procesar. Se conserva la autorización de estados y no se habilitan cobros ni confirmaciones de compra. El identificador interno del almacenamiento y los estados históricos se conservan por compatibilidad; sus etiquetas públicas no muestran sufijos antiguos.

La dirección se cambia a `la-montevideana` y el título ya no contiene etiquetas de demostración. No se altera la audiencia privada. El nuevo origen tiene almacenamiento local independiente; esta limpieza no agrega sincronización de datos entre direcciones.

## Pago a coordinar por WhatsApp

Se eliminan las menciones públicas a anticipo, pago previo y obligación de acreditar antes de preparar o despachar. Se actualizan todos los recorridos, incluidos el contacto y los textos que se copian o abren en WhatsApp. Las condiciones de pago se conversan por ese canal. No se habilitaron cobros ni se modificaron acreditaciones de pedidos.
