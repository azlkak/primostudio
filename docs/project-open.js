(() => {
  const opener = document.querySelector('[data-open-project="majdan"]');
  const portfolio = document.getElementById('portfolio-view');
  if (!opener || !portfolio) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let view = null;
  let frame = null;
  let opening = false;
  let savedScroll = 0;
  let ownsHistoryEntry = false;
  let animation;

  function restorePortfolio() {
    if (!view) return;
    view.remove();
    view = null;
    frame = null;
    portfolio.inert = false;
    document.body.classList.remove('project-is-open');
    document.title = 'Nasze projekty — Primo Studio';
    window.scrollTo(0, savedScroll);
    opener.focus({preventScroll:true});
  }
  function closeProject() {
    if (!view || opening) return;
    if (ownsHistoryEntry && location.hash === '#majdan') {
      history.back();
    } else {
      if (location.hash === '#majdan') history.replaceState(null, '', location.pathname + location.search);
      restorePortfolio();
    }
  }
  async function openProject({animate = true, keyboard = false} = {}) {
    if (view || opening) return;
    opening = true;
    savedScroll = window.scrollY;
    const picture = opener.querySelector('.case-picture');
    const sourceImage = picture.querySelector('img');
    const rect = picture.getBoundingClientRect();
    view = document.createElement('div');
    view.className = 'project-frame-wrap';
    view.setAttribute('role', 'dialog');
    view.setAttribute('aria-modal', 'true');
    view.setAttribute('aria-label', 'Projekt Majdan');
    frame = document.createElement('iframe');
    frame.title = 'Majdan — historia wnętrza';
    frame.className = 'project-frame';
    const loaded = new Promise(resolve => {
      const timeout = setTimeout(() => resolve(false), 12000);
      frame.addEventListener('load', async () => {
        const projectDocument = frame?.contentDocument;
        const hero = projectDocument?.querySelector('[data-photo="0"]');
        if (!projectDocument?.querySelector('.project-story') || !hero) {
          clearTimeout(timeout);
          resolve(false);
          return;
        }
        // Prepare the real scene while the enlarged photograph still covers it.
        projectDocument.documentElement.classList.toggle('project-entering', animate && !reduced.matches);
        projectDocument.documentElement.style.overflow = 'hidden';
        await Promise.all([
          projectDocument.fonts?.ready,
          hero.decode ? hero.decode().catch(() => {}) : Promise.resolve()
        ]);
        clearTimeout(timeout);
        resolve(hero.complete && hero.naturalWidth > 0);
      }, {once:true});
      frame.addEventListener('error', () => { clearTimeout(timeout); resolve(false); }, {once:true});
    });
    frame.src = new URL('majdan.html?v=majdan-10', location.href).href;
    view.append(frame);
    document.body.append(view);
    document.body.classList.add('project-is-open');
    portfolio.inert = true;
    const clone = document.createElement('div');
    clone.className = 'project-opening-image';
    clone.setAttribute('aria-hidden', 'true');
    const image = new Image();
    image.src = sourceImage.currentSrc || sourceImage.src;
    image.alt = '';
    if (image.decode) await image.decode().catch(() => {});
    clone.append(image);
    Object.assign(clone.style, {left:`${rect.left}px`,top:`${rect.top}px`,width:`${rect.width}px`,height:`${rect.height}px`});
    document.body.append(clone);
    try {
      if (animate && !reduced.matches) {
        animation = clone.animate([
          {left:`${rect.left}px`,top:`${rect.top}px`,width:`${rect.width}px`,height:`${rect.height}px`},
          {left:'0px',top:'0px',width:`${innerWidth}px`,height:`${innerHeight}px`}
        ],{duration:1050,easing:'cubic-bezier(.19,1,.22,1)',fill:'forwards'});
        await animation.finished;
      } else {
        Object.assign(clone.style, {inset:'0px',width:'100%',height:'100%'});
      }
      if (!await loaded) {
        location.href = opener.href;
        return;
      }
      frame.contentWindow.scrollTo(0, 0);
      view.classList.add('is-ready');
      // Paint the decoded scene at full opacity before handing over the image.
      // Keeping the clone until its fade finishes avoids exposing the portfolio.
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      frame.contentDocument.documentElement.classList.remove('project-entering');
      if (animate && !reduced.matches) {
        animation = clone.animate([{opacity:1},{opacity:0}], {
          duration:300, easing:'ease-out', fill:'forwards'
        });
        await animation.finished;
      }
      frame.contentDocument.documentElement.style.overflow = '';
      ownsHistoryEntry = location.hash !== '#majdan';
      if (ownsHistoryEntry) history.pushState({primoProject:'majdan'}, '', '#majdan');
      document.title = 'Majdan — historia wnętrza | Primo Studio';
      frame.contentWindow.focus();
      if (keyboard) frame.contentDocument.getElementById('close-project')?.focus({preventScroll:true});
    } catch (_) {
      location.href = opener.href;
    } finally {
      clone.remove();
      opening = false;
    }
  }
  opener.addEventListener('click', event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openProject({keyboard:event.detail === 0});
  });
  window.addEventListener('message', event => {
    if (event.origin === location.origin && event.source === frame?.contentWindow && event.data?.type === 'primo-project-close') closeProject();
  });
  window.addEventListener('popstate', () => {
    if (location.hash !== '#majdan') restorePortfolio();
    else if (!view) openProject({animate:false});
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && view && !opening) closeProject(); });
  reduced.addEventListener('change', () => { if (reduced.matches && opening) animation?.finish(); });
  if (location.hash === '#majdan') openProject({animate:false});
})();
