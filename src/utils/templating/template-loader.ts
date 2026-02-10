class TemplateLoader {
  fillTemplate(sourceElementId: string, data: Record<string, any>): HTMLElement {
    const sourceElement = document.getElementById(sourceElementId);
    if (!sourceElement) {
      throw new Error(`Element with id "${sourceElementId}" not found`);
    }

    const clone = sourceElement.cloneNode(true) as HTMLElement;
    const html = clone.outerHTML;

    // Template variable replacement
    let renderedHtml = html;
    Object.keys(data).forEach(key => {
      const placeholder = `{{${key}}}`;
      renderedHtml = renderedHtml.replace(
        new RegExp(placeholder, 'g'),
        data[key] !== null && data[key] !== undefined ? String(data[key]) : ''
      );
    });

    // Clean up any unreplaced placeholders
    renderedHtml = renderedHtml.replace(/\{\{.*?\}\}/g, '');

    const container = document.createElement('div');
    container.innerHTML = renderedHtml;

    return container.firstElementChild as HTMLElement || container;
  }
}

export const templateLoader = new TemplateLoader();
