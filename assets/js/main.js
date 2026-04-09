/* ============================================================
   PORTFOLIO — ALI Amadou Fahishal
   assets/js/main.js — Toutes les interactions
   ============================================================ */

/* ============================================================
   1. TOGGLE LANGUE FR / EN
   Approche CSS : .lang-fr / .lang-en sur le body
   Les éléments .fr et .en sont cachés via CSS selon la classe
   ============================================================ */
(function initLangToggle() {
  const body = document.body;
  const btns = document.querySelectorAll('.lang-toggle__btn');
  if (!btns.length) return;

  /* Appliquer la langue et mettre à jour les boutons */
  function setLang(lang) {
    body.classList.remove('lang-fr', 'lang-en');
    body.classList.add('lang-' + lang);

    btns.forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang);
    });

    /* Mémoriser le choix */
    try { localStorage.setItem('portfolio-lang', lang); } catch(e) {}
  }

  /* Charger la préférence sauvegardée ou FR par défaut */
  var saved;
  try { saved = localStorage.getItem('portfolio-lang'); } catch(e) {}
  setLang(saved || 'fr');

  /* Gérer les clics */
  btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      setLang(this.dataset.lang);
    });
  });
})();

/* ============================================================
   2. ANIMATIONS SCROLL — IntersectionObserver
   Ajoute la classe .visible aux éléments .fade-up quand
   ils entrent dans le viewport
   ============================================================ */
(function initScrollAnimations() {
  var elements = document.querySelectorAll('.fade-up');
  if (!elements.length) return;

  /* Déclencher immédiatement les éléments déjà visibles */
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); /* observer une seule fois */
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(function(el) {
    observer.observe(el);
  });
})();

/* ============================================================
   3. HAMBURGER MENU MOBILE
   Toggle le menu .nav__mobile et anime les barres
   ============================================================ */
(function initHamburger() {
  var hamburger = document.querySelector('.nav__hamburger');
  var mobileMenu = document.querySelector('.nav__mobile');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', function() {
    var isOpen = mobileMenu.classList.toggle('open');
    this.setAttribute('aria-expanded', isOpen);

    /* Animation des 3 barres en croix */
    var bars = this.querySelectorAll('span');
    if (isOpen) {
      bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      bars.forEach(function(b) {
        b.style.transform = '';
        b.style.opacity = '';
      });
    }
  });

  /* Fermer le menu quand on clique sur un lien */
  mobileMenu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.querySelectorAll('span').forEach(function(b) {
        b.style.transform = '';
        b.style.opacity = '';
      });
    });
  });
})();

/* ============================================================
   4. LIGHTBOX PHOTOS
   Affiche les images en plein écran avec navigation prev/next
   Les éléments déclencheurs ont l'attribut data-lightbox="chemin/image.jpg"
   ============================================================ */
(function initLightbox() {
  var lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;

  var imgEl   = lightbox.querySelector('.lightbox__img');
  var closeEl = lightbox.querySelector('.lightbox__close');
  var prevEl  = lightbox.querySelector('.lightbox__prev');
  var nextEl  = lightbox.querySelector('.lightbox__next');

  /* Liste de toutes les images cliquables */
  var images = [];
  var currentIndex = 0;

  function buildImageList() {
    images = Array.from(document.querySelectorAll('[data-lightbox]'));
  }

  function open(index) {
    buildImageList();
    currentIndex = index;
    var src = images[currentIndex] ? images[currentIndex].dataset.lightbox : '';
    if (!src) return;
    imgEl.src = src;
    imgEl.alt = images[currentIndex].getAttribute('alt') || 'Photo';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    /* Vider le src pour libérer mémoire */
    setTimeout(function() { imgEl.src = ''; }, 300);
  }

  function navigate(dir) {
    if (!images.length) return;
    currentIndex = (currentIndex + dir + images.length) % images.length;
    imgEl.src = images[currentIndex].dataset.lightbox;
  }

  /* Attacher les déclencheurs aux éléments data-lightbox */
  document.querySelectorAll('[data-lightbox]').forEach(function(el, idx) {
    el.style.cursor = 'pointer';
    el.addEventListener('click', function() { open(idx); });
  });

  /* Boutons lightbox */
  if (closeEl) closeEl.addEventListener('click', close);
  if (prevEl)  prevEl.addEventListener('click',  function() { navigate(-1); });
  if (nextEl)  nextEl.addEventListener('click',  function() { navigate(1); });

  /* Fermer en cliquant sur le fond noir */
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) close();
  });

  /* Navigation clavier */
  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   navigate(-1);
    if (e.key === 'ArrowRight')  navigate(1);
  });
})();

/* ============================================================
   5. LAZY LOADING VIDÉOS
   Les vidéos ont l'attribut data-lazy sur la balise <video>
   et data-src sur les balises <source> enfants.
   Le chargement est déclenché quand la vidéo devient visible.
   ============================================================ */
(function initLazyVideos() {
  var lazyVideos = document.querySelectorAll('video[data-lazy]');
  if (!lazyVideos.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var video = entry.target;

      /* Charger les <source data-src> */
      video.querySelectorAll('source[data-src]').forEach(function(source) {
        source.src = source.dataset.src;
      });
      video.load();
      observer.unobserve(video);
    });
  }, { threshold: 0.25 });

  lazyVideos.forEach(function(video) {
    observer.observe(video);
  });
})();

/* ============================================================
   6. LIEN NAV ACTIF AU SCROLL
   Met la classe .active sur le lien correspondant à la
   section visible dans le viewport
   ============================================================ */
(function initActiveNav() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__link[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;
        navLinks.forEach(function(link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(function(section) { observer.observe(section); });
})();

/* ============================================================
   7. FILTRE CATÉGORIES — blog.html
   Filtre les cartes articles selon leur data-category
   ============================================================ */
(function initBlogFilters() {
  var filterBtns = document.querySelectorAll('.filter-btn');
  var articles   = document.querySelectorAll('.article-card[data-category]');
  if (!filterBtns.length || !articles.length) return;

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var filter = this.dataset.filter;

      /* Mettre à jour l'état actif des boutons */
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');

      /* Afficher/masquer les articles */
      articles.forEach(function(article) {
        var match = filter === 'all' || article.dataset.category === filter;
        article.style.display = match ? '' : 'none';
      });
    });
  });
})();
