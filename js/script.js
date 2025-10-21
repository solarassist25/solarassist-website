// Solar Assist Website - Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Toggle hamburger icon
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.querySelector('i').classList.remove('fa-times');
                mobileToggle.querySelector('i').classList.add('fa-bars');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = mobileToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.querySelector('i').classList.remove('fa-times');
                mobileToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    }

    // Form Submission Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const projectType = formData.get('project-type');
            const systemSize = formData.get('system-size');
            const message = formData.get('message');

            // Simple validation
            if (!name || !email || !phone || !service || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Phone validation (basic)
            const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
            if (!phoneRegex.test(phone)) {
                showNotification('Please enter a valid phone number.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                // In a real application, you would send this data to a server
                const successMessage = `Thank you for your message, ${name}! We will contact you soon at ${email} or ${phone} regarding ${service}.`;
                showNotification(successMessage, 'success');
                
                // Reset form
                this.reset();
                
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to current page in navigation
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    setActiveNavLink();

    // Initialize gallery filters if on gallery page
    initGalleryFilters();

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Only add loading effect if image hasn't loaded yet
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            
            img.addEventListener('error', function() {
                // If image fails to load, show placeholder
                this.style.opacity = '1';
                console.warn('Image failed to load:', this.src);
            });
        }
    });

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for fade-in
    document.querySelectorAll('.service-card, .why-card, .gallery-item, .process-step').forEach(el => {
        observer.observe(el);
    });

    // Headline bar scroll effect
    let lastScrollTop = 0;
    const headlineBar = document.querySelector('.headline-bar');
    
    if (headlineBar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                headlineBar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                headlineBar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // Tooltip functionality for headline bar
    const headlineLinks = document.querySelectorAll('.headline-contact a');
    headlineLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // Tooltip is handled by CSS, but we can add additional functionality here
            this.style.zIndex = '1002';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });

    // Service detail image lazy loading
    const serviceImages = document.querySelectorAll('.service-detail-image img');
    serviceImages.forEach(img => {
        img.loading = 'lazy';
    });

    // Form input enhancements
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        // Add focus class for better UX
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check initial state
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });

    // Emergency contact button pulse effect
    const emergencyBtn = document.querySelector('.emergency-contact .btn');
    if (emergencyBtn) {
        setInterval(() => {
            emergencyBtn.classList.toggle('pulse');
        }, 2000);
    }

    // Add CSS for pulse animation
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        .pulse {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(33, 150, 243, 0.7);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(33, 150, 243, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(33, 150, 243, 0);
            }
        }
    `;
    document.head.appendChild(pulseStyle);

    console.log('Solar Assist website initialized successfully!');
});

// Gallery Filter Functionality
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-pressed', 'false');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                this.setAttribute('aria-pressed', 'true');

                const filterValue = this.getAttribute('data-filter');
                
                // Update URL hash without scrolling
                if (filterValue !== 'all') {
                    history.replaceState(null, null, `#${filterValue}`);
                } else {
                    history.replaceState(null, null, ' ');
                }

                // Filter items with animation
                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || itemCategory === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });

                // Announce filter change for screen readers
                const announcement = document.getElementById('filter-announcement') || createFilterAnnouncement();
                announcement.textContent = `Showing ${filterValue === 'all' ? 'all projects' : filterValue + ' projects'}`;
            });
        });

        // Check URL hash on page load
        const hash = window.location.hash.substring(1);
        if (hash && document.querySelector(`[data-filter="${hash}"]`)) {
            document.querySelector(`[data-filter="${hash}"]`).click();
        }
    }
}

// Create accessibility announcement element
function createFilterAnnouncement() {
    const announcement = document.createElement('div');
    announcement.id = 'filter-announcement';
    announcement.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    document.body.appendChild(announcement);
    return announcement;
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add styles
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            border-left: 4px solid var(--primary);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        }
        
        .notification.success {
            border-left-color: #28a745;
        }
        
        .notification.error {
            border-left-color: #dc3545;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            padding: 5px;
            margin-left: auto;
            color: var(--gray);
        }
        
        .notification-close:hover {
            color: var(--dark);
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;

    // Add styles if not already added
    if (!document.getElementById('notification-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'notification-styles';
        styleElement.textContent = notificationStyles;
        document.head.appendChild(styleElement);
    }

    document.body.appendChild(notification);

    // Add close functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    return icons[type] || 'fa-info-circle';
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add debounced scroll event for performance
window.addEventListener('scroll', debounce(function() {
    // Any scroll-based functionality can go here
}, 10));

// Service Worker Registration (for PWA capabilities - optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // This is where you would register your service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initGalleryFilters,
        showNotification,
        debounce
    };
}
