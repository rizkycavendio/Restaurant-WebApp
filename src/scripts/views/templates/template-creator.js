import page from 'page';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-db';

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

  const ratingIcon = '<i class="fa fa-star star-icon"></i>';
  const cityIcon = '<i class="fa fa-building"></i></i>';

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

  const imageUrl = `https://restaurant-api.dicoding.dev/images/large/${restaurant.pictureId}`;
  const addressIcon = '<i class="fa fa-map-marker"></i>';
  const descriptionIcon = '<i class="fa fa-align-left"></i>';
  const cityIcon = '<i class="fa fa-building"></i>';
  const categoryIcon = '<i class="fa fa-list-alt"></i>';
  const foodIcon = '<i class="fa fa-birthday-cake"></i>';
  const drinkIcon = '<i class="fa fa-coffee"></i>';
  const ratingIcon = '<i class="fa fa-star star-icon"></i>';
  const reviewCustomer = '<i class="fa fa-comment"></i>';
  const userReview = '<i class="fa fa-user"></i>';

  detailRestaurant.innerHTML = `
      <img src="${imageUrl}" alt="${restaurant.name}" />
      <h1>${restaurant.name}</h1>
      <p>${ratingIcon} <strong>Rating</strong>: <span class="rating">${restaurant.rating}</span></p>
      <p>${addressIcon} <strong>Addrsess</strong>: ${restaurant.address}</p>
      <p>${descriptionIcon} <strong>Description</strong>: ${restaurant.description}</p>
      <p>${cityIcon} <strong>City</strong>: ${restaurant.city}</p>
      <p>${categoryIcon} <strong>Category</strong>: ${restaurant.categories.map((category) => category.name).join(', ')}</p>
      <p>${foodIcon} <strong>Foods</strong>: ${restaurant.menus.foods.map((food) => food.name).join(', ')}</p>
      <p>${drinkIcon} <strong>Drinks</strong>: ${restaurant.menus.drinks.map((drink) => drink.name).join(', ')}</p>
      <fieldset class="fieldset-container">
        <legend>${reviewCustomer} Customer Reviews:</legend>
        <ul class="customer-reviews-list">
          ${restaurant.customerReviews.map((review) => `
            <li class="customer-review">
            ${userReview} <strong>${review.name} (${review.date}):</strong> <br><br> ${review.review}
            </li>
          `).join('')}
        </ul>
      </fieldset>
      <button id="favorite-button" class="favorit-button" data-restaurant-id="${restaurant.id}">
         <i class="fa fa-heart-o" aria-hidden="true"></i>
      </button>
    `;

  detailRestaurant.addEventListener('click', async (event) => {
    if (event.target.classList.contains('favorit-button')) {
      const restaurantId = event.target.getAttribute('data-restaurant-id');

      const restaurantData = {
        id: restaurantId,
        name: restaurant.name,
        rating: restaurant.rating,
        address: restaurant.address,
        description: restaurant.description,
        city: restaurant.city,
        categories: restaurant.categories,
        menus: restaurant.menus,
        customerReviews: restaurant.customerReviews,
        image: `https://restaurant-api.dicoding.dev/images/large/${restaurant.pictureId}`,
      };
      await FavoriteRestaurantIdb.putRestaurant(restaurantData);

      // eslint-disable-next-line no-param-reassign
      event.target.innerHTML = '<i class="fa fa-heart" aria-hidden="true"></i>';
    }
  });

  return detailRestaurant;
}

export function createFavoriteRestaurant(restaurant) {
  const restaurantGrid = document.createElement('div');
  restaurantGrid.className = 'restaurant-grid';
  const restaurantFavorite = document.createElement('article');
  restaurantFavorite.className = 'restaurant-card';
  restaurantFavorite.tabIndex = 0;

  const ratingIcon = '<i class="fa fa-star star-icon"></i>';
  const cityIcon = '<i class="fa fa-building"></i></i>';

  restaurantFavorite.innerHTML = `
      <img src="${restaurant.image}" alt="${restaurant.name}W">
      <h2>${restaurant.name}</h2>
      <p>${cityIcon} Kota ${restaurant.city}</p>
      <p>${ratingIcon} ${restaurant.rating}</p>
      <button class="detail-button">Detail</button>
    `;

  const detailButton = restaurantFavorite.querySelector('.detail-button');
  detailButton.addEventListener('click', () => {
    const detailUrl = `/detail/${restaurant.id}`;

    page(detailUrl);
  });

  return restaurantFavorite;
}
