(function () {
  var SVG = '<svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.4287 6.00006L1.00014 6.00006M12.4287 6.00006L8.80059 11.0001M12.4287 6.00006L8.80059 1.00006" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';

  function enhanceButton(btn) {
    if (btn.dataset.dxEnhanced) return;
    var text = btn.textContent.trim();
    btn.innerHTML = '<span class="dx-btn-text">' + text + '</span>' + SVG;
    btn.dataset.dxEnhanced = 'true';
  }

  function tryEnhance() {
    document.querySelectorAll('[data-hsfc-id=Renderer] .hsfc-Button').forEach(enhanceButton);
  }

  var observer = new MutationObserver(tryEnhance);
  observer.observe(document.body, { childList: true, subtree: true });

  tryEnhance();
})();
