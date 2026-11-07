(function () {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const track = carousel.querySelector('[data-carousel-track]');
  const slides = Array.from(carousel.querySelectorAll('[data-carousel-slide]'));
  const prevBtn = carousel.querySelector('[data-carousel-prev]');
  const nextBtn = carousel.querySelector('[data-carousel-next]');

  const step = () => Math.max(track.clientWidth * 0.8, 260);

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -step(), behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: step(), behavior: 'smooth' });
    });
  }

  // Lightbox
  const modal = document.getElementById('gallery-lightbox');
  if (!modal) return;

  const img = document.getElementById('lightbox-img');
  const counter = document.getElementById('lightbox-counter');
  const title = document.getElementById('lightbox-title');
  const desc = document.getElementById('lightbox-desc');
  const thumbs = document.getElementById('lightbox-thumbs');
  const prev = document.getElementById('lightbox-prev');
  const next = document.getElementById('lightbox-next');
  const closeBtn = document.getElementById('lightbox-close');

  const photos = slides.map((slide) => ({
    src: slide.dataset.full || '',
    alt: slide.dataset.alt || '',
    caption: slide.dataset.caption || '',
  }));

  let current = 0;

  const render = () => {
    const photo = photos[current];

    if (img) {
      img.src = photo.src;
      img.alt = photo.alt;
    }
    if (counter) {
      counter.textContent = `Shot ${String(current + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`;
    }
    if (title) title.textContent = photo.caption;
    if (desc) desc.textContent = photo.caption;

    if (thumbs) {
      thumbs.innerHTML = '';

      photos.forEach((_, i) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('aria-label', `Go to photo ${i + 1}`);
        button.textContent = String(i + 1).padStart(2, '0');
        button.className = i === current
          ? 'rounded border border-glow bg-glow px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-black transition-colors'
          : 'rounded border border-line bg-[#181818] px-2 py-1 font-mono text-[10px] tracking-wider text-muted transition-colors hover:bg-[#252525] hover:text-ink';
        button.addEventListener('click', () => {
          current = i;
          render();
        });
        thumbs.appendChild(button);
      });
    }
  };

  const open = (index) => {
    current = index >= 0 && index < photos.length ? index : 0;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    render();
  };

  const close = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  slides.forEach((slide, i) => {
    slide.addEventListener('click', () => open(i));
  });

  carousel.querySelectorAll('[data-carousel-dot]').forEach((dot) => {
    dot.addEventListener('click', () => open(Number(dot.dataset.index)));
  });

  if (prev) {
    prev.addEventListener('click', () => {
      current = (current - 1 + photos.length) % photos.length;
      render();
    });
  }

  if (next) {
    next.addEventListener('click', () => {
      current = (current + 1) % photos.length;
      render();
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', close);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) close();
  });

  document.addEventListener('keydown', (event) => {
    if (modal.classList.contains('hidden')) return;

    if (event.key === 'Escape') {
      close();
    } else if (event.key === 'ArrowLeft') {
      current = (current - 1 + photos.length) % photos.length;
      render();
    } else if (event.key === 'ArrowRight') {
      current = (current + 1) % photos.length;
      render();
    }
  });
})();
