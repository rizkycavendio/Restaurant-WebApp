import 'fake-indexeddb/auto';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import { createDetailRestaurant } from '../src/scripts/views/templates/template-creator';

const sampleRestaurant = {
  id: '1',
  name: 'Sample Restaurant',
  rating: 4.5,
  address: '123 Main St',
  city: 'Sample City',
  description: 'Sample description',
  image: 'https://restaurant-api.dicoding.dev/images/large/1',
  categories: [
    { name: 'Asian' },
    { name: 'Western' },
  ],
  menus: {
    foods: [
      { name: 'Nasi Goreng' },
      { name: 'Burger' },
    ],
    drinks: [
      { name: 'Ice Tea' },
      { name: 'Coffee' },
    ],
  },
  customerReviews: [
    { name: 'John Doe', date: '2023-01-01', review: 'Great food and service!' },
    { name: 'Jane Doe', date: '2023-01-02', review: 'Awesome place!' },
  ],
};

// eslint-disable-next-line no-undef
describe('FavoriteRestaurantIdb Integration Tests', () => {
  // eslint-disable-next-line no-undef
  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(sampleRestaurant.id);
  });

  // eslint-disable-next-line no-undef
  it('should be able to like and unlike a restaurant through UI', async () => {
    const detailRestaurant = createDetailRestaurant(sampleRestaurant);
    document.body.appendChild(detailRestaurant);

    await FavoriteRestaurantIdb._ensureInitialized();

    const likeButton = detailRestaurant.querySelector('.favorit-button');
    likeButton.click();

    await new Promise((resolve) => { setTimeout(resolve, 500); });

    const isLiked = await FavoriteRestaurantIdb.getRestaurant(sampleRestaurant.id);
    // eslint-disable-next-line no-undef
    expect(isLiked).toEqual(sampleRestaurant);
    likeButton.click();

    await new Promise((resolve) => { setTimeout(resolve, 500); });

    const isUnliked = await FavoriteRestaurantIdb.getRestaurant(sampleRestaurant.id);
    // eslint-disable-next-line no-undef
    expect(isUnliked).toBeUndefined();
  });

  // eslint-disable-next-line no-undef
  it('should handle toggling like/unlike status correctly through UI', async () => {
    const detailRestaurant = createDetailRestaurant(sampleRestaurant);
    document.body.appendChild(detailRestaurant);

    await FavoriteRestaurantIdb._ensureInitialized();

    const likeButton = detailRestaurant.querySelector('.favorit-button');
    likeButton.click();

    await new Promise((resolve) => { setTimeout(resolve, 500); });

    const isLiked = await FavoriteRestaurantIdb.getRestaurant(sampleRestaurant.id);
    // eslint-disable-next-line no-undef
    expect(isLiked).toEqual(sampleRestaurant);
    likeButton.click();

    await new Promise((resolve) => { setTimeout(resolve, 500); });

    const isUnliked = await FavoriteRestaurantIdb.getRestaurant(sampleRestaurant.id);
    // eslint-disable-next-line no-undef
    expect(isUnliked).toBeUndefined();

    likeButton.click();
    await new Promise((resolve) => { setTimeout(resolve, 500); });
    const isLikedAgain = await FavoriteRestaurantIdb.getRestaurant(sampleRestaurant.id);
    // eslint-disable-next-line no-undef
    expect(isLikedAgain).toEqual(sampleRestaurant);
  });
});
