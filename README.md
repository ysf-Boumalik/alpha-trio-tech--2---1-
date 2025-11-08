# Booking Funnel Implementation

This implements a lightweight 2-step booking funnel modal for the Next.js project using shadcn UI. It intercepts booking/scheduling CTAs, collects user intent and qualification data, sends it to a webhook, and redirects to Calendly.

## Installation & Setup

1. **Install Dependencies** (if not already):
   - Ensure shadcn/ui is set up with `Dialog`, `Button`, `RadioGroup`, `Input`, `Label`.
   - Install `lucide-react` for icons: `npm install lucide-react`
   - For HMAC: Node.js crypto is built-in, no extra install needed.

2. **Environment Variables**:
   Add to `.env.local`:
   ```
   WEBHOOK_SECRET=your-hmac-secret-key-here  # Required for webhook signature validation
   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/booking-alphatriotech/30min  # Calendly redirect URL
   ```

3. **Files Added**:
   - `components/BookingFunnel.tsx`: The main React component.
   - `utils/hmac.ts`: HMAC signature verification helper.
   - `app/api/webhook/booking/route.ts`: Next.js API route for handling POST payloads.
   - `components/BookingFunnel.test.tsx`: Example unit tests (requires Jest + @testing-library/react setup).

4. **Integration**:
   - Mount the component in your top-level layout (App Router) to enable global event listening.
   - In `app/layout.tsx`, import and add `<BookingFunnel />` inside the `<body>` or providers:
     ```tsx
     import { BookingFunnel } from '@/components/BookingFunnel';

     export default function RootLayout({ children }: { children: React.ReactNode }) {
       return (
         <html lang="en">
           <body>
             {/* Your providers */}
             {children}
             <BookingFunnel />  // Add here
           </body>
         </html>
       );
     }
     ```
   - For Pages Router, add to `_app.tsx` or `_document.tsx`.

5. **Webhook Handling**:
   - The API route validates HMAC signature using `X-SIGN` header.
   - On success, logs the payload. Extend to forward to CRM (e.g., via fetch to external API).
   - Example payload:
     ```json
     {
       "intent": "Automate operations",
       "otherText": "Custom integration",
       "company_size": "11-50",
       "timeline": "ASAP",
       "ts": "2025-11-07T14:00:00Z"
     }
     ```

6. **Testing**:
   - Run tests: `npm test` (assumes Jest configured).
   - Tests cover modal opening, validation, and payload/redirect.

7. **Fallback**:
   - If JS disabled, original anchor links work (no interception).
   - Mobile-responsive via shadcn/Tailwind.

## Usage Notes
- Intercepts clicks on `a[href*="book" i]`, `a[href*="schedule" i]`, `a[href*="consult" i]`, or `.book-cta`.
- Events pushed to `window.dataLayer` (GTM) or console.
- No personal data collected; only intent/qualifiers.
- Component size: ~5KB minified (Tailwind purged).

## Extending
- Add server-side CRM integration in `route.ts` (e.g., POST to HubSpot/Salesforce).
- Customize options/UI in `BookingFunnel.tsx`.
