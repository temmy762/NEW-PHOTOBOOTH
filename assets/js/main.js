// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuToggle?.addEventListener('click', () => {
        navLinks?.classList.toggle('active');
        document.body.classList.toggle('menu-open');
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
        this.init();
    }

    init() {
        this.images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = `slide ${index === 0 ? 'active' : ''}`;
            slide.style.backgroundImage = `url(${image})`;
            this.container.appendChild(slide);
        });

        setInterval(() => this.nextSlide(), this.interval);
    }

    nextSlide() {
        const slides = this.container.querySelectorAll('.slide');
        slides[this.currentIndex].classList.remove('active');
        this.currentIndex = (this.currentIndex + 1) % slides.length;
        slides[this.currentIndex].classList.add('active');
    }
}

// Initialize slider when images are available
const heroSlider = document.querySelector('.hero-slider');
if (heroSlider) {
    new ImageSlider(heroSlider, [
        'assets/images/slider/slide1.jpg',
        'assets/images/slider/slide2.jpg',
        'assets/images/slider/slide3.jpg'
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
