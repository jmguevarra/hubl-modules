(function () {
  'use strict';

  // Cards visible per wrapper width — mirrors CSS breakpoints
  function getPerView(wrapperWidth) {
    if (wrapperWidth <= 480) return 1;
    if (wrapperWidth <= 1024) return 2;
    return 3;
  }

  function initSlider(el) {
    var track    = el.querySelector('.dx-bslider__track');
    var prevBtn  = el.querySelector('.dx-bslider__nav-btn--prev');
    var nextBtn  = el.querySelector('.dx-bslider__nav-btn--next');
    var dotsWrap = el.querySelector('.dx-bslider__dots');
    var wrapper  = el.querySelector('.dx-bslider__wrapper');

    if (!track) return;

    var cards = Array.prototype.slice.call(track.querySelectorAll('.dx-bslider__card'));
    if (cards.length === 0) return;

    // ── Settings from data attributes ────────────────────
    var autoplay      = el.getAttribute('data-autoplay') === 'true';
    var autoplaySpeed = parseInt(el.getAttribute('data-autoplay-speed'), 10) || 4000;

    var currentIndex  = 0;
    var perView, maxIndex;
    var autoplayTimer = null;

    // ── Autoplay ──────────────────────────────────────────

    function startAutoplay() {
      if (!autoplay) return;
      stopAutoplay();
      autoplayTimer = setInterval(function () {
        goTo(currentIndex >= maxIndex ? 0 : currentIndex + 1);
      }, autoplaySpeed);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    // ── Slide helpers ─────────────────────────────────────

    function computeGap() {
      var raw = window.getComputedStyle(track).columnGap;
      return raw ? parseFloat(raw) : 24;
    }

    function slide(animate) {
      var cardWidth = cards[0].offsetWidth;
      var gap       = computeGap();
      var offset    = currentIndex * (cardWidth + gap);

      if (animate === false) {
        track.style.transition = 'none';
        track.style.transform  = 'translateX(-' + offset + 'px)';
        track.offsetWidth; // force reflow
        track.style.transition = '';
      } else {
        track.style.transform = 'translateX(-' + offset + 'px)';
      }

      if (prevBtn) prevBtn.disabled = currentIndex <= 0;
      if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex;

      updateDots();
    }

    function goTo(index) {
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      slide(true);
      // Restart autoplay timer so manual nav resets the interval
      if (autoplay) startAutoplay();
    }

    // ── Dots ──────────────────────────────────────────────

    function renderDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';

      var dotCount = maxIndex + 1;
      if (dotCount <= 1) { dotsWrap.hidden = true; return; }
      dotsWrap.hidden = false;

      for (var i = 0; i < dotCount; i++) {
        var dot = document.createElement('button');
        dot.type      = 'button';
        dot.className = 'dx-bslider__dot' + (i === currentIndex ? ' is-active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');

        (function (idx) {
          dot.addEventListener('click', function () { goTo(idx); });
        })(i);

        dotsWrap.appendChild(dot);
      }
    }

    function updateDots() {
      if (!dotsWrap) return;
      var dots = dotsWrap.querySelectorAll('.dx-bslider__dot');
      dots.forEach(function (dot, i) {
        var active = i === currentIndex;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-selected', active ? 'true' : 'false');
      });
    }

    // ── Recalculate on resize ─────────────────────────────

    function refresh() {
      var wrapperWidth = wrapper ? wrapper.offsetWidth : window.innerWidth;
      perView      = getPerView(wrapperWidth);
      maxIndex     = Math.max(0, cards.length - perView);
      currentIndex = Math.min(currentIndex, maxIndex);

      renderDots();
      slide(false);
    }

    // ── Touch / swipe ─────────────────────────────────────

    var touchStartX = 0;

    el.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    el.addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        goTo(diff > 0 ? currentIndex + 1 : currentIndex - 1);
      }
    }, { passive: true });

    // ── Keyboard ──────────────────────────────────────────

    el.setAttribute('tabindex', '0');
    el.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(currentIndex - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(currentIndex + 1); }
    });

    // ── Button listeners ──────────────────────────────────

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(currentIndex - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(currentIndex + 1); });

    // ── Autoplay pause on hover / focus ───────────────────

    if (autoplay) {
      el.addEventListener('mouseenter', stopAutoplay);
      el.addEventListener('mouseleave', startAutoplay);
      el.addEventListener('focusin',    stopAutoplay);
      el.addEventListener('focusout',   startAutoplay);
    }

    // ── Resize (debounced) ────────────────────────────────

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(refresh, 150);
    });

    // ── Init ──────────────────────────────────────────────

    refresh();
    if (autoplay) startAutoplay();
  }

  document.querySelectorAll('.dx-bslider').forEach(function (el) {
    initSlider(el);
  });

})();
