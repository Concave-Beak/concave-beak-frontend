import './home-page.css';
import homePageTemplate from './home-page.template.html?raw';

import { HomePageArticles } from './articles/articles';
import { HomePageHero } from './hero/hero';

export class HomePage {
    private template: string = '';
    private element: HTMLElement | undefined = undefined;
    private hero: HomePageHero = new HomePageHero();
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
        await Promise.all([this.hero.init(), this.articles.init()]);

        const heroContainer = document.querySelector('#home-page-hero');
        const articlesContainer = document.querySelector(
            '#home-page-articles-list',
        );

        if (heroContainer && this.hero.filledHtml) {
            heroContainer.replaceChildren(this.hero.filledHtml);
        }

        if (articlesContainer && this.articles.filledHtml) {
            articlesContainer.replaceChildren(this.articles.filledHtml);
        }
    }

    private bindEvents() {}

    destroy() {
        this.hero.destroy();
        this.articles.destroy();
    }
}
