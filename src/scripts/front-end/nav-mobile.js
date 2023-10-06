function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
}

export{toggleMobileMenu};