import footerTemplate from "./footer.template.html?raw"
import "./footer.css"

export class FooterComponent {
  private template: string = "";
  private element: HTMLElement | null = null;


  async init() {
    this.loadTemplate();
    this.render();
    this.bindEvents();
  }

  private loadTemplate() {
    this.template = footerTemplate;
  }

  private render() {
    const container = document.querySelector('#app-footer');
    if (container) {
      container.innerHTML = this.template;
      this.element = container.firstElementChild as HTMLElement;
    }
  }

  private bindEvents() { }
}
