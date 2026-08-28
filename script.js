const surprise = document.querySelector("[data-surprise]");
const openButtons = document.querySelectorAll("[data-open-surprise]");
const closeButton = document.querySelector("[data-close-surprise]");
const confettiButton = document.querySelector("[data-confetti]");
const wishButton = document.querySelector("[data-new-wish]");
const wishOutput = document.querySelector("[data-wish-output]");
const backToTop = document.querySelector("[data-back-top]");

const wishes = [
  "a year full of gentle surprises",
  "the courage to chase every dream",
  "endless reasons to laugh out loud",
  "soft mornings and exciting nights",
  "people who always choose you",
  "a pocket full of everyday magic",
  "more cake than problems",
];

const confettiColors = ["#f970ad", "#fff0a9", "#8fe4df", "#c9b4ff", "#ffffff", "#bfe78c"];

function burstConfetti(amount = 90) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pieces = reducedMotion ? 18 : amount;

  for (let index = 0; index < pieces; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    piece.style.setProperty("--drift", `${Math.random() * 220 - 110}px`);
    piece.style.setProperty("--spin", `${Math.random() * 1080 - 540}deg`);
    piece.style.setProperty("--fall-time", `${2.4 + Math.random() * 2.2}s`);
    piece.style.animationDelay = `${Math.random() * 0.35}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    if (Math.random() > 0.65) piece.style.borderRadius = "50%";
    document.body.append(piece);
    window.setTimeout(() => piece.remove(), 5000);
  }
}

function openSurprise() {
  if (typeof surprise.showModal === "function") {
    surprise.showModal();
  } else {
    surprise.setAttribute("open", "");
  }
  burstConfetti();
}

function closeSurprise() {
  if (typeof surprise.close === "function") {
    surprise.close();
  } else {
    surprise.removeAttribute("open");
  }
}

openButtons.forEach((button) => button.addEventListener("click", openSurprise));
closeButton.addEventListener("click", closeSurprise);
confettiButton.addEventListener("click", () => burstConfetti(120));

surprise.addEventListener("click", (event) => {
  if (event.target === surprise) closeSurprise();
});

wishButton.addEventListener("click", () => {
  const currentWish = wishOutput.textContent.trim();
  const available = wishes.filter((wish) => wish !== currentWish);
  const nextWish = available[Math.floor(Math.random() * available.length)];
  wishOutput.animate(
    [
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 0, transform: "translateY(-7px)" },
      { opacity: 0, transform: "translateY(7px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    { duration: 360, easing: "ease-out" },
  );
  window.setTimeout(() => {
    wishOutput.textContent = nextWish;
  }, 170);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

if (window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateY(-5px)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("transform");
    });
  });
}
