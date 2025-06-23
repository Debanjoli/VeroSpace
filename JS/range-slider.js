document.addEventListener("DOMContentLoaded", function () {
  const leftThumb = document.querySelector(".range-thumb.left");
  const rightThumb = document.querySelector(".range-thumb.right");
  const track = document.querySelector(".range-track");
  const priceValues = document.querySelectorAll(".price-value");

  let isDragging = false;
  let currentThumb = null;

  function updateTrack() {
    const leftPercent = parseFloat(leftThumb.style.left) || 20;
    const rightPercent = 100 - (parseFloat(rightThumb.style.right) || 10);

    track.style.left = leftPercent + "%";
    track.style.right = 100 - rightPercent + "%";

    // Update price values
    const minPrice = Math.round(5000 + (leftPercent / 100) * 10000);
    const maxPrice = Math.round(5000 + (rightPercent / 100) * 10000);

    priceValues[0].textContent = `$ ${minPrice.toLocaleString()}`;
    priceValues[1].textContent = `$ ${maxPrice.toLocaleString()}`;
  }

  function handleMouseDown(e, thumb) {
    isDragging = true;
    currentThumb = thumb;
    e.preventDefault();
  }

  function handleMouseMove(e) {
    if (!isDragging || !currentThumb) return;

    const slider = document.querySelector(".range-slider");
    const rect = slider.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;

    if (currentThumb === leftThumb) {
      const maxLeft = 100 - (parseFloat(rightThumb.style.right) || 10) - 5;
      const newLeft = Math.max(0, Math.min(percent, maxLeft));
      leftThumb.style.left = newLeft + "%";
    } else {
      const maxRight = 100 - (parseFloat(leftThumb.style.left) || 20) - 5;
      const newRight = Math.max(0, Math.min(100 - percent, maxRight));
      rightThumb.style.right = newRight + "%";
    }

    updateTrack();
  }

  function handleMouseUp() {
    isDragging = false;
    currentThumb = null;
  }

  leftThumb.addEventListener("mousedown", (e) => handleMouseDown(e, leftThumb));
  rightThumb.addEventListener("mousedown", (e) =>
    handleMouseDown(e, rightThumb)
  );
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);

  // Touch events for mobile
  leftThumb.addEventListener("touchstart", (e) =>
    handleMouseDown(e.touches[0], leftThumb)
  );
  rightThumb.addEventListener("touchstart", (e) =>
    handleMouseDown(e.touches[0], rightThumb)
  );
  document.addEventListener("touchmove", (e) => handleMouseMove(e.touches[0]));
  document.addEventListener("touchend", handleMouseUp);

  // Initialize
  updateTrack();
});
