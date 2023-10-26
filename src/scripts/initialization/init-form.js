import { isFormValid, initializeForm } from '../front-end/from';

function initializeFormAndValidate() {
  // form
  initializeForm();
  isFormValid();
}

export default initializeFormAndValidate;
