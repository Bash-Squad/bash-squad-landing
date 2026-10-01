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
  client: 'A two-broker real estate firm',
  kind: 'client build',
  year: '2026',
  published: '2026-09-30',
  metaTitle: 'Land to Listings: a real estate site on Cloudflare',
  metaDescription:
    'A map-first land and homes site for two North Carolina brokers. Astro on Cloudflare Workers with D1, R2, MapLibre and a magic-link admin, live sixteen days after the first commit.',
  h1: 'From raw land to a live listings site in sixteen days.',
  answer:
    'Land to Listings is a listings site for a two-broker real estate firm in the Triangle, North Carolina. They sell development land to builders and homes to the people who\'ll live in them. We designed it and built it on Cloudflare Workers with Astro, D1 and R2, and it was live sixteen days after the first commit.',
  intro:
    'Sixteen days from the first commit to a site they can run themselves. Here\'s what they needed and what we built.',
  cardDescription:
    'A map-first land and homes site for two Triangle, NC brokers: Astro on Cloudflare Workers, D1, R2, MapLibre, and an admin with no passwords.',
  facts: [
    { label: 'client', value: 'A two-broker real estate firm' },
    { label: 'where', value: 'The Triangle, North Carolina' },
    { label: 'shipped', value: 'September 2026' },
    { label: 'role', value: 'Design, build, deploy, handover' },
    { label: 'runs on', value: 'Cloudflare Workers, free tier' },
  ],
  links: { live: 'https://landtolistings.bashsquad.com/?v=3' },
  tags: ['astro', 'cloudflare', 'maps', 'design'],
  cover: screen('hero-v3', 'The Land to Listings home page: a surveyor\'s plat with contours, a parcel boundary, Listings Lane, and a title block reading "From land to listings" with live counts of parcels, acres, homes and towns.'),
  dimension: '16 days, first commit to handover',
  logTitle: 'landtolistings: git log --reverse',
  // Dates are the milestones on main, from the repo's reflog.
  timeline: [
    { date: 'sep 15', text: 'scaffold: astro, workers, d1, r2, auth' },
    { date: 'sep 16', text: 'land + homes split, map, geocoding' },
    { date: 'sep 17', text: 'blank basemap and back button fixed' },
    { date: 'sep 22', text: 'ui slices 1 to 5, 55 tests green' },
    { date: 'sep 25', text: 'redesign: the surveyor\'s sheet' },
    { date: 'sep 27', text: 'third home page: the plat, /?v=3' },
    { date: 'sep 28', text: 'copy pass: every page and email' },
    { date: 'sep 29', text: 'approved. they picked the plat', tone: 'ok' },
    { date: 'sep 30', text: 'handover. 61 commits, 58 tests', tone: 'ok' },
  ],
  ogImage: `${DIR}/og.png`,
  stats: [
    { value: '16', label: 'days, first commit to handover' },
    { value: '61', label: 'commits on main' },
    { value: '58', label: 'tests, run inside workerd' },
    { value: '$0', label: 'a month to host' },
  ],
  brief: {
    title: 'Two kinds of buyer, one site.',
    body: [
      'The brokers sell two different things to two different people. Builders want acreage, lot counts, county and sewer, and they want to see it on a map. Home buyers want photos, beds and baths, and a price.',
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
          'Land and homes live in one table. Two fields, division and category, decide every page, so the site is a handful of queries over the same rows. The list and the map always show the same filtered set. Hover a card and its pin lights up; hover a pin and its card does. Land gets a tree pin and homes get a house, so the map reads without a legend. Every filter lives in the URL, so a search can be sent to a client as a link.',
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
          'The brokers sign in with a link emailed to them. Tokens last fifteen minutes and work once. One form covers both land and homes: leave a field blank and it doesn\'t show. Type an address and the pin places itself; if the geocoder guesses wrong, drag it. Photos upload straight to R2 and are resized on the way out, so nobody has to think about image sizes.',
        image: screen('login', 'The admin sign-in page: "Sign in" with an email field and a button reading "Email me a sign-in link". No password field.'),
      },
    ],
  },
  compare: {
    title: 'Two versions of the home page. They picked the map.',
    body:
      'We built two versions of the home page and put both on the live site, each behind its own link, so they could compare them in a browser instead of in a mockup. The first draws a survey sheet around the headline: contour lines, two photographs, dimension lines. The second turns the whole screen into a surveyor\'s map of an imaginary street. The boundary draws itself, pins drop at the corners, a road sweeps in, lots get divided up, houses go up, and a moving truck drives down the lane while the live counts of parcels and homes roll up. If you\'ve turned off animations, or JavaScript, you get the finished drawing. They picked the map. Drag the handle to compare.',
    before: { label: 'v2 · the survey sheet', image: screen('hero-v2', 'Home page version 2: the headline "From land to listings" with two photographs inside registration marks, dimension lines, and two entry links for land and homes.') },
    after: { label: 'v3 · the map (their pick)', image: screen('hero-v3', 'Home page version 3: the headline over a full surveyor\'s map with contours, a parcel boundary with bearings, Listings Lane, a legend and a scale bar.') },
  },
  details: {
    title: 'The small things.',
    intro: 'Each one is something a buyer, a builder or the brokers would feel, even if they couldn\'t name it.',
    items: [
      { title: 'Every search is a link', body: 'Filters live in the URL, so a broker can text a builder the exact set of parcels they were looking at, and the page opens on it.' },
      { title: 'Reads without a legend', body: 'A tree pin for land, a house pin for a home. The map explains itself, and hovering a card lights up its pin.' },
      { title: 'Pins place themselves', body: 'Type an address and the listing lands on the map when it\'s saved. Raw land with only a road name gets a best guess and a note about how precise it is, and any pin can be dragged if the geocoder guessed wrong.' },
      { title: 'Photos size themselves', body: 'The brokers upload whatever comes off the phone. Originals go to R2 and come back resized for the screen that asked, so nobody thinks about image sizes.' },
      { title: 'Leads can\'t get lost', body: 'Every inquiry is saved before the email goes out. If the mail fails, the lead is still there, flagged, and exportable as a CSV. The forms work with JavaScript off.' },
      { title: 'No passwords to forget or leak', body: 'Sign-in is an emailed link that works once and expires in fifteen minutes. An unknown address gets the same reply as a real one, so nobody can probe for accounts.' },
      { title: 'Fast on a cold load', body: 'The hero photos went from 530KB JPEGs to about 40KB AVIF. The map script loads only when you scroll to it, and the animated home page waits for its fonts and photos before it plays.' },
      { title: 'Search engines get the whole story', body: 'Page descriptions are built from live inventory, every entry point has its own share card, and a sold listing keeps its page, gets a stamp, and tells Google it\'s sold.' },
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
      'Live at landtolistings.bashsquad.com while their own domain moves over. The brokers can sign in and add listings today. What\'s on the site now is demo data until they do.',
      'It runs on Cloudflare\'s free tier: no server to patch and no monthly bill. Handover is a push to their own repo and their own Cloudflare account, with a deploy guide written for whoever comes next.',
    ],
  },
  related: ['custom-software', 'fractional-engineering-team'],
};

export default landToListings;
