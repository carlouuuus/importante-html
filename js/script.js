const links=document.querySelectorAll(".nav-link[data-page]");
const pages=document.querySelectorAll(".page");

links.forEach(link=>{
  link.addEventListener("click",e=>{
    e.preventDefault();
    const page=link.dataset.page;

    links.forEach(item=>item.classList.remove("active"));
    link.classList.add("active");

    pages.forEach(section=>{
      section.classList.remove("active");
      if(section.dataset.page===page){
        setTimeout(()=>section.classList.add("active"),100);
      }
    });

    window.scrollTo({top:0,behavior:"smooth"});
  });
});

document.querySelectorAll(".btn-cart").forEach(button=>{
  button.addEventListener("click",()=>{
    const cart=document.querySelector(".cart-icon span");
    let count=parseInt(cart.textContent)||0;
    cart.textContent=count+1;
    button.innerHTML='<i class="bi bi-check-lg"></i> Agregado';
    setTimeout(()=>{
      button.innerHTML='<i class="bi bi-cart3"></i> Agregar al carrito';
    },1200);
  });
});

document.querySelectorAll(".favorite").forEach(button=>{
  button.addEventListener("click",()=>{
    const icon=button.querySelector("i");
    icon.classList.toggle("bi-heart");
    icon.classList.toggle("bi-heart-fill");
  });
});

const search=document.querySelector(".search-box input");
const products=document.querySelectorAll(".product-card");

if(search){
  search.addEventListener("input",()=>{
    const value=search.value.toLowerCase();

    products.forEach(product=>{
      const name=product.querySelector("h5").textContent.toLowerCase();
      product.style.display=name.includes(value)?"block":"none";
    });
  });
}