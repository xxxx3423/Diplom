// ===== SAFE LOAD (щоб сторінка не була чорна) =====
window.addEventListener("load", function () {
  document.body.classList.add("page-loaded");
});


// ===== BURGER MENU =====
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

if (burger && nav) {
  burger.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
}


// ===== BACK TO TOP =====
const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.classList.add("show-btn");
    } else {
      backToTop.classList.remove("show-btn");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


// ===== 3D CAROUSEL (тільки для services.html) =====
const carousel = document.getElementById("carousel");
const cards = document.querySelectorAll(".card3d");

if (carousel && cards.length > 0) {

  let current = 0;
  const step = 360 / cards.length;

  let autoRotate;
  let startX = 0;
  let isDragging = false;

  function layout() {
    cards.forEach((card, i) => {
      const angle = (i - current) * step;
      const radius = 420;

      card.style.transform = `
        rotateY(${angle}deg)
        translateZ(${radius}px)
      `;

      card.classList.remove("active", "inactive");

      if (i === current) {
        card.classList.add("active");
      } else {
        card.classList.add("inactive");
      }
    });
  }

  function startAutoRotate() {
    autoRotate = setInterval(() => {
      current = (current + 1) % cards.length;
      layout();
    }, 2500);
  }

  function stopAutoRotate() {
    clearInterval(autoRotate);
  }

  function normalize() {
    if (current < 0) current = cards.length - 1;
    if (current >= cards.length) current = 0;
  }

  layout();
  startAutoRotate();

  // mouse
  carousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    stopAutoRotate();
  });

  carousel.addEventListener("mouseup", (e) => {
    if (!isDragging) return;

    let diff = e.clientX - startX;

    if (diff > 50) current--;
    if (diff < -50) current++;

    normalize();
    layout();
    isDragging = false;
    startAutoRotate();
  });

  // touch
  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    stopAutoRotate();
  });

  carousel.addEventListener("touchend", (e) => {
    let diff = e.changedTouches[0].clientX - startX;

    if (diff > 50) current--;
    if (diff < -50) current++;

    normalize();
    layout();
    startAutoRotate();
  });

  // hover pause
  carousel.addEventListener("mouseenter", stopAutoRotate);
  carousel.addEventListener("mouseleave", startAutoRotate);
}