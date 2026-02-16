import { dateFormatDMY } from "../../../src/utils/formatting/date-formatting";

export class Article {
  protected _lastUpdate: string;

  constructor(protected _link: string, protected _title: string, protected _imageUrl: string, protected _snippet: string, protected _content: string, date: Date) {
    if (!_link || !_title || !_content || !date) {
      throw Error("Invalid article");
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

  toRecord(): Record<string, any> {
    return {
      link: this._link,
      title: this._title,
      imageUrl: this._imageUrl,
      snippet: this._snippet,
      content: this._content,
      lastUpdate: this._lastUpdate
    };
  }
}
