document.addEventListener("DOMContentLoaded", function () {
  navegacionFija();
  crearGaleria();
  resaltarEnlace();
  scrollNav();
});

function navegacionFija() {
  const header = document.querySelector(".header");
  const sobreFestival = document.querySelector(".sobre-festival");

  window.addEventListener("scroll", function () {
    if (sobreFestival.getBoundingClientRect().bottom < 1) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  });
}

function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");
  const CANTIDAD_IMAGENES = 16;

  for (let i = 1; i <= CANTIDAD_IMAGENES; i++) {
    const imagen = document.createElement("PICTURE");

    imagen.innerHTML = `
    <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
    <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
`;

    // Event Handler
    imagen.onclick = function () {
      mostrarImagen(i);
    };

    galeria.appendChild(imagen);
  }
}

// Función que genera el modal para mostrar la imagen
function mostrarImagen(i) {
  const imagen = document.createElement("PICTURE");
  imagen.innerHTML = `
    <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
    <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${i}.jpg" alt="imagen galeria">
`;

  const modal = document.createElement("DIV");
  modal.classList.add("modal");

  // Solo cerrar el modal al hacer clic en el área del modal
  modal.onclick = function (event) {
    // Cerrar solo si se hace clic en el fondo del modal
    if (event.target === modal) {
      cerrarModal();
    }
  };

  // Botón cerrar modal
  const cerrarModalBtn = document.createElement("BUTTON");
  cerrarModalBtn.textContent = "X";
  cerrarModalBtn.classList.add("btn-cerrar");

  // Usar función anónima para evitar la llamada inmediata
  cerrarModalBtn.onclick = function (event) {
    event.stopPropagation(); // Detener la propagación del evento
    cerrarModal();
  };

  modal.appendChild(imagen);
  modal.appendChild(cerrarModalBtn);

  const body = document.querySelector("body");
  body.classList.add("overflow-hidden");
  body.appendChild(modal);
}

// Función que cierra el modal para mostrar la imagen
function cerrarModal() {
  const modal = document.querySelector(".modal");

  if (modal) {
    modal.classList.add("fade-out");

    setTimeout(() => {
      modal.remove();
      const body = document.querySelector("body");
      body.classList.remove("overflow-hidden");
    }, 500);
  } else {
    console.warn("No se encontró el modal para cerrar.");
  }
}

// Función para resaltar los enlaces
function resaltarEnlace() {
  document.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navegacion-principal a");
    let actual = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        actual = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + actual) {
        link.classList.add("active");
      }
    });
  });
}

// Función para la transición de secciones
function scrollNav() {
  const navLinks = document.querySelectorAll(".navegacion-principal a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionScroll = e.target.getAttribute("href");
      const section = document.querySelector(sectionScroll);

      section.scrollIntoView({ behavior: "smooth" });
    });
  });
}
