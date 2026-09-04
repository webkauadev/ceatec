# CEATEC — Agricultural Drone Training Funnel

Full conversion funnel developed for **CEATEC**, focused on professional agricultural drone training, certification and field operation.

The application combines a conversion-oriented landing page, dynamic pre-checkout flow, external payment routing, campaign attribution, browser and server-side conversion tracking, and post-purchase onboarding.

📦 **Repository:** https://github.com/webkauadev/ceatec

---

## Overview

CEATEC is a multi-stage acquisition and enrollment application for agricultural drone training programs.

Unlike a traditional landing page, the project handles multiple stages of the customer journey:

```text
Paid / Organic Traffic
        │
        ▼
  Acquisition Page
        │
        ▼
 Training Selection
        │
        ▼
 Dynamic Pre-Checkout
        │
        ├── Course
        ├── Location
        └── Payment Method
        │
        ▼
   EasyFlow Checkout
        │
        ▼
      Payment
        │
        ▼
 Post-Purchase Onboarding
        │
        ▼
 Private WhatsApp Group
````

The application is structured around three training products with different levels of specialization.

---

## Training Products

The funnel currently supports three main products.

### Essential

```text
Online Essential Training
```

Includes:

* DJI Academy — Agriculture
* CAAR training
* Live online classes
* Agricultural aviation regulation
* Operational safety
* Flow-rate and dosage calculation

### Professional

```text
Certified Professional Training
```

Includes everything from Essential plus:

* Three days of intensive field training
* Supervised agricultural drone operation
* Practical flow-rate adjustment
* Equipment configuration
* NR 31.7
* Real-world operational scenarios

### Expert

```text
Expert Agricultural Mapping Training
```

Includes everything from Professional plus:

* RGB mapping
* Multispectral mapping
* DJI Terra
* Orthomosaic generation
* NDVI
* Technical data interpretation
* Agricultural mapping reports

---

## Application Routes

Routing is handled with React Router.

```text
/
│
├── /pre-checkout/:slug
│
├── /onboarding/:slug
│
└── *
```

### `/`

Main acquisition landing page.

The page currently contains:

```text
Header
Hero
Pricing Tiers
Social Proof
Trust
Equipment
Mapping Showcase
Instructors
Guarantee
Limited Spots
FAQ
Final CTA
Footer
```

The page also triggers a `ViewContent` event identifying the available training products.

---

### `/pre-checkout/:slug`

Dynamic pre-checkout page used to prepare the user before redirecting to the payment provider.

Supported product slugs:

```text
/pre-checkout/essencial
/pre-checkout/profissional
/pre-checkout/expert
```

The page dynamically loads product information based on the URL parameter.

---

### `/onboarding/:slug`

Post-purchase onboarding route.

The onboarding flow confirms enrollment and directs the student to the correct WhatsApp group.

Examples include:

```text
/onboarding/essencial

/onboarding/profissional-vilhena
/onboarding/profissional-jatai

/onboarding/expert-vilhena
/onboarding/expert-jatai
```

Each onboarding route can contain:

* Course identification
* Class / city identification
* Dedicated WhatsApp group
* Support contact
* Purchase tracking
* Post-purchase instructions

---

## Conversion Architecture

The project implements a complete enrollment funnel instead of sending users directly from the landing page to an external checkout.

```text
Landing Page
     │
     ▼
Select Training
     │
     ▼
Pre-Checkout
     │
     ├── Select Class
     ├── Select Payment Method
     ├── Review Training
     └── Review Price
     │
     ▼
InitiateCheckout Event
     │
     ▼
EasyFlow
     │
     ▼
Payment
     │
     ▼
Onboarding
     │
     ▼
Purchase Event
```

This architecture provides greater control over attribution and conversion measurement before the user leaves the application.

---

## Pre-Checkout System

Training information is centralized in:

```text
src/lib/preCheckoutData.ts
```

Each product defines:

```typescript
interface CourseData {
  slug: string;
  name: string;
  subtitle: string;

  installment: string;
  pixPrice: string;
  totalCredito: string;

  bullets: string[];
  chips: string[];

  requiresTurma: boolean;
  turmas: TurmaOption[];

  links: {
    cartao: string;
    pix: string;

    byTurma?: Record<
      string,
      {
        cartao: string;
        pix: string;
      }
    >;
  };
}
```

This allows checkout behavior to be configured without duplicating page components.

---

## Location-Based Checkout Routing

Some training programs require the user to select a physical class location.

Currently supported locations include:

```text
Vilhena — RO
Jataí — GO
```

The selected class determines which checkout URL will be used.

Example flow:

```text
Professional Training
        │
        ▼
 Select Location
   ┌────┴────┐
   ▼         ▼
Vilhena     Jataí
   │         │
   ▼         ▼
Specific   Specific
Checkout   Checkout
```

The user cannot proceed until a required class is selected.

---

## Payment Method Routing

The pre-checkout also allows the user to select:

```text
Credit Card
or
Pix
```

Each payment method can point to a different EasyFlow offer.

The final checkout URL is dynamically resolved from:

```text
Course
+
Class / Location
+
Payment Method
```

---

## EasyFlow Integration

Payment processing is handled externally through **EasyFlow**.

The application does not process credit card or Pix information directly.

Instead, it determines the correct checkout offer and redirects the user to:

```text
https://pay.easyflow.digital/checkouts/offer/...
```

This keeps payment processing outside the frontend application.

---

## UTM Attribution

Campaign parameters are captured from the current URL.

Supported parameters:

```text
utm_source
utm_medium
utm_campaign
utm_content
utm_term
```

Before redirecting users to the payment provider, these parameters are appended to the EasyFlow checkout URL.

Example:

```text
Landing Page

?utm_source=meta
&utm_medium=paid
&utm_campaign=drone_training

        │
        ▼

Pre-Checkout

        │
        ▼

EasyFlow Checkout

?utm_source=meta
&utm_medium=paid
&utm_campaign=drone_training
&turma=vilhena
```

This helps preserve campaign attribution across the external checkout transition.

---

## Abandonment Recovery

The pre-checkout includes a lightweight recovery mechanism.

After approximately:

```text
20 seconds
```

without completing the checkout flow, the application displays a contextual WhatsApp CTA.

The generated WhatsApp message includes:

* Selected course
* Payment method
* Selected class when applicable
* Current page URL

This allows the commercial team to receive additional context before starting the conversation.

---

## WhatsApp Integration

WhatsApp is used in multiple stages of the funnel.

### Pre-Checkout Support

Users can contact the team before completing payment.

### Abandonment Recovery

Users who remain on the pre-checkout page receive an additional contact opportunity.

### Post-Purchase Support

Onboarding pages provide direct access to support.

### Student Groups

After payment, each enrollment path can direct the student to the corresponding WhatsApp group.

---

# Tracking Architecture

The application implements both browser-side and server-side Meta tracking.

```text
User Interaction
       │
       ▼
 generateEventId()
       │
       ├───────────────┐
       ▼               ▼
 Meta Pixel       Supabase Edge Function
 Browser Event       Server Event
       │               │
       └───────┬───────┘
               ▼
        Meta Events Manager
               │
               ▼
         Event Deduplication
```

---

## Meta Pixel

The Meta Pixel is initialized in:

```text
index.html
```

Browser-side events are emitted through:

```text
src/lib/tracking.ts
```

The application generates an event ID for conversion events so the same interaction can be correlated with the server-side event.

---

## Meta Conversions API

Server-side tracking is implemented with a **Supabase Edge Function**:

```text
supabase/functions/meta-capi/index.ts
```

The browser sends conversion events to:

```text
Supabase Edge Function
        │
        ▼
Meta Graph API
        │
        ▼
Conversions API
```

The Edge Function receives information such as:

```text
event_name
event_id
event_source_url
user_agent
fbp
fbc
custom_data
```

The Meta access token is retrieved from the server environment:

```text
META_CAPI_ACCESS_TOKEN
```

and is not required in the frontend bundle.

---

## Browser / Server Deduplication

Every combined conversion event receives an identifier generated by:

```typescript
const generateEventId = () =>
  `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
```

The same ID is sent through:

```text
Browser Pixel
+
Conversions API
```

allowing Meta to identify both requests as the same conversion event.

---

## Meta Attribution Data

The application attempts to collect:

```text
_fbp
_fbc
fbclid
```

When `fbclid` exists in the landing-page URL, an `_fbc`-compatible value is generated for the server-side conversion event.

This improves event matching and attribution for Meta campaigns.

---

## Tracked Events

The tracking layer currently supports the following standard Meta events:

```text
PageView
ViewContent
InitiateCheckout
Purchase
Lead
Contact
```

It also supports custom events through:

```typescript
trackEvent(eventName, params);
```

Examples used by the application include:

```text
select_turma
select_payment_method
join_whatsapp_group
```

---

## SPA PageView Tracking

Because the application uses client-side routing, normal browser navigation does not necessarily trigger a new HTML document request.

The project solves this with:

```text
src/hooks/usePageViewTracking.ts
```

which listens to React Router location changes and triggers:

```text
PageView
```

for every route transition.

---

## Purchase Tracking

Post-purchase onboarding pages trigger:

```text
Purchase
```

through the Meta tracking infrastructure.

The onboarding also attempts to emit a Google event:

```text
ads_conversion_purchase
```

through `gtag` when available.

---

## Google Analytics

Google Analytics is initialized globally through `gtag.js`.

The current application includes a GA4 measurement configuration directly in:

```text
index.html
```

This allows additional analytics and conversion events to use the existing `gtag` instance.

---

# Supabase

Supabase is used primarily as infrastructure for server-side conversion tracking.

The frontend includes a typed Supabase client configured through:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

The Meta CAPI utility also uses:

```text
VITE_SUPABASE_PROJECT_ID
```

to locate the Edge Function.

Current generated database types do not define application tables, views or RPC functions.

Therefore, the project's Supabase usage is currently centered around:

```text
Edge Functions
+
Environment Configuration
+
Server-Side Tracking
```

rather than persistent application data.

---

## Meta CAPI Edge Function

Location:

```text
supabase/
└── functions/
    └── meta-capi/
        └── index.ts
```

Responsibilities:

```text
Receive browser tracking payload
        │
        ▼
Read server-side Meta token
        │
        ▼
Build CAPI event
        │
        ▼
Call Meta Graph API
        │
        ▼
Return API response
```

---

# SEO

SEO metadata is defined in:

```text
index.html
```

The application includes:

* HTML language configuration
* Title
* Meta description
* Keywords
* Author metadata
* Robots directives
* Canonical URL
* Open Graph metadata
* Twitter Card metadata
* Social sharing image

Current title:

```text
CEATEC | Curso de Pulverização Agrícola
```

The page targets searches related to:

```text
agricultural drones
DJI Agras
drone spraying
agricultural drone operator training
CEATEC drones
agricultural drone training
```

---

# Frontend Architecture

The homepage is built from independent domain-oriented components.

```text
src/
│
├── components/
│   │
│   ├── landing/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── PricingTiers.tsx
│   │   ├── SocialProof.tsx
│   │   ├── Trust.tsx
│   │   ├── Equipment.tsx
│   │   ├── MappingShowcase.tsx
│   │   ├── Instructors.tsx
│   │   ├── Guarantee.tsx
│   │   ├── LimitedSpots.tsx
│   │   ├── FAQ.tsx
│   │   ├── FinalCTA.tsx
│   │   └── Footer.tsx
│   │
│   └── ui/
│
├── hooks/
│   └── usePageViewTracking.ts
│
├── integrations/
│   └── supabase/
│       ├── client.ts
│       └── types.ts
│
├── lib/
│   ├── preCheckoutData.ts
│   ├── tracking.ts
│   ├── whatsapp.ts
│   └── utils.ts
│
├── pages/
│   ├── Index.tsx
│   ├── PreCheckout.tsx
│   ├── Onboarding.tsx
│   └── NotFound.tsx
│
├── App.tsx
├── index.css
└── main.tsx
```

Server-side infrastructure:

```text
supabase/
├── config.toml
└── functions/
    └── meta-capi/
        └── index.ts
```

---

# Tech Stack

## Core

* React 18
* TypeScript
* Vite
* React Router DOM

## UI

* Tailwind CSS
* shadcn/ui
* Radix UI
* Lucide React
* Framer Motion

## State / Async

* TanStack React Query

## Validation

* Zod
* React Hook Form
* Hookform Resolvers

## Backend Infrastructure

* Supabase
* Supabase Edge Functions
* Deno

## Analytics & Marketing Technology

* Meta Pixel
* Meta Conversions API
* Google Analytics 4
* UTM attribution
* Browser / server event deduplication

## Checkout

* EasyFlow

## Typography

* League Spartan
* Teko

---

# Development

## Requirements

* Node.js
* npm
* Git

---

## Clone

```bash
git clone https://github.com/webkauadev/ceatec.git
```

```bash
cd ceatec
```

---

## Install Dependencies

```bash
npm install
```

---

## Development Server

```bash
npm run dev
```

Vite will start the development environment with hot module replacement.

---

## Available Scripts

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Development Build

```bash
npm run build:dev
```

### Lint

```bash
npm run lint
```

### Production Preview

```bash
npm run preview
```

---

# Environment Variables

Create a local environment file:

```text
.env
```

Example:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_PROJECT_ID=
```

The Supabase Edge Function requires the following server-side secret:

```text
META_CAPI_ACCESS_TOKEN
```

This value must be configured as a Supabase secret and must never be exposed to the frontend.

---

# Supabase Edge Function Development

The server-side Meta integration is implemented using Supabase Functions.

Function:

```text
meta-capi
```

The frontend calls:

```text
https://<PROJECT_ID>.supabase.co/functions/v1/meta-capi
```

The Edge Function then communicates with the Meta Graph API.

---

# Checkout Configuration

Course and checkout routing configuration is located in:

```text
src/lib/preCheckoutData.ts
```

When adding or changing a product, review:

```text
Course slug
Course name
Pricing
Available classes
Credit-card checkout URL
Pix checkout URL
Location-specific checkout URLs
```

---

# Onboarding Configuration

Post-purchase configuration is currently defined in:

```text
src/pages/Onboarding.tsx
```

Each onboarding slug maps to:

```typescript
interface OnboardingConfig {
  courseName: string;
  turmaLabel?: string;
  groupLink: string;
}
```

When creating a new class, ensure that the payment platform redirects successful purchases to the correct onboarding route.

---

# Deployment Checklist

Before publishing a new version:

```text
[ ] Production build succeeds
[ ] Home route loads correctly
[ ] All course tiers open the correct pre-checkout
[ ] Required class selection blocks checkout when empty
[ ] Credit-card checkout URLs are correct
[ ] Pix checkout URLs are correct
[ ] Location-specific checkouts are correct
[ ] UTM parameters survive checkout redirect
[ ] Meta Pixel initializes correctly
[ ] PageView fires on SPA route changes
[ ] ViewContent fires correctly
[ ] InitiateCheckout fires before payment redirect
[ ] Meta CAPI Edge Function responds correctly
[ ] Browser/server events share matching event IDs
[ ] Purchase fires on onboarding pages
[ ] WhatsApp support links are correct
[ ] WhatsApp group links are correct
[ ] SEO metadata is current
[ ] Canonical URL is correct
[ ] Supabase secrets are configured
```

---

# Security

Frontend environment variables must always be considered public after the application is built.

Never expose secrets such as:

```text
META_CAPI_ACCESS_TOKEN
Payment API secrets
Private API keys
Database service-role keys
Authentication secrets
```

inside the client application.

Only public configuration should use `VITE_*` environment variables.

Server-side secrets must remain inside the deployment platform or Supabase Functions environment.

---

# Author

**Kauã Fernandes**

Software Development · Systems · Integrations · Automation

🌐 [https://kauadev.net.br](https://kauadev.net.br)
📧 [contato@kauadev.net.br](mailto:contato@kauadev.net.br)
💻 [https://github.com/webkauadev](https://github.com/webkauadev)
