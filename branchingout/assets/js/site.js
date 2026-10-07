
  // header scroll state
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  function openMenu(){ mobileMenu.classList.add('open'); menuToggle.setAttribute('aria-expanded','true'); }
  function closeMenu(){ mobileMenu.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false'); }
  menuToggle.addEventListener('click', openMenu);
  mobileClose.addEventListener('click', closeMenu);
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // stat-ring draw-in animation
  (function(){
    const rings = document.querySelectorAll('.stat-ring circle');
    if (!rings.length) return;
    rings.forEach(c => {
      const r = parseFloat(c.getAttribute('r'));
      const circumference = 2 * Math.PI * r;
      c.style.strokeDasharray = circumference;
      c.style.strokeDashoffset = circumference;
    });
    const statIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.querySelectorAll('.stat-ring circle').forEach((c, i) => {
            c.style.transition = 'stroke-dashoffset 1s ease ' + (i * 0.12) + 's';
            c.style.strokeDashoffset = 0;
          });
          statIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('.stat').forEach(el => statIo.observe(el));
  })();

  // reviews carousel
  (function(){
    const grid = document.getElementById('tGrid');
    const prevBtn = document.getElementById('tPrev');
    const nextBtn = document.getElementById('tNext');
    if (!grid || !prevBtn || !nextBtn) return;

    function step(){
      const card = grid.querySelector('.t-card');
      if (!card) return grid.clientWidth * 0.8;
      const gap = parseFloat(getComputedStyle(grid).columnGap || getComputedStyle(grid).gap) || 18;
      return card.getBoundingClientRect().width + gap;
    }
    function updateArrows(){
      const max = grid.scrollWidth - grid.clientWidth - 2;
      prevBtn.disabled = grid.scrollLeft <= 2;
      nextBtn.disabled = grid.scrollLeft >= max;
    }
    prevBtn.addEventListener('click', () => grid.scrollBy({ left: -step(), behavior: 'smooth' }));
    nextBtn.addEventListener('click', () => grid.scrollBy({ left: step(), behavior: 'smooth' }));
    grid.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    updateArrows();
  })();

  // Submit the contact form to a server-side handler without leaving the page.
  // NOTE: this expects a working endpoint at the form's `action` (e.g. a PHP
  // mail script on your hosting). Point it at whatever handler you set up,
  // or swap this for a plain mailto/no-JS form if you're not running a backend.
  (function(){
    const forms = document.querySelectorAll('form[action="contact-handler.php"]');
    forms.forEach(function(form){
      form.addEventListener('submit', async function(e){
        e.preventDefault();
        if (!form.checkValidity()){
          form.reportValidity();
          return;
        }
        const button = form.querySelector('[type="submit"]');
        const status = form.querySelector('[data-form-status]');
        const originalLabel = button.textContent;
        button.disabled = true;
        button.textContent = 'Sending…';
        status.textContent = 'Sending your enquiry…';
        try {
          const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
          });
          const result = await response.json();
          if (!response.ok || !result.ok) throw new Error(result.message || 'Unable to send');
          form.reset();
          status.textContent = 'Thanks — your message has been sent. Kane will be in touch shortly.';
          const card = document.getElementById('contactCard');
          const success = document.getElementById('formSuccess');
          if (card && success) {
            card.classList.add('submitted');
            success.classList.add('show');
          }
        } catch (error) {
          status.textContent = 'Sorry, your message could not be sent. Please call 07842 358 355 or email kane@branchingouttreesurgery.co.uk.';
        } finally {
          button.disabled = false;
          button.textContent = originalLabel;
        }
      });
    });
  })();
