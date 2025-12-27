
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".testimonial-slider");
    const slides = document.querySelectorAll(".testimonial-card-wrapper");
    const dotsContainer = document.querySelector(".slider-dots");

    let currentIndex = 0;

    // Calculate how many cards are visible based on screen width
    function getVisibleCards() {
        if (window.innerWidth <= 576) return 1;
        if (window.innerWidth <= 992) return 2;
        return 3;
    }

    function getTotalDots() {
        return Math.ceil(slides.length / getVisibleCards());
    }

    function createDots() {
        dotsContainer.innerHTML = "";
        const totalDots = getTotalDots();

        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement("span");
            if (i === 0) dot.classList.add("active");

            dot.addEventListener("click", () => {
                currentIndex = i;
                updateSlider();
            });

            dotsContainer.appendChild(dot);
        }
    }

    function updateSlider() {
        const cardWidth = slides[0].offsetWidth + 24; // card width + gap
        const visibleCards = getVisibleCards();
        const offset = currentIndex * cardWidth * visibleCards;

        slider.style.transform = `translateX(-${offset}px)`;
        updateDots();
    }

    function updateDots() {
        const dots = document.querySelectorAll(".slider-dots span");
        dots.forEach(dot => dot.classList.remove("active"));
        if (dots[currentIndex]) dots[currentIndex].classList.add("active");
    }

    // Recalculate on resize
    window.addEventListener("resize", () => {
        currentIndex = 0;
        createDots();
        updateSlider();
    });

    // Init
    createDots();
    updateSlider();
});

