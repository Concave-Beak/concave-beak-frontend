export function loadThemeButton() {
  const themeToggleButton = document.querySelector<HTMLButtonElement>(
    "[data-theme-toggle]"
  )

  themeToggleButton?.addEventListener("click", () => {
    toggleTheme()
  })
}

function toggleTheme() {
  const html = document.documentElement
  const nextTheme = html.dataset.theme === "dark" ? "light" : "dark"

  html.dataset.theme = nextTheme
  localStorage.setItem("theme", nextTheme)
}
