// scripts/spotlights.js

const spotlightsContainer = document.querySelector('#spotlights-container');
const membersURL = 'data/members.json'; // Asegúrate de que esta ruta coincida con tu archivo JSON

async function getMembersData() {
    try {
        const response = await fetch(membersURL);
        if (response.ok) {
            const data = await response.json();
            filterAndDisplaySpotlights(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error('Error loading members data for spotlights:', error);
    }
}

function filterAndDisplaySpotlights(members) {
    // 1. Filtrar solo miembros de nivel Gold (3) o Silver (2), o por texto de membresía
    const qualifiedMembers = members.filter(member => 
        member.membershipLevel === 2 || member.membershipLevel === 3 ||
        member.membershipLevel === 'Silver' || member.membershipLevel === 'Gold'
    );

    // 2. Mezclar el arreglo aleatoriamente
    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());

    // 3. Tomar 2 o 3 miembros (ej. 3)
    const selected = shuffled.slice(0, 3);

    // 4. Limpiar contenedor y renderizar
    spotlightsContainer.innerHTML = '';
    selected.forEach(member => {
        displaySpotlightCard(member);
    });
}

function displaySpotlightCard(member) {
    const card = document.createElement('article');
    card.classList.add('spotlight-card', 'card');

    // Determinar texto del nivel de membresía
    let levelText = member.membershipLevel;
    if (levelText === 3 || levelText === 'Gold') levelText = 'Membresía Oro';
    if (levelText === 2 || levelText === 'Silver') levelText = 'Membresía Plata';

    card.innerHTML = `
        <h3>${member.name}</h3>
        <p class="tagline">"${member.tagline || 'Comprometidos con el desarrollo local'}"</p>
        <hr>
        <img src="images/${member.image}" alt="Logo de ${member.name}" width="120" height="80" loading="lazy">
        <p><strong>Tel:</strong> ${member.phone}</p>
        <p><strong>Dir:</strong> ${member.address}</p>
        <p><strong>Web:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p class="membership-level">${levelText}</p>
    `;

    spotlightsContainer.appendChild(card);
}

getMembersData();