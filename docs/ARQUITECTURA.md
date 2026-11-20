# Arquitectura — La Montevideana

## Modelo comercial corregido

- Clientes: heladerías y comercios.
- Productos envasados. Una cantidad representa una caja o un bulto completo.
- Un único precio mayorista por producto/presentación, sin minoristas ni aprobaciones de lista.
- El pedido se inicia en la página. La consulta previa de stock es opcional y está disponible en producto, carrito y checkout.
- Pago anticipado obligatorio. Preparación y despacho requieren acreditación verificable.
- Costo, día y horario de entrega se coordinan por WhatsApp; no se asignan ni se incluyen automáticamente.
- Precio inicial $0 significa pendiente, no gratuito. Un pedido con esos precios no puede ser cobrado ni tratado como pagado.

## Implementación actual

Aplicación con vistas navegables por URL hash, HTML, CSS y módulos JavaScript. El estado persiste solo en localStorage. Se mantiene el alcance DEMO anterior: no es una base compartida ni autenticación comercial.

`data.js` centraliza marca, recursos iniciales, WhatsApp y catálogo. `domain.js` implementa totales, estado de precios, unidades de venta, stock, texto y URL de WhatsApp. `app.js` contiene vistas y gestión local. Las fotos se sustituyen por ID/ruta sin afectar cálculos.

Se eliminó la lógica de dos listas de precios, aprobación mayorista, cupones y descuentos por volumen. Se eliminaron costos fijos y envío sin cargo. La ausencia de precio de entrega se representa con `null`, no con cero.

Stock: `null` es desconocido; cero es agotado informado. Guardar una solicitud no reserva ni descuenta existencias. La consulta de WhatsApp no cambia el stock a confirmado. Abrir el chat no demuestra envío ni respuesta.

Pedidos: pendientes de precio o de pago; no procesados ni aprobados. `canDispatch` requiere pago acreditado, precios válidos e importe positivo. La interfaz no tiene un botón que invente acreditaciones. La integración comercial deberá hacer esta comprobación en el servidor.

Los datos de la primera demo se conservan en una clave separada. No se reutilizan los precios o pedidos del negocio anteriormente nombrado.

## Arquitectura comercial recomendada

Se mantiene Next.js + TypeScript y PostgreSQL/Supabase como objetivo de integración comercial, con autenticación y almacenamiento administrados. El stack estático actual facilita la revisión, pero no reemplaza el backend.

Modelo: perfiles comerciales, roles/permisos, productos/variantes, imágenes, presentación de venta y contenido por presentación, precio mayorista, stock y movimientos, pedidos/líneas históricas, intentos de pago, eventos del proveedor, coordinación de entrega y auditoría.

La coordinación de entrega tendrá costo, fecha y franja horaria nullable hasta su acuerdo. Una cotización de entrega no debe considerarse gratis por estar ausente. El cobro del costo acordado debe definirse antes de la operación real.

Stock y precio se validan en servidor al confirmar. Cada línea conserva presentación y precio del momento. Pagos y notificaciones requieren idempotencia. Autorización por rol en cada API; dos cuentas independientes para propietario y técnico; empleados con permisos restringidos.

No se debe tomar un mensaje, una captura de transferencia, una redirección o una marca local como acreditación bancaria. La regla de pago previo se aplica antes de habilitar estados operativos.

## Catálogo 3: recursos del ZIP recibido

`public/catalog.js` incorpora las 50 referencias numeradas con IDs estables `lm-001` a `lm-050`. Preserva perfil, solicitudes y productos personalizados. Las referencias esquemáticas anteriores se archivan como inactivas; los pedidos históricos conservan sus líneas y precios. Los carritos con referencias anteriores requieren revisión explícita, sin asociar por suposición un producto a una foto.

Los nombres son orientativos y la cantidad por empaque está pendiente. Los archivos originales se copian sin modificación. El manifiesto registra origen, dimensiones y SHA-256. El logo y colores se cargan desde la configuración central incluso en navegadores que conservaban la paleta anterior.
