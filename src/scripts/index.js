import 'regenerator-runtime';
import '../styles/main.scss';
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

  // Function untuk memeriksa apakah semua input dan select telah terisi
function isFormValid() {
  const fullNameInput = document.getElementById('fullName').value;
  const addressInput = document.getElementById('address').value;
  const restaurantNameSelect = document.getElementById('restaurantName').value;
  const selectedMenuSelect = document.getElementById('selectedMenu').value;
  const orderDateInput = document.getElementById('orderDate').value;
  const bankTransferSelect = document.getElementById('bankTransfer').value;
  const agreementCheckbox = document.getElementById('agreement').checked;

  // Validasi bahwa semua input dan select telah terisi
  return (
      fullNameInput !== '' &&
      addressInput !== '' &&
      restaurantNameSelect !== '' &&
      selectedMenuSelect !== '' &&
      orderDateInput !== '' &&
      bankTransferSelect !== '' &&
      agreementCheckbox
  );
}

const inputElements = document.querySelectorAll('#fullName, #address, #restaurantName, #selectedMenu, #orderDate, #bankTransfer, #agreement');
inputElements.forEach(function (element) {
  element.addEventListener('input', function () {
      // Cek apakah form valid
      if (isFormValid()) {
          checkoutButton.removeAttribute('disabled');
      } else {
          checkoutButton.setAttribute('disabled', 'disabled');
      }
  });
});

const checkoutButton = document.getElementById('checkoutButton');
checkoutButton.addEventListener('click', function () {
    if (isFormValid()) {
        alert("PESANAN ANDA SEDANG KAMI PROSES, SILAHKAN MENUNGGU. Terimakasih sudah menggunakan jasa Pawon Wong Jowo Apss");
    } else {
        alert("Harap Isi seluruh form pemesanan dengan lengkap");
    }
});

