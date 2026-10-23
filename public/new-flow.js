(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scene = document.querySelector('.flow-hero-scene');
  const stageImage = document.querySelector('.flow-stage img');
  const label = document.querySelector('.flow-stage-label strong');
  const steps = [...document.querySelectorAll('.flow-step')];
  if (!reduce && scene) {
    let ticking = false;
    const move = () => { scene.style.transform = `scale(1.04) translate3d(0, ${Math.min(scrollY * .075, 58)}px, 0)`; ticking = false; };
    addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(move); ticking = true; } }, { passive: true });
  }
  if (steps.length) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      steps.forEach(step => step.classList.toggle('is-active', step === visible.target));
      const index = steps.indexOf(visible.target);
      if (label) label.textContent = visible.target.dataset.label || '';
      if (stageImage && !reduce) {
        const rotations = [-2, 1.5, -1, 2, 0], scales = [1, 1.035, 1.02, 1.045, 1.025];
        stageImage.style.transform = `translate3d(0, ${index * -5}px, 0) rotate(${rotations[index]}deg) scale(${scales[index]})`;
      }
    }, { rootMargin: '-28% 0px -38% 0px', threshold: [0, .15, .35, .65] });
    steps.forEach(step => observer.observe(step));
  }
})();
