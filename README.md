# ARIEL / VOLT

Runner 3D de patinete eléctrico, en español, con tres carriles, controles táctiles, PWA instalable y caché offline. Sin backend, cuentas de juego, anuncios, compras reales ni servicios externos en tiempo de ejecución.

## Probar en local

Necesitas Python 3 (o cualquier servidor de archivos estáticos).

```sh
cd ariel-volt
python3 -m http.server 8000 --directory dist
```

Abre http://localhost:8000. No abras `index.html` mediante doble clic: los módulos y el service worker necesitan HTTP/HTTPS. En localhost se permite el service worker; para probar desde otro móvil utiliza un alojamiento HTTPS. La carpeta que se publica es `dist`, no la carpeta superior.

## Compartirlo gratis

### GitHub Pages

1. Crea un repositorio nuevo en tu cuenta de GitHub.
2. Sube **el contenido** de `dist` a la raíz de la rama `main`. Deben quedar `index.html`, `manifest.json`, `sw.js`, `src` y `assets` en la raíz.
3. En Settings → Pages, selecciona Deploy from a branch → `main` → `/ (root)` y guarda.
4. Cuando Pages termine, abre la dirección que muestre GitHub y espera a «Listo sin conexión».
5. Comparte esa dirección con tus amigos. Las rutas son relativas, por lo que funcionan también en un subdirectorio `/nombre-del-repositorio/`.

### Netlify

1. Inicia sesión en Netlify y abre la opción de desplegar un sitio manualmente.
2. Arrastra la carpeta `dist` completa al área de despliegue.
3. Cuando finalice, abre la dirección HTTPS asignada y compártela.

Un alojamiento estático por enlace normalmente es accesible a quien tenga su URL: no es un sistema de control de acceso. La publicación de prueba de Sites mantiene el acceso privado de su propietario; para distribuir sin inicio de sesión, utiliza la copia estática y comparte su enlace con tus amigos. El juego en sí no implementa login.

## Instalar y jugar sin conexión

- Android / Chrome: menú del navegador → Instalar aplicación o Añadir a pantalla de inicio.
- iPhone / Safari: Compartir → Añadir a pantalla de inicio.
- Primero abre el juego con conexión y espera al aviso «Listo sin conexión». Después prueba con modo avión. La aplicación cachea su HTML, CSS, módulos, motor Three.js, imágenes e iconos.
- La primera visita siempre necesita conexión. iOS puede eliminar cachés web por falta de espacio o inactividad; en ese caso vuelve a abrirlo una vez con conexión.
- El ZIP de descarga no se precachea: es una herramienta de distribución, no un recurso necesario para jugar.

## Controles

| Acción | Móvil | Teclado |
| --- | --- | --- |
| Cambiar carril | Deslizar a izquierda/derecha | ← / → o A / D |
| Saltar | Deslizar arriba | ↑, W o Espacio |
| Agacharse | Deslizar abajo | ↓ o S |
| Truco de giro | Saltar y deslizar lateral antes de 0,48 s | Salto y dirección lateral rápida |
| Pausar | Botón Ⅱ | P o Escape |

También hay cuatro botones táctiles como alternativa. La partida se pausa al ocultar la pestaña o perder el foco. «Terminar y guardar» contabiliza la partida en curso.

## Sistemas implementados

- Generación infinita con al menos un carril despejado por fila, barreras saltables, pórticos para deslizarse, contenedores y autobuses «EXPRESO A LUNA».
- Dificultad y velocidad progresivas, puntuación por distancia y monedas, colisión con fin de partida.
- Patinete con ruedas animadas, LEDs, sonido de motor sintetizado, batería y reducción de velocidad al agotarla.
- Cinco potenciadores aleatorios, siete segundos por defecto: aspirador (monedas cercanas de todos los carriles), mochila-dron (vuelo y cámara lateral elevada), overclock (puntos ×2), burbuja (un impacto) y sobrecarga (turbo y recarga). Iconos, efectos visuales, sonidos distintos y temporizadores.
- Trucos: giro de 360°, 150 puntos extra y pequeño impulso. La sobrecarga **no** concede inmunidad.
- Lluvia por tramos con luz cambiante, partículas y respuesta lateral más lenta.
- Monedas acumuladas, tres LEDs, dos carrocerías, dos atuendos de Ariel. Los artículos ya comprados se equipan sin volver a pagar.
- Tres misiones diarias acumulativas con recompensas reclamables una sola vez. Cambio de día según la fecha local.
- Veinte puntuaciones guardadas (diez visibles), nombre editable al terminar. Ranking, tienda y misiones son locales a cada navegador/dispositivo, no compartidos entre móviles.
- Ajustes de sonido, vibración y sensibilidad táctil; guardado con localStorage.

## Ariel y referencias

El modelo jugable tiene pelo largo, voluminoso y rizado castaño/cobrizo, inspirado en la foto nocturna. La superficie facial utiliza la fotografía original sin modificar como textura UV; el cuerpo, el patinete y los rizos se construyen como geometría 3D suave. La ilustración del panel de personaje es una referencia generada a partir de las fotos. No es un escaneo 3D y no representa una réplica facial idéntica desde todos los ángulos. La imagen de referencia generada conserva un fondo de cuadrícula.

`src/model-adapter.js` documenta el contrato de reemplazo y los nombres de animaciones/huesos. `createAriel()` en `src/world.js` es una fábrica intercambiable; las reglas de juego no dependen de sus mallas. El modelo actual usa partes articuladas, no un archivo GLB con esqueleto humanoide ya retargeteado. Para incorporar un escaneo/GLB riggeado, adapta su animador al contrato `draw(root, state, time)` y `dispose()`.

Luna aparece como guiño en el destino de los autobuses. No se ha añadido su foto como personaje jugable.

## Estructura

```text
ariel-volt/
  README.md
  package.json
  tests/core.test.mjs
  tests/offline.test.mjs
  dist/
    index.html
    style.css
    manifest.json
    sw.js
    README.md
    assets/
      three.module.js
      ariel-reference.jpeg
      ariel-concept.png
      icon-192.png
      icon-512.png
      icon-maskable.png
    src/
      app.js             UI, cámara, entrada y bucle
      config.js          dificultad, duraciones, tienda
      core.js            reglas, colisiones, progreso
      engine.js          geometría y adaptador Three.js
      world.js           ciudad, obstáculos, avatar
      model-adapter.js   contrato de personaje
      audio.js           síntesis de motor y efectos
```

Los sonidos se sintetizan con Web Audio: no hacen falta WAV/MP3 ni conexión. Three.js r170 está incluido localmente bajo licencia MIT, con el aviso de licencia en su módulo. Las fotos suministradas y la imagen generada se incluyen para este proyecto privado.

## Ajustar el juego

Edita `dist/src/config.js` para cambiar velocidad, aceleración, consumo, salto, duración de potenciadores, intervalos de lluvia, puntos y precios. Edita `world.js` para la ciudad y los modelos; `style.css` para la interfaz.

Después de modificar assets, cambia el nombre `CACHE` de `sw.js` y actualiza `ASSETS` si has añadido o quitado archivos. Publica la carpeta completa. El nuevo caché se instala íntegramente antes de activarse; si un asset falla, se conserva la versión anterior.

## Verificación

```sh
node tests/core.test.mjs
node tests/offline.test.mjs
```

Se han verificado por pruebas de lógica: colisiones/carriles, salto, deslizamiento, los cinco potenciadores, batería vacía y recarga, truco, lluvia, generación con carril libre, compra/equipado sin doble cargo, lectura de guardado, cambio de día, geometría y precaché de todos los recursos. También se comprueban sintaxis JavaScript y referencias locales.

No se ha ejecutado una prueba en un iPhone o Android físico ni una medición de FPS en esos dispositivos. Antes de distribuir una versión definitiva, comprueba en ambos: carga inicial, gestos, audio tras pulsar Jugar, añadir a inicio, reapertura en modo avión, compras tras reinicio y recuperación después de cambiar de aplicación. El render limita la densidad de píxeles a 1,5 y utiliza geometría compartida y sombras de 1024 px para moderar el coste en móvil.
