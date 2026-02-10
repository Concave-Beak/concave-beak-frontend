class TemplateLoader {
  pushDataToTemplate(templateId: string, data: Record<string, any>): HTMLElement {
    const template = document.getElementById(templateId) as HTMLTemplateElement;
    const html = template.innerHTML;

    // Simple template variable replacement
    let renderedHtml = html;
    Object.keys(data).forEach(key => {
      const placeholder = `{{${key}}}`;
      renderedHtml = renderedHtml.replace(new RegExp(placeholder, 'g'), data[key]);
    });
    console.log(renderedHtml);

    // Clean up any unreplaced placeholders
    renderedHtml = renderedHtml.replace(/\{\{.*?\}\}/g, '');

    const container = document.createElement('div');
    container.innerHTML = renderedHtml;


    return container as HTMLElement;
  }
}

export const templateLoader = new TemplateLoader();
