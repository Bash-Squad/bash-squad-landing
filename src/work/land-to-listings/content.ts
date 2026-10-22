import metadata from '../content/land-to-listings';
import type { CaseStudyImage } from '../types';

const DIR = '/work/land-to-listings';

function screen(name: string, alt: string): CaseStudyImage {
  return { src: `${DIR}/${name}.webp`, alt, width: 1440, height: 900, retina: true };
}

const study = {
  ...metadata,
  portrait: { src: `${DIR}/m-home.webp`, alt: 'The Land to Listings home page on a phone: the headline over the plat drawing.', width: 780, height: 1688 },
  facts: [
    { label: 'For', value: 'A brokerage in eastern North Carolina' },
    { label: 'Live', value: 'October 12, 2026' },
    { label: 'Built in', value: '27 days' },
    { label: 'Runs on', value: 'Their own Cloudflare account' },
  ],
  features: [
    'Land and homes on one map',
    'Listings imported from their MLS',
    'Prices and status synced every night',
    'Brokers sign in with an email link',
  ],
  brief: {
    audiences: [
      { lead: 'Builders want', body: 'acreage, lot counts and the county, on a map. Land gets a tree-shaped pin and homes get a house, so a builder can see a county’s land at a glance and filter it by price and size.' },
      { lead: 'Home buyers want', body: 'photos, beds, baths and a price. Each home shows its price first, with the facts under it, then every photo in a strip that opens full screen. The inquiry form on the page tells the brokers which home it’s about.' },
      { lead: 'Landowners want', body: 'an idea of what their land is worth. The form asks where it is and how to reach them, and nothing else is required. The page says the reply is the brokers’ opinion, not an appraisal.' },
      { lead: 'The brokers want', body: 'to run it themselves. They sign in with an emailed link, bring a listing in by its MLS number, drag photos into order and undo a status change from the same row. Every inquiry is saved before the email goes out.' },
    ],
  },
  story: {
    title: 'What we built',
    intro: 'Five screens from the live site and the admin.',
    steps: [
      {
        title: 'Land for sale',
        body: 'Filters for county, price and acreage narrow the cards and the map at once. The filters are kept in the page’s address, so a builder can send a partner the exact search. When a seller wants privacy, the map shows a one-mile circle instead of the address.',
        image: screen('land', 'The Land for sale page: a search box, filters, listing cards with aerial photos, and a map of eastern North Carolina with tree-shaped pins and soft circles.'),
      },
      {
        title: 'A home listing',
        body: 'The price comes first, with beds, baths, square feet and year built under it. Below that is every photo; open one to go full screen, then swipe or zoom. Photos are resized when they’re uploaded, so a thumbnail loads a thumbnail-sized file.',
        image: screen('listing', 'A new home in Cary: the price with beds, baths, interior square feet and year built, an “Ask about this home” button, and a strip of large photos.'),
      },
      {
        title: 'A community page',
        body: 'Each development has one page with its aerial photos, its site plan and every home or lot in it. In search results it appears once, with its price range, instead of as a dozen near-identical homes.',
        image: screen('community', 'A community page: an aerial photo of the development with its entrance sign, a site plan listing each lot and its acreage, and the community’s name and address.'),
      },
      {
        title: 'The admin',
        body: 'Listings sort by status, with the address first. Publish, Sold and Hide each have an Undo in the same row. The editor holds the photos, the map pin, the MLS link and the community, with a Save button that stays on screen.',
        image: screen('admin-listings', 'The admin listings table: Current and Sold tabs, a search box and a sort, and rows with each listing’s photo, address, type, price, status and actions.'),
      },
      {
        title: 'The land value form',
        body: 'It asks where the land is and how to reach them, and nothing else is required. Their own drone footage plays beside it on a slow loop. Each lead is saved before the email goes out, so a mail outage can’t lose one.',
        image: screen('land-value', 'The “Tell us about your land” page: an aerial video of a road through green fields beside a numbered form.'),
      },
    ],
  },
  pipeline: {
    title: 'Listings arrive from the MLS',
    body: 'Their listings already live in the MLS. We connected the site to it through the Spark API, so a listing is entered once, in the MLS, and not typed in again.',
    stages: [
      { name: 'Feed', body: 'Each listing arrives with its facts, its agents and every photo. The site takes only the team’s own listings and follows each listing’s MLS display settings.' },
      { name: 'Import', body: 'A broker types an MLS number and gets a draft to review. The first batch brought in 25 listings and 802 photos.' },
      { name: 'Nightly', body: 'At 4 a.m. the site checks every linked listing against the MLS. Prices and status update on their own, a pending sale shows Under Contract, and a sold or withdrawn listing comes off the site.' },
    ],
  },
  timeline: {
    title: ['27 days to launch,', 'and the week after.'],
    weeks: [
      {
        range: 'Sep 15–21',
        theme: 'A working map',
        milestones: [
          { date: 'Sep 15', title: 'First commit', note: 'Astro on Cloudflare Workers.' },
          { date: 'Sep 18', title: 'The map', note: 'Land and homes on one searchable map.' },
        ],
      },
      {
        range: 'Sep 22–28',
        theme: 'The design',
        milestones: [
          { date: 'Sep 25', title: 'Site design', note: 'Paper, ink and survey drawings across the site.' },
          { date: 'Sep 27', title: 'Home page options', note: 'Three directions for the client to pick from.' },
        ],
      },
      {
        range: 'Sep 29–Oct 5',
        theme: 'The MLS',
        milestones: [
          { date: 'Oct 2', title: 'MLS import', note: 'Listings come in by their MLS number.' },
          { date: 'Oct 3', title: 'Their own account', note: 'The site moves to the client’s Cloudflare account.' },
        ],
      },
      {
        range: 'Oct 6–12',
        theme: 'Launch',
        milestones: [
          { date: 'Oct 9', title: 'Communities', note: 'Each development gets its own page.' },
          { date: 'Oct 12', title: 'Live', note: 'landtolistings.com goes live with real listings.' },
        ],
      },
      {
        range: 'Oct 13–19',
        theme: 'After launch',
        milestones: [
          { date: 'Oct 14', title: 'Nightly sync', note: 'Prices and status stay current on their own.' },
          { date: 'Oct 19', title: 'Faster pages', note: 'Desktop Lighthouse scores of 98 to 100.' },
        ],
      },
    ],
  },
  stats: {
    title: 'The numbers',
    items: [
      { value: '27', label: 'days from the first commit to launch' },
      { value: '853', label: 'automated tests run before every release' },
      { value: '98–100', label: 'desktop Lighthouse scores, measured October 19' },
    ],
  },
  landed: {
    title: 'Where it landed',
    lead: 'Live at landtolistings.com since October 12, on the firm’s own Cloudflare account. The brokers add listings themselves and the MLS keeps prices current overnight.',
    note: 'Their home page opens on a plat of an imaginary street that draws itself: contours, the boundary, the lane, the lots, then the houses. With motion turned off it shows the finished drawing.',
    video: {
      mp4: `${DIR}/intro.mp4`,
      poster: `${DIR}/intro-poster.webp`,
      width: 1280,
      height: 756,
      label: 'A recording of the Land to Listings home page loading: the plat draws itself, from contour lines to the finished street of houses.',
    },
    region: {
      label: 'North Carolina, with Raleigh marked',
      width: 400,
      height: 157,
      d: 'M155.3 1.6L187.1 2.5L223.6 2.8L392.9 2.2L398.2 25.1L385.2 22.9L383.5 25.7L367.7 29.1L365.4 32.3L354.9 33.2L355.4 37.3L368.2 34.5L370 37L384 34.2L388.5 39.5L396.9 37.3L400 51.1L397.2 57.7L391.6 58.3L379.9 72.4L364.4 73L361.8 82.7L368.4 92.4L373.8 94.3L363.8 110.3L355.4 108.4L340.7 110L330.5 113.4L314.4 124.4L301.7 138.8L295.1 157L285.4 152.9L268.6 156.7L215.9 102.2L163.7 101.2L164.5 94.6L157.4 84.9L152.5 88.4L152.3 82.4L95 79.6L82.2 81.8L72.3 87.1L56.3 90.9L32.6 91.8L0 91.5L1.3 78L10.4 76.8L14 67.4L25.5 58.9L38.2 58.6L49.6 49.8L61.6 46.7L71.8 33.8L78.2 30.1L79.4 35.7L97.8 24.8L106.2 27L112 16.3L120.7 13.5L122.7 0L155.3 1.6Z',
      dot: [264.1, 46.3],
    },
    facts: [
      { label: 'Where', value: 'Raleigh and eastern North Carolina' },
      { label: 'Live', value: 'October 12, 2026' },
      { label: 'Runs on', value: 'Cloudflare Workers, D1, R2, Queues' },
      { label: 'Built with', value: 'Astro, MapLibre, Better Auth, Spark API' },
    ],
  },
  close: {
    title: 'Tell us the hard thing',
    body: 'An engineer reads every message. Tell us what’s broken, half-built or still an idea, and we’ll say if we’re the right fit.',
  },
  related: ['custom-software', 'fractional-engineering-team'],
};

export default study;
