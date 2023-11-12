// eslint-disable-next-line no-undef
Feature('Like and Unlike Restaurant');

// eslint-disable-next-line no-undef
Scenario('User can like and unlike a restaurant', async ({ I }) => {
  I.amOnPage('/');
  // eslint-disable-next-line no-undef
  I.click(locate('.restaurant-card').first().find('.detail-button'));

  // MENYUKAI
  I.seeElement('#like-button');
  I.click('#like-button');

  // PERGI KE HALAMAN FAVORITE UNTUK MELIHAT RESTAURAN YANG SUDAH DISUKAI
  I.seeElement('.favorite');
  I.click('.favorite');
  // eslint-disable-next-line no-undef
  I.click(locate('.restaurant-card').first().find('.detail-button'));

  // BATAL MENYUKAI
  I.seeElement('#like-button');
  I.click('#like-button');
});
