import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Reveal } from '../components/Reveal';
import MediaTile from '../components/MediaTile';
import LazyCertificationShelf from '../components/shelf/LazyCertificationShelf';
import { PROJECTS } from '../constants';

/** Page gutters. Must match Navbar and Footer or the rules stop lining up. */
const CONTAINER = 'max-w-4xl lg:max-w-6xl mx-auto px-6 lg:px-10 xl:px-16';

const BTN_PRIMARY =
  'inline-flex items-center gap-2 rounded-[3px] bg-[var(--ink)] text-[var(--paper)] px-6 py-3 text-[15px] font-medium transition-opacity duration-200 hover:opacity-85';
const BTN_SECONDARY =
  'inline-flex items-center gap-2 rounded-[3px] border border-[var(--rule)] text-[var(--ink)] px-6 py-3 text-[15px] font-medium transition-colors duration-200 hover:border-[var(--ink)]';

/**
 * The hero summary. Every figure here traces to a platform Mychal actually
 * pulled it from, and the source is printed next to it — that sourcing is the
 * point of the section, not decoration.
 *
 * Deliberately excludes the Borders case-study metrics: those carry
 * `placeholder: true` in constants.ts, so they must not be presented as
 * career results. Everything below comes from EXPERIENCE or from Towne Oaks'
 * real dashboardData.
 */
const SUMMARY_ROWS: {
  metric: string;
  figure: string;
  source: string;
  trend?: 'up';
}[] = [
  { metric: 'Ad spend managed', figure: '$5K/mo', source: 'Meta + Google Ads' },
  { metric: 'Average cost per lead', figure: '$35', source: 'Meta + Google Ads' },
  { metric: 'Cost per landing page view', figure: '$0.52', source: 'Meta Ads Manager' },
  { metric: 'Landing page views delivered', figure: '2,475', source: 'GA4' },
  { metric: 'Organic traffic growth', figure: '+20%', source: 'Search Console', trend: 'up' },
];

const CAPABILITIES = [
  {
    title: 'Paid social & growth',
    description: 'Plan, launch, and optimize campaigns with disciplined testing and budget control.',
    tools: ['Meta Ads Manager', 'Creative testing', 'Budget pacing'],
  },
  {
    title: 'Measurement & attribution',
    description: 'Build clean tracking so performance ties back to real behavior.',
    tools: ['GA4', 'UTMs', 'Event tracking', 'CAPI'],
  },
  {
    title: 'SEO & web',
    description: 'Design and optimize pages that rank locally and guide users to conversion.',
    tools: ['SEO', 'HTML', 'On-page', 'CRO'],
  },
  {
    title: 'Dashboards & insights',
    description: 'Reporting that turns channel metrics into decisions and next steps.',
    tools: ['Excel', 'Tableau', 'Data viz', 'KPIs'],
  },
  {
    title: 'Creative strategy',
    description: 'Use performance learnings to iterate creative, hooks, and messaging fast.',
    tools: ['A/B testing', 'Ad creative', 'Hooks', 'Iteration'],
  },
  {
    title: 'Local search & reputation',
    description: 'Improve high-intent visibility through profile optimization and review strategy.',
    tools: ['Google Business', 'Reviews', 'Local SEO', 'Maps'],
  },
];

const FEATURED_SLUGS = ['towne-oaks-paid-social', 'borders-seo-conversion'];

/**
 * A rule that draws itself in left-to-right. This is the page's entire motion
 * budget — everything else is still. MotionProvider forces
 * reducedMotion: 'always', which drops the scaleX transform, so the rule
 * simply appears for anyone who asked for reduced motion.
 */
const DrawnRule: React.FC<{ delay: number }> = ({ delay }) => (
  <motion.div
    aria-hidden="true"
    className="h-px bg-[var(--rule)] origin-left"
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 0.55, delay, ease: [0.25, 0.4, 0.25, 1] }}
  />
);

const Home: React.FC = () => {
  const featured = PROJECTS.filter((p) => FEATURED_SLUGS.includes(p.slug));

  return (
    <PageTransition>
      {/* ── Hero: the masthead and the sourced performance summary ────── */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-24">
        <div className={CONTAINER}>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="display-wide text-[2.5rem] sm:text-6xl lg:text-7xl text-[var(--ink)] max-w-[15ch]"
          >
            I run paid social and prove what it did.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            className="mt-7 max-w-[54ch] text-lg leading-relaxed text-[var(--color-text-tertiary)]"
          >
            Paid social acquisition and full-funnel measurement. I build the tracking first, then
            spend against it. Currently looking for my next growth role.
          </motion.p>

          <div className="mt-14 md:mt-20 max-w-3xl">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="label">Performance summary</h2>
              <span className="label">2023 — 2026</span>
            </div>

            <div className="mt-4">
              {SUMMARY_ROWS.map((row, i) => (
                <div key={row.metric}>
                  <DrawnRule delay={0.3 + i * 0.07} />
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.42 + i * 0.07 }}
                    className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_13rem] items-baseline gap-x-5 sm:gap-x-8 py-3.5 transition-colors duration-150 hover:bg-[var(--surfaceHover)]"
                  >
                    <div>
                      <span className="text-[15px] text-[var(--color-text-secondary)]">
                        {row.metric}
                      </span>
                      <span className="label block sm:hidden mt-1">{row.source}</span>
                    </div>
                    <span
                      className={`figure text-lg sm:text-xl text-right ${
                        row.trend === 'up' ? 'text-[var(--signal-up)]' : 'text-[var(--ink)]'
                      }`}
                    >
                      {row.figure}
                    </span>
                    {/* Left-aligned so the source column has a clean left edge
                        to scan down, the way a report footnote column does. */}
                    <span className="label hidden sm:block">{row.source}</span>
                  </motion.div>
                </div>
              ))}
              <DrawnRule delay={0.3 + SUMMARY_ROWS.length * 0.07} />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="mt-4 text-[13px] leading-relaxed text-[var(--graphite)] max-w-[58ch]"
            >
              Figures from campaigns run 2023—2026 across a 14-property multifamily portfolio.
              Each row traces to the platform named beside it.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.95 }}
            className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Link to="/work" className={BTN_PRIMARY}>
              Read the case studies
            </Link>
            <Link to="/resume" className={BTN_SECONDARY}>
              View resume
            </Link>
            <a
              href="https://www.linkedin.com/in/mychalolguin/"
              target="_blank"
              rel="noreferrer"
              className="px-2 py-3 text-[15px] text-[var(--color-text-tertiary)] underline underline-offset-4 decoration-[var(--rule)] transition-colors hover:text-[var(--ink)] hover:decoration-[var(--ink)]"
            >
              LinkedIn
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Selected work: ruled report entries ───────────────────────── */}
      <section className="py-20 md:py-28 border-t border-[var(--rule)]">
        <div className={CONTAINER}>
          <Reveal>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="display-wide text-2xl md:text-3xl text-[var(--ink)]">
                Selected work
              </h2>
              <Link
                to="/work"
                className="label underline underline-offset-4 decoration-[var(--rule)] transition-colors hover:text-[var(--ink)] hover:decoration-[var(--ink)]"
              >
                All projects
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 md:mt-14 space-y-16 md:space-y-20">
            {featured.map((project) => {
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

                        <h3 className="display-wide text-2xl md:text-[1.75rem] mt-4">
                          <Link
                            to={`/work/${project.slug}`}
                            className="text-[var(--ink)] transition-opacity hover:opacity-70"
                          >
                            {project.title}
                          </Link>
                        </h3>

                        <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-[var(--color-text-tertiary)]">
                          {project.description}
                        </p>

                        {/* Same label/figure grammar as the hero summary, so
                            the eye scans one column of figures down the page. */}
                        <dl className="mt-8">
                          {project.metrics.slice(0, 3).map((metric) => (
                            <div
                              key={metric.label}
                              className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-[var(--rule)] py-2.5"
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
                            Directional — a 30-day snapshot. Full attribution lands at 60–90 days
                            as indexing propagates.
                          </p>
                        )}

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

      {/* ── Capabilities: a spec sheet, not a card grid ───────────────── */}
      <section className="py-20 md:py-28 border-t border-[var(--rule)]">
        <div className={CONTAINER}>
          <Reveal>
            <h2 className="display-wide text-2xl md:text-3xl text-[var(--ink)]">Capabilities</h2>
            <p className="mt-4 max-w-[56ch] text-[17px] leading-relaxed text-[var(--color-text-tertiary)]">
              Campaign strategy, the measurement layer underneath it, and the reporting that makes
              both actionable.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 grid md:grid-cols-2 gap-x-14">
              {CAPABILITIES.map((cap) => (
                <div key={cap.title} className="border-t border-[var(--rule)] py-6 md:py-7">
                  <h3 className="text-[17px] font-medium text-[var(--ink)]">{cap.title}</h3>
                  <p className="mt-2 max-w-[44ch] text-[15px] leading-relaxed text-[var(--color-text-tertiary)]">
                    {cap.description}
                  </p>
                  <p className="label mt-3">{cap.tools.join(' · ')}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-[var(--rule)]" />
          </Reveal>
        </div>
      </section>

      {/* ── Credentials: the shelf is the page's one moment of play ───── */}
      <section className="py-20 md:py-28 border-t border-[var(--rule)]">
        <div className={CONTAINER}>
          <Reveal>
            <h2 className="display-wide text-2xl md:text-3xl text-[var(--ink)]">Credentials</h2>
            <p className="mt-4 max-w-[56ch] text-[17px] leading-relaxed text-[var(--color-text-tertiary)]">
              Ten certifications across paid social, search, measurement, and AI tooling. Pull one
              off the shelf to inspect it.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10">
              <LazyCertificationShelf />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Close ─────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-t border-[var(--rule)]">
        <div className={CONTAINER}>
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="display-wide text-3xl md:text-4xl text-[var(--ink)]">Let's talk.</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-[var(--color-text-tertiary)]">
                I'm looking for my next paid social or growth role. Email me and I'll send over
                whatever numbers you want to see.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
                <a href="mailto:mychalolguin@gmail.com" className={BTN_PRIMARY}>
                  Email me
                </a>
                <Link to="/resume" className={BTN_SECONDARY}>
                  View resume
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
