import "./home-page.css"
import homePageTemplate from "./home-page.template.html?raw"

import { HomePageArticles } from "./articles/articles";
import { HomePageBanner } from "./banner/banner";

export class HomePage {
  private template: string = "";
  private element: HTMLElement | null = null;
  private banner: HomePageBanner = new HomePageBanner();
  private articles: HomePageArticles = new HomePageArticles();

  async init() {
    this.loadTemplate();
    this.render();
    await this.loadComponents();
    this.bindEvents();
  }

  private loadTemplate() {
    this.template = homePageTemplate;
  }

  private render() {
    const container = document.querySelector('#home-page-content');
    if (container) {
      container.innerHTML = this.template;
      this.element = container.firstElementChild as HTMLElement;
    }
  }

  private async loadComponents() {
    this.banner.init();
    this.articles.init();
  }

  private bindEvents() { }

  destroy() {
    this.banner.destroy();
    this.articles.destroy();
  }
}
