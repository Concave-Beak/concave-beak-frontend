import "./theme-button.css"

export class ThemeButtonComponent {
  private button: HTMLButtonElement | null = null;

  async init() {
    this.findButton();
    this.bindEvents();
    this.updateButtonState();
  }

  private findButton() {
    this.button = document.querySelector('#theme-toggle');
  }

  private bindEvents() {
    this.button?.addEventListener('click', () => this.toggleTheme());
  }

  private toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    this.updateButtonState();
  }

  private updateButtonState() {
    if (!this.button) return;
    const isDark = document.documentElement.classList.contains('dark-theme');
    this.button.setAttribute('aria-pressed', isDark.toString());
  }
}
