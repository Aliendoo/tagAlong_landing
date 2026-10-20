# Tagalong landing page

React, TypeScript, Vite, and GSAP. Daydream is the selected production direction: a left-aligned hero with stacked activity cards, one large centered scroll-controlled phone, and floating group-chat messages behind it.

## Preview

```sh
npm ci
npm run dev
```

- `/?compare` — comparison board with three live directions.
- `/?direction=daydream` — a stacked-card hero, one large phone that changes with scroll, captions below the phone, floating group-chat messages, and a soft orange and pink glow. Also available at `/`.
- `/?direction=duet` — a centered headline and a split product story with staggered phones.
- `/?direction=postcards` — layered travel cards and angled phones inside a warm gradient stage.

The earlier Duet and Postcards explorations retain a review bar. Daydream and the default production URL show the selected design without review controls.

## Brand and motion

- Orange: `#F26748`; pink: `#FF4D8D`.
- Manrope headings and Figtree body text; self-hosted variable fonts. OFL licenses are in `public/fonts`.
- Supplied Tagalong design system: coral focus outlines, 48 px primary and chapter controls, restrained copy, and travel cards based on the supplied Brighton Museum design. The hero shows Osaka, Seoul, and Rome; photo attribution is available from the footer. The founders image preserves its original 795 × 520 proportions at every breakpoint.
- Both approved phone animations feed one transparent phone sequence in Daydream. Its physical frame stays centered as the screen changes from availability to matching, voting, and the trip. The white interface inside the phone remains opaque.
- Scrolling advances or reverses the animation. Repeated cue times create intentional freeze frames, and stopping the scroll holds the current frame.
- Calendar: select October 5–9 and 26–30, then select only the matching October 27–29 block and carry those three days into the trip.
- Voting: original **No / Maybe / Yes** controls, with a red X and a green check. The faster video is 5.5 seconds.
- Reduced-motion preferences show static phone images and remove the long sticky scroll section. Daydream uses a cream pill bar with coral and pink accents for dates, voting, and the trip. In reduced-motion mode, choosing a chapter switches directly to a still frame.

Frame images load near the viewport; each phone retains at most 28 decoded frames. The complete compressed sequence assets total roughly 5 MB and are requested as needed.

To regenerate the web assets from the approved 500 × 1000 phone videos, install ffmpeg and Pillow, then run:

```sh
python3 scripts/prepare-phone-frames.py \
  --calendar /absolute/path/rhyme-availability-and-match.mp4 \
  --swipes /absolute/path/rhyme-location-votes-fast.mp4
```

Timing and freeze frames are in `src/data/phoneSequences.ts`. `journeySequence` references the existing calendar and voting frames in one timeline without duplicating media. Scroll handling is in `ScrollStory.tsx`, transparent frame loading is in `ScrollPhone.tsx`, and illustrative group-chat messages are in `GroupChatBackdrop.tsx`.

## Checks

```sh
npm run build
npm run lint
```

## Email signup

The hero and header link to the inline email form. POST `/api/waitlist` saves normalized emails in the Firestore `waitlist` collection, with a server timestamp and source. A SHA-256 document ID prevents duplicates. Existing signup timestamps are preserved; both new and duplicate submissions receive the same success response.

Setup before deploying:
1. Use Firebase project `tagalong-0519` and its Cloud Firestore database `(default)`. Confirm it exists before deployment.
2. Use the dedicated `tagalong-waitlist` service account. Its custom IAM role permits only `datastore.entities.create`, scoped to `(default)`. Set its JSON credentials as `FIREBASE_SERVICE_ACCOUNT_JSON` in Vercel's server environment. Never use a `VITE_` prefix or commit the credentials.
3. Deny browser/client access to the `waitlist` collection in Firestore rules. The Admin SDK authenticates using IAM; do not replace an existing application's rules wholesale.
4. Redeploy the Vercel project. Its Node function serves `/api/waitlist`; plain `npm run dev` serves only the UI. Use Vercel's local development server for a connected end-to-end test.

The form reports success only after Firestore confirms a write or an existing signup. If credentials or the database are unavailable, it shows a retry message and preserves the entered email. A hidden bot field and cross-origin rejection provide basic filtering; configure Vercel request rate limits before opening a high-traffic campaign. This stores signup interest only; it does not send email or verify ownership of an address.

Run backend validation with `node --test tests/waitlist.test.js`. Tests use an injected storage function and never submit real signup data.

The Instagram destination is preserved.

## Design references

Mobbin references informed composition and spacing; the screens and travel imagery come from the supplied assets.

The selected Daydream refinement uses the centered product hierarchy at [Rhyme](https://www.rhyme.travel/) and layered message treatment at [Flighty](https://flighty.com/) as references. Decorative sparkles and plus shapes were removed. A dotted destination route behind the phone advances with scrolling; the changing captions and compact pill navigation sit below the phone.

- [Riverside: paired product previews](https://mobbin.com/sites/sections/601ce269-1efe-407c-9fb5-7272f7504f43)
- [Craft: soft gradients](https://mobbin.com/sites/sections/8c9bd91c-6ec1-48cd-aeaa-d6a482c41e28)
- [Lightship: spacious travel cards](https://mobbin.com/sites/sections/019d6f74-42f5-492b-9cca-31fecb99dac2)
- [Daylight: warm product stage](https://mobbin.com/sites/sections/3ffb34f4-4713-4a4d-a05e-d18961771f0b)

Production Vercel project: `lilymoons-projects-94eee356/tagalong-landing-public`. GitHub auto-deployment is not connected to this project yet; deploy with the Vercel CLI until repository access is granted.
