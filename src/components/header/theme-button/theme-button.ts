import "./theme-button.css"

export class ThemeButtonComponent {
  private button: HTMLButtonElement | null = null;

  async init() {
    this.findButton();
    this.bindEvents();
  }

  private findButton() {
    this.button = document.querySelector('#theme-button');
  }

  private bindEvents() {
    /* TODO use event manager */
    this.button?.addEventListener('click', () => this.toggleTheme());
  }

  private toggleTheme() {
    const html = document.documentElement
    const nextTheme = html.dataset.theme === "dark" ? "light" : "dark"

    html.dataset.theme = nextTheme
    localStorage.setItem("theme", nextTheme)
  }
}
