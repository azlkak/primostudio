(() => {
  const chapters = document.getElementById('chapters');
  const photos = [...document.querySelectorAll('[data-photo]')];
  const captions = [...document.querySelectorAll('[data-caption]')];
  const chapterButtons = [...document.querySelectorAll('[data-goto]')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const counter = document.getElementById('chapter-counter');
  const hint = document.getElementById('scroll-hint');
  let activeChapter = 0;
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
      const reveal = i === 0 ? 1 : reduced.matches ? Number(s >= i) : smooth((s - i + .35) / .35);
      const local = clamp(s - i, 0, 1);
      photo.style.clipPath = `inset(${(1 - reveal) * 100}% 0 0 0)`;
      photo.style.transform = reduced.matches ? 'none' : `scale(${1 + local * .025})`;
    });
    captions.forEach((caption, i) => {
      const incoming = i === 0 ? 1 : smooth((s - i + .24) / .24);
      const outgoing = i === 3 ? 1 : 1 - smooth((s - i - .65) / .25);
      const visibility = reduced.matches ? Number(i === next) : incoming * outgoing;
      caption.style.opacity = visibility;
      caption.style.transform = reduced.matches ? 'none' : `translateY(${(1 - incoming) * 32 - (1 - outgoing) * 22}px)`;
      caption.setAttribute('aria-hidden', String(next !== i));
    });
    if (activeChapter !== next || !counter.dataset.ready) {
      activeChapter = next;
      counter.dataset.ready = 'true';
      counter.textContent = `0${next + 1} — 04`;
      hint.innerHTML = next === 3 ? 'ZOBACZ, JAK POWSTAŁO WNĘTRZE <span aria-hidden="true">↓</span>' : 'PRZEWIŃ, ABY WEJŚĆ DALEJ <span aria-hidden="true">↓</span>';
      chapterButtons.forEach((b, i) => { if (i === next) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); });
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
  chapterButtons.forEach(button=>button.addEventListener('click',()=>{
    const top=chapters.getBoundingClientRect().top+scrollY+Number(button.dataset.goto)*innerHeight;
    window.scrollTo({top,behavior:reduced.matches?'auto':'smooth'});
  }));
  document.querySelector('.stage-bottom a').addEventListener('click',event=>{
    event.preventDefault();
    document.getElementById('making').scrollIntoView({behavior:reduced.matches?'auto':'smooth'});
  });
  reduced.addEventListener('change',schedule);
  updateChapters();
  // Every description remains in the document. Native scrolling chooses the image.
  const processSteps = [...document.querySelectorAll('[data-process-step]')];
  const processImage = document.getElementById('step-image');
  const processFrame = processImage.parentElement;
  const processCaption = document.getElementById('step-caption');
  const processRoot = document.querySelector('.process-layout');
  let processActive = -1;
  let processFrameRequest = 0;
  let processImageTimer;
  let processGeneration = 0;
  function activateProcess(index) {
    if (index === processActive) return;
    processActive = index;
    const step = processSteps[index];
    processSteps.forEach((article, i) => {
      article.classList.toggle('is-active', i === index);
      if (i === index) article.setAttribute('aria-current', 'step');
      else article.removeAttribute('aria-current');
    });
    processCaption.textContent = step.dataset.processCaption;
    const generation = ++processGeneration;
    clearTimeout(processImageTimer);
    const apply = () => {
      if (generation !== processGeneration) return;
      processFrame.classList.toggle('is-plan', step.dataset.processKind === 'plan');
      processFrame.classList.toggle('is-drawing', step.dataset.processKind === 'drawing');
      processImage.src = step.dataset.processImage;
      processImage.alt = step.dataset.processAlt;
      processImage.style.opacity = '1';
      processImage.style.transform = 'none';
    };
    if (reduced.matches || index === 0 && processImage.getAttribute('src') === step.dataset.processImage) apply();
    else {
      processImage.style.opacity = '0';
      processImage.style.transform = 'translateY(12px)';
      processImageTimer = setTimeout(apply, 160);
    }
  }
  function updateProcess() {
    processFrameRequest = 0;
    if (document.querySelector('.project-story')?.hidden) return;
    const bounds = processRoot.getBoundingClientRect();
    if (bounds.top > innerHeight || bounds.bottom < 0) return;
    const target = innerHeight * (innerWidth <= 600 ? .7 : .49);
    let selected = 0;
    let nearest = Infinity;
    processSteps.forEach((step, index) => {
      const rect = step.getBoundingClientRect();
      const distance = Math.abs(rect.top + rect.height / 2 - target);
      if (distance < nearest) { nearest = distance; selected = index; }
    });
    activateProcess(selected);
  }
  function scheduleProcess() { if (!processFrameRequest) processFrameRequest = requestAnimationFrame(updateProcess); }
  window.addEventListener('scroll', scheduleProcess, {passive:true});
  window.addEventListener('resize', scheduleProcess, {passive:true});
  activateProcess(0);
  const warmProcess = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    processSteps.forEach(step => { const img = new Image(); img.src = step.dataset.processImage; });
    warmProcess.disconnect();
  }, {rootMargin:'100% 0px'});
  warmProcess.observe(processRoot);

})();
