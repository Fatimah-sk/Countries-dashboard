
import axios from "axios";

const API = "https://countries.dev";

// Convert API data to our application's format
function normalizeCountry(country) {
  return {
    name: {
      common: country.name ?? "Unknown",
    },

    capital: country.capital
      ? Array.isArray(country.capital)
        ? country.capital
        : [country.capital]
      : [],

    population: country.population ?? null,

    region: country.region ?? "—",

    flags: {
      png: country.flags?.png ?? "",
      svg: country.flags?.svg ?? "",
    },

    cca3: country.alpha3Code ?? "",
    cca2: country.alpha2Code ?? "",
    
    languages: Object.fromEntries(
      (country.languages ?? []).map((lang, index) => [
        lang.iso639_2 ?? index,
        lang.name,
      ])
    ),

    currencies: Object.fromEntries(
      (country.currencies ?? []).map((currency, index) => [
        currency.code ?? index,
        {
          name: currency.name,
          symbol: currency.symbol,
        },
      ])
    ),

    borders: country.borders ?? [],
  };
}

// GET ALL COUNTRIES
export async function fetchAllCountries() {
  try {
    const response = await axios.get(`${API}/countries`, {
      timeout: 15000,
    });

    if (!Array.isArray(response.data)) {
      throw new Error("Invalid countries response");
    }

    return response.data.map(normalizeCountry);

  } catch (error) {
    console.error("Failed to fetch countries:", error);
    throw error;
  }
}

// GET COUNTRY DETAILS
export async function fetchCountryByCode(code) {
  try {
    const response = await axios.get(
      `${API}/alpha/${encodeURIComponent(code)}`,
      {
        timeout: 15000,
      }
    );

    return normalizeCountry(response.data);

  } catch (error) {
    console.error("Failed to fetch country:", error);
    throw error;
  }
}
