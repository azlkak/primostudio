// Follow the system by default; remember a manual selection.
(() => {
  const root = document.documentElement;
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const storageKey = "primo-studio-theme";
  let preference = "auto";
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === "day" || saved === "night") preference = saved;
  } catch { /* The switch also works when storage is unavailable. */ }

  function applyTheme() {
    const theme = preference === "auto" ? (systemTheme.matches ? "night" : "day") : preference;
    root.dataset.theme = theme;
    root.style.colorScheme = theme === "night" ? "dark" : "light";
    document.querySelectorAll("[data-theme-toggle]").forEach(button => {
      button.setAttribute("aria-checked", String(theme === "night"));
      button.title = theme === "night" ? "Włącz widok dzienny" : "Włącz widok nocny";
    });
    document.querySelectorAll("[data-day-src]").forEach(image => {
      image.src = theme === "night" ? image.dataset.nightSrc : image.dataset.daySrc;
    });
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = theme === "night" ? "#241710" : "#f2e7d8";
  }
  function chooseTheme(value) {
    preference = value;
    try {
      if (value === "auto") localStorage.removeItem(storageKey);
      else localStorage.setItem(storageKey, value);
    } catch { /* Keep the in-memory choice for this page. */ }
    applyTheme();
  }
  applyTheme();
  systemTheme.addEventListener("change", () => {
    if (preference === "auto") applyTheme();
  });
  window.addEventListener("storage", event => {
    if (event.key !== storageKey && event.key !== null) return;
    preference = event.newValue === "day" || event.newValue === "night" ? event.newValue : "auto";
    applyTheme();
  });
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".theme-control").forEach(control => { control.hidden = false; });
    document.querySelectorAll("[data-theme-toggle]").forEach(button => {
      button.addEventListener("click", () => chooseTheme(root.dataset.theme === "night" ? "day" : "night"));
    });
    applyTheme();
  }, { once: true });
})();
