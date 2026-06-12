/* Loads shared header + footer into #global-header / #global-footer.
   Detects path depth so subdirectory pages resolve includes/ + links correctly. */
(function () {

  /* ============================================================
     Google Tag Manager — DE Standard (every page, ONE config spot).
     Every page loads this shared file, so GTM is inherited automatically;
     a brand-new page needs zero GTM steps. To change containers, edit GTM_ID below.
     Container ID source: Salesforce Project__c.GTM_Code__c.
     NOTE: injected from this end-of-body shared script, so the classic <head>
     placement + <noscript> fallback are approximated (stopgap until Neuron). ============ */
  var GTM_ID = 'GTM-592RD6LK';
  if (GTM_ID && !window.__gtmLoaded) {
    window.__gtmLoaded = true;
    (function (w, d, s, l, i) {
      w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', GTM_ID);
    // <noscript> fallback (best-effort from JS; primary value is the gtm.js load above)
    var gtmNo = document.createElement('noscript');
    gtmNo.innerHTML = '<iframe src="https://www.googletagmanager.com/ns.html?id=' + GTM_ID + '" height="0" width="0" style="display:none;visibility:hidden"></iframe>';
    (document.body || document.documentElement).insertBefore(gtmNo, (document.body || document.documentElement).firstChild);
  }

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

  function initJourney() {
    // Scroll-linked "spine": the teal line draws as the journey section passes through view.
    // Reduced-motion: line is shown fully drawn, statically.
    var rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('[data-journey]').forEach(function (sec) {
      var fg = sec.querySelector('.journey__line-fg');
      if (!fg) return;
      var track = sec.querySelector('.journey__track') || sec;
      if (rm) { fg.style.strokeDashoffset = '0'; return; }
      var ticking = false;
      function update() {
        ticking = false;
        var r = track.getBoundingClientRect();
        var vh = window.innerHeight;
        var prog = (vh * 0.62 - r.top) / r.height;
        if (prog < 0) prog = 0; else if (prog > 1) prog = 1;
        fg.style.strokeDashoffset = String(1 - prog);
      }
      function onScroll() { if (!ticking) { ticking = true; window.requestAnimationFrame(update); } }
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      update();
    });
  }

  function initCountUp() {
    // Animate [data-count] numbers up when they scroll into view. data-plain="true" opts out
    // (e.g. a literal year). Reduced-motion: jump straight to the final value.
    var rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var els = [].slice.call(document.querySelectorAll('dd[data-count]'))
      .filter(function (el) { return el.getAttribute('data-plain') !== 'true'; });
    if (!els.length) return;
    function run(el) {
      var target = parseFloat(el.getAttribute('data-count')) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      if (rm) { el.textContent = target + suffix; return; }
      var dur = 1100, start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
      }, { threshold: 0.5 });
      els.forEach(function (el) { io.observe(el); });
    } else { els.forEach(run); }
  }

  function initValuesZoom() {
    // Values zoom-stage: pin the dark band and translate/scale a giant canvas
    // between four value "beats" on scroll, drawing a teal thread between them.
    // Desktop + motion-OK only. Mobile / reduced-motion / no-JS: the CSS stacked
    // layout holds (we simply never add .vz-ready).
    var sec = document.querySelector('[data-vz]');
    if (!sec) return;
    var stage  = sec.querySelector('.vz-stage');
    var canvas = sec.querySelector('.vz-canvas');
    var beats  = [].slice.call(sec.querySelectorAll('.vz-beat'));
    var fg     = sec.querySelector('.t-fg');
    var nodes  = [].slice.call(sec.querySelectorAll('.t-node'));
    var cores  = [].slice.call(sec.querySelectorAll('.t-node-core'));
    var dots   = [].slice.call(sec.querySelectorAll('.vz-dots span'));
    if (!stage || !canvas || !beats.length) return;

    var rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function capable() { return !rm && window.innerWidth > 900; }

    // Fixed header overlaps the top of the pinned scene — measure it so we can
    // keep the active beat + intro overlay centered in the VISIBLE area below it.
    function headerH() {
      var h = document.querySelector('.site-header');
      return h ? h.offsetHeight : 0;
    }
    function safeH() { return Math.max(0, window.innerHeight - headerH()); }

    // beat centers (match the CSS left/top + 680,520 half-size)
    var CENTERS = [[1240, 900], [4360, 1500], [1320, 2560], [4240, 3160]];
    function beatScale() { return Math.min(window.innerWidth / 1360, safeH() / 1040) * 0.84; }

    function keyframes() {
      var bs = beatScale(), c = CENTERS;
      return [
        [0.00, c[0][0], c[0][1], bs],
        [0.14, c[0][0], c[0][1], bs],  // hold card 1
        [0.34, c[1][0], c[1][1], bs],  // pan to card 2
        [0.48, c[1][0], c[1][1], bs],
        [0.64, c[2][0], c[2][1], bs],  // pan to card 3
        [0.78, c[2][0], c[2][1], bs],
        [0.94, c[3][0], c[3][1], bs],  // pan to card 4
        [1.00, c[3][0], c[3][1], bs]   // hold card 4, then unpin into the next section
      ];
    }
    function smoothstep(x) { return x * x * (3 - 2 * x); }
    function lerp(a, b, t) { return a + (b - a) * t; }
    function getCamera(t) {
      var kf = keyframes();
      for (var i = 0; i < kf.length - 1; i++) {
        var a = kf[i], b = kf[i + 1];
        if (t >= a[0] && t <= b[0]) {
          var u = (b[0] === a[0]) ? 0 : (t - a[0]) / (b[0] - a[0]);
          var eu = smoothstep(u);
          return [lerp(a[1], b[1], eu), lerp(a[2], b[2], eu), lerp(a[3], b[3], eu)];
        }
      }
      var last = kf[kf.length - 1];
      return [last[1], last[2], last[3]];
    }
    function applyCamera(t) {
      var cam = getCamera(t), lx = cam[0], ly = cam[1], s = cam[2];
      var tx = window.innerWidth / 2 - lx * s;
      var ty = headerH() + safeH() / 2 - ly * s;   // center within the area below the fixed header
      canvas.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + s + ')';
    }

    var THRESH = [0, 0.24, 0.56, 0.86];
    function activeIndex(t) {
      var idx = 0;
      for (var i = 0; i < THRESH.length; i++) { if (t >= THRESH[i]) idx = i; }
      return idx;
    }

    function update() {
      if (!sec.classList.contains('vz-ready')) return;
      sec.style.setProperty('--vz-safe', headerH() + 'px'); // header loads async — keep the title clear of it
      var rect = stage.getBoundingClientRect();
      var total = stage.offsetHeight - window.innerHeight;
      var scrolled = Math.max(0, Math.min(total, -rect.top));
      var t = total ? scrolled / total : 0;
      applyCamera(t);
      var drawn = Math.min(1, t / 0.90);
      if (fg) fg.style.strokeDashoffset = String(1 - drawn);
      sec.classList.toggle('intro-gone', t > 0.16); // title fades as we leave card 1
      sec.classList.toggle('is-end', t > 0.9);       // fade the scroll cue near the end
      var ai = activeIndex(t);
      beats.forEach(function (b, i) { b.classList.toggle('is-active', i === ai); });
      dots.forEach(function (d, i) { d.classList.toggle('on', i <= ai); });
      nodes.forEach(function (n, i) { n.classList.toggle('on', i <= ai); });
      cores.forEach(function (n, i) { n.classList.toggle('on', i <= ai); });
    }

    function layout() {
      sec.style.setProperty('--vz-safe', headerH() + 'px');
      if (capable()) { sec.classList.add('vz-ready'); update(); }
      else {
        sec.classList.remove('vz-ready');
        canvas.style.transform = '';
        if (fg) fg.style.strokeDashoffset = '';
        beats.forEach(function (b) { b.classList.remove('is-active'); });
      }
    }

    var raf = false;
    window.addEventListener('scroll', function () {
      if (raf) return; raf = true;
      window.requestAnimationFrame(function () { update(); raf = false; });
    }, { passive: true });
    window.addEventListener('resize', function () { layout(); }, { passive: true });
    layout();
  }

  // Prototype lock: only Home, Team, and Wellness & Prevention navigate.
  // Every other link is greyed out + non-clickable for this demo build.
  function lockPrototype() {
    var allow = [/\/index\.html$/i, /^\/$/, /\/team\.html$/i, /\/services\/wellness-care\.html$/i];
    document.querySelectorAll('a[href]:not(.proto-checked)').forEach(function (a) {
      a.classList.add('proto-checked');
      var href = a.getAttribute('href') || '';
      if (href.charAt(0) === '#') return; // skip-link / in-page anchors stay active
      var p = '';
      try { p = a.pathname || ''; } catch (e) {}
      if (allow.some(function (re) { return re.test(p); })) return;
      a.classList.add('is-locked');
      a.setAttribute('aria-disabled', 'true');
      a.setAttribute('tabindex', '-1');
      a.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    inject('global-header', 'header.html', function () { initHeader(); lockPrototype(); });
    inject('global-footer', 'footer.html', function () { initFooter(); lockPrototype(); });
    lockPrototype();
    initHeroVideos();
    initParallax();
    initJourney();
    initCountUp();
    initValuesZoom();

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
