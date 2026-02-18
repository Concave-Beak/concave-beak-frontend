import { eventManager } from '../events/event-manager';

export type ErrorContext =
    | 'home_page.hero_section.images'
    | 'home_page.hero_section.title';

export interface IErrorObject {
    severity: 'info' | 'low' | 'medium' | 'high';
    code: number;
    context: ErrorContext;
    message: string;
    presentation?: 'console' | 'toast' | 'modal';

    toJson(): Record<string, unknown>;
}

class ErrorHandler {
    errorStack!: IErrorObject[];

    constructor() {
        this.errorStack = [];
    }

    public pushError(error: IErrorObject) {
        this.errorStack.push(error);
    }

    public throw(error: IErrorObject) {
        eventManager.emit('app:error', { errorObject: error });
    }

    public throwAll() {
        for (const error of this.errorStack) {
            this.throw(error);
        }
    }
}

export const errorHandler = new ErrorHandler();
