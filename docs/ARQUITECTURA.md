# Arquitectura — La Montevideana

Frontend estático HTML/CSS y módulos JavaScript, SDK oficial de Supabase Auth empaquetado localmente con esbuild. Hosting compatible con Cloudflare Pages y Sites. PostgreSQL/Supabase gestiona los datos compartidos sin un servidor propio adicional.

## Autorización y precios

`profiles` define admin, wholesale_pending, wholesale y suspended. El trigger de registro siempre crea pendiente; ignora roles de metadata. El usuario solo puede editar nombre/comercio propios mediante grants por columna y RLS. Los administradores se asignan desde SQL Editor. La función administrativa de aprobación solo cambia cuentas no administrativas.

`products` guarda datos comerciales públicos, precio minorista y stock. `wholesale_prices` separa físicamente los precios mayoristas, legibles solo por cuentas aprobadas/administrativas. La web recibe el catálogo mediante `get_catalog`: decide el precio con el permiso vigente en la base. A visitantes y pendientes no les devuelve precios privados. El almacenamiento local no determina identidad, rol ni precio.

La administración se oculta y bloquea por perfil verificado. Además, cada escritura se autoriza en PostgreSQL: productos e inventario mediante funciones administrativas, contactos/identidad mediante políticas RLS, seguimiento mediante grant de columna y RLS. La UI no es la frontera de seguridad.

## Datos

Tablas: profiles, products, wholesale_prices, branches, site_settings, inquiries, favorites y activity. Todas tienen RLS y grants explícitos para funcionar con acceso automático a tablas desactivado. Las funciones SECURITY DEFINER fijan search_path vacío, revocan EXECUTE implícito y verifican permisos. La auditoría se escribe desde triggers, con usuario y fecha del servidor.

`create_inquiry` valida sesión y estado de cuenta, sucursal, productos activos, cantidades y límite de líneas; recalcula todos los precios desde las tablas. Conserva líneas históricas, lista, subtotal, sucursal y observaciones. Usa una clave de solicitud única por usuario para idempotencia y no descuenta stock ni acredita pagos. Un mensaje de WhatsApp no demuestra envío ni confirma la compra.

Las consultas de visitantes permanecen locales y no necesitan registrarse. Las de usuarios registrados se guardan en la base y son visibles solo para el propietario de esa consulta y administradores. Favoritos tienen políticas por usuario. La sesión usa PKCE, renovación y almacenamiento gestionados por el SDK. En cierre de sesión se retiran del estado UI los datos privados y precios mayoristas.

## Compatibilidad y configuración

Los 50 productos y 51 archivos WebP originales conservan IDs y bytes. Los datos locales anteriores se archivan en `legacyArchive` de la clave histórica; no se importan automáticamente a tablas compartidas ni se toman como autorización.

Las cuatro sucursales confirmadas se cargan con un seed idempotente. Una vez activada la base, contactos, productos, ambos precios e identidad se editan en el panel y son compartidos. Imágenes nuevas de hasta 1 MB se guardan dentro de datos de producto; los originales están en assets. Para escalar cargas nuevas puede incorporarse Supabase Storage.

Hasta ejecutar el instalador, la web usa el catálogo público de respaldo y mantiene las cuentas/panel cerrados. La clave pública no puede instalar tablas ni asignar el primer administrador. Ver `SUPABASE.md`.

## Publicación y pruebas

`npm run build:cloudflare` genera solo frontend en dist. `npm run build` añade ZIP de fuente para la publicación existente de Sites. El instalador SQL no se publica como endpoint de ejecución. Los cambios de código no ejecutan SQL en producción.

Se prueban permisos y cálculos del servidor sobre PostgreSQL/PGlite y recorridos UI con respuestas controladas. Falta validar correos, recuperación y sesiones reales después de instalar SQL. Las condiciones de conservación, disponibilidad y entrega se coordinan con cada sucursal; no hay integración de pagos.
