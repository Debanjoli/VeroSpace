function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    // Format number with K+ suffix
    let displayValue;
    if (current >= 1000) {
      displayValue = Math.floor(current / 1000) + "K+";
    } else {
      displayValue = Math.floor(current).toString();
    }

    element.textContent = displayValue;
  }, 16);
}

// Intersection Observer for triggering animation when in view
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const numberElement = entry.target.querySelector(".stats-number");
      const target = parseInt(numberElement.dataset.target);
      animateCounter(numberElement, target);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Start observing all stats cards
document.addEventListener("DOMContentLoaded", () => {
  const statsCards = document.querySelectorAll(".stats-card");
  statsCards.forEach((card) => {
    observer.observe(card);
  });
});

// Fallback: Start animation after page load if intersection observer doesn't trigger
window.addEventListener("load", () => {
  setTimeout(() => {
    const numberElements = document.querySelectorAll(".stats-number");
    numberElements.forEach((element) => {
      if (element.textContent === "0") {
        const target = parseInt(element.dataset.target);
        animateCounter(element, target);
      }
    });
  }, 500);
});
