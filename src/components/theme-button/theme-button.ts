export function loadThemeButton() {
  const themeToggleButton = document.querySelector<HTMLButtonElement>(
    "[data-theme-toggle]"
  )

  themeToggleButton?.addEventListener("click", () => {
    toggleTheme()
  })
}

function toggleTheme() {
  const html = document.documentElement;
  const nextTheme = html.dataset.theme === "dark" ? "light" : "dark";

  // Add animation class BEFORE changing theme
  html.classList.add('theme-changing');

  // Change theme
  html.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);

  // Remove animation class after animation completes
  setTimeout(() => {
    html.classList.remove('theme-changing');
  }, 500);
}
