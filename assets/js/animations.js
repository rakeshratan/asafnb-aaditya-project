/* ==========================================================================
   animations.js: scroll reveals, staggered entries, counters, parallax
   Respects prefers-reduced-motion. Parallax is disabled below 768px so
   mobile scrolling stays smooth.
   ========================================================================== */
(() => {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Stagger index for children of [data-stagger]
  document.querySelectorAll('[data-stagger]').forEach(group => {
    Array.from(group.children).forEach((child, i) => child.style.setProperty('--si', Math.min(i, 10)));
  });

  /* ---------- Counters ---------- */
  const countUp = el => {
    const target = parseFloat(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || '';
    if (reduce) { el.textContent = target + suffix; return; }
    const duration = 1600;
    const start = performance.now();
    const tick = now => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased) + (t === 1 ? suffix : '');
      if (t < 1) requestAnimationFrame(tick);
    };
    el.textContent = '0';
    requestAnimationFrame(tick);
  };

  /* ---------- Reveal on scroll ---------- */
  const targets = document.querySelectorAll('[data-reveal], [data-stagger], [data-reach], [data-count]');
  const reveal = el => {
    el.classList.add('is-in');
    if (el.dataset.count !== undefined) countUp(el);
  };

  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(el => io.observe(el));
  }

  // Pause the SVG map "spark" animations for reduced-motion users
  if (reduce) {
    document.querySelectorAll('.reach__svg').forEach(svg => { if (svg.pauseAnimations) svg.pauseAnimations(); });
  }

  /* ---------- Parallax ---------- */
  const layers = Array.from(document.querySelectorAll('[data-parallax]'));
  if (!layers.length) return;
  const mq = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)');
  let ticking = false;

  const update = () => {
    ticking = false;
    if (!mq.matches) return;
    const vh = window.innerHeight;
    for (const el of layers) {
      const box = el.parentElement.getBoundingClientRect();
      if (box.bottom < -200 || box.top > vh + 200) continue;
      const speed = parseFloat(el.dataset.parallax) || 0.15;
      const offset = box.top + box.height / 2 - vh / 2;
      let y = -offset * speed;
      // Background layers are oversized by ~8%; never move past that edge.
      if (!el.classList.contains('float')) {
        const max = box.height * 0.08;
        y = Math.max(-max, Math.min(max, y));
      }
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    }
  };
  const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  const reset = () => { if (!mq.matches) layers.forEach(el => { el.style.transform = ''; }); else request(); };

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request, { passive: true });
  mq.addEventListener('change', reset);
  update();
})();
