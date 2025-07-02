document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".propertySwiper", {
    // Basic settings
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    centeredSlides: false,

    // Responsive breakpoints
    breakpoints: {
      250: {
        slidesPerView: 0.5,
        spaceBetween: 10,
      },
      // When window width is >= 320px
      320: {
        slidesPerView: 1.2,
        spaceBetween: 20,
      },
      // When window width is >= 480px
      438: {
        slidesPerView: 1.4,
        spaceBetween: 20,
      },
      // When window width is >= 768px
      686: {
        slidesPerView: 2.4,
        spaceBetween: 25,
      },
      946: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      // When window width is >= 992px
      960: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      // When window width is >= 1200px
      1200: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },

    // Pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },

    // Mouse wheel control
    mousewheel: {
      enabled: true,
      forceToAxis: true,
    },

    // Keyboard control
    keyboard: {
      enabled: true,
    },

    // Grab cursor
    grabCursor: true,

    // Auto play (optional)
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    // Smooth transitions
    speed: 600,

    // Free mode for smoother scrolling
    freeMode: {
      enabled: true,
      sticky: true,
    },

    // Touch settings
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,

    // Effects
    effect: "slide",

    // On slide change
    on: {
      slideChange: function () {
        // Add any custom animations or effects here
        console.log("Slide changed to:", this.activeIndex);
      },
    },
  });

  // Add hover pause functionality
  const swiperContainer = document.querySelector(".propertySwiper");

  swiperContainer.addEventListener("mouseenter", () => {
    swiper.autoplay.stop();
  });

  swiperContainer.addEventListener("mouseleave", () => {
    swiper.autoplay.start();
  });

  // Add click handlers for buttons
  document.querySelectorAll(".detail-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const propertyTitle = e.target
        .closest(".property-card")
        .querySelector(".property-title").textContent;
      alert(`View details for: ${propertyTitle}`);
    });
  });

  document.querySelector(".all-listing-btn").addEventListener("click", (e) => {
    e.preventDefault();
    alert("Redirecting to all listings...");
  });
});
