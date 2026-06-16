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
