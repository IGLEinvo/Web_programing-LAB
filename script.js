document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.querySelector('.burger-menu');
    const navContainer = document.querySelector('.header__nav-container');
  
    burgerMenu.addEventListener('click', function () {
      navContainer.classList.toggle('active');
    });
  });
  