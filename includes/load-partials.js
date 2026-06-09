/* Loads shared header + footer into #global-header / #global-footer.
   Detects path depth so subdirectory pages resolve includes/ + links correctly. */
(function () {
  // Depth: how many folders deep from site root. Root pages -> base "".
  var path = window.location.pathname;
  // strip filename
  var dir = path.substring(0, path.lastIndexOf('/') + 1);
  // count segments after the site root. We assume site root is where index.html lives.
  // Heuristic: if the path contains a known subfolder, prefix '../'. Default flat.
  var segments = dir.split('/').filter(Boolean);
  // When served from project root, root pages have 0–1 trailing segments we don't control.
  // Use a data attribute override if present.
  var override = document.body.getAttribute('data-base');
  var base = override !== null ? override : '';
  var incBase = base; // includes live at <base>includes/

  function inject(id, file, done) {
    var el = document.getElementById(id);
    if (!el) { if (done) done(); return; }
    fetch(incBase + 'includes/' + file)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        el.innerHTML = html.replace(/\{\{base\}\}/g, base);
        if (done) done();
      })
      .catch(function (e) { console.error('Partial load failed:', file, e); });
  }

  function initHeader() {
    var header = document.getElementById('siteHeader');
    if (!header) return;

    // page may request a permanently solid header
    if (document.body.getAttribute('data-header') === 'solid') {
      header.classList.add('header-solid');
    } else {
      var onScroll = function () {
        if (window.scrollY > 40) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // active nav state
    var current = document.body.getAttribute('data-page');
    if (current) {
      var link = header.querySelector('[data-nav="' + current + '"]');
      if (link) link.classList.add('active');
    }

    // desktop dropdowns: Escape closes the open submenu by returning focus to its trigger
    header.querySelectorAll('.has-sub').forEach(function (sub) {
      sub.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        var trigger = sub.querySelector(':scope > a');
        if (trigger && sub.contains(document.activeElement)) {
          // move focus out of the submenu so :focus-within releases and it closes
          trigger.focus();
          trigger.blur();
        }
      });
    });

    // mobile menu
    var burger = document.getElementById('hamburger');
    var menu = document.getElementById('mobileMenu');
    var close = document.getElementById('mobileClose');
    function setMenu(open) {
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
      // move focus into the panel on open, restore to the trigger on close
      if (open) { if (close) close.focus(); }
      else { burger.focus(); }
    }
    if (burger && menu) {
      burger.addEventListener('click', function () { setMenu(true); });
      if (close) close.addEventListener('click', function () { setMenu(false); });
      menu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { setMenu(false); });
      });
      // Escape closes the menu; keep focus trapped inside while open
      menu.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { setMenu(false); return; }
        if (e.key !== 'Tab') return;
        var f = menu.querySelectorAll('a[href], button');
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      });
    }
  }

  function initFooter() {
    var y = document.getElementById('ftrYear');
    if (y) y.textContent = new Date().getFullYear();
  }

  function initHeroVideos() {
    // Hero videos carry no `autoplay` attribute — we start them here only when
    // motion is allowed, so reduced-motion users just see the poster frame.
    var rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('video[data-hero]').forEach(function (v) {
      if (rm) { try { v.pause(); } catch (e) {} return; }
      var p = v.play ? v.play() : null;
      if (p && p.catch) p.catch(function () {}); // ignore autoplay-block rejections
    });
  }

  function initParallax() {
    // Subtle scroll-coupled depth on full-bleed layers + framed images.
    // Disabled entirely under reduced-motion — no inline transforms get written.
    var mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq && mq.matches) return;
    var items = [].slice.call(document.querySelectorAll('[data-parallax]')).map(function (el) {
      return { el: el, speed: parseFloat(el.getAttribute('data-parallax')) || 0.15 };
    });
    if (!items.length) return;
    var vh = window.innerHeight, ticking = false;
    function update() {
      ticking = false;
      for (var i = 0; i < items.length; i++) {
        var it = items[i], r = it.el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue; // skip far offscreen
        var delta = (r.top + r.height / 2) - vh / 2;
        var shift = -delta * it.speed;
        var cap = r.height * 0.16;                          // keep movement inside the layer
        if (shift > cap) shift = cap; else if (shift < -cap) shift = -cap;
        it.el.style.transform = 'translate3d(0,' + shift.toFixed(1) + 'px,0)';
      }
    }
    function onScroll() { if (!ticking) { ticking = true; window.requestAnimationFrame(update); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { vh = window.innerHeight; onScroll(); }, { passive: true });
    update();
  }

  document.addEventListener('DOMContentLoaded', function () {
    inject('global-header', 'header.html', initHeader);
    inject('global-footer', 'footer.html', initFooter);
    initHeroVideos();
    initParallax();

    // global scroll-reveal
    var els = document.querySelectorAll('.reveal, .reveal-right');
    if ('IntersectionObserver' in window && els.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.18 });
      els.forEach(function (el) { io.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add('in'); });
    }
  });
})();
