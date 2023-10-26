import CONFIG from './config';

const API_ENDPOINT = {
  BASE_URL: 'https://restaurant-api.dicoding.dev',
  LIST: `${CONFIG.BASE_URL}/list`,
  DETAIL: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
  SEARCH: (query) => `${CONFIG.BASE_URL}/search?q=${query}`,
  ADD_REVIEW: `${CONFIG.BASE_URL}/review`,
  SMALL_IMAGE: (pictureId) => `${CONFIG.BASE_URL}/images/small/${pictureId}`,
  MEDIUM_IMAGE: (pictureId) => `${CONFIG.BASE_URL}/images/medium/${pictureId}`,
  LARGE_IMAGE: (pictureId) => `${CONFIG.BASE_URL}/images/large/${pictureId}`,
};

export default API_ENDPOINT;
