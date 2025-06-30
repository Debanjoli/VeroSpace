// DOM Elements
const mobileFilterBtn = document.getElementById("mobileFilterBtn");
const mobileCloseBtn = document.getElementById("mobileCloseBtn");
const mobileOverlay = document.getElementById("mobileOverlay");
const propertySidebar = document.getElementById("propertySidebar");
const propertyFilterForm = document.getElementById("propertyFilterForm");
const squareFeetRange = document.getElementById("squareFeetRange");
const priceRange = document.getElementById("priceRange");
const currentSquareFeet = document.getElementById("maxSquareFeet");
const currentPrice = document.getElementById("maxPrice");

// Mobile Sidebar Toggle Functions
function openSidebar() {
  propertySidebar.classList.add("mobile-open");
  mobileOverlay.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeSidebar() {
  propertySidebar.classList.remove("mobile-open");
  mobileOverlay.classList.remove("show");
  document.body.style.overflow = "";
}

// Event Listeners for Mobile Sidebar
mobileFilterBtn.addEventListener("click", openSidebar);
mobileCloseBtn.addEventListener("click", closeSidebar);
mobileOverlay.addEventListener("click", closeSidebar);

// Range Slider Updates
squareFeetRange.addEventListener("input", function () {
  currentSquareFeet.textContent = this.value + " sqft";
});

priceRange.addEventListener("input", function () {
  const value = Number.parseInt(this.value);
  currentPrice.textContent = "$" + value.toLocaleString();
});

// Form Validation and Submission
propertyFilterForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form elements
  const country = document.getElementById("propertyCountry");
  const city = document.getElementById("propertyCity");
  const category = document.getElementById("propertyCategory");

  // Get error message elements
  const countryError = document.getElementById("countryError");
  const cityError = document.getElementById("cityError");
  const categoryError = document.getElementById("categoryError");

  // Reset previous errors
  country.classList.remove("error");
  city.classList.remove("error");
  category.classList.remove("error");
  countryError.classList.remove("show");
  cityError.classList.remove("show");
  categoryError.classList.remove("show");

  let hasErrors = false;

  // Validate Country
  if (!country.value) {
    country.classList.add("error");
    countryError.classList.add("show");
    hasErrors = true;
  }

  // Validate City
  if (!city.value) {
    city.classList.add("error");
    cityError.classList.add("show");
    hasErrors = true;
  }

  // Validate Category
  if (!category.value) {
    category.classList.add("error");
    categoryError.classList.add("show");
    hasErrors = true;
  }

  // If no errors, process form
  if (!hasErrors) {
    // Collect form data
    const formData = {
      country: country.value,
      city: city.value,
      category: category.value,
      amenities: [],
      bedrooms: [],
      squareFeet: squareFeetRange.value,
      priceRange: priceRange.value,
    };

    // Collect checked amenities
    const amenityCheckboxes = document.querySelectorAll(
      'input[name="amenities"]:checked'
    );
    amenityCheckboxes.forEach((checkbox) => {
      formData.amenities.push(checkbox.value);
    });

    // Collect checked bedrooms
    const bedroomCheckboxes = document.querySelectorAll(
      'input[name="bedrooms"]:checked'
    );
    bedroomCheckboxes.forEach((checkbox) => {
      formData.bedrooms.push(checkbox.value);
    });

    console.log("Form submitted with data:", formData);

    // Show success message (you can customize this)
    alert("Filters applied successfully!");

    // Close sidebar on mobile after applying filters
    if (window.innerWidth <= 576) {
      closeSidebar();
    }

    // Here you would typically filter the properties based on the form data
    // For now, we'll just log the data
  }
});

// Clear errors when user starts typing/selecting
document
  .getElementById("propertyCountry")
  .addEventListener("change", function () {
    this.classList.remove("error");
    document.getElementById("countryError").classList.remove("show");
  });

document.getElementById("propertyCity").addEventListener("change", function () {
  this.classList.remove("error");
  document.getElementById("cityError").classList.remove("show");
});

document
  .getElementById("propertyCategory")
  .addEventListener("change", function () {
    this.classList.remove("error");
    document.getElementById("categoryError").classList.remove("show");
  });

// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 576) {
    closeSidebar();
  }
});

// Prevent body scroll when sidebar is open on mobile
document.addEventListener("DOMContentLoaded", () => {
  // Initialize range slider displays
  currentSquareFeet.textContent = squareFeetRange.value + " sqft";
  currentPrice.textContent =
    "$" + Number.parseInt(priceRange.value).toLocaleString();
});
