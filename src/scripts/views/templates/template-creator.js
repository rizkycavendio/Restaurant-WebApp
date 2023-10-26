import page from 'page';

export function createRestaurantGrid() {
  const restaurantGrid = document.createElement('div');
  restaurantGrid.className = 'restaurant-grid';
  return restaurantGrid;
}

export function createRestaurantCard(restaurant) {
  const restaurantGrid = document.createElement('div');
  restaurantGrid.className = 'restaurant-grid';
  const restaurantCard = document.createElement('article');
  restaurantCard.className = 'restaurant-card';
  restaurantCard.tabIndex = 0;

  const ratingIcon = '<i class="fas fa-star star-icon"></i>';
  const cityIcon = '<i class="fas fa-building"></i>';

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

  const detailButton = restaurantCard.querySelector('.detail-button');
  detailButton.addEventListener('click', () => {
    // Buat URL detail sesuai dengan id restoran
    const detailUrl = `/detail/${restaurant.id}`;

    page(detailUrl);
  });

  return restaurantCard;
}

export function createDetailRestaurant(restaurant) {
  const detailRestaurant = document.createElement('div');
  detailRestaurant.className = 'restaurant-detail';

  detailRestaurant.innerHTML = `
      <h2>${restaurant.name}</h2>
      <p>Address: ${restaurant.address}</p>
      <p>Phone: ${restaurant.description}</p>
      <p>Hours: ${restaurant.city}</p>
      <p>Category: ${restaurant.categories.map((category) => category.name).join(', ')}</p>
      <button class="close-detail-button">Close</button>
    `;

  return detailRestaurant;
}
