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

    // Car Wash 100% Counter & SVG Draw Animation
    const carRightImg = document.querySelector('.car-wash-right-img');
    if (carRightImg) {
        const carPath = carRightImg.querySelector('.car-path');
        const counterEl = document.getElementById('carProtectionCount');
        
        let pathLength = 500;
        if (carPath) {
            pathLength = carPath.getTotalLength() || 500;
            carPath.style.strokeDasharray = pathLength;
            carPath.style.strokeDashoffset = pathLength;
        }

        let counterAnimated = false;
        let svgLoopStarted = false;

        // Counter 1 to 100 runs ONLY ONE TIME
        function animateCounterOnce() {
            if (counterAnimated || !counterEl) return;
            counterAnimated = true;

            const duration = 2000; // 2 seconds
            let startTime = null;

            function animateCount(timestamp) {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Smooth cubic ease-out
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentVal = Math.floor(easeProgress * 100);
                
                counterEl.textContent = currentVal;

                if (progress < 1) {
                    requestAnimationFrame(animateCount);
                } else {
                    counterEl.textContent = '100';
                }
            }
            requestAnimationFrame(animateCount);
        }

        // SVG Path Draw animation loops with a 1.5-second pause
        function runSvgLoop() {
            if (!carPath) return;

            // 1. Reset stroke dashoffset instantly without transition
            carPath.style.transition = 'none';
            carPath.style.strokeDashoffset = pathLength;

            // 2. Force SVG reflow synchronously using getBoundingClientRect()
            void carPath.getBoundingClientRect();

            // 3. Queue animation start on next frame for reliable cross-browser execution
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    // Animate SVG Path Stroke Draw over 1.8 seconds
                    carPath.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    carPath.style.strokeDashoffset = '0';

                    // 1.8s draw animation + 1.5s pause = 3.3s total delay before next loop
                    setTimeout(() => {
                        runSvgLoop();
                    }, 3300);
                });
            });
        }

        function triggerCarWashSection() {
            animateCounterOnce();

            if (!svgLoopStarted) {
                svgLoopStarted = true;
                runSvgLoop();
            }
        }

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        triggerCarWashSection();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            observer.observe(carRightImg);
        } else {
            triggerCarWashSection();
        }
    }

    // Testimonial Person & Quote Smooth Auto Rotation
    const reviewPortraitImg = document.getElementById('reviewPortraitImg');
    const reviewQuoteText = document.getElementById('reviewQuoteText');
    const reviewQuoteAuthor = document.getElementById('reviewQuoteAuthor');

    const reviewData = [
        {
            image: "assets/review-persons.jpg",
            quote: "\"I was amazed by the level of detail and care in their service. My car looks brand new, and the convenience of a doorstep wash makes it unbeatable. Highly recommend!\"",
            author: "Rajesh M."
        },
        {
            image: "assets/review-persons2.png",
            quote: "\"The foam wash and paint protection exceeded all my expectations! Extremely professional team that values quality and customer satisfaction.\"",
            author: "Aarav Sharma"
        },
        {
            image: "assets/review-persons3.png",
            quote: "\"Top-notch detailing service right at my doorstep. Saved me so much time and my car has never looked cleaner. Will definitely book monthly!\"",
            author: "Balbir Singh"
        }
    ];

    if (reviewPortraitImg && reviewQuoteText && reviewQuoteAuthor) {
        let currentReviewIndex = 0;

        setInterval(() => {
            // Fade out current items
            reviewPortraitImg.classList.add('review-fade-out');
            reviewQuoteText.classList.add('review-fade-out');
            reviewQuoteAuthor.classList.add('review-fade-out');

            setTimeout(() => {
                currentReviewIndex = (currentReviewIndex + 1) % reviewData.length;
                const data = reviewData[currentReviewIndex];

                reviewPortraitImg.src = data.image;
                reviewQuoteText.textContent = data.quote;
                reviewQuoteAuthor.textContent = data.author;

                // Fade back in
                reviewPortraitImg.classList.remove('review-fade-out');
                reviewQuoteText.classList.remove('review-fade-out');
                reviewQuoteAuthor.classList.remove('review-fade-out');
            }, 400);
        }, 4000);
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

    // Work Gallery Popout Lightbox Logic
    const workGridItems = document.querySelectorAll('.work-grid-item');
    const workLightbox = document.getElementById('workLightbox');
    const workLightboxOverlay = document.getElementById('workLightboxOverlay');
    const workLightboxImg = document.getElementById('workLightboxImg');
    const workLightboxClose = document.getElementById('workLightboxClose');

    if (workGridItems.length > 0 && workLightbox && workLightboxImg) {
        function openWorkLightbox(src) {
            workLightboxImg.src = src;
            workLightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeWorkLightbox() {
            workLightbox.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                if (!workLightbox.classList.contains('active')) {
                    workLightboxImg.src = '';
                }
            }, 300);
        }

        workGridItems.forEach(item => {
            item.addEventListener('click', () => {
                const src = item.getAttribute('data-src') || item.querySelector('img')?.src;
                if (src) {
                    openWorkLightbox(src);
                }
            });
        });

        // Close on clicking cross icon
        if (workLightboxClose) {
            workLightboxClose.addEventListener('click', (e) => {
                e.stopPropagation();
                closeWorkLightbox();
            });
        }

        // Close on clicking overlay background
        if (workLightboxOverlay) {
            workLightboxOverlay.addEventListener('click', closeWorkLightbox);
        }

        // Close on clicking anywhere outside image container
        workLightbox.addEventListener('click', (e) => {
            if (e.target === workLightbox) {
                closeWorkLightbox();
            }
        });

        // Close on pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && workLightbox.classList.contains('active')) {
                closeWorkLightbox();
            }
        });
    }

    // Global Reusable Booking Modal Trigger Logic
    const bookingModal = document.getElementById('bookingModal');
    const bookingModalOverlay = document.getElementById('bookingModalOverlay');
    const bookingModalClose = document.getElementById('bookingModalClose');
    const bookingModalForm = document.getElementById('bookingModalForm');
    
    // Select all buttons that trigger the booking modal
    const bookingTriggers = document.querySelectorAll('.btn-book, .open-booking-modal, [data-open-modal="booking"]');

    function openBookingModal() {
        if (bookingModal) {
            bookingModal.classList.add('open');
            bookingModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeBookingModal() {
        if (bookingModal) {
            bookingModal.classList.remove('open');
            bookingModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    bookingTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openBookingModal();
        });
    });

    if (bookingModalClose) {
        bookingModalClose.addEventListener('click', closeBookingModal);
    }

    if (bookingModalOverlay) {
        bookingModalOverlay.addEventListener('click', closeBookingModal);
    }

    if (bookingModal) {
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                closeBookingModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && bookingModal && bookingModal.classList.contains('open')) {
            closeBookingModal();
        }
    });

    if (bookingModalForm) {
        bookingModalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('modalFullName')?.value || '';
            const service = document.getElementById('modalServiceSelect')?.value || 'service';
            
            alert(`Thank you, ${name}! Your booking request for "${service}" has been received. We will contact you shortly.`);
            bookingModalForm.reset();
            closeBookingModal();
        });
    }
});



