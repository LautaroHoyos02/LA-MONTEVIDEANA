# Estado — 26 de noviembre de 2026

Preparada integración Supabase con URL y clave pública provistas por el propietario. Auth responde HTTP 200. La comprobación de `get_catalog` responde PGRST202: las tablas/funciones de aplicación aún no están instaladas en el proyecto remoto. No se ejecutó SQL remoto, no se crearon cuentas de terceros ni se enviaron mensajes.

Implementado: registro/ingreso/recuperación, solicitud y aprobación mayorista, precio minorista para visitante/pendiente y mayorista para aprobado, panel restringido por perfil y operaciones autorizadas por PostgreSQL, edición compartida de catálogo/ambos precios/inventario/CSV/contactos/identidad, historial y favoritos de usuarios registrados, auditoría de servidor y consulta de WhatsApp con lista y precios de referencia. Los visitantes mantienen armado y consulta sin registro.

Permisos por columna y RLS; precios mayoristas separados; pedidos autenticados recalculados por SQL con idempotencia. Metadata/localStorage no pueden asignar administración. Se preservan recursos originales y datos locales anteriores mediante archivo de compatibilidad. Mientras falte SQL, el catálogo de respaldo funciona y las cuentas/panel permanecen cerrados.

24 pruebas automatizadas aprobadas. Pruebas SQL ejecutadas sobre PostgreSQL/PGlite y recorridos de UI con Auth/API controladas. Comprobaciones sintácticas y builds de Cloudflare/Sites. No equivalen a sesiones de usuarios reales en Supabase. La vista previa administrada falló por timeout del relay, con estado detenido; revisión visual pendiente.

Pendiente del propietario: ejecutar INSTALAR.sql, configurar URLs de correo, registrar/confirmar y asignar la primera cuenta administrativa. Luego validar correos y recuperación reales, probar desde dispositivos separados y cargar precios/nombres/contenido/horarios definitivos. Publicación de Cloudflare solo automática si su integración GitHub está activa; no se verificó su cuenta.
