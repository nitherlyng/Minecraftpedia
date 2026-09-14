/* ============================================
   MODO OSCURO / CLARO
  
   ============================================ */
const boton = document.getElementById('boton-modo');

boton.addEventListener('click', () => {
  document.body.classList.toggle('oscuro');
  const esOscuro = document.body.classList.contains('oscuro');
  boton.textContent = esOscuro ? '☀️ Modo claro' : '🌙 Modo oscuro';
});


/* ============================================
   CARRUSEL (con imágenes)
   Movemos la "pista" con transform: translateX
   Cada carrusel-item ya trae su propia <img>.
   ============================================ */
const pista = document.getElementById('pista-carrusel');
const totalItems = pista.children.length;
let indiceActual = 0;

// Creamos los puntitos de navegación automáticamente
const contenedorPuntos = document.getElementById('puntos-carrusel');
for (let i = 0; i < totalItems; i++) {
  const punto = document.createElement('span');
  punto.classList.add('punto');
  if (i === 0) punto.classList.add('activo');
  punto.addEventListener('click', () => irACarrusel(i));
  contenedorPuntos.appendChild(punto);
}

function actualizarCarrusel() {
  pista.style.transform = `translateX(-${indiceActual * 100}%)`;
  document.querySelectorAll('.punto').forEach((p, i) => {
    p.classList.toggle('activo', i === indiceActual);
  });
}

function moverCarrusel(direccion) {
  indiceActual = (indiceActual + direccion + totalItems) % totalItems;
  actualizarCarrusel();
}

function irACarrusel(i) {
  indiceActual = i;
  actualizarCarrusel();
}

// El carrusel avanza solo cada 5 segundos
setInterval(() => moverCarrusel(1), 5000);


/* ============================================
   BUSCADOR
   Recorre las tarjetas y muestra solo las que coinciden
   con lo que el usuario escribió.
   ============================================ */
function buscarTarjeta() {
  const texto = document.getElementById('campo-busqueda').value.toLowerCase();
  const tarjetas = document.querySelectorAll('#grid-tarjetas .tarjeta');

  tarjetas.forEach(tarjeta => {
    const nombre = tarjeta.querySelector('.tarjeta-cabecera span').textContent.toLowerCase();
    tarjeta.style.display = nombre.includes(texto) ? 'block' : 'none';
  });

  if (texto.trim() !== '') {
    tarjetas.forEach(tarjeta => {
      const nombre = tarjeta.querySelector('.tarjeta-cabecera span').textContent.toLowerCase();
      tarjeta.classList.toggle('abierta', nombre.includes(texto));
    });
    document.getElementById('info').scrollIntoView({ behavior: 'smooth' });
  }
}


/* ============================================
   DATO CURIOSO
   Un array simple con frases, elegimos una al azar.
   ============================================ */
const datos = [
  "Minecraft fue creado por Markus Persson (Notch) y se lanzó en el año 2011.",
  "El Enderman no puede tocar el agua, por eso huye de ella.",
  "Los Creepers nacieron por un error de programación: Notch quería hacer un cerdo.",
  "El bloque más raro de conseguir es el bloque de comando, no se consigue jugando normal.",
  "El Dragón del End fue el primer jefe (boss) del juego.",
  "Los aldeanos pueden convertirse en zombis aldeanos si un zombie los ataca.",
  "En el Nether, la brújula y el reloj no funcionan bien.",
  "Un día en Minecraft dura solo 20 minutos en la vida real."
];

function mostrarDato() {
  const indice = Math.floor(Math.random() * datos.length);
  document.getElementById('texto-dato').textContent = datos[indice];
}


/* ============================================
   IMAGEN: CREEPER HECHO CON DIVS (PIXEL ART)
   0 = verde, 1 = negro (ojos/boca), 2 = contorno
   ============================================ */
const mapaCreeper = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 0, 0, 0, 0, 0, 0, 2],
  [2, 1, 1, 0, 1, 1, 0, 2],
  [2, 1, 1, 0, 1, 1, 0, 2],
  [2, 0, 0, 1, 1, 0, 0, 2],
  [2, 0, 1, 1, 1, 1, 0, 2],
  [2, 0, 1, 0, 0, 1, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2]
];

const colores = { 0: '#5bbf3a', 1: '#1c1c1c', 2: '#2b2b1f' };
const arte = document.getElementById('arte-creeper');

mapaCreeper.forEach(fila => {
  fila.forEach(valor => {
    const pixel = document.createElement('div');
    pixel.style.background = colores[valor];
    arte.appendChild(pixel);
  });
});


/* ============================================
   FORMULARIO DE CONTACTO
   No envía a ningún servidor real, solo muestra un mensaje.
   ============================================ */
document.getElementById('form-contacto').addEventListener('submit', function (e) {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  document.getElementById('mensaje-envio').textContent =
    `¡Gracias, ${nombre}! Tu mensaje fue recibido. 🌱`;
  this.reset();
});