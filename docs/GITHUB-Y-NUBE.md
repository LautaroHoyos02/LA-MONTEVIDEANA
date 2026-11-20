# Trabajo con GitHub

Repositorio: https://github.com/LautaroHoyos02/LA-MONTEVIDEANA

## Qué se sincroniza

El repositorio guarda el código editable, logo, fotografías, pruebas y documentación de La Montevideana. Se conserva la eliminación del ZIP anterior realizada por el propietario. Los cambios se realizan en los archivos descomprimidos.

La sincronización se hace mediante commits y push. Guardar un archivo local no lo sube a GitHub por sí solo. En este hilo, al completar cambios solicitados se comprobarán, guardarán y enviarán al repositorio.

## Carpeta de trabajo en este entorno

La carpeta principal usada para continuar el proyecto es `/workspace/sites/libertad`. Su remoto `origin` apunta al GitHub del usuario. Se conserva la historia de la página y la historia que ya existía en GitHub, sin reemplazar la rama por la fuerza.

El nombre técnico de esa carpeta se conserva; no es el nombre comercial del negocio.

## Comandos para VS Code

1. Abrir la carpeta clonada del repositorio.
2. Editar y guardar con Ctrl+S o Cmd+S.
3. En Terminal → Nueva terminal, desde la carpeta del proyecto, comprobar:

```sh
npm ci
npm run check
npm test
npm run build
```

4. Revisar y sincronizar:

```sh
git status
git add .
git commit -m "Describe el cambio"
git push origin main
```

No usar `git push --force` para sincronizar cambios normales. Si otra persona actualizó la rama, incorporar esos cambios antes de continuar.

## Página alojada

El alojamiento existente sigue en https://la-montevideana.excellentshark16.chatgpt.site.

Un push a GitHub guarda el código; no se configuró un despliegue automático hacia Sites, otro alojamiento o una base compartida. Esta tarea no cambió los pagos, permisos o almacenamiento de pedidos de la aplicación.

## Seguridad de archivos

No incluir tokens, claves o archivos `.env` en los commits. `.gitignore` excluye secretos locales, dependencias, builds y archivos de trabajo. Los datos del navegador no forman parte del repositorio.
