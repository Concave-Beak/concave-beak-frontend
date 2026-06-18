import { dateFormatDMY } from '../../../src/utils/formatting/date-formatting';
import { errorHandler } from '../../utils/errors/error-handler';
import { InternalServerErrorError } from '../../utils/errors/models/internal-server-error-error';

export class Article {
    protected _lastUpdate: string;

    constructor(
        protected _link: string,
        protected _title: string,
        protected _imageUrl: string,
        protected _snippet: string,
        protected _content: string,
        date: Date,
    ) {
        if (!_link || !_title || !_content || !date) {
            errorHandler.throw(
                new InternalServerErrorError(
                    'home_page.articles.load',
                    'Could not load article, missing or corrupted data',
                    'toast',
                ),
            );
            this._lastUpdate = '';
            return;
        }
        this._lastUpdate = dateFormatDMY(date);
    }

    get link() {
        return this._link;
    }

    get image() {
        return this._imageUrl;
    }

    get content() {
        return this._content;
    }

    get date() {
        return this._lastUpdate;
    }

    toJson(): Record<string, unknown> {
        return {
            link: this._link,
            title: this._title,
            imageUrl: this._imageUrl,
            snippet: this._snippet,
            content: this._content,
            lastUpdate: this._lastUpdate,
        };
    }
}
