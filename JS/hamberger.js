const hamburger = document.getElementById("hamberger");
const mobileNav = document.getElementById("nav");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");
const navLinks = document.querySelectorAll(".nav ul li a");

// Function to open mobile menu
function openMobileMenu() {
  hamburger.classList.add("active");
  mobileNav.classList.add("active");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent scrolling
}

// Function to close mobile menu
function closeMobileMenu() {
  hamburger.classList.remove("active");
  mobileNav.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "auto"; // Restore scrolling
}

// Toggle mobile menu when hamburger is clicked
hamburger.addEventListener("click", function () {
  if (mobileNav.classList.contains("active")) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

// Close mobile menu when close button is clicked
closeBtn.addEventListener("click", closeMobileMenu);

// Close mobile menu when overlay is clicked
overlay.addEventListener("click", closeMobileMenu);

// Close mobile menu when any nav link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// Close mobile menu when Escape key is pressed
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && mobileNav.classList.contains("active")) {
    closeMobileMenu();
  }
});

// Close mobile menu when window is resized to desktop size
window.addEventListener("resize", function () {
  if (window.innerWidth >= 778 && mobileNav.classList.contains("active")) {
    closeMobileMenu();
  }
});

// Modal functionality
const loginBtn = document.getElementById("loginBtn");
const mobileLoginBtn = document.getElementById("mobileLoginBtn");
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const closeLoginModal = document.getElementById("closeLoginModal");
const closeRegisterModal = document.getElementById("closeRegisterModal");
const forgotPasswordLink = document.getElementById("forgotPasswordLink");
const switchToRegister = document.getElementById("switchToRegister");
const switchToLogin = document.getElementById("switchToLogin");

// Open login modal
function openLoginModal() {
  loginModal.classList.add("active");
  // Close mobile nav if open
  mobileNav.classList.remove("active");
  overlay.classList.remove("active");
}

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  openLoginModal();
});

mobileLoginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  openLoginModal();
});

// Close modals
closeLoginModal.addEventListener("click", () => {
  loginModal.classList.remove("active");
});

closeRegisterModal.addEventListener("click", () => {
  registerModal.classList.remove("active");
});

// Close modal when clicking outside
loginModal.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.classList.remove("active");
  }
});

registerModal.addEventListener("click", (e) => {
  if (e.target === registerModal) {
    registerModal.classList.remove("active");
  }
});

// Switch between modals
forgotPasswordLink.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.classList.remove("active");
  registerModal.classList.add("active");
});

switchToRegister.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.classList.remove("active");
  registerModal.classList.add("active");
});

switchToLogin.addEventListener("click", (e) => {
  e.preventDefault();
  registerModal.classList.remove("active");
  loginModal.classList.add("active");
});

// Form submissions
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Login form submitted!");
  // Add your login logic here
});

document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Registration form submitted!");
  // Add your registration logic here
});

// Close modals with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    loginModal.classList.remove("active");
    registerModal.classList.remove("active");
  }
});
