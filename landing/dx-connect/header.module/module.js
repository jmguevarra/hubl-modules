document.addEventListener('DOMContentLoaded', function () {
  var header = document.getElementById('dx-header');
  var hamburger = document.querySelector('#dx-header .dx-header__hamburger');
  var overlay = document.getElementById('dx-mobile-overlay');
  var menu = document.getElementById('dx-mobile-menu');
  var closeBtn = menu ? menu.querySelector('.dx-mobile-menu__close') : null;
  var mobileCTABtn = menu ? menu.querySelector('.dx-mobile-menu__btn') : null;

  function getHeaderHeight() {
    return header ? header.offsetHeight : 0;
  }

  function scrollToAnchor(href) {
    var target = document.querySelector(href);
    if (target) {
      var top = target.getBoundingClientRect().top + window.scrollY - getHeaderHeight();
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  }

  function openMenu() {
    menu.classList.add('is-open');
    overlay.classList.add('is-active');
    hamburger.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    overlay.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Desktop + mobile nav anchor links — scroll with header offset
  document.querySelectorAll('.dx-header__nav-link, .dx-mobile-menu__nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var isMobileMenuOpen = menu && menu.classList.contains('is-open');
        if (isMobileMenuOpen) {
          closeMenu();
          setTimeout(function () { scrollToAnchor(href); }, 350);
        } else {
          scrollToAnchor(href);
        }
      });
    } else {
      // Non-anchor mobile links still close the menu
      link.addEventListener('click', closeMenu);
    }
  });

  // Mobile CTA button
  if (mobileCTABtn) mobileCTABtn.addEventListener('click', function (e) {
    var href = mobileCTABtn.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      closeMenu();
      setTimeout(function () { scrollToAnchor(href); }, 350);
    } else {
      closeMenu();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) closeMenu();
  });
});
