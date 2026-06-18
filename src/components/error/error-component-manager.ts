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

        // Always prints in the console, in case it's specifies 'console' then
        // it ONLY gets printed in the console
        this.printConsole(errorObject);
        switch (errorObject.presentation) {
            case 'console':
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
