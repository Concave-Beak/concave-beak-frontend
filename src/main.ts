import "./style.css";
import { loadFooter } from "./shared/footer.ts";
import { loadHeader } from "./shared/header.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="app-header" class="app-header"></div>
  <div id="app-footer"></div>
`;

loadHeader();
loadFooter();
