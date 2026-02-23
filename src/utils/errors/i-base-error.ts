export type ErrorSeverity = 'info' | 'warning' | 'high';

export type ErrorContext =
    | 'home_page.hero_section.images'
    | 'home_page.hero_section.title'
    | 'home_page.articles.load';

export type ErrorPresentation = 'console' | 'toast' | 'modal';

export interface IBaseError {
    severity: ErrorSeverity;
    code: number;
    context: ErrorContext;
    message: string;
    presentation?: ErrorPresentation;

    toJson(): Record<string, unknown>;
}
