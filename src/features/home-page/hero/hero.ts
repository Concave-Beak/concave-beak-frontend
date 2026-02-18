import './hero.css';
import heroTemplate from './hero.template.html?raw';

import {
    eventManager,
    type EventManagerUnsubscribeFunction,
} from '../../../utils/events/event-manager';
import { templateLoader } from '../../../utils/templating/template-loader';

const heroes = [
    {
        title: 'Title',
        description: 'lorrem',
        imageUrl: '/toucan-shannon-potter-unsplash.jpg',
    },
];

const HERO_SCROLL_HEIGHT_MULTIPLIER = 1.3;
const HERO_SCROLL_HEIGHT_MIN = 1;
const HERO_OPACITY_MIN = 1;
const HERO_Y_MULTIPLIER = -50;
const HERO_BLUR_MULTIPLER = 3;

const TEXT_OPACITY_MIN = 1;
const TEXT_OPACITY_MULTIPLIER = 1.5;
const TEXT_Y_MULTIPLER = -100;

export class HomePageHero {
    private _template: string = '';
    private _filledHtml!: DocumentFragment;
    private unsubscribe: EventManagerUnsubscribeFunction[] = [];

    get filledHtml() {
        return this._filledHtml;
    }

    async init() {
        this.loadTemplate();
        this.fillTemplate();
        this.bindEvents();
    }

    private loadTemplate() {
        this._template = heroTemplate.trim();
    }

    private fillTemplate() {
        const fragment = document.createDocumentFragment();

        for (const hero of heroes) {
            fragment.append(templateLoader.fillTemplate(this._template, hero));
        }

        this._filledHtml = fragment;
    }

    private bindEvents() {
        this.unsubscribe.push(
            eventManager.onDOM('scroll', this.scrollHideHero, {
                target: globalThis,
            }),
        );
    }

    private scrollHideHero() {
        const hero = document.querySelector<HTMLDivElement>('.home-page-hero');
        const heroHeight = hero!.offsetHeight;
        let ticking = false;

        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollTop = globalThis.pageYOffset;
                const progress = Math.min(
                    (scrollTop / heroHeight) * HERO_SCROLL_HEIGHT_MULTIPLIER,
                    HERO_SCROLL_HEIGHT_MIN,
                );

                hero!.style.opacity = (HERO_OPACITY_MIN - progress).toString();
                hero!.style.transform = `translateY(${progress * HERO_Y_MULTIPLIER}px)`;
                hero!.style.filter = `blur(${progress * HERO_BLUR_MULTIPLER}px)`;

                const text = hero!.querySelector<HTMLDivElement>('.hero-text');
                if (text) {
                    text!.style.opacity = (
                        TEXT_OPACITY_MIN -
                        progress * TEXT_OPACITY_MULTIPLIER
                    ).toString();
                    text.style.transform = `translate(-50%, ${progress * TEXT_Y_MULTIPLER}px)`;
                }

                ticking = false;
            });
            ticking = true;
        }
    }

    destroy() {
        for (const unsub of this.unsubscribe) {
            unsub();
        }
        this.unsubscribe = [];
    }
}
