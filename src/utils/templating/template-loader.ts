class TemplateLoader {
  private fillKeys(html: string, data: Record<string, any>): string {
    let renderedHtml = html;

    Object.keys(data).forEach(key => {
      const placeholder = `{{${key}}}`;
      renderedHtml = renderedHtml.replace(
        new RegExp(placeholder, 'g'),
        data[key] !== null && data[key] !== undefined
          ? String(data[key])
          : ''
      );
    });

    // remove leftovers
    renderedHtml = renderedHtml.replace(/\{\{.*?\}\}/g, '');

    return renderedHtml;
  }

  fillTemplate(sourceElementId: string, data: Record<string, any>): HTMLElement {
    const element = document.getElementById(sourceElementId);

    if (!element) {
      throw new Error(`Element with id "${sourceElementId}" not found`);
    }

    let html: string;

    if (element instanceof HTMLTemplateElement) {
      const container = document.createElement('div');
      container.appendChild(element.content.cloneNode(true));
      html = container.innerHTML;
    } else {
      html = element.outerHTML;
    }

    const renderedHtml = this.fillKeys(html, data);

    const wrapper = document.createElement('div');
    wrapper.innerHTML = renderedHtml;

    return wrapper.firstElementChild as HTMLElement || wrapper;
  }

}

export const templateLoader = new TemplateLoader();
