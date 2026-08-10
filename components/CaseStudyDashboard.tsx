import React, { useState } from 'react';
import { DashboardData } from '../types';

interface CaseStudyDashboardProps {
  data: DashboardData;
  objective?: string;
  destination?: string;
  timeframe?: string;
}

const formatNumber = (n: number) => n.toLocaleString();
const formatCurrency = (n: number) => `$${n.toLocaleString()}`;
const formatDecimal = (n: number, decimals = 2) => n.toFixed(decimals);

/** A ruled key/figure row — the same grammar as every other table on the site. */
const Row: React.FC<{ label: string; value: string; hint?: string }> = ({
  label,
  value,
  hint,
}) => (
  <div className="grid grid-cols-[1fr_auto] items-baseline gap-5 border-t border-[var(--rule)] py-3 transition-colors duration-150 hover:bg-[var(--surfaceHover)]">
    <dt className="text-[14px] text-[var(--color-text-secondary)]">
      {label}
      {hint && <span className="label ml-2">{hint}</span>}
    </dt>
    <dd className="figure text-[15px] text-[var(--ink)]">{value}</dd>
  </div>
);

const Panel: React.FC<{ title: string; meta?: string; children: React.ReactNode }> = ({
  title,
  meta,
  children,
}) => (
  <section className="border border-[var(--rule)] p-5 sm:p-6">
    <div className="flex items-baseline justify-between gap-4">
      <h4 className="label">{title}</h4>
      {meta && <span className="label">{meta}</span>}
    </div>
    <div className="mt-5">{children}</div>
  </section>
);

const CaseStudyDashboard: React.FC<CaseStudyDashboardProps> = ({
  data,
  objective,
  destination,
  timeframe,
}) => {
  const { totals, monthly, utm, ga4 } = data;
  const [hovered, setHovered] = useState<{ series: 'lpv' | 'spend'; i: number } | null>(null);

  const cpm = (totals.spend / totals.impressions) * 1000;
  const frequency = totals.impressions / totals.reach;
  const lpvRate = (totals.lpv / totals.impressions) * 100;
  const lpvPer1k = (totals.lpv / totals.impressions) * 1000;
  const costPerLpv = totals.spend / totals.lpv;

  const maxLpv = Math.max(...monthly.map((m) => m.lpv));
  const maxSpend = Math.max(...monthly.map((m) => m.spend));

  /**
   * Volume and spend are plotted as two separate charts sharing an x axis
   * rather than one chart with two y scales. A dual-axis chart lets whoever
   * draws it decide where the lines cross, which makes any "correlation" it
   * appears to show an artifact of the scaling — not a finding.
   */
  const MiniBars: React.FC<{
    series: 'lpv' | 'spend';
    color: string;
    max: number;
    valueOf: (m: (typeof monthly)[number]) => number;
    format: (n: number) => string;
  }> = ({ series, color, max, valueOf, format }) => (
    <div>
      <div className="flex items-end gap-1.5 h-24" role="img">
        {monthly.map((m, i) => {
          const value = valueOf(m);
          const isHovered = hovered?.series === series && hovered.i === i;
          return (
            <div
              key={m.month}
              className="flex-1 flex flex-col justify-end h-full relative"
              onMouseEnter={() => setHovered({ series, i })}
              onMouseLeave={() => setHovered(null)}
            >
              {isHovered && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 whitespace-nowrap figure text-[11px] text-[var(--ink)] bg-[var(--color-bg-elevated)] border border-[var(--rule)] px-1.5 py-0.5 z-10">
                  {format(value)}
                </div>
              )}
              <div
                className="w-full rounded-t-[2px] transition-opacity duration-150"
                style={{
                  height: `${Math.max((value / max) * 100, 2)}%`,
                  backgroundColor: color,
                  opacity: hovered && !isHovered ? 0.45 : 1,
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex gap-1.5 mt-2">
        {monthly.map((m) => (
          <span key={m.month} className="flex-1 label text-center">
            {m.month.replace('Month ', 'M')}
          </span>
        ))}
      </div>
    </div>
  );

  /**
   * Not labelled a funnel, because it isn't one: impressions exceed reach
   * whenever frequency is above 1, and here it's 3.5. Bars are drawn to a
   * shared scale so the real proportions show — the previous version drew
   * fixed decreasing widths, which made impressions look smaller than reach.
   */
  const delivery = [
    { label: 'Reach', value: totals.reach, unit: 'people' },
    { label: 'Impressions', value: totals.impressions, unit: 'events' },
    { label: 'Landing page views', value: totals.lpv, unit: 'events' },
  ];
  const deliveryMax = Math.max(...delivery.map((f) => f.value));

  return (
    <section className="py-20 md:py-28 border-t border-[var(--rule)]">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="display text-2xl md:text-3xl text-[var(--ink)]">Campaign dashboard</h3>
        <div className="flex items-baseline gap-4">
          {objective && <span className="label">{objective}</span>}
          {timeframe && <span className="label">{timeframe}</span>}
        </div>
      </div>

      {/* ── Totals and derived rates ──────────────────────────────────── */}
      <div className="mt-10 grid md:grid-cols-2 gap-x-14">
        <dl>
          <p className="label pb-3">Delivered</p>
          <Row label="Reach" value={formatNumber(totals.reach)} />
          <Row label="Impressions" value={formatNumber(totals.impressions)} />
          <Row label="Landing page views" value={formatNumber(totals.lpv)} />
          <Row label="Spend" value={formatCurrency(totals.spend)} />
          <div className="border-t border-[var(--rule)]" />
        </dl>
        <dl className="mt-8 md:mt-0">
          <p className="label pb-3">Derived</p>
          <Row label="CPM" hint="per 1,000 impr." value={`$${formatDecimal(cpm)}`} />
          <Row label="Frequency" hint="impr. per person" value={formatDecimal(frequency, 1)} />
          <Row label="LPV rate" hint="views / impr." value={`${formatDecimal(lpvRate)}%`} />
          <Row label="LPV per 1k impr." value={formatDecimal(lpvPer1k, 1)} />
          <Row label="Cost per LPV" value={`$${formatDecimal(costPerLpv)}`} />
          <div className="border-t border-[var(--rule)]" />
        </dl>
      </div>
      <p className="mt-4 text-[13px] leading-relaxed text-[var(--graphite)]">
        Only the four delivered totals are stored. Every derived rate is computed from them at
        render time, so nothing here can drift out of step with the source numbers.
      </p>

      {/* ── Funnel and monthly ────────────────────────────────────────── */}
      <div className="mt-10 grid lg:grid-cols-2 gap-5">
        <Panel title="Delivery" meta={`${formatDecimal(lpvRate)}% impr. → LPV`}>
          <div className="space-y-3">
            {delivery.map((stage) => (
              <div key={stage.label}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[14px] text-[var(--color-text-secondary)]">
                    {stage.label}
                    <span className="label ml-2">{stage.unit}</span>
                  </span>
                  <span className="figure text-[14px] text-[var(--ink)]">
                    {formatNumber(stage.value)}
                  </span>
                </div>
                <div className="mt-1.5 h-2.5 w-full bg-[var(--color-bg-muted)]">
                  <div
                    className="h-full rounded-r-[2px]"
                    style={{
                      width: `${(stage.value / deliveryMax) * 100}%`,
                      backgroundColor: 'var(--data-1)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-[var(--graphite)]">
            Impressions run ahead of reach because the average person saw the ads{' '}
            {formatDecimal(frequency, 1)} times. Reach counts people; the other two count events.
          </p>
        </Panel>

        <Panel title="By month" meta="Volume and cost, separate scales">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="w-2.5 h-2.5"
                  style={{ backgroundColor: 'var(--data-1)' }}
                />
                <span className="label">Landing page views</span>
              </div>
              <div className="mt-3">
                <MiniBars
                  series="lpv"
                  color="var(--data-1)"
                  max={maxLpv}
                  valueOf={(m) => m.lpv}
                  format={formatNumber}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="w-2.5 h-2.5"
                  style={{ backgroundColor: 'var(--data-2)' }}
                />
                <span className="label">Spend</span>
              </div>
              <div className="mt-3">
                <MiniBars
                  series="spend"
                  color="var(--data-2)"
                  max={maxSpend}
                  valueOf={(m) => m.spend}
                  format={formatCurrency}
                />
              </div>
            </div>
          </div>
        </Panel>
      </div>

      {/* ── GA4 ───────────────────────────────────────────────────────── */}
      {ga4 && (
        <div className="mt-5 grid gap-5">
          <Panel title="GA4 snapshot" meta={ga4.dateRange}>
            <div className="grid md:grid-cols-2 gap-x-14">
              <dl>
                <Row label="Sessions" value={formatNumber(ga4.totals.sessions)} />
                <Row
                  label="Engagement rate"
                  value={`${formatDecimal(ga4.totals.engagementRate, 1)}%`}
                />
                <Row label="Avg engagement" value={ga4.totals.avgEngagementTime} />
                <div className="border-t border-[var(--rule)]" />
              </dl>
              <dl>
                <Row
                  label="Events per session"
                  value={formatDecimal(ga4.totals.eventsPerSession, 1)}
                />
                <Row
                  label="Paid social sessions"
                  value={formatNumber(ga4.channels[0]?.sessions || 0)}
                />
                <Row
                  label="Paid social share"
                  value={`${formatDecimal(ga4.channels[0]?.sessionShare || 0, 1)}%`}
                />
                <div className="border-t border-[var(--rule)]" />
              </dl>
            </div>
          </Panel>

          {/* Channel identity comes from the row label, so the bars need only
              one hue. Six categorical colors would be unreadable to a
              red-green colorblind visitor and would add nothing here. */}
          <Panel title="Sessions by channel" meta={`${ga4.channels.length} channels`}>
            <table className="w-full figure text-[13px]">
              <caption className="sr-only">
                GA4 sessions by acquisition channel, with share and engagement rate
              </caption>
              <thead>
                <tr className="label">
                  <th scope="col" className="text-left font-normal pb-2">
                    Channel
                  </th>
                  <th scope="col" className="text-left font-normal pb-2 w-[38%]">
                    Share
                  </th>
                  <th scope="col" className="text-right font-normal pb-2">
                    Sessions
                  </th>
                  <th scope="col" className="text-right font-normal pb-2">
                    Eng %
                  </th>
                  <th scope="col" className="text-right font-normal pb-2 hidden sm:table-cell">
                    Avg time
                  </th>
                </tr>
              </thead>
              <tbody>
                {ga4.channels.map((channel) => (
                  <tr
                    key={channel.name}
                    className="border-t border-[var(--rule)] transition-colors duration-150 hover:bg-[var(--surfaceHover)]"
                  >
                    <th
                      scope="row"
                      className="py-2.5 pr-4 text-left font-normal text-[var(--color-text-secondary)] font-sans"
                    >
                      {channel.name}
                    </th>
                    <td className="py-2.5 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-[var(--color-bg-muted)]">
                          <div
                            className="h-full rounded-r-[2px]"
                            style={{
                              width: `${channel.sessionShare}%`,
                              backgroundColor: 'var(--data-1)',
                            }}
                          />
                        </div>
                        <span className="text-[var(--graphite)] w-11 text-right">
                          {formatDecimal(channel.sessionShare, 1)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 text-right text-[var(--ink)]">
                      {formatNumber(channel.sessions)}
                    </td>
                    <td className="py-2.5 text-right text-[var(--graphite)]">
                      {formatDecimal(channel.engagementRate, 1)}%
                    </td>
                    <td className="py-2.5 text-right text-[var(--graphite)] hidden sm:table-cell">
                      {channel.avgEngagementTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-[13px] leading-relaxed text-[var(--graphite)]">
              Meta landing page views and GA4 sessions won't match one-to-one — the two platforms
              attribute and sessionize differently. Each total is correct on its own terms.
            </p>
          </Panel>
        </div>
      )}

      {/* ── Tracking ──────────────────────────────────────────────────── */}
      <div className="mt-5">
        <Panel title="UTM tracking structure" meta={destination}>
          <code className="block figure text-[13px] text-[var(--color-text-secondary)] break-all bg-[var(--color-bg-muted)] border border-[var(--rule)] p-3">
            ?{utm}
          </code>
          <p className="mt-4 text-[13px] leading-relaxed text-[var(--graphite)]">
            One taxonomy across every campaign is what makes the GA4 numbers above reconcilable with
            the platform numbers at the top.
          </p>
        </Panel>
      </div>
    </section>
  );
};

export default CaseStudyDashboard;
