import FavoriteRestaurantIdb from '../data/favorite-restaurant-db';
import { createDetailRestaurant } from '../views/templates/template-creator';

const favoriteButton = document.getElementById('favorite-button');

favoriteButton.addEventListener('click', async () => {
  const restaurantId = favoriteButton.getAttribute('data-restaurant-id');
  console.log('Restaurant ID:', restaurantId);

  const isRestaurantFavorite = await FavoriteRestaurantIdb.getRestaurant(restaurantId);

  if (isRestaurantFavorite) {
    // Hapus restoran dari daftar favorit
    await FavoriteRestaurantIdb.deleteRestaurant(restaurantId);

    // Ubah ikon tombol favorit
    favoriteButton.innerHTML = ' <i class="fa fa-heart-o" aria-hidden="true"></i>';
  } else {
    // Simpan restoran ke IndexedDB
    await FavoriteRestaurantIdb.putRestaurant({ id: restaurantId });

    // Ubah ikon tombol favorit
    favoriteButton.innerHTML = '<i class="fa fa-heart" aria-hidden="true"></i>';
  }

  // Setelah mengklik tombol favorit, tambahkan atau perbarui detail restoran ke dalam DOM
  const restaurantDetailElement = createDetailRestaurant(restaurantId);
  // Gantilah `restaurantData` dengan data restoran yang sesuai
  const restaurantDetailContainer = document.getElementById('restaurant-detail-container'); // Gantilah dengan elemen yang sesuai
  restaurantDetailContainer.innerHTML = ''; // Bersihkan elemen kontainer
  restaurantDetailContainer.appendChild(restaurantDetailElement);
});
