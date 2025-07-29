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
  initHeaderEffects();
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
  
  // Team section animations - simplified to avoid visibility issues
  gsap.set('.team-member', { opacity: 1 }); // Ensure team cards are always visible
  ScrollTrigger.batch('.team-member', {
    onEnter: (elements) => {
      gsap.from(elements, {
        duration: 0.6,
        y: 30,
        stagger: 0.1,
        ease: 'power2.out'
      });
    },
    start: 'top 85%',
    once: true
  });
  
  // Subtle hover effect for team cards
  document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('mouseenter', () => {
      gsap.to(member.querySelector('.member-silhouette'), {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    member.addEventListener('mouseleave', () => {
      gsap.to(member.querySelector('.member-silhouette'), {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
  
  
  // About section animations
  gsap.set('.about-section *', { opacity: 1 }); // Ensure all elements are visible
  
  // Manifesto hero animations
  ScrollTrigger.batch('.manifesto-badge', {
    onEnter: (elements) => {
      gsap.from(elements, {
        duration: 0.6,
        scale: 0.8,
        ease: 'back.out(1.7)'
      });
    },
    start: 'top 85%',
    once: true
  });
  
  ScrollTrigger.batch('.manifesto-title', {
    onEnter: (elements) => {
      gsap.from(elements, {
        duration: 1,
        y: 30,
        ease: 'power2.out'
      });
    },
    start: 'top 85%',
    once: true
  });
  
  ScrollTrigger.batch('.manifesto-statement', {
    onEnter: (elements) => {
      gsap.from(elements, {
        duration: 0.8,
        y: 20,
        ease: 'power2.out'
      });
    },
    start: 'top 85%',
    once: true
  });
  

  
  // Vision cards animations
  ScrollTrigger.batch('.vision-main-card', {
    onEnter: (elements) => {
      gsap.from(elements, {
        duration: 1,
        scale: 0.9,
        y: 30,
        ease: 'power3.out'
      });
    },
    start: 'top 85%',
    once: true
  });
  
  ScrollTrigger.batch('.vision-feature-card', {
    onEnter: (elements) => {
      gsap.from(elements, {
        duration: 0.8,
        y: 40,
        stagger: 0.15,
        ease: 'power3.out'
      });
    },
    start: 'top 85%',
    once: true
  });
  
  // Commitments cards animation
  ScrollTrigger.batch('.commitment-card', {
    onEnter: (elements) => {
      gsap.from(elements, {
        duration: 0.6,
        y: 30,
        stagger: 0.1,
        ease: 'power2.out'
      });
    },
    start: 'top 85%',
    once: true
  });
  
  
  // Scroll-triggered animations for future sections (exclude team and differential cards)
  ScrollTrigger.batch('.card:not(.team-member):not(.differential-card)', {
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
// NAVIGATION & HEADER EFFECTS
// =============================================================================

function initNavigation() {
  // Smooth scroll for all navigation links (desktop and mobile)
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const offsetTop = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        closeMobileMenu();
        
        // Update active link
        updateActiveNavLink(targetId);
      }
    });
  });
  
  // Set initial active link based on current scroll position
  updateActiveNavLink();
}

function initHeaderEffects() {
  const header = document.querySelector('.header');
  let lastScrollY = window.scrollY;
  let ticking = false;

  // Header scroll behavior with enhanced effects
  function updateHeader() {
    const currentScrollY = window.scrollY;
    
    // Add scrolled class for backdrop blur effect
    if (currentScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Smart hide/show header behavior
    if (currentScrollY > lastScrollY && currentScrollY > 150) {
      // Scrolling down - hide header
      header.style.transform = 'translateY(-100%)';
    } else if (currentScrollY < lastScrollY || currentScrollY <= 150) {
      // Scrolling up or near top - show header
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
  }

  // Throttled scroll event for better performance
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });
}

// Update active navigation link based on scroll position
function updateActiveNavLink(targetId = null) {
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  if (targetId) {
    // Manual selection - remove active from all and add to selected
    navLinks.forEach(link => link.classList.remove('active'));
    navLinks.forEach(link => {
      if (link.getAttribute('href') === targetId) {
        link.classList.add('active');
      }
    });
    return;
  }
  
  // Auto-detect based on scroll position
  const scrollPosition = window.scrollY + 100; // Offset for header
  
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = '#' + section.id;
    }
  });
  
  // Update active states
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentSection) {
      link.classList.add('active');
    }
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
// MOBILE MENU - Enhanced Experience
// =============================================================================

function initMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileClose = document.querySelector('.mobile-menu-close');
  
  if (!mobileToggle || !mobileOverlay) return;
  
  // Open mobile menu
  function openMobileMenu() {
    mobileOverlay.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    
    // Animate menu items
    gsap.from('.mobile-nav-link', {
      duration: 0.6,
      y: 30,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.2
    });
    
    gsap.from('.mobile-nav-actions button, .mobile-nav-actions a', {
      duration: 0.5,
      y: 20,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.4
    });
  }
  
  // Close mobile menu
  function closeMobileMenu() {
    mobileOverlay.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  
  // Event listeners
  mobileToggle.addEventListener('click', openMobileMenu);
  
  if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileMenu);
  }
  
  // Close menu when clicking on overlay background
  mobileOverlay.addEventListener('click', (e) => {
    if (e.target === mobileOverlay) {
      closeMobileMenu();
    }
  });
  
  // Close menu when clicking on navigation links
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      // Add small delay for smooth transition
      setTimeout(closeMobileMenu, 300);
    });
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
      closeMobileMenu();
    }
  });
  
  // Handle window resize - close menu if switching to desktop
  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 1024 && mobileOverlay.classList.contains('active')) {
      closeMobileMenu();
    }
  }, 100));
}

// Expose closeMobileMenu globally for other functions
window.closeMobileMenu = () => {
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  
  if (mobileOverlay && mobileOverlay.classList.contains('active')) {
    mobileOverlay.classList.remove('active');
    if (mobileToggle) {
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }
};

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
        submitButton.textContent = 'Enviant...';
      }
      
      try {
        // Here you would implement the actual form submission
        // For now, just simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        showNotification('Missatge enviat correctament!', 'success');
        form.reset();
        
      } catch (error) {
        // Show error message
        showNotification('Error en enviar el missatge. Torna-ho a intentar.', 'error');
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
  initHeaderEffects,
  initFloatingCTA,
  initMobileMenu,
  debounce,
  createIntersectionObserver,
  showNotification
};