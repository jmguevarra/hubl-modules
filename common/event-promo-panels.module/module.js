(function () {
  'use strict';

  // The background halves live in a separate absolutely-positioned layer
  // behind the content (see module.html), so a plain CSS :hover on the
  // panel link can't reach its matching background div via sibling
  // selectors. Sync hover/focus state across by index instead.

  var panels = document.querySelectorAll('.dx-epp__panel');
  var backgrounds = document.querySelectorAll('.dx-epp__bg');
  if (!panels.length || !backgrounds.length) return;

  Array.prototype.forEach.call(panels, function (panel, i) {
    var bg = backgrounds[i];
    if (!bg) return;

    function activate() {
      bg.classList.add('is-hovered');
    }
    function deactivate() {
      bg.classList.remove('is-hovered');
    }

    panel.addEventListener('mouseenter', activate);
    panel.addEventListener('mouseleave', deactivate);
    panel.addEventListener('focus', activate);
    panel.addEventListener('blur', deactivate);
  });

})();
