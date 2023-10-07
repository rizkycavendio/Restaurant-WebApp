export function loadMainContent(restaurants) {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const restaurantGrid = document.createElement('div');
  restaurantGrid.className = 'restaurant-grid';

  restaurants.forEach((restaurant, index) => {
    const restaurantCard = document.createElement('article');
    restaurantCard.className = 'restaurant-card';
    restaurantCard.tabIndex = 0;

    const ratingIcon = '<i class="fas fa-star star-icon"></i>';
    const cityIcon = '<i class="fas fa-building"></i>';

    restaurantCard.innerHTML = `
      <img src="${restaurant.pictureId}" alt="${restaurant.name}">
      <h2>${restaurant.name}</h2>
      <p>${cityIcon} Kota ${restaurant.city}</p>
      <p>${ratingIcon} ${restaurant.rating}</p>
      <button class="detail-button">Detail</button>
    `;

    restaurantCard.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        window.location.href = `/restaurant/${restaurant.id}`;
      } else if (event.key === 'ArrowRight' && index < restaurants.length - 1) {
        restaurants[index + 1].focus();
      } else if (event.key === 'ArrowLeft' && index > 0) {
        restaurants[index - 1].focus();
      }
    });

    const detailButton = restaurantCard.querySelector('.detail-button');
    detailButton.addEventListener('click', () => {
      // Buat modal
      const modal = document.createElement('div');
      modal.className = 'modal';

      const modalContent = document.createElement('div');
      modalContent.className = 'modal-content';

      modalContent.innerHTML = `
        <h3>${restaurant.name}</h3>
        <p>${restaurant.description}</p>
        <button class="close-modal-button">Tutup</button>
      `;

      modal.appendChild(modalContent);
      main.appendChild(modal);

      // Atur event listener untuk tombol "Tutup" modal
      const closeModalButton = modalContent.querySelector('.close-modal-button');
      closeModalButton.addEventListener('click', () => {
        main.removeChild(modal);
      });
    });

    restaurantGrid.appendChild(restaurantCard);
  });

  main.appendChild(restaurantGrid);
}
