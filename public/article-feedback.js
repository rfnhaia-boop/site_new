(() => {
  const form = document.querySelector('[data-feedback-form]');
  if (!form) return;
  const error = form.querySelector('[data-feedback-error]');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const rating = Number(data.get('rating'));
    const comment = String(data.get('comment') || '').trim();
    if (!rating) {
      error.textContent = 'Escolha de uma a cinco estrelas para continuar.';
      form.classList.remove('is-shaking');
      requestAnimationFrame(() => form.classList.add('is-shaking'));
      return;
    }
    sessionStorage.setItem('newReaderFeedback', JSON.stringify({ article: 'a-segunda-maca', rating, comment, startedAt: new Date().toISOString() }));
    location.href = '/revista/participar/';
  });
})();
