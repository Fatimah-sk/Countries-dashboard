const STORAGE_KEY = "countries-theme";

export function initTheme() {
  let savedTheme = "light";

  try {
    savedTheme = localStorage.getItem(STORAGE_KEY) || "light";
  } catch {
    // Use light mode if storage is unavailable.
  }

  applyTheme(savedTheme);

  const themeBtn = document.querySelector("#theme-toggle");

  if (!themeBtn) return;

  themeBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme;
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(newTheme);

    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // Theme still changes for this page.
    }
  });
}

function applyTheme(theme) {
  const isDark = theme === "dark";

  document.documentElement.dataset.theme = isDark ? "dark" : "light";

  const themeBtn = document.querySelector("#theme-toggle");

  if (themeBtn) {
    themeBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    themeBtn.setAttribute("aria-pressed", String(isDark));
  }
}