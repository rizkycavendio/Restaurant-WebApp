import { isFormValid, initializeForm } from '../front-end/form';

function initializeFormAndValidate() {
  // form
  initializeForm();
  isFormValid();
}

export default initializeFormAndValidate;
