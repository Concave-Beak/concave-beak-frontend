import { templateLoader } from '../../../utils/templating/template-loader';

export abstract class ToastNotification {
    // Data should contain the keys and their respective values
    get template() {
        return this._template;
    }

    get data() {
        return this._data;
    }

    constructor(
        private _template: string,
        private _data: Record<string, unknown>,
    ) {}
}

class ToastNotificationManager {
    _element: HTMLElement | undefined = undefined;

    constructor() {
        this.loadElement();
    }

    loadElement() {
        const container = document.querySelector('#app-toast');
        if (!container) {
            return;
        }
        this._element = container.firstElementChild as HTMLElement;
    }

    pushToast(notification: ToastNotification) {
        this._element!.append(
            templateLoader.fillTemplate(
                notification.template,
                notification.data,
            ),
        );
    }
}

export const toastNotificationManager = new ToastNotificationManager();
