import { eventManager, type EventManagerUnsubscribeFunc } from "../../../utils/events/event-manager";
import "./theme-button.css"

export class ThemeButtonComponent {
  private button: HTMLButtonElement | null = null;
  private unsubscribe: EventManagerUnsubscribeFunc[] = [];

  async init() {
    this.findButton();
    this.bindEvents();
  }

  private findButton() {
    this.button = document.querySelector('#theme-button');
  }

  private bindEvents() {
    this.unsubscribe.push(eventManager.onDOM('click', () => this.toggleTheme(), { target: this.button! }));
  }

  private toggleTheme() {
    const html = document.documentElement
    const nextTheme = html.dataset.theme === "dark" ? "light" : "dark"

    html.dataset.theme = nextTheme
    localStorage.setItem("theme", nextTheme)
  }

  destroy() {
    this.unsubscribe.forEach(unsub => unsub());
    this.unsubscribe = [];
  }
}
