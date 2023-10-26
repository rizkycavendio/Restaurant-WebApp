import { createFavoriteRestaurant, createRestaurantGrid } from './templates/template-creator';
import FavoriteRestaurantIdb from '../data/favorite-restaurant-db';

export default async function populateFavoriteContent() {
  const main = document.querySelector('#main-content');
  main.innerHTML = '';

  const restaurantGrid = createRestaurantGrid();

  try {
    const data = await FavoriteRestaurantIdb.getAllRestaurant();
    if (data && data.length > 0) {
      data.forEach((restaurantData) => {
        const restaurantFavorite = createFavoriteRestaurant(restaurantData);
        restaurantGrid.appendChild(restaurantFavorite);
      });
      main.appendChild(restaurantGrid);
    } else {
      const noDataElement = document.createElement('p');
      noDataElement.textContent = 'No favorite restaurants found.';
      main.appendChild(noDataElement);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
