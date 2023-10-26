let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(slideIndex) {
  slides[currentSlide].classList.remove('active');
  currentSlide = (slideIndex + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 37) {
    prevSlide();
  } else if (event.keyCode === 39) {
    nextSlide();
  }
});

export { prevSlide, nextSlide };
