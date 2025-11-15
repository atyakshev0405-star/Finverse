/**
 * Premium Animations JavaScript
 * Handles advanced scroll animations and interactive effects
 */

(function() {
    'use strict';
    
    /**
     * Advanced Intersection Observer with staggered animations
     */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const staggeredObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered delay for multiple elements
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.classList.add('animated');
                }, index * 100);
                
                // Unobserve after animation
                staggeredObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    /**
     * Initialize scroll reveal animations
     */
    function initScrollReveal() {
        const elementsToAnimate = document.querySelectorAll(
            '.feature-card, .step, .badge-item, .pricing-card, .stat-box'
        );
        
        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px) scale(0.95)';
            el.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
            staggeredObserver.observe(el);
        });
    }
    
    /**
     * Parallax effect for multiple layers
     */
    function initParallax() {
    const parallaxElements = [
        { selector: '.phone-mockup', speed: 0.3 },
        { selector: '.feature-icon', speed: 0.15 }
    ];
        
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    
                    parallaxElements.forEach(({ selector, speed }) => {
                        const elements = document.querySelectorAll(selector);
                        elements.forEach(el => {
                            const rect = el.getBoundingClientRect();
                            if (rect.top < window.innerHeight && rect.bottom > 0) {
                                const offset = scrolled * speed;
                                el.style.transform = `translateY(${offset}px)`;
                            }
                        });
                    });
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }
    
    /**
     * Animate stats numbers with easing
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
     * Animate number counting with easing
     */
    function animateValue(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasStar = text.includes('★');
        const hasPercent = text.includes('%');
        
        let num = parseFloat(text.replace(/[^0-9.]/g, ''));
        
        if (isNaN(num)) return;
        
        const duration = 2500;
        const steps = 80;
        let current = 0;
        
        // Easing function for smooth animation
        const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
        
        let startTime = null;
        
        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / duration;
            
            if (progress < 1) {
                current = num * easeOutQuart(progress);
                
                let display = current.toFixed(text.includes('.') ? 1 : 0);
                
                if (hasPlus) display += '+';
                if (hasStar) display += '★';
                if (hasPercent) display += '%';
                
                element.textContent = display;
                requestAnimationFrame(animate);
            } else {
                let display = num.toFixed(text.includes('.') ? 1 : 0);
                if (hasPlus) display += '+';
                if (hasStar) display += '★';
                if (hasPercent) display += '%';
                element.textContent = display;
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    /**
     * Magnetic effect for cards
     */
    function initMagneticEffect() {
        const cards = document.querySelectorAll('.feature-card, .pricing-card, .badge-item');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;
                
                const rotateX = deltaY * 5;
                const rotateY = deltaX * 5;
                
                card.style.transform = `
                    perspective(1000px)
                    rotateX(${-rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale3d(1.02, 1.02, 1.02)
                    translateY(-10px)
                `;
            });
            
            card.addEventListener('mouseleave', function() {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1) translateY(0)';
            });
        });
    }
    
    /**
     * Icon tilt effect on hover
     */
    function initIconTilt() {
        const icons = document.querySelectorAll('.feature-icon, .badge-icon');
        
        icons.forEach(icon => {
            icon.addEventListener('mousemove', function(e) {
                const rect = icon.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;
                
                icon.style.transform = `
                    rotateX(${-deltaY * 10}deg)
                    rotateY(${deltaX * 10}deg)
                    scale(1.1)
                `;
            });
            
            icon.addEventListener('mouseleave', function() {
                icon.style.transform = 'rotateX(0) rotateY(0) scale(1)';
            });
        });
    }
    
    /**
     * Progress bar animation
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
                        entry.target.style.transition = 'width 2s cubic-bezier(0.23, 1, 0.32, 1)';
                        entry.target.style.width = width;
                    }, 100);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => progressObserver.observe(bar));
    }
    
    /**
     * Button ripple effect
     */
    function initRippleEffect() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .pricing-button, .cta-nav');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple-effect');
                
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                    pointer-events: none;
                    animation: ripple-animation 0.6s ease-out;
                `;
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }
    
    /**
     * Cursor trail effect
     */
    function initCursorTrail() {
        const cursor = document.createElement('div');
        cursor.classList.add('cursor-trail');
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(102, 126, 234, 0.5), transparent);
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.15s ease-out;
            display: none;
        `;
        document.body.appendChild(cursor);
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.display = 'block';
        });
        
        function updateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            
            cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
            
            requestAnimationFrame(updateCursor);
        }
        
        updateCursor();
        
        // Hide on mobile
        if ('ontouchstart' in window) {
            cursor.style.display = 'none';
        }
    }
    
    /**
     * Scroll progress indicator
     */
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #ffd700);
            z-index: 10000;
            transition: width 0.1s ease-out;
            width: 0%;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / scrollHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
    
    /**
     * Smooth scroll to anchor links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    /**
     * Initialize all premium animations
     */
    function init() {
        console.log('🎨 Premium animations initialized!');
        
        initScrollReveal();
        animateStats();
        initMagneticEffect();
        initIconTilt();
        animateProgressBars();
        initRippleEffect();
        initCursorTrail();
        initScrollProgress();
        initSmoothScroll();
        
        // Parallax only on desktop
        if (window.innerWidth > 768) {
            initParallax();
        }
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            from {
                transform: scale(0);
                opacity: 1;
            }
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
})();