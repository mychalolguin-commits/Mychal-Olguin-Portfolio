export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  heroImage: string;
  mediaType: 'meta' | 'seo' | 'reporting';
  challenge: string;
  solution: string;
  result: string;
  metrics: Metric[];
  // Extended fields for detailed case studies
  eyebrow?: string;
  timeframe?: string;
  objective?: string;
  destination?: string;
  channels?: string;
  tools?: string;
  // Extended content sections
  problem?: string;
  approach?: string;
  reporting?: string;
  execution?: string;
  results?: string;
  nextSteps?: string;
  // Artifact images
  artifacts?: Artifact[];
  // Dashboard data for case studies with metrics
  dashboardData?: DashboardData;
  // Media tile data for mini-dashboard visualization
  media?: MediaData;
}

export interface DashboardData {
  totals: {
    reach: number;
    impressions: number;
    lpv: number;
    spend: number;
  };
  monthly: MonthlyData[];
  utm: string;
  ga4?: GA4Data;
}

export interface GA4Data {
  dateRange: string;
  totals: {
    sessions: number;
    engagedSessions: number;
    engagementRate: number;
    avgEngagementTime: string;
    eventsPerSession: number;
    eventCount: number;
    keyEvents: number;
  };
  channels: GA4Channel[];
}

export interface GA4Channel {
  name: string;
  sessions: number;
  sessionShare: number;
  engagedSessions: number;
  engagedShare: number;
  engagementRate: number;
  avgEngagementTime: string;
  eventsPerSession: number;
  eventCount: number;
}

export interface MonthlyData {
  month: string;
  lpv: number;
  spend: number;
}

export interface Artifact {
  src: string;
  alt: string;
  caption?: string;
}

export interface Metric {
  label: string;
  value: string;
  placeholder?: boolean;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

// Media variant types
export type MediaVariant = 'ga4' | 'seo' | 'paidSocial';

export interface ChannelMix {
  name: string;
  value: number;       // percentage 0-100
  color: string;       // e.g., 'rgb(74, 222, 128)'
}

export interface SparklinePoint {
  value: number;
}

// GA4 Variant
export interface GA4MediaData {
  variant: 'ga4';
  dateLabel: string;
  channelMix: ChannelMix[];
  stats: {
    sessions: number;
    paidSocialShare: number;
    engagementRate: number;
    avgEngagedTime: string;
  };
  sparkline: SparklinePoint[];
}

// SEO Variant
export interface SEOMediaData {
  variant: 'seo';
  dateLabel: string;
  performanceSignal: {
    label: string;
    value: string;
    trend: 'up' | 'down' | 'flat';
  };
  cwvTiles: { metric: string; value: string; status: 'good' | 'needs-improvement' | 'poor' }[];
  speedScore?: number;
  sparkline: SparklinePoint[];
}

// PaidSocial Variant
export interface PaidSocialMediaData {
  variant: 'paidSocial';
  dateLabel: string;
  funnel: { label: string; value: number; displayValue: string }[];
  stats: { spend: string; ctr?: string; cpl?: string };
  sparkline: SparklinePoint[];
}

export type MediaData = GA4MediaData | SEOMediaData | PaidSocialMediaData;