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
  initMobileMenu();
  initHeaderEffects();
  initTeamModal();
  // loadTeamBiosFromMarkdown(); // No longer needed: bios are now embedded in HTML
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
  // ScrollTrigger.batch('.team-member', {
  //   onEnter: (elements) => {
  //     gsap.from(elements, {
  //       duration: 0.6,
  //       y: 30,
  //       stagger: 0.1,
  //       ease: 'power2.out'
  //     });
  //   },
  //   start: 'top 85%',
  //   once: true
  // });
  
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
  initMobileMenu,
  debounce,
  createIntersectionObserver,
  showNotification
};

// =============================================================================
// TEAM MODAL + BIOS FROM MARKDOWN (V1)
// =============================================================================

function initTeamModal() {
  const overlay = document.getElementById('teamModalOverlay');
  const closeBtn = document.getElementById('teamModalClose');
  const contentEl = document.getElementById('teamModalContent');
  const titleEl = document.getElementById('teamModalTitle');
  const roleEl = document.getElementById('teamModalRole');
  const imageEl = document.getElementById('teamModalImage');

  if (!overlay) return;

  let lastFocusedElement = null;

  function openModal({ name, role, imageSrc, bio }) {
    lastFocusedElement = document.activeElement;

    titleEl.textContent = name || '';
    roleEl.textContent = role || '';
    imageEl.src = imageSrc || '';
    imageEl.alt = `Fotografia de ${name}`;
    contentEl.textContent = bio || '';

    overlay.classList.add('active');
    overlay.removeAttribute('aria-hidden');

    // Focus management
    closeBtn.focus();

    // Lock scroll
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Restore focus
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  // Close interactions
  closeBtn?.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (overlay.classList.contains('active') && e.key === 'Escape') {
      closeModal();
    }
  });

  // Attach open handlers to team cards
  document.querySelectorAll('.team-member.card').forEach((card) => {
    card.setAttribute('type', 'button');
    card.addEventListener('click', () => {
      const name = card.querySelector('.member-name')?.textContent?.trim();
      const role = card.dataset.role || card.querySelector('.member-role')?.textContent?.trim();
      const img = card.querySelector('img')?.getAttribute('src');

      // Read bio embedded in HTML (preferred) or from data-bio
      const bio = (card.querySelector('.member-bio')?.textContent || card.dataset.bio || '').trim();

      openModal({ name, role, imageSrc: img, bio });
    });

    // Keyboard accessibility for buttons is native; ensure Enter triggers click if divs were used
    card.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !card.disabled) {
        e.preventDefault();
        card.click();
      }
    });
  });
}

// In-memory maps for bios
const biosBySlug = new Map();
const biosByName = new Map();

function loadTeamBiosFromMarkdown() {
  fetch('./textos.md')
    .then((res) => res.ok ? res.text() : Promise.reject(new Error('No es pot carregar textos.md')))
    .then((md) => {
      const entries = parseSimpleMarkdownPairs(md);
      for (const { name, bio } of entries) {
        if (!name || !bio) continue;
        const cleanName = name.replace(/\s+/g, ' ').trim();
        const slug = slugify(cleanName);
        biosBySlug.set(slug, bio.trim());
        biosByName.set(cleanName, bio.trim());
      }
    })
    .catch((err) => {
      console.warn('Error carregant bios:', err);
    });
}

// Expecting format: Blocks with first line = Name, following lines until blank line = Bio
function parseSimpleMarkdownPairs(md) {
  const lines = md.split(/\r?\n/);
  const blocks = [];
  let currentName = null;
  let currentBio = [];

  function pushCurrent() {
    if (currentName) {
      const bio = currentBio.join('\n').trim();
      blocks.push({ name: currentName.trim(), bio });
    }
    currentName = null;
    currentBio = [];
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!currentName) {
      const candidate = line.trim();
      if (candidate) {
        currentName = candidate;
      }
    } else {
      if (line.trim() === '' && currentBio.length > 0) {
        // end of block
        pushCurrent();
      } else if (line.trim() === '' && currentBio.length === 0) {
        // skip extra blank lines between name and bio
        continue;
      } else {
        currentBio.push(line);
      }
    }
  }
  // push last
  if (currentName && currentBio.length) pushCurrent();
  return blocks;
}

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}