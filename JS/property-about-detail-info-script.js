// Price Range Functionality
const priceRange = document.getElementById("priceRange");
const minPriceDisplay = document.getElementById("minPrice");
const maxPriceDisplay = document.getElementById("maxPrice");

// Square Feet Range Functionality
const squareFeetRange = document.getElementById("squareFeetRange");
const minSquareFeetDisplay = document.getElementById("minSquareFeet");
const maxSquareFeetDisplay = document.getElementById("maxSquareFeet");

// Update price range display
priceRange.addEventListener("input", function () {
  const value = parseInt(this.value);
  const max = parseInt(this.max);

  minPriceDisplay.textContent = `$${value.toLocaleString()}`;
  maxPriceDisplay.textContent = `$${max.toLocaleString()}`;
});

// Update square feet range display
squareFeetRange.addEventListener("input", function () {
  const value = parseInt(this.value);
  const max = parseInt(this.max);

  minSquareFeetDisplay.textContent = `${value} sqft`;
  maxSquareFeetDisplay.textContent = `${max} sqft`;
});

// Form Validation
const form = document.getElementById("propertyFilterForm");
const countrySelect = document.getElementById("propertyCountry");
const citySelect = document.getElementById("propertyCity");
const categorySelect = document.getElementById("propertyCategory");

// Error message elements
const countryError = document.getElementById("countryError");
const cityError = document.getElementById("cityError");
const categoryError = document.getElementById("categoryError");

// Validation functions
function validateField(field, errorElement, errorMessage) {
  if (!field.value.trim()) {
    field.classList.add("error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("show");
    return false;
  } else {
    field.classList.remove("error");
    errorElement.classList.remove("show");
    return true;
  }
}

function clearFieldError(field, errorElement) {
  field.classList.remove("error");
  errorElement.classList.remove("show");
}

// Real-time validation
countrySelect.addEventListener("change", function () {
  if (this.value) {
    clearFieldError(this, countryError);
  }
});

citySelect.addEventListener("change", function () {
  if (this.value) {
    clearFieldError(this, cityError);
  }
});

categorySelect.addEventListener("change", function () {
  if (this.value) {
    clearFieldError(this, categoryError);
  }
});

// Form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  // Validate required fields
  if (!validateField(countrySelect, countryError, "Please select a country")) {
    isValid = false;
  }

  if (!validateField(citySelect, cityError, "Please select a city")) {
    isValid = false;
  }

  if (
    !validateField(
      categorySelect,
      categoryError,
      "Please select a property category"
    )
  ) {
    isValid = false;
  }

  if (isValid) {
    // Collect form data
    const formData = {
      country: countrySelect.value,
      city: citySelect.value,
      category: categorySelect.value,
      amenities: Array.from(
        document.querySelectorAll('input[name="amenities"]:checked')
      ).map((cb) => cb.value),
      bedrooms: Array.from(
        document.querySelectorAll('input[name="bedrooms"]:checked')
      ).map((cb) => cb.value),
      squareFeet: squareFeetRange.value,
      priceRange: priceRange.value,
    };

    console.log("Filter Applied:", formData);

    // Show success message
    const applyBtn = document.querySelector(".property-apply-btn");
    const originalText = applyBtn.textContent;
    applyBtn.textContent = "APPLIED!";
    applyBtn.style.background = "#10b981";

    setTimeout(() => {
      applyBtn.textContent = originalText;
      applyBtn.style.background = "#6366f1";
    }, 2000);

    // Here you would typically send the data to your backend
    // or filter the properties based on the selected criteria
    filterProperties(formData);
  } else {
    // Scroll to first error
    const firstError = document.querySelector(".property-select.error");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
});

// Property filtering function (demo)
function filterProperties(filters) {
  const properties = document.querySelectorAll(".property-listing-card");

  properties.forEach((property) => {
    // Simple demo filtering - in real app, this would be more sophisticated
    let shouldShow = true;

    // Example: Hide properties that don't match category
    const propertyType = property
      .querySelector(".property-card-type")
      .textContent.toLowerCase();
    if (filters.category && propertyType !== filters.category) {
      shouldShow = false;
    }

    // Show/hide property with animation
    if (shouldShow) {
      property.style.display = "flex";
      property.style.opacity = "0";
      setTimeout(() => {
        property.style.opacity = "1";
      }, 100);
    } else {
      property.style.opacity = "0";
      setTimeout(() => {
        property.style.display = "none";
      }, 300);
    }
  });
}

// Initialize range displays
priceRange.dispatchEvent(new Event("input"));
squareFeetRange.dispatchEvent(new Event("input"));

// Detail button functionality
document.querySelectorAll(".property-detail-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const propertyTitle = this.closest(".property-listing-card").querySelector(
      ".property-card-title"
    ).textContent;
    alert(`Viewing details for: ${propertyTitle}`);
  });
});
