(function () {
  'use strict';

  // ── Count-up stats (triggered when the section scrolls into view) ────────

  var numberEls = document.querySelectorAll('.dx-company-overview__stat-number[data-count-to]');
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

(function () {
  'use strict';

  // ── Lazy-loaded content video ─────────────────────────────────────────────
  // The <video> ships with preload="none" and no src, so it costs nothing on
  // initial load (no network/decode work, no TBT). We only attach the real
  // source and start playback once the section is about to enter the
  // viewport, and skip it entirely for reduced-motion / save-data users (the
  // poster image stays as the static fallback in both cases).

  var videos = document.querySelectorAll('.dx-company-overview__video');
  if (!videos.length) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var saveData = navigator.connection && navigator.connection.saveData;

  if (reduceMotion || saveData) return;

  function loadVideo(video) {
    var source = video.querySelector('source[data-src]');
    if (!source) return;

    source.setAttribute('src', source.getAttribute('data-src'));
    video.load();

    var playPromise = video.play();
    if (playPromise && playPromise.catch) {
      playPromise.catch(function () {}); // ignore autoplay-blocked rejections
    }
  }

  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(videos, loadVideo);
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        loadVideo(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '200px 0px', threshold: 0.1 });

  Array.prototype.forEach.call(videos, function (video) {
    observer.observe(video);
  });

})();
