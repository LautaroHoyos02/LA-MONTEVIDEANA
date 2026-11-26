# La Montevideana

Catálogo de productos envasados por caja o bulto, con compra minorista sin cuenta y acceso mayorista mediante aprobación. El pedido se consulta por WhatsApp con la sucursal elegida. No hay pagos en la página.

## Activación de cuentas: pendiente de SQL

La integración ya está preparada con la URL y publishable key del proyecto del propietario. Todavía hay que ejecutar **`supabase/INSTALAR.sql` desde SQL Editor** y asignar el primer administrador. Guía paso a paso: [docs/SUPABASE.md](docs/SUPABASE.md).

Mientras no se instalen las tablas, el catálogo con precios iniciales $0 y las consultas de visitantes siguen disponibles; el acceso a cuentas y administración permanece cerrado. No se presenta una conexión pendiente como una cuenta activa.

## Modalidades y permisos

- Visitante: precios minoristas, pedido y WhatsApp sin registro.
- Cliente pendiente: cuenta con solicitud mayorista; mantiene precios minoristas hasta aprobación.
- Mayorista aprobado: precios mayoristas, historial y favoritos compartidos entre dispositivos.
- Administrador: productos y ambos precios, clientes, aprobación/suspensión mayorista, consultas, inventario/CSV, contactos, logo/colores y auditoría.

El permiso viene del perfil protegido por Supabase. No se toma de metadata de registro ni localStorage. El panel no se muestra a otras personas y sus operaciones se validan en la base mediante RLS y funciones con permisos explícitos. Las consultas registradas recalculan precios en servidor. Las contraseñas y sesiones las gestiona el SDK oficial de Supabase Auth.

## Sucursales

Capital: Av. Solís Oeste 1511 (3855967173), Barrio Parque del Río (3856250819), Barrio Autonomía (3856251509). La Banda: Ruta 1, Villa Rosita (3854816874). La configuración central usa los contactos confirmados; cada mensaje se dirige a la sucursal elegida. Se conservan logo y 50 fotografías originales.

## Archivos y ejecución

Abrí esta carpeta en VS Code → Terminal → Nueva terminal, con Node.js 22 y Python 3:

```sh
npm ci
npm run check
npm test
npm run build
python3 -m http.server 5173 --directory dist
```

En Windows podés usar `py` en lugar de `python3`. Abrí `http://localhost:5173`. Para Cloudflare: framework **None**, rama **main**, build **npm run build:cloudflare**, salida **dist**, raíz vacía y Node **22**. El build público de Cloudflare excluye SQL, documentación, ZIP de fuente y secretos. La publishable key es pública por diseño; ninguna clave secret/service_role forma parte del proyecto.

| Función | Archivo |
| --- | --- |
| Conexión pública | `public/supabase-config.js` |
| Auth y API Supabase | `public/backend.js` |
| Tablas, permisos y funciones | `supabase/migrations/001_accounts.sql` |
| Carga inicial / instalador completo | `supabase/migrations/002_catalog.sql`, `supabase/INSTALAR.sql` |
| Asignación administrativa manual | `supabase/ADMINISTRADOR.sql` |
| Identidad, contactos y catálogo de respaldo | `public/data.js` |
| Vistas y controles | `public/app.js` |
| Cálculos y mensaje WhatsApp | `public/domain.js` |
| Diseño | `public/styles.css`, `public/visual.css` |
| SDK oficial, empaquetado con esbuild | `scripts/build-sdk.mjs`, `public/vendor/supabase.js` |

El estado anterior del navegador se conserva en un archivo de compatibilidad local; no se usa como fuente de permisos ni se sube automáticamente a Supabase. Ver las limitaciones y pasos de prueba en la guía.

## Publicación

Fuente: https://github.com/LautaroHoyos02/LA-MONTEVIDEANA, rama `main`. Los cambios se sincronizan mediante commits y push. Cloudflare desplegará automáticamente si su integración con GitHub está configurada. Sites tiene un repositorio de fuente separado.

Publicación existente: https://la-montevideana.excellentshark16.chatgpt.site (audiencia privada conservada).

Documentación: `docs/SUPABASE.md`, `docs/ARQUITECTURA.md`, `docs/ESTADO.md`, `docs/ACTIVACION.md`, `docs/SUCURSALES.md`, `docs/CLOUDFLARE.md`.
