import { prevSlide, nextSlide } from '../front-end/jumbotron';
import { toggleMobileMenu } from '../front-end/nav-mobile';

function initializeSliderAndMenu() {
  // Jumbotron
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  prevButton.onclick = prevSlide;
  nextButton.onclick = nextSlide;

  // hamburger button
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  // eslint-disable-next-line no-undef
  mobileMenuToggle.onclick = toggleMobileMenu;
}

export default initializeSliderAndMenu;
