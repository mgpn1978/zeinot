/* ═══════════════════════════════════════════════════════════
   SMARTI – main.js
   ═══════════════════════════════════════════════════════════ */

/* ── HERO SLIDESHOW ─────────────────────────────────────── */
(function () {
  const slides    = document.querySelectorAll('.hero__slide');
  const dots      = document.querySelectorAll('.hero__dot');
  const totalSlides = slides.length;
  if (!totalSlides) return; // no hero en esta página

  let current = Math.floor(Math.random() * totalSlides);
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + totalSlides) % totalSlides;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() { goTo(current + 1); }

  function startAutoPlay() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  slides[current].classList.add('active');
  dots[current].classList.add('active');
  startAutoPlay();

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.slide, 10));
      startAutoPlay();
    });
  });

  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mouseenter', () => clearInterval(timer));
    hero.addEventListener('mouseleave', startAutoPlay);
  }
})();


/* ── NAVBAR SCROLL ──────────────────────────────────────── */
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ── MOBILE MENU ────────────────────────────────────────── */
(function () {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
})();


/* ── QUIZ ───────────────────────────────────────────────── */
(function () {
  const inner       = document.getElementById('quizInner');
  const progressBar = document.getElementById('quizProgressBar');
  const progressLbl = document.getElementById('quizProgressLabel');
  const progressWrap = document.getElementById('quizProgress');
  const restartBtn  = document.getElementById('quizRestart');
  if (!inner) return; // no quiz en esta página

  const totalSteps = 4;

  function showStep(stepKey) {
    inner.querySelectorAll('.quiz__step').forEach(s => s.classList.remove('active'));
    const target = inner.querySelector(`[data-step="${stepKey}"]`);
    if (target) target.classList.add('active');

    if (stepKey === 'result') {
      progressWrap.style.display = 'none';
      progressLbl.style.display  = 'none';
    } else {
      progressWrap.style.display = '';
      progressLbl.style.display  = '';
      const stepNum = parseInt(stepKey, 10);
      const pct = (stepNum / totalSteps) * 100;
      progressBar.style.width = pct + '%';
      progressLbl.textContent = `Paso ${stepNum} de ${totalSteps}`;
    }
  }

  inner.addEventListener('click', e => {
    const opt = e.target.closest('.quiz__option');
    if (!opt) return;
    showStep(opt.dataset.next);
  });

  restartBtn.addEventListener('click', () => showStep('1'));
  showStep('1');
})();


/* ── SCROLL-IN ANIMATIONS ───────────────────────────────── */
(function () {
  const targets = document.querySelectorAll('.stats__item, .step, .quiz__card');
  if (!targets.length) return;
  if (!('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(28px)';
    el.style.transition = `opacity 0.55s ease ${i * 0.08}s, transform 0.55s ease ${i * 0.08}s`;
    io.observe(el);
  });
})();


/* ── FAQ ACCORDION ──────────────────────────────────────── */
(function () {
  document.querySelectorAll('.faq__question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item   = btn.closest('.faq__item');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq__item.open').forEach(function (i) {
        i.classList.remove('open');
      });
      if (!isOpen) item.classList.add('open');
    });
  });
})();
