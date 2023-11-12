// eslint-disable-next-line no-undef
Feature('End-to-End Testing');

// eslint-disable-next-line no-undef
Scenario('Test Checkout Process', async ({ I }) => {
  I.amOnPage('/');

  I.fillField('#fullName', 'John Doe');
  I.fillField('#address', '123 Main St');
  I.selectOption('#restaurantName', 'Bring Your Phone Cafe');
  I.selectOption('#selectedMenu', 'Menu 3');
  I.fillField('#orderDate', '2023-11-12');
  I.selectOption('#bankTransfer', 'Bank BRI');
  I.checkOption('#agreement');

  I.seeElement('#checkoutButton');

  I.wait(5);

  I.click('#checkoutButton');
});
