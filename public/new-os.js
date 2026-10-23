(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = document.querySelector('.os-hero-scene');
  const core = document.querySelector('.os-core-visual img');
  const label = document.querySelector('.os-live-label strong');
  const layers = [...document.querySelectorAll('.os-layer')];
  if (!reduce && hero) {
    let queued = false;
    const update = () => { hero.style.transform = `scale(1.035) translate3d(0,${Math.min(scrollY * .07, 54)}px,0)`; queued = false; };
    addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive:true });
  }
  const observer = new IntersectionObserver(entries => {
    const current = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
    if (!current) return;
    layers.forEach(item => item.classList.toggle('is-active', item === current.target));
    const n = Number(current.target.dataset.index || 0);
    if (label) label.textContent = current.target.dataset.layer || '';
    if (core && !reduce) core.style.transform = `rotate(${[-2,1,-1,2,0][n]}deg) scale(${[1,1.04,1.025,1.05,1.02][n]}) translateY(${n*-4}px)`;
  }, { rootMargin:'-28% 0px -38% 0px', threshold:[0,.2,.5] });
  layers.forEach(layer => observer.observe(layer));
})();
