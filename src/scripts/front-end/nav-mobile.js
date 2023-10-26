const toggleMobileMenu = () => {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
};

// eslint-disable-next-line import/prefer-default-export
export { toggleMobileMenu };
