import { createFavoriteRestaurant, createRestaurantGrid } from './templates/template-creator';
import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb';

async function loadRestaurantData(restaurantData, loader, restaurantGrid) {
  try {
    await new Promise((resolve) => { setTimeout(resolve, 3000); });

    restaurantGrid.removeChild(loader);

    const restaurantFavorite = createFavoriteRestaurant(restaurantData);
    restaurantGrid.appendChild(restaurantFavorite);
  } catch (error) {
    console.error('Error loading restaurant data:', error);
  }
}

export default async function populateFavoriteContent() {
  const main = document.querySelector('#main-content');
  main.innerHTML = '';

  const restaurantGrid = createRestaurantGrid();

  const loader = document.createElement('span');
  loader.className = 'loader';
  main.appendChild(loader);

  try {
    const data = await FavoriteRestaurantIdb.getAllRestaurant();

    loader.style.display = 'none';

    if (data && data.length > 0) {
      data.forEach((restaurantData) => {
        const innerLoader = document.createElement('span');
        innerLoader.className = 'loader';
        restaurantGrid.appendChild(innerLoader);

        loadRestaurantData(restaurantData, innerLoader, restaurantGrid);
      });

      main.appendChild(restaurantGrid);
    } else {
      const noDataElement = document.createElement('p');
      noDataElement.textContent = 'No favorite restaurants found.';
      main.appendChild(noDataElement);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    // Menampilkan pesan "Gagal dimuat" di tampilan
    main.textContent = 'Data gagal dimuat.';
  }
}
