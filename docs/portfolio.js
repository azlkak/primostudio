(() => {
  const gallery = document.querySelector('[data-gallery]');
  if (!gallery) return;
  const scene = gallery.querySelector('.gallery-scene');
  const items = [...gallery.querySelectorAll('.stack-item')];
  const cards = [...gallery.querySelectorAll('[data-project]')];
  const indexes = [...gallery.querySelectorAll('[data-gallery-index]')];
  const title = gallery.querySelector('[data-gallery-title]');
  const position = gallery.querySelector('[data-gallery-position]');
  const description = gallery.querySelector('[data-gallery-description]');
  const status = gallery.querySelector('[data-gallery-status]');
  const hint = gallery.querySelector('[data-gallery-hint]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 700px)');
  const hover = window.matchMedia('(hover: hover)');
  let active = -1;
  let pinned = false;
  let wheelSum = 0;
  let wheelDirection = 0;
  let lastWheel = 0;
  let touchStart = null;
  let hoverUntil = 0;

  function render(announce = false) {
    gallery.classList.toggle('gallery-enhanced', !reducedMotion.matches);
    const compact = mobile.matches;
    const step = compact ? 88 : 124;
    const selectedGap = compact ? 155 : 250;
    items.forEach((item, index) => {
      const distance = index - active;
      const selected = index === active;
      const y = active < 0 ? (index - (items.length - 1) / 2) * step : selected ? 0 : Math.sign(distance) * (selectedGap + (Math.abs(distance) - 1) * step * .72);
      item.style.setProperty('--case-y', `${y}px`);
      item.style.setProperty('--case-z', `${selected ? 200 : -Math.abs(active < 0 ? index - 1.5 : distance) * 40}px`);
      item.style.setProperty('--case-angle', selected ? '0deg' : compact ? '-54deg' : '-62deg');
      item.style.setProperty('--case-scale', selected ? compact ? '.83' : '.88' : String(Math.max(.76, .96 - Math.abs(active < 0 ? index - 1.5 : distance) * .04)));
      item.style.setProperty('--case-order', selected ? '20' : String(index + 1));
      cards[index].setAttribute('aria-pressed', String(selected));
      indexes[index].setAttribute('aria-pressed', String(selected));
    });
    position.textContent = active < 0 ? 'Przegląd realizacji' : `Kadr ${String(active + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    title.textContent = active < 0 ? 'Wybierz swój kadr' : 'Nazwa projektu';
    description.textContent = active < 0 ? reducedMotion.matches ? 'Wybierz kadr z galerii.' : compact ? 'Dotknij karty lub wybierz numer poniżej.' : 'Najedź na kartę lub wybierz ją, aby przyjrzeć się projektowi.' : 'Typ wnętrza · Lokalizacja';
    hint.textContent = reducedMotion.matches ? 'Wybierz kadr' : compact ? 'Przesuń w bok lub wybierz kadr ↔' : 'Przewijaj lub wybierz kadr ↓';
    if (announce) status.textContent = active < 0 ? 'Przegląd wszystkich kadrów.' : `Wybrano miejsce na realizację ${active + 1} z ${cards.length}.`;
  }

  function select(index, pin = true, announce = true) {
    active = Math.max(-1, Math.min(index, cards.length - 1));
    pinned = pin && active >= 0;
    render(announce);
  }

  function move(direction) {
    const next = active < 0 ? direction > 0 ? 0 : cards.length - 1 : Math.max(0, Math.min(cards.length - 1, active + direction));
    select(next);
  }

  cards.forEach((card, index) => {
    card.addEventListener('pointerenter', event => {
      if (hover.matches && event.pointerType !== 'touch' && !pinned && !reducedMotion.matches && performance.now() >= hoverUntil) {
        hoverUntil = performance.now() + 750;
        select(index, false, false);
      }
    });
    card.addEventListener('focus', () => select(index, false));
    card.addEventListener('click', () => select(active === index && pinned ? -1 : index));
  });
  scene.addEventListener('pointerleave', () => {
    if (!pinned && !scene.contains(document.activeElement)) select(-1, false, false);
  });
  indexes.forEach((button, index) => button.addEventListener('click', () => select(index)));
  gallery.querySelector('[data-gallery-prev]').addEventListener('click', () => move(-1));
  gallery.querySelector('[data-gallery-next]').addEventListener('click', () => move(1));
  gallery.querySelector('[data-gallery-reset]').addEventListener('click', () => select(-1, false));
  gallery.addEventListener('keydown', event => {
    const direction = ['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : ['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1 : 0;
    if (direction) { event.preventDefault(); move(direction); }
    if (event.key === 'Home') { event.preventDefault(); select(0); }
    if (event.key === 'End') { event.preventDefault(); select(cards.length - 1); }
    if (event.key === 'Escape') { event.preventDefault(); select(-1, false); }
  });

  // Consume wheel input only while a desktop visitor is moving through frames.
  // At either end the event remains native so the rest of the page stays reachable.
  scene.addEventListener('wheel', event => {
    if (reducedMotion.matches || !hover.matches || event.ctrlKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    const direction = Math.sign(event.deltaY);
    if (!direction || (active === 0 && direction < 0) || (active === cards.length - 1 && direction > 0)) return;
    event.preventDefault();
    const now = performance.now();
    if (now - lastWheel < 650) return;
    if (direction !== wheelDirection) wheelSum = 0;
    wheelDirection = direction;
    const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaMode === 2 ? event.deltaY * scene.clientHeight : event.deltaY;
    wheelSum += delta;
    if (Math.abs(wheelSum) < 65) return;
    wheelSum = 0;
    lastWheel = now;
    move(direction);
  }, { passive: false });

  scene.addEventListener('touchstart', event => {
    const touch = event.touches[0];
    touchStart = touch ? { x: touch.clientX, y: touch.clientY } : null;
  }, { passive: true });
  scene.addEventListener('touchend', event => {
    const touch = event.changedTouches[0];
    if (!touch || !touchStart || reducedMotion.matches) return;
    const dx = touch.clientX - touchStart.x;
    const dy = touch.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) move(dx < 0 ? 1 : -1);
  }, { passive: true });
  scene.addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });
  reducedMotion.addEventListener('change', () => render());
  mobile.addEventListener('change', () => render());
  gallery.classList.add('gallery-ready');
  render();
})();
