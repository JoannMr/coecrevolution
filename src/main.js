// =============================================================================
// COEC REVOLUTION - MAIN JAVASCRIPT
// =============================================================================

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// =============================================================================
// INITIALIZATION
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  initNavigation();
  initFloatingCTA();
  initMobileMenu();
});

// =============================================================================
// ANIMATIONS
// =============================================================================

function initAnimations() {
  // Hero animations
  const heroTimeline = gsap.timeline();
  
  // Background elements
  heroTimeline
    .from('.hero-background .hero-shape', {
      scale: 0.5,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power3.out'
    })
    .from('.hero-pattern', {
      opacity: 0,
      duration: 1.5,
      ease: 'power2.out'
    }, '-=1')
    // Content elements
    .from('.hero-badge', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=1.2')
    .from('.hero-title', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-description', {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: 'power3.out'
    }, '-=0.7')
    // Stats animation
    .from('.hero-stats .stat-item', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-actions .btn-primary', {
      duration: 0.6,
      y: 20,
      opacity: 0,
      ease: 'power3.out'
    }, '-=0.3')
    .from('.hero-actions .btn-secondary', {
      duration: 0.6,
      y: 20,
      opacity: 0,
      ease: 'power3.out'
    }, '-=0.4')
    // Tooth graphic and floating badges
    .from('.tooth-graphic', {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)'
    }, '-=1.2')
    .from('.floating-badge', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    }, '-=0.8')
    .from('.services-strip', {
      duration: 0.8,
      y: 20,
      opacity: 0,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.services-strip .service-item', {
      duration: 0.5,
      y: 15,
      opacity: 0,
      stagger: 0.08,
      ease: 'power3.out'
    }, '-=0.3');

  // Floating badge animation
  gsap.to('.floating-badge', {
    y: -10,
    duration: 2,
    ease: 'power2.inOut',
    yoyo: true,
    repeat: -1
  });

  // Team persons subtle animation
  gsap.to('.person', {
    y: '+=5',
    duration: 3,
    ease: 'power2.inOut',
    yoyo: true,
    repeat: -1,
    stagger: {
      amount: 1,
      from: 'random'
    }
  });

  // Process section animations
  ScrollTrigger.batch('.process-step', {
    onEnter: (elements) => {
      gsap.from(elements, {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }
  });
  
  // Animate process step numbers
  gsap.from('.step-number', {
    scrollTrigger: {
      trigger: '.process-section',
      start: 'top 80%'
    },
    duration: 1.2,
    opacity: 0,
    x: -30,
    stagger: 0.2,
    ease: 'power3.out'
  });
  
  // Animate process step titles and descriptions
  gsap.from('.step-title, .step-description', {
    scrollTrigger: {
      trigger: '.process-section',
      start: 'top 70%'
    },
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.1,
    ease: 'power3.out'
  });
  
  // Scroll-triggered animations for future sections
  ScrollTrigger.batch('.card', {
    onEnter: (elements) => {
      gsap.from(elements, {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.15,
        ease: 'power3.out'
      });
    },
    start: 'top 80%'
  });
}

// =============================================================================
// NAVIGATION
// =============================================================================

function initNavigation() {
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;

  // Navbar scroll behavior
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 70; // Account for navbar height
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// =============================================================================
// FLOATING CTA
// =============================================================================

function initFloatingCTA() {
  const floatingCTA = document.querySelector('.floating-cta');
  
  // Show/hide based on scroll position
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    if (scrollY > windowHeight * 0.5) {
      floatingCTA.style.opacity = '1';
      floatingCTA.style.transform = 'translateY(0)';
    } else {
      floatingCTA.style.opacity = '0';
      floatingCTA.style.transform = 'translateY(20px)';
    }
  });

  // Initial state
  floatingCTA.style.opacity = '0';
  floatingCTA.style.transform = 'translateY(20px)';
  floatingCTA.style.transition = 'all 0.3s ease';
}

// =============================================================================
// MOBILE MENU
// =============================================================================

function initMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('mobile-open');
      
      if (isOpen) {
        // Close menu
        navMenu.classList.remove('mobile-open');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        // Open menu
        navMenu.classList.add('mobile-open');
        mobileToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

// Debounce function for performance
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

// Intersection Observer for performance-optimized animations
function createIntersectionObserver(callback, options = {}) {
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observerOptions = { ...defaultOptions, ...options };
  
  return new IntersectionObserver(callback, observerOptions);
}

// =============================================================================
// FORM HANDLING (for future contact forms)
// =============================================================================

function initFormHandling() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const submitButton = form.querySelector('button[type="submit"]');
      
      // Disable submit button
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
      }
      
      try {
        // Here you would implement the actual form submission
        // For now, just simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        showNotification('¡Mensaje enviado correctamente!', 'success');
        form.reset();
        
      } catch (error) {
        // Show error message
        showNotification('Error al enviar el mensaje. Inténtalo de nuevo.', 'error');
      } finally {
        // Re-enable submit button
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Enviar';
        }
      }
    });
  });
}

// Simple notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Animate in
  gsap.fromTo(notification, 
    { opacity: 0, y: -50 },
    { opacity: 1, y: 0, duration: 0.3 }
  );
  
  // Remove after 3 seconds
  setTimeout(() => {
    gsap.to(notification, {
      opacity: 0,
      y: -50,
      duration: 0.3,
      onComplete: () => {
        notification.remove();
      }
    });
  }, 3000);
}

// =============================================================================
// EXPORT FOR POTENTIAL MODULE USAGE
// =============================================================================

export {
  initAnimations,
  initNavigation,
  initFloatingCTA,
  initMobileMenu,
  debounce,
  createIntersectionObserver,
  showNotification
};