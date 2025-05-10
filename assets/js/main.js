// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.main-header');

    mobileMenuToggle?.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks?.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Animate menu items
        const menuItems = navLinks?.querySelectorAll('li');
        menuItems?.forEach((item, index) => {
            if (navLinks.classList.contains('active')) {
                item.style.animation = `slideIn 0.3s ease forwards ${index * 0.1}s`;
            } else {
                item.style.animation = '';
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container') && navLinks?.classList.contains('active')) {
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
});

// Hero Slider
class ImageSlider {
    constructor(container, images, interval = 5000) {
        this.container = container;
        this.images = images;
        this.interval = interval;
        this.currentIndex = 0;
        this.isTransitioning = false;
        this.init();
    }

    init() {
        this.images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = `slide ${index === 0 ? 'active' : ''}`;
            slide.style.backgroundImage = `url(${image})`;
            this.container.appendChild(slide);
        });

        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        this.images.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        this.container.appendChild(dotsContainer);

        // Start automatic sliding
        this.startAutoSlide();

        // Pause on hover
        this.container.addEventListener('mouseenter', () => this.pauseAutoSlide());
        this.container.addEventListener('mouseleave', () => this.startAutoSlide());
    }

    startAutoSlide() {
        if (!this.intervalId) {
            this.intervalId = setInterval(() => this.nextSlide(), this.interval);
        }
    }

    pauseAutoSlide() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    goToSlide(index) {
        if (this.isTransitioning || index === this.currentIndex) return;
        
        this.isTransitioning = true;
        const slides = this.container.querySelectorAll('.slide');
        const dots = this.container.querySelectorAll('.slider-dot');
        
        slides[this.currentIndex].classList.remove('active');
        dots[this.currentIndex].classList.remove('active');
        
        this.currentIndex = index;
        
        slides[this.currentIndex].classList.add('active');
        dots[this.currentIndex].classList.add('active');
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 1000);
    }

    nextSlide() {
        this.goToSlide((this.currentIndex + 1) % this.images.length);
    }
}

// Initialize slider when images are available
const heroSlider = document.querySelector('.hero-slider');
if (heroSlider) {
    new ImageSlider(heroSlider, [
        'assets/images/hero section.jpeg',
        'assets/images/coporate event.jpeg',
        'assets/images/blak and white img.jpeg',
        'assets/images/husband and wife- flora backdrop.jpeg',
        'assets/images/Event img.jpeg',
        'assets/images/event-photo-booths-1024x683.jpg'
    ]);
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.feature, .section-title, .testimonial').forEach(el => {
    observer.observe(el);
});
