export function loadMainContent(restaurants) {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const restaurantGrid = document.createElement('div');
  restaurantGrid.className = 'restaurant-grid';

  restaurants.forEach((restaurant, index) => {
    const restaurantCard = document.createElement('article');
    restaurantCard.className = 'restaurant-card';
    restaurantCard.tabIndex = 0;

    restaurantCard.innerHTML = `
      <img src="${restaurant.pictureId}" alt="${restaurant.name}">
      <h2>${restaurant.name}</h2>
      <p>Kota: ${restaurant.city}</p>
      <p>Rating: ${restaurant.rating}</p>
      <p class="description">${restaurant.description}</p>
    `;

    restaurantCard.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        window.location.href = `/restaurant/${restaurant.id}`;
      } else if (event.key === 'ArrowRight' && index < restaurants.length - 1) {
        restaurants[index + 1].focus();
      } else if (event.key === 'ArrowLeft' && index > 0) {
        restaurants[index - 1].focus();
      }
    });

    restaurantGrid.appendChild(restaurantCard);
  });

  main.appendChild(restaurantGrid);
}
