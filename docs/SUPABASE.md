# Activar cuentas con Supabase

La web ya contiene la URL y la publishable key proporcionadas por el propietario. Son públicas por diseño; no hay claves secretas ni service_role en el proyecto. Se comprobó que Auth responde y que `get_catalog` todavía no existe en el proyecto remoto. Esto significa que **la activación real está pendiente de ejecutar SQL**. La clave pública no permite instalar tablas ni crear administradores.

## 1. Crear tablas y permisos

1. Abrí tu proyecto **La Montevideana** en Supabase.
2. En el menú izquierdo, entrá a **SQL Editor** (icono `>_`) y elegí **New query**.
3. En GitHub abrí `supabase/INSTALAR.sql`. Usá **Copy raw file** (copiar archivo completo), o **Raw** y copiá todo el contenido. No copies la página HTML de GitHub.
4. Pegá ese contenido en la consulta de Supabase y pulsá **Run**.
5. Debe aparecer **Success. No rows returned** o resultados sin error. No publiques capturas que contengan claves secretas.

El instalador crea tablas, funciones, permisos RLS, 50 productos con ambas listas en $0 y las cuatro sucursales. Se puede ejecutar nuevamente: no reemplaza productos, precios, contactos ni roles ya guardados. No incluye `ADMINISTRADOR.sql`; ese paso es independiente.

## 2. Configurar enlaces de correo

En **Authentication → URL Configuration**:

- **Site URL**: la dirección donde vas a usar la web.
- **Redirect URLs**: agregá esa misma dirección terminada en `/`.
- Para la publicación existente de Sites, la dirección es `https://la-montevideana.excellentshark16.chatgpt.site/` y mantiene su audiencia privada.
- Si usás Cloudflare Pages, agregá también la dirección real de producción que Cloudflare te asignó. No se conoce todavía desde esta sesión.
- Para pruebas locales, podés agregar `http://localhost:5173/`.

En **Authentication → Sign In / Providers → Email**, mantené activado el registro por correo y la confirmación de email. La web usa PKCE y el SDK oficial para manejar sesiones y recuperación de contraseña. Los correos de Supabase tienen límites de envío; para atención habitual configurá tu propio proveedor SMTP desde Authentication cuando lo necesites.

## 3. Crear el administrador

1. Abrí la web actualizada → **Mi cuenta → Solicitar cuenta mayorista**.
2. Registrá tu correo con una contraseña de al menos 12 caracteres. No compartas esa contraseña en el chat ni en GitHub.
3. Confirmá el correo usando el mensaje recibido.
4. En GitHub abrí `supabase/ADMINISTRADOR.sql` y copiá su contenido en otra consulta de SQL Editor.
5. Reemplazá **CAMBIAR_POR_TU_CORREO** por el correo que acabás de registrar. Conservá las comillas simples.
6. Pulsá **Run**. Volvé a la web e iniciá sesión o recargá.
7. Aparecerá **Abrir administración** en tu cuenta y el enlace administrativo en el pie de página.

Repetí el paso con el correo del encargado y del programador si querés cuentas independientes con los mismos permisos. La web no permite que un cliente se ascienda a administrador. Las cuentas administrativas solo se asignan desde SQL Editor.

## 4. Probar clientes y precios

1. Desde el administrador, abrí **Productos → Editar**. Cargá precio minorista y mayorista. El mayorista debe ser menor o igual al minorista. Los valores iniciales $0 indican pendiente, no gratis.
2. Abrí la web en una ventana privada. Sin registrarte verás el precio minorista, podrás armar el pedido, elegir sucursal y preparar WhatsApp.
3. Registrá otra cuenta como cliente. Confirmá su correo: seguirá pendiente de aprobación y verá precio minorista.
4. Desde el administrador, entrá en **Clientes** y cambiá esa cuenta a **Mayorista aprobado**.
5. El cliente debe recargar o volver a ingresar. Verá el precio mayorista en catálogo, detalles y carrito. El pedido guardado se recalcula en la base con su permiso vigente.
6. Prepará una consulta desde esa cuenta: aparecerá en **Mi cuenta → Mis consultas** y en el panel de pedidos del administrador. Es una consulta preparada; no prueba envío por WhatsApp ni confirma pago o stock.
7. Cerrá sesión: desaparece el panel y se restauran los precios minoristas. Un enlace directo `#/admin` tampoco da acceso.
8. Desde otro dispositivo, al ingresar con el mismo cliente aparecerán sus favoritos e historial. No aparecen pedidos de otros clientes.

## Qué se guarda y qué no

- Supabase: perfiles/permisos, productos, ambos precios, stock, sucursales, identidad, consultas de usuarios registrados, favoritos y auditoría.
- Navegador: carrito, sucursal elegida, favoritos y consultas de visitantes; sesión gestionada por Supabase y archivo de compatibilidad de los datos locales anteriores.
- Los visitantes no tienen que registrarse. Sus consultas no se convierten en registros compartidos automáticamente; el negocio las recibe cuando las envían por WhatsApp.
- Los datos anteriores del panel local se conservan en `legacyArchive` de la clave histórica para recuperación manual. No se importan automáticamente precios, permisos o pedidos desde el almacenamiento local a la base.
- No hay proveedor de pagos ni datos bancarios o de tarjeta. Stock y entrega se confirman con la sucursal.
- Las fotos subidas por administradores se guardan como imagen de hasta 1 MB dentro de los datos de producto; para un catálogo de mayor tamaño conviene mover nuevas cargas a Supabase Storage. Los 51 originales siguen en los archivos del sitio.

## Cambios de código

En VS Code abrí la raíz del proyecto. Los archivos principales son `public/supabase-config.js` (solo URL/clave pública), `public/backend.js` (SDK y consultas), `public/app.js` (interfaz), `supabase/migrations/001_accounts.sql` (permisos/tablas) y `002_catalog.sql` (carga inicial).

Para regenerar el instalador después de cambiar SQL: `node scripts/generate-installer.mjs`. Para regenerar la carga inicial desde recursos, ejecutar primero `node scripts/generate-seed.mjs`. No ejecutar una carga reemplazando precios reales; el archivo inicial usa `ON CONFLICT DO NOTHING`.

```sh
npm ci
npm run check
npm test
npm run build:cloudflare
```

Para Sites: `npm run build`. Ambas compilaciones incluyen el SDK oficial empaquetado localmente, sin depender de una CDN. Las dependencias se instalan desde el lockfile. No se necesitan claves secretas en Cloudflare para este frontend.

## Verificación y límites

Pruebas de permisos sobre PostgreSQL mediante PGlite, y recorridos de interfaz con Auth/API controladas: no son inicios de sesión reales en el proyecto del propietario. La instalación remota, correos, recuperación y acceso desde dispositivos reales deben verificarse después de ejecutar el SQL. La vista previa administrada falló por timeout del relay: revisión visual en navegador pendiente.

## Si falla el ingreso

El mensaje de la página distingue correo sin confirmar y credenciales inválidas. En ese caso confirmá el correo o usá **Olvidé mi contraseña**; no compartas la contraseña. Si dice que el correo y la contraseña fueron aceptados pero falla la carga de la cuenta, copiá la referencia indicada: hay que revisar perfil/permisos. No reinstales tablas ni desactives RLS para resolver un error de contraseña.
