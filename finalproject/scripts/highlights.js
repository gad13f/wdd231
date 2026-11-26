export async function loadSeasonalHighlights(container, onSelectHighlight) {
  try {
    const response = await fetch("data/highlights.json");
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const items = await response.json();
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("No seasonal highlights available.");
    }

    container.innerHTML = items
      .map(
        (item) => `
        <article class="highlight-card">
          <img src="${item.image}" alt="${item.alt}" loading="lazy" width="600" height="375">
          <div class="card-body">
            <span class="badge">${item.season}</span>
            <h3>${item.title}</h3>
            <p class="price-tag">${item.priceLabel}</p>
            <p>${item.summary}</p>
            <button
              type="button"
              class="btn btn-outline view-details-btn"
              data-id="${item.id}"
            >
              View Details
            </button>
          </div>
        </article>
      `
      )
      .join("");

    const buttons = container.querySelectorAll(".view-details-btn");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const selected = items.find((entry) => entry.id === button.dataset.id);
        if (selected && typeof onSelectHighlight === "function") {
          onSelectHighlight(selected);
        }
      });
    });
  } catch (error) {
    console.error("Failed to load seasonal highlights:", error);
    container.innerHTML = `
      <p>Unable to load seasonal highlights right now. Please visit the <a href="packages.html">Packages &amp; Destinations</a> page to explore all routes.</p>
    `;
  }
}