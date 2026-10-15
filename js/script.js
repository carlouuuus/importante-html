
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-link[data-page]");
  const pages = document.querySelectorAll(".page");

  links.forEach(link => {
    link.addEventListener("click", event => {
      const page = link.dataset.page;
      const target = document.querySelector(`.page[data-page="${page}"]`);
      if (!target) return;

      event.preventDefault();
      links.forEach(item => item.classList.remove("active"));
      link.classList.add("active");
      pages.forEach(section => section.classList.remove("active"));
      target.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  let cart = JSON.parse(localStorage.getItem("pinguiCart") || "[]");

  function actualizarCarrito() {
    const contador = document.querySelector(".cart-icon span");
    if (contador) {
      contador.textContent = cart.reduce((total, item) => total + item.cantidad, 0);
    }
    localStorage.setItem("pinguiCart", JSON.stringify(cart));
  }

  document.querySelectorAll(".btn-cart").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".product-card");
      if (!card) return;

      const nombre = card.querySelector("h5")?.textContent.trim() || "Producto Pingui";
      const precioTexto = card.querySelector("strong")?.textContent || "0";
      const precio = Number(precioTexto.replace(/[^\d.]/g, "")) || 0;
      const existente = cart.find(item => item.nombre === nombre);

      if (existente) {
        existente.cantidad++;
      } else {
        cart.push({ nombre, precio, cantidad: 1 });
      }

      actualizarCarrito();

      const textoOriginal = button.innerHTML;
      button.innerHTML = '<i class="bi bi-check-lg"></i> Agregado';
      button.disabled = true;

      setTimeout(() => {
        button.innerHTML = textoOriginal;
        button.disabled = false;
      }, 1200);
    });
  });

  actualizarCarrito();

  document.querySelectorAll(".favorite").forEach((button, index) => {
    const card = button.closest(".product-card");
    const nombre = card?.querySelector("h5")?.textContent.trim() || `producto-${index}`;
    const icon = button.querySelector("i");
    const favoritos = JSON.parse(localStorage.getItem("pinguiFavoritos") || "[]");

    if (icon && favoritos.includes(nombre)) {
      icon.classList.remove("bi-heart");
      icon.classList.add("bi-heart-fill");
      button.classList.add("favorito-activo");
    }

    button.addEventListener("click", () => {
      if (!icon) return;

      let guardados = JSON.parse(localStorage.getItem("pinguiFavoritos") || "[]");
      const activo = guardados.includes(nombre);

      guardados = activo
        ? guardados.filter(item => item !== nombre)
        : [...guardados, nombre];

      localStorage.setItem("pinguiFavoritos", JSON.stringify(guardados));
      icon.classList.toggle("bi-heart", activo);
      icon.classList.toggle("bi-heart-fill", !activo);
      button.classList.toggle("favorito-activo", !activo);
    });
  });

  const search = document.querySelector(".search-box input");
  const products = document.querySelectorAll(".product-card");

  if (search) {
    search.addEventListener("input", () => {
      const value = search.value.toLowerCase().trim();

      products.forEach(product => {
        const name = product.querySelector("h5")?.textContent.toLowerCase() || "";
        product.style.display = name.includes(value) ? "" : "none";
      });
    });
  }

  const themeButton = document.getElementById("themeToggle");

  function aplicarTema() {
    const oscuro = localStorage.getItem("pinguiTema") === "oscuro";
    document.body.classList.toggle("dark-mode", oscuro);

    if (themeButton) {
      themeButton.innerHTML = oscuro
        ? '<i class="bi bi-sun"></i>'
        : '<i class="bi bi-moon"></i>';

      themeButton.setAttribute(
        "aria-label",
        oscuro ? "Activar modo claro" : "Activar modo oscuro"
      );
    }
  }

  aplicarTema();

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      const oscuro = !document.body.classList.contains("dark-mode");
      localStorage.setItem("pinguiTema", oscuro ? "oscuro" : "claro");
      aplicarTema();
    });
  }

  const quizForm = document.getElementById("quizForm");

  if (quizForm) {
    quizForm.addEventListener("submit", event => {
      event.preventDefault();

      const respuestas = {
        p1: "b", p2: "a", p3: "c", p4: "b", p5: "b",
        p6: "a", p7: "c", p8: "a", p9: "a", p10: "b"
      };

      let puntos = 0;

      Object.entries(respuestas).forEach(([pregunta, correcta]) => {
        const seleccionada = quizForm.querySelector(`input[name="${pregunta}"]:checked`);
        if (seleccionada?.value === correcta) puntos++;
      });

      const resultado = document.getElementById("quizResultado");

      if (resultado) {
        resultado.textContent = `Obtuviste ${puntos} de 10 puntos. ${puntos === 10 ? "¡Excelente! 🐧" :
          puntos >= 7 ? "¡Muy bien! Sigue practicando." :
            "¡Sigue estudiando, puedes mejorar!"
          }`;

        resultado.style.display = "block";
        resultado.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });

    quizForm.addEventListener("reset", () => {
      const resultado = document.getElementById("quizResultado");

      if (resultado) {
        resultado.textContent = "";
        resultado.style.display = "none";
      }
    });
  }

  const resultadoAnterior = document.getElementById("resultado");
  if (resultadoAnterior) resultadoAnterior.style.display = "none";

  // Idioma español/inglés
  cambiarIdioma(localStorage.getItem("idiomaPingui") || "es");
});

function mostrarProducto() {
  alert("Has seleccionado: Peluche Pingüino");
}

function efectoJquery() {
  if (window.jQuery) {
    window.jQuery("#jquery-producto").stop(true, true).slideToggle(400);
  } else {
    const producto = document.getElementById("jquery-producto");
    if (producto) producto.hidden = !producto.hidden;
  }
}

function mostrarJSON() {
  const resultado = document.getElementById("json-resultado");
  if (!resultado) return;

  const producto = {
    nombre: "Peluche Pingüino",
    precio: 12.99,
    disponible: true
  };

  resultado.textContent =
    `Producto: ${producto.nombre} | Precio: $${producto.precio.toFixed(2)} | Disponible: ${producto.disponible ? "Sí" : "No"}`;
}

function calificar() {
  const respuestas = ["c", "b", "a", "a", "b", "a", "b", "a", "b", "a"];
  let puntos = 0;

  for (let i = 1; i <= 10; i++) {
    const respuesta = document.querySelector(`input[name="p${i}"]:checked`);
    if (respuesta && respuesta.value === respuestas[i - 1]) puntos++;
  }

  const resultado = document.getElementById("resultado");
  if (!resultado) return;

  const mensaje = puntos === 10
    ? "¡PERFECTO! Todas tus respuestas son correctas."
    : puntos >= 8
      ? "¡Excelente trabajo!"
      : puntos >= 6
        ? "¡Muy bien! Solo necesitas repasar algunos conceptos."
        : "Puedes volver a revisar las páginas informativas.";

  resultado.innerHTML = `<strong>Resultado: ${puntos}/10</strong><br>${mensaje}`;
  resultado.style.display = "block";
  resultado.style.background = puntos >= 6 ? "#dff8e8" : "#ffe3e3";
  resultado.scrollIntoView({ behavior: "smooth", block: "center" });
}

// Cambiar idioma usando el toggle

function cambiarIdioma(idioma) {
  document.documentElement.lang = idioma;

  document.querySelectorAll("[data-es][data-en]").forEach(elemento => {
    elemento.textContent = elemento.getAttribute("data-" + idioma);
  });

  localStorage.setItem("idiomaPingui", idioma);

  const boton = document.getElementById("idiomaToggle");
  if (boton) {
    boton.textContent = idioma === "es" ? "🇸🇻 Español" : "🇺🇸 English";
    boton.setAttribute("aria-label", idioma === "es" ? "Cambiar a inglés" : "Switch to Spanish");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  cambiarIdioma(localStorage.getItem("idiomaPingui") || "es");
});

