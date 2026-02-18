import {
    eventManager,
    type EventManagerUnsubscribeFunction,
} from '../../../utils/events/event-manager';
import './theme-button.css';

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

        const nextTheme = html.dataset.theme === 'dark' ? 'light' : 'dark';

        html.dataset.theme = nextTheme;
        localStorage.setItem('theme', nextTheme);

        eventManager.emit('theme:toggle', { isDark: nextTheme === 'dark' });
    }

    destroy() {
        for (const unsub of this.unsubscribe) {
            unsub();
        }
        this.unsubscribe = [];
    }
}
