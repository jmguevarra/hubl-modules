(function () {
  'use strict';

  function initSlider(el) {
    var track   = el.querySelector('.dx-cs__track');
    var prevBtn = el.querySelector('.dx-cs__nav-btn--prev');
    var nextBtn = el.querySelector('.dx-cs__nav-btn--next');
    var current = el.querySelector('.dx-cs__counter-current');

    if (!track) return;

    var slides = Array.prototype.slice.call(track.querySelectorAll('.dx-cs__slide'));
    if (slides.length <= 1) return;

    var loop = el.closest('.dx-cs').getAttribute('data-loop') === 'true';
    var currentIndex = 0;
    var maxIndex = slides.length - 1;

    function goTo(index) {
      if (loop) {
        if (index < 0) index = maxIndex;
        else if (index > maxIndex) index = 0;
      }
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
      if (current) current.textContent = currentIndex + 1;
      if (prevBtn) prevBtn.disabled = !loop && currentIndex <= 0;
      if (nextBtn) nextBtn.disabled = !loop && currentIndex >= maxIndex;
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(currentIndex - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(currentIndex + 1); });

    var touchStartX = 0;
    el.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    el.addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? currentIndex + 1 : currentIndex - 1);
    }, { passive: true });

    el.setAttribute('tabindex', '0');
    el.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(currentIndex - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(currentIndex + 1); }
    });

    goTo(0);
  }

  document.querySelectorAll('.dx-cs__slider').forEach(function (el) {
    initSlider(el);
  });
})();
