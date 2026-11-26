import { loadSeasonalHighlights } from "./highlights.js";

const STORAGE_KEY = "wildtrail_quick_search";

function initNavigation() {
  const toggleBtn = document.querySelector("#menu-toggle");
  const nav = document.querySelector("#primary-nav");

  if (!toggleBtn || !nav) return;

  toggleBtn.addEventListener("click", () => {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", String(!isExpanded));
    nav.classList.toggle("is-open", !isExpanded);
  });
}

function initQuickSearch() {
  const form = document.querySelector("#quick-search-form");
  const budgetSelect = document.querySelector("#budget-select");
  const activitySelect = document.querySelector("#activity-select");
  const resetBtn = document.querySelector("#reset-filters-btn");
  const statusEl = document.querySelector("#saved-preference-status");

  if (!form || !budgetSelect || !activitySelect) return;

  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  if (saved) {
    budgetSelect.value = saved.budget || "all";
    activitySelect.value = saved.activity || "all";
    if (statusEl) {
      statusEl.textContent = `Saved preference: Budget "${budgetSelect.options[budgetSelect.selectedIndex].text}" and Activity "${activitySelect.options[activitySelect.selectedIndex].text}".`;
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const prefs = {
      budget: budgetSelect.value,
      activity: activitySelect.value
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));

    const params = new URLSearchParams(prefs);
    window.location.href = `packages.html?${params.toString()}`;
  });

  resetBtn?.addEventListener("click", () => {
    budgetSelect.value = "all";
    activitySelect.value = "all";
    localStorage.removeItem(STORAGE_KEY);
    if (statusEl) {
      statusEl.textContent = "Saved search preferences cleared.";
    }
  });
}

function initDialog() {
  const dialog = document.querySelector("#highlight-dialog");
  const titleEl = document.querySelector("#dialog-title");
  const contentEl = document.querySelector("#dialog-content");
  const closeBtn = document.querySelector("#close-dialog-btn");

  if (!dialog || !titleEl || !contentEl || !closeBtn) return;

  closeBtn.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  return (item) => {
    titleEl.textContent = item.title;
    contentEl.innerHTML = `
      <p><strong>Location:</strong> ${item.location}</p>
      <p><strong>Duration:</strong> ${item.duration}</p>
      <p><strong>Budget Tier:</strong> ${item.budgetTier}</p>
      <p><strong>Price:</strong> ${item.priceLabel}</p>
      <p>${item.details}</p>
      <p><a class="btn btn-primary" href="packages.html">See Full Package Catalog</a></p>
    `;
    dialog.showModal();
  };
}

function initFooterYear() {
  const yearEl = document.querySelector("#current-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initQuickSearch();
  initFooterYear();

  const openHighlightModal = initDialog();
  const highlightsGrid = document.querySelector("#highlights-grid");
  if (highlightsGrid) {
    loadSeasonalHighlights(highlightsGrid, openHighlightModal);
  }
});