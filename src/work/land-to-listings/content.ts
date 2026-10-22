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
    'The team manages its own listings',
  ],
  brief: {
    audiences: [
      { lead: 'Builders want', body: 'land that fits what they’re planning to build. They can compare acreage and asking prices across eastern North Carolina, see where each property sits and share promising searches with a partner.' },
      { lead: 'Home buyers want', body: 'to know whether a property is worth a closer look. They can explore the home through its photos, check it against their budget and needs, and contact the brokers about the place that caught their attention.' },
      { lead: 'Landowners want', body: 'help understanding what they own and whether to sell. The site gives them a way to introduce their property to the brokerage and start a conversation with someone who knows the local market.' },
      { lead: 'The brokers want', body: 'a website they can keep current themselves. They can bring properties to market and manage the inquiries that come in, with the MLS connection taking much of the repeat data entry off their hands.' },
    ],
  },
  story: {
    title: 'What we built',
    intro: 'The public site helps people find a property and get in touch. Behind it, the brokerage has the tools to manage its listings and inquiries.',
    steps: [
      {
        title: 'Land for sale',
        body: 'Builders can explore land by location, acreage and price to find opportunities that fit their plans. A search can be shared with a partner for a second opinion. For sellers who need discretion, the brokerage can market a property without publishing its exact location.',
        image: screen('land', 'The Land for sale page: a search box, filters, listing cards with aerial photos, and a map of eastern North Carolina with tree-shaped pins and soft circles.'),
      },
      {
        title: 'A home listing',
        body: 'Buyers can get a feel for a home before arranging a visit, with a full photo gallery and the details they need to weigh it against their budget. When they’re ready to ask more, their inquiry tells the brokerage which property they’re interested in.',
        image: screen('listing', 'A new home in Cary: the price with beds, baths, interior square feet and year built, an “Ask about this home” button, and a strip of large photos.'),
      },
      {
        title: 'A community page',
        body: 'Buyers can look at a whole development before choosing an individual home or lot. Its community page brings together the site plan, aerial photography and available properties, so they can get to know the place and explore what’s for sale within it.',
        image: screen('community', 'A community page: an aerial photo of the development with its entrance sign, a site plan listing each lot and its acreage, and the community’s name and address.'),
      },
      {
        title: 'The admin',
        body: 'The team can look after its listings without handing every update to a developer. Brokers decide how each property is presented and when it goes on the market, then manage availability and inquiries as the sale progresses. MLS imports spare them much of the initial data entry.',
        image: screen('admin-listings', 'The admin listings table: Current and Sold tabs, a search box and a sort, and rows with each listing’s photo, address, type, price, status and actions.'),
      },
      {
        title: 'The land value form',
        body: 'A landowner doesn’t need to be ready to sell to start a conversation. They can share what they know about their property and ask the brokerage what it could be worth. It’s a request for a local broker’s opinion, not a formal appraisal.',
        image: screen('land-value', 'The “Tell us about your land” page: an aerial video of a road through green fields beside a numbered form.'),
      },
    ],
  },
  pipeline: {
    title: 'Listings arrive from the MLS',
    body: 'We connected the brokerage’s existing MLS inventory to its website. An initial bulk import brought in 25 listings and 802 photos, so the team didn’t have to rebuild its catalog by hand.',
    stages: [
      { name: 'Feed', body: 'The connection brings in the brokerage’s own inventory, including property details and photos, while respecting each seller’s choices about what can appear online.' },
      { name: 'Import', body: 'After that initial import, the brokers can add another of their listings by MLS number, with property details and photos brought in for review. They decide when it’s ready to publish.' },
      { name: 'Nightly', body: 'Prices and availability refresh overnight as deals move forward. Buyers see when a home goes under contract, and sold or withdrawn properties come off the site.' },
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
          { date: 'Oct 2', title: 'MLS import', note: 'The team can bring existing MLS listings onto the site.' },
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
      { value: '853', label: 'automated tests in the October 19 release checks' },
      { value: '98–100', label: 'desktop Lighthouse scores, measured October 19' },
    ],
  },
  landed: {
    title: 'Where it landed',
    lead: 'Live at landtolistings.com since October 12. The brokerage owns the hosting account, manages the listings and receives inquiries from buyers and landowners through the site.',
    note: 'A survey drawing introduces a business that works from raw land through to finished homes. We carried that idea into the site’s identity, using the plat as its opening animation.',
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
