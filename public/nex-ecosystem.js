(() => {
  const hero = document.querySelector('.nex-hero');
  const scene = document.querySelector('.nex-hero-scene');
  if (!hero || !scene || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let raf = 0;
  hero.addEventListener('pointermove', event => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      scene.style.transform = `scale(1.045) translate(${x * -12}px,${y * -8}px)`;
    });
  });
  hero.addEventListener('pointerleave', () => { scene.style.transform = 'scale(1.045)'; });
})();
