(() => {
  const chapters = document.getElementById('chapters');
  const photos = [...document.querySelectorAll('[data-photo]')];
  const captions = [...document.querySelectorAll('[data-caption]')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const hint = document.getElementById('scroll-hint');
  let activeChapter = -1;
  let isOpen = true;
  let frame = 0;
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const smooth = v => { const t = clamp(v); return t * t * (3 - 2 * t); };

  function updateChapters() {
    frame = 0;
    if (!isOpen) return;
    const h = window.innerHeight;
    const distance = -chapters.getBoundingClientRect().top / h;
    const s = clamp(distance, 0, 4);
    const next = clamp(Math.floor(s + (reduced.matches ? 0 : .15)), 0, 3);
    photos.forEach((photo, i) => {
      const reveal = i === 0 ? 1 : reduced.matches ? Number(s >= i) : clamp((s - i + .85) / .85);
      photo.style.clipPath = `inset(${(1 - reveal) * 100}% 0 0 0)`;
      photo.style.transform = 'none';
    });
    captions.forEach((caption, i) => {
      const incoming = i === 0 ? 1 : smooth((s - i + .24) / .24);
      const outgoing = i === 3 ? 1 : 1 - smooth((s - i - .65) / .25);
      const visibility = reduced.matches ? Number(i === next) : incoming * outgoing;
      caption.style.opacity = visibility;
      caption.style.transform = reduced.matches ? 'none' : `translateY(${(1 - incoming) * 32 - (1 - outgoing) * 22}px)`;
      caption.setAttribute('aria-hidden', String(next !== i));
    });
    if (activeChapter !== next) {
      activeChapter = next;
      hint.innerHTML = next === 3 ? 'PRZYJRZYJ SIĘ DETALOM <span aria-hidden="true">↓</span>' : 'PRZEWIŃ, ABY WEJŚĆ DALEJ <span aria-hidden="true">↓</span>';
    }
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(updateChapters); }

  function returnToPortfolio(event) {
    if (window.parent !== window) {
      event.preventDefault();
      window.parent.postMessage({type:'primo-project-close'}, location.origin);
    }
  }
  document.getElementById('close-project').addEventListener('click', returnToPortfolio);
  document.getElementById('footer-back').addEventListener('click', returnToPortfolio);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !document.getElementById('contact-dialog').open) {
      event.preventDefault();
      document.getElementById('close-project').click();
    }
  });
  window.addEventListener('scroll', schedule, {passive:true});
  window.addEventListener('resize', schedule, {passive:true});
  document.querySelector('.stage-bottom a').addEventListener('click',event=>{
    event.preventDefault();
    document.getElementById('details').scrollIntoView({behavior:reduced.matches?'auto':'smooth'});
  });
  reduced.addEventListener('change',schedule);
  updateChapters();
  // Concept paragraphs stay readable in the document; native scrolling reveals each detail.
  const conceptParts = [...document.querySelectorAll('[data-concept-part]')];
  const detailFrame = document.querySelector('.process-image-frame');
  const detailRoot = document.querySelector('.process-layout');
  let detailActive = -1;
  let detailFrameRequest = 0;
  const detailLayers = conceptParts.map((step, index) => {
    const layer = document.createElement('div');
    layer.className = 'process-photo-layer';
    layer.dataset.conceptPhoto = index;
    layer.style.zIndex = index;
    layer.style.clipPath = index ? 'inset(100% 0 0 0)' : 'inset(0% 0 0 0)';
    layer.setAttribute('aria-hidden', String(index !== 0));
    const image = new Image();
    image.src = step.dataset.conceptImage;
    image.alt = step.dataset.conceptAlt;
    image.decoding = 'async';
    layer.append(image);
    return layer;
  });
  detailFrame.replaceChildren(...detailLayers);
  function activateDetail(index) {
    if (index === detailActive) return;
    detailActive = index;
    conceptParts.forEach((article, i) => {
      article.classList.toggle('is-active', i === index);
      if (i === index) article.setAttribute('aria-current', 'true');
      else article.removeAttribute('aria-current');
      detailLayers[i].setAttribute('aria-hidden', String(i !== index));
    });
  }
  function updateDetails() {
    detailFrameRequest = 0;
    if (document.querySelector('.project-story')?.hidden) return;
    const bounds = detailRoot.getBoundingClientRect();
    if (bounds.top > innerHeight || bounds.bottom < 0) return;
    const target = innerHeight * (innerWidth <= 600 ? .7 : .49);
    let selected = 0;
    let nearest = Infinity;
    const rectangles = conceptParts.map(step => step.getBoundingClientRect());
    rectangles.forEach((rect, index) => {
      const distance = Math.abs(rect.top + rect.height / 2 - target);
      if (distance < nearest) { nearest = distance; selected = index; }
    });
    activateDetail(selected);
    detailLayers.forEach((layer, index) => {
      const previous = rectangles[Math.max(0, index - 1)];
      const current = rectangles[index];
      const boundary = ((previous.top + previous.height / 2) + (current.top + current.height / 2)) / 2;
      const travel = Math.min(innerHeight * .72, current.height * .85);
      const reveal = index === 0 ? 1 : reduced.matches ? Number(selected >= index) : clamp((target - boundary) / travel + .5);
      layer.style.clipPath = `inset(${(1 - reveal) * 100}% 0 0 0)`;
    });
  }
  function scheduleDetails() { if (!detailFrameRequest) detailFrameRequest = requestAnimationFrame(updateDetails); }
  window.addEventListener('scroll', scheduleDetails, {passive:true});
  window.addEventListener('resize', scheduleDetails, {passive:true});
  reduced.addEventListener('change', scheduleDetails);
  activateDetail(0);
  const warmDetails = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    conceptParts.forEach(step => { const img = new Image(); img.src = step.dataset.conceptImage; });
    warmDetails.disconnect();
  }, {rootMargin:'100% 0px'});
  warmDetails.observe(detailRoot);

})();
