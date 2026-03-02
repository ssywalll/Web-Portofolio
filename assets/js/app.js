const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");
const toggleLabel = document.querySelector(".theme-toggle__label");
const storageKey = "portfolio-theme";
let themeTransitionTimer;

const getPreferredTheme = () => {
  const savedTheme = window.localStorage.getItem(storageKey);
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

const applyTheme = (theme) => {
  root.setAttribute("data-theme", theme);
  toggleLabel.textContent = theme === "light" ? "Light" : "Dark";
  toggle.setAttribute(
    "aria-label",
    theme === "light" ? "Aktifkan tema gelap" : "Aktifkan tema terang"
  );
};

applyTheme(getPreferredTheme());

toggle.addEventListener("click", () => {
  const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.classList.add("theme-transitioning");
  applyTheme(nextTheme);
  window.localStorage.setItem(storageKey, nextTheme);
  window.clearTimeout(themeTransitionTimer);
  themeTransitionTimer = window.setTimeout(() => {
    root.classList.remove("theme-transitioning");
  }, 580);
});

document.querySelector(".contact__form").addEventListener("submit", (event) => {
  event.preventDefault();
});
