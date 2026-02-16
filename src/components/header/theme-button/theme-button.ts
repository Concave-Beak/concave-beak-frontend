import {
    eventManager,
    type EventManagerUnsubscribeFunction,
} from '../../../utils/events/event-manager';
import './theme-button.css';

const LOGO_SPIN_CHANCE = 3;
const LOGO_SPIN_TIMEOUT = 1000;
const LOGO_SHAKE_TIMEOUT = 500;

export class ThemeButtonComponent {
    private button: HTMLButtonElement | undefined = undefined;
    private unsubscribe: EventManagerUnsubscribeFunction[] = [];

    async init() {
        this.findButton();
        this.bindEvents();
    }

    private findButton() {
        const button = document.querySelector('#theme-button');
        if (!button) {
            return;
        }
        this.button = button as HTMLButtonElement;
    }

    private bindEvents() {
        this.unsubscribe.push(
            eventManager.onDOM('click', this.toggleTheme, {
                target: this.button!,
            }),
        );
    }

    private toggleTheme() {
        const html = document.documentElement;
        const logo = document.querySelector<HTMLElement>('.header-logo svg');

        const nextTheme = html.dataset.theme === 'dark' ? 'light' : 'dark';

        html.dataset.theme = nextTheme;
        localStorage.setItem('theme', nextTheme);

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
