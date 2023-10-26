import ListRestaurant from '../views/pages/list-restaurant';
import DetailRestaurant from '../views/pages/detail-restaurant';
import LikeRestaurant from '../views/pages/like-restaurant';

const routes = {
  '/': ListRestaurant, // default page
  '/list-restaurant': LikeRestaurant,
  '/detail-restaurant/:id': DetailRestaurant,
  '/like-restaurant': LikeRestaurant,
};

export default routes;
