import { createDetailRestaurant } from './templates/template-creator';
import RestaurantDbSource from '../data/restaurant-db-source';

export default async function populateDetailContent(ctx) {
  const main = document.querySelector('#main-content');
  const { id } = ctx.params;
  main.innerHTML = '';

  const loader = document.createElement('span');
  loader.className = 'loader-detail';
  main.appendChild(loader);

  try {
    const data = await RestaurantDbSource.detailRestaurant(id);

    if (data.error === false) {
      setTimeout(() => {
        const restaurantData = data.restaurant;
        const detailRestaurant = createDetailRestaurant(restaurantData);
        main.appendChild(detailRestaurant);
      }, 3000);
    } else {
      console.error('Error fetching data:', data.message);
      // Menampilkan pesan "Gagal dimuat" di tampilan
      main.textContent = 'Data gagal dimuat.';
    }
    setTimeout(() => {
      loader.style.display = 'none';
    }, 3000);
  } catch (error) {
    console.error('Error fetching data:', error);
    // Menampilkan pesan "Gagal dimuat" di tampilan
    main.textContent = 'Data gagal dimuat.';
  }
}
