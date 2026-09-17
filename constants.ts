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
      'Four apartment websites rebuilt around renter questions. ChatGPT later cited two property-owned pages and surfaced a third rebuilt property.',
    tags: ['Web Design', 'Answer-First Content', 'On-Page SEO', 'Multifamily'],
    heroImage: '/captures/borders-site.png',
    heroSource: 'bordersapts.com',
    virtualTour: {
      title: 'Walk through the space before booking a visit.',
      embedUrl: 'https://3dtour.yardiyc1.com/3dLoad.html#BXBV9%26%2c%3f',
      sourceUrl: 'https://www.loscedrosapts.com/floorplans',
      description: 'I added interactive 360° tours to help renters explore the apartments online and take the next step toward scheduling a visit or signing a lease. This is the Cedros floor plan at Los Cedros Apartments.',
      role: 'I shot and edited the 360° photography, built the room-to-room navigation, and embedded the finished tours on the property website.',
      outcome: 'I observed more website visitors taking action, with more scheduled tours and leases. This is a qualitative observation from the project; I do not have a measured lift attributable to the 360° tours alone.',
    },

    challenge:
      'Four out-of-date property sites with no FAQ content, no meta descriptions, and no keyword targeting. Renters found listing sites before they found the property.',
    solution:
      'Full rebuilds in Yardi RentCafe with hand-written widgets, and every page rewritten to answer the questions the leasing office gets by phone.',
    result:
      'ChatGPT now cites Borders and Los Cedros from their own sites, and Verano Oaks surfaced in a separate Hurst apartment answer.',

    // No GA4 or Search Console baseline was captured for this engagement, so
    // there are no numbers to headline. WorkDetail skips the metrics rail when
    // this is empty — which is the honest presentation, and the whole argument
    // here is carried by the screenshots instead.
    metrics: [],

    narrative: [
      {
        title: 'What ChatGPT showed',
        body: `Asked "pet friendly apartments in brownsville tx," ChatGPT listed seven properties. Five were sourced from Rent.com, Realtor, or Apartments.com. Two were sourced from the property's own website: Borders and Los Cedros. I built both.

The details match the pages. For Los Cedros it reported "up to 2 pets, with fees depending on pet size." For Borders, "up to 2 pets, with breed restrictions." Both lines come from the pet policy widget.

Verano Oaks also surfaced in a separate ChatGPT answer for Hurst apartments under $1,200/month. That screenshot is a visibility signal, but the clean owned-source citation proof is still Borders and Los Cedros.

The screenshots show one thing: these properties were retrieved, surfaced, and in two cases cited from property-owned pages. This is not a ranking, a traffic number, or evidence of cause. No baseline was recorded before the rebuild.`,
        artifact: {
          src: '/captures/apts-ai-answer.png',
          alt: 'ChatGPT citing Borders Apartments and Los Cedros Apartments own websites for their pet policies',
          caption: 'ChatGPT, August 2026. The citations read "Borders Apartments" and "Los Cedros Apartments," not Rent.com.',
        },
      },
      {
        title: 'Why the answer was there',
        body: `I took the questions the leasing office gets by phone and answered them on the page, in full sentences, instead of leaving them to a PDF or the chat widget.

The pet policy is the clearest case. Rather than "we're pet friendly," the page lists the terms: two weight tiers, a limit of two pets, the one-time fee and monthly rent for each tier, and a note that breed restrictions apply. The floor-plan FAQ covers which plans exist, whether units have laundry, whether homes have a patio or balcony, and how soon you can move in.

These sites have no schema markup. No JSON-LD, no FAQPage, no LocalBusiness. The structure is a heading with the question and a sentence with the answer.`,
      },
      {
        title: 'What I rebuilt',
        body: `I rebuilt all four in about four months in 2025, working solo.

The platform was Yardi's RentCafe site builder, which ships a fixed set of blocks. For anything outside that set I wrote the HTML and CSS myself and added it as a custom widget. The pet policy tiers, the FAQ blocks, and the floor-plan detail were all built that way.

I shot the 360° tours, photography, and video for three of the properties. Compass Bay's imagery was supplied. The on-page SEO was small: H1 and H2 structure on every page, and alt text on every photo.`,
      },
      {
        title: 'What they had before',
        body: `Cornerstone Capital runs four communities: Borders and Los Cedros in Brownsville, Compass Bay in Corpus Christi, and Verano Oaks in Hurst. All four sites were out of date. None had FAQ content, meta descriptions, or keyword targeting.

Search for pet-friendly apartments in Brownsville and you got Rent.com, Realtor, and Apartments.com. Each described the property from a listing feed. The property's own site did not answer the question.`,
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
  },
  {
  slug: 'ire-junk-removal-website',
  title: 'IRE Junk Removal — A First Website Built for Local Inquiries',
  subtitle: 'Web Design · Copywriting · Local SEO',
  eyebrow: 'WEB DESIGN · COPYWRITING · LOCAL SEO',
  timeframe: 'March–August 2026',
  objective: 'First website + quote inquiries',
  channels: 'Website · Local Search',
  tools: 'Squarespace, page titles, meta descriptions, service-area copy',
  description: 'A first website for a Rio Grande Valley junk removal business, with clear service information, local copy, and a path to request a quote.',
  tags: ['Squarespace', 'Copywriting', 'Local SEO', 'Home Services'],
  mediaType: 'seo',
  heroImage: '/captures/ire-homepage.png',
  heroSource: 'irejnkremoval.com · September 2026',
  websiteUrl: 'https://www.irejnkremoval.com/',
  challenge: 'IRE needed its first website to explain its services, show where it works, and give potential customers a way to get in touch.',
  solution: 'I built the site in Squarespace, wrote the copy, and added page titles, meta descriptions, and service-area content.',
  result: 'The business received inquiries after launch, and the owner was pleased with the site.',
  metrics: [],
  media: {
    variant: 'website',
    src: '/captures/ire-homepage.png',
    alt: 'IRE Junk Removal homepage with service information and call and booking actions',
  },
  narrative: [
    {
      title: 'A first website for the business',
      body: 'I worked with IRE Junk Removal from March through August 2026 to build its first website. My scope covered the Squarespace build, website copy, and local SEO. The site needed to explain what IRE hauls, where it operates, and how to request a quote.',
    },
    {
      title: 'Why Squarespace',
      body: 'I chose Squarespace so the owner could make future content updates without editing code. The platform choice accounted for how the business could maintain the site after the build.',
    },
    {
      title: 'Turn interest into a quote request',
      body: 'I organized the copy around practical questions: what can be hauled, which locations are covered, and what information is needed for a quote. The site gives visitors options to call or submit an inquiry.\n\nThe quote form asks for contact details, pickup city, the type and approximate amount of junk, and preferred timing. These details give the business a starting point for following up on the job.',
      artifact: {
        src: '/captures/ire-quote-form.png',
        alt: 'IRE quote request page with fields for contact details, pickup city, items, amount, and timing',
        caption: 'Published quote form · irejnkremoval.com/contact · September 2026',
      },
    },
    {
      title: 'Make the local scope clear',
      body: 'I wrote page titles and meta descriptions and added service-area copy for the Rio Grande Valley, including communities such as Mission and McAllen. The goal was to make the services and locations clear to people looking for local junk removal. Search rankings and organic traffic changes were not measured in this case study.',
    },
    {
      title: 'What happened after launch',
      body: 'The business received inquiries after the site launched, and the owner was pleased with the result. These outcomes are based on my account of the project; I do not have a verified inquiry count, booked-job total, or conversion rate to report. The live site reflects the work I delivered.',
    },
  ],
  },
  {
    slug: 'borders-organic-social',
    title: 'Borders Apartments — Organic Social Content',
    subtitle: 'Organic social · Video production',
    description: 'Instagram profile setup and original short-form videos introducing a new fitness center and showing the personality of Borders Apartments.',
    tags: ['Organic social', 'Filming', 'Editing', 'Publishing'],
    heroImage: '/captures/borders-fitness-reel-views.png',
    heroSource: 'Instagram view counts · Screenshots supplied September 2026',
    mediaType: 'meta',
    media: { variant: 'website', src: '/captures/borders-fitness-reel-views.png', alt: 'Borders installation timelapse with 1,783 views and fitness-center teaser with 1,058 views' },
    eyebrow: 'Borders Apartments · Brownsville, Texas',
    timeframe: 'Selected posts · October 2024–April 2025',
    objective: 'Build awareness of the new fitness center',
    channels: 'Instagram · Organic',
    tools: 'Instagram',
    challenge: 'Introduce a new amenity and give the property a recognizable social presence.',
    solution: 'Created the Instagram profile and username, then shot, edited, and published original reels.',
    result: 'The installation timelapse recorded 1,783 views, the teaser 1,058, and the Halloween reel 822 in the supplied screenshots.',
    metrics: [{ label: 'Installation timelapse views', value: '1,783' }, { label: 'Fitness-center teaser views', value: '1,058' }, { label: 'Halloween reel views', value: '822' }],
    metricsSource: 'Source: Instagram screenshots supplied September 2026. All three posts were organic. Counts reflect the screenshots, not current totals or unique viewers; lease outcomes were not measured.',
    socialReels: [
      { id: 'DIUHhVTPHsY', title: 'Introduce the fitness center', description: 'An opening teaser to build awareness of the new amenity. Published April 11, 2025.' },
      { id: 'DIcVNZlRz0i', title: 'Show the work behind it', description: 'A behind-the-scenes timelapse of the equipment installation. Published April 14, 2025.' },
      { id: 'DBPbu51xvy8', title: 'Make room for personality', description: 'A seasonal ghost photoshoot at the property. Published October 17, 2024.' },
    ],
    narrative: [
      { title: 'Build the presence from scratch', body: 'I created the Borders Apartments Instagram profile and username. For these selected reels, I handled filming, editing, and publishing.', artifact: { src: '/captures/borders-instagram-profile.png', alt: 'Borders Apartments Instagram profile with its property details, website link, and highlights', caption: 'Borders Apartments Instagram profile · Supplied screenshot' } },
      { title: 'Give the new amenity a story', body: 'The fitness-center content paired an opening teaser with a behind-the-scenes installation timelapse. One introduced the finished space; the other showed the work going into it. Both supported awareness of the new fitness center.' },
      { title: 'Add a seasonal moment', body: 'The Halloween reel used a ghost photoshoot at the property to bring a lighter tone to the account. It sits alongside the amenity content as an example of community-focused creative.', artifact: { src: '/captures/borders-halloween-reel-views.png', alt: 'Ghost photoshoot at the Borders Apartments sign with 822 Instagram views', caption: 'Halloween reel · 822 views in the supplied Instagram screenshot' } },
    ],
  },
  {
    slug: '392chulo-organic-video',
    title: '392chulo — Personal Automotive Content',
    subtitle: 'Personal project · Organic video',
    description: 'A self-directed automotive reel combining original footage with a short, humorous on-screen hook.',
    tags: ['Personal project', 'Organic social', 'Filming', 'Editing'],
    heroImage: '/captures/392chulo-reel.png',
    heroSource: 'Public Instagram reel · Observed September 16, 2026',
    mediaType: 'meta',
    media: { variant: 'website', src: '/captures/392chulo-reel.png', alt: '392chulo car reel on Instagram with 52.2K likes and 1.2K comments' },
    eyebrow: '392chulo · Personal project',
    timeframe: 'Published January 29, 2025',
    objective: 'Create entertaining automotive content',
    channels: 'Instagram · Organic',
    challenge: 'Make a short car clip engaging through the idea as well as the footage.',
    solution: 'Shot and edited original footage, pairing the car in the rain with a humorous on-screen hook.',
    result: 'One original organic reel recorded 1,786,205 plays, 52,160 likes, and 1,173 comments in the September 17, 2026 export.',
    metrics: [{ label: 'Plays · featured reel', value: '1.79M' }, { label: 'Likes · featured reel', value: '52,160' }, { label: 'Comments · featured reel', value: '1,173' }],
    metricsSource: 'Source: Apify Instagram Scraper export supplied September 17, 2026, for reel DFboFxHOMEH. The play total is rounded from 1,786,205; likes and comments are reported as exported. Distribution was organic. Plays are not unique viewers. The screenshot above shows the earlier rounded public display.',
    socialReels: [{ id: 'DFboFxHOMEH', title: 'A car clip with a conversational hook', description: 'Original footage and editing for my personal automotive account. Published January 29, 2025.' }],
    narrative: [
      { title: 'A personal creative outlet', body: 'I use 392chulo for automotive content outside client work. I shot and edited this reel myself and published it organically.' },
      { title: 'Give the footage a reason to watch', body: 'The reel pairs a car in the rain with a joke about its monthly payment. The on-screen text gives the footage a clear premise and invites a reaction from people familiar with car ownership.' },
      { title: 'Results beyond one reel', body: 'The September 17, 2026 Apify export recorded 3,555,726 plays across 11 reels. Four of those reels exceeded 100,000 plays. These figures describe the exported sample, not an all-time account total.\n\nThis personal project demonstrates filming, editing, and writing for a social audience. The results document audience response; client leads and sales were not measured.' },
    ],
  },
];

export const SOCIAL_CREATIVE = [
  {
    property: 'Christy Estates · Corpus Christi',
    title: 'Make the full lease savings clear.',
    strategy: 'I presented the rent discount as $2,400 in total savings over a 12-month lease. The goal was to make the full value of the offer easier to see than a monthly discount alone.',
    execution: 'The carousel paired that offer with interior photography, amenities, and an aerial image showing H-E-B across the street. Each card gave renters a specific reason to explore the property, with an “Apply now” action.',
    images: [
      { src: '/captures/christy-paid-social-offer.jpg', alt: 'Christy Estates paid-social carousel showing the $2,400 annual savings offer and apartment interior', caption: 'The offer and interior photography.' },
      { src: '/captures/christy-paid-social-location.jpg', alt: 'Christy Estates carousel card with labeled aerial photography showing H-E-B across the street', caption: 'Aerial photography makes the location benefit visible.' },
    ],
  },
  {
    property: 'Borders Apartments · Brownsville',
    title: 'Show what “centrally located” means.',
    strategy: 'I used an aerial photograph with labeled landmarks to show the property in relation to US-83 and Sunrise Mall. The image gives renters a concrete view of the location.',
    execution: 'I shot the photography, added the location markers and headline, and wrote the caption. The carousel used a “Learn more” action to invite renters to explore the property.',
    images: [
      { src: '/captures/borders-paid-social-location.jpg', alt: 'Sponsored Borders Apartments carousel with an aerial photograph labeling the property, US-83, and Sunrise Mall', caption: 'Published paid-social creative with labeled local landmarks.' },
    ],
  },
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
