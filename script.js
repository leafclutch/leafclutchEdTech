document.addEventListener('DOMContentLoaded', () => {

  // ========== HEADER SCROLL ==========
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ========== MOBILE NAV ==========
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });

  // ========== COUNTER ANIMATION ==========
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = current;
          }
        }, 20);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // ========== FAQ ACCORDION ==========
  document.querySelectorAll('.accordion-header').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ========== CURRICULUM ACCORDION ==========
  document.querySelectorAll('.curriculum-section-header-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.curriculum-section-item');
      item.classList.toggle('active');
    });
  });

  const expandAllBtn = document.querySelector('.curriculum-expand-btn');
  if (expandAllBtn) {
    expandAllBtn.addEventListener('click', () => {
      const sections = document.querySelectorAll('.curriculum-section-item');
      const allOpen = Array.from(sections).every(s => s.classList.contains('active'));
      sections.forEach(s => {
        if (allOpen) s.classList.remove('active');
        else s.classList.add('active');
      });
      expandAllBtn.textContent = allOpen ? 'Expand all sections' : 'Collapse all sections';
    });
  }

  // ========== SCROLL REVEAL ==========
  const revealEls = document.querySelectorAll(
    '.section-badge, .section-title, .section-desc, .course-card, .blog-card, .why-us-card, .pricing-card, .testimonial-card, .about-content, .about-visual, .hero-content, .hero-images, .faq-left, .faq-right, .cta-content, .contact-info-card, .contact-form, .curriculum-module, .outcome-card, .requirements-card, .course-hero-content, .course-hero-image, .course-cta-content, .reveal, .reveal-left, .reveal-right, .reveal-scale'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ========== SMOOTH SCROLL ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = header.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});