import articlesTemplate from "./articles.template.html?raw"
import { type EventManagerUnsubscribeFunc } from "../../../utils/events/event-manager";

export class HomePageArticles {
  private template: HTMLElement | null = null;
  private unsubscribe: EventManagerUnsubscribeFunc[] = [];

  getTemplate(): HTMLElement | null {
    return this.template;
  }

  async init() {
    this.loadTemplate();
    this.bindEvents();
  }

  loadTemplate() {
    const container = document.createElement('div');
    container.innerHTML = articlesTemplate;
    this.template = container as HTMLElement;
  }

  bindEvents() { }

  destroy() {
    this.unsubscribe.forEach(unsub => unsub());
    this.unsubscribe = [];
  }
}
