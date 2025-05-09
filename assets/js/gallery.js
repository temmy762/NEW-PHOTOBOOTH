document.addEventListener('DOMContentLoaded', () => {
    // Gallery configuration
    const galleryConfig = {
        images: [
            { src: '../assets/images/gallery/wedding-1.jpg', category: 'weddings', alt: 'Happy couple at wedding photo booth' },
            { src: '../assets/images/gallery/wedding-2.jpg', category: 'weddings', alt: 'Wedding party group shot' },
            { src: '../assets/images/gallery/corporate-1.jpg', category: 'corporate', alt: 'Corporate event photo booth' },
            { src: '../assets/images/gallery/corporate-2.jpg', category: 'corporate', alt: 'Team building event' },
            { src: '../assets/images/gallery/birthday-1.jpg', category: 'birthday', alt: 'Birthday celebration' },
            { src: '../assets/images/gallery/vip-1.jpg', category: 'vip', alt: 'VIP booth experience' },
            { src: '../assets/images/gallery/360-1.jpg', category: '360', alt: '360 degree booth shot' }
            // Add more images as needed
        ],
        videos: [
            { src: '../assets/videos/360-spin-1.mp4', type: '360' },
            { src: '../assets/videos/boomerang-1.mp4', type: 'boomerang' }
            // Add more videos as needed
        ]
    };

    // Initialize gallery
    const galleryGrid = document.querySelector('.gallery-grid');
    const videoGrid = document.querySelector('.video-grid');
    
    // Populate gallery
    function populateGallery() {
        galleryConfig.images.forEach(image => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item ${image.category}`;
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.alt}" loading="lazy">
            `;
            galleryGrid.appendChild(galleryItem);
        });

        // Add click listeners for lightbox
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', openLightbox);
        });
    }

    // Populate video gallery
    function populateVideoGallery() {
        if (!videoGrid) return;
        
        galleryConfig.videos.forEach(video => {
            const videoItem = document.createElement('div');
            videoItem.className = `video-item ${video.type}`;
            videoItem.innerHTML = `
                <video src="${video.src}" muted loop playsinline></video>
            `;
            videoGrid.appendChild(videoItem);

            // Play video on hover
            const videoElement = videoItem.querySelector('video');
            videoItem.addEventListener('mouseenter', () => videoElement.play());
            videoItem.addEventListener('mouseleave', () => videoElement.pause());
        });
    }

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter gallery items
            document.querySelectorAll('.gallery-item').forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox functionality
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    let currentImageIndex = 0;

    function openLightbox(e) {
        const clickedImage = e.currentTarget.querySelector('img');
        currentImageIndex = Array.from(document.querySelectorAll('.gallery-item img'))
            .findIndex(img => img === clickedImage);
        
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightboxImage() {
        const images = document.querySelectorAll('.gallery-item img');
        lightboxImage.src = images[currentImageIndex].src;
        lightboxImage.alt = images[currentImageIndex].alt;

        // Update navigation visibility
        prevBtn.style.display = currentImageIndex > 0 ? 'block' : 'none';
        nextBtn.style.display = currentImageIndex < images.length - 1 ? 'block' : 'none';
    }

    function nextImage() {
        const images = document.querySelectorAll('.gallery-item img');
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
            updateLightboxImage();
        }
    }

    function prevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateLightboxImage();
        }
    }

    // Event listeners for lightbox
    closeBtn?.addEventListener('click', closeLightbox);
    prevBtn?.addEventListener('click', prevImage);
    nextBtn?.addEventListener('click', nextImage);
    lightbox?.addEventListener('click', e => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', e => {
        if (!lightbox?.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });

    // Initialize gallery
    populateGallery();
    populateVideoGallery();
});
