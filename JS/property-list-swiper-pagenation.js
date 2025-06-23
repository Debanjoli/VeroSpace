let isAutoplayActive = true;

// Function to show property details
function showEstateDetails(estateName) {
  alert(`Showing details for ${estateName}`);
}

// Initialize Swiper with autoplay
const propertySwiper = new Swiper(".property-swiper-container", {
  // Basic settings
  slidesPerView: "auto",
  spaceBetween: 20,
  centeredSlides: false,
  grabCursor: true,
  loop: true,

  // Responsive breakpoints
  breakpoints: {
    320: {
      slidesPerView: 1.2,
      spaceBetween: 15,
      centeredSlides: true,
    },
    480: {
      slidesPerView: 1.5,
      spaceBetween: 15,
      centeredSlides: true,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
      centeredSlides: false,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
      centeredSlides: false,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 20,
      centeredSlides: false,
    },
  },

  // Navigation
  navigation: {
    nextEl: ".property-swiper-next",
    prevEl: ".property-swiper-prev",
  },

  // Pagination
  pagination: {
    el: ".property-swiper-pagination",
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 5,
  },

  // Autoplay
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
    reverseDirection: false,
  },

  // Touch settings
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  allowTouchMove: true,
  touchStartPreventDefault: false,

  // Keyboard control
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },

  // Mouse wheel control
  mousewheel: {
    enabled: true,
    sensitivity: 1,
    releaseOnEdges: true,
  },

  // Effects
  effect: "slide",

  // Smooth transitions
  speed: 600,

  // Events
  on: {
    init: function () {
      console.log(
        "Property Swiper initialized with",
        this.slides.length,
        "slides"
      );
    },
    slideChange: function () {
      console.log(
        "Slide changed to:",
        this.realIndex + 1,
        "of",
        this.slides.length
      );
    },
    autoplayStart: function () {
      console.log("Autoplay started");
    },
    autoplayStop: function () {
      console.log("Autoplay stopped");
    },
  },
});

// Toggle autoplay function
function toggleAutoplay() {
  const playBtn = document.getElementById("playBtn");

  if (isAutoplayActive) {
    propertySwiper.autoplay.stop();
    playBtn.innerHTML = "▶️ Play";
    playBtn.classList.remove("active");
    isAutoplayActive = false;
  } else {
    propertySwiper.autoplay.start();
    playBtn.innerHTML = "⏸️ Pause";
    playBtn.classList.add("active");
    isAutoplayActive = true;
  }
}

// Change autoplay speed
function changeSpeed(speed) {
  let delay;
  switch (speed) {
    case "slow":
      delay = 5000;
      break;
    case "normal":
      delay = 3000;
      break;
    case "fast":
      delay = 1500;
      break;
    default:
      delay = 3000;
  }

  propertySwiper.autoplay.stop();
  propertySwiper.params.autoplay.delay = delay;
  if (isAutoplayActive) {
    propertySwiper.autoplay.start();
  }

  console.log("Autoplay speed changed to:", speed, "with delay:", delay + "ms");
}

// Pause autoplay on hover
const swiperContainer = document.querySelector(".property-swiper-container");
swiperContainer.addEventListener("mouseenter", () => {
  if (isAutoplayActive) {
    propertySwiper.autoplay.stop();
  }
});

swiperContainer.addEventListener("mouseleave", () => {
  if (isAutoplayActive) {
    propertySwiper.autoplay.start();
  }
});

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    propertySwiper.slidePrev();
  } else if (e.key === "ArrowRight") {
    propertySwiper.slideNext();
  } else if (e.key === " ") {
    // Spacebar to toggle autoplay
    e.preventDefault();
    toggleAutoplay();
  }
});

// Custom methods for external control
window.propertyGallery = {
  goToSlide: function (index) {
    propertySwiper.slideTo(index);
  },
  nextSlide: function () {
    propertySwiper.slideNext();
  },
  prevSlide: function () {
    propertySwiper.slidePrev();
  },
  getCurrentSlide: function () {
    return propertySwiper.realIndex;
  },
  getTotalSlides: function () {
    return propertySwiper.slides.length;
  },
  toggleAutoplay: toggleAutoplay,
  setSpeed: changeSpeed,
};

// Auto-start message
console.log(
  "🏠 Property Gallery loaded with 12 properties and autoplay enabled!"
);
console.log("⌨️ Use arrow keys to navigate, spacebar to pause/play");
console.log("🖱️ Hover over gallery to pause autoplay");
