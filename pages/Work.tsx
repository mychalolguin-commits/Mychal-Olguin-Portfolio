import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import MediaTile from '../components/MediaTile';
import { PROJECTS, SOCIAL_CREATIVE } from '../constants';
import { useSEO } from '../hooks/useSEO';
import { CONTAINER, BTN_ON_BRAND, LINK_UNDERLINE } from '../components/layout';

/**
 * The homepage features these same case studies, so this index earns its place
 * by being the complete record rather than a second teaser: every metric, not
 * a slice of three, plus the tag line and timeframe.
 */
const Work: React.FC = () => {
  useSEO({
    title: 'Work',
    description:
      'Case studies in web design, SEO and answer-engine optimization, paid social, and the measurement behind them, by Mychal Olguin.',
  });

  return (
    <>
      <section className="pt-36 md:pt-52 pb-20 md:pb-28">
        <div className={CONTAINER}>
          <Reveal>
            <div className="flex items-baseline justify-between gap-4">
              <h1 className="label">Case studies</h1>
              <span className="figure label">
                {String(PROJECTS.length).padStart(2, '0')} total
              </span>
            </div>
            <h2 className="display text-[2.25rem] sm:text-5xl lg:text-6xl text-[var(--ink)] mt-5 max-w-[18ch]">
              The work, and the evidence behind it.
            </h2>
            <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-[var(--color-text-tertiary)]">
              Each study covers what the problem was, what I built, and what came back. Where
              there's a number, the source is named next to it. Where there isn't one, the study
              says so.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-28 md:pb-40">
        <div className={CONTAINER}>
          <div className="space-y-16 md:space-y-24">
            {PROJECTS.map((project) => {
              const isDirectional = project.metrics.some((m) => m.placeholder);
              // Kept as a guard for any future entry that ships a
              // "(placeholder)" timeframe. No current project has one.
              const timeframe = project.timeframe?.replace(/\s*\(placeholder\)/i, '');

              return (
                <Reveal key={project.slug}>
                  <article className="border-t border-[var(--rule)] pt-7">
                    <div className="grid lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-14 items-start">
                      <Link
                        to={`/work/${project.slug}`}
                        aria-label={`Read the ${project.title} case study`}
                        className="block h-72 sm:h-96 lg:h-full lg:min-h-[340px] overflow-hidden border border-[var(--rule)] bg-[var(--color-bg-elevated)] transition-colors duration-200 hover:border-[var(--ink)]"
                      >
                        <MediaTile
                          type={project.mediaType}
                          media={project.media}
                          className="w-full h-full"
                        />
                      </Link>

                      <div>
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="label">{project.subtitle}</span>
                          {timeframe && <span className="label">{timeframe}</span>}
                        </div>

                        <h3 className="display text-2xl md:text-[1.75rem] mt-4">
                          <Link
                            to={`/work/${project.slug}`}
                            className="text-[var(--ink)] transition-opacity hover:opacity-70"
                          >
                            {project.title}
                          </Link>
                        </h3>

                        <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-[var(--color-text-tertiary)]">
                          {project.description}
                        </p>

                        {/* Same label/figure grammar as the homepage summary, so
                            the eye scans one column of figures down the page. */}
                        <dl className="mt-8">
                          {project.metrics.map((metric) => (
                            <div
                              key={metric.label}
                              className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-[var(--rule)] py-2.5 transition-colors duration-150 hover:bg-[var(--surfaceHover)]"
                            >
                              <dt className="label">{metric.label}</dt>
                              <dd className="figure text-[15px] text-[var(--ink)]">
                                {metric.value}
                              </dd>
                            </div>
                          ))}
                          <div className="border-t border-[var(--rule)]" />
                        </dl>

                        {isDirectional && (
                          <p className="mt-3 text-[13px] leading-relaxed text-[var(--graphite)]">
                            Directional — a 30-day snapshot. Full attribution lands at 60–90 days as
                            indexing propagates.
                          </p>
                        )}

                        <p className="label mt-6">{project.tags.join(' · ')}</p>

                        <Link
                          to={`/work/${project.slug}`}
                          className="mt-7 inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--ink)] underline underline-offset-4 decoration-[var(--rule)] transition-colors hover:decoration-[var(--ink)]"
                        >
                          Read the case study
                          <ArrowUpRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="paid-social-creative" aria-labelledby="social-creative-heading" className="border-t border-[var(--rule)] py-20 md:py-28">
        <div className={CONTAINER}>
          <Reveal>
            <p className="label">Selected paid-social creative</p>
            <h2 id="social-creative-heading" className="statement mt-5 max-w-[22ch] text-3xl md:text-5xl text-[var(--ink)]">
              Give renters a reason to look closer.
            </h2>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-[var(--graphite)]">
              Paid-social carousels for Christy Estates and Borders Apartments. I shot all the
              photography, created the graphics, and wrote the captions.
            </p>
          </Reveal>

          <div className="mt-14 space-y-16 md:space-y-24">
            {SOCIAL_CREATIVE.map((creative) => (
              <Reveal key={creative.property}>
                <article className="grid items-start gap-8 border-t border-[var(--rule)] pt-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
                  <div>
                    <p className="label">{creative.property}</p>
                    <h3 className="display mt-4 text-2xl md:text-3xl text-[var(--ink)]">{creative.title}</h3>
                    <p className="mt-5 text-[16px] leading-relaxed text-[var(--graphite)]">{creative.strategy}</p>
                    <p className="mt-4 text-[16px] leading-relaxed text-[var(--graphite)]">{creative.execution}</p>
                  </div>
                  <div className={`grid items-start gap-4 ${creative.images.length > 1 ? 'grid-cols-2' : 'mx-auto w-full max-w-sm'}`}>
                    {creative.images.map((asset) => (
                      <figure key={asset.src} className="min-w-0">
                        <a href={asset.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full screenshot: ${asset.alt}`} className="block">
                          <img src={asset.src} alt={asset.alt} loading="lazy" className="block h-auto w-full border border-[var(--rule)]" />
                        </a>
                        <figcaption className="mt-3 text-[13px] leading-relaxed text-[var(--graphite)]">
                          {asset.caption}
                          <a href={asset.src} target="_blank" rel="noopener noreferrer" className={`mt-2 block ${LINK_UNDERLINE}`}>View full screenshot ↗</a>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-12 max-w-[68ch] text-[14px] leading-relaxed text-[var(--graphite)]">
            Source: screenshots of the published Facebook creative. The $2,400 figure describes
            the advertised savings over a 12-month lease. These examples document the creative;
            campaign performance is not reported here.
          </p>
        </div>
      </section>

      {/* ── Close: the brand field, one per page, always at the end. ──── */}
      <section className="py-32 md:py-48 bg-[var(--brand-field)]">
        <div className={CONTAINER}>
          <Reveal>
            <div className="text-center">
              <h2 className="statement text-4xl md:text-5xl text-[var(--on-brand-field)] mx-auto max-w-[18ch]">
                Want the full read-out?
              </h2>
              <p className="mt-8 mx-auto max-w-[50ch] text-lg leading-relaxed text-[var(--on-brand-field)] opacity-80">
                I'll walk you through the account, the tracking setup, and the reporting behind any
                of these.
              </p>
              <div className="mt-12 flex flex-wrap justify-center gap-3 sm:gap-4">
                <a href="mailto:mychalolguin@gmail.com" className={BTN_ON_BRAND}>
                  Email me
                </a>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-[3px] border border-[var(--on-brand-muted)] text-[var(--on-brand-field)] px-6 py-3 text-[15px] font-medium transition-colors duration-200 hover:border-[var(--on-brand-field)]"
                >
                  About me
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Work;
