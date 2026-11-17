# Preparación para operación comercial

La entrega actual puede usarse para evaluar diseño y recorridos. No conectar un medio de cobro a esta versión local.

## Orden de integración

1. Confirmar datos del negocio, contacto oficial, listas de precios, impuestos, comprobantes y condiciones mayoristas.
2. Provisionar ambiente de pruebas separado del comercial, PostgreSQL, autenticación y almacenamiento; documentar propiedad de cada cuenta.
3. Crear esquema, migraciones, permisos y políticas de acceso; importar el catálogo provisional como semilla de pruebas.
4. Sustituir el adaptador local por API: catálogo, precios autorizados, favoritos, perfil, direcciones, solicitudes, pedidos e inventario.
5. Incorporar reservas transaccionales, expiración, validación de importes e idempotencia.
6. Agregar Mercado Pago en modo prueba. Verificar que importe, moneda, referencia y cuenta receptora coincidan. Validar firma y consultar al proveedor. No confiar en parámetros del navegador.
7. Configurar correo y WhatsApp reales únicamente con datos confirmados y autorización para comunicaciones.
8. Validar cobertura, horarios, capacidad, frío, alérgenos y condiciones de conservación.
9. Completar controles legales argentinos, facturación ARCA, derechos y privacidad; revisar qué reglas aplican a productos perecederos/congelados.
10. Probar navegación móvil, autorización entre usuarios, compras simultáneas, errores de proveedor, notificaciones duplicadas, reembolsos, copia y restauración.

## Variables previstas (nombres orientativos)

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` — exclusivamente servidor, nunca NEXT_PUBLIC.
- `MERCADOPAGO_ACCESS_TOKEN` — exclusivamente servidor.
- `MERCADOPAGO_WEBHOOK_SECRET` — exclusivamente servidor.
- `EMAIL_PROVIDER_API_KEY` — exclusivamente servidor.
- `APP_URL`

No hay credenciales configuradas en la entrega actual. No guardar secretos en el repositorio, formularios DEMO, capturas o configuración visual.

## Copias y recuperación

La exportación JSON actual es solo una copia manual del estado DEMO de este navegador. Producción requiere backups del proveedor de base de datos, copia de archivos, política de retención y restauración probada en un ambiente independiente.

## SEO

La versión DEMO declara `noindex,nofollow`. Retirar esa restricción únicamente en la tienda oficial, con metadatos por producto, sitemap, URL canónica y datos estructurados que reflejen información comercial confirmada.
