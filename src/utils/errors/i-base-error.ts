export type ErrorType = 'info' | 'warning' | 'error';

export type ErrorContext =
    | 'home_page.hero_section.images'
    | 'home_page.hero_section.title'
    | 'home_page.articles.load';

export type ErrorPresentation = 'console' | 'toast' | 'modal';

export interface IBaseError {
    severity: ErrorType;
    code: number;
    context: ErrorContext;
    message: string;
    presentation?: ErrorPresentation;

    toJson(): Record<string, unknown>;
}
