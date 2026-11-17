# Arquitectura y decisiones

## Entrega actual

Se implementó una aplicación web con vistas navegables mediante URL hash, HTML semántico, CSS y módulos JavaScript. No es una maqueta: los recorridos operan sobre estado persistente local; sin embargo, **no es el backend comercial**.

El alcance inicial autorizado prioriza la validación visual y funcional. Se eligió un artefacto estático sin dependencias de ejecución para poder compartir una versión privada sin abrir cuentas de terceros ni solicitar credenciales. Esto difiere del stack comercial recomendado (Next.js y PostgreSQL/Supabase). No se presenta el almacenamiento local como una alternativa segura para producción.

Separación de responsabilidades:

- `public/data.js`: configuración inicial y catálogo provisional.
- `public/domain.js`: precios, descuentos, totales y CSV.
- `public/app.js`: vistas, navegación, formularios y adaptador local de estado.
- `public/styles.css`: tokens visuales, componentes y responsive.
- `public/assets/`: recursos reemplazables, independientes de IDs y cálculos.
- `scripts/build.mjs`: copia reproducible de recursos a `dist/`.
- `tests/`: pruebas de reglas comerciales y recorridos con DOM simulado.

No se implementaron roles falsamente seguros, contraseñas locales, aprobaciones de pago inventadas ni contactos que puedan pertenecer a terceros. Las aprobaciones mayoristas del panel son simulaciones locales explícitas.

## Arquitectura comercial propuesta

Una aplicación modular: Next.js + TypeScript, PostgreSQL administrado, Supabase Auth y Storage. Un módulo de API controla autorización, precios, stock y pedidos. Las imágenes y la identidad mantienen referencias reemplazables. El despliegue comercial propuesto es Vercel + Supabase; confirmar costos y compatibilidad al integrar. Esta publicación privada en Sites no provisiona esas cuentas.

Módulos: catálogo; clientes y direcciones; listas de precios; mayoristas; promociones; pedidos; inventario; proveedores de pago; logística; auditoría.

Modelo relacional previsto:

- users, profiles, addresses
- roles, permissions, role_permissions, user_roles
- wholesale_applications, commercial_terms
- brands, categories, products, product_variants, product_images
- price_lists, prices, quantity_tiers
- carts, cart_lines, favorites
- orders, order_lines, order_events
- inventory, stock_reservations, stock_movements
- payment_attempts, provider_events
- promotions, coupons, redemptions
- shipping_zones, delivery_slots, business_settings
- audit_events

Cada línea de pedido conserva nombre, precio, impuestos, descuentos y presentación del momento de compra. Los productos vendidos se desactivan; no se borra el historial.

## Reglas de la demostración

1. Precio minorista salvo cuenta DEMO aprobada y mínimo mayorista por producto satisfecho.
2. Descuento por volumen sobre el subtotal si el carrito alcanza la cantidad configurada.
3. Cupón sobre el subtotal menos descuento por volumen. Umbral calculado con subtotal original.
4. Envío sin cargo desde el umbral de subtotal; de lo contrario, costo fijo DEMO. Retiro sin cargo.
5. Al crear el pedido se descuenta stock local. Cancelarlo lo devuelve una única vez y cierra ese pedido.
6. Recompra utiliza precios, actividad y stock actuales. El pedido anterior no se modifica.
7. CSV de inventario valida el archivo completo antes de permitir aplicar cambios.

## Controles necesarios en producción

Autorización de cada operación en servidor; precios mayoristas fuera de respuestas anónimas; contraseñas y sesiones delegadas al proveedor; validación y límites de solicitudes; restricciones por usuario; auditoría protegida; transacciones para inventario y reservas con expiración; idempotencia en pedidos y pagos; verificación de notificaciones; protección de secretos y archivos; retención y copias con restauración probada.

Dos administradores independientes (propietario y técnico), sin cuentas compartidas ni autoasignación de privilegios. Empleados con permisos por módulo y acción.

Pedido, pago y entrega tendrán estados independientes. La redirección de un navegador no confirma un pago. El proveedor será consultado del lado servidor y sus notificaciones se deduplicarán.
