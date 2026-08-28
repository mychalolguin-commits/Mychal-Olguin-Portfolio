import { Project, Experience } from './types';
import { BarChart3, Ruler, Sparkles } from 'lucide-react';

export const PROJECTS: Project[] = [
  {
    slug: 'towne-oaks-paid-social',
    title: 'Towne Oaks — Traffic → Floorplan Discovery',
    subtitle: 'Paid Social · Measurement',
    mediaType: 'meta',
    eyebrow: 'PAID SOCIAL · MEASUREMENT',
    timeframe: '3 months',
    objective: 'Traffic',
    destination: '/floorplans',
    channels: 'Meta (Facebook/Instagram)',
    tools: 'Meta Ads Manager, GA4, UTM Structure, Excel Reporting',
    description: 'A Meta campaign pointed at the floorplan pages, optimized for landing page views, with the tracking built before the spend started.',
    tags: ['Paid Social', 'Measurement', 'GA4', 'Traffic Campaigns'],
    // A capture of the real account, not stock photography. Until the file
    // exists the detail page falls back to the rendered data tile — see
    // public/captures/README.md.
    heroImage: '/captures/meta-ads-manager.png',
    challenge: 'Not enough traffic reached the floorplan pages, and nothing connected the visits that did arrive back to a campaign.',
    solution: 'A Meta traffic campaign with one UTM structure feeding GA4 events, so a floorplan visit could be traced to the ad that produced it.',
    result: '2,475 landing page views at $0.52 each over three months, on tracking that later campaigns can reuse.',
    problem: 'Towne Oaks needed more people looking at the available floorplans. Traffic came mostly from search and referral, and paid social was barely running. There was also no way to tell which campaign or creative produced a floorplan visit, so there was nothing to optimize against.',
    approach: `I optimized for landing page views rather than link clicks. A click counts when someone taps the ad; a landing page view counts when the page finishes loading. The second number is the one worth paying for.

Every ad carried the same UTM structure — utm_source, utm_medium, utm_campaign, utm_content — so the traffic could be split apart in GA4. I added custom GA4 events to record how far into the floorplan pages people got.`,
    reporting: 'A weekly Excel report pulling from Meta Ads Manager exports and GA4 explorations, tracking reach, impressions, landing page views, spend, and cost per landing page view. A second view broke the same numbers out by creative, which is what drove the changes.',
    results: `Over three months the campaign delivered 2,475 landing page views to the floorplan pages at $0.52 each, on $1,295 of spend, reaching 67,454 people across 233,526 impressions.

The tracking outlasted the campaign. Retargeting and conversion campaigns can run on the same UTM structure and the same events without rebuilding any of it.`,
    nextSteps: 'Next is retargeting the people who viewed a floorplan, optimizing for tour bookings rather than traffic. After that, Meta CAPI for server-side events, since iOS restrictions have made the pixel less reliable on its own.',
    metrics: [
      { label: 'Spend', value: '$1,295' },
      { label: 'LP Views', value: '2,475' },
      { label: 'Cost/LPV', value: '$0.52' },
      { label: 'Reach', value: '67,454' },
      { label: 'Impressions', value: '233,526' }
    ],
    dashboardData: {
      totals: {
        reach: 67454,
        impressions: 233526,
        lpv: 2475,
        spend: 1295
      },
      monthly: [
        { month: 'Month 1', lpv: 700, spend: 350 },
        { month: 'Month 2', lpv: 1000, spend: 500 },
        { month: 'Month 3', lpv: 775, spend: 445 }
      ],
      utm: 'utm_source=meta&utm_medium=paid_social&utm_campaign=towneoaks_traffic_floorplans',
      ga4: {
        dateRange: 'Oct 20, 2025 – Jan 20, 2026',
        totals: {
          sessions: 7857,
          engagedSessions: 3694,
          engagementRate: 47.02,
          avgEngagementTime: '53s',
          eventsPerSession: 7.92,
          eventCount: 62214,
          keyEvents: 0
        },
        channels: [
          { name: 'Paid Social', sessions: 3015, sessionShare: 38.37, engagedSessions: 716, engagedShare: 19.38, engagementRate: 23.75, avgEngagementTime: '15s', eventsPerSession: 4.12, eventCount: 12434 },
          { name: 'Direct', sessions: 2192, sessionShare: 27.9, engagedSessions: 1145, engagedShare: 31, engagementRate: 52.24, avgEngagementTime: '1m01s', eventsPerSession: 8.58, eventCount: 18807 },
          { name: 'Organic Search', sessions: 1974, sessionShare: 25.12, engagedSessions: 1451, engagedShare: 39.28, engagementRate: 73.51, avgEngagementTime: '1m39s', eventsPerSession: 12.42, eventCount: 24516 },
          { name: 'Referral', sessions: 475, sessionShare: 6.05, engagedSessions: 315, engagedShare: 8.53, engagementRate: 66.32, avgEngagementTime: '1m29s', eventsPerSession: 12.36, eventCount: 5865 },
          { name: 'Organic Social', sessions: 81, sessionShare: 1.03, engagedSessions: 54, engagedShare: 1.46, engagementRate: 66.67, avgEngagementTime: '41s', eventsPerSession: 7.06, eventCount: 572 },
          { name: 'Unassigned', sessions: 6, sessionShare: 0.08, engagedSessions: 0, engagedShare: 0, engagementRate: 0, avgEngagementTime: '24s', eventsPerSession: 3.33, eventCount: 20 }
        ]
      }
    },
    media: {
      variant: 'ga4',
      dateLabel: 'GA4 Snapshot (Oct 20 – Jan 20)',
      // Ordered largest to smallest — MediaTile steps one hue down that order,
      // so the sequence here is what the chart encodes.
      channelMix: [
        { name: 'Paid Social', value: 38.4 },
        { name: 'Direct', value: 27.9 },
        { name: 'Organic', value: 25.1 },
        { name: 'Referral', value: 6.0 },
        { name: 'Social', value: 2.6 },
      ],
      stats: { sessions: 7857, paidSocialShare: 38.4, engagementRate: 47.0, avgEngagedTime: '53s' },
      sparkline: [{ value: 1800 }, { value: 2100 }, { value: 1950 }, { value: 2400 }, { value: 2650 }, { value: 2500 }, { value: 2900 }],
    }
  },
  {
    slug: 'cornerstone-apartment-websites',
    title: 'Cornerstone Capital — Four Sites Rebuilt for AI Answers',
    subtitle: 'Web Design · SEO · AI Search',
    mediaType: 'seo',
    eyebrow: 'WEB DESIGN · SEO · AI SEARCH',
    timeframe: '2025 · ~4 months',
    objective: 'Rebuild + organic visibility',
    channels: 'Organic Search · AI Assistants',
    tools: 'Yardi RentCafe site builder, hand-written HTML/CSS widgets, on-page SEO, 360° capture',
    description:
      'Four apartment communities rebuilt. ChatGPT now answers questions about two of them from the property\'s own page instead of a listing site.',
    tags: ['Web Design', 'Answer-First Content', 'On-Page SEO', 'Multifamily'],
    heroImage: '/captures/borders-site.png',
    heroSource: 'bordersapts.com',

    challenge:
      'Four out-of-date property sites with no FAQ content, no meta descriptions, and no keyword targeting. Renters found listing sites before they found the property.',
    solution:
      'Full rebuilds in Yardi RentCafe with hand-written widgets, and every page rewritten to answer the questions the leasing office gets by phone.',
    result:
      'ChatGPT now cites Borders and Los Cedros from their own sites, using the pet policy written on the page.',

    // No GA4 or Search Console baseline was captured for this engagement, so
    // there are no numbers to headline. WorkDetail skips the metrics rail when
    // this is empty — which is the honest presentation, and the whole argument
    // here is carried by the screenshots instead.
    metrics: [],

    narrative: [
      {
        title: 'What they had',
        body: `Cornerstone Capital runs four communities: Borders and Los Cedros in Brownsville, Compass Bay in Corpus Christi, and Verano Oaks in Hurst. All four sites were out of date. None had FAQ content, meta descriptions, or keyword targeting.

Search for pet-friendly apartments in Brownsville and you got Rent.com, Realtor, and Apartments.com. Each described the property from a listing feed. The property's own site did not answer the question.`,
      },
      {
        title: 'What I built',
        body: `I rebuilt all four in about four months in 2025, working solo.

The platform was Yardi's RentCafe site builder, which ships a fixed set of blocks. For anything outside that set I wrote the HTML and CSS myself and added it as a custom widget. The pet policy tiers, the FAQ blocks, and the floor-plan detail were all built that way.

I shot the 360° tours, photography, and video for three of the properties. Compass Bay's imagery was supplied. The on-page SEO was small: H1 and H2 structure on every page, and alt text on every photo.`,
      },
      {
        title: 'How I wrote the pages',
        body: `I took the questions the leasing office gets by phone and answered them on the page, in full sentences, instead of leaving them to a PDF or the chat widget.

The pet policy is the clearest case. Rather than "we're pet friendly," the page lists the terms: two weight tiers, a limit of two pets, the one-time fee and monthly rent for each tier, and a note that breed restrictions apply. The floor-plan FAQ covers which plans exist, whether units have laundry, whether homes have a patio or balcony, and how soon you can move in.

These sites have no schema markup. No JSON-LD, no FAQPage, no LocalBusiness. The structure is a heading with the question and a sentence with the answer.`,
        artifact: {
          src: '/captures/apts-pet-widget.png',
          alt: 'Custom pet policy widget and floor plan FAQ built for Los Cedros Apartments',
          caption: 'Pet policy tiers and floor-plan FAQ I built for Los Cedros',
        },
      },
      {
        title: 'What ChatGPT shows now',
        body: `Asked "pet friendly apartments in brownsville tx," ChatGPT listed seven properties. Five were sourced from Rent.com, Realtor, or Apartments.com. Two were sourced from the property's own website: Borders and Los Cedros. I built both.

The details match the pages. For Los Cedros it reported "up to 2 pets, with fees depending on pet size." For Borders, "up to 2 pets, with breed restrictions." Both lines come from the pet policy widget.

The screenshot shows one thing: these pages were retrieved and cited. It is not a ranking, a traffic number, or evidence of cause. No baseline was recorded before the rebuild.`,
        artifact: {
          src: '/captures/apts-ai-answer.png',
          alt: 'ChatGPT citing Borders Apartments and Los Cedros Apartments own websites for their pet policies',
          caption: 'ChatGPT, August 2026. The citations read "Borders Apartments" and "Los Cedros Apartments," not Rent.com.',
        },
      },
      {
        title: "What's still open",
        body: `Schema markup is the next step. The content is already in question-and-answer form, so adding FAQPage and LocalBusiness is a small change.

The larger gap is measurement. This project ran without a Search Console baseline, which is why this page shows screenshots and not a trend line. On the next rebuild I will record the baseline first.`,
      },
    ],

    media: {
      variant: 'seo',
      dateLabel: 'Brownsville query · Aug 2026',
      performanceSignal: { label: 'Cited by ChatGPT', value: '2 of 2', trend: 'up' },
      cwvTiles: [
        { metric: 'H1/H2', value: 'Restructured', status: 'good' },
        { metric: 'Alt text', value: 'All photos', status: 'good' },
        { metric: 'Schema', value: 'Not shipped', status: 'needs-improvement' },
      ],
      // No sparkline: there is no measured trend behind this engagement, and
      // an invented curve is exactly what this site refuses to ship.
    }
  }
];

export const EXPERIENCE: Experience[] = [
  {
    role: 'Freelance Digital Marketing Consultant',
    company: 'Self-Employed',
    period: 'Mar 2026 — Present',
    description: [
      'Built and delivered websites for 4 clients across Shopify, Squarespace, and custom code in the e-commerce, food and beverage, and home services industries.',
      'Developed social media strategies from the ground up for boutique retail and coffee catering clients, covering content pillars, platform selection, and posting cadence.',
      'Managed end-to-end project delivery from discovery to client relationships and final handoff across web design and digital strategy engagements.'
    ]
  },
  {
    role: 'Marketing Director',
    company: 'Cornerstone Capital Consulting Property Management',
    period: 'Oct 2024 — Mar 2026',
    description: [
      'Led digital marketing strategy for a 14-property multifamily portfolio, managing ~$5K/month in Google and Meta ad spend across 4 properties at an average CPL of ~$35.',
      'Monitored Meta Ads, Google Ads, and web analytics to track leads, CPL, engagement, and conversions across the full portfolio.',
      'Delivered actionable performance insights to internal teams, driving improvements to copy, landing pages, ad budgets, and messaging.',
      'Consolidated paid social, paid search, and web analytics reporting into unified dashboards to support leadership planning and budget decisions.'
    ]
  },
  {
    role: 'Marketing Manager',
    company: 'Cornerstone Capital Consulting Property Management',
    period: 'May 2023 — Oct 2024',
    description: [
      'Redesigned website copy, layouts, CTAs, and mobile experience across 7 properties to improve clarity, usability, and conversion.',
      'Built and executed SEO and AEO strategy from the ground up — optimizing content, FAQs, metadata, and social profiles — driving approximately 20% growth in organic traffic.',
      'Launched Google and Meta paid ad campaigns across 4 properties, establishing the paid media foundation that scaled into the Director role.',
      'Managed Google Business Profiles, organic social posting, and review support to strengthen local search visibility across the portfolio.'
    ]
  },
  {
    role: 'Creative Director',
    company: 'Is This Real Production',
    period: 'Feb 2022 — Feb 2024',
    description: [
      'Produced and optimized multimedia assets for digital campaigns across social and web.',
      'Partnered with clients to align creative execution with performance goals and campaign metrics.'
    ]
  }
];

export const CAPABILITIES = [
  {
    title: 'Meta Ads & Social',
    description: 'Running rigorous experiments on Meta (Facebook/Instagram) to scale winning creatives and optimize spend efficiency.',
    icon: 'MetaIcon', // Special case handled in component
    gridClass: 'md:col-span-2'
  },
  {
    title: 'Reporting & Insights',
    description: 'Building clear dashboards (Excel, Tableau) that connect channel metrics to business outcomes.',
    icon: BarChart3,
    gridClass: 'md:col-span-1'
  },
  {
    title: 'Measurement',
    description: 'Ensuring clean data hygiene through consistent UTM structures and conversion tracking setups.',
    icon: Ruler,
    gridClass: 'md:col-span-1'
  },
  {
    title: 'Creative Strategy',
    description: 'Analyzing ad performance to inform creative iterations. I bridge the gap between data and design.',
    icon: Sparkles,
    gridClass: 'md:col-span-2'
  }
];