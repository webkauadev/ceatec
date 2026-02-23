import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/tracking';

/**
 * Fires a PageView event on every route change (SPA-friendly).
 * The base fbq('init') is in index.html; this handles subsequent navigations.
 */
export const usePageViewTracking = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView();
  }, [location.pathname]);
};
