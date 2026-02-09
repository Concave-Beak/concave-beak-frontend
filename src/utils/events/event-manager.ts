// utils/eventManager.ts
import type { AppEvents } from '../../types/events/app-event';

export class EventManager {
  private customListeners = new Map<string, Function[]>();

  // ========== CUSTOM EVENTS (Pub/Sub) ==========

  on<T extends keyof AppEvents>(
    event: T,
    handler: (data: AppEvents[T]) => void
  ): () => void {
    if (!this.customListeners.has(event)) {
      this.customListeners.set(event, []);
    }

    const listeners = this.customListeners.get(event)!;
    listeners.push(handler);

    return () => this.off(event, handler);
  }

  emit<T extends keyof AppEvents>(event: T, data: AppEvents[T]): void {
    const listeners = this.customListeners.get(event);
    if (listeners) {
      listeners.forEach(handler => handler(data));
    }
  }

  off<T extends keyof AppEvents>(event: T, handler: Function): void {
    const listeners = this.customListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(handler);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  onDOM<T = any>(
    eventName: string,
    handler: (event: Event | CustomEvent<T>) => void,
    options: {
      target?: EventTarget;
      eventOptions?: AddEventListenerOptions;
    } = {}
  ): () => void {
    const { target = document, eventOptions } = options;

    const listener = (event: Event) => {
      handler(event);
    };

    target.addEventListener(eventName, listener, eventOptions);

    return () => {
      target.removeEventListener(eventName, listener, eventOptions);
    };
  }

  emitDOM<T = any>(
    eventName: string,
    detail?: T,
    options: {
      target?: EventTarget;
      eventInit?: CustomEventInit<T>;
    } = {}
  ): void {
    const { target = document, eventInit = {} } = options;

    const event = new CustomEvent(eventName, {
      detail,
      bubbles: true,
      composed: true,
      ...eventInit
    });

    target.dispatchEvent(event);
  }
}

export const eventManager = new EventManager();
