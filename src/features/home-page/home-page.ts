import homePageTemplate from "./home-page.template.html?raw"
import "./home-page.css"

export class HomePage {
  private template: string = "";
  private element: HTMLElement | null = null;

  async init() {
    this.loadTemplate();
    this.render();
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

  private bindEvents() { }
}

function scrollHideBanner() {
  const banner = document.querySelector<HTMLDivElement>('.home-page-banner');
  const bannerHeight = banner!.offsetHeight;
  let ticking = false;

  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollTop = window.pageYOffset;
      const progress = Math.min(scrollTop / bannerHeight * 2, 1);

      banner!.style.opacity = (1 - progress).toString();
      banner!.style.transform = `translateY(${progress * -50}px)`;
      banner!.style.filter = `blur(${progress * 3}px)`;

      const text = banner!.querySelector<HTMLDivElement>('.banner-text');
      if (text) {
        text!.style.opacity = (1 - (progress * 1.5)).toString();
        text.style.transform = `translate(-50%, ${progress * -20}px)`;
      }

      ticking = false;
    });
    ticking = true;
  }

}

window.addEventListener('scroll', () => {
  scrollHideBanner();
});
