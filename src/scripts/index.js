import 'regenerator-runtime';
import '../styles/main.scss';
import init from './routing/routes';
import initializeSliderAndMenu from './initialization/init-jumbotron-menu';
import initializeFormAndValidate from './initialization/init-form';
import swRegister from './initialization/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

window.addEventListener('hashchange', () => {
  initializeSliderAndMenu();
  initializeFormAndValidate();
});

window.addEventListener('load', async () => {
  initializeSliderAndMenu();
  initializeFormAndValidate();
  // init untuk routing
  init();
  swRegister();
});
