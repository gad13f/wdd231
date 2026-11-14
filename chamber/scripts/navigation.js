const navButton = document.getElementById("ham-btn");
const navLinks = document.getElementById("nav-bar");

navButton.addEventListener("click", () => {
    navButton.classList.toggle("show");
    navLinks.classList.toggle("show");
})