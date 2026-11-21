const membersURL = "data/members.json";
const cards = document.querySelector('#members-container');
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const menuButton = document.querySelector("#menu-button");
const navMenu = document.querySelector("#menu-list");

if (menuButton) {
    menuButton.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        menuButton.textContent = navMenu.classList.contains("open") ? "❌" : "☰";
    });
}

async function getMembersData() {
    try {
        const response = await fetch(membersURL);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data.members);
        }
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
}

getMembersData();

const displayMembers = (members) => {
    cards.innerHTML = "";
    members.forEach((member) => {
        let card = document.createElement("section");
        
        let levelText = member.membershipLevel === 3 ? "Socio Oro" : member.membershipLevel === 2 ? "Socio Plata" : "Miembro";

        card.innerHTML = `
            <img src="images/${member.image}" alt="Logo de ${member.name}" loading="lazy" width="120" height="80">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>📞 ${member.phone}</p>
            <a href="${member.website}" target="_blank">Sitio Web</a>
            <p class="membership-level">${levelText}</p>
        `;

        cards.appendChild(card);
    });
};

gridButton.addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");
    gridButton.classList.add("active");
    listButton.classList.remove("active");
});

listButton.addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
    listButton.classList.add("active");
    gridButton.classList.remove("active");
});

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;