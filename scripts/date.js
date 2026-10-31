document.addEventListener('DOMContentLoaded', () => {
    // Current Year
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Last Modified Date
    const lastModifiedParagraph = document.getElementById('lastModified');
    if (lastModifiedParagraph) {
        lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
    }
});