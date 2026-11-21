const currentYear = document.getElementById("current-year")
const today = new Date();

currentYear.innerHTML = `&copy${today.getFullYear()} St. Louis Chamber of Commerce`
document.getElementById("last-modified").innerHTML = `Last modified: ${document.lastModified}`