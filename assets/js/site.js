/* =========================================================
   DiagAI - Shared header/footer + hành vi dùng chung
   (Theme toggle, Lightbox, OS-detect tải app, Reveal on scroll)
   Chèn 1 lần duy nhất ở đây để mọi trang (index.html, ung-dung.html...)
   luôn hiển thị CÙNG MỘT menu header / footer, không bị lệch nhau.
   ========================================================= */
(function () {
  var HEADER_HTML =
    '<div class="site-wrapper nav-wrapper">' +
    '  <a href="./" class="brand">' +
    '    <img src="assets/icons/main.png" alt="DiagAI Logo" />' +
    '    <div class="brand-info">' +
    '      <h1>DiagAI</h1>' +
    '      <p>HỖ TRỢ CHẨN ĐOÁN VÀ TƯ VẤN BỆNH TAY CHÂN MIỆNG</p>' +
    '    </div>' +
    '  </a>' +
    '  <ul class="nav-links">' +
    '    <li><a href="./" data-nav="home">Trang Chủ</a></li>' +
    '    <li><a href="ung-dung.html" data-nav="app">Tính Năng App</a></li>' +
    '    <li><a href="./#video-warnings" data-nav="danger">Dấu Hiệu Nguy Hiểm</a></li>' +
    '    <li><a href="./#research" data-nav="research">Nghiên Cứu &amp; Báo Chí</a></li>' +
    '  </ul>' +
    '  <div class="nav-actions">' +
    '    <button class="theme-toggle" id="theme-btn" aria-label="Đổi giao diện Sáng/Tối" title="Đổi giao diện Sáng/Tối">' +
    '      <svg class="svg-icon sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '        <circle cx="12" cy="12" r="5"></circle>' +
    '        <line x1="12" y1="1" x2="12" y2="3"></line>' +
    '        <line x1="12" y1="21" x2="12" y2="23"></line>' +
    '        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>' +
    '        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>' +
    '        <line x1="1" y1="12" x2="3" y2="12"></line>' +
    '        <line x1="21" y1="12" x2="23" y2="12"></line>' +
    '        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>' +
    '        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>' +
    '      </svg>' +
    '      <svg class="svg-icon moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>' +
    '      </svg>' +
    '    </button>' +
    '    <a href="download.html" class="btn btn-primary" id="btn-main-download">' +
    '      <svg class="svg-icon" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" /></svg>' +
    '      Tải App Miễn Phí' +
    '    </a>' +
    '  </div>' +
    '</div>';

  var FOOTER_HTML =
    '<footer>' +
    '  <div>&copy; 2026 DiagAI. Dự án hỗ trợ chẩn đoán &amp; tư vấn bệnh Tay Chân Miệng cho trẻ em.</div>' +
    '  <div>' +
    '    <a href="./" style="color:var(--text-muted);margin-right:12px;text-decoration:none;">Trang Chủ</a>' +
    '    <a href="ung-dung.html" style="color:var(--text-muted);margin-right:12px;text-decoration:none;">Tính Năng App</a>' +
    '    <a href="download.html" style="color:var(--text-muted);text-decoration:none;">Tải App</a>' +
    '  </div>' +
    '</footer>';

  var LIGHTBOX_HTML =
    '<div class="lightbox-modal" id="lightbox" onclick="closeLightbox()">' +
    '  <button class="lightbox-close" onclick="closeLightbox()">&times;</button>' +
    '  <div class="lightbox-content" onclick="event.stopPropagation()">' +
    '    <img id="lightbox-img" src="" alt="Xem ảnh to" />' +
    '  </div>' +
    '</div>';

  var AMBIENT_HTML =
    '<div class="bg-ambient-layer" id="ambient-layer">' +
    '  <div class="aura-blob aura-blob-1"></div>' +
    '  <div class="aura-blob aura-blob-2"></div>' +
    '  <div class="aura-blob aura-blob-3"></div>' +
    '</div>';

  function injectPartials() {
    var headerMount = document.getElementById('site-header');
    if (headerMount) {
      headerMount.outerHTML = '<header>' + HEADER_HTML + '</header>';
    }
    var footerMount = document.getElementById('site-footer');
    if (footerMount && FOOTER_HTML) {
      footerMount.outerHTML = FOOTER_HTML;
    }
    if (!document.getElementById('lightbox')) {
      var lightboxHost = document.createElement('div');
      lightboxHost.innerHTML = LIGHTBOX_HTML;
      document.body.appendChild(lightboxHost.firstElementChild);
    }
    if (!document.getElementById('ambient-layer')) {
      var auraHost = document.createElement('div');
      auraHost.innerHTML = AMBIENT_HTML;
      document.body.prepend(auraHost.firstElementChild);
    }
  }

  function setupTiltEffect() {
    if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;
    var tiltElements = document.querySelectorAll('[data-tilt]');
    tiltElements.forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var rect = el.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var maxTilt = parseFloat(el.getAttribute('data-tilt-max')) || 7;
        var rotateX = ((y - centerY) / centerY) * -maxTilt;
        var rotateY = ((x - centerX) / centerX) * maxTilt;
        el.style.transform = 'perspective(1400px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateY(-8px) scale(1.015)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transform = '';
      });
    });
  }

  function markActiveNav() {
    var page = document.body.getAttribute('data-page');
    if (!page) return;
    var link = document.querySelector('.nav-links a[data-nav="' + page + '"]');
    if (link) link.classList.add('active');
  }

  // Tự động giữ sticky header và thêm class is-scrolled khi cuộn trang
  function setupStickyHeader() {
    var header = document.querySelector('header');
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 10) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Đo chiều cao thật của header và lưu vào biến CSS --header-h, để các thành
  // phần sticky bên dưới (vd: subnav ở ung-dung.html) luôn dính sát header,
  // không bị hở/lệch dù header co giãn theo responsive hay theo nội dung.
  function setupHeaderHeightVar() {
    var header = document.querySelector('header');
    if (!header) return;
    function update() {
      document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
    }
    update();
    if (window.ResizeObserver) {
      new ResizeObserver(update).observe(header);
    } else {
      window.addEventListener('resize', update);
    }
    // Đo lại 1 lần sau khi font/ảnh tải xong phòng khi chiều cao thay đổi nhẹ
    window.addEventListener('load', update);
  }

  function setupTheme() {
    var themeBtn = document.getElementById('theme-btn');
    if (!themeBtn) return;
    var currentTheme = localStorage.getItem('theme') || 'light';
    function applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
    applyTheme(currentTheme);
    themeBtn.addEventListener('click', function () {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(currentTheme);
    });
  }

  function setupReveal() {
    var revealElements = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');
    if (!revealElements.length) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealElements.forEach(function (el) { observer.observe(el); });
  }

  // Tự động nhận diện tab đang xem khi cuộn trang (ScrollSpy cho subnav ở ung-dung.html)
  function setupSubnavScrollSpy() {
    var subnavLinks = document.querySelectorAll('.subnav-inner a[href^="#"]');
    if (!subnavLinks.length) return;
    var sections = [];
    subnavLinks.forEach(function (link) {
      var targetId = link.getAttribute('href').substring(1);
      var section = document.getElementById(targetId);
      if (section) sections.push({ link: link, section: section });
    });
    if (!sections.length) return;

    function onScroll() {
      var headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 80;
      var scrollPos = window.scrollY + headerH + 100;
      var activeIndex = 0;
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].section.offsetTop <= scrollPos) {
          activeIndex = i;
        }
      }
      sections.forEach(function (item, idx) {
        if (idx === activeIndex) {
          item.link.classList.add('active');
        } else {
          item.link.classList.remove('active');
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Chuyển mượt khi click chọn tab
    subnavLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = link.getAttribute('href').substring(1);
        var targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          var headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 80;
          var topPos = targetEl.getBoundingClientRect().top + window.pageYOffset - (headerH + 60);
          window.scrollTo({ top: topPos, behavior: 'smooth' });
          targetEl.classList.remove('tab-highlight');
          void targetEl.offsetWidth;
          targetEl.classList.add('tab-highlight');
        }
      });
    });
  }

  // Lightbox - Mở khi click vào ảnh, giữ nguyên tới khi bấm X hoặc click ngoài
  window.openLightbox = function (src) {
    if (!src) return;
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function () {
    var lightbox = document.getElementById('lightbox');
    if (lightbox) {
      lightbox.classList.remove('active');
    }
    document.body.style.overflow = '';
  };

  function setupSmartDownload() {
    var ua = navigator.userAgent || '';
    var isIOS = /iPhone|iPad|iPod/i.test(ua);
    var isAndroid = /Android/i.test(ua);
    var ANDROID_APK_URL = 'download/diag-ai-release.apk';
    var IOS_TESTFLIGHT_URL = 'https://testflight.apple.com/join/D4fC5G5z';

    var qrAndroid = document.getElementById('qr-code-android');
    var qrIOS = document.getElementById('qr-code-ios');
    var androidUrl = (window.location.hostname === 'diagai.vn')
      ? 'https://diagai.vn/download/diag-ai-release.apk'
      : window.location.origin + '/download/diag-ai-release.apk';

    if (qrAndroid) {
      qrAndroid.src = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&color=0B5C34&data=' + encodeURIComponent(androidUrl);
    }
    if (qrIOS) {
      qrIOS.src = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&color=0284C7&data=' + encodeURIComponent(IOS_TESTFLIGHT_URL);
    }

    document.querySelectorAll('a[href="download.html"]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        if (isIOS) {
          e.preventDefault();
          window.location.href = IOS_TESTFLIGHT_URL;
        } else if (isAndroid) {
          e.preventDefault();
          window.location.href = ANDROID_APK_URL;
        }
      });
    });
  }

  function init() {
    injectPartials();
    markActiveNav();
    setupStickyHeader();
    setupHeaderHeightVar();
    setupTheme();
    setupReveal();
    setupTiltEffect();
    setupSubnavScrollSpy();
    setupSmartDownload();
    document.dispatchEvent(new CustomEvent('site:ready'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
