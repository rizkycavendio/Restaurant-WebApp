import page from 'page';
import populateHomeContent from '../views/home';
import populateDetailContent from '../views/detail';

function init() {
  page('/', populateHomeContent);
  page('/detail/:id', populateDetailContent);

  page();
}

export default init;
