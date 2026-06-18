export function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;

    if (savedTheme) {
        document.documentElement.dataset.theme = savedTheme;
    } else {
        const prefersDark = globalThis.matchMedia(
            '(prefers-color-scheme: dark)',
        ).matches;
        document.documentElement.dataset.theme = prefersDark ? 'dark' : 'light';
    }
}
