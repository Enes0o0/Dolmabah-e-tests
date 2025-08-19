(function () {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Mobile nav toggle
  const navToggleButton = $('#navToggle');
  const mainNav = $('#mainNav');
  if (navToggleButton && mainNav) {
    navToggleButton.addEventListener('click', () => {
      const isOpen = getComputedStyle(mainNav).display !== 'none';
      mainNav.style.display = isOpen ? 'none' : 'flex';
    });
  }

  // Smooth scroll navigation
  const navLinks = $$('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');
      const element = $(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile nav after click
        if (window.innerWidth <= 820) {
          mainNav.style.display = 'none';
        }
        // Update active state
        updateActiveNav(target);
      }
    });
  });

  // Update active navigation state
  function updateActiveNav(activeId) {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === activeId);
    });
  }

  // Scroll spy to update active navigation
  function handleScrollSpy() {
    const sections = $$('section[id]');
    const scrollPos = window.scrollY + 100;
    
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = '#' + section.id;
      }
    });
    
    if (current) {
      updateActiveNav(current);
    }
  }

  // Throttled scroll handler
  let scrollTimer;
  window.addEventListener('scroll', () => {
    if (scrollTimer) return;
    scrollTimer = setTimeout(() => {
      handleScrollSpy();
      scrollTimer = null;
    }, 100);
  });



  // Newsletter form
  const form = $('#newsletterForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = $('#email').value.trim();
      const consent = $('#consent').checked;
      const msg = $('.form-message');
      const isValid = /.+@.+\..+/.test(email) && consent;
      if (isValid) {
        msg.textContent = 'Teşekkürler! Kaydınız alındı.';
        msg.style.color = '#0a7f2e';
        form.reset();
      } else {
        msg.textContent = 'Lütfen geçerli bir e-posta girin ve onay kutusunu işaretleyin.';
        msg.style.color = '#b00000';
      }
    });
  }

  // Contact form
  const contactForm = $('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = $('.contact-message');
      msg.textContent = 'Mesajınız alındı. Teşekkürler!';
      msg.style.color = '#0a7f2e';
      contactForm.reset();
    });
  }

  // Footer year
  const y = new Date().getFullYear();
  const yEl = document.getElementById('year');
  if (yEl) yEl.textContent = String(y);
})();


