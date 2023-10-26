import { createDetailRestaurant } from './templates/template-creator';
import RestaurantDbSource from '../data/restaurant-db-source';

export default async function populateDetailContent(ctx) {
  const main = document.querySelector('#main-content');
  const { id } = ctx.params;
  main.innerHTML = '';

  try {
    const data = await RestaurantDbSource.detailRestaurant(id);
    if (data.error === false) {
      const restaurantData = data.restaurant;
      const detailRestaurant = createDetailRestaurant(restaurantData);
      main.appendChild(detailRestaurant);
    } else {
      console.error('Error fetching data:', data.message);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
