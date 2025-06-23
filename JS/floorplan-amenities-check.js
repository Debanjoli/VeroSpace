document.querySelectorAll(".amenity-item").forEach((item) => {
  item.addEventListener("click", function () {
    const checkbox = this.querySelector(".amenity-checkbox");
    const label = this.querySelector(".amenity-label");

    if (checkbox.classList.contains("checked")) {
      checkbox.classList.remove("checked");
      label.classList.remove("checked");
      label.classList.add("unchecked");
    } else {
      checkbox.classList.add("checked");
      label.classList.remove("unchecked");
      label.classList.add("checked");
    }
  });
});
