(function () {
  const slides = Array.from(document.querySelectorAll('[data-carousel-slide]'));
  if (!slides.length) return;

  const modal = document.getElementById('gallery-lightbox');
  if (!modal) return;

  const img = document.getElementById('lightbox-img');
  const desc = document.getElementById('lightbox-desc');
  const closeBtn = document.getElementById('lightbox-close');

  const photos = slides.map((slide) => ({
    src: slide.dataset.full || '',
    alt: slide.dataset.alt || '',
    caption: slide.dataset.caption || '',
  }));

  const open = (index) => {
    const photo = photos[index];
    if (!photo) return;

    if (img) {
      img.src = photo.src;
      img.alt = photo.alt;
    }
    if (desc) desc.textContent = photo.caption;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  slides.forEach((slide, i) => {
    slide.addEventListener('click', () => open(i));
  });

  if (closeBtn) closeBtn.addEventListener('click', close);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) close();
  });

  document.addEventListener('keydown', (event) => {
    if (modal.classList.contains('hidden')) return;
    if (event.key === 'Escape') close();
  });
})();
