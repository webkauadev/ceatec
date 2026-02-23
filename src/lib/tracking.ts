// Meta Pixel + Conversions API tracking utilities

const PIXEL_ID = '1439493221188584';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Generate a simple event ID for deduplication between browser + CAPI
const generateEventId = () =>
  `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

// Get fbp cookie value (set by Meta Pixel)
const getFbp = (): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(/_fbp=([^;]+)/);
  return match?.[1];
};

// Get fbc from URL click ID or cookie
const getFbc = (): string | undefined => {
  if (typeof window === 'undefined') return undefined;
  const urlParams = new URLSearchParams(window.location.search);
  const fbclid = urlParams.get('fbclid');
  if (fbclid) return `fb.1.${Date.now()}.${fbclid}`;
  const match = document.cookie.match(/_fbc=([^;]+)/);
  return match?.[1];
};

// UTM Capture
export const captureUTMParams = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(key => {
    const value = urlParams.get(key);
    if (value) utmParams[key] = value;
  });
  return utmParams;
};

// ---- Browser-side Pixel tracking ----

export const trackPixelEvent = (
  eventName: string,
  params?: Record<string, unknown>,
  eventId?: string
) => {
  if (typeof window !== 'undefined' && window.fbq) {
    if (eventId) {
      window.fbq('track', eventName, params, { eventID: eventId });
    } else {
      window.fbq('track', eventName, params);
    }
  }
};

// ---- Server-side CAPI tracking (via edge function) ----

const sendCAPIEvent = async (
  eventName: string,
  eventId: string,
  params?: Record<string, unknown>
) => {
  try {
    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
    if (!projectId) return;

    const payload = {
      event_name: eventName,
      event_id: eventId,
      event_source_url: window.location.href,
      user_agent: navigator.userAgent,
      fbp: getFbp(),
      fbc: getFbc(),
      custom_data: params,
    };

    fetch(`https://${projectId}.supabase.co/functions/v1/meta-capi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {
      // Silently fail — browser pixel is the fallback
    });
  } catch {
    // Silently fail
  }
};

// ---- Combined tracking (Browser + Server) ----

export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown>
) => {
  const eventId = generateEventId();
  trackPixelEvent(eventName, params, eventId);
  sendCAPIEvent(eventName, eventId, params);
};

// ---- Convenience wrappers ----

export const trackPageView = () => {
  trackEvent('PageView');
};

export const trackViewContent = (params?: {
  content_ids?: string[];
  content_name?: string;
  content_type?: string;
  value?: number;
  currency?: string;
}) => {
  trackEvent('ViewContent', {
    content_type: 'product',
    currency: 'BRL',
    ...params,
  });
};

export const trackInitiateCheckout = (params?: {
  content_ids?: string[];
  content_name?: string;
  value?: number;
  currency?: string;
  num_items?: number;
}) => {
  trackEvent('InitiateCheckout', {
    currency: 'BRL',
    ...params,
  });
};

export const trackPurchase = (params?: {
  content_ids?: string[];
  content_name?: string;
  value?: number;
  currency?: string;
}) => {
  trackEvent('Purchase', {
    currency: 'BRL',
    ...params,
  });
};

export const trackLead = (params?: Record<string, unknown>) => {
  trackEvent('Lead', params);
};

export const trackContact = () => {
  trackEvent('Contact', { content_name: 'WhatsApp CTA Click' });
};

// Legacy alias
export const trackMetaEvent = trackEvent;
