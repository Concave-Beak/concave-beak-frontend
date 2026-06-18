import headerTemplate from './header.template.html?raw';
import { templateLoader } from '../../utils/templating/template-loader'
import './header.css';
import { ThemeButtonComponent } from './theme-button/theme-button';
import {
    eventManager,
    type EventManagerUnsubscribeFunction,
} from '../../utils/events/event-manager';

import logoSvg from "/concave-beak-open.svg?raw"
import lucideCodeIcon from "/lucide-code-icon.svg?raw"
import lucideMoonIcon from "/lucide-moon-icon.svg?raw"
import lucideSunIcon from "/lucide-sun-icon.svg?raw"

const LOGO_SPIN_CHANCE = 3;
const LOGO_SPIN_TIMEOUT = 1000;
const LOGO_SHAKE_TIMEOUT = 500;

const HEADER_TEMPLATE_DATA: Record<string, unknown> = {
    logoSvg: logoSvg,
    lucideCodeIcon: lucideCodeIcon,
    lucideMoonIcon: lucideMoonIcon,
    lucideSunIcon: lucideSunIcon
};

export class HeaderComponent {
    private template: string = '';
    private element: HTMLElement | undefined = undefined;
    private themeButton: ThemeButtonComponent = new ThemeButtonComponent();
    private unsubscribe: EventManagerUnsubscribeFunction[] = [];

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
        if (!container) {
            return;
        }

        const filledElement = templateLoader.fillKeys(
            this.template,
            HEADER_TEMPLATE_DATA,
        );

        container.innerHTML = filledElement;
        this.element = container.firstElementChild as HTMLElement;
    }

    private bindEvents() {
        eventManager.on('theme:toggle', this.logoShake);
    }

    private logoShake() {
        const logo = document.querySelector<HTMLElement>('.header-logo svg');

        if (!logo) {
            return;
        }

        // Disable warning since this is not critical.
        // eslint-disable-next-line sonarjs/pseudo-random
        const chance = Math.floor(Math.random() * LOGO_SPIN_CHANCE + 1);

        if (chance % LOGO_SPIN_CHANCE === 0) {
            logo.classList.add('logo-spin');

            setTimeout(() => {
                logo?.classList.remove('logo-spin');
            }, LOGO_SPIN_TIMEOUT);
            return;
        }

        logo.classList.add('logo-shake');

        setTimeout(() => {
            logo?.classList.remove('logo-shake');
        }, LOGO_SHAKE_TIMEOUT);
    }

    destroy() {
        for (const unsub of this.unsubscribe) {
            unsub();
        }
        this.unsubscribe = [];
    }
}
