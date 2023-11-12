import page from 'page';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

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
     <picture>
      <source media="(max-width: 600px)" data-srcset="${smallPictureUrl}">
      <source media="(max-width: 800px)" data-srcset="${mediumPictureUrl}">
      <source media="(min-width: 801px)" data-srcset="${largePictureUrl}">
        <img class="lazyload" data-src="${smallPictureUrl}" alt="${restaurant.name}" crossorigin="anonymous">
     </picture>
      <h2>${restaurant.name}</h2>
      <p>${cityIcon} Kota ${restaurant.city}</p>
      <p>${ratingIcon} ${restaurant.rating}</p>
      <button class="detail-button">Detail</button>
    `;

  const detailButton = restaurantCard.querySelector('.detail-button');
  detailButton.addEventListener('click', () => {
    console.log('detail button ditekan');
    const detailUrl = `/detail/${restaurant.id}`;

    page(detailUrl);
  });

  return restaurantCard;
}

export function createDetailRestaurant(restaurant) {
  const detailRestaurant = document.createElement('div');
  detailRestaurant.className = 'restaurant-detail';

  const imageUrl = `https://restaurant-api.dicoding.dev/images/large/${restaurant.pictureId}`;

  const icons = {
    address: '<i class="fa fa-map-marker"></i>',
    description: '<i class="fa fa-align-left"></i>',
    city: '<i class="fa fa-building"></i>',
    category: '<i class="fa fa-list-alt"></i>',
    food: '<i class="fa fa-birthday-cake"></i>',
    drink: '<i class="fa fa-coffee"></i>',
    rating: '<i class="fa fa-star star-icon"></i>',
    reviewCustomer: '<i class="fa fa-comment"></i>',
    userReview: '<i class="fa fa-user"></i>',
  };

  detailRestaurant.innerHTML = `
    <img src="${imageUrl}" alt="${restaurant.name}" crossorigin="anonymous"/>
    <h1>${restaurant.name}</h1>
    <p>${icons.rating} <span class="rating">${restaurant.rating}</span></p>
    <p>${icons.address} ${restaurant.address}</p>
    <p>${icons.description} <strong>Description</strong>: ${restaurant.description}</p>
    <p>${icons.city} <strong>City</strong>: ${restaurant.city}</p>
    <p>${icons.category} <strong>Category</strong>: ${restaurant.categories.map((category) => category.name).join(', ')}</p>
    <p>${icons.food} <strong>Foods</strong>: ${restaurant.menus.foods.map((food) => food.name).join(', ')}</p>
    <p>${icons.drink} <strong>Drinks</strong>: ${restaurant.menus.drinks.map((drink) => drink.name).join(', ')}</p>
    <fieldset class="fieldset-container">
      <legend>${icons.reviewCustomer} Customer Reviews:</legend>
      <ul class="customer-reviews-list">
        ${restaurant.customerReviews.map((review) => `
          <li class="customer-review">
          ${icons.userReview} <strong>${review.name} (${review.date}):</strong> <br><br> ${review.review}
          </li>
        `).join('')}
      </ul>
    </fieldset>
    <button id="like-button" class="favorit-button" data-restaurant-id="${restaurant.id}">
    </button>
  `;

  let isFavorite = false;

  const favoriteButton = detailRestaurant.querySelector('#like-button');

  FavoriteRestaurantIdb.getRestaurant(restaurant.id)
    .then((restaurantData) => {
      isFavorite = !!restaurantData;
      if (favoriteButton) {
        favoriteButton.innerHTML = isFavorite ? 'Remove from Favorites' : 'Add to Favorites';
      }
    })
    .catch((error) => {
      console.error('Error getting restaurant data:', error);
    });

  detailRestaurant.addEventListener('click', async (event) => {
    const { target } = event;
    if (target.id === 'like-button') {
      const restaurantId = target.getAttribute('data-restaurant-id');
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
        image: `https://restaurant-api.dicoding.dev/images/large/${restaurant.pictureId || '1'}`,
      };

      try {
        if (isFavorite) {
          await FavoriteRestaurantIdb.deleteRestaurant(restaurantId);
        } else {
          await FavoriteRestaurantIdb.putRestaurant(restaurantData);
        }

        // Toggle the favorite status
        isFavorite = !isFavorite;

        // Update the favorite button icon
        if (favoriteButton) {
          favoriteButton.innerHTML = isFavorite ? 'Add to Favorites' : 'Remove from Favorites';
        }

        console.log(`Favorite status toggled successfully. Restaurant ID: ${restaurantId}, isFavorite: ${isFavorite}`);
      } catch (error) {
        console.error('Error updating favorite status:', error);
      }
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
      <img src="${restaurant.image}" alt="${restaurant.name}" crossorigin="anonymous">
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
