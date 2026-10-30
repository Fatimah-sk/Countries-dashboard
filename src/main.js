import { fetchAllCountries } from "./api/countries.js";
import { CountryCard } from "./components/CountryCard.js";
import { Search } from "./components/Search.js";
import { Filter } from "./components/Filter.js";
import { initTheme } from "./theme.js";

initTheme();

const grid = document.querySelector("#grid");
const statusEl = document.querySelector("#status");

const searchMount = document.querySelector("#search");
const filterMount = document.querySelector("#filter");

let allCountries = [];
let query = "";
let region = "all";

function render() {
  const filtered = allCountries
    .filter((c) => {
      const name = c.name?.common?.toLowerCase() ?? "";
      return name.includes(query.toLowerCase());
    })
    .filter((c) => (region === "all" ? true : c.region === region));

  grid.innerHTML = filtered.map(CountryCard).join("");

  statusEl.textContent =
    filtered.length === 0 ? "No countries found." : "";
}

async function init() {
  statusEl.textContent = "Loading countries...";
  try {
    allCountries = await fetchAllCountries();
    statusEl.textContent = "";
    render();
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Error loading countries. Try again.";
  }
}

searchMount.appendChild(
  Search((value) => {
    query = value;
    render();
  })
);

filterMount.appendChild(
  Filter((value) => {
    region = value;
    render();
  })
);

// click => details page
grid.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  const code = card.dataset.code;
  // نفتح صفحة التفاصيل مع code
window.location.href = `details.html?code=${code}`;
});



const scrollBtn = document.getElementById("scrollTopBtn");

// Vis knapp når man scroller ned
window.addEventListener("scroll", () => {
  if (window.scrollY > 150) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

// Scroll til toppen
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

init();
