import headerTemplate from "./header.template.html?raw"
import "./header.css";

export class Header {
  private template: string = "";
  private element: HTMLElement | null = null;

  async init() {
    this.loadTemplate();
    this.render();
    this.bindEvents();
  }

  private loadTemplate() {
    this.template = headerTemplate;
  }

  private render() {
    const container = document.querySelector('#app-header');
    if (container) {
      container.innerHTML = this.template;
      this.element = container.firstElementChild as HTMLElement;
    }
  }

  private bindEvents() { }
}
