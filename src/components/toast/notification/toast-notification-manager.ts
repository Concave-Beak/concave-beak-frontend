import { eventManager } from '../../../utils/events/event-manager';
import { templateLoader } from '../../../utils/templating/template-loader';
import './toast.css';

export abstract class ToastNotification {
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

export class ToastNotificationManager {
    _element: HTMLElement | undefined = undefined;

    constructor() {}

    init() {
        this.loadElement();
        this.bindEvents();
    }

    private loadElement() {
        const container = document.querySelector('#app-toast');
        if (!container) {
            return;
        }
        this._element = container as HTMLElement;
    }

    private pushToast(data: { notificationObject: object }) {
        const notification = data.notificationObject as ToastNotification;

        const toastElement = templateLoader.fillTemplateElement(
            notification.template,
            notification.data,
        ) as HTMLElement;

        const toastItem = document.createElement('div');
        toastItem.classList.add('toast-item');

        this._element!.append(toastItem);
        toastItem.append(toastElement);

        setTimeout(() => {
            toastItem.classList.add('fade-out-right');

            setTimeout(() => {
                toastItem.remove();
            }, 300); // CSS transition duration
        }, 5000);
    }

    bindEvents() {
        eventManager.on(
            'notification:error',
            (data: { notificationObject: object }) => {
                this.pushToast(data);
            },
        );
    }
}
