import type { IBaseError } from '../../utils/errors/i-base-error';
import {
    eventManager,
    type EventManagerUnsubscribeFunction,
} from '../../utils/events/event-manager';
import { ErrorToastNotification } from '../toast/error/error-toast';

export class ErrorComponentManager {
    private unsubscribe: EventManagerUnsubscribeFunction[] = [];

    constructor() {}

    init() {
        this.bindEvents();
    }

    private bindEvents() {
        this.unsubscribe.push(
            eventManager.on('app:error', (data: { errorObject: object }) => {
                this.handleError(data);
            }),
        );
    }

    private handleError(data: { errorObject: object }) {
        const errorObject = data.errorObject as IBaseError;

        switch (errorObject.presentation) {
            case 'console':
                this.printConsole(errorObject);
                break;
            case 'toast':
                this.pushToast(errorObject);
                break;
            case 'modal':
        }
    }

    private printConsole(error: IBaseError) {
        console.error(
            `${error.severity.toUpperCase()}: (${error.context}) ${error.message} (${error.code})`,
        );
    }

    private pushToast(error: IBaseError) {
        eventManager.emit('notification:error', {
            notificationObject: new ErrorToastNotification(error),
        });
    }

    destroy() {
        for (const unsub of this.unsubscribe) {
            unsub();
        }
        this.unsubscribe = [];
    }
}
