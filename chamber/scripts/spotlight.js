const spotlightsContainer = document.getElementById('spotlights-container');

async function getMembersData() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        displaySpotlights(data);
    } catch (error) {
        console.error('Error al cargar los datos de los miembros:', error);
    }
}

function displaySpotlights(members) {
    
    const filteredMembers = members.filter(member => member.membershipLevel >= 2);
    
    const shuffled = filteredMembers.sort(() => 0.5 - Math.random());
    
    const selected = shuffled.slice(0, 3);

    if (spotlightsContainer) {
        spotlightsContainer.innerHTML = '';

        selected.forEach(member => {
            const card = document.createElement('article');
            card.classList.add('spotlight-card', 'card');

            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} Logo" width="100" height="70" loading="lazy">
                <h3>${member.name}</h3>
                <p class="tagline">"${member.tagline}"</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><a href="${member.website}" target="_blank">Website</a></p>
            `;

            spotlightsContainer.appendChild(card);
        });
    }
}

getMembersData();