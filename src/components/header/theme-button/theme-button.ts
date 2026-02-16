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
    const logo = document.querySelector<HTMLElement>(".header-logo svg")

    const nextTheme = html.dataset.theme === "dark" ? "light" : "dark"

    html.dataset.theme = nextTheme
    localStorage.setItem("theme", nextTheme)

    if (!logo) return

    const chance = Math.floor((Math.random() * 3) + 1);

    if (chance % 3 == 0) {

      logo.classList.add("logo-spin")

      setTimeout(() => {
        logo?.classList.remove("logo-spin")
      }, 1000)
      return;
    }

    logo.classList.add("logo-shake")

    setTimeout(() => {
      logo?.classList.remove("logo-shake")
    }, 500)
  }

  destroy() {
    this.unsubscribe.forEach(unsub => unsub());
    this.unsubscribe = [];
  }
}
