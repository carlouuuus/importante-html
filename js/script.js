const links = document.querySelectorAll(".nav-link[data-page]");
const pages = document.querySelectorAll(".page");

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const page = link.dataset.page;
    links.forEach(item => item.classList.remove("active"));
    link.classList.add("active");
    pages.forEach(section => {
      section.classList.remove("active");
      if (section.dataset.page === page) {
        setTimeout(() => section.classList.add("active"), 100);
      }
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

document.querySelectorAll(".btn-cart").forEach(button => {
  button.addEventListener("click", () => {
    const cart = document.querySelector(".cart-icon span");
    if (!cart) return;
    let count = parseInt(cart.textContent) || 0;
    cart.textContent = count + 1;
    button.innerHTML = '<i class="bi bi-check-lg"></i> Agregado';
    setTimeout(() => {
      button.innerHTML = '<i class="bi bi-cart3"></i> Agregar al carrito';
    }, 1200);
  });
});

document.querySelectorAll(".favorite").forEach(button => {
  button.addEventListener("click", () => {
    const icon = button.querySelector("i");
    if (!icon) return;
    icon.classList.toggle("bi-heart");
    icon.classList.toggle("bi-heart-fill");
  });
});

const search = document.querySelector(".search-box input");
const products = document.querySelectorAll(".product-card");

if (search) {
  search.addEventListener("input", () => {
    const value = search.value.toLowerCase();
    products.forEach(product => {
      const title = product.querySelector("h5");
      if (!title) return;
      const name = title.textContent.toLowerCase();
      product.style.display = name.includes(value) ? "block" : "none";
    });
  });
} function calificar() {
  const respuestas = ["c", "b", "a", "a", "b", "a", "b", "a", "b", "a"];
  let puntos = 0;

  for (let i = 1; i <= 10; i++) {
    const respuesta = document.querySelector(`input[name="p${i}"]:checked`);

    if (respuesta && respuesta.value === respuestas[i - 1]) {
      puntos++;
    }
  }

  const resultado = document.querySelector("#resultado");

  if (!resultado) return;

  let mensaje = "";

  if (puntos === 10) {
    mensaje = "¡PERFECTO! Todas tus respuestas son correctas.";
  } else if (puntos >= 8) {
    mensaje = "¡Excelente trabajo!";
  } else if (puntos >= 6) {
    mensaje = "¡Muy bien! Solo necesitas repasar algunos conceptos.";
  } else {
    mensaje = "Puedes volver a revisar las páginas informativas.";
  }

  resultado.innerHTML =
    "<strong>Resultado: " + puntos + "/10</strong><br>" + mensaje;

  resultado.style.display = "block";
  resultado.style.background = puntos >= 6 ? "#dff8e8" : "#ffe3e3";

  resultado.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}