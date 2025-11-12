/**
 * Main JavaScript
 * General utilities and app initialization
 */

(function() {
    'use strict';
    
    const FinVerseApp = {
        /**
         * Initialize the application
         */
        init() {
            this.setupEventListeners();
            this.handlePageLoad();
            this.setupAccessibility();
            console.log('FinVerse App initialized successfully! 🚀');
        },
        
        /**
         * Setup global event listeners
         */
        setupEventListeners() {
            // Handle CTA button clicks
            document.querySelectorAll('.btn-primary, .btn-secondary, .cta-nav').forEach(btn => {
                btn.addEventListener('click', this.handleCTAClick);
            });
            
            // Handle pricing button clicks
            document.querySelectorAll('.pricing-button').forEach(btn => {
                btn.addEventListener('click', this.handlePricingClick);
            });
            
            // Handle form submissions (if any)
            document.querySelectorAll('form').forEach(form => {
                form.addEventListener('submit', this.handleFormSubmit);
            });
        },
        
        /**
         * Handle CTA button clicks
         */
        handleCTAClick(e) {
            const href = this.getAttribute('href');
            
            // If it's a placeholder link, prevent default and show message
            if (href === '#' || !href) {
                e.preventDefault();
                console.log('CTA clicked:', this.textContent);
                
                // You can add custom logic here, like opening a modal
                // or redirecting to app store
                alert('Скоро! Приложение находится в разработке. 🚀');
            }
        },
        
        /**
         * Handle pricing button clicks
         */
        handlePricingClick(e) {
            const plan = this.closest('.pricing-card').querySelector('.pricing-title').textContent;
            console.log('Selected plan:', plan);
            
            // You can add custom logic here
            alert(`Вы выбрали план: ${plan}. Скоро будет доступна регистрация! 🎉`);
        },
        
        /**
         * Handle form submissions
         */
        handleFormSubmit(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            console.log('Form submitted:', Object.fromEntries(formData));
            
            // Add your form handling logic here
        },
        
        /**
         * Handle page load
         */
        handlePageLoad() {
            // Add loaded class to body for CSS animations
            document.body.classList.add('loaded');
            
            // Log analytics (placeholder)
            this.trackPageView();
        },
        
        /**
         * Setup accessibility features
         */
        setupAccessibility() {
            // Add keyboard navigation support
            document.querySelectorAll('a, button').forEach(el => {
                if (!el.hasAttribute('aria-label') && !el.textContent.trim()) {
                    console.warn('Element missing aria-label:', el);
                }
            });
            
            // Handle keyboard navigation
            document.addEventListener('keydown', (e) => {
                // ESC key closes mobile menu
                if (e.key === 'Escape') {
                    const mobileMenu = document.querySelector('.nav-links.mobile-active');
                    if (mobileMenu) {
                        document.querySelector('.mobile-menu-toggle').click();
                    }
                }
            });
        },
        
        /**
         * Track page view (placeholder for analytics)
         */
        trackPageView() {
            // Add your analytics code here (Google Analytics, Yandex Metrica, etc.)
            console.log('Page view tracked:', window.location.pathname);
        },
        
        /**
         * Track event (placeholder for analytics)
         */
        trackEvent(category, action, label) {
            console.log('Event tracked:', { category, action, label });
            // Add your analytics code here
        },
        
        /**
         * Utility: Debounce function
         */
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        /**
         * Utility: Throttle function
         */
        throttle(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },
        
        /**
         * Utility: Check if element is in viewport
         */
        isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
    };
    
    // Initialize app when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => FinVerseApp.init());
    } else {
        FinVerseApp.init();
    }
    
    // Expose app to global scope for debugging
    window.FinVerseApp = FinVerseApp;
    
})();
