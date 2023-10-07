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

// Tambahkan dukungan untuk navigasi keyboard
document.addEventListener('keydown', function (event) {
    if (event.keyCode === 37) {
        // Tombol panah kiri ditekan, panggil fungsi prevSlide
        prevSlide();
    } else if (event.keyCode === 39) {
        // Tombol panah kanan ditekan, panggil fungsi nextSlide
        nextSlide();
    }
});

export { prevSlide, nextSlide };
