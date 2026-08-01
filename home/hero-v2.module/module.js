(function () {
  'use strict';

  // ── Typewriter animation ────────────────────────────────────────────────────

  var wordContainer = document.querySelector('.dx-home-hero__words');
  var typingEl = document.querySelector('.dx-home-hero__typing');

  if (!wordContainer || !typingEl) return;

  var wordEls = wordContainer.querySelectorAll('span');
  if (!wordEls.length) return;

  var words = Array.prototype.map.call(wordEls, function (el) {
    return el.textContent.trim();
  }).filter(Boolean);

  if (!words.length) return;

  var wordIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var timer;

  var SPEEDS = {
    typing:   110,   // ms per character while typing
    deleting:  55,   // ms per character while deleting
    pauseEnd: 2200,  // pause after full word is typed
    pauseNext: 380,  // pause before typing the next word
  };

  function tick() {
    var current = words[wordIndex];

    if (isDeleting) {
      charIndex -= 1;
    } else {
      charIndex += 1;
    }

    typingEl.textContent = current.substring(0, charIndex);

    var delay = isDeleting ? SPEEDS.deleting : SPEEDS.typing;

    if (!isDeleting && charIndex === current.length) {
      // Finished typing – pause then start deleting
      delay = SPEEDS.pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting – move to next word then pause
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = SPEEDS.pauseNext;
    }

    timer = setTimeout(tick, delay);
  }

  // Small initial delay so the page settles before typing starts
  timer = setTimeout(tick, 600);

})();

(function () {
  'use strict';

  // ── Background video (lazy-loaded, delayed) ───────────────────────────────
  // Deferring the video request until after the page has settled keeps it off
  // the critical path (LCP/CLS), instead of competing with initial paint.

  var video = document.querySelector('.dx-home-hero__video');
  if (!video) return;

  var sources = video.querySelectorAll('source[data-src]');
  if (!sources.length) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var saveData = navigator.connection && navigator.connection.saveData;
  if (reduceMotion || saveData) return;

  var LOAD_DELAY = 1200; // ms – wait for the page to settle before requesting the video

  function loadVideo() {
    Array.prototype.forEach.call(sources, function (source) {
      source.setAttribute('src', source.getAttribute('data-src'));
    });

    video.addEventListener('loadeddata', function () {
      video.classList.add('is-playing');
      var playPromise = video.play();
      if (playPromise && playPromise.catch) {
        playPromise.catch(function () {}); // ignore autoplay-blocked rejections
      }
    }, { once: true });

    video.load();
  }

  function schedule() {
    setTimeout(function () {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(loadVideo, { timeout: 1500 });
      } else {
        loadVideo();
      }
    }, LOAD_DELAY);
  }

  if (document.readyState === 'complete') {
    schedule();
  } else {
    window.addEventListener('load', schedule, { once: true });
  }

})();
