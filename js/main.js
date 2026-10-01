/* SCROLL REVEAL */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
reveals.forEach(el => observer.observe(el));

/* BACK TO TOP */
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) backTop.classList.add('visible');
  else backTop.classList.remove('visible');
});

/* PARALLAX */
const patterns = document.querySelectorAll('.ascii-pattern');
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5);
  const y = (e.clientY / window.innerHeight - 0.5);
  patterns.forEach(p => {
    const speed = parseFloat(p.dataset.speed) || 0.02;
    p.style.transform = `translate(${x * 40 * speed * 50}px, ${y * 40 * speed * 50}px)`;
  });
});

/* GALLERY */
const images = [
  { src: 'photos/R1.png', title: 'Identity Project', tags: 'branding · 2025' },
  { src: 'photos/R2.png', title: 'Visual Concept', tags: 'concept · 2025' },
  { src: 'photos/R3.png', title: 'Digital & Web', tags: 'ui / ux · 2026' },
  { src: 'photos/R4.png', title: '3D & Motion', tags: '3d · motion · 2026' },
  { src: 'photos/R5.png', title: 'Print & Layout', tags: 'print · layout · 2026' }
];

let current = 0;
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCounter = document.getElementById('lbCounter');
const lbCaption = document.getElementById('lbCaption');
const lbTags = document.getElementById('lbTags');

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    current = Number(card.dataset.index);
    openLightbox();
  });
});

function openLightbox() {
  updateImage();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}
function changeSlide(dir) {
  current = (current + dir + images.length) % images.length;
  lbImg.classList.add('fade');
  setTimeout(() => {
    updateImage();
    lbImg.classList.remove('fade');
  }, 180);
}
function updateImage() {
  const item = images[current];
  lbImg.src = item.src;
  lbCounter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`;
  lbCaption.textContent = item.title;
  lbTags.textContent = item.tags;
}

document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbPrev').addEventListener('click', () => changeSlide(-1));
document.getElementById('lbNext').addEventListener('click', () => changeSlide(1));
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') changeSlide(-1);
  if (e.key === 'ArrowRight') changeSlide(1);
});

document.querySelectorAll('.card-image-wrapper img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.display = 'none';
    img.parentElement.style.background = '#e7e7e4';
  });
});