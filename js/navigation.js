/**
 * Navigation JavaScript
 * Handles navigation scroll effects and mobile menu
 */

(function() {
    'use strict';
    
    // Get navigation element
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    /**
     * Handle navbar scroll effect
     */
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    /**
     * Toggle mobile menu
     */
    function toggleMobileMenu() {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('mobile-active');
    }
    
    /**
     * Handle smooth scrolling for anchor links
     */
    function handleSmoothScroll(e) {
        const href = this.getAttribute('href');
        
        // Only handle internal anchor links
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('mobile-active')) {
                    toggleMobileMenu();
                }
            }
        }
    }
    
    // Event Listeners
    window.addEventListener('scroll', handleNavbarScroll);
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Add smooth scroll to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks && navLinks.classList.contains('mobile-active')) {
            if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                toggleMobileMenu();
            }
        }
    });
    
    // Initial check on page load
    handleNavbarScroll();
    
})();
