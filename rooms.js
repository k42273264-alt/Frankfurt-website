document.addEventListener("DOMContentLoaded", () => {
  // Filter Functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  const roomCards = document.querySelectorAll(".room-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      roomCards.forEach((card) => {
        const type = card.getAttribute("data-type");
        card.style.display = filter === "all" || type === filter ? "block" : "none";
      });
    });
  });

  // Modal Functionality
  const modal = document.getElementById("roomModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDetails = document.getElementById("modalDetails");
  const closeModal = document.querySelector(".modal-close");

  const getTranslation = (key, fallback) => {
    const lang = window.currentLang || localStorage.getItem("lang") || "en";
    return window.translations?.[lang]?.[key] || fallback;
  };

  const roomDetails = {
    "standard-single": {
      titleKey: "rooms_standard_single_title",
      titleFallback: "Standard Single Room",
      detailsKey: "rooms_standard_single_modal_desc",
      detailsFallback:
        "Fully air-conditioned room with 1 single bed. Features tea & coffee station, free WiFi, private bathroom, flat-screen TV, and work desk."
    },
    "standard-double": {
      titleKey: "rooms_standard_double_title",
      titleFallback: "Standard Double Room",
      detailsKey: "rooms_standard_double_modal_desc",
      detailsFallback:
        "Fully air-conditioned room with 1 double bed. Features tea & coffee station, free WiFi, private bathroom, flat-screen TV, and work desk."
    },
    superior: {
      titleKey: "rooms_superior_title",
      titleFallback: "Superior Room",
      detailsKey: "rooms_superior_modal_desc",
      detailsFallback:
        "Spacious fully air-conditioned room offering more space and comfort. Available with 1 double or 2 single beds."
    },
    privilege: {
      titleKey: "rooms_privilege_title",
      titleFallback: "Privilege Room",
      detailsKey: "rooms_privilege_modal_desc",
      detailsFallback:
        "Premium fully air-conditioned room with coffee machine, minibar, late check-out until 4:00 PM, and upgraded amenities."
    }
  };

  document.querySelectorAll(".details-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const roomKey = button.getAttribute("data-room");
      const room = roomDetails[roomKey];

      if (room && modal && modalTitle && modalDetails) {
        modalTitle.textContent = getTranslation(room.titleKey, room.titleFallback);
        modalDetails.textContent = getTranslation(room.detailsKey, room.detailsFallback);
        modal.classList.add("active");
      }
    });
  });

  if (closeModal && modal) {
    closeModal.addEventListener("click", () => modal.classList.remove("active"));

    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });
  }

  // Animation on Scroll
  const animatedElements = document.querySelectorAll("[data-animate]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.2 }
  );

  animatedElements.forEach((el) => observer.observe(el));
});