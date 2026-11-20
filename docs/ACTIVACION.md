# Activación comercial — pendiente

Antes de operar:

- Logo, colores y 50 imágenes ya incorporados. Confirmar nombres comerciales y contenido por caja/bulto; las fotos no confirman por sí solas unidades por empaque.
- Confirmar contenido por caja/bulto, un único precio mayorista, stock, fichas y conservación.
- Confirmar WhatsApp comercial y políticas de cobertura/entrega. El costo, día y horario se acuerdan por ese canal. Definir cómo se paga el costo de entrega acordado.
- Integrar base compartida, cuentas seguras, roles de propietario/técnico y autorización del servidor.
- Implementar consulta de disponibilidad y validación de stock/precio en servidor al confirmar. No convertir la consulta opcional en reserva ficticia.
- Confirmar con el negocio las modalidades y condiciones de pago que se coordinarán por WhatsApp. Si se integra un proveedor online, verificar notificaciones y acreditaciones con idempotencia.
- Mantener pedidos con precios $0 bloqueados para cobro: cero es pendiente, no gratuito.
- Confirmar facturación ARCA, impuestos y textos legales argentinos aplicables, protección de datos y condiciones del negocio.
- Probar compras simultáneas, notificaciones duplicadas, fallos de pago, permisos, móvil y recuperación de backups.

Variables orientativas: URL/clave pública de Supabase; clave de servicio solo en servidor; token y secreto webhook de Mercado Pago solo en servidor; correo transaccional. Ninguna credencial de cobro está configurada en esta demo.

No suponer una modalidad ni un plazo de pago: se acuerdan por WhatsApp. Los estados de entrega y pago permanecen separados. Nunca acreditar pagos desde el navegador o por el solo hecho de abrir WhatsApp.
