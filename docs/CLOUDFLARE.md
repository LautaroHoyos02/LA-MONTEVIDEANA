# Publicar La Montevideana en Cloudflare Pages

## Configuración exacta

| Campo | Valor |
| --- | --- |
| Producto | Cloudflare Pages |
| Repositorio GitHub | `LautaroHoyos02/LA-MONTEVIDEANA` |
| Nombre sugerido del proyecto | `la-montevideana` |
| Rama de producción | `main` |
| Framework preset | `None` / Ninguno |
| Build command | `npm run build:cloudflare` |
| Build output directory | `dist` |
| Root directory | Raíz del repositorio; dejar vacío |
| Variable de versión de Node, si se solicita | `NODE_VERSION=22` |

La URL definitiva la devuelve Cloudflare al crear el proyecto. No se afirma que un nombre sugerido esté disponible ni que la página ya esté publicada.

## Pasos en el panel

1. Iniciar sesión en Cloudflare.
2. Abrir **Workers & Pages**.
3. Elegir **Create application** y el flujo de **Pages** / **Import an existing Git repository**. Si el panel abre primero el flujo de Workers, buscar la opción para crear un proyecto Pages.
4. Conectar GitHub y autorizar únicamente el repositorio de La Montevideana cuando permita seleccionar repositorios.
5. Elegir `LautaroHoyos02/LA-MONTEVIDEANA`.
6. Completar la configuración de la tabla.
7. Guardar y desplegar. Esperar que Cloudflare indique que el despliegue terminó correctamente.
8. Abrir el enlace que Cloudflare entregue y revisar inicio, catálogo, fotografías y carrito.

Para Pages no se necesita un comando `wrangler deploy`. Si el panel exige **Deploy command**, comprobar que se eligió Pages y no el flujo de Workers.

## Actualizaciones desde GitHub

Con la integración Git de Pages activada, los commits enviados a `main` producen una nueva compilación y publicación. Este repositorio no incluye tokens de Cloudflare ni necesita un workflow de GitHub Actions para ese flujo.

Los cambios editados en el entorno de trabajo se guardan con commit y push, según `AGENTS.md`. La actualización automática de la web depende de que la integración Git de Cloudflare se haya creado y permanezca habilitada.

## Comprobación local

```sh
npm ci
npm run check
npm test
npm run build:cloudflare
```

El resultado está en `dist/`. Las rutas de la aplicación utilizan el fragmento `#/...`, por lo que no requieren un backend de rutas de Next.js.

## Qué se publica

Archivos de `public/`, con logo y 50 imágenes originales. No se publican `.openai/hosting.json`, documentos técnicos, pruebas, dependencias, archivos de trabajo ni el ZIP de fuente. El build se ejecuta únicamente con Node.js.

Cambiar el alojamiento no agrega una base de datos. Los datos y borradores actuales permanecen en el navegador y cada dominio tiene almacenamiento independiente. No se migra información local automáticamente a un nuevo dominio.

## Dominio propio

Una vez confirmada la publicación, se puede agregar un dominio desde **Custom domains** del proyecto. Confirmar primero qué dominio controla el propietario; no se modifican registros DNS como parte de la compilación.
