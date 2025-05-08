let bootstrapModal;

function createCarousel(items) {
  const container = document.getElementById("carouselInner");
  container.innerHTML = "";

  items.forEach((photo, index) => {
    const slide = document.createElement("div");
    slide.className = `carousel-item${index === 0 ? " active" : ""}`;
    slide.innerHTML = `
      <img src="${photo.src}" class="d-block w-100" style="max-height: 70vh; object-fit: contain;" alt="Slide ${index}">
      <div class="carousel-caption d-none d-md-block">
        <p>${photo.caption}</p>
      </div>
    `;
    container.appendChild(slide);
  });

  const bsCarousel = bootstrap.Carousel.getOrCreateInstance(document.getElementById("carouselPhotos"));
  bsCarousel.to(0);
}

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: { lat: 53.5344, lng: -113.4786 },
  });

  fetch("pins.json")
    .then((res) => res.json())
    .then((locations) => {
      locations.forEach((location) => {
        const marker = new google.maps.Marker({
          position: location.position,
          map: map,
          title: location.title,
        });

        marker.addListener("click", () => {
          console.log("Pin clicked:", location.title);
          createCarousel(location.photos);
          document.getElementById("modalTitle").textContent = location.title;
          const modalElement = document.getElementById("photoModal");
          bootstrapModal = new bootstrap.Modal(modalElement);
          bootstrapModal.show();
        });
      });
    })
    .catch((err) => console.error("Error loading pins:", err));
}
