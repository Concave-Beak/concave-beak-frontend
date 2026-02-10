import { eventManager, type EventManagerUnsubscribeFunc } from "../../../utils/events/event-manager";
import { templateLoader } from "../../../utils/templating/template-loader";

// TODO use actual api
const bannerFilledTemplate = {
  title: "Title",
  description: "lorrem",
  imageUrl: '/toucan-shannon-potter-unsplash.jpg',
}

export class HomePageBanner {
  private _template: HTMLElement | null = null;
  private unsubscribe: EventManagerUnsubscribeFunc[] = [];

  get template(): HTMLElement | null {
    return this._template;
  }

  async init() {
    this.loadTemplate();
    this.bindEvents();
  }

  loadTemplate() {
    this._template = templateLoader.fillTemplate('home-page-banner', {
      title: bannerFilledTemplate.title,
      description: bannerFilledTemplate.description,
      imageUrl: bannerFilledTemplate.imageUrl
    })
  }

  bindEvents() {
    this.unsubscribe.push(eventManager.onDOM('scroll', () => this.scrollHideBanner(), { target: window }));
  }

  private scrollHideBanner() {
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

  destroy() {
    this.unsubscribe.forEach(unsub => unsub());
    this.unsubscribe = [];
  }
}
