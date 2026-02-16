import './home-page.css';
import homePageTemplate from './home-page.template.html?raw';

import { HomePageArticles } from './articles/articles';
import { HomePageBanner } from './banner/banner';

export class HomePage {
    private template: string = '';
    private element: HTMLElement | undefined = undefined;
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
        await Promise.all([this.banner.init(), this.articles.init()]);

        const bannerContainer = document.querySelector('#home-page-banner');
        const articlesContainer = document.querySelector(
            '#home-page-articles-list',
        );

        if (bannerContainer && this.banner.template) {
            bannerContainer.replaceWith(this.banner.template!);
        }

        if (articlesContainer && this.articles.template) {
            articlesContainer.replaceChildren(this.articles.template);
        }
    }

    private bindEvents() {}

    destroy() {
        this.banner.destroy();
        this.articles.destroy();
    }
}
