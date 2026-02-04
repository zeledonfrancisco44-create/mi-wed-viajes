
// Año automático en el footer
document.getElementById("year").textContent = new Date().getFullYear();

// Resaltar enlace activo (la página actual)
const currentPage = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav a").forEach((link) => {
  const href = link.getAttribute("href");
  if (href === currentPage) {
    link.style.background = "rgba(10,92,255,0.12)";
  }
});

// Modal genérico reutilizable
function abrirModal(html) {
  const overlay = document.getElementById('modal-overlay');
  const contenido = document.getElementById('modal-contenido');
  if (!overlay || !contenido) return;
  contenido.innerHTML = html;
  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function cerrarModal() {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;
  overlay.style.display = 'none';
  document.body.style.overflow = '';
}
document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) cerrarModal();
    });
    const btnCerrar = document.getElementById('modal-cerrar');
    if (btnCerrar) btnCerrar.onclick = cerrarModal;
  }
});

// Blog: artículos, filtro y modales
const articulosBlog = [
  {
    id: 1,
    titulo: "5 Consejos para Viajar Seguro",
    fecha: "2026-01-10",
    categoria: "Consejos",
    resumen: "Descubre cómo prepararte y viajar con tranquilidad a cualquier destino.",
    contenido: `<p>Viajar seguro es fundamental. Aquí tienes 5 consejos clave:</p><ul><li>Investiga tu destino antes de viajar.</li><li>Contrata un seguro de viaje.</li><li>Lleva copias digitales de tus documentos.</li><li>Infórmate sobre la salud y vacunas necesarias.</li><li>Mantén contacto con familiares o amigos.</li></ul>`
  },
  {
    id: 2,
    titulo: "Destinos imperdibles en 2026",
    fecha: "2026-01-22",
    categoria: "Destinos",
    resumen: "Te presentamos los lugares más recomendados para este año.",
    contenido: `<p>Algunos destinos top para 2026:</p><ul><li>Kioto, Japón: cultura y naturaleza.</li><li>Lisboa, Portugal: historia y gastronomía.</li><li>Patagonia, Argentina: paisajes únicos.</li><li>Islas Griegas: playas y relax.</li></ul>`
  },
  {
    id: 3,
    titulo: "Cómo ahorrar en tu próximo viaje",
    fecha: "2026-02-01",
    categoria: "Presupuesto",
    resumen: "Tips prácticos para viajar más gastando menos.",
    contenido: `<p>Viajar no tiene que ser caro. Prueba esto:</p><ul><li>Reserva con anticipación.</li><li>Viaja en temporada baja.</li><li>Compara precios de vuelos y hoteles.</li><li>Usa transporte público.</li></ul>`
  },
  {
    id: 4,
    titulo: "Viajar solo: ventajas y retos",
    fecha: "2026-02-03",
    categoria: "Consejos",
    resumen: "¿Pensando en viajar solo? Esto es lo que debes saber.",
    contenido: `<p>Viajar solo te da libertad, pero también implica retos:</p><ul><li>Planifica bien tu itinerario.</li><li>Elige alojamientos seguros.</li><li>Conecta con otros viajeros.</li><li>Confía en tu intuición.</li></ul>`
  },
  {
    id: 5,
    titulo: "Guía rápida: Nueva York",
    fecha: "2026-01-28",
    categoria: "Destinos",
    resumen: "Lo esencial para disfrutar la Gran Manzana.",
    contenido: `<p>Para aprovechar tu viaje a Nueva York:</p><ul><li>Visita Central Park y museos.</li><li>Prueba la comida callejera.</li><li>Compra entradas a espectáculos con tiempo.</li><li>Camina por barrios icónicos como Brooklyn y Manhattan.</li></ul>`
  },
  {
    id: 6,
    titulo: "Presupuesto viajero: ¿cuánto cuesta Europa?",
    fecha: "2026-01-15",
    categoria: "Presupuesto",
    resumen: "Calcula gastos y planifica tu viaje europeo.",
    contenido: `<p>Europa puede ser accesible si planificas:</p><ul><li>Define tu ruta y ciudades.</li><li>Reserva trenes y vuelos internos con antelación.</li><li>Busca alojamientos económicos.</li><li>Considera pases turísticos para ahorrar en atracciones.</li></ul>`
  }
];

function renderBlogArticulos(filtro) {
  const lista = document.getElementById('blog-lista');
  if (!lista) return;
  let articulos = articulosBlog;
  if (filtro && filtro !== 'todas') {
    articulos = articulos.filter(a => a.categoria === filtro);
  }
  if (articulos.length === 0) {
    lista.innerHTML = '<p style="grid-column:1/-1;">No hay artículos en esta categoría.</p>';
    return;
  }
  lista.innerHTML = articulos.map(a => `
    <article class="card">
      <h2>${a.titulo}</h2>
      <p class="muted" style="font-size:13px;">${a.fecha} · ${a.categoria}</p>
      <p>${a.resumen}</p>
      <button class="btn" onclick="abrirModal(articulosBlog[${a.id-1}].contenido)">Leer más</button>
    </article>
  `).join('');
}

document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('blog-lista')) {
    renderBlogArticulos('todas');
    const filtro = document.getElementById('filtro-categoria');
    if (filtro) {
      filtro.addEventListener('change', function () {
        renderBlogArticulos(this.value);
      });
    }
  }
});
