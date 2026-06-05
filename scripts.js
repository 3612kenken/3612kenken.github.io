const nav = document.getElementById('navsubmenu');
let hideTimer;

function resetTimer() {
    // Show menu
    nav.classList.remove('hidden');

    // Only auto-hide when page is scrolled
    if (window.scrollY > 0) {
        clearTimeout(hideTimer);

        hideTimer = setTimeout(() => {
            nav.classList.add('hidden');
        }, 2000); // 2 seconds
    }
}

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        nav.classList.add('scrolled');
        resetTimer();
    } else {
        nav.classList.remove('scrolled');
        nav.classList.remove('hidden');
        clearTimeout(hideTimer);
    }
});

window.addEventListener('mousemove', resetTimer);
window.addEventListener('mousedown', resetTimer);
window.addEventListener('touchstart', resetTimer);
window.addEventListener('keydown', resetTimer);


// Image list for standard portfolio gallery
const imageList = [
  "images/1.png","images/2.png","images/3.png","images/4.png","images/5.png",
  "images/6.jpg","images/7.jpg","images/8.jpg","images/9.png","images/10.png",
  "images/11.png","images/12.png"
];

// Carousel backgrounds
const carouselImages = [
  "images/carousel/1.jpg",
  "images/carousel/2.jpg",
  "images/carousel/3.jpg",
  "images/carousel/4.jpg",
  "images/carousel/5.png",
  "images/carousel/6.png",
  "images/carousel/7.png",
  "images/carousel/8.png",
  "images/carousel/9.png"
];

// Corrected certificate array matching your exact extensions
const certificateImages = [
  "images/certificates/1.png",
  "images/certificates/2.png",
  "images/certificates/3.png",
  "images/certificates/4.png",
  "images/certificates/5.png",
  "images/certificates/6.png"
];

// CAROUSEL
(function(){
  const carouselRoot = document.getElementById('customCarousel');
  if(!carouselRoot) return;
  const track = carouselRoot.querySelector('.carousel-track');
  const dotsRoot = carouselRoot.querySelector('.carousel-dots');
  const prevBtn = carouselRoot.querySelector('.carousel-btn.prev');
  const nextBtn = carouselRoot.querySelector('.carousel-btn.next');

  const slides = carouselImages;
  let current = 0;

  function build() {
    slides.forEach((src, i) => {
      const slide = document.createElement('div'); slide.className = 'carousel-slide';
      const img = document.createElement('img'); img.src = src; img.alt = src.split('/').pop();
      slide.appendChild(img); track.appendChild(slide);

      const dot = document.createElement('span'); dot.className = 'carousel-dot';
      dot.addEventListener('click', () => goTo(i)); dotsRoot.appendChild(dot);
    });
    update();
  }

  function update(){
    track.style.transform = `translateX(-${current * 100}%)`;
    Array.from(dotsRoot.children).forEach((d, idx) => d.classList.toggle('active', idx === current));
  }
  function prev(){ current = (current - 1 + slides.length) % slides.length; update(); }
  function next(){ current = (current + 1) % slides.length; update(); }
  function goTo(i){ current = i; update(); }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  let autoplay = setInterval(next, 4000);
  carouselRoot.addEventListener('mouseenter', () => clearInterval(autoplay));
  carouselRoot.addEventListener('mouseleave', () => autoplay = setInterval(next, 4000));

  build();
})();

// GALLERY
(function(){
  const grid = document.getElementById('masonryGrid');
  if(!grid) return;
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalClose = document.getElementById('modalClose');

  function prettyName(path){
    return path.split('/').pop().replace(/\.[^.]+$/,'').replace(/[-_]/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
  }

  imageList.forEach(src=>{
    const item = document.createElement('div'); item.className='masonry-item';
    const fig = document.createElement('figure'); fig.className='figure';
    const img = document.createElement('img'); img.src = src; img.alt = prettyName(src); img.className='img-fluid gallery-img';
    const ov = document.createElement('div'); ov.className='overlay';
    const h = document.createElement('h5'); h.textContent = prettyName(src);
    ov.appendChild(h); fig.appendChild(img); fig.appendChild(ov); item.appendChild(fig); grid.appendChild(item);

    fig.addEventListener('click', ()=>{
      modalImage.src = src; modalTitle.textContent = prettyName(src); modalDesc.textContent = "Click or hover to view details. File: "+src.split('/').pop();
      modal.style.display = 'flex'; modal.setAttribute('aria-hidden','false');
    });
  });

  modalClose.addEventListener('click', ()=>{ modal.style.display='none'; modal.setAttribute('aria-hidden','true'); });
  modal.addEventListener('click', (e)=>{ if(e.target===modal) { modal.style.display='none'; modal.setAttribute('aria-hidden','true'); } });
})();

// CERTIFICATES ENGINE (Runs safely now because Bootstrap bundle loaded first)
(function(){
  const grid = document.getElementById('certificateGrid');
  if(!grid) return;
  const modalImage = document.getElementById('modalCertImage');
  const bsModal = new bootstrap.Modal(document.getElementById('certificateModal'));

  certificateImages.forEach((imgSrc) => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4'; 
    
    col.innerHTML = `
      <div class="cert-image-tile shadow-sm">
        <img src="${imgSrc}" alt="Certificate Preview" loading="lazy">
      </div>
    `;
    grid.appendChild(col);

    col.querySelector('.cert-image-tile').addEventListener('click', () => {
      modalImage.src = imgSrc;
      bsModal.show();
    });
  });
})();