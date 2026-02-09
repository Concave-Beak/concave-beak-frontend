import bannerTemplate from "./banner.template.html?raw"
import { eventManager, type EventManagerUnsubscribeFunc } from "../../../utils/events/event-manager";

export class HomePageBanner {
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
    container.innerHTML = bannerTemplate;
    this.template = container as HTMLElement;
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
