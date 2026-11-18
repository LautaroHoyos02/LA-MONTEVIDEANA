# Activación comercial — pendiente

Antes de operar:

- Incorporar logo y colores inspeccionados, fotos reales y catálogo verificado por producto/presentación.
- Confirmar contenido por caja/bulto, un único precio mayorista, stock, fichas y conservación.
- Confirmar WhatsApp comercial y políticas de cobertura/entrega. El costo, día y horario se acuerdan por ese canal. Definir cómo se paga el costo de entrega acordado.
- Integrar base compartida, cuentas seguras, roles de propietario/técnico y autorización del servidor.
- Implementar consulta de disponibilidad y validación de stock/precio en servidor al confirmar. No convertir la consulta opcional en reserva ficticia.
- Integrar proveedor de pago en pruebas, notificaciones firmadas, consulta al proveedor e idempotencia. No despachar hasta el pago acreditado.
- Mantener pedidos con precios $0 bloqueados para cobro: cero es pendiente, no gratuito.
- Confirmar facturación ARCA, impuestos y textos legales argentinos aplicables, protección de datos y condiciones del negocio.
- Probar compras simultáneas, notificaciones duplicadas, fallos de pago, permisos, móvil y recuperación de backups.

Variables orientativas: URL/clave pública de Supabase; clave de servicio solo en servidor; token y secreto webhook de Mercado Pago solo en servidor; correo transaccional. Ninguna credencial de cobro está configurada en esta demo.

No implementar pago contra entrega: contradice la regla comercial confirmada. Los estados de entrega y pago deben permanecer separados. Nunca acreditar pagos desde el navegador o por el solo hecho de abrir WhatsApp.
