// File upload functionality
document.getElementById("fileInput").addEventListener("change", function (e) {
  const files = e.target.files;
  if (files.length > 0) {
    const fileUpload = document.querySelector(".file-upload");
    fileUpload.innerHTML = `
                    <div class="file-upload-icon">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <div class="file-upload-text">${files.length} file(s) selected</div>
                `;
  }
});

// Drag and drop functionality
const fileUpload = document.querySelector(".file-upload");

fileUpload.addEventListener("dragover", function (e) {
  e.preventDefault();
  this.style.borderColor = "#6366f1";
  this.style.background = "#f0f4ff";
});

fileUpload.addEventListener("dragleave", function (e) {
  e.preventDefault();
  this.style.borderColor = "#cbd5e0";
  this.style.background = "#f7fafc";
});

fileUpload.addEventListener("drop", function (e) {
  e.preventDefault();
  this.style.borderColor = "#cbd5e0";
  this.style.background = "#f7fafc";

  const files = e.dataTransfer.files;
  if (files.length > 0) {
    document.getElementById("fileInput").files = files;
    this.innerHTML = `
                    <div class="file-upload-icon">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <div class="file-upload-text">${files.length} file(s) selected</div>
                `;
  }
});

// Form submission
function submitForm() {
  // Collect form data
  const formData = {
    propertyTitle: document.querySelector('input[placeholder="Property Title"]')
      .value,
    type: document.querySelector("select").value,
    // Add more form data collection as needed
  };

  // Basic validation
  if (!formData.propertyTitle) {
    alert("Please enter a property title");
    return;
  }

  // Here you would typically send the data to a server
  alert("Property submitted successfully!");
  console.log("Form data:", formData);
}

// Enhanced form validation
document.querySelectorAll(".input-field, .select-field").forEach((field) => {
  field.addEventListener("blur", function () {
    if (this.value.trim() === "" && this.hasAttribute("required")) {
      this.style.borderColor = "#ef4444";
    } else {
      this.style.borderColor = "#e2e8f0";
    }
  });
});
