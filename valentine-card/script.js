document.addEventListener("DOMContentLoaded", () => {
  const heartCard = document.getElementById("heartCard");
  const messageEl = document.getElementById("valentineMessage");

  if (!heartCard || !messageEl) return;

  let isFlipped = false;
  let confettiTimeoutId = null;
  let confettiIntervalId = null;

  const startConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const canvas = document.getElementById("confettiCanvas");
    const myConfetti = window.confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });

    confettiIntervalId = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(confettiIntervalId);
        return;
      }

      const particleCount = 90 * (timeLeft / duration);

      myConfetti({
        particleCount,
        spread: 70,
        origin: { y: 0.3, x: Math.random() * 0.4 + 0.3 },
        colors: ["#ff7ea8", "#ffb6cf", "#ffe9f4", "#ffd3e6"],
        scalar: 0.9,
      });
    }, 180);

    confettiTimeoutId = setTimeout(() => {
      clearInterval(confettiIntervalId);
      confettiIntervalId = null;
    }, duration + 200);
  };

  const stopConfetti = () => {
    if (confettiIntervalId) {
      clearInterval(confettiIntervalId);
      confettiIntervalId = null;
    }
    if (confettiTimeoutId) {
      clearTimeout(confettiTimeoutId);
      confettiTimeoutId = null;
    }
  };

  const flipToBack = () => {
    heartCard.classList.add("is-flipped");
    isFlipped = true;
    messageEl.textContent = "Ты моя валентинка! Муа";
    startConfetti();
  };

  const flipToFront = () => {
    heartCard.classList.remove("is-flipped");
    isFlipped = false;
    messageEl.textContent = "Будешь моей валентинкой. Тыкни на сердечко";
    stopConfetti();
  };

  heartCard.addEventListener("click", () => {
    if (!isFlipped) {
      flipToBack();
    } else {
      flipToFront();
    }
  });
});

