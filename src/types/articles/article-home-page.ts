import { Article } from "./article"

import { stringFormatMaxLength } from "../../utils/formatting/string-formatting";

const HOME_PAGE_MAX_SNIPPET_CONTENT_LEN = 400;

export class ArticleHomePage extends Article {
  constructor(link: string, title: string, imageUrl: string, snippet: string, content: string, date: Date) {
    super(link, title, imageUrl, snippet, content, date);
    this.formatHomePage();
  }

  private formatHomePage() {
    this._content = stringFormatMaxLength(this._content, HOME_PAGE_MAX_SNIPPET_CONTENT_LEN, true)
  }
}
