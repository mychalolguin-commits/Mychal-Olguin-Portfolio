import React, { useState } from 'react';
import { DashboardData } from '../types';

interface CaseStudyDashboardProps {
  data: DashboardData;
  objective?: string;
  destination?: string;
  timeframe?: string;
}

const CaseStudyDashboard: React.FC<CaseStudyDashboardProps> = ({
  data,
  objective,
  destination,
  timeframe
}) => {
  const { totals, monthly, utm, ga4 } = data;
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  // Computed metrics
  const cpm = (totals.spend / totals.impressions) * 1000;
  const frequency = totals.impressions / totals.reach;
  const lpvRate = (totals.lpv / totals.impressions) * 100;
  const lpvPer1k = (totals.lpv / totals.impressions) * 1000;
  const costPerLpv = totals.spend / totals.lpv;

  // Format helpers
  const formatNumber = (n: number) => n.toLocaleString();
  const formatCurrency = (n: number) => `$${n.toLocaleString()}`;
  const formatDecimal = (n: number, decimals = 2) => n.toFixed(decimals);

  // Chart calculations
  const maxLpv = Math.max(...monthly.map(m => m.lpv));
  const maxSpend = Math.max(...monthly.map(m => m.spend));
  const chartHeight = 120;
  const chartWidth = 280;
  const barWidth = 50;
  const barGap = 30;
  const tooltipSpace = 55; // Space at top for tooltips

  return (
    <div className="my-16 space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Campaign Dashboard</h3>
        <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
          {timeframe && <span>{timeframe}</span>}
          {objective && <span className="px-2 py-0.5 rounded bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)]">{objective}</span>}
        </div>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'Reach', value: formatNumber(totals.reach) },
          { label: 'Impressions', value: formatNumber(totals.impressions) },
          { label: 'LP Views', value: formatNumber(totals.lpv) },
          { label: 'Spend', value: formatCurrency(totals.spend) },
          { label: 'Cost/LPV', value: `$${formatDecimal(costPerLpv)}` },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="bg-[var(--color-bg-elevated)]/30 border border-[var(--color-border-subtle)] p-4 rounded-xl relative overflow-hidden group hover:border-mint-500/20 transition-colors"
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-mint-500 to-mint-400 opacity-20 group-hover:opacity-60 transition-opacity" />
            <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] mb-1">{kpi.label}</p>
            <p className="text-xl font-semibold text-[var(--color-text-primary)]">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Computed Metrics Chips */}
      <div className="flex flex-wrap gap-2">
        {[
          { label: 'CPM', value: `$${formatDecimal(cpm)}`, tooltip: 'Cost per 1,000 impressions' },
          { label: 'Frequency', value: formatDecimal(frequency, 1), tooltip: 'Avg impressions per user' },
          { label: 'LPV Rate', value: `${formatDecimal(lpvRate)}%`, tooltip: 'LP views / impressions' },
          { label: 'LPV/1k Imp', value: formatDecimal(lpvPer1k, 1), tooltip: 'LP views per 1,000 impressions' },
        ].map((chip) => (
          <div
            key={chip.label}
            title={chip.tooltip}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-bg-elevated)]/50 border border-[var(--color-border-subtle)] text-xs cursor-help hover:border-mint-500/30 transition-colors"
          >
            <span className="text-[var(--color-text-muted)]">{chip.label}</span>
            <span className="text-[var(--color-text-primary)] font-medium">{chip.value}</span>
          </div>
        ))}
      </div>

      {/* GA4 Snapshot Section */}
      {ga4 && (
        <div className="space-y-4 pt-6 border-t border-[var(--color-border-subtle)]">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">GA4 Snapshot</h4>
            <span className="text-[10px] text-[var(--color-text-muted)]">{ga4.dateRange}</span>
          </div>

          {/* GA4 KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {[
              { label: 'Sessions', value: formatNumber(ga4.totals.sessions) },
              { label: 'Engagement Rate', value: `${formatDecimal(ga4.totals.engagementRate, 1)}%` },
              { label: 'Avg Engagement', value: ga4.totals.avgEngagementTime },
              { label: 'Events/Session', value: formatDecimal(ga4.totals.eventsPerSession, 1) },
              { label: 'Paid Social Sessions', value: formatNumber(ga4.channels[0]?.sessions || 0) },
              { label: 'Paid Social Share', value: `${formatDecimal(ga4.channels[0]?.sessionShare || 0, 1)}%` },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="bg-[var(--color-bg-elevated)]/30 border border-[var(--color-border-subtle)] p-3 rounded-xl"
              >
                <p className="text-[9px] uppercase tracking-wider text-[var(--color-text-muted)] mb-1">{kpi.label}</p>
                <p className="text-lg font-semibold text-[var(--color-text-primary)]">{kpi.value}</p>
              </div>
            ))}
          </div>

          {/* Channel Mix Visualization */}
          <div className="bg-[var(--color-bg-elevated)]/30 border border-[var(--color-border-subtle)] rounded-2xl p-5">
            <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-4">Channel Mix by Sessions</p>

            {/* Stacked bar */}
            <div className="h-6 rounded-full overflow-hidden flex mb-4">
              {ga4.channels.map((channel, i) => {
                const colors = [
                  'bg-mint-500',      // Paid Social
                  'bg-blue-500',      // Direct
                  'bg-amber-500',     // Organic Search
                  'bg-purple-500',    // Referral
                  'bg-pink-500',      // Organic Social
                  'bg-gray-500',      // Unassigned
                ];
                return (
                  <div
                    key={channel.name}
                    className={`${colors[i]} transition-all hover:opacity-80`}
                    style={{ width: `${channel.sessionShare}%` }}
                    title={`${channel.name}: ${formatNumber(channel.sessions)} sessions (${formatDecimal(channel.sessionShare, 1)}%)`}
                  />
                );
              })}
            </div>

            {/* Channel table */}
            <table className="w-full text-xs" style={{ fontVariantNumeric: 'tabular-nums' }}>
              <colgroup>
                <col style={{ width: '24px' }} />
                <col />
                <col style={{ width: '70px' }} />
                <col style={{ width: '60px' }} />
                <col style={{ width: '60px' }} />
                <col style={{ width: '50px' }} className="hidden md:table-column" />
              </colgroup>
              <thead>
                <tr className="text-[9px] text-[var(--color-text-muted)] uppercase tracking-wider border-b border-[var(--color-border-subtle)]">
                  <th className="pb-2"></th>
                  <th className="text-left font-normal pb-2">Channel</th>
                  <th className="text-right font-normal pb-2">Sessions</th>
                  <th className="text-right font-normal pb-2">Share</th>
                  <th className="text-right font-normal pb-2">Eng %</th>
                  <th className="text-right font-normal pb-2 hidden md:table-cell">Time</th>
                </tr>
              </thead>
              <tbody>
                {ga4.channels.slice(0, 5).map((channel, i) => {
                  const colors = [
                    'bg-mint-500',
                    'bg-blue-500',
                    'bg-amber-500',
                    'bg-purple-500',
                    'bg-pink-500',
                  ];
                  return (
                    <tr key={channel.name}>
                      <td className="py-2 align-middle">
                        <span className={`inline-block w-2 h-2 rounded-full ${colors[i]}`} />
                      </td>
                      <td className="py-2 text-[var(--color-text-secondary)] align-middle">{channel.name}</td>
                      <td className="py-2 text-right text-[var(--color-text-primary)] font-medium align-middle">{formatNumber(channel.sessions)}</td>
                      <td className="py-2 text-right text-[var(--color-text-muted)] align-middle">{formatDecimal(channel.sessionShare, 1)}%</td>
                      <td className="py-2 text-right text-[var(--color-text-muted)] align-middle">{formatDecimal(channel.engagementRate, 1)}%</td>
                      <td className="py-2 text-right text-[var(--color-text-muted)] align-middle hidden md:table-cell">{channel.avgEngagementTime}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* GA4 Note */}
          <p className="text-[10px] text-[var(--color-text-muted)] italic">
            Meta LPV and GA4 Sessions won't match 1:1 due to attribution and sessionization. Totals are accurate.
          </p>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Funnel Card */}
        <div className="bg-[var(--color-bg-elevated)]/30 border border-[var(--color-border-subtle)] rounded-2xl p-6">
          <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-4">Funnel</p>
          <svg viewBox="0 0 300 160" className="w-full h-auto">
            {/* Funnel shapes */}
            <defs>
              <linearGradient id="funnelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(74, 222, 128)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(74, 222, 128)" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Reach bar */}
            <rect x="10" y="10" width="280" height="28" rx="4" fill="url(#funnelGrad)" stroke="rgb(74, 222, 128)" strokeOpacity="0.4" strokeWidth="1" />
            <text x="20" y="28" className="text-[11px] fill-[var(--color-text-secondary)]" fontWeight="500">Reach</text>
            <text x="270" y="28" textAnchor="end" className="text-[11px] fill-[var(--color-text-primary)]" fontWeight="600">{formatNumber(totals.reach)}</text>

            {/* Arrow */}
            <path d="M150 42 L150 48 L145 48 L150 56 L155 48 L150 48" fill="var(--color-text-muted)" opacity="0.5" />

            {/* Impressions bar */}
            <rect x="30" y="60" width="240" height="28" rx="4" fill="url(#funnelGrad)" stroke="rgb(74, 222, 128)" strokeOpacity="0.5" strokeWidth="1" />
            <text x="40" y="78" className="text-[11px] fill-[var(--color-text-secondary)]" fontWeight="500">Impressions</text>
            <text x="260" y="78" textAnchor="end" className="text-[11px] fill-[var(--color-text-primary)]" fontWeight="600">{formatNumber(totals.impressions)}</text>

            {/* Arrow */}
            <path d="M150 92 L150 98 L145 98 L150 106 L155 98 L150 98" fill="var(--color-text-muted)" opacity="0.5" />

            {/* LP Views bar - narrowest */}
            <rect x="80" y="110" width="140" height="28" rx="4" fill="rgb(74, 222, 128)" fillOpacity="0.25" stroke="rgb(74, 222, 128)" strokeOpacity="0.7" strokeWidth="1.5" />
            <text x="90" y="128" className="text-[11px] fill-[var(--color-text-secondary)]" fontWeight="500">LP Views</text>
            <text x="210" y="128" textAnchor="end" className="text-[11px] fill-[var(--color-text-primary)]" fontWeight="600">{formatNumber(totals.lpv)}</text>

            {/* Conversion rate badge */}
            <rect x="230" y="114" width="60" height="20" rx="10" fill="var(--color-bg-base)" stroke="rgb(74, 222, 128)" strokeOpacity="0.5" strokeWidth="1" />
            <text x="260" y="128" textAnchor="middle" className="text-[10px] fill-mint-400" fontWeight="600">{formatDecimal(lpvRate)}%</text>
          </svg>
        </div>

        {/* Monthly Performance Card */}
        <div className="bg-[var(--color-bg-elevated)]/30 border border-[var(--color-border-subtle)] rounded-2xl p-6 relative">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Monthly Performance</p>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm bg-mint-500/60"></span>
                <span className="text-[var(--color-text-muted)]">LP Views</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></span>
                <span className="text-[var(--color-text-muted)]">Spend</span>
              </span>
            </div>
          </div>

          <svg viewBox={`0 0 ${chartWidth} ${chartHeight + tooltipSpace + 30}`} className="w-full h-auto" style={{ overflow: 'visible' }}>
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
              <line
                key={i}
                x1="0"
                y1={tooltipSpace + chartHeight - pct * chartHeight}
                x2={chartWidth}
                y2={tooltipSpace + chartHeight - pct * chartHeight}
                stroke="var(--color-border-subtle)"
                strokeWidth="1"
                strokeDasharray={i === 0 ? "0" : "2,2"}
              />
            ))}

            {/* Bars and spend dots */}
            {monthly.map((m, i) => {
              const barHeight = (m.lpv / maxLpv) * (chartHeight - 10);
              const x = i * (barWidth + barGap) + barGap;
              const barY = tooltipSpace + chartHeight - barHeight;
              const spendY = tooltipSpace + chartHeight - (m.spend / maxSpend) * (chartHeight - 20);
              const isHovered = hoveredMonth === i;

              return (
                <g
                  key={m.month}
                  onMouseEnter={() => setHoveredMonth(i)}
                  onMouseLeave={() => setHoveredMonth(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Bar */}
                  <rect
                    x={x}
                    y={barY}
                    width={barWidth}
                    height={barHeight}
                    rx="4"
                    fill={isHovered ? "rgb(74, 222, 128)" : "rgba(74, 222, 128, 0.5)"}
                    className="transition-all duration-200"
                  />

                  {/* Spend dot */}
                  <circle
                    cx={x + barWidth / 2}
                    cy={spendY}
                    r={isHovered ? 6 : 4}
                    fill="var(--color-accent)"
                    className="transition-all duration-200"
                  />

                  {/* Month label */}
                  <text
                    x={x + barWidth / 2}
                    y={tooltipSpace + chartHeight + 16}
                    textAnchor="middle"
                    className="text-[10px] fill-[var(--color-text-muted)]"
                  >
                    {m.month.replace('Month ', 'M')}
                  </text>

                  {/* Tooltip on hover */}
                  {isHovered && (
                    <g>
                      <rect
                        x={x - 10}
                        y={barY - 48}
                        width={70}
                        height={40}
                        rx="6"
                        fill="var(--color-bg-base)"
                        stroke="var(--color-border-default)"
                        strokeWidth="1"
                      />
                      <text x={x + 25} y={barY - 32} textAnchor="middle" className="text-[10px] fill-[var(--color-text-primary)]" fontWeight="600">
                        {formatNumber(m.lpv)} LPVs
                      </text>
                      <text x={x + 25} y={barY - 18} textAnchor="middle" className="text-[10px] fill-[var(--color-text-muted)]">
                        {formatCurrency(m.spend)} spend
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Spend line connecting dots */}
            <polyline
              points={monthly.map((m, i) => {
                const x = i * (barWidth + barGap) + barGap + barWidth / 2;
                const y = tooltipSpace + chartHeight - (m.spend / maxSpend) * (chartHeight - 20);
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
            />
          </svg>
        </div>
      </div>

      {/* Tracking Card */}
      <div className="bg-[var(--color-bg-elevated)]/30 border border-[var(--color-border-subtle)] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">UTM Tracking Structure</p>
          {destination && (
            <span className="text-xs text-[var(--color-text-muted)]">
              Destination: <code className="text-[var(--color-accent)] font-mono">{destination}</code>
            </span>
          )}
        </div>
        <div className="bg-[var(--color-bg-base)] rounded-lg p-3 border border-[var(--color-border-subtle)] overflow-x-auto">
          <code className="text-xs text-[var(--color-text-secondary)] font-mono break-all">
            ?{utm}
          </code>
        </div>
        <p className="text-[10px] text-[var(--color-text-muted)] mt-2">
          Consistent UTM taxonomy enables clean attribution in GA4 and cross-platform reporting.
        </p>
      </div>

    </div>
  );
};

export default CaseStudyDashboard;
