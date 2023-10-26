import { createRestaurantCard, createRestaurantGrid } from './templates/template-creator';
import RestaurantDbSource from '../data/restaurant-db-source';
import API_ENDPOINT from '../globals/api-endpoints';

// eslint-disable-next-line import/prefer-default-export
export default async function populateHomeContent() {
  const main = document.querySelector('#main-content');
  main.innerHTML = '';

  const restaurantGrid = createRestaurantGrid();

  try {
    const data = await RestaurantDbSource.listRestaurant();
    if (data.error === false) {
      const updatedRestaurants = data.restaurants.map((restaurant) => {
        const smallPictureUrl = API_ENDPOINT.SMALL_IMAGE(restaurant.pictureId);
        const mediumPictureUrl = API_ENDPOINT.MEDIUM_IMAGE(restaurant.pictureId);
        const largePictureUrl = API_ENDPOINT.LARGE_IMAGE(restaurant.pictureId);

        return {
          ...restaurant,
          smallPictureUrl,
          mediumPictureUrl,
          largePictureUrl,
        };
      });

      updatedRestaurants.forEach((restaurantData) => {
        const restaurantCard = createRestaurantCard(restaurantData);
        restaurantGrid.appendChild(restaurantCard);
      });

      main.appendChild(restaurantGrid);
    } else {
      console.error('Error fetching data:', data.message);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
