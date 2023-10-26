const listRestaurant = {
  loadMainContent(restaurants) {
    const main = document.querySelector('main');
    main.innerHTML = '';

    const restaurantGrid = this.createRestaurantGrid();
    restaurantGrid.append(...restaurants.map((restaurant, index) => {
      const restaurantCard = this.createRestaurantCard(restaurant);
      this.addEventListenersToCard(restaurantCard, restaurant, index);
      return restaurantCard;
    }));

    main.appendChild(restaurantGrid);
  },

  createRestaurantGrid() {
    const restaurantGrid = document.createElement('div');
    restaurantGrid.className = 'restaurant-grid';
    return restaurantGrid;
  },

  createRestaurantCard(restaurant) {
    const restaurantCard = document.createElement('article');
    restaurantCard.className = 'restaurant-card';
    restaurantCard.tabIndex = 0;

    const ratingIcon = '<i class="fas fa-star star-icon"></i>';
    const cityIcon = '<i class="fas fa-building"></i>';

    // Menambahkan URL gambar sesuai resolusi
    const { smallPictureUrl } = restaurant;
    const { mediumPictureUrl } = restaurant;
    const { largePictureUrl } = restaurant;

    restaurantCard.innerHTML = `
      <img src="${smallPictureUrl}" alt="${restaurant.name}" srcset="${smallPictureUrl} 300w, ${mediumPictureUrl} 600w, ${largePictureUrl} 800w">
      <h2>${restaurant.name}</h2>
      <p>${cityIcon} Kota ${restaurant.city}</p>
      <p>${ratingIcon} ${restaurant.rating}</p>
      <button class="detail-button">Detail</button>
    `;

    return restaurantCard;
  },

  addEventListenersToCard(restaurantCard, restaurant, index) {
    const detailButton = restaurantCard.querySelector('.detail-button');
    detailButton.addEventListener('click', () => {
      this.openModal(restaurant);
    });

    restaurantCard.addEventListener('keydown', (event) => {
      this.handleCardKeyDown(event, restaurant, index);
    });
  },

  handleCardKeyDown(event, restaurant, index) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.openModal(restaurant);
    } else if (event.key === 'ArrowRight' && index < restaurant.length - 1) {
      restaurant[index + 1].focus();
    } else if (event.key === 'ArrowLeft' && index > 0) {
      restaurant[index - 1].focus();
    }
  },

  openModal(restaurant) {
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
    document.body.appendChild(modal);

    const closeModalButton = modalContent.querySelector('.close-modal-button');
    closeModalButton.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
  },
};

export default listRestaurant;
