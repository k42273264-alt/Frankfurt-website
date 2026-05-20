document.addEventListener('DOMContentLoaded', () => {

    // ======================
    // Gallery Modal
    // ======================
    const galleryModal = document.getElementById('galleryModal');
    const galleryModalImage = document.getElementById('galleryModalImage');
    const galleryModalCaption = document.getElementById('galleryModalCaption');
    const closeGalleryModal = document.querySelector('.gallery-modal-close');

    if (galleryModal && galleryModalImage && closeGalleryModal) {

        const openGalleryModal = (imgSrc, caption = '') => {
            galleryModalImage.src = imgSrc;
            galleryModalCaption.textContent = caption;
            galleryModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeGalleryModalFunc = () => {
            galleryModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        // Attach click events to all gallery images
        document.querySelectorAll('.gallery-item img').forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                openGalleryModal(img.src, img.alt || '');
            });
        });

        closeGalleryModal.addEventListener('click', closeGalleryModalFunc);

        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) {
                closeGalleryModalFunc();
            }
        });

        // Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && galleryModal.classList.contains('active')) {
                closeGalleryModalFunc();
            }
        });
    }

    // ======================
    // Scroll Animations
    // ======================
    const animatedElements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // ======================
    // Mobile Menu (Shared)
    // ======================
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navContainer = document.querySelector('.nav-container');

    if (mobileToggle && navContainer) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navContainer.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // ======================
    // Header Scroll Effect
    // ======================
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ======================
    // Newsletter Form Validation
    // ======================
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput) {
                const email = emailInput.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    e.preventDefault();
                    alert('Please enter a valid email address.');
                    emailInput.focus();
                }
            }
        });
    }

    console.log('%cSunday Hotel Dortmund Dining Page Loaded Successfully', 'color: #2b4e72; font-weight: bold;');
});