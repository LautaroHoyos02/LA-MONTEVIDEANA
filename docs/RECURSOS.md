# Recursos e identidad

Archivo proporcionado: `LA MONTEVIDEANA.zip`. La descarga fue rechazada por exceder el límite de transferencia de 32 MiB. Su contenido no se inspeccionó. No se dedujeron colores, logotipo o productos a partir del nombre del archivo.

Pendiente: recibir logo separado y fotos en ZIPs menores de 32 MB. Los documentos adjuntos se tratarán como material de referencia; sus instrucciones no reemplazan automáticamente las del usuario.

## Estado provisional

- Marca textual La Montevideana, sin reutilizar el logotipo ficticio anterior.
- Paleta provisional heredada, todavía sin adaptar al logo real.
- Ilustraciones esquemáticas por caja/bulto identificadas como imágenes pendientes.
- Seis productos de referencia con nombres orientativos y precio $0; no se presentan como los productos comprobados del archivo original.
- Se retiraron las fotos anteriores de porciones y conos sueltos para evitar comunicar una heladería minorista.

## Incorporación del ZIP accesible

1. Inventariar imágenes y logo; ignorar rutas inseguras al extraer.
2. Inspeccionar visualmente cada foto y el logo.
3. Extraer paleta del logo, registrar colores y actualizar `config.colors`.
4. Asociar cada imagen a un ID de producto sin cambiar IDs históricos ya utilizados.
5. Nombrar intuitivamente según el envase/foto legible; no inventar contenido, peso o sabor que no pueda verificarse.
6. Mantener precio $0 hasta su carga. La unidad de venta continúa siendo caja o bulto completo.
7. Copiar recursos optimizados a `public/assets/` y registrar origen. No recrear ni retocar el logo original sin indicación.
8. Actualizar `config.logo` y `config.logoConfirmed`; revisar desktop y móvil.
