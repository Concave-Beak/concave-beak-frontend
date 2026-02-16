import './articles.css';
import { type EventManagerUnsubscribeFunction } from '../../../utils/events/event-manager';
import { templateLoader } from '../../../utils/templating/template-loader';

import { ArticleHomePage } from '../../../types/articles/article-home-page';

const articlesFilledTemplate: ArticleHomePage[] = [
    new ArticleHomePage(
        'link1',
        'quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi.',
        '/makaw-caio_delarolle.jpg',
        'snippet',
        'Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus blandit quis suspendisse aliquet nisi sodales consequat magna ante condimentum neque at luctus nibh finibus facilisis dapibus etiam interdum tortor ligula congue sollicitudin erat viverra ac tincidunt nam porta elementum a enim euismod quam justo lectus commodo augue arcu dignissim velit aliquam imperdiet mollis nullam volutpat porttitor ullamcorper rutrum gravida.',
        new Date(),
    ),
    new ArticleHomePage(
        'link2',
        'Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi.',
        '/makaw-caio_delarolle.jpg',
        'snippet',
        'Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus blandit quis suspendisse aliquet nisi sodales consequat magna ante condimentum neque at luctus nibh finibus facilisis dapibus etiam interdum tortor ligula congue sollicitudin erat viverra ac tincidunt nam porta elementum a enim euismod quam justo lectus commodo augue arcu dignissim velit aliquam imperdiet mollis nullam volutpat porttitor ullamcorper rutrum gravida.',
        new Date(),
    ),
];

export class HomePageArticles {
    private _template?: DocumentFragment;
    private unsubscribe: EventManagerUnsubscribeFunction[] = [];

    get template(): DocumentFragment {
        return this._template!;
    }

    async init() {
        this.loadTemplate();
        this.bindEvents();
    }

    loadTemplate() {
        const fragment = document.createDocumentFragment();

        articlesFilledTemplate.forEach((article) => {
            console.log(article);
            fragment.appendChild(
                templateLoader.fillTemplate(
                    '#home-page-articles-template',
                    article.toRecord(),
                ),
            );
        });

        this._template = fragment;
    }

    bindEvents() {}

    destroy() {
        this.unsubscribe.forEach((unsub) => unsub());
        this.unsubscribe = [];
    }
}
