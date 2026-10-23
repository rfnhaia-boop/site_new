(() => {
  const nav = document.querySelector('.article-index');
  if (!nav) return;

  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  let currentId = '';
  let ticking = false;

  const activate = id => links.forEach(link => {
    const active = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });

  const update = () => {
    ticking = false;
    if (!sections.length) return;
    const marker = window.scrollY + Math.min(window.innerHeight * .34, 300);
    let activeSection = sections[0];
    for (const section of sections) {
      if (section.offsetTop <= marker) activeSection = section;
      else break;
    }
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
      activeSection = sections[sections.length - 1];
    }
    if (activeSection.id !== currentId) {
      currentId = activeSection.id;
      activate(currentId);
    }
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  links.forEach(link => link.addEventListener('click', () => {
    currentId = link.getAttribute('href').slice(1);
    activate(currentId);
  }));
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  window.addEventListener('load', update);
  update();
})();
