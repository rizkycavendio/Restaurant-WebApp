import page from 'page';
import populateHomeContent from '../views/home';
import populateDetailContent from '../views/detail';
import populateFavoriteContent from '../views/favorite';

function init() {
  page('/', populateHomeContent);
  page('/detail/:id', populateDetailContent);
  page('/favorite', populateFavoriteContent);

  page();
}

export default init;
