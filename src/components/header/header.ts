import headerTemplate from './header.template.html?raw';
import './header.css';
import { ThemeButtonComponent } from './theme-button/theme-button';

export class HeaderComponent {
    private template: string = '';
    private element: HTMLElement | undefined = undefined;
    private themeButton: ThemeButtonComponent = new ThemeButtonComponent();

    async init() {
        this.loadTemplate();
        this.render();
        this.bindEvents();
        this.themeButton.init();
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

    private bindEvents() {}
}
