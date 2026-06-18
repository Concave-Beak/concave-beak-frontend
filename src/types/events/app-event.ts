export type AppEvents = {
    'theme:toggle': { isDark: boolean };
    'app:error': { errorObject: object };
    'notification:error': { notificationObject: object };
};
