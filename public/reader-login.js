(() => {
  const form = document.querySelector('[data-reader-login-form]');
  if (!form) return;
  const error = document.querySelector('[data-login-error]');
  const summary = document.querySelector('[data-rating-summary]');
  const success = document.querySelector('[data-reader-success]');
  const submit = document.querySelector('[data-submit-feedback]');
  let draft;
  try { draft = JSON.parse(sessionStorage.getItem('newReaderFeedback')); } catch {}
  if (!draft?.rating) {
    summary.textContent = 'Sua avaliação ainda não foi selecionada.';
    error.innerHTML = '<a href="/revista/a-segunda-maca/#reader-response-title">Volte ao artigo para escolher as estrelas.</a>';
    submit.disabled = true;
    return;
  }
  summary.textContent = '★'.repeat(draft.rating) + '☆'.repeat(5 - draft.rating);
  form.addEventListener('submit', async event => {
    event.preventDefault();
    error.textContent = '';
    const data = new FormData(form);
    submit.disabled = true;
    submit.firstChild.textContent = 'Enviando… ';
    try {
      const response = await fetch('/api/revista/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...draft, email: data.get('email'), phone: data.get('phone'), consent: data.get('consent') === 'on', website: data.get('website') }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Não foi possível enviar agora.');
      sessionStorage.removeItem('newReaderFeedback');
      form.hidden = true;
      success.hidden = false;
    } catch (err) {
      error.textContent = err.message || 'Não foi possível enviar agora. Tente novamente.';
      submit.disabled = false;
      submit.firstChild.textContent = 'Enviar minha avaliação ';
    }
  });
})();
