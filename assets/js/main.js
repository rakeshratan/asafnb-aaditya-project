/* ==========================================================================
   main.js: navigation, config injection, product catalogue, carousel
   ========================================================================== */
(() => {
  'use strict';

  const CFG = window.SITE_CONFIG || {};
  const BASE = document.body.dataset.base || '';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = n => `<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-${n}"></use></svg>`;
  // Resolve a page inside /pages from any location (root, /pages, or absolute 404 page)
  const pageUrl = name => (BASE === '../' ? '' : BASE + 'pages/') + name;

  /* ---------- 1. Inject business details from config.js ---------- */
  const digits = v => String(v || '').replace(/\D/g, '');
  const hrefBuilders = {
    email: v => (v && v.includes('@') ? 'mailto:' + v : null),
    phone: v => (digits(v).length >= 10 ? 'tel:+' + digits(v) : null),
    whatsapp: v => (digits(v).length >= 10
      ? 'https://wa.me/' + digits(v) + (CFG.whatsappMessage ? '?text=' + encodeURIComponent(CFG.whatsappMessage) : '')
      : null),
  };
  $$('[data-config]').forEach(el => {
    const v = CFG[el.dataset.config];
    if (v) el.textContent = v;
  });
  $$('[data-config-href]').forEach(el => {
    const key = el.dataset.configHref;
    const href = hrefBuilders[key] && hrefBuilders[key](CFG[key]);
    if (!href) return; // keep the fallback link (contact page) until configured
    el.setAttribute('href', href);
    if (key === 'whatsapp') { el.target = '_blank'; el.rel = 'noopener'; }
  });
  $$('[data-social]').forEach(el => {
    const url = (CFG.socialLinks || {})[el.dataset.social];
    if (!url) return;
    const a = document.createElement('a');
    a.className = 'social__link';
    a.href = url; a.target = '_blank'; a.rel = 'noopener';
    a.innerHTML = el.innerHTML;
    el.replaceWith(a);
  });
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  /* ---------- 2. Header state, back-to-top, mobile sticky CTA ---------- */
  const header = $('[data-header]');
  const toTop = $('[data-to-top]');
  const mcta = $('[data-mcta]');
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 40);
    if (toTop) toTop.classList.toggle('is-visible', y > 900);
    if (mcta) mcta.classList.toggle('is-visible', y > 420);
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion() ? 'auto' : 'smooth' }));

  /* ---------- 3. Mobile menu ---------- */
  const burger = $('[data-burger]');
  const menu = $('[data-mobile-menu]');
  if (burger && menu) {
    let closeTimer;
    const focusables = () => [burger, ...$$('a[href], button:not([disabled])', menu)];
    const open = () => {
      clearTimeout(closeTimer);
      menu.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('is-open')));
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Close menu');
      document.body.classList.add('menu-open');
      document.documentElement.style.overflow = 'hidden';
      $$('main, footer, .m-cta').forEach(el => { el.inert = true; });
      const first = $('a', menu);
      if (first) setTimeout(() => first.focus({ preventScroll: true }), 120);
    };
    const close = (returnFocus = true) => {
      menu.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open menu');
      document.body.classList.remove('menu-open');
      document.documentElement.style.overflow = '';
      $$('main, footer, .m-cta').forEach(el => { el.inert = false; });
      closeTimer = setTimeout(() => { menu.hidden = true; }, reduceMotion() ? 0 : 700);
      if (returnFocus) burger.focus({ preventScroll: true });
    };
    const isOpen = () => burger.getAttribute('aria-expanded') === 'true';
    burger.addEventListener('click', () => (isOpen() ? close() : open()));
    menu.addEventListener('click', e => { if (e.target.closest('a')) close(false); });
    document.addEventListener('keydown', e => {
      if (!isOpen()) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'Tab') {
        const f = focusables();
        const i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    });
    window.matchMedia('(min-width: 1200px)').addEventListener('change', e => { if (e.matches && isOpen()) close(false); });
  }

  /* ---------- 4. Desktop "Products" dropdown ---------- */
  $$('[data-dropdown]').forEach(dd => {
    const btn = $('.nav__dd-toggle', dd);
    const set = open => { dd.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', String(open)); };
    let hoverAt = 0; // a click right after hover-open should not immediately close the menu
    btn.addEventListener('click', () => { if (Date.now() - hoverAt > 400) set(!dd.classList.contains('is-open')); });
    dd.addEventListener('mouseenter', () => { if (window.matchMedia('(hover: hover)').matches) { hoverAt = Date.now(); set(true); } });
    dd.addEventListener('mouseleave', () => { if (window.matchMedia('(hover: hover)').matches) set(false); });
    dd.addEventListener('focusout', e => { if (!dd.contains(e.relatedTarget)) set(false); });
    dd.addEventListener('keydown', e => { if (e.key === 'Escape' && dd.classList.contains('is-open')) { set(false); btn.focus(); } });
    document.addEventListener('click', e => { if (!dd.contains(e.target)) set(false); });
  });

  /* ---------- 5. Testimonials carousel ---------- */
  $$('[data-carousel]').forEach(car => {
    const track = $('[data-carousel-track]', car);
    const slides = Array.from(track.children);
    const dotsWrap = $('[data-carousel-dots]', car);
    const prev = $('[data-carousel-prev]', car);
    const next = $('[data-carousel-next]', car);
    if (!slides.length) return;
    const step = () => (slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth);
    const perView = () => Math.max(1, Math.round(track.clientWidth / step()));
    const maxIndex = () => Math.max(0, slides.length - perView());
    const current = () => Math.min(maxIndex(), Math.round(track.scrollLeft / step()));
    const go = i => track.scrollTo({ left: Math.max(0, Math.min(i, maxIndex())) * step(), behavior: reduceMotion() ? 'auto' : 'smooth' });
    let dots = [];
    const buildDots = () => {
      dotsWrap.innerHTML = '';
      dots = Array.from({ length: maxIndex() + 1 }, (_, i) => {
        const b = document.createElement('button');
        b.type = 'button'; b.className = 't-carousel__dot';
        b.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
        b.addEventListener('click', () => go(i));
        dotsWrap.appendChild(b);
        return b;
      });
      update();
    };
    const update = () => {
      const c = current();
      dots.forEach((d, i) => d.setAttribute('aria-current', String(i === c)));
      prev.disabled = c <= 0;
      next.disabled = c >= maxIndex();
    };
    prev.addEventListener('click', () => go(current() - 1));
    next.addEventListener('click', () => go(current() + 1));
    let raf;
    track.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }, { passive: true });
    track.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(current() + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(current() - 1); }
    });
    let rt;
    window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(buildDots, 150); });
    buildDots();
  });

  /* ---------- 6. Products: cards, catalogue filters, detail dialog ---------- */
  const PRODUCTS = window.PRODUCTS || [];
  const CATS = window.PRODUCT_CATEGORIES || {};
  const byId = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));
  const enquireUrl = p => pageUrl('enquiry.html?product=' + encodeURIComponent(p.id));
  const catLabel = p => (CATS[p.category] || {}).label || p.category;
  const priceHtml = p => (CFG.showPrices && p.price ? `<p class="p-card__price">${esc(CFG.currency || '')}${esc(p.price)}</p>` : '');

  const cardHtml = p => `
    <article class="p-card" data-id="${esc(p.id)}" data-cat="${esc(p.category)}">
      <div class="p-card__media">
        <img src="${esc(BASE + p.image)}" alt="${esc(p.name)}" width="800" height="800" loading="lazy" decoding="async">
        <span class="p-card__cat">${esc(catLabel(p))}</span>
        ${p.badge ? `<span class="p-card__badge">${esc(p.badge)}</span>` : ''}
      </div>
      <div class="p-card__body">
        <h3 class="p-card__title">${esc(p.name)}</h3>
        <p class="p-card__text">${esc(p.short)}</p>
        ${priceHtml(p)}
        <div class="p-card__tags">${(p.channels || []).map(c => `<span>${esc(c)}</span>`).join('')}</div>
        <div class="p-card__actions">
          <button type="button" class="p-card__view" data-product-view="${esc(p.id)}" aria-haspopup="dialog">${icon('eye')}View Product</button>
          <a class="btn-lux btn-lux--forest btn-lux--sm" href="${esc(enquireUrl(p))}" aria-label="Enquire about ${esc(p.name)}"><span class="btn-lux__label">Enquire</span></a>
        </div>
      </div>
    </article>`;

  // Featured grid (homepage)
  $$('[data-product-grid][data-featured]').forEach(grid => {
    grid.innerHTML = PRODUCTS.filter(p => p.featured).map(cardHtml).join('');
  });

  // Full catalogue (products page)
  const catalog = $('[data-product-grid]:not([data-featured])');
  if (catalog) {
    catalog.innerHTML = PRODUCTS.map(cardHtml).join('') +
      `<p class="p-empty" data-empty hidden>No products match your search. <a href="${esc(pageUrl('enquiry.html'))}">Tell us what you're looking for</a> and we'll try to source it.</p>`;
    const cards = $$('.p-card', catalog);
    const empty = $('[data-empty]', catalog);
    const filterBtns = $$('[data-filter]');
    const search = $('[data-product-search]');
    const status = $('[data-catalog-status]');
    let filter = 'all';
    let query = '';

    $$('[data-count-for]').forEach(el => {
      const k = el.dataset.countFor;
      el.textContent = k === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === k).length;
    });

    const apply = animate => {
      let shown = 0;
      cards.forEach(card => {
        const p = byId[card.dataset.id];
        const hay = `${p.name} ${p.short} ${catLabel(p)}`.toLowerCase();
        const ok = (filter === 'all' || p.category === filter) && (!query || hay.includes(query));
        card.hidden = !ok;
        if (ok && animate && !reduceMotion()) {
          card.classList.remove('is-entering');
          void card.offsetWidth; // restart animation
          card.style.setProperty('--si', shown);
          card.classList.add('is-entering');
        }
        if (ok) shown++;
      });
      empty.hidden = shown > 0;
      const where = filter === 'all' ? '' : ` in ${(CATS[filter] || {}).label || filter}`;
      status.textContent = `Showing ${shown} product${shown === 1 ? '' : 's'}${where}${query ? ` matching “${query}”` : ''}.`;
    };
    const setFilter = (f, animate = true) => {
      filter = CATS[f] ? f : 'all';
      filterBtns.forEach(b => {
        const on = b.dataset.filter === filter;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      apply(animate);
    };
    filterBtns.forEach(b => b.addEventListener('click', () => {
      setFilter(b.dataset.filter);
      history.replaceState(null, '', filter === 'all' ? location.pathname : '#' + filter);
    }));
    if (search) {
      let t;
      search.addEventListener('input', () => {
        clearTimeout(t);
        t = setTimeout(() => { query = search.value.trim().toLowerCase(); apply(true); }, 160);
      });
    }
    const fromHash = () => setFilter(decodeURIComponent(location.hash.slice(1)) || 'all', false);
    window.addEventListener('hashchange', fromHash);
    fromHash();
  }

  // Product detail dialog
  let dialog;
  const buildDialog = () => {
    dialog = document.createElement('dialog');
    dialog.className = 'p-dialog';
    dialog.setAttribute('aria-labelledby', 'pd-title');
    dialog.innerHTML = `
      <button class="p-dialog__close" type="button" aria-label="Close product details">${icon('close')}</button>
      <div class="p-dialog__grid">
        <div class="p-dialog__media"><img alt="" width="800" height="800" data-pd="img"></div>
        <div class="p-dialog__body">
          <p class="eyebrow" data-pd="cat"></p>
          <h2 id="pd-title" data-pd="name"></h2>
          <p class="lead-lux" data-pd="desc"></p>
          <ul class="p-dialog__highlights" data-pd="highlights"></ul>
          <ul class="spec-list">
            <li><span>Packaging</span><strong data-pd="pack"></strong></li>
            <li><span>Available for</span><strong data-pd="channels"></strong></li>
          </ul>
          <div class="p-dialog__actions">
            <a class="btn-lux btn-lux--forest" data-pd="enquire"><span class="btn-lux__label">Enquire About This Product</span>${icon('arrow-right').replace('class="icon"', 'class="icon btn-lux__icon"')}</a>
            <a class="link-lux" data-pd="page">View category${icon('arrow-right')}</a>
          </div>
        </div>
      </div>`;
    document.body.appendChild(dialog);
    $('.p-dialog__close', dialog).addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  };
  const openProduct = (id, trigger) => {
    const p = byId[id];
    if (!p) return;
    if (!dialog) buildDialog();
    const q = k => $(`[data-pd="${k}"]`, dialog);
    q('img').src = BASE + p.image;
    q('img').alt = p.name;
    q('cat').textContent = catLabel(p) + (p.badge ? ' · ' + p.badge : '');
    q('name').textContent = p.name;
    q('desc').textContent = p.description || p.short;
    q('highlights').innerHTML = (p.highlights || []).map(h => `<li>${icon('check')}${esc(h)}</li>`).join('');
    q('pack').textContent = p.packaging || 'To be confirmed';
    q('channels').textContent = (p.channels || []).join(' · ');
    q('enquire').href = enquireUrl(p);
    const cat = CATS[p.category];
    q('page').href = pageUrl(cat ? cat.page : 'products.html');
    q('page').hidden = !cat || document.body.classList.contains('page-' + p.category.replace('-', ''));
    dialog.showModal();
    dialog.addEventListener('close', () => { if (trigger) trigger.focus(); }, { once: true });
  };
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-product-view]');
    if (t) openProduct(t.dataset.productView, t);
  });
})();
