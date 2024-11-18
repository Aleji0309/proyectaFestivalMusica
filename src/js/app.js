document.addEventListener("DOMContentLoaded", function () {
  navegacionFija();
  crearGaleria();
});

function navegacionFija() {
  const header = document.querySelector(".header");
  const sobreFestival = document.querySelector(".sobre-festival");

  window.addEventListener("scroll", function () {
    if (sobreFestival.getBoundingClientRect().bottom < 1) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }
  });
}

function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");
  const CANTIDAD_IMAGENES = 16;

  for (let i = 1; i <= CANTIDAD_IMAGENES; i++) {
    const imagen = document.createElement("IMG");
    imagen.src = `src/img/gallery/full/${i}.jpg`;
    imagen.alt = "Imagen Galeria";

    // Event Handler
    imagen.onclick = function () {
      mostrarImagen(i);
    };

    galeria.appendChild(imagen);
  }
}

// Función que genera el modal para mostrar la imagen
function mostrarImagen(i) {
  const imagen = document.createElement("IMG");
  imagen.src = `src/img/gallery/full/${i}.jpg`;
  imagen.alt = "Imagen Galeria";

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