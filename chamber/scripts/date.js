// 1. Mostrar el año actual en el elemento con id="currentyear"
const currentYearSpan = document.getElementById('currentyear');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// 2. Mostrar la fecha de última modificación en el elemento con id="lastModified"
const lastModifiedSpan = document.getElementById('lastModified');
if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
}