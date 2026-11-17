# Estado de la entrega · 17 de noviembre de 2026

## Implementado como DEMO local

- Inicio, catálogo, producto, ofertas, nosotros, contacto, ayuda y condiciones.
- 20 productos ficticios, marcas de ejemplo, imágenes ilustrativas, identidad provisional.
- Búsqueda sin distinguir tildes, categorías, marcas, sabores, disponibilidad, orden y carga progresiva.
- Favoritos, carrito, cantidades, stock, cupón y descuentos por volumen.
- Checkout con cobertura DEMO, retiro, entrega y confirmación sin cobro.
- Perfil ficticio, direcciones, historial y recompra.
- Solicitud mayorista y cambios de aprobación, rechazo o suspensión.
- Panel DEMO: productos, imágenes, pedidos, clientes, promociones, inventario, configuración y actividad.
- Exportaciones CSV, neutralización de fórmulas, importación validada con revisión previa.
- Copia JSON local, restablecimiento y actualización de estado entre pestañas.

## Pendiente para operar

- Backend persistente y migraciones de base de datos.
- Registro y acceso comercial, recuperación de contraseña y permisos del servidor.
- Cuentas independientes de propietario y técnico; permisos de empleados.
- Credenciales de prueba de Mercado Pago, firma/validación de notificaciones e idempotencia.
- Notificaciones transaccionales, recuperación de carritos y WhatsApp oficial.
- Reserva de stock transaccional y protección frente a compras simultáneas.
- Reglas avanzadas de promociones, vigencias y conciliación de pagos.
- Logística, conservación, fichas de alérgenos, costos e impuestos confirmados.
- Dominio propio, contactos oficiales, términos comerciales y privacidad revisados.
- Copias remotas, monitoreo y prueba de restauración.

## Verificación

- Verificación de sintaxis JavaScript y build sin dependencias de ejecución.
- 14 pruebas automatizadas: 9 de reglas comerciales y CSV y 5 de recorridos con DOM simulado. Todas aprobadas.
- Pruebas de interfaz con DOM simulado: documentadas en los tests. No sustituyen revisión visual en un navegador.
- La vista previa administrada falló al crear la conexión de navegador en el puerto 4173 (`timed out waiting for relay readiness`); `sites-preview status` informó detenido. No se modificó infraestructura para eludir el fallo.
- La revisión visual real, navegación con lector de pantalla y dispositivos móviles físicos quedan sin verificar en esta entrega.

No se hicieron pruebas de pagos reales ni de credenciales inexistentes. Un despliegue correcto solo acredita publicación; no habilitación comercial.
