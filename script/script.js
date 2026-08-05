document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closePanelBtn = document.getElementById('closePanelBtn');
    const sidePanel = document.getElementById('sidePanel');
    const sidePanelOverlay = document.getElementById('sidePanelOverlay');

    function openPanel() {
        if (sidePanel && sidePanelOverlay) {
            sidePanel.classList.add('open');
            sidePanelOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closePanel() {
        if (sidePanel && sidePanelOverlay) {
            sidePanel.classList.remove('open');
            sidePanelOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', openPanel);
    }

    if (closePanelBtn) {
        closePanelBtn.addEventListener('click', closePanel);
    }

    if (sidePanelOverlay) {
        sidePanelOverlay.addEventListener('click', closePanel);
    }

    // Close panel when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidePanel && sidePanel.classList.contains('open')) {
            closePanel();
        }
    });

    // Dynamic Text Underline Animation
    const services = [
        "GRAPHENE CERAMIC WASH",
        "CERAMIC WASH",
        "INTERIOR VACCUM",
        "CHEMICAL CLEAN",
        "FOAM WASH EXTERIOR",
        "CAR DRYCLEAN",
        "FOAM WASH",
        "INTERIOR DETAILED CLEANING",
        "BIKE WASH",
        "SMALL CAR WASH",
        "BIG CAR WASH"
    ];

    const animatedTextEl = document.getElementById('animatedHighlightText');
    const animatedUnderlineEl = document.getElementById('animatedHighlightUnderline');

    if (animatedTextEl && animatedUnderlineEl) {
        let currentIndex = 0;

        function animateServiceItem() {
            // 1. Draw underline from left to right covering the full text width
            animatedUnderlineEl.style.width = '100%';

            // 2. Hold for display, then transition out
            setTimeout(() => {
                // Shrink underline back to left
                animatedUnderlineEl.style.width = '0%';
                animatedTextEl.classList.add('fade-out');

                // Switch text after fade out
                setTimeout(() => {
                    currentIndex = (currentIndex + 1) % services.length;
                    animatedTextEl.textContent = services[currentIndex];
                    animatedTextEl.classList.remove('fade-out');
                    animatedTextEl.classList.add('fade-in');

                    setTimeout(() => {
                        animatedTextEl.classList.remove('fade-in');
                    }, 300);

                    // Repeat loop for next item
                    setTimeout(animateServiceItem, 300);
                }, 300);
            }, 2200);
        }

        // Start initial animation loop
        setTimeout(animateServiceItem, 400);
    }

    // Step-by-Step Box Content Animation for Car Wash Section
    const washStepElements = document.querySelectorAll('.wash-step');
    const washTitle = document.getElementById('washTitle');
    const washFeatures = document.getElementById('washFeatures');
    const washSubText = document.getElementById('washSubText');
    const leftBox = document.querySelector('.car-wash-left-box');

    const stepContents = [
        {
            subText: "01. Cleaning",
            title: "Car Washing Center<br>at your Door-Step!",
            features: [
                "Most Affordable Price",
                "Authorised Products",
                "Free Air Freshener<br><span class=\"feature-sub\">on every service.</span>"
            ]
        },
        {
            subText: "02. Washing",
            title: "High-Pressure Foam &<br>Eco-Friendly Wash",
            features: [
                "pH Neutral Snow Foam",
                "Underbody Water Blast",
                "Scratch-Free Microfiber Wash"
            ]
        },
        {
            subText: "03. Polishing",
            title: "Deep Paint Restoration &<br>Gloss Enhancement",
            features: [
                "Swirl & Scratch Reduction",
                "High-Gloss Machine Polish",
                "Mirror Finish Paint Shine"
            ]
        },
        {
            subText: "04. Coating",
            title: "9H Graphene & Ceramic<br>Shield Protection",
            features: [
                "Hydrophobic Water Repellent",
                "UV & Oxidation Protection",
                "Long-Lasting Surface Defense"
            ]
        }
    ];

    if (washStepElements.length > 0 && washTitle && washFeatures) {
        let currentStepIndex = 0;
        let stepInterval;

        function updateStepContent(index) {
            currentStepIndex = index;

            // Update step indicators active status
            washStepElements.forEach((el, idx) => {
                if (idx === index) {
                    el.classList.add('active');
                } else {
                    el.classList.remove('active');
                }
            });

            // Smooth fade animation effect for box contents using animate.css
            const animatedElements = [washSubText, washTitle, washFeatures];
            
            animatedElements.forEach(el => {
                if (el) {
                    el.classList.remove('animate__animated', 'animate__fadeInUp', 'animate__fadeOutDown');
                    el.classList.add('animate__animated', 'animate__fadeOutDown');
                }
            });

            setTimeout(() => {
                const data = stepContents[index];
                if (washSubText) washSubText.innerHTML = data.subText;
                if (washTitle) washTitle.innerHTML = data.title;
                if (washFeatures) {
                    washFeatures.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
                }

                animatedElements.forEach(el => {
                    if (el) {
                        el.classList.remove('animate__fadeOutDown');
                        el.classList.add('animate__fadeInUp');
                    }
                });
            }, 350);
        }

        function startStepRotation() {
            stepInterval = setInterval(() => {
                const nextIndex = (currentStepIndex + 1) % stepContents.length;
                updateStepContent(nextIndex);
            }, 4000);
        }

        // Allow manual click on step items
        washStepElements.forEach((stepEl, idx) => {
            stepEl.style.cursor = 'pointer';
            stepEl.addEventListener('click', () => {
                clearInterval(stepInterval);
                updateStepContent(idx);
                startStepRotation();
            });
        });

        // Start auto rotation
        startStepRotation();
    }

    // Interactive Before / After Slider Logic
    const baRangeInput = document.getElementById('baRangeInput');
    const baBeforeLayer = document.getElementById('baBeforeLayer');
    const baHandleLine = document.getElementById('baHandleLine');
    const baSliderContainer = document.getElementById('baSliderContainer');

    if (baRangeInput && baBeforeLayer && baHandleLine && baSliderContainer) {
        function updateSlider(val) {
            baBeforeLayer.style.width = val + '%';
            baHandleLine.style.left = val + '%';

            // Maintain full image width scaling inside the clipped overlay
            const innerImg = baBeforeLayer.querySelector('img');
            if (innerImg && baSliderContainer.offsetWidth > 0) {
                innerImg.style.width = baSliderContainer.offsetWidth + 'px';
            }
        }

        baRangeInput.addEventListener('input', (e) => {
            updateSlider(e.target.value);
        });

        // Recalculate inner image width on window resize
        window.addEventListener('resize', () => {
            updateSlider(baRangeInput.value);
        });

        // Initial alignment
        updateSlider(baRangeInput.value);
    }

    // Back to top button listener
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
