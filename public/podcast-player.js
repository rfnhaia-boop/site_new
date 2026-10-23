document.querySelectorAll('[data-audio-player]').forEach((player) => {
  const audio = player.querySelector('audio');
  const play = player.querySelector('.new-audio-play');
  const progress = player.querySelector('.new-audio-progress');
  const fill = progress.querySelector('i');
  const thumb = progress.querySelector('em');
  const current = player.querySelector('[data-current]');
  const duration = player.querySelector('[data-duration]');
  const volume = player.querySelector('.new-audio-volume');
  const format = (seconds) => {
    if (!Number.isFinite(seconds)) return '00:00';
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };
  const render = () => {
    const ratio = audio.duration ? audio.currentTime / audio.duration : 0;
    const percent = `${ratio * 100}%`;
    fill.style.width = percent;
    thumb.style.left = percent;
    current.textContent = format(audio.currentTime);
    if (audio.duration) duration.textContent = format(audio.duration);
  };
  play.addEventListener('click', () => audio.paused ? audio.play() : audio.pause());
  audio.addEventListener('play', () => { player.classList.add('is-playing'); play.setAttribute('aria-label', 'Pausar podcast'); });
  audio.addEventListener('pause', () => { player.classList.remove('is-playing'); play.setAttribute('aria-label', 'Reproduzir podcast'); });
  audio.addEventListener('timeupdate', render);
  audio.addEventListener('loadedmetadata', render);
  audio.addEventListener('ended', () => { audio.currentTime = 0; render(); });
  progress.addEventListener('click', (event) => {
    const rect = progress.getBoundingClientRect();
    audio.currentTime = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)) * audio.duration;
  });
  volume.addEventListener('click', () => {
    audio.muted = !audio.muted;
    player.classList.toggle('is-muted', audio.muted);
    volume.setAttribute('aria-label', audio.muted ? 'Ativar som' : 'Desativar som');
  });
});
