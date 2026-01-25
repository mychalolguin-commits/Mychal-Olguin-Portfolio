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
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2673&auto=format&fit=crop',
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
      channelMix: [
        { name: 'Paid Social', value: 38.4, color: 'rgb(74, 222, 128)' },
        { name: 'Direct', value: 27.9, color: 'rgb(96, 165, 250)' },
        { name: 'Organic', value: 25.1, color: 'rgb(251, 191, 36)' },
        { name: 'Referral', value: 6.0, color: 'rgb(167, 139, 250)' },
        { name: 'Social', value: 2.6, color: 'rgb(244, 114, 182)' },
      ],
      stats: { sessions: 7857, paidSocialShare: 38.4, engagementRate: 47.0, avgEngagedTime: '53s' },
      sparkline: [{ value: 1800 }, { value: 2100 }, { value: 1950 }, { value: 2400 }, { value: 2650 }, { value: 2500 }, { value: 2900 }],
    }
  },
  {
    slug: 'borders-seo-conversion',
    title: 'Borders — SEO + Conversion System Redesign',
    subtitle: 'SEO · Conversion · UX',
    mediaType: 'seo',
    eyebrow: 'SEO · CONVERSION · UX',
    timeframe: '30-day snapshot (placeholder)',
    objective: 'Organic Growth + Conversion',
    channels: 'Organic Search',
    tools: 'GA4, Google Search Console, On-page SEO, IA/UX, Content updates',
    description: 'A foundational SEO and conversion optimization initiative restructuring site architecture, on-page elements, and user flows to improve organic visibility and engagement.',
    tags: ['Technical SEO', 'CRO', 'UX Research', 'Content Strategy'],
    heroImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2672&auto=format&fit=crop',
    challenge: 'The site suffered from poor indexability and unclear user journeys, leading to stagnant organic traffic despite content investment.',
    solution: 'Implemented a comprehensive SEO and UX overhaul targeting technical foundations, content structure, and conversion pathways.',
    result: 'Early indicators show improved rankings and engagement, with full impact expected as changes index and mature.',
    problem: `• Organic traffic plateaued despite consistent content production—indicating structural or technical barriers to growth.
• High bounce rates on key landing pages suggested misalignment between search intent and page content/UX.
• No systematic measurement framework existed to connect SEO efforts to downstream engagement or conversion events.`,
    approach: `• Conducted a technical SEO audit to identify indexation blockers, crawl inefficiencies, and on-page gaps.
• Mapped user journeys from SERP entry points to conversion actions, identifying friction points in navigation and content hierarchy.
• Prioritized quick-win optimizations (title tags, meta descriptions, internal linking) alongside structural IA improvements.
• Established baseline metrics in GA4 and GSC to measure impact over a 30/60/90-day window.`,
    execution: `• Rewrote title tags and meta descriptions for top 20 landing pages targeting primary keyword clusters.
• Restructured internal linking to distribute authority toward high-intent conversion pages.
• Implemented schema markup (Organization, LocalBusiness, FAQ) to improve SERP feature eligibility.
• Optimized Core Web Vitals by compressing images and deferring non-critical scripts.
• Created content briefs for new pages targeting keyword gaps identified in competitive analysis.`,
    results: `These metrics represent a 30-day snapshot. Full attribution will be clearer at the 60–90 day mark as indexing propagates:

• Organic Sessions: +22% MoM
• Engagement Rate: +11%
• Lead Conversion Rate: 1.6% → 2.2%
• Top 10 Keywords: +14
• GSC Clicks: +18%`,
    nextSteps: `• Expand content production based on keyword gap analysis—targeting informational queries to build topical authority.
• Implement conversion rate experiments (A/B tests) on primary landing pages to further optimize lead capture.
• Build a recurring SEO reporting dashboard connecting GSC, GA4, and CRM data for ongoing performance visibility.`,
    metrics: [
      { label: 'Organic Sessions', value: '+22% MoM', placeholder: true },
      { label: 'Engagement Rate', value: '+11%', placeholder: true },
      { label: 'Lead Conversion', value: '1.6% → 2.2%', placeholder: true },
      { label: 'Top 10 Keywords', value: '+14', placeholder: true },
      { label: 'GSC Clicks', value: '+18%', placeholder: true }
    ],
    artifacts: [
      { src: '/case-studies/borders/before-after.png', alt: 'Before/after comparison', caption: 'SERP visibility improvement over 30 days' },
      { src: '/case-studies/borders/search-console.png', alt: 'Google Search Console performance', caption: 'GSC clicks and impressions trend' }
    ],
    media: {
      variant: 'seo',
      dateLabel: 'GSC Snapshot (30-day)',
      performanceSignal: { label: 'Organic Sessions', value: '+22%', trend: 'up' },
      cwvTiles: [
        { metric: 'LCP', value: '1.2s', status: 'good' },
        { metric: 'CLS', value: '0.05', status: 'good' },
        { metric: 'INP', value: '120ms', status: 'needs-improvement' },
      ],
      speedScore: 92,
      sparkline: [{ value: 420 }, { value: 480 }, { value: 510 }, { value: 560 }, { value: 620 }, { value: 710 }],
    }
  }
];

export const EXPERIENCE: Experience[] = [
  {
    role: 'Marketing Director',
    company: 'Cornerstone Capital Consulting Property Management',
    period: 'Oct 2024 — Present',
    description: [
      'Supported paid media performance across Meta (Facebook & Instagram) for a multi-family portfolio by monitoring pacing, spend, and conversion trends against lead and leasing KPIs.',
      'Analyzed campaign performance data daily using Excel dashboards to identify optimization opportunities, improve lead quality, and reduce cost per lead.',
      'Partnered closely with internal teams to share performance insights, explain trends, and recommend data-informed adjustments to targeting, budget allocation, and messaging.',
      'Consolidated reporting across paid social, paid search, and web analytics to support leadership decision-making and quarterly planning.'
    ]
  },
  {
    role: 'Marketing Manager',
    company: 'Cornerstone Capital Consulting Property Management',
    period: 'May 2023 — Oct 2024',
    description: [
      'Executed mixed always-on digital campaigns across paid social and search, increasing engagement and inbound leads across multiple locations.',
      'Monitored campaign metrics including impressions, CTR, CPL, and conversions, adjusting strategy based on performance trends.',
      'Built SEO-optimized web pages and tracked traffic and lead performance using analytics tools to improve discovery and conversion.',
      'Supported local search performance through Google Business Profile optimization and review strategy, improving high intent visibility.'
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