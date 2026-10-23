(() => {
  const root = document.querySelector('[data-offer-carousel]');
  if (!root) return;
  const slides = [...root.querySelectorAll('[data-offer-slide]')];
  const dots = [...root.querySelectorAll('[data-offer-dot]')];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  let timer;

  const show = index => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('is-current', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.tabIndex = active ? 0 : -1;
    });
    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle('is-current', active);
      dot.setAttribute('aria-pressed', String(active));
    });
  };
  const stop = () => clearInterval(timer);
  const start = () => {
    stop();
    if (!reduceMotion) timer = setInterval(() => show(current + 1), 5200);
  };
  const move = step => { show(current + step); start(); };

  root.querySelector('[data-offer-prev]').addEventListener('click', () => move(-1));
  root.querySelector('[data-offer-next]').addEventListener('click', () => move(1));
  dots.forEach(dot => dot.addEventListener('click', () => { show(Number(dot.dataset.offerDot)); start(); }));
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', event => { if (!root.contains(event.relatedTarget)) start(); });
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  show(0);
  start();
})();
