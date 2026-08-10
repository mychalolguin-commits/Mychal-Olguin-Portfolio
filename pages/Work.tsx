import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import MediaTile from '../components/MediaTile';
import { PROJECTS } from '../constants';
import { useSEO } from '../hooks/useSEO';
import { CONTAINER, BTN_ON_BRAND } from '../components/layout';

/**
 * The homepage features these same case studies, so this index earns its place
 * by being the complete record rather than a second teaser: every metric, not
 * a slice of three, plus the tag line and timeframe.
 */
const Work: React.FC = () => {
  useSEO({
    title: 'Work',
    description:
      'Case studies in growth marketing, paid social campaigns, SEO optimization, and analytics systems by Mychal Olguin.',
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
              The work, with the numbers attached.
            </h2>
            <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-[var(--color-text-tertiary)]">
              Each study runs the same way: what the problem was, what I built, and what the
              platforms reported afterward. Where a figure is directional rather than measured, it
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
              // The Borders timeframe literally reads "(placeholder)" in the
              // data; the disclosure below states it properly instead.
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
                  to="/resume"
                  className="inline-flex items-center gap-2 rounded-[3px] border border-[var(--on-brand-muted)] text-[var(--on-brand-field)] px-6 py-3 text-[15px] font-medium transition-colors duration-200 hover:border-[var(--on-brand-field)]"
                >
                  View resume
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
