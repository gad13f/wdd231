document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const primaryNav = document.getElementById('primary-nav');

    hamburger.addEventListener('click', () => {
        primaryNav.classList.toggle('open');
    });
});