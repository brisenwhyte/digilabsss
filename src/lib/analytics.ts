type EventPayload = Record<string, string | number | boolean | null | undefined>;

type DataLayerEvent = EventPayload & {
  event: string;
};

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

export function trackEvent(event: string, payload: EventPayload = {}) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });

  if (process.env.NODE_ENV === "development") {
    console.info("[analytics]", event, payload);
  }
}