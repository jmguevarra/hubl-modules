/* module.js
   Hover is handled by CSS. This script adds tap-to-toggle for touch devices
   where :hover states don't behave like pointer hover.
*/

(function () {
  'use strict';

  function isTouchPrimary() {
    return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  }

  function initCards() {
    if (!isTouchPrimary()) return;

    var cards = document.querySelectorAll('.service-card');

    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        var isActive = card.classList.contains('is-active');

        // Collapse all
        cards.forEach(function (c) { c.classList.remove('is-active'); });

        // Toggle clicked
        if (!isActive) {
          card.classList.add('is-active');
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCards);
  } else {
    initCards();
  }
})();
