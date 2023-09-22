
const burgerMenu = document.querySelector('.burger-menu');
const navMenu = document.querySelector('.header__nav');

burgerMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

