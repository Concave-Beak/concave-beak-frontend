import {
    type ErrorContext,
    type ErrorPresentation,
    type ErrorType,
    type IBaseError,
} from '../i-base-error';

const contextMap: Record<ErrorContext, string> = {
    'home_page.hero_section.images': 'Home Page Hero Images',
    'home_page.hero_section.title': 'Home Page Hero Title',
    'home_page.articles.load': 'Home Page Article Loading',
};

export class InternalServerErrorError implements IBaseError {
    severity: ErrorType;
    code: number;

    constructor(
        public context: ErrorContext,
        public message: string,
        public presentation: ErrorPresentation,
    ) {
        this.severity = 'error';
        this.code = 500;
    }

    toJson(): Record<string, unknown> {
        return {
            severity: this.severity.toUpperCase(),
            code: this.code,
            context: contextMap[this.context],
            message: this.message,
        };
    }
}
