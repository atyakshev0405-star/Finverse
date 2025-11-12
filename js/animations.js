/**
 * Animations JavaScript
 * Handles scroll animations and interactive effects
 */

(function() {
    'use strict';
    
    /**
     * Intersection Observer for fade-in animations
     */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Optional: Unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    /**
     * Initialize animations for elements
     */
    function initAnimations() {
        // Select elements to animate
        const animatedElements = document.querySelectorAll(
            '.feature-card, .step, .badge-item, .pricing-card, .stat-box'
        );
        
        // Set initial state and observe
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }
    
    /**
     * Animate stats numbers on scroll
     */
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const statsObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateValue(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => statsObserver.observe(stat));
    }
    
    /**
     * Animate number counting
     */
    function animateValue(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasStar = text.includes('★');
        const hasPercent = text.includes('%');
        
        // Extract number
        let num = parseFloat(text.replace(/[^0-9.]/g, ''));
        
        if (isNaN(num)) return;
        
        const duration = 2000;
        const steps = 60;
        const increment = num / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
                current = num;
                clearInterval(timer);
            }
            
            let display = current.toFixed(text.includes('.') ? 1 : 0);
            
            if (hasPlus) display += '+';
            if (hasStar) display += '★';
            if (hasPercent) display += '%';
            
            element.textContent = display;
        }, duration / steps);
    }
    
    /**
     * Parallax effect for hero section
     */
    function initParallax() {
        const phoneMockup = document.querySelector('.phone-mockup');
        
        if (!phoneMockup) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.3;
            
            if (scrolled < window.innerHeight) {
                phoneMockup.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    /**
     * Add hover effect to cards
     */
    function initCardEffects() {
        const cards = document.querySelectorAll('.feature-card, .pricing-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    /**
     * Animate progress bars
     */
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.goal-progress');
        
        const progressObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    const width = entry.target.style.width;
                    entry.target.style.width = '0%';
                    
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 100);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => progressObserver.observe(bar));
    }
    
    /**
     * Initialize all animations on DOM ready
     */
    function init() {
        initAnimations();
        animateStats();
        initParallax();
        initCardEffects();
        animateProgressBars();
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
