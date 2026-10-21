# ScanDriver website

React + Vite + JavaScript + CSS3 site for ScanDriver, a driver aggregation service in Delhi NCR (it does not own vehicles). Created from scratch because no repository was available; the live site (scandriver.in) is built with Next.js, this project is a separate Vite implementation.

# Live Demo: https://scandriver.vercel.app/

## Run
`npm install` · `npm run dev` · `npm run build` · `npm run preview`

## Structure
- `src/config.js` – contact numbers, emails, social links, services, testimonials, WhatsApp link helper (**edit contacts here**)
- `src/utils.js` – phone validation
- `src/components/Layout.jsx` – header, mobile menu, footer, floating WhatsApp button
- `src/pages/Home.jsx` – hero, services, how it works, safety, about, testimonials, corporate enquiry, driver recruitment, contact
- `src/pages/Booking.jsx` – booking form · `src/pages/Legal.jsx` – legal routes · `src/index.css` – design tokens and styles

## Booking flow
Form validates, builds a structured message from completed relevant fields and opens `https://wa.me/919717498198` with it prefilled. No backend; nothing is stored. The UI says the enquiry is ready and must be sent in WhatsApp; it never claims a confirmed booking.
`/booking?service=` accepts hourly, monthly, weekly, outstation, corporate, airport, event. Monthly and outstation also preselect the matching trip type; the others are ambiguous so the user chooses. Unknown values show a notice and select nothing.
Corporate enquiry uses the same WhatsApp handoff. Driver applications go to 919718181498 only.

## Deploy (Vercel)
Import the repo; framework Vite, build `npm run build`, output `dist`. `vercel.json` rewrites all routes to `index.html`.

## Testing status
- **Not run:** `npm install`, `npm run build`, dev server, browser/responsive checks, link clicking. The build environment had no network access, so dependencies could not be installed.
- **Done:** every `.jsx` file parses with esbuild; code reviewed for the booking logic. Run the build locally before deploying.

## Needs business confirmation
- Reference checks: site says both "minimum two" and "3-reference check". Two is used.
- 500+ drivers, 1,000+ customers, "<2 min" / "15 min" / "60 min" response claims: omitted.
- "100% Safe", "100% Background Checked", "zero harassment guarantee", "Guaranteed Earnings", weekly payouts, "transfer guaranteed", flight tracking: omitted. Chat demo (Ramesh K., ₹800): omitted.
- Testimonials are copied from scandriver.in; confirm they are genuine and that you have permission to use them. One mentions a 2-hour wait.
- Privacy and Cancellation pages are marked drafts; only the Terms text was retrieved. Provide the real text.
- Logo and QR code could not be downloaded: a text wordmark is used. Add the real logo and a genuine booking QR if you have one.
- "Pay at the end of the trip" and ₹8/₹40/₹200 terms are reproduced from the live booking page; the ₹200 note applies to cancellation fee in Terms and to night allowance on the booking page.
- Brand accent colour could not be verified; `--accent` in `index.css` is neutral white.
- Instagram/Facebook URLs are taken from the live site footer.
- Your prompt listed the driver link once as `91971818181498`; the correct `919718181498` is used.

## v3 colour system
Navy #101A2C, blue #3478F6 (buttons use #2A66DB for AA contrast), teal #20C9B7, ice #EAF3FF, gray #F4F7FB, ink #182230. Light and navy sections alternate; added FAQ, closing CTA, animated how-it-works line. The brand accent was never verified against the real logo.

## v2 visual upgrade
Hero with animated route illustration (SVG/CSS, subtle scroll parallax on desktop, labelled illustrative), quick service pills, scroll reveals with staggered cards (`src/components/Reveal.jsx`), a pricing/terms section, and service tiles on the booking form. All motion is disabled under `prefers-reduced-motion`; the illustration is hidden on small phones. No hero video was added: no suitable licensed footage was available offline. Drop a real video/poster into `public/` and add it to `Hero` if you have one.
Still unverified: build, browser, console and responsive checks (no network to install dependencies here).
