import React from 'react';
import { Search, ArrowUpRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { MediaData, GA4MediaData, SEOMediaData, PaidSocialMediaData, SparklinePoint } from '../types';

interface MediaTileProps {
  type?: 'meta' | 'seo' | 'reporting';  // Legacy fallback
  media?: MediaData;                      // New data-driven
  className?: string;
}

// Sparkline component - SVG line chart with gradient fill and glowing end dot
const Sparkline: React.FC<{ data: SparklinePoint[]; color?: string }> = ({
  data,
  color = 'rgb(74, 222, 128)'
}) => {
  if (!data.length) return null;

  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;

  const width = 100;
  const height = 32;
  const padding = 2;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((d.value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  const lastPoint = data[data.length - 1];
  const lastX = width - padding;
  const lastY = height - padding - ((lastPoint.value - min) / range) * (height - padding * 2);

  // Create area path for gradient fill
  const areaPath = `M ${padding},${height} L ${points.split(' ').map((p, i) => {
    if (i === 0) return p;
    return `L ${p}`;
  }).join(' ')} L ${lastX},${height} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-8" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path
        d={areaPath}
        fill="url(#sparklineGradient)"
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={lastX}
        cy={lastY}
        r="3"
        fill={color}
        filter="url(#glow)"
        className="animate-pulse"
      />
    </svg>
  );
};

// Stacked bar component for channel mix
const StackedBar: React.FC<{ segments: { value: number; color: string; name: string }[] }> = ({ segments }) => {
  const total = segments.reduce((acc, s) => acc + s.value, 0);

  return (
    <div className="flex w-full h-2 rounded-full overflow-hidden bg-[var(--color-bg-base)]">
      {segments.map((segment, i) => (
        <div
          key={i}
          className="h-full transition-all duration-500"
          style={{
            width: `${(segment.value / total) * 100}%`,
            backgroundColor: segment.color
          }}
          title={`${segment.name}: ${segment.value.toFixed(1)}%`}
        />
      ))}
    </div>
  );
};

// GA4 Variant - Channel mix bar + 4 stat tiles + sparkline
const GA4Variant: React.FC<{ data: GA4MediaData }> = ({ data }) => {
  return (
    <div className="relative z-10 w-full h-full p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col">
      {/* Date Label Badge */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 z-20 bg-[var(--color-nav-bg)] backdrop-blur-md border border-mint-500/30 px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-lg">
        <span className="text-[9px] md:text-[10px] lg:text-xs font-medium text-mint-400 uppercase tracking-wide">
          {data.dateLabel}
        </span>
      </div>

      {/* Channel Mix Section */}
      <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 space-y-1.5 sm:space-y-2 md:space-y-3">
        <StackedBar segments={data.channelMix.map(c => ({ value: c.value, color: c.color, name: c.name }))} />
        <div className="flex flex-wrap gap-x-2 sm:gap-x-3 md:gap-x-4 gap-y-1">
          {data.channelMix.slice(0, 4).map((channel, i) => (
            <div key={i} className="flex items-center gap-1 md:gap-1.5">
              <div
                className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full"
                style={{ backgroundColor: channel.color }}
              />
              <span className="text-[8px] md:text-[10px] lg:text-xs text-[var(--color-text-muted)]">{channel.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid - mt-auto pushes it down to fill available space */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 mt-auto pt-2 sm:pt-3 md:pt-4">
        <div className="bg-[var(--color-bg-base)]/50 rounded-lg p-1.5 sm:p-2 md:p-3 border border-[var(--color-border-subtle)]">
          <div className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-[var(--color-text-primary)]">
            {data.stats.sessions.toLocaleString()}
          </div>
          <div className="text-[7px] sm:text-[8px] md:text-[10px] lg:text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Sessions</div>
        </div>
        <div className="bg-[var(--color-bg-base)]/50 rounded-lg p-1.5 sm:p-2 md:p-3 border border-[var(--color-border-subtle)]">
          <div className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-mint-400">
            {data.stats.paidSocialShare}%
          </div>
          <div className="text-[7px] sm:text-[8px] md:text-[10px] lg:text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Paid Social</div>
        </div>
        <div className="bg-[var(--color-bg-base)]/50 rounded-lg p-1.5 sm:p-2 md:p-3 border border-[var(--color-border-subtle)]">
          <div className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-[var(--color-text-primary)]">
            {data.stats.engagementRate}%
          </div>
          <div className="text-[7px] sm:text-[8px] md:text-[10px] lg:text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Engaged</div>
        </div>
        <div className="bg-[var(--color-bg-base)]/50 rounded-lg p-1.5 sm:p-2 md:p-3 border border-[var(--color-border-subtle)]">
          <div className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-[var(--color-text-primary)]">
            {data.stats.avgEngagedTime}
          </div>
          <div className="text-[7px] sm:text-[8px] md:text-[10px] lg:text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Avg Time</div>
        </div>
      </div>

      {/* Sparkline */}
      <div className="mt-2 sm:mt-3 md:mt-4">
        <Sparkline data={data.sparkline} color="rgb(74, 222, 128)" />
      </div>
    </div>
  );
};

// SEO Variant - Performance signal card + CWV tiles + speed gauge + sparkline
const SEOVariant: React.FC<{ data: SEOMediaData }> = ({ data }) => {
  const TrendIcon = data.performanceSignal.trend === 'up'
    ? TrendingUp
    : data.performanceSignal.trend === 'down'
      ? TrendingDown
      : Minus;

  const trendColor = data.performanceSignal.trend === 'up'
    ? 'text-mint-400'
    : data.performanceSignal.trend === 'down'
      ? 'text-red-400'
      : 'text-[var(--color-text-muted)]';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-mint-500/20 border-mint-500/40 text-mint-400';
      case 'needs-improvement': return 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400';
      case 'poor': return 'bg-red-500/20 border-red-500/40 text-red-400';
      default: return 'bg-[var(--color-bg-base)] border-[var(--color-border-subtle)] text-[var(--color-text-muted)]';
    }
  };

  return (
    <div className="relative z-10 w-full h-full p-4 flex flex-col justify-between">
      {/* Date Label Badge */}
      <div className="absolute top-3 left-3 z-20 bg-[var(--color-nav-bg)] backdrop-blur-md border border-mint-500/30 px-2 py-1 rounded-md shadow-lg">
        <span className="text-[9px] font-medium text-mint-400 uppercase tracking-wide">
          {data.dateLabel}
        </span>
      </div>

      {/* Performance Signal Card */}
      <div className="mt-8 bg-[var(--color-bg-base)]/50 rounded-xl p-3 border border-[var(--color-border-subtle)]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
              {data.performanceSignal.label}
            </div>
            <div className="text-xl font-semibold text-[var(--color-text-primary)]">
              {data.performanceSignal.value}
            </div>
          </div>
          <TrendIcon className={`w-5 h-5 ${trendColor}`} />
        </div>
      </div>

      {/* CWV Tiles */}
      <div className="flex gap-2 mt-3">
        {data.cwvTiles.map((cwv, i) => (
          <div
            key={i}
            className={`flex-1 rounded-lg p-2 border text-center ${getStatusColor(cwv.status)}`}
          >
            <div className="text-[10px] font-medium">{cwv.value}</div>
            <div className="text-[8px] opacity-70">{cwv.metric}</div>
          </div>
        ))}
      </div>

      {/* Speed Score Gauge */}
      {data.speedScore !== undefined && (
        <div className="mt-3 flex items-center gap-3">
          <div className="relative w-12 h-12">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                stroke="var(--color-border-subtle)"
                strokeWidth="3"
              />
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                stroke="rgb(74, 222, 128)"
                strokeWidth="3"
                strokeDasharray={`${data.speedScore} 100`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-semibold text-[var(--color-text-primary)]">{data.speedScore}</span>
            </div>
          </div>
          <div className="text-[10px] text-[var(--color-text-muted)]">
            Performance<br />Score
          </div>
        </div>
      )}

      {/* Sparkline */}
      <div className="mt-auto pt-2">
        <Sparkline data={data.sparkline} color="rgb(74, 222, 128)" />
      </div>
    </div>
  );
};

// PaidSocial Variant - Mini funnel bars + stat row + sparkline
const PaidSocialVariant: React.FC<{ data: PaidSocialMediaData }> = ({ data }) => {
  const maxFunnelValue = Math.max(...data.funnel.map(f => f.value));

  return (
    <div className="relative z-10 w-full h-full p-4 flex flex-col justify-between">
      {/* Date Label Badge */}
      <div className="absolute top-3 left-3 z-20 bg-[var(--color-nav-bg)] backdrop-blur-md border border-mint-500/30 px-2 py-1 rounded-md shadow-lg">
        <span className="text-[9px] font-medium text-mint-400 uppercase tracking-wide">
          {data.dateLabel}
        </span>
      </div>

      {/* Funnel Visualization */}
      <div className="mt-8 space-y-2">
        {data.funnel.map((stage, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-16 text-[8px] text-[var(--color-text-muted)] text-right uppercase tracking-wide">
              {stage.label}
            </div>
            <div className="flex-1 h-4 bg-[var(--color-bg-base)] rounded overflow-hidden">
              <div
                className="h-full bg-mint-500/60 rounded transition-all duration-500"
                style={{ width: `${(stage.value / maxFunnelValue) * 100}%` }}
              />
            </div>
            <div className="w-14 text-[10px] font-medium text-[var(--color-text-primary)] text-right">
              {stage.displayValue}
            </div>
          </div>
        ))}
      </div>

      {/* Stats Row */}
      <div className="flex gap-3 mt-4 pt-3 border-t border-[var(--color-border-subtle)]">
        <div>
          <div className="text-sm font-semibold text-mint-400">{data.stats.spend}</div>
          <div className="text-[8px] text-[var(--color-text-muted)] uppercase">Spend</div>
        </div>
        {data.stats.ctr && (
          <div>
            <div className="text-sm font-semibold text-[var(--color-text-primary)]">{data.stats.ctr}</div>
            <div className="text-[8px] text-[var(--color-text-muted)] uppercase">CTR</div>
          </div>
        )}
        {data.stats.cpl && (
          <div>
            <div className="text-sm font-semibold text-[var(--color-text-primary)]">{data.stats.cpl}</div>
            <div className="text-[8px] text-[var(--color-text-muted)] uppercase">CPL</div>
          </div>
        )}
      </div>

      {/* Sparkline */}
      <div className="mt-auto pt-2">
        <Sparkline data={data.sparkline} color="rgb(74, 222, 128)" />
      </div>
    </div>
  );
};

// Legacy MediaTile - preserves existing visuals for fallback
const LegacyMediaTile: React.FC<{ type: 'meta' | 'seo' | 'reporting' }> = ({ type }) => {
  const renderContent = () => {
    switch (type) {
      case 'meta':
        return (
          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-elevated)]/50 backdrop-blur-sm group-hover:border-mint-500/40 transition-all duration-500 shadow-2xl shadow-black/50">
              <span className="font-bold text-5xl tracking-tighter text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-500">M</span>
              <div className="absolute -top-2 -right-2 bg-[var(--color-bg-muted)] border border-[var(--color-border-default)] rounded-full p-1.5 group-hover:border-mint-500/50 transition-colors">
                <ArrowUpRight className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors" />
              </div>
            </div>
          </div>
        );
      case 'seo':
        return (
          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="relative w-32 h-24 flex items-center justify-center">
              {/* Abstract Lines */}
              <div className="absolute inset-0 flex flex-col gap-2 opacity-50">
                <div className="h-1 w-full bg-[var(--color-text-muted)]/30 rounded-full overflow-hidden">
                   <div className="h-full w-2/3 bg-[var(--color-text-muted)] group-hover:bg-mint-500/40 transition-colors duration-700" />
                </div>
                <div className="h-1 w-3/4 bg-[var(--color-text-muted)]/30 rounded-full" />
                <div className="h-1 w-full bg-[var(--color-text-muted)]/30 rounded-full" />
                <div className="h-1 w-5/6 bg-[var(--color-text-muted)]/30 rounded-full" />
              </div>

              {/* Floating Magnifier */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-elevated)]/80 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:border-mint-500/30 transition-all duration-500">
                <Search className="w-8 h-8 text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-500" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        );
      case 'reporting':
        return (
          <div className="relative z-10 flex flex-col items-center justify-center">
             <div className="relative w-32 h-24 border border-[var(--color-border-default)] bg-[var(--color-bg-elevated)]/50 rounded-lg p-3 flex flex-col gap-3 group-hover:border-mint-500/30 transition-colors duration-500">
                <div className="flex gap-2 items-end h-full">
                  <div className="w-1/4 h-1/2 bg-[var(--color-text-muted)]/30 rounded-sm group-hover:bg-mint-500/20 transition-colors delay-75" />
                  <div className="w-1/4 h-3/4 bg-[var(--color-text-muted)]/50 rounded-sm group-hover:bg-mint-500/30 transition-colors delay-100" />
                  <div className="w-1/4 h-2/3 bg-[var(--color-text-muted)]/30 rounded-sm group-hover:bg-mint-500/20 transition-colors delay-150" />
                  <div className="w-1/4 h-full bg-[var(--color-text-muted)]/60 rounded-sm group-hover:bg-mint-500/40 transition-colors delay-200" />
                </div>
                {/* Abstract Table Lines */}
                <div className="space-y-1.5 pt-2 border-t border-[var(--color-border-subtle)]">
                   <div className="flex gap-1">
                      <div className="w-full h-0.5 bg-[var(--color-text-muted)]/30" />
                      <div className="w-full h-0.5 bg-[var(--color-text-muted)]/30" />
                   </div>
                   <div className="flex gap-1">
                      <div className="w-full h-0.5 bg-[var(--color-text-muted)]/30" />
                      <div className="w-full h-0.5 bg-[var(--color-text-muted)]/30" />
                   </div>
                </div>
             </div>
          </div>
        );
    }
  };

  return <>{renderContent()}</>;
};

const MediaTile: React.FC<MediaTileProps> = ({ type, media, className = '' }) => {
  const [mousePos, setMousePos] = React.useState({ x: 50, y: 50 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  const renderVariant = () => {
    if (media) {
      switch (media.variant) {
        case 'ga4':
          return <GA4Variant data={media} />;
        case 'seo':
          return <SEOVariant data={media} />;
        case 'paidSocial':
          return <PaidSocialVariant data={media} />;
      }
    }

    // Fallback to legacy if no media data
    if (type) {
      return <LegacyMediaTile type={type} />;
    }

    return null;
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[var(--color-bg-muted)] ${media ? '' : 'flex items-center justify-center'} ${className}`}
      onMouseMove={handleMouseMove}
      style={{
        '--mx': `${mousePos.x}%`,
        '--my': `${mousePos.y}%`,
      } as React.CSSProperties}
    >
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: 'radial-gradient(var(--color-text-muted) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />

      {/* Mouse-following glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle 150px at var(--mx) var(--my), rgba(74, 222, 128, 0.15), transparent 70%)`
        }}
      />

      {/* Glow Center */}
      <div className="absolute inset-0 bg-gradient-radial from-mint-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Shine Animation */}
      <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />

      {/* Edge glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 30px rgba(74, 222, 128, 0.1)' }}
      />

      {renderVariant()}
    </div>
  );
};

export default MediaTile;
