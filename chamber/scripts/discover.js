import { discoverItems } from "../data/discover.mjs";

const VISIT_KEY = "matamoros_discover_last_visit";
const MS_PER_DAY = 1000 * 60 * 60 * 24;

function renderVisitMessage() {
    const banner = document.getElementById("visit-message");
    if (!banner) return;

    const now = Date.now();
    const lastVisitRaw = localStorage.getItem(VISIT_KEY);

    if (!lastVisitRaw) {
        banner.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisit = Number(lastVisitRaw);
        const elapsedMs = now - lastVisit;

        if (elapsedMs < MS_PER_DAY) {
            banner.textContent = "Located in northern Mexico! this region offers you different entertainment and cultural opportunities. Visit this place and explore the city of matamoros";
        } else {
            const days = Math.floor(elapsedMs / MS_PER_DAY);
            const dayWord = days === 1 ? "day" : "days";
            banner.textContent = `You last visited ${days} ${dayWord} ago.`;
        }
    }

    localStorage.setItem(VISIT_KEY, String(now));
}

function renderCards(items) {
    const container = document.getElementById("discover-cards");
    if (!container) return;

    container.innerHTML = "";

    items.forEach((item, index) => {
        const card = document.createElement("article");
        card.className = "discover-card";
        card.style.gridArea = `card${index + 1}`;

        const title = document.createElement("h2");
        title.textContent = item.name;

        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.name;
        img.width = 300;
        img.height = 200;
        img.loading = "lazy";
        figure.appendChild(img);

        const address = document.createElement("address");
        address.textContent = item.address;

        const description = document.createElement("p");
        description.textContent = item.description;

        const button = document.createElement("button");
        button.type = "button";
        button.className = "learn-more-btn";
        button.textContent = "learn more";
        button.addEventListener("click", () => {
            const query = encodeURIComponent(`${item.name} Matamoros Tamaulipas`);
            window.open(`https://www.google.com/search?q=${query}`, "_blank", "noopener,noreferrer");
        });

        card.append(title, figure, address, description, button);
        container.appendChild(card);
    });
}

renderVisitMessage();
renderCards(discoverItems);