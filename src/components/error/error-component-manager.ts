import type { IErrorObject } from '../../utils/errors/error-handler';
import { eventManager } from '../../utils/events/event-manager';

class ErrorComponentManager {
    constructor() {}

    bindEvents() {
        eventManager.on('app:error', this.handleError);
    }

    handleError(error: object) {
        const errorObject = error as IErrorObject;

        switch (errorObject.presentation) {
            case 'console': {
                this.printConsole(errorObject);
                break;
            }
            case 'toast': {
                this.pushToast(errorObject);
                break;
            }
        }
    }

    printConsole(error: IErrorObject) {
        console.log(
            `${error.severity.toUpperCase()}: (${error.context}) ${error.message} (${error.code})`,
        );
    }

    pushToast(error: IErrorObject) {}
}

export const errorComponentManager = new ErrorComponentManager();
