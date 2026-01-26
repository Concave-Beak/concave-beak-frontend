import { loadThemeButton } from "../features/theme-button"

export function loadHeader() {
  document.querySelector<HTMLDivElement>("#app-header")!.innerHTML = `
    <div class="header-logo">
      <a href="/">
        <svg viewBox="32 72.8 135.20000000000002 52" xmlns="http://www.w3.org/2000/svg" style="max-height: 500px" width="135.20000000000002" height="52"><g><path d="M68.5 76.1c-3.3.5-8.1 1.4-10.7 2-4.3 1-4.8 1.4-4.8 3.7.1 2.9 2.5 15 3.2 15.7.2.2 3.7-.1 7.8-.7 9.8-1.3 36.1-.4 47 1.7 4.7.9 12.3 2.7 16.9 4.1 8.9 2.7 21.6 8.3 20.7 9.1-.2.3-1.7-.2-3.3-1.1-8.3-4.6-21.8-8.8-36.8-11.3-9.5-1.6-39.2-2-45.3-.6l-3.3.8 5.5 5.4 5.5 5.5 24.8.1c22.3.2 25.9.5 36.3 2.7 6.4 1.4 16.1 4.3 21.5 6.5 6.9 2.8 10.2 3.7 10.7 2.9 1.4-2.1.8-9.7-1.1-13.5-3.6-6.9-14-15.5-26.3-21.6-21-10.3-46.3-14.5-68.3-11.4m91.6 43.6c.8.9-.5.2-2.8-1.7-2.4-1.8-4.3-3.5-4.3-3.7 0-.7 5.6 3.5 7.1 5.4M37.4 89c-3 1.2-4.8 5.9-3.5 9.3 2.1 5.4 10.3 5.7 12.9.4 1.3-2.8.8-7-1.2-8.6-1.8-1.5-5.9-2.1-8.2-1.1"/></g></svg>
      </a>
    </div>
    <div class="header-nav">
      <a href="/blog/" class="header-nav-item">
        <p>
          Blog
        </p>
      </a>
      <a href="/software/" class="header-nav-item">
        <p>
          Softwares
        </p>
      </a>
      <a href="/games/" class="header-nav-item">
        <p>
          Games
        </p>
      </a>
      <a href="https://github.com/Concave-Beak" class="header-nav-item" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github-icon lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
      </a>
      <div  class="header-nav-item">
        <button data-theme-toggle>
          <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-icon lucide-moon"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>
          <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
        </button>
      </div>
    </div>
  `
  loadThemeButton()

}
