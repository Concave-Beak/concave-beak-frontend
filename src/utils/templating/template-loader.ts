import { INDEX_NOT_FOUND } from '../common';

class TemplateLoader {
    private fillBrackets(htmlString: string): string {
        const INDEX_START_OFFSET = 2;
        const INDEX_END_OFFSET = 2;

        while (htmlString.includes('{{')) {
            const start = htmlString.indexOf('{{');
            const end = htmlString.indexOf('}}', start + INDEX_START_OFFSET);
            if (end === INDEX_NOT_FOUND) {
                break;
            }
            htmlString =
                htmlString.slice(0, start) +
                htmlString.slice(end + INDEX_END_OFFSET);
        }
        return htmlString;
    }

    private fillKeys(html: string, data: Record<string, unknown>): string {
        let renderedHtml = html;

        for (const key of Object.keys(data)) {
            const placeholder = `{{${key}}}`;
            renderedHtml = renderedHtml.replaceAll(
                new RegExp(placeholder, 'g'),
                data[key] !== null && data[key] !== undefined
                    ? String(data[key])
                    : '',
            );
        }

        renderedHtml = this.fillBrackets(renderedHtml);

        return renderedHtml;
    }

    fillTemplate(
        sourceElementId: string,
        data: Record<string, unknown>,
    ): HTMLElement {
        const element = document.querySelector(sourceElementId);

        if (!element) {
            throw new Error(`Element with id "${sourceElementId}" not found`);
        }

        let html: string;

        if (element instanceof HTMLTemplateElement) {
            const container = document.createElement('div');
            container.append(element.content.cloneNode(true));
            html = container.innerHTML;
        } else {
            html = element.outerHTML;
        }

        const renderedHtml = this.fillKeys(html, data);

        const wrapper = document.createElement('div');
        wrapper.innerHTML = renderedHtml;

        return (wrapper.firstElementChild as HTMLElement) || wrapper;
    }
}

export const templateLoader = new TemplateLoader();
