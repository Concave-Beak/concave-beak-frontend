import './articles.css';
import { type EventManagerUnsubscribeFunction } from '../../../utils/events/event-manager';
import { templateLoader } from '../../../utils/templating/template-loader';
import articleTemplate from './articles.template.html?raw';

import { ArticleHomePage } from '../../../types/articles/article-home-page';

const articles: ArticleHomePage[] = [
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
    private _template: string = '';
    private unsubscribe: EventManagerUnsubscribeFunction[] = [];
    private _filledHtml!: DocumentFragment;

    get filledHtml() {
        return this._filledHtml;
    }

    async init() {
        this.loadTemplate();
        this.fillTemplate();
        this.bindEvents();
    }

    private fillTemplate() {
        const fragment = document.createDocumentFragment();

        for (const article of articles) {
            fragment.append(
                templateLoader.fillTemplate(this._template, article.toJson()),
            );
        }

        this._filledHtml = fragment;
    }

    private loadTemplate() {
        this._template = articleTemplate.trim();
    }

    private bindEvents() {}

    destroy() {
        for (const unsub of this.unsubscribe) {
            unsub();
        }
        this.unsubscribe = [];
    }
}
