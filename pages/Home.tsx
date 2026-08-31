import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Reveal } from '../components/Reveal';
import MediaTile from '../components/MediaTile';
import Capture from '../components/Capture';
import LazyCertificationShelf from '../components/shelf/LazyCertificationShelf';
import { PROJECTS } from '../constants';
import {
  CONTAINER,
  BTN_PRIMARY,
  BTN_SECONDARY,
  BTN_ON_BRAND,
  LINK_UNDERLINE,
} from '../components/layout';

/**
 * The hero summary. Every figure here traces to a platform Mychal actually
 * pulled it from, and the source is printed next to it — that sourcing is the
 * point of the section, not decoration.
 *
 * Every row comes from EXPERIENCE or from Towne Oaks' real dashboardData.
 * Nothing derived from a case study without measured numbers belongs here.
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
    title: 'Websites',
    description: 'Design and build the pages, including inside a locked-down CMS that will not do what you need.',
    tools: ['Web design', 'HTML/CSS', 'RentCafe', 'Shopify'],
  },
  {
    title: 'Paid social & search',
    description: 'Plan, launch, and run Meta and Google campaigns, testing creative against a set budget.',
    tools: ['Meta Ads Manager', 'Google Ads', 'Creative testing', 'Budget pacing'],
  },
  {
    title: 'SEO & answer engines',
    description: 'Structure and write pages so they rank locally and get quoted directly by AI assistants.',
    tools: ['On-page SEO', 'FAQ content', 'Heading structure', 'AEO'],
  },
  {
    title: 'Measurement & reporting',
    description: 'Build the tracking first, then report against it every week.',
    tools: ['GA4', 'UTMs', 'Event tracking', 'Excel'],
  },
  {
    title: 'Creative strategy',
    description: 'Read what performed, then change the hook, the copy, and the creative.',
    tools: ['A/B testing', 'Ad creative', 'Hooks', 'Iteration'],
  },
  {
    title: 'Local search & reputation',
    description: 'Google Business Profiles and reviews, so the property turns up in local and map results.',
    tools: ['Google Business', 'Reviews', 'Local SEO', 'Maps'],
  },
];

const FEATURED_SLUGS = ['towne-oaks-paid-social', 'cornerstone-apartment-websites'];

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

/** Frames a rendered tile so it can stand in for a screenshot that isn't in yet. */
const TileFallback: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="h-[380px] sm:h-[440px] border border-[var(--rule)] bg-[var(--color-bg-elevated)]">
    {children}
  </div>
);

const Home: React.FC = () => {
  const featured = PROJECTS.filter((p) => FEATURED_SLUGS.includes(p.slug));
  const towneOaks = PROJECTS.find((p) => p.slug === 'towne-oaks-paid-social');
  const websites = PROJECTS.find((p) => p.slug === 'cornerstone-apartment-websites');

  return (
    <>
      {/* ── The statement, and the evidence for it, on one screen. ──────
          The GA4 capture used to sit in its own section directly below this
          one, which put every sourced figure under the fold. The sourcing is
          the argument the page makes, so it should not cost a scroll to
          find — claim left, evidence right, both above the fold at 1440×900. */}
      {/* Navbar is `fixed` and h-16, so it sits outside the flow: the first
          64px of this padding lands underneath it and is not visible space.
          pt-28 leaves ~47px of actual gap below the rule, md:pt-32 ~63px.
          Anything at or below pt-16 puts content against the nav border. */}
      <section className="pt-28 md:pt-32 pb-20 md:pb-28">
        <div className={CONTAINER}>
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
            {/* ── The claim ─────────────────────────────────────────── */}
            <div className="min-w-0">
              {/* The Memoji, now set as a byline rather than a banner. Beside
                  the status line it still says a person wrote this, without
                  spending the top third of the viewport to say it. */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                /* Tighter below than the gap above, so the byline reads as
                   attached to the headline rather than floating between
                   two equal spaces. */
                className="flex items-center gap-4 mb-6 md:mb-8"
              >
                {/* Sized by height with width:auto, because the asset is now
                    cropped to the artwork (230x312) rather than padded out to a
                    320 square. The old square had 45px of transparent margin on
                    each side, which rendered as a ~9px indent against the
                    headline's left edge — visible on mobile, where the Memoji
                    and the headline stack against the same gutter. */}
                <img
                  src="/images/mychal-memoji.png"
                  alt="Memoji of Mychal Olguin"
                  width={230}
                  height={312}
                  className="h-16 md:h-20 w-auto flex-none select-none"
                  draggable={false}
                />
                {/* The availability line lives here rather than trailing the
                    paragraph: it is the most time-sensitive sentence on the
                    site, and it is one string to delete the day it stops
                    being true. */}
                <span className="label leading-relaxed">
                  Austin, Texas
                  <br />
                  Open to growth roles
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.06, ease: [0.25, 0.4, 0.25, 1] }}
                className="statement text-[2.5rem] sm:text-5xl lg:text-6xl text-[var(--ink)] max-w-[16ch]"
              >
                I build the site, run the ads, and prove what worked.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12, ease: [0.25, 0.4, 0.25, 1] }}
                className="mt-7 max-w-[44ch] text-lg leading-relaxed text-[var(--color-text-tertiary)]"
              >
                Websites, search, and paid media — plus the measurement layer that shows which of
                them did the work.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.24 }}
                className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
              >
                <Link to="/work" className={BTN_PRIMARY}>
                  Read the case studies
                </Link>
                <Link to="/resume" className={BTN_SECONDARY}>
                  View resume
                </Link>
              </motion.div>
            </div>

            {/* ── The evidence ──────────────────────────────────────────
                `bare` because the grid column already owns the width; the
                capture's own CONTAINER would inset and re-centre it inside
                the column. Not wrapped in Reveal — anything above the fold
                renders immediately rather than waiting on a scroll trigger. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.25, 0.4, 0.25, 1] }}
              className="min-w-0"
            >
              <Capture
                bare
                src="/captures/ga4-overview.png"
                alt="GA4 acquisition overview for the Towne Oaks campaign window"
                source="GA4"
                caption="Acquisition across the campaign window — 7,857 sessions, 38.4% of them from paid social."
                fallback={
                  towneOaks?.media ? (
                    <TileFallback>
                      <MediaTile media={towneOaks.media} className="w-full h-full" />
                    </TileFallback>
                  ) : null
                }
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Performance summary: the credibility core, given air. ─────── */}
      {/* Sunken band. The tint is barely perceptible on its own — its job is
          to give the page a pulse of light and dark as you scroll, so the
          sections read as separate without a rule between them. */}
      <section className="py-28 md:py-40 bg-[var(--surface-sunken)]">
        <div className={CONTAINER}>
          <Reveal>
            <h2 className="statement text-3xl md:text-5xl text-[var(--ink)] text-center mx-auto max-w-[22ch]">
              Every number on this site names where it came from.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            {/* Left-aligned on purpose. Centring a table destroys the column
                edge that makes a set of figures scannable. */}
            <div className="mt-16 md:mt-20 max-w-3xl mx-auto">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="label">Performance summary</h3>
                <span className="label">2023 — 2026</span>
              </div>

              <div className="mt-5">
                {SUMMARY_ROWS.map((row, i) => (
                  <div key={row.metric}>
                    <DrawnRule delay={i * 0.06} />
                    <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_13rem] items-baseline gap-x-5 sm:gap-x-8 py-5 transition-colors duration-150 hover:bg-[var(--surfaceHover)]">
                      <div>
                        <span className="text-[15px] md:text-base text-[var(--color-text-secondary)]">
                          {row.metric}
                        </span>
                        <span className="label block sm:hidden mt-1">{row.source}</span>
                      </div>
                      <span
                        className={`figure text-xl sm:text-2xl text-right ${
                          row.trend === 'up' ? 'text-[var(--signal-up)]' : 'text-[var(--ink)]'
                        }`}
                      >
                        {row.figure}
                      </span>
                      {/* Left-aligned so the source column has a clean left edge
                          to scan down, the way a report footnote column does. */}
                      <span className="label hidden sm:block">{row.source}</span>
                    </div>
                  </div>
                ))}
                <DrawnRule delay={SUMMARY_ROWS.length * 0.06} />
              </div>

              <p className="mt-6 text-[14px] leading-relaxed text-[var(--graphite)] max-w-[58ch]">
                Figures from campaigns run 2023—2026 across a 14-property multifamily portfolio.
                Each row traces to the platform named beside it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── The answer-engine proof. ──────────────────────────────────
          The strongest single artifact on the site: a live ChatGPT answer
          where two of the four citations point at pages I built and the
          other two point at aggregators. It used to appear only inside the
          case study; the crop lives at apts-ai-answer-citations.png and the
          whole frame links through to the study. */}
      {websites && (
        <section className="py-20 md:py-28">
          <div className={CONTAINER}>
            <Reveal>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="label">Answer engines</h3>
                <span className="label">Brownsville · Aug 2026</span>
              </div>

              <h2 className="statement mt-7 text-3xl md:text-5xl text-[var(--ink)] max-w-[24ch]">
                Two of these citations point at pages I built.
              </h2>

              <p className="mt-7 max-w-[58ch] text-lg leading-relaxed text-[var(--color-text-tertiary)]">
                Asked for pet-friendly apartments in Brownsville, ChatGPT sourced most of its
                answer from Rent.com, Realtor, and Apartments.com — and two properties from the
                property's own website. Those two are Borders and Los Cedros.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <figure className="mt-12 md:mt-14">
                <Link
                  to={`/work/${websites.slug}`}
                  aria-label={`Read the ${websites.title} case study`}
                  className="block border border-[var(--rule)] bg-[var(--color-bg-elevated)] p-3 sm:p-5 transition-colors duration-200 hover:border-[var(--ink)]"
                >
                  <img
                    src="/captures/apts-ai-answer-citations.png"
                    alt="ChatGPT listing four Brownsville apartment complexes. The citations under Los Cedros Apartments and Borders Apartments name the properties' own websites; the citations under Midtown Brownsville and Las Palmas name Rent.com and Realtor."
                    className="w-full h-auto block"
                  />
                </Link>

                {/* Same discipline as the rest of the page: cite the source,
                    and say plainly what the capture does not prove. */}
                <figcaption className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-1">
                  <span className="label">ChatGPT · August 2026</span>
                  <span className="text-[14px] leading-relaxed text-[var(--graphite)] max-w-[62ch]">
                    The chips under Los Cedros and Borders read as the properties' own sites; the
                    others read Rent.com and Realtor. This is a citation, not a ranking — no
                    baseline was recorded before the rebuild.
                  </span>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-10">
                <Link
                  to={`/work/${websites.slug}`}
                  className={`${LINK_UNDERLINE} inline-flex items-center gap-2 text-[15px] text-[var(--color-text-secondary)]`}
                >
                  Read how the four sites were rebuilt
                  <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── The tracking underneath it. ───────────────────────────────── */}
      <section className="py-28 md:py-40">
        <div className={CONTAINER}>
          <Reveal>
            <h2 className="statement text-3xl md:text-5xl text-[var(--ink)] text-center mx-auto max-w-[20ch]">
              The tracking gets built before the spend starts.
            </h2>
            <p className="mt-8 mx-auto max-w-[52ch] text-center text-lg leading-relaxed text-[var(--color-text-tertiary)]">
              One UTM taxonomy across every campaign, events defined up front, and a reporting view
              that reconciles the platform's numbers against GA4's.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 md:mt-24">
          <Reveal>
            <Capture
              bleed
              src="/captures/search-console.png"
              alt="Google Search Console clicks and impressions trend"
              source="Search Console"
              caption="Clicks and impressions through the optimization window."
              /* No stand-in here on purpose. This slot used to fall back to
                 the Cornerstone answer-engine tile, which is evidence for a
                 different claim than the heading above makes — and MediaTile
                 lays out with justify-between for a tall frame, so a short
                 tile rendered ~280px of empty box. The slot now stays empty
                 until search-console.png lands, then fills itself. */
              fallback={null}
            />
          </Reveal>
        </div>
      </section>

      {/* ── Selected work ─────────────────────────────────────────────── */}
      <section className="py-28 md:py-40">
        <div className={CONTAINER}>
          <Reveal>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="display text-2xl md:text-3xl text-[var(--ink)]">Selected work</h2>
              <Link to="/work" className={`label ${LINK_UNDERLINE}`}>
                All projects
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 md:mt-20 space-y-24 md:space-y-32">
            {featured.map((project) => {
              const isDirectional = project.metrics.some((m) => m.placeholder);
              // Kept as a guard for any future entry that ships a
              // "(placeholder)" timeframe. No current project has one.
              const timeframe = project.timeframe?.replace(/\s*\(placeholder\)/i, '');

              return (
                <Reveal key={project.slug}>
                  <article>
                    <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-start">
                      <Link
                        to={`/work/${project.slug}`}
                        aria-label={`Read the ${project.title} case study`}
                        className="block h-72 sm:h-96 lg:h-full lg:min-h-[360px] overflow-hidden border border-[var(--rule)] bg-[var(--color-bg-elevated)] transition-colors duration-200 hover:border-[var(--ink)]"
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

                        <h3 className="display text-2xl md:text-[2rem] mt-5">
                          <Link
                            to={`/work/${project.slug}`}
                            className="text-[var(--ink)] transition-opacity hover:opacity-70"
                          >
                            {project.title}
                          </Link>
                        </h3>

                        <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-[var(--color-text-tertiary)]">
                          {project.description}
                        </p>

                        {/* Same label/figure grammar as the summary above, so
                            the eye scans one column of figures down the page. */}
                        <dl className="mt-10">
                          {project.metrics.slice(0, 3).map((metric) => (
                            <div
                              key={metric.label}
                              className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-[var(--rule)] py-3.5"
                            >
                              <dt className="label">{metric.label}</dt>
                              <dd className="figure text-base text-[var(--ink)]">{metric.value}</dd>
                            </div>
                          ))}
                          <div className="border-t border-[var(--rule)]" />
                        </dl>

                        {isDirectional && (
                          <p className="mt-4 text-[13px] leading-relaxed text-[var(--graphite)]">
                            Directional — a 30-day snapshot. Full attribution lands at 60–90 days
                            as indexing propagates.
                          </p>
                        )}

                        <Link
                          to={`/work/${project.slug}`}
                          className="mt-8 inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--ink)] underline underline-offset-4 decoration-[var(--rule)] transition-colors hover:decoration-[var(--ink)]"
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

      {/* ── Capabilities ──────────────────────────────────────────────── */}
      <section className="py-28 md:py-40 bg-[var(--surface-sunken)]">
        <div className={CONTAINER}>
          <Reveal>
            <h2 className="statement text-3xl md:text-5xl text-[var(--ink)] text-center mx-auto max-w-[24ch]">
              The site, the campaigns that point at it, and the measurement that says which one worked.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 md:mt-24 grid md:grid-cols-2 gap-x-16">
              {CAPABILITIES.map((cap) => (
                <div key={cap.title} className="border-t border-[var(--rule)] py-8 md:py-9">
                  <h3 className="text-lg font-medium text-[var(--ink)]">{cap.title}</h3>
                  <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-[var(--color-text-tertiary)]">
                    {cap.description}
                  </p>
                  <p className="label mt-4">{cap.tools.join(' · ')}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-[var(--rule)]" />
          </Reveal>
        </div>
      </section>

      {/* ── Credentials: the page's one moment of play ────────────────── */}
      <section className="py-28 md:py-40">
        <div className={CONTAINER}>
          <Reveal>
            <h2 className="statement text-3xl md:text-5xl text-[var(--ink)] text-center mx-auto max-w-[20ch]">
              Ten certifications. Pull one off the shelf.
            </h2>
            <p className="mt-8 mx-auto max-w-[50ch] text-center text-lg leading-relaxed text-[var(--color-text-tertiary)]">
              Across paid social, search, measurement, and AI tooling.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 md:mt-20">
              <LazyCertificationShelf />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Close ─────────────────────────────────────────────────────────
          The page's one saturated field, and the only one on the site. It
          works because everything above it is quiet — put a second one
          anywhere and both stop meaning anything. ────────────────────── */}
      <section className="py-32 md:py-48 bg-[var(--brand-field)]">
        <div className={CONTAINER}>
          <Reveal>
            <div className="text-center">
              <h2 className="statement text-4xl md:text-6xl text-[var(--on-brand-field)] mx-auto max-w-[16ch]">
                Let's talk.
              </h2>
              <p className="mt-8 mx-auto max-w-[48ch] text-lg leading-relaxed text-[var(--on-brand-field)] opacity-80">
                I'm looking for my next digital marketing or growth role. Email me and I'll send
                over whatever you want to see.
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

export default Home;
