import type { CaseStudyContent, CaseStudyImage } from '../types';

// Every claim comes from the landtolistings repo (README, DEPLOY.md,
// docs/mls.md, docs/design.md, src/lib/mls/*, the test suite) or the live
// site, as of the Oct 12 2026 launch. Numbers: 27 days is first commit
// (Sep 15) to launch (Oct 12); 277 commits is `git rev-list --count main`;
// 470 is `vitest run` (42 files, all passing, run against a fresh build);
// $5 is Workers Paid on their account (DEPLOY.md). Brokers stay unnamed.
// Nothing about pricing, referrals, MLS costs or contacts belongs here.

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
  published: '2026-10-12',
  metaTitle: 'Land to Listings: a real estate site with MLS import',
  metaDescription:
    'A map-first land and homes site for a North Carolina brokerage, built on Cloudflare Workers with an MLS import over the Spark API. Live in under four weeks.',
  h1: 'From raw land to a live listings site in under four weeks.',
  answer:
    'Land to Listings is the website for a two-broker real estate firm in North Carolina. They sell development land to builders and homes to the people who\'ll live in them. We designed and built it on Cloudflare Workers, with listings that import from their MLS, and it went live at landtolistings.com 27 days after the first commit.',
  intro:
    'We started from what builders and home buyers each look for, then built the map, the listing pages, an admin they run themselves, and an import from their MLS.',
  cardDescription:
    'A map-first land and homes site for a North Carolina brokerage: Astro on Cloudflare Workers, an MLS import over the Spark API, and an admin with no passwords.',
  facts: [
    { label: 'client', value: 'A two-broker real estate firm' },
    { label: 'where', value: 'The Triangle, eastern and coastal NC' },
    { label: 'launched', value: 'October 2026' },
    { label: 'role', value: 'Research, design, build, launch' },
    { label: 'runs on', value: 'Cloudflare Workers, their account' },
  ],
  links: { live: 'https://landtolistings.com' },
  tags: ['astro', 'cloudflare', 'mls', 'maps', 'design'],
  cover: screen('home', 'The Land to Listings home page: the headline "From land to listings" over a surveyor\'s plat with contours, a parcel boundary, Listings Lane and its lots, and a title block with live counts of parcels, acres, homes and towns.'),
  dimension: '27 days, first commit to launch',
  logTitle: 'landtolistings: git log --reverse',
  // Dates are milestones on main, from the repo's history.
  timeline: [
    { date: 'sep 15', text: 'scaffold: astro, workers, d1, r2' },
    { date: 'sep 17', text: 'map, geocoding, leads, the admin' },
    { date: 'sep 25', text: 'redesign: the surveyor\'s sheet' },
    { date: 'sep 27', text: 'the plat home page draws itself' },
    { date: 'oct 2', text: 'mls import built on the spark api' },
    { date: 'oct 6', text: 'their logo, coming soon banners' },
    { date: 'oct 9', text: 'first live mls key; communities' },
    { date: 'oct 10', text: 'brand film from their drone clips' },
    { date: 'oct 11', text: 'photos and video in one slideshow' },
    { date: 'oct 12', text: 'landtolistings.com goes live', tone: 'ok' },
  ],
  ogImage: `${DIR}/og.png`,
  stats: [
    { value: '27', label: 'days, first commit to launch' },
    { value: '277', label: 'commits on main' },
    { value: '470', label: 'tests, run inside workerd' },
    { value: '$5', label: 'a month to host' },
  ],
  brief: {
    title: 'Two kinds of buyer, one site.',
    body: [
      'The brokers sell two different things to two different people. Builders want acreage, lot counts, county and sewer, and they want to see it on a map. Home buyers want photos, beds and baths, and a price.',
      'We started with a meeting about how they work and a look at what the best map and listing sites in real estate do well. Then we built three versions of the home page and put them all on the live site, so they could choose in a browser instead of from a mockup.',
      'They needed to add listings themselves and pull them from the MLS instead of typing them in twice. They wanted landowners to have an easy way to ask what their land is worth. And it all had to run on their own account for a few dollars a month.',
    ],
    asks: [
      'A map-first land inventory for builders and developers',
      'A gallery of homes for buyers',
      'A form for landowners asking what their land is worth',
      'Listings imported from their MLS, not typed twice',
      'An admin they can run without us',
      'Pages for the communities their listings belong to',
    ],
  },
  story: {
    title: 'What we built.',
    intro: 'Five screens carry most of the site. Scroll through them.',
    steps: [
      {
        title: 'Everything is on the map.',
        body:
          'Land and homes live in one table, so the list and the map always show the same filtered set. Hover a card and its pin lights up; hover a pin and its card does. Land gets a tree pin and homes get a house, so the map reads without a legend. When a seller doesn\'t want the exact spot public, the map shows a one-mile circle instead of a pin. Every filter lives in the URL, so a search can be sent to a client as a link.',
        image: screen('land', 'The Land for sale page: filters, listing cards with aerial photos, and a map of eastern North Carolina with tree-shaped pins and soft circles where the exact location is hidden.'),
      },
      {
        title: 'Each listing is its own sheet.',
        body:
          'The facts a buyer scans for sit in a ruled strip under the price: beds, baths and square feet for a home, acreage, lots and county for land. Photos run as a filmstrip with a full-screen view that works with arrow keys and swipe, and a listing\'s video sits in the same strip, playing only when someone presses it. The inquiry form is on the page and already knows which listing you\'re asking about.',
        image: screen('listing', 'A home listing in Raleigh: the price, a ruled strip with beds, baths, interior square feet and year built, an "Ask about this home" button, and a filmstrip of photos.'),
      },
      {
        title: 'Listings arrive from the MLS.',
        body:
          'Type an MLS number and the listing comes in as a draft, with its facts and up to 20 photos copied over. The import talks to the MLS through the Spark API, accepts only the team\'s own listings, and honors the seller\'s display choices, because the MLS rules require it. From then on the MLS owns price and status and the brokers own the words. Each refresh takes withdrawn and expired listings off the site, and one that drops out of the feed is flagged, then hidden after three days.',
        image: screen('admin-listings', 'The admin listings table: an "Add from MLS" box beside the "+ New listing" button, and rows with each listing\'s photo, type, price, status and actions.'),
      },
      {
        title: 'An admin they run themselves.',
        body:
          'The brokers sign in with a link emailed to them; there are no passwords. One editor covers land and homes, and a field left blank simply doesn\'t show. Photos and video share one order that they drag to change. Type an address and the pin places itself, or drag it if the geocoder guessed wrong. A listing can join a community, and the community gets its own page once one of its listings is live.',
        image: screen('admin-editor', 'The listing editor for a home: a grid of photos with the cover marked, a description field under each photo, and arrows to reorder them.'),
      },
      {
        title: 'A form landowners will fill in.',
        body:
          'The land value page asks for a road name or a parcel number, and nothing else is required. The reply is the brokers\' opinion, and the page says so plainly rather than pretending to be an instant estimate. Beside it, their own drone footage plays as a quiet loop, framed like a print. Every lead is saved before the email goes out, so a mail hiccup can\'t lose one.',
        image: screen('land-value', 'The "Tell us about your land" page: an aerial video of a road through green fields, framed with corner marks and contour lines, beside a numbered form.'),
      },
    ],
  },
  flair: {
    label: 'the home page',
    title: 'The home page draws its own plat.',
    body:
      'Their home page opens on a surveyor\'s plat of an imaginary street that draws itself in under five seconds: contours, the boundary and its iron pins, the woods, the lane, the lots, then the houses. It waits for its fonts and photos before it plays, and goes straight to the finished drawing if they\'re slow or you\'ve turned animations off. This is the same plat in our ink. Scroll and it builds in the same order. The real one is on their site.',
  },
  details: {
    title: 'The small things.',
    intro: 'Each one is something a buyer, a builder or the brokers would feel, even if they couldn\'t name it.',
    items: [
      { title: 'Every search is a link', body: 'Filters live in the URL, so a broker can text a builder the exact set of parcels they were looking at, and the page opens on it.' },
      { title: 'Listings can carry video', body: 'Brokers upload video in the editor next to the photos. Cloudflare Stream turns their drone footage into something every browser plays, and it never starts on its own.' },
      { title: 'Their footage, used twice', body: 'Two of their aerial clips became quiet loops on the land value page and at the foot of the home page. The still shows first, the film loads after the page does, and a pause button is always there.' },
      { title: 'Communities get their own page', body: 'A development\'s page shows its photos, its pin and every home in it. It appears on its own once one of its listings goes live, and joins the sitemap the same day.' },
      { title: 'Leads can\'t get lost', body: 'Five forms feed one inbox. Every inquiry is saved before the email goes out, and if the mail fails the lead is still there, flagged and ready to export.' },
      { title: 'No passwords to forget or leak', body: 'Sign-in is an emailed link that works once and expires in fifteen minutes. An unknown address gets the same reply as a real one, so nobody can probe for accounts.' },
      { title: 'Fast on a cold load', body: 'Photos are resized on the way out for the screen that asked. The map script loads only when you scroll to it, and the animated home page waits for its fonts and photos before it plays.' },
      { title: 'Search engines get the whole story', body: 'Page descriptions are built from live inventory, every entry point has its own share card, and a sold listing keeps its page, gets a stamp, and tells Google it\'s sold.' },
    ],
  },
  phones: {
    caption: 'On a phone: the plat, the map with its list switch, and the photo strip.',
    images: [
      phone('m-home', 'The home page on a phone: the headline over the plat drawing with houses, lots and a SOLD stamp.'),
      phone('m-land', 'The Land for sale page on a phone in map view: pins and circles across eastern North Carolina, with a List / Map switch.'),
      phone('m-listing', 'A home listing on a phone: price, beds, baths, square feet and year built, a photo with a filmstrip under it.'),
    ],
  },
  stack: [
    { label: 'framework', items: ['Astro 7 (SSR)', 'TypeScript', 'Zod 4', 'Sass'] },
    { label: 'platform', items: ['Cloudflare Workers', 'D1', 'R2', 'Images', 'Stream', 'Email Sending', 'Turnstile', 'Cron Triggers'] },
    { label: 'mls', items: ['Spark API', 'RESO Web API'] },
    { label: 'maps', items: ['MapLibre GL', 'OpenFreeMap tiles', 'US Census + Nominatim geocoding'] },
    { label: 'auth', items: ['Better Auth', 'magic links only'] },
    { label: 'testing', items: ['Vitest in workerd', 'Playwright', 'msw'] },
    { label: 'type', items: ['Bricolage Grotesque', 'Cormorant Garamond', 'IBM Plex Mono'] },
  ],
  outcome: {
    title: 'Where it landed.',
    body: [
      'Live at landtolistings.com since October 12, on their own Cloudflare account, for about $5 a month. The brokers add and edit listings themselves, and every listing on the site is a real one.',
      'The MLS import is in their admin and tested against live MLS data. The nightly refresh is built and ready to switch on, and so are video uploads, whenever they want them.',
    ],
  },
  related: ['custom-software', 'fractional-engineering-team'],
};

export default landToListings;
