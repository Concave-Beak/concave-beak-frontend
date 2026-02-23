import errorToastTemplate from './error-toast.template.html?raw';
import { ToastNotification } from '../notification/toast-notification-manager';
import './error-toast.css';

import svgInfo from '/concave-beak-closed.svg?raw';
import svgWarn from '/concave-beak-closed-mad.svg?raw';
import svgError from '/concave-beak-closed-X-eye.svg?raw';

import type { IBaseError } from '../../../utils/errors/i-base-error';
import { templateLoader } from '@/utils/templating/template-loader';

const ERROR_CSS_CLASS = 'error-toast-class-';

export class ErrorToastNotification extends ToastNotification {
    constructor(error: IBaseError) {
        const SVG_CODES = {
            svgInfo: svgInfo,
            svgWarn: svgWarn,
            svgError: svgError,
            errorClass: ERROR_CSS_CLASS + error.severity,
        };

        const svgFilledTemplate = templateLoader.fillKeys(
            errorToastTemplate,
            SVG_CODES,
            false,
        );
        super(svgFilledTemplate, error.toJson());
    }
}
