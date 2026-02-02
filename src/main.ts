import "./style.css";
import { loadFooter } from "./shared/footer.ts";
import { loadHeader } from "./shared/header.ts";
import { loadMainPageContent } from "./features/main-page-content.ts";

const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null


if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  document.documentElement.dataset.theme = prefersDark ? "dark" : "light"
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="app-header" class="app-header"></div>
  <div id="main-page-content" class="main-page-content"></div>
  <div id="app-footer"></div>
`;

loadHeader();
loadMainPageContent();
loadFooter();
