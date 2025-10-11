console.log("main.js loaded");

// ==========================================
// VARIABLE DECLARATIONS
// ==========================================
// Navigation
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

// Video Player
const videoPlayer = document.querySelector('#player-container video');
const oldVideoControls = document.querySelector('#video-controls');

// Countdown
const countdownElement = document.querySelector('#countdown-timer');
const eventDate = new Date('April 23, 2026 16:30:00').getTime();

// Scroll Animation
const animatedElements = document.querySelectorAll('.industry-wrap, .experience-wrap, .imd-info, .sp-wrap, .exh-wrap, .team-wrap, .show-wrap, .member-card, .show-item');

// Portfolio Filter
const filterButtons = document.querySelectorAll('.show-filters .chip');
const portfolioItems = document.querySelectorAll('.show-item');

// Lightbox
let currentLightboxImages = [];
let currentLightboxIndex = 0;

// Header
const header = document.querySelector('.head');
let lastScrollPosition = 0;

// Team Cards
const teamCards = document.querySelectorAll('.member-card');

// Portfolio Actions
const portfolioActions = document.querySelectorAll('.show-action');

// Gallery Images
const galleries = document.querySelectorAll('.imd-gallery, .exh-thumbs, .industry-gallery');

// ==========================================
// PLYR VIDEO PLAYER SETUP
// ==========================================

function initVideoPlayer() {
    // I'm checking if Plyr library is loaded and video exists
    if (videoPlayer && typeof Plyr !== 'undefined') {
        const player = new Plyr(videoPlayer, {
            controls: [
                'play-large',
                'play',
                'progress',
                'current-time',
                'mute',
                'volume',
                'fullscreen'
            ],
            settings: [],
            ratio: '16:9',
            clickToPlay: true,
            hideControls: true,
            resetOnEnd: true
        });

        // I'm removing the old custom controls since Plyr handles this now
        if (oldVideoControls) {
            oldVideoControls.remove();
        }
    }
}

// ==========================================
// COUNTDOWN TIMER FUNCTIONS
// ==========================================

function updateCountdownDisplay() {
    // I'm calculating the time remaining until the event
    const currentTime = new Date().getTime();
    const timeRemaining = eventDate - currentTime;

    if (timeRemaining < 0) {
        countdownElement.innerHTML = '<span class="countdown-expired">Event has started!</span>';
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `
        <div class="countdown-grid">
            <div class="countdown-item">
                <span class="countdown-number">${days}</span>
                <span class="countdown-label">Days</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${hours}</span>
                <span class="countdown-label">Hours</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${minutes}</span>
                <span class="countdown-label">Minutes</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${seconds}</span>
                <span class="countdown-label">Seconds</span>
            </div>
        </div>
    `;
}

function initCountdown() {
    if (!countdownElement) return;
    
    updateCountdownDisplay();
    setInterval(updateCountdownDisplay, 1000);
}

// ==========================================
// SMOOTH SCROLL NAVIGATION
// ==========================================

function handleSmoothScroll(event) {
    event.preventDefault();
    // I'm getting the target section from the href attribute
    const targetId = event.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ==========================================
// SCROLL ANIMATIONS (INTERSECTION OBSERVER)
// ==========================================

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // I'm adding the animation class when element is visible
            entry.target.classList.add('animate-in');
        } else {
            // I'm removing the animation class when element is not visible
            // This allows the animation to trigger again when scrolling back
            entry.target.classList.remove('animate-in');
        }
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// ==========================================
// PORTFOLIO FILTER SYSTEM
// ==========================================

function handleFilterClick(event) {
    // I'm removing active class from all buttons first
    filterButtons.forEach(button => button.classList.remove('chip-all'));
    
    // I'm adding active class to the clicked button
    event.currentTarget.classList.add('chip-all');

    const filterValue = event.currentTarget.textContent.trim().toUpperCase();

    portfolioItems.forEach(item => {
        const roleElement = item.querySelector('.show-role');
        const role = roleElement.textContent.trim().toUpperCase();
        
        if (filterValue === 'ALL' || role.includes(filterValue)) {
            item.style.display = 'grid';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 10);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

function initPortfolioFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });
}

// ==========================================
// LIGHTBOX GALLERY
// ==========================================

function updateLightboxImage() {
    const lightboxImg = document.querySelector('.lightbox-img');
    lightboxImg.src = currentLightboxImages[currentLightboxIndex].src;
    lightboxImg.alt = currentLightboxImages[currentLightboxIndex].alt;
}

function openLightbox(images, index) {
    currentLightboxImages = images;
    currentLightboxIndex = index;
    const lightbox = document.querySelector('.lightbox');
    updateLightboxImage();
    lightbox.classList.add('lightbox-active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    lightbox.classList.remove('lightbox-active');
    document.body.style.overflow = '';
}

function showPreviousImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
    updateLightboxImage();
}

function showNextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxImages.length;
    updateLightboxImage();
}

function handleLightboxClick(event) {
    if (event.target === event.currentTarget) {
        closeLightbox();
    }
}

function handleLightboxKeyboard(event) {
    const lightbox = document.querySelector('.lightbox');
    if (!lightbox.classList.contains('lightbox-active')) return;
    
    if (event.key === 'Escape') {
        closeLightbox();
    } else if (event.key === 'ArrowLeft') {
        showPreviousImage();
    } else if (event.key === 'ArrowRight') {
        showNextImage();
    }
}

function handleGalleryImageClick(images, index) {
    return function() {
        openLightbox(images, index);
    };
}

function createLightbox() {
    // I'm creating the lightbox container dynamically
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
        <button class="lightbox-prev" aria-label="Previous image">&#10094;</button>
        <button class="lightbox-next" aria-label="Next image">&#10095;</button>
        <img class="lightbox-img" src="" alt="Gallery image">
        <div class="lightbox-caption"></div>
    `;
    document.body.appendChild(lightbox);

    // I'm adding event listeners to the lightbox controls
    const closeButton = lightbox.querySelector('.lightbox-close');
    const prevButton = lightbox.querySelector('.lightbox-prev');
    const nextButton = lightbox.querySelector('.lightbox-next');

    closeButton.addEventListener('click', closeLightbox);
    prevButton.addEventListener('click', showPreviousImage);
    nextButton.addEventListener('click', showNextImage);
    lightbox.addEventListener('click', handleLightboxClick);
}

function initLightbox() {
    createLightbox();

    // I'm adding click handlers to all gallery images
    galleries.forEach(gallery => {
        const images = Array.from(gallery.querySelectorAll('img, .exh-thumb, .imd-thumb'));
        images.forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', handleGalleryImageClick(images, index));
        });
    });
}

// ==========================================
// STICKY HEADER WITH SCROLL EFFECT
// ==========================================

function handleHeaderScroll() {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        lastScrollPosition = currentScroll;
        return;
    }

    if (currentScroll > lastScrollPosition && currentScroll > 100) {
        // I'm hiding the header when scrolling down
        header.classList.add('scroll-down');
        header.classList.remove('scroll-up');
    } else {
        // I'm showing the header when scrolling up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }

    lastScrollPosition = currentScroll;
}

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function handleBackToTopScroll() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
}

function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);

    backToTop.addEventListener('click', scrollToTop);
}

function initBackToTop() {
    createBackToTopButton();
    window.addEventListener('scroll', handleBackToTopScroll);
}

// ==========================================
// TEAM CARD HOVER EFFECTS
// ==========================================

function handleTeamCardMouseEnter() {
    this.style.transform = 'translateY(-10px)';
}

function handleTeamCardMouseLeave() {
    this.style.transform = 'translateY(0)';
}

function initTeamCardEffects() {
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', handleTeamCardMouseEnter);
        card.addEventListener('mouseleave', handleTeamCardMouseLeave);
    });
}

// ==========================================
// PORTFOLIO ITEM EXPAND/COLLAPSE
// ==========================================

function createExpandedContent() {
    const details = document.createElement('div');
    details.className = 'show-details';
    details.innerHTML = `
        <p>View this student's portfolio and projects. Connect with them for potential opportunities.</p>
        <div class="show-actions">
            <a href="#" class="show-btn">View Portfolio</a>
            <a href="#" class="show-btn">Contact</a>
        </div>
    `;
    return details;
}

function handlePortfolioExpand(event) {
    const item = event.currentTarget.closest('.show-item');
    const caret = event.currentTarget.querySelector('.caret');
    const existingDetails = item.querySelector('.show-details');
    
    // I'm toggling the expanded state
    item.classList.toggle('expanded');
    
    if (item.classList.contains('expanded')) {
        caret.style.transform = 'rotate(180deg)';
        
        // I'm creating the expanded content if it doesn't exist
        if (!item.querySelector('.show-details')) {
            const details = createExpandedContent();
            item.appendChild(details);
        }
    } else {
        caret.style.transform = 'rotate(0deg)';
        if (existingDetails) {
        existingDetails.remove();
    }
    }
}

function initPortfolioExpand() {
    portfolioActions.forEach(action => {
        action.addEventListener('click', handlePortfolioExpand);
    });
}

// ==========================================
// LOADING ANIMATION
// ==========================================

function handlePageLoad() {
    document.body.classList.add('loaded');
}

// ==========================================
// LAZY LOADING IMAGES
// ==========================================

function handleImageIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            observer.unobserve(img);
        }
    });
}

function initLazyLoading() {
    // I'm checking if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(handleImageIntersection);

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ==========================================
// INITIALIZATION - ALL EVENT LISTENERS
// ==========================================

// Smooth scroll navigation
navLinks.forEach(link => {
    link.addEventListener('click', handleSmoothScroll);
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', handleLightboxKeyboard);

// Header scroll effect
window.addEventListener('scroll', handleHeaderScroll);

// Page load animation
window.addEventListener('load', handlePageLoad);

// Initialize all features
initVideoPlayer();
initCountdown();
initScrollAnimations();
initPortfolioFilters();
initLightbox();
initBackToTop();
initTeamCardEffects();
initPortfolioExpand();
initLazyLoading();

console.log('✨ Industry Night - Enhanced JavaScript Loaded');