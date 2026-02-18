import errorToastTemplate from './error-toast.template.html?raw';
import { ToastNotification } from '../notification/toast-notification';

import type { IErrorObject } from '../../../utils/errors/error-handler';

export class ErrorToastNotification extends ToastNotification {
    constructor(error: IErrorObject) {
        super(errorToastTemplate, error.toJson());
    }
}
