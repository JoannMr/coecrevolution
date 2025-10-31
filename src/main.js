// =============================================================================
// COEC REVOLUTION - MAIN JAVASCRIPT
// =============================================================================

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// =============================================================================
// VICTORY OVERLAY
// =============================================================================

function initVictoryOverlay() {
  const overlay = document.getElementById('victoryOverlay');
  const closeBtn = document.getElementById('closeOverlayBtn');
  
  if (!overlay || !closeBtn) return;
  
  // Check if user has already closed the overlay in this session
  const overlayClosed = sessionStorage.getItem('victoryOverlayClosed');
  
  if (overlayClosed === 'true') {
    overlay.classList.add('hidden');
  } else {
    // Show overlay (it's visible by default)
    overlay.classList.remove('hidden');
    // Prevent scrolling on body when overlay is visible
    document.body.style.overflow = 'hidden';
  }
  
  // Close overlay on button click
  closeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    // Remember that user closed it for this session
    sessionStorage.setItem('victoryOverlayClosed', 'true');
  });
  
  // Optional: Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
      sessionStorage.setItem('victoryOverlayClosed', 'true');
    }
  });
}

// =============================================================================
// INITIALIZATION
// =============================================================================

// Ensure page always starts from top on load/reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Function to fix hero height and ensure proper positioning
function fixHeroPositioning() {
  const hero = document.querySelector('.hero');
  const header = document.querySelector('.header');
  
  if (hero && header) {
    const headerHeight = header.offsetHeight;
    // Set hero height to exactly 100vh minus any potential browser chrome issues
    hero.style.height = '100vh';
    // Ensure the hero content starts right after the header
    hero.style.paddingTop = `${headerHeight}px`;
    // Force immediate scroll to top
    window.scrollTo(0, 0);
    
    // Additional check after a brief delay to ensure positioning
    setTimeout(() => {
      window.scrollTo(0, 0);
      // Ensure the hero is visible from the very top
      if (window.scrollY > 0) {
        window.scrollTo(0, 0);
      }
    }, 50);
  }
}

// Force scroll to top on page load
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Victory Overlay
  initVictoryOverlay();
  
  // Fix hero positioning first
  fixHeroPositioning();
  
  initAnimations();
  initNavigation();
  initMobileMenu();
  initHeaderEffects();
  initTeamModal();
  initCommitmentsModal();
  initRowHeightEqualization();
  // loadTeamBiosFromMarkdown(); // No longer needed: bios are now embedded in HTML
});

// Additional safety measure - ensure scroll position after all resources load
window.addEventListener('load', () => {
  fixHeroPositioning();
});

// =============================================================================
// ANIMATIONS
// =============================================================================

// Initialize SplitType text animations
function initSplitTypeAnimations() {
  // Initialize SplitType for all elements with animate attribute
  const typeSplit = new SplitType('[animate]', {
    types: 'lines, words, chars',
    tagName: 'span'
  });

  // Create timeline for split text animations with proper timing
  const splitTimeline = gsap.timeline({ delay: 0.8 }); // Delay to coordinate with background animations

  // Animate lines with staggered effect
  splitTimeline.from('[animate] .line', {
    y: '100%',
    opacity: 0,
    duration: 1,
    ease: 'power1.out',
    stagger: 0.2
  });

  return splitTimeline;
}

function initAnimations() {
  // Initialize SplitType animations first
  initSplitTypeAnimations();
  
  // Hero animations
  const heroTimeline = gsap.timeline(); // No delay needed, SplitType has its own timing
  
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
    // Content elements (badge only, text handled by SplitType)
    .from('.hero-badge', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=1.2')
    // Note: hero-title and hero-description animations are now handled by SplitType
    // Stats animation (keeping the original stats animation for non-text elements)
    .from('.hero-stats .stat-item', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out'
    }, '-=0.5')
    // Visual elements continue as before
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
        
        if (document.body.classList.contains('mobile-menu-open') && typeof window.closeMobileMenu === 'function') {
          window.closeMobileMenu({ targetScroll: offsetTop, behavior: 'smooth' });
        } else {
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
        
        // Update active link
        updateActiveNavLink(targetId);
      }
    });
  });
  
  // Set initial active link based on current scroll position
  updateActiveNavLink();
}

function initHeaderEffects() {
  // Header effects 
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
  const header = document.querySelector('.header');
  const body = document.body;

  if (!mobileToggle || !mobileOverlay) return;

  // Store scroll position for body lock
  let scrollPosition = 0;
  let pendingScrollTarget = null;
  let pendingScrollBehavior = 'auto';

  // Open mobile menu
  function openMobileMenu() {
    // Store current scroll position
    scrollPosition = window.pageYOffset;

    // Lock body scroll while preserving position
    body.classList.add('mobile-menu-open');
    body.style.position = 'fixed';
    body.style.top = `-${scrollPosition}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    if (header) {
      header.classList.add('menu-open');
      header.style.transform = 'translateY(0)';
    }

    mobileOverlay.classList.add('active');
    mobileOverlay.setAttribute('aria-hidden', 'false');
    mobileToggle.setAttribute('aria-expanded', 'true');

    // Animate menu items
    gsap.fromTo('.mobile-nav-link', {
      y: 30,
      opacity: 0
    }, {
      duration: 0.6,
      y: 0,
      opacity: 1,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.2
    });

    gsap.fromTo('.mobile-nav-actions button, .mobile-nav-actions a', {
      y: 20,
      opacity: 0
    }, {
      duration: 0.5,
      y: 0,
      opacity: 1,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.4
    });
  }

  // Close mobile menu
  function closeMobileMenu(arg = {}) {
    const options = (arg && typeof arg === 'object' && 'type' in arg) ? {} : arg || {};
    const menuWasActive = mobileOverlay.classList.contains('active');
    const hasTargetScroll = typeof options.targetScroll === 'number' && Number.isFinite(options.targetScroll);
    const targetScroll = hasTargetScroll ? options.targetScroll : null;
    const behavior = hasTargetScroll ? (options.behavior || 'smooth') : 'auto';

    if (!menuWasActive && !hasTargetScroll) {
      return;
    }

    if (hasTargetScroll) {
      pendingScrollTarget = targetScroll;
      pendingScrollBehavior = behavior;
      scrollPosition = targetScroll;
    } else {
      pendingScrollTarget = null;
      pendingScrollBehavior = 'auto';
    }

    mobileOverlay.classList.remove('active');
    mobileOverlay.setAttribute('aria-hidden', 'true');
    mobileToggle.setAttribute('aria-expanded', 'false');

    body.classList.remove('mobile-menu-open');
    body.style.position = '';
    body.style.top = '';
    body.style.width = '';
    body.style.overflow = '';

    if (header) {
      header.classList.remove('menu-open');
      header.style.transform = '';
    }

    const finalScroll = pendingScrollTarget !== null ? pendingScrollTarget : scrollPosition;
    const finalBehavior = pendingScrollTarget !== null ? pendingScrollBehavior : 'auto';

    requestAnimationFrame(() => {
      window.scrollTo({
        top: Math.max(finalScroll, 0),
        behavior: finalBehavior
      });
    });

    pendingScrollTarget = null;
    pendingScrollBehavior = 'auto';

    // Clear GSAP styles to prevent conflicts
    gsap.set('.mobile-nav-link', { clearProps: 'all' });
    gsap.set('.mobile-nav-actions button, .mobile-nav-actions a', { clearProps: 'all' });
  }

  // Event listeners
  mobileToggle.addEventListener('click', openMobileMenu);

  if (mobileClose) {
    mobileClose.addEventListener('click', () => closeMobileMenu());
  }

  // Close menu when clicking on overlay background
  mobileOverlay.addEventListener('click', (e) => {
    if (e.target === mobileOverlay) {
      closeMobileMenu();
    }
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

  window.closeMobileMenu = (options) => closeMobileMenu(options);
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
// EXPORT FOR POTENTIAL MODULE USAGE
// =============================================================================

export {
  initAnimations,
  initNavigation,
  initHeaderEffects,
  initMobileMenu,
  debounce,
  createIntersectionObserver
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

// Function to equalize heights within each row only
function equalizeRowHeights() {
  const grid = document.querySelector('.commitments-grid');
  if (!grid) return;
  
  const cards = Array.from(grid.querySelectorAll('.commitment-card'));
  if (cards.length === 0) return;
  
  // Reset heights first
  cards.forEach(card => {
    card.style.height = 'auto';
  });
  
  // Only apply row-based height equalization on desktop (2 columns)
  if (window.innerWidth >= 768) {
    // Group cards by rows (2 cards per row)
    const rows = [];
    for (let i = 0; i < cards.length; i += 2) {
      const row = cards.slice(i, i + 2);
      if (row.length > 0) {
        rows.push(row);
      }
    }
    
    // Equalize heights within each row
    rows.forEach(row => {
      if (row.length > 1) {
        const maxHeight = Math.max(...row.map(card => card.offsetHeight));
        row.forEach(card => {
          card.style.height = `${maxHeight}px`;
        });
      }
    });
  }
}

// Initialize row height equalization
function initRowHeightEqualization() {
  equalizeRowHeights();
  
  // Re-equalize on window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(equalizeRowHeights, 150);
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

// Commitments Modal functionality
function initCommitmentsModal() {
  const modalOverlay = document.getElementById('commitmentModalOverlay');
  const modal = document.querySelector('.commitment-modal');
  const closeBtn = document.getElementById('commitmentModalClose');
  const commitmentCards = document.querySelectorAll('.commitment-card');

  if (!modal || !modalOverlay || !closeBtn) {
    console.warn('Commitment modal elements not found');
    return;
  }

  // Modal elements
  const modalNumber = document.getElementById('commitmentModalNumber');
  const modalTitle = document.getElementById('commitmentModalTitle');
  const modalDescription = document.getElementById('commitmentModalDescription');
  const modalContent = document.getElementById('commitmentModalContent');

  // Function to open modal
  function openModal(commitmentData) {
    if (modalNumber) modalNumber.textContent = commitmentData.number;
    if (modalTitle) modalTitle.textContent = commitmentData.title;
    if (modalDescription) modalDescription.textContent = commitmentData.description;
    if (modalContent) modalContent.innerHTML = commitmentData.features;

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    closeBtn.focus();
  }

  // Function to close modal
  function closeModal() {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Close modal events
  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Add click events to commitment cards
  commitmentCards.forEach((card) => {
    card.addEventListener('click', () => {
      const number = card.querySelector('.commitment-number')?.textContent || '';
      const title = card.querySelector('.commitment-title')?.textContent || '';
      const description = card.querySelector('.commitment-description')?.textContent || '';
      const featuresList = card.querySelector('.commitment-features');
      
      let features = '';
      if (featuresList) {
        // Clone the entire features list to preserve nested structure
        const clonedList = featuresList.cloneNode(true);
        clonedList.className = 'commitment-features-modal';
        // Remove the display: none style that was applied in the original HTML
        clonedList.style.display = '';
        features = clonedList.outerHTML;
      }

      openModal({
        number,
        title,
        description,
        features
      });
    });

    // Keyboard accessibility
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}