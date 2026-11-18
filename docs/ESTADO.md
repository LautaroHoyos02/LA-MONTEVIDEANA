# Estado — 18 de noviembre de 2026

## Corregido

Nombre: La Montevideana. Enfoque: distribuidor para heladerías; productos por caja o bulto. Precio único mayorista con $0 pendiente de carga. Sin precios minoristas, solicitudes de aprobación mayorista ni descuentos inventados.

Consulta previa de stock por WhatsApp preparada con el detalle del pedido. Entrega con costo, día y horario pendientes de coordinación. Pago anticipado requerido y estados operativos bloqueados sin acreditación.

Se conservan catálogo, favoritos, cantidades, solicitudes, historial, recompra, edición de productos/fotos, stock, CSV, configuración y auditoría como funcionalidades locales DEMO.

## Bloqueo de recursos adjuntos

`LA MONTEVIDEANA.zip` supera el límite de transferencia de 32 MiB. No se pudo abrir, extraer ni comprobar su contenido. No se incorporaron fotografías o logo de ese ZIP ni se extrajeron sus colores. Faltan el logo separado y archivos de fotos menores de 32 MB. Los productos son referencias orientativas, no inventario confirmado.

## Datos pendientes

Número comercial de WhatsApp. La UI permite configurarlo con código de país; mientras esté vacío solo prepara texto para copiar. No se inventó un teléfono. La consulta de stock se preparó por WhatsApp como opción por defecto pendiente de confirmación del usuario.

Cantidades exactas por caja/bulto, fichas, marcas, stock real y precios deben verificarse con el catálogo original. Integración de pago anticipado y base compartida siguen pendientes; no se habilitaron ventas.

## Verificación

Pruebas automatizadas de precio único, $0 pendiente, ausencia de tarifa de entrega, stock desconocido, cantidades por empaque, enlaces/mensajes WhatsApp y bloqueo de despacho sin pago. Recorridos con DOM simulado: solicitud, editor de precio cero, consulta y compatibilidad con datos anteriores.

Resultado: 17 pruebas automatizadas aprobadas; sintaxis y build correctos. La vista previa administrada volvió a fallar al abrir la conexión de navegador en el puerto 4173 (timed out waiting for relay readiness); no se verificó visualmente en navegador. Las pruebas con DOM simulado no equivalen a una revisión visual ni a pagos bancarios reales.
