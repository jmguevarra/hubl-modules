(function () {
  'use strict';

  // ── Count-up stats (triggered when the section scrolls into view) ────────

  var numberEls = document.querySelectorAll('.dx-cfs__stat-number[data-count-to]');
  if (!numberEls.length) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count-to')) || 0;
    var duration = parseInt(el.getAttribute('data-duration'), 10) || 2000;

    if (reduceMotion || !target) {
      el.textContent = target.toLocaleString();
      return;
    }

    var start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var value = Math.round(target * easeOutCubic(progress));
      el.textContent = value.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(numberEls, animateCount);
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  Array.prototype.forEach.call(numberEls, function (el) {
    observer.observe(el);
  });

})();
