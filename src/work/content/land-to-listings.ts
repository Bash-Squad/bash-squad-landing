import type { CaseStudyContent, CaseStudyImage } from '../types';

// First case study. Every claim here comes from the landtolistings repo
// (README, DEPLOY.md, PLAN-V2.md, docs/plans/design-first-direction.md, the
// test suite) or the live site. Numbers: 16 days is first commit (Sep 15) to
// handover plan (Sep 30); 61 commits on main; 58 vitest cases; $0 is the
// Workers Free tier. Nothing about pricing, referrals, or who said what to
// whom belongs on this page.

const DIR = '/work/land-to-listings';

function screen(name: string, alt: string): CaseStudyImage {
  return { src: `${DIR}/${name}.webp`, alt, width: 1440, height: 900, retina: true };
}

function phone(name: string, alt: string): CaseStudyImage {
  return { src: `${DIR}/${name}.webp`, alt, width: 780, height: 1688 };
}

const landToListings: CaseStudyContent = {
  slug: 'land-to-listings',
  name: 'Land to Listings',
  client: 'Emily Mitchell & Emma Douglass',
  kind: 'client build',
  year: '2026',
  published: '2026-09-30',
  metaTitle: 'Land to Listings: a real estate site on Cloudflare',
  metaDescription:
    'A map-first land and homes site for two North Carolina brokers. Astro on Cloudflare Workers with D1, R2, MapLibre and a magic-link admin, live sixteen days after the first commit.',
  h1: 'From raw land to a live listings site in sixteen days.',
  answer:
    'Land to Listings is a listings site for Emily Mitchell and Emma Douglass, two brokers in the Triangle, North Carolina. They sell development land to builders and homes to the people who\'ll live in them. We designed it and built it on Cloudflare Workers with Astro, D1 and R2, and it was live sixteen days after the first commit.',
  intro:
    'Sixteen days from the first commit to a site they can run themselves. Here\'s what they needed, what we built, and where it got hard.',
  cardDescription:
    'A map-first land and homes site for two Triangle, NC brokers: Astro on Cloudflare Workers, D1, R2, MapLibre, and an admin with no passwords.',
  facts: [
    { label: 'client', value: 'Emily Mitchell & Emma Douglass' },
    { label: 'where', value: 'The Triangle, North Carolina' },
    { label: 'shipped', value: 'September 2026' },
    { label: 'role', value: 'Design, build, deploy, handover' },
    { label: 'runs on', value: 'Cloudflare Workers, free tier' },
  ],
  links: { live: 'https://landtolistings.bashsquad.com/?v=3' },
  tags: ['astro', 'cloudflare', 'maps', 'design'],
  cover: screen('hero-v3', 'The Land to Listings home page: a surveyor\'s plat with contours, a parcel boundary, Listings Lane, and a title block reading "From land to listings" with live counts of parcels, acres, homes and towns.'),
  ogImage: `${DIR}/og.png`,
  stats: [
    { value: '16', label: 'days, first commit to handover' },
    { value: '61', label: 'commits on main' },
    { value: '58', label: 'tests, run inside workerd' },
    { value: '$0', label: 'a month to host' },
  ],
  marquee: ['Astro 7', 'Cloudflare Workers', 'D1', 'R2', 'MapLibre', 'Better Auth', 'Turnstile', 'Image Transformations', 'Vitest in workerd'],
  brief: {
    title: 'Two kinds of buyer, one site.',
    body: [
      'Emily and Emma sell two different things to two different people. Builders want acreage, lot counts, county and sewer, and they want to see it on a map. Home buyers want photos, beds and baths, and a price.',
      'They needed one site that worked for both without feeling like two sites stapled together. They needed to add and edit listings themselves, without calling us. And they wanted a way for landowners to ask what their land is worth, because that\'s where a lot of their land deals start.',
      'No MLS feed and no CRM in the first phase, and no monthly software bill to keep it running.',
    ],
    asks: [
      'A map-first land inventory for builders and developers',
      'A gallery of homes for buyers',
      'A form for landowners asking what their land is worth',
      'An admin they can use without us',
      'Nothing to pay monthly to keep it up',
    ],
  },
  story: {
    title: 'What we built.',
    intro: 'Four screens carry most of the site. Scroll through them.',
    steps: [
      {
        title: 'Everything is on the map.',
        body:
          'Land and homes live in one table. Two fields, division and category, decide every page, so the site is a handful of queries over the same rows. The list and the map always show the same filtered set. Hover a card and its pin lights up; hover a pin and its card does. Land gets a tree pin and homes get a house, so the map reads without a legend. Every filter lives in the URL, so a search can be sent to a client and the back button does what you expect.',
        image: screen('land', 'The Land for sale page: a filter bar, listing cards with a plat drawing and an aerial photo, and a map of the Triangle with tree-shaped pins on each parcel.'),
      },
      {
        title: 'Each listing is its own sheet.',
        body:
          'The facts a builder scans for sit in a ruled strip under the price: acreage, lots, county. Homes get beds, baths and square feet in the same slot. Photos run as a filmstrip with a full-screen view that works with arrow keys and swipe. The inquiry form is on the page, not behind a button, and it already knows which parcel you\'re asking about. Sold listings stay up with a stamp, and search engines are told they\'re sold.',
        image: screen('listing', 'A listing page for Jordan Lake overlook in Apex: the price, a ruled strip with acreage, lots and county, an "Ask about this parcel" button, and a filmstrip of photos.'),
      },
      {
        title: 'A form landowners will fill in.',
        body:
          'The land value page asks for a road name or a parcel number, and nothing else is required. The reply is the brokers\' opinion, and the page says so plainly rather than pretending to be an instant estimate. A hidden honeypot field catches the dumb bots and Turnstile catches the rest. Every lead is written to the database before the email goes out, so a mail hiccup can\'t lose one.',
        image: screen('land-value', 'The "Tell us about your land" page: a three-step explanation on the left and a numbered form on the right asking where the land is, how to reach you, and anything else.'),
      },
      {
        title: 'An admin with no passwords.',
        body:
          'Emily and Emma sign in with a link emailed to them. Tokens last fifteen minutes and work once. One form covers both land and homes: leave a field blank and it doesn\'t show. Type an address and the pin places itself; if the geocoder guesses wrong, drag it. Photos upload straight to R2 and are resized on the way out, so nobody has to think about image sizes.',
        image: screen('login', 'The admin sign-in page: "Sign in" with an email field and a button reading "Email me a sign-in link". No password field.'),
      },
    ],
  },
  compare: {
    title: 'Two heads. They picked the plat.',
    body:
      'The headline came first: From land to listings. We built two more first screens behind a query string so they could compare them on the live site instead of in a mockup. Version 2 draws the survey sheet: contours draw in, the words set one by one, the photographs develop inside their registration marks. Version 3 is a full plat: a reticle hops the corners dropping iron pins, Listings Lane sweeps to a cul-de-sac, lots subdivide, houses go up, and a moving truck drives the lane while the live inventory rolls up like an odometer. With reduced motion, or no JavaScript, you get the finished drawing. Drag the handle to compare.',
    before: { label: 'v2 · the sheet, drawn', image: screen('hero-v2', 'Home page version 2: the headline "From land to listings" with two photographs inside registration marks, dimension lines, and two entry links for land and homes.') },
    after: { label: 'v3 · the plat (their pick)', image: screen('hero-v3', 'Home page version 3: the headline over a full surveyor\'s plat with contours, a parcel boundary with bearings, Listings Lane, a legend and a scale bar.') },
  },
  details: {
    title: 'The small things.',
    intro: 'None of these is a feature. All of them are why it feels finished.',
    items: [
      { title: 'Reads without a legend', body: 'A tree for land, a house for a home. Two pin shapes and no key to decode.' },
      { title: 'The back button works', body: 'Filters live in the URL and we don\'t rewrite history while the page loads, so back goes where you came from.' },
      { title: 'Phones get a switch', body: 'List or map, one tap. The same filters, nothing clipped, down to a 320px screen.' },
      { title: 'Errors in plain sentences', body: 'The same wording in the browser and on the server. Submit with JavaScript off and the page comes back with the problems named.' },
      { title: 'Nothing required that doesn\'t need to be', body: 'The land value form takes a road name. Acreage, timing and a phone number are optional and say so.' },
      { title: 'The intro waits for the page', body: 'The animated head holds its first frame until the fonts and photos are in. If that takes more than 1.4 seconds, it skips to the finished drawing.' },
      { title: 'Sold stays sold', body: 'A sold listing keeps its page and gets a stamp. The structured data says SoldOut, so Google doesn\'t keep advertising it.' },
      { title: 'Light pages', body: 'The hero photos went from 530KB and 410KB JPEGs to about 40KB each as AVIF. The map script, about 200KB, loads only when you scroll to it.' },
    ],
  },
  phones: {
    caption: 'Phones get the whole sheet: the plat, the list-or-map switch, and the filmstrip.',
    images: [
      phone('m-hero', 'The home page on a phone: the plat drawing with houses, a SOLD stamp, and a List / Map switch at the bottom.'),
      phone('m-land', 'The Land for sale page on a phone: the filter bar and a listing card with a plat drawing.'),
      phone('m-listing', 'A home listing on a phone: price, beds, baths and square feet, a photo with a filmstrip under it.'),
    ],
  },
  hardParts: {
    title: 'Where it got hard.',
    intro: 'The parts that didn\'t go in the demo, and took the longest.',
    items: [
      {
        title: 'A blank map with no error.',
        body: 'MapLibre finds its web worker with a URL that Vite rewrote to a chunk that didn\'t exist, and MapLibre swallows the failure. Pins floating on beige, nothing in the console. The fix is a one-line setWorkerUrl with the worker imported as an asset, so it ships with its shared chunk.',
      },
      {
        title: 'Forms that rejected anyone who skipped the phone field.',
        body: 'Astro Actions send null for an empty input, so a schema default of an empty string never applied and the whole submission failed validation. A small optionalText() helper turns null into an empty string. Wrapping the schema in superRefine broke form coercion too, so the cross-field rules moved into a plain function the action calls.',
      },
      {
        title: 'Delete means delete, in both stores.',
        body: 'A listing\'s photos live in R2 and its row in D1, and SQL can\'t reach the bucket. Deleting the row first would leave paid-for photos nobody can find. So the bucket prefix goes first, driven by what\'s actually in the bucket, then the row. A test uploads an orphan and checks it\'s gone too.',
      },
      {
        title: 'Passwordless on Workers.',
        body: 'Better Auth\'s cookie cache misbehaves on Workers, so it\'s off. The client IP comes from cf-connecting-ip. The domain allowlist is an exact match, so x@landtolistings.com.evil.net is out, and an unknown address gets the same "check your email" page with no email, so nobody can probe for accounts.',
      },
      {
        title: 'Tests in the real runtime.',
        body: 'The 58 tests run the built Worker inside workerd with a local D1 and R2, migrations applied per file. Any network call that isn\'t stubbed fails the test, so nothing quietly hits Turnstile or the geocoder during a run.',
      },
    ],
  },
  stack: [
    { label: 'framework', items: ['Astro 7 (SSR)', 'TypeScript', 'Zod 4', 'Sass'] },
    { label: 'platform', items: ['Cloudflare Workers', 'D1', 'R2', 'Image Transformations', 'Email Sending', 'Turnstile'] },
    { label: 'maps', items: ['MapLibre GL', 'OpenFreeMap tiles', 'US Census + Nominatim geocoding'] },
    { label: 'auth', items: ['Better Auth', 'magic links only'] },
    { label: 'testing', items: ['Vitest in workerd', 'msw'] },
    { label: 'type', items: ['Bricolage Grotesque', 'Cormorant Garamond', 'IBM Plex Mono'] },
  ],
  outcome: {
    title: 'Where it landed.',
    body: [
      'Live at landtolistings.bashsquad.com while their own domain moves over. Emily and Emma can sign in and add listings today. What\'s on the site now is demo data until they do.',
      'It runs on Cloudflare\'s free tier: no server to patch and no monthly bill. Handover is a push to their own repo and their own Cloudflare account, with a deploy guide written for whoever comes next.',
    ],
  },
  related: ['custom-software', 'fractional-engineering-team'],
};

export default landToListings;
