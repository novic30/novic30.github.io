(function () {
  "use strict";

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Typewriter for the hero title
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const accent = heroTitle.querySelector(".accent");
    const cursor = heroTitle.querySelector(".cursor");
    const fullName = "Advic Singh";
    const accentText = accent ? accent.textContent : "> ";

    heroTitle.innerHTML = "";
    if (accent) heroTitle.appendChild(accent);
    const nameSpan = document.createElement("span");
    nameSpan.className = "typed-name";
    heroTitle.appendChild(document.createTextNode(" "));
    heroTitle.appendChild(nameSpan);
    if (cursor) heroTitle.appendChild(cursor);

    let i = 0;
    const speed = 70;
    function type() {
      if (i <= fullName.length) {
        nameSpan.textContent = fullName.slice(0, i);
        i++;
        setTimeout(type, speed);
      }
    }
    setTimeout(type, 300);
  }

  // Smooth scroll for in-page nav
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Subtle reveal on scroll
  const cards = document.querySelectorAll(".card");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    cards.forEach((c) => {
      c.style.opacity = "0";
      c.style.transform = "translateY(8px)";
      c.style.transition = "opacity 0.45s ease, transform 0.45s ease, border-color 0.2s ease, box-shadow 0.2s ease";
      io.observe(c);
    });
  }

  // Konami easter egg: ↑ ↑ ↓ ↓ ← → ← → B A -> matrix burst
  const seq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  let pos = 0;
  window.addEventListener("keydown", (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === seq[pos]) {
      pos++;
      if (pos === seq.length) {
        pos = 0;
        document.documentElement.style.transition = "filter 0.4s ease";
        document.documentElement.style.filter = "hue-rotate(120deg) saturate(1.6)";
        setTimeout(() => { document.documentElement.style.filter = ""; }, 1200);
      }
    } else {
      pos = 0;
    }
  });
})();
