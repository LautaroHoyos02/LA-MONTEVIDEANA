# Distribuidora Libertad — versión funcional DEMO

Primera entrega con recursos ficticios y provisionales. **No habilitada para vender, cobrar, recibir datos personales reales ni administrar una operación comercial.**

## Qué funciona

- Inicio, catálogo de 20 productos, búsqueda, filtros, orden y carga progresiva.
- Vistas de producto, favoritos y carrito con persistencia entre recargas.
- Checkout con retiro o entrega en zonas de prueba, cupones y descuentos por cantidad.
- Pedidos DEMO con historial, recompra, descuento de stock local y devolución al cancelar una sola vez.
- Perfil DEMO sin contraseña, direcciones y solicitud mayorista.
- Aprobación, rechazo y suspensión mayorista local; precios mayoristas sujetos al mínimo por producto.
- Panel DEMO con edición de productos e imágenes, inventario, CSV con vista previa de importación, promociones, configuración y actividad.
- Diseño adaptable a móvil, navegación con teclado, modales con control de foco y reducción de movimiento.

## Límite importante

Los datos se guardan **exclusivamente en localStorage de este navegador**. No hay una base compartida, autenticación comercial ni permisos de servidor. Entrar al panel no representa obtener un rol administrativo. El alojamiento privado de Sites limita visitantes a nivel plataforma; no sustituye los roles del negocio.

El checkout registra un pedido de prueba con pago **No procesado**. No hay proveedor de pagos conectado, transferencia, correo enviado ni WhatsApp activo. El inventario no representa mercadería real.

## Abrir y probar

Abrí la URL privada entregada en el chat. No necesitás instalar nada para explorarla.

1. En **Todos los helados**, buscá “vainilla” y abrí un producto.
2. Agregá productos al carrito. El stock DEMO limita la cantidad.
3. Desde un subtotal de $10.000 de ejemplo, probá `LIBERTAD10` (configuración inicial).
4. Abrí **Mi cuenta** y creá “Cliente DEMO” con `cliente@example.invalid`.
5. Completá el checkout con datos ficticios. Probá retiro y entrega; “Fuera de cobertura” debe impedir confirmar.
6. Revisá la confirmación y **Mi cuenta → Mis pedidos**.
7. En el pie, abrí **Explorar panel DEMO**. Cambiá un precio y revisá la tienda.
8. Solicitá cuenta mayorista y aprobala desde **Clientes**. Desde seis unidades de un mismo producto se aplica el precio mayorista inicial.
9. Revisá **Actividad**. Cancelar un pedido devuelve su stock DEMO; no puede reabrirse para evitar devolverlo dos veces.

Las condiciones anteriores son valores iniciales editables, no condiciones comerciales confirmadas.

## Archivos y comandos para VS Code

Carpeta original: `/workspace/sites/libertad`. Si descargás el código, usá la carpeta donde lo hayas descomprimido.

1. VS Code → **Archivo → Abrir carpeta** → elegí la carpeta del proyecto.
2. Abrí **Terminal → Nueva terminal**. Comprobá que está dentro de esa carpeta.
3. Instalá Node.js 22 o superior y Python 3 si tu equipo no los tiene.
4. Ejecutá `npm ci` para instalar las herramientas de prueba.
5. Ejecutá `npm run check`, `npm test` y `npm run build`.
6. Para servir la copia local, ejecutá `python3 -m http.server 5173 --directory dist` y abrí `http://localhost:5173`. En Windows puede ser `py -m http.server 5173 --directory dist`.
7. Después de editar, guardá con **Ctrl+S** (Windows/Linux) o **Cmd+S** (Mac), ejecutá `npm run build` y recargá la página.

En el entorno administrado de Codex se utiliza `sites-preview` según la plataforma; no se sustituye su infraestructura si falla.

## Reemplazar recursos

| Qué | Archivo exacto | Buscar / acción |
| --- | --- | --- |
| Logotipo temporal | `public/assets/logo.svg` | Reemplazar el archivo conservando el nombre; preferentemente SVG con viewBox. |
| Colores | `public/styles.css` | Buscar `:root` y modificar variables `--blue`, `--red`, `--sky`, etc. |
| Productos iniciales | `public/data.js` | Buscar `seedProducts`. |
| Condiciones iniciales | `public/data.js` | Buscar `export const config`. |
| Fotografías | `public/assets/` | Reemplazar imágenes o editar `image` del producto. |
| Comportamiento visual | `public/app.js` | Funciones de páginas y eventos. |
| Cálculos de compra | `public/domain.js` | Función `totals`. |

Si ya exploraste la tienda, el navegador conserva su copia del catálogo. Los cambios al archivo inicial no sobreescriben esa copia: usá **Mi cuenta → Restablecer demo** después de exportar lo que quieras conservar. Para reemplazar fotografías de un producto desde el panel, se admiten JPG, PNG y WebP de hasta 1 MB.

## Git y publicación

Antes de guardar un cambio en Git ejecutá los tres comandos de verificación anteriores. Desde la terminal de la carpeta del proyecto:

```sh
git status
git add public docs README.md tests scripts package.json package-lock.json
git commit -m "Describe el cambio realizado"
git push
```

El repositorio de esta entrega es el repositorio de fuente administrado por Sites; **no se creó un repositorio de GitHub del usuario**. Para usar GitHub más adelante, primero se deberá elegir o crear un repositorio autorizado y conectar su remoto. Un commit guarda una versión; push sincroniza la rama con su remoto. Ninguno habilita pagos.

La publicación en Sites utiliza el manifiesto `.openai/hosting.json`, el commit exacto sincronizado y el artefacto de `dist/`. El proyecto conserva su identificador y el acceso privado; no cambiar la audiencia para resolver errores.

## Documentación

- `docs/ARQUITECTURA.md`: decisiones y separación entre DEMO y arquitectura comercial.
- `docs/ESTADO.md`: implementado, pendiente y límites de verificación.
- `docs/ACTIVACION.md`: servicios, variables y preparación para operar.
- `docs/RECURSOS.md`: procedencia y sustitución de imágenes.
