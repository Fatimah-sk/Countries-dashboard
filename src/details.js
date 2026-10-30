import { fetchCountryByCode } from "./api/countries.js";
import { DetailsView } from "./components/Details.js";
import { initTheme } from "./theme.js";

initTheme();

const detailsEl = document.querySelector("#details");
const statusEl = document.querySelector("#status");

const params = new URLSearchParams(window.location.search);
const code = params.get("code");

async function init() {
  if (!code) {
    statusEl.textContent = "Missing country code.";
    return;
  }

  statusEl.textContent = "Loading details...";
  try {
    const country = await fetchCountryByCode(code);
    detailsEl.innerHTML = DetailsView(country);
    statusEl.textContent = "";
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Error loading details.";
  }
}

init();
