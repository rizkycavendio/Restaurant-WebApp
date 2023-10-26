import { createRestaurantCard, createRestaurantGrid } from './templates/template-creator';
import RestaurantDbSource from '../data/restaurant-db-source';
import API_ENDPOINT from '../globals/api-endpoints';

async function loadRestaurantData(restaurantData, loader, restaurantGrid) {
  try {
    // Simulate loading data with a delay
    await new Promise((resolve) => { setTimeout(resolve, 2000); });

    restaurantGrid.removeChild(loader);

    const restaurantCard = createRestaurantCard(restaurantData);
    restaurantGrid.appendChild(restaurantCard);
  } catch (error) {
    console.error('Error loading restaurant data:', error);
  }
}

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
        const loader = document.createElement('span');
        loader.className = 'loader';
        restaurantGrid.appendChild(loader);

        loadRestaurantData(restaurantData, loader, restaurantGrid);
      });

      main.appendChild(restaurantGrid);
    } else {
      console.error('Error fetching data:', data.message);
      // Menampilkan pesan "Gagal dimuat" di tampilan
      main.textContent = 'Data gagal dimuat.';
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    // Menampilkan pesan "Gagal dimuat" di tampilan
    main.textContent = 'Data gagal dimuat.';
  }
}
