import "./style.css";
import "./styles/base.css"
import "./styles/globals.css"

import { FooterComponent } from "./components/footer/footer.ts";
import { HeaderComponent } from "./components/header/header.ts";
import { HomePage } from "./features/home-page/home-page.ts";

const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null


if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  document.documentElement.dataset.theme = prefersDark ? "dark" : "light"
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="app-header" class="app-header"></div>
  <div id="home-page-content" class="home-page-content"></div>
  <div id="app-footer" class="app-footer"></div>
`;

async function initApp() {
  const components = [
    new HeaderComponent(),
    new FooterComponent(),
    new HomePage(),
  ];

  await Promise.all(components.map(comp => comp.init()));
}

document.addEventListener('DOMContentLoaded', initApp);
