const images = [
  "./index-img/bg4.jpg",  // ✅ static image first
  "./index-img/bg3.jpg",
  "./index-img/bg2.jpg",
  "./index-img/bg1.jpg",
  "./index-img/bg5.jpg"
];

const taglines = [
  "Welcome to our studio!",  // static image tagline
  "Telling stories through the lens.",
  "Exploring new perspectives...",
  "Capturing moments that matter.",
  "Where creativity meets light."
];

const container = document.querySelector('.main-contentSlides');
const taglineElement = document.getElementById('tagline');

// Inject images
images.forEach((src, index) => {
  const img = document.createElement('img');
  img.src = src;
  if (index === 0) img.classList.add('active'); // only first is visible initially
  container.appendChild(img);
});

let current = 0;
const slides = document.querySelectorAll('.main-contentSlides img');

function updateSlide() {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');

  taglineElement.classList.remove('show');
  setTimeout(() => {
    taglineElement.textContent = taglines[current];
    taglineElement.classList.add('show');
  }, 300);

  const delay = current === 0 ? 7000 : 5000;
  setTimeout(updateSlide, delay);
}

// Show first tagline
taglineElement.textContent = taglines[0];
taglineElement.classList.add('show');

// ⏱ Start slideshow after 2 seconds
setTimeout(updateSlide, 2000);

// Gallery logic
// Lightbox logic
const lightbox = document.createElement('div');
lightbox.classList.add('lightbox');
lightbox.innerHTML = `<span class="lightbox-close">&times;</span><div class="lightbox-content"></div>`;
document.body.appendChild(lightbox);

const lightboxContent = lightbox.querySelector('.lightbox-content');
const closeBtn = lightbox.querySelector('.lightbox-close');

document.querySelectorAll('.masonry-grid img, .masonry-grid video').forEach(el => {
  el.addEventListener('click', () => {
    lightboxContent.innerHTML = '';
    const clone = el.cloneNode(true);
    if (clone.tagName === 'VIDEO') clone.setAttribute('controls', true);
    lightboxContent.appendChild(clone);
    lightbox.classList.add('show');
  });
});

closeBtn.onclick = () => lightbox.classList.remove('show');
lightbox.onclick = (e) => {
  if (e.target === lightbox) lightbox.classList.remove('show');
};


