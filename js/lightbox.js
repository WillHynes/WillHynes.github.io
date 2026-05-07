/**
 * Custom Lightbox for Will Hynes Portfolio
 */

const Lightbox = (() => {
  let overlay, content, closeBtn, prevBtn, nextBtn;
  let items = [];
  let currentIndex = 0;

  function init() {
    if (overlay) return; // Prevent double init

    overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
      <div class="lightbox-close">&times;</div>
      <button class="lightbox-prev" aria-label="Previous">&larr;</button>
      <div class="lightbox-content"></div>
      <button class="lightbox-next" aria-label="Next">&rarr;</button>
      <div class="lightbox-caption"></div>
    `;

    document.body.appendChild(overlay);

    content = overlay.querySelector('.lightbox-content');
    closeBtn = overlay.querySelector('.lightbox-close');
    prevBtn = overlay.querySelector('.lightbox-prev');
    nextBtn = overlay.querySelector('.lightbox-next');

    closeBtn.onclick = hide;
    overlay.onclick = (e) => { if (e.target === overlay) hide(); };
    prevBtn.onclick = (e) => { e.stopPropagation(); prev(); };
    nextBtn.onclick = (e) => { e.stopPropagation(); next(); };

    document.addEventListener('keydown', (e) => {
      if (!overlay.classList.contains('active')) return;
      if (e.key === 'Escape') hide();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    });

    // Add CSS for lightbox
    const style = document.createElement('style');
    style.textContent = `
      .lightbox-overlay {
        position: fixed; inset: 0; background: rgba(0,0,0,0.95);
        z-index: 2000; display: none; align-items: center; justify-content: center;
        opacity: 0; transition: opacity 0.3s ease; backdrop-filter: blur(10px);
      }
      .lightbox-overlay.active { display: flex; opacity: 1; }
      .lightbox-content { 
        max-width: 90vw; max-height: 85vh; position: relative; 
        display: flex; align-items: center; justify-content: center;
      }
      .lightbox-content img { 
        max-width: 100%; max-height: 85vh; display: block; 
        object-fit: contain; border-radius: 2px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.5);
      }
      .lightbox-close { 
        position: absolute; top: 30px; right: 30px; font-size: 40px; 
        color: #fff; cursor: pointer; opacity: 0.5; transition: opacity 0.2s; 
        z-index: 2001; line-height: 1;
      }
      .lightbox-close:hover { opacity: 1; }
      .lightbox-prev, .lightbox-next {
        position: absolute; top: 50%; transform: translateY(-50%);
        background: transparent; border: none; color: #fff; font-size: 40px;
        padding: 30px; cursor: pointer; opacity: 0.2; transition: opacity 0.2s, transform 0.2s;
        z-index: 2002;
      }
      .lightbox-prev:hover, .lightbox-next:hover { opacity: 0.8; }
      .lightbox-prev:active { transform: translateY(-50%) translateX(-5px); }
      .lightbox-next:active { transform: translateY(-50%) translateX(5px); }
      .lightbox-prev { left: 10px; }
      .lightbox-next { right: 10px; }
      .lightbox-caption { 
        position: absolute; bottom: 30px; color: #888; font-size: 13px; 
        letter-spacing: 0.1em; text-align: center; width: 100%; 
        text-transform: uppercase; font-family: 'DM Sans', sans-serif;
      }
      
      @media (max-width: 700px) {
        .lightbox-prev, .lightbox-next { display: none; }
        .lightbox-close { top: 20px; right: 20px; }
      }
    `;
    document.head.appendChild(style);
  }

  function show(index, group = []) {
    init();
    items = group;
    currentIndex = index;
    update();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function hide() {
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { if (content) content.innerHTML = ''; }, 300);
  }

  function update() {
    const item = items[currentIndex];
    content.innerHTML = `<img src="${item.src}" alt="${item.title || ''}">`;
    overlay.querySelector('.lightbox-caption').textContent = item.title || '';
    prevBtn.style.display = items.length > 1 ? 'block' : 'none';
    nextBtn.style.display = items.length > 1 ? 'block' : 'none';
  }

  function next() {
    if (items.length <= 1) return;
    currentIndex = (currentIndex + 1) % items.length;
    update();
  }

  function prev() {
    if (items.length <= 1) return;
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    update();
  }

  return { show, hide };
})();

window.Lightbox = Lightbox;
