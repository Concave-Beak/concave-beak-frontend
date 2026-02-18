import { INDEX_NOT_FOUND } from '../common';

class TemplateLoader {
    private eraseBrackets(htmlString: string): string {
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

        renderedHtml = this.eraseBrackets(renderedHtml);

        return renderedHtml;
    }

    fillTemplate(source: string, data: Record<string, unknown>): HTMLElement {
        const renderedHtml = this.fillKeys(source, data);

        const template = document.createElement('template');
        template.innerHTML = renderedHtml.trim();

        return template.content.cloneNode(true) as HTMLElement;
    }
}

export const templateLoader = new TemplateLoader();
