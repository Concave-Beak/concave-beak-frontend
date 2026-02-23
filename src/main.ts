import './styles/base.css';
import './styles/globals.css';
import './styles/utilities.css';
import { loadSavedTheme } from './utils/theme/saved-theme';

import { FooterComponent } from './components/footer/footer.ts';
import { HeaderComponent } from './components/header/header.ts';
import { HomePage } from './features/home-page/home-page.ts';
import { errorHandler } from './utils/errors/error-handler.ts';
import { InternalServerErrorError } from './utils/errors/models/internal-server-error-error.ts';
import { ToastNotificationManager } from './components/toast/notification/toast-notification-manager.ts';
import { ErrorComponentManager } from './components/error/error-component-manager.ts';

async function initApp() {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
        <div id="app-toast" class="app-toast"></div>
        <div id="app-header" class="app-header"></div>
        <div id="home-page-content" class="home-page-content"></div>
        <div id="app-footer" class="app-footer"></div>`;

    loadSavedTheme();

    const components = [
        new HeaderComponent(),
        new FooterComponent(),
        new HomePage(),
    ];
    await Promise.all(components.map((comp) => comp.init()));

    const managers = [
        new ErrorComponentManager(),
        new ToastNotificationManager(),
    ];

    await Promise.all(managers.map((man) => man.init()));

    errorHandler.throw(
        new InternalServerErrorError(
            'home_page.articles.load',
            'Could not load article, missing or corrupted dataCould not load article, missing or corrupted dataCould not load article, missing or corrupted dataCould not load article, missing or corrupted dataCould not load article, missing or corrupted data',
            'toast',
        ),
    );
}

document.addEventListener('DOMContentLoaded', initApp);
