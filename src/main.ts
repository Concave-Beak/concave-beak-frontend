import "./styles/base.css"
import "./styles/globals.css"
import { utils } from "./utils/theme/saved-theme"

import { FooterComponent } from "./components/footer/footer.ts";
import { HeaderComponent } from "./components/header/header.ts";
import { HomePage } from "./features/home-page/home-page.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="app-header" class="app-header"></div>
  <div id="home-page-content" class="home-page-content"></div>
  <div id="app-footer" class="app-footer"></div>
`;

async function initApp() {
  utils.loadSavedTheme();

  const components = [
    new HeaderComponent(),
    new FooterComponent(),
    new HomePage(),
  ];

  await Promise.all(components.map(comp => comp.init()));
}

document.addEventListener('DOMContentLoaded', initApp);
