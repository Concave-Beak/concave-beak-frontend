import type { IBaseError } from './i-base-error';

import { eventManager } from '../events/event-manager';

class ErrorHandler {
    errorStack!: IBaseError[];

    constructor() {
        this.errorStack = [];
    }

    public pushError(error: IBaseError) {
        this.errorStack.push(error);
    }

    public throw(error: IBaseError) {
        eventManager.emit('app:error', { errorObject: error });
    }

    public throwAll() {
        for (const error of this.errorStack) {
            this.throw(error);
        }
    }
}

export const errorHandler = new ErrorHandler();
