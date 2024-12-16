import { type Endpoint } from "comlink";

type EventListenerOrEventListenerObject =
  | {
      handleEvent(evt: Event): void;
    }
  | ((evt: Event) => void);

export interface NodeEndpoint {
  postMessage(message: any, transfer?: any[]): void;
  on(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: {},
  ): void;
  off(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: {},
  ): void;
  start?: () => void;
}

export function nodeAdapter(nep: NodeEndpoint): Endpoint {
  const listeners = new WeakMap();
  return {
    postMessage: nep.postMessage.bind(nep),
    addEventListener: (_, eh) => {
      const l = (data: any) => {
        if ("handleEvent" in eh) {
          eh.handleEvent({ data } as MessageEvent);
        } else {
          eh({ data } as MessageEvent);
        }
      };
      nep.on("message", l);
      listeners.set(eh, l);
    },
    removeEventListener: (_, eh) => {
      const l = listeners.get(eh);
      if (!l) {
        return;
      }
      nep.off("message", l);
      listeners.delete(eh);
    },
    start: nep.start && nep.start.bind(nep),
  };
}
