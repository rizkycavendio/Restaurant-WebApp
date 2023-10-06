import 'regenerator-runtime';
import '../styles/main.css';
import { prevSlide, nextSlide } from './front-end/jumbotron.js';
import { toggleMobileMenu } from './front-end/nav-mobile.js';
import { loadMainContent } from './front-end/list-restaurant.js';

//jumbotron slider
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
prevButton.onclick = prevSlide;
nextButton.onclick = nextSlide;

//hamburger button
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
mobileMenuToggle.onclick = toggleMobileMenu;

// Memuat data restoran dari file JSON
fetch('./data/DATA.json')
  .then((response) => response.json())
  .then((data) => {
    loadMainContent(data.restaurants);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
