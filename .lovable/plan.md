

## Add Google Ads conversion event to onboarding pages

**What**: Fire `gtag('event', 'ads_conversion_purchase')` when users land on any onboarding page, alongside the existing Meta tracking.

**How**: In `src/pages/Onboarding.tsx`, add the gtag call inside the existing `useEffect` that already fires `trackPurchase`. This ensures the Google Ads conversion event fires once on page load with relevant course data.

**Changes**:
- **`src/pages/Onboarding.tsx`**: Add `gtag('event', 'ads_conversion_purchase', { ... })` inside the `useEffect`, passing `content_name` and `slug` as event parameters. Will also add a type declaration for the global `gtag` function.

