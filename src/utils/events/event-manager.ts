import type { AppEvents } from '../../types/events/app-event';
import { INDEX_NOT_FOUND } from '../common';

export type EventManagerUnsubscribeFunction = () => void;
export type EventFunction<T extends keyof AppEvents> = (
    data: AppEvents[T],
) => void;

export class EventManager {
    private customListeners: {
        [K in keyof AppEvents]?: EventFunction<K>[];
    } = {};

    on<T extends keyof AppEvents>(
        event: T,
        handler: (data: AppEvents[T]) => void,
    ): EventManagerUnsubscribeFunction {
        if (!this.customListeners[event]) {
            this.customListeners[event] = [];
        }

        const listeners = this.customListeners[event];
        if (listeners) {
            listeners.push(handler);
        }

        return () => this.off(event, handler);
    }

    emit<T extends keyof AppEvents>(event: T, data: AppEvents[T]): void {
        const listeners = this.customListeners[event];
        if (listeners) {
            for (const handler of listeners) {
                handler(data);
            }
        }
    }

    onDOM<T extends keyof AppEvents>(
        eventName: string,
        handler: (event: Event | CustomEvent<T>) => void,
        options: {
            target?: EventTarget;
            eventOptions?: AddEventListenerOptions;
        } = {},
    ): EventManagerUnsubscribeFunction {
        const { target = document, eventOptions } = options;

        const listener = (event: Event) => {
            handler(event);
        };

        target.addEventListener(eventName, listener, eventOptions);

        return () => {
            target.removeEventListener(eventName, listener, eventOptions);
        };
    }

    emitDOM<T extends keyof AppEvents>(
        eventName: string,
        detail?: T,
        options: {
            target?: EventTarget;
            eventInit?: CustomEventInit<T>;
        } = {},
    ): void {
        const { target = document, eventInit = {} } = options;

        const event = new CustomEvent(eventName, {
            detail,
            bubbles: true,
            composed: true,
            ...eventInit,
        });

        target.dispatchEvent(event);
    }

    private off<T extends keyof AppEvents>(
        event: T,
        handler: EventFunction<T>,
    ): void {
        const listeners = this.customListeners[event];
        if (listeners) {
            const index = listeners.indexOf(handler);
            if (index !== INDEX_NOT_FOUND) {
                listeners.splice(index, 1);
            }
        }
    }
}

export const eventManager = new EventManager();
