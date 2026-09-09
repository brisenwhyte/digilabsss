# DigiLabss Premium Marketing Landing Page

A single-page Next.js landing experience for DigiLabss, an AI-powered social media marketing agency for growing brands. The page keeps the premium browser-as-product visual system, but positions websites as one conversion layer inside a broader engine of short-form content, Meta ads, automation, CRM follow-up, and reporting.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Environment Variables

Create `.env.local` when connecting analytics:

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

Leave it unset during development to keep the GTM network script disabled. The local data layer still initializes so mock events can be inspected.

## Form Endpoint

Strategy enquiries submit to:

```txt
POST /api/quote
```

Required fields are `name`, `email`, `phone`, `company`, `projectType`, and `budget`. The `projectType` field represents the selected primary need, such as AI Video Editing, Meta Ads, Conversion Web Design, AI Automation, Social Media Management, or Complete Marketing Suite. During development, submissions are logged in the server console, held in memory, available through `GET /api/quote`, and mirrored into `localStorage` under `digilabss_quote_submissions`.

## Analytics

The helper in `src/lib/analytics.ts` exposes:

```ts
trackEvent("strategy_form_submit", {
	primary_need: projectType,
	monthly_budget: budgetRange,
});
```

It pushes to `window.dataLayer`, making the app ready for a real GA4/GTM container without hardcoding tracking IDs.

## Deployment

Deploy on Vercel or any Next.js-compatible host. Add `NEXT_PUBLIC_GTM_ID` only when a real GTM container is ready. No server database is required for the mock endpoint; connect a CRM, email service, or database before production lead capture.

## Performance Notes

The design avoids heavy videos, stock photography, and scroll event listeners. Motion uses Framer Motion viewport observers and GPU-friendly transforms. Visuals are CSS/DOM browser mockups with reserved dimensions to avoid layout shift. Reduced-motion users receive simplified animation through global `prefers-reduced-motion` handling.
