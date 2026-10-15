(function () {
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('mobileNav');
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }

  toggle.addEventListener('click', function () {
    setOpen(!nav.classList.contains('open'));
  });

  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', function (e) {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
      setOpen(false);
    }
  });

  window.matchMedia('(min-width: 1001px)').addEventListener('change', function (mq) {
    if (mq.matches) setOpen(false);
  });
})();

// Carrossel de fotos (sem rolagem automática): um botão discreto avança; no fim, volta ao início.
(function () {
  document.querySelectorAll('[data-carousel]').forEach(function (root) {
    var track = root.querySelector('.carousel-track');
    var next = root.querySelector('[data-next]');
    if (!track || !next) return;

    function step() {
      var slide = track.querySelector('.slide');
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return slide ? slide.getBoundingClientRect().width + gap : track.clientWidth;
    }
    function atEnd() {
      return track.scrollLeft >= track.scrollWidth - track.clientWidth - 8;
    }
    function update() {
      var end = atEnd();
      next.classList.toggle('is-end', end);
      next.setAttribute('aria-label', end ? 'Voltar à primeira foto' : 'Próxima foto');
    }

    next.addEventListener('click', function () {
      if (atEnd()) track.scrollTo({ left: 0 });
      else track.scrollBy({ left: step() });
    });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); track.scrollBy({ left: step() }); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); track.scrollBy({ left: -step() }); }
    });
    track.addEventListener('scroll', function () { window.requestAnimationFrame(update); }, { passive: true });
    window.addEventListener('resize', update);
    update();
  });
})();
