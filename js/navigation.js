/**
 * Navigation JavaScript
 * Handles navigation scroll effects and mobile menu
 */

(function() {
    'use strict';
    
    // Get navigation elements
    const navbar = document.getElementById('navbar') || document.querySelector('nav');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    // Create overlay for mobile menu if it doesn't exist
    let overlay = document.querySelector('.mobile-menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);
    }
    
    /**
     * Handle navbar scroll effect
     */
    function handleNavbarScroll() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }
    
    /**
     * Open mobile menu
     */
    function openMobileMenu() {
        if (mobileMenuToggle && navLinks) {
            mobileMenuToggle.classList.add('active');
            navLinks.classList.add('active');
            overlay.classList.add('active');
            body.style.overflow = 'hidden'; // Блокируем скролл
            
            // Добавляем aria-expanded для доступности
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
        }
    }
    
    /**
     * Close mobile menu
     */
    function closeMobileMenu() {
        if (mobileMenuToggle && navLinks) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = ''; // Разблокируем скролл
            
            // Обновляем aria-expanded
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    }
    
    /**
     * Toggle mobile menu
     */
    function toggleMobileMenu() {
        if (navLinks && navLinks.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    /**
     * Handle smooth scrolling for anchor links
     */
    function handleSmoothScroll(e) {
        const href = this.getAttribute('href');
        
        // Only handle internal anchor links
        if (href && href.startsWith('#') && href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                // Закрываем мобильное меню перед скроллом
                closeMobileMenu();
                
                // Получаем высоту navbar
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                // Плавный скролл
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }
    
    /**
     * Close menu on window resize (если экран стал больше)
     */
    function handleResize() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }
    
    // Event Listeners
    
    // Scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Добавляем атрибуты для доступности
        mobileMenuToggle.setAttribute('aria-label', 'Toggle mobile menu');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
    
    // Close menu when clicking on overlay
    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks && navLinks.classList.contains('active')) {
            // Проверяем, что клик был не по меню и не по кнопке
            if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });
    
    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Initial check on page load
    handleNavbarScroll();
    
    // Prevent menu links from closing on click inside (if needed)
    if (navLinks) {
        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Закрываем меню только после небольшой задержки
                // чтобы анимация скролла успела начаться
                setTimeout(closeMobileMenu, 100);
            });
        });
    }
    
    console.log('Navigation initialized ✓');
    
})();