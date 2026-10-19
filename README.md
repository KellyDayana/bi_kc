# BI en tu día a día

Página educativa sobre fundamentos de Business Intelligence, con un cuestionario interactivo y un dashboard de finanzas personales con datos simulados.

## Ejecutar en GitHub Codespaces

Desde la terminal del Codespace, inicia un servidor estático:

```bash
python3 -m http.server 8000
```

Abre el puerto 8000 en la pestaña **Ports** de Codespaces para explorar la página.

## Estructura

- `index.html`: contenido y estructura de las dos secciones.
- `css/styles.css`: estilos responsive.
- `js/data.js`: datos financieros simulados para seis meses.
- `js/app.js`: lógica del cuestionario y renderizado del dashboard.
- `img/`: carpeta disponible para agregar recursos gráficos.

Bootstrap y Chart.js se cargan desde CDN. Para conectar datos reales, sustituye el objeto de `js/data.js` con la respuesta de una API o base de datos y conserva el formato de los meses, categorías e importes.
