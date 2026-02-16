import './banner.css';
import {
    eventManager,
    type EventManagerUnsubscribeFunction,
} from '../../../utils/events/event-manager';
import { templateLoader } from '../../../utils/templating/template-loader';

const bannerFilledTemplate = {
    title: 'Title',
    description: 'lorrem',
    imageUrl: '/toucan-shannon-potter-unsplash.jpg',
};

const BANNER_SCROLL_HEIGHT_MULTIPLIER = 1.3;
const BANNER_SCROLL_HEIGHT_MIN = 1;
const BANNER_OPACITY_MIN = 1;
const BANNER_Y_MULTIPLIER = -50;
const BANNER_BLUR_MULTIPLER = 3;

const TEXT_OPACITY_MIN = 1;
const TEXT_OPACITY_MULTIPLIER = 1.5;
const TEXT_Y_MULTIPLER = -100;

export class HomePageBanner {
    private _template: HTMLElement | undefined = undefined;
    private unsubscribe: EventManagerUnsubscribeFunction[] = [];

    get template(): HTMLElement | undefined {
        return this._template;
    }

    async init() {
        this.loadTemplate();
        this.bindEvents();
    }

    loadTemplate() {
        this._template = templateLoader.fillTemplate(
            '#home-page-banner',
            bannerFilledTemplate,
        );
    }

    bindEvents() {
        this.unsubscribe.push(
            eventManager.onDOM('scroll', this.scrollHideBanner, {
                target: globalThis,
            }),
        );
    }

    private scrollHideBanner() {
        const banner =
            document.querySelector<HTMLDivElement>('.home-page-banner');
        const bannerHeight = banner!.offsetHeight;
        let ticking = false;

        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollTop = globalThis.pageYOffset;
                const progress = Math.min(
                    (scrollTop / bannerHeight) *
                        BANNER_SCROLL_HEIGHT_MULTIPLIER,
                    BANNER_SCROLL_HEIGHT_MIN,
                );

                banner!.style.opacity = (
                    BANNER_OPACITY_MIN - progress
                ).toString();
                banner!.style.transform = `translateY(${progress * BANNER_Y_MULTIPLIER}px)`;
                banner!.style.filter = `blur(${progress * BANNER_BLUR_MULTIPLER}px)`;

                const text =
                    banner!.querySelector<HTMLDivElement>('.banner-text');
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
