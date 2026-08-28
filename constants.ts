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
    description: 'A traffic-focused campaign driving qualified users to floorplan pages, optimizing for landing page views with precise measurement infrastructure.',
    tags: ['Paid Social', 'Measurement', 'GA4', 'Traffic Campaigns'],
    // A capture of the real account, not stock photography. Until the file
    // exists the detail page falls back to the rendered data tile — see
    // public/captures/README.md.
    heroImage: '/captures/meta-ads-manager.png',
    challenge: 'The property lacked consistent top-of-funnel traffic to key conversion pages, and there was no measurement framework to attribute floorplan engagement back to paid efforts.',
    solution: 'Deployed a traffic-optimized campaign structure on Meta with UTM taxonomy feeding GA4 events for granular floorplan page tracking.',
    result: 'Achieved efficient cost per landing page view while building a measurement foundation for future conversion optimization.',
    problem: 'Towne Oaks needed to increase visibility of available floorplans to prospective residents. The existing marketing mix relied heavily on search and referral traffic, leaving paid social underutilized. Without a structured measurement layer, there was no clear path to attribute floorplan engagement to specific campaigns or creatives.',
    approach: 'Built a traffic campaign on Meta optimized for Landing Page Views (LPV) rather than link clicks—ensuring quality visits over vanity metrics. Established a clean UTM structure (utm_source, utm_medium, utm_campaign, utm_content) to segment traffic in GA4. Created custom events in GA4 to track floorplan page engagement depth.',
    reporting: 'Configured a weekly reporting cadence in Excel pulling from Meta Ads Manager exports and GA4 exploration reports. Metrics tracked: Reach, Impressions, LPV, Spend, Cost/LPV. Added secondary views for creative-level performance to inform iteration cycles.',
    results: 'Over 3 months, the campaign delivered 2,475 landing page views to floorplan content at $0.52/LPV—well within efficiency targets for awareness-stage traffic. The measurement framework now enables future campaign layers (retargeting, conversion optimization) with clean attribution.',
    nextSteps: 'Phase 2 will introduce retargeting audiences based on floorplan page visitors, shifting optimization toward tour scheduling. Additionally, exploring Meta CAPI integration for server-side event tracking to improve signal quality as iOS restrictions impact pixel reliability.',
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
    title: 'Cornerstone Capital — Four Sites Written to Be Quoted',
    subtitle: 'Web Design · SEO · AI Search',
    mediaType: 'seo',
    eyebrow: 'WEB DESIGN · SEO · AI SEARCH',
    timeframe: '2025 · ~4 months',
    objective: 'Rebuild + organic visibility',
    channels: 'Organic Search · AI Assistants',
    tools: 'Yardi RentCafe site builder, hand-written HTML/CSS widgets, on-page SEO, 360° capture',
    description:
      'Four apartment communities rebuilt so that when a renter asks an AI assistant a question, the assistant quotes the property instead of a listing aggregator.',
    tags: ['Web Design', 'Answer-First Content', 'On-Page SEO', 'Multifamily'],
    heroImage: '/captures/borders-site.png',
    heroSource: 'bordersapts.com',

    challenge:
      'Four dated property sites with no FAQ content, no meta descriptions, and no keyword targeting — so renters found aggregators describing the property second-hand before they found the property.',
    solution:
      'Full rebuilds in Yardi RentCafe, extended with hand-written widgets, and every page rewritten to answer the questions a leasing office actually gets by phone.',
    result:
      'ChatGPT now answers Brownsville renter queries by citing Borders and Los Cedros directly from their own sites, quoting the pet policy off the page.',

    // No GA4 or Search Console baseline was captured for this engagement, so
    // there are no numbers to headline. WorkDetail skips the metrics rail when
    // this is empty — which is the honest presentation, and the whole argument
    // here is carried by the screenshots instead.
    metrics: [],

    narrative: [
      {
        title: 'What they had',
        body: `Four Cornerstone Capital communities — Borders and Los Cedros in Brownsville, Compass Bay in Corpus Christi, Verano Oaks in Hurst — were running on dated sites with the same three gaps: no FAQ content, no meta descriptions, and no keyword targeting.

The practical effect shows up the moment someone searches. Ask about pet-friendly apartments in Brownsville and you get Rent.com, Realtor, and Apartments.com, each describing the property second-hand from a listing feed. The property's own site had nothing on it worth quoting, so nothing quoted it.`,
      },
      {
        title: 'What I built',
        body: `Full rebuilds across all four, done over about four months in 2025, working solo.

The platform was Yardi's RentCafe site builder — a template system with a fixed catalogue of blocks. Anything it didn't offer, I wrote by hand in HTML and CSS and dropped in as a custom widget, which is how the pet policy tiers, the FAQ blocks, and the floor-plan detail got onto pages that otherwise couldn't hold them.

I shot the 360° tours, photography, and video for three of the four; Compass Bay's imagery was supplied. The on-page SEO was deliberately narrow: a real H1 and H2 structure on every page, and alt text on every photo.`,
      },
      {
        title: 'Written to be answered',
        body: `The rule was simple — take the questions the leasing office actually gets by phone and answer them in plain sentences on the page, rather than burying them in a PDF or leaving them to the chat widget.

The pet policy is the clearest example. Instead of "we're pet friendly," the page states the terms: two weight tiers, a two-pet limit, the one-time fee and the monthly rent for each tier, and a line saying breed restrictions apply. The floor-plan FAQ does the same thing in question form — what plans are offered, whether there's laundry in the unit, whether homes have a patio or balcony, how quickly you can move in.

Worth being precise about what this was not. There is no schema markup on these sites. No JSON-LD, no FAQPage, no LocalBusiness. Just a heading that names the question and a sentence that answers it, in the order a person would ask.`,
        artifact: {
          src: '/captures/apts-pet-widget.png',
          alt: 'Custom pet policy widget and floor plan FAQ built for Los Cedros Apartments',
          caption: 'The hand-coded pet policy tiers and FAQ block — Los Cedros',
        },
      },
      {
        title: 'What came back',
        body: `Asked "pet friendly apartments in brownsville tx," ChatGPT returns seven properties. Five are described from Rent.com, Realtor, or Apartments.com. Two are cited from their own websites — Borders and Los Cedros. Both are mine.

What it says about them came off the page. For Los Cedros: "up to 2 pets, with fees depending on pet size." For Borders: "up to 2 pets, with breed restrictions." Those are the widget's own terms, read and repeated back.

The boundary matters as much as the result. That screenshot proves retrieval and citation, and nothing more. It is not a ranking, not a traffic lift, and not proof of causation — no before-and-after baseline was captured, and I would rather show the receipt for what it is than dress it up as one.`,
        artifact: {
          src: '/captures/apts-ai-answer.png',
          alt: 'ChatGPT citing Borders Apartments and Los Cedros Apartments own websites for their pet policies',
          caption: 'ChatGPT, August 2026 — the citation chips read "Borders Apartments" and "Los Cedros Apartments," not Rent.com',
        },
      },
      {
        title: "What's still open",
        body: `Schema markup is the obvious next layer — FAQPage and LocalBusiness on content that is already written in question-and-answer form is a small change with a clear rationale.

The bigger gap is measurement. This engagement ran without a Search Console baseline, which is why this page argues from screenshots rather than a trend line. That is a fixable mistake and the first thing I would set up on the next one: a baseline before the rebuild, so the next version of this case study can show the curve as well as the citation.`,
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