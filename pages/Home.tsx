import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Reveal } from '../components/Reveal';
import MediaTile from '../components/MediaTile';
import LazyCertificationShelf from '../components/shelf/LazyCertificationShelf';
import { PROJECTS } from '../constants';
import {
  CONTAINER,
  BTN_PRIMARY,
  BTN_SECONDARY,
  BTN_ON_BRAND,
  LINK_UNDERLINE,
} from '../components/layout';
import type { Project } from '../types';

const FEATURED_SLUGS = ['towne-oaks-paid-social', 'cornerstone-apartment-websites'];

const PROOF_ROWS = [
  {
    label: 'Landing page views',
    value: '2,475',
    detail: '$0.52 cost per view from Meta traffic',
  },
  {
    label: 'AI-surfaced properties',
    value: '3',
    detail: 'Borders, Los Cedros, and Verano Oaks',
  },
  {
    label: 'Owned-page citations',
    value: '2',
    detail: 'ChatGPT cited property pages I rebuilt',
  },
  {
    label: 'Organic traffic growth',
    value: '+20%',
    detail: 'Search Console across the portfolio',
  },
];

const WORKING_SYSTEM = [
  {
    title: 'Build the page',
    body: 'Rewrite the page around the questions renters and buyers actually ask.',
    tools: 'Web design · HTML/CSS · CMS builds',
  },
  {
    title: 'Find demand',
    body: 'Run paid and organic channels toward the pages that can convert interest.',
    tools: 'Meta Ads · Google Ads · SEO · AEO',
  },
  {
    title: 'Measure the movement',
    body: 'Set up UTMs, events, and reporting before the spend or optimization starts.',
    tools: 'GA4 · UTMs · Excel · Search Console',
  },
];

const RECEIPT_ROWS = [
  { label: 'Search surface', value: 'ChatGPT' },
  { label: 'Properties surfaced', value: '2' },
  { label: 'Proof type', value: 'AI visibility' },
];

const formatProjectProof = (project: Project) => {
  if (project.slug === 'cornerstone-apartment-websites') {
    return [
      { label: 'AI surfaced', value: '3 properties' },
      { label: 'Owned citations', value: '2 pages' },
      { label: 'Schema', value: '0 shipped' },
    ];
  }

  return project.metrics.slice(0, 3);
};

const DrawnRule: React.FC<{ delay?: number }> = ({ delay = 0 }) => (
  <motion.div
    aria-hidden="true"
    className="h-px bg-[var(--rule)] origin-left"
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 0.55, delay, ease: [0.25, 0.4, 0.25, 1] }}
  />
);

const CampaignEvidenceTile: React.FC<{ project: Project }> = ({ project }) => {
  const totals = project.dashboardData?.totals;
  const monthly = project.dashboardData?.monthly || [];

  if (!totals || monthly.length === 0) {
    return <MediaTile type={project.mediaType} media={project.media} className="h-full w-full" />;
  }

  const maxViews = Math.max(...monthly.map((month) => month.lpv));
  const costPerView = totals.lpv > 0 ? (totals.spend / totals.lpv).toFixed(2) : '0.00';

  return (
    <div className="flex h-full w-full flex-col justify-between bg-[var(--color-bg-muted)] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="label">Meta floorplan traffic</p>
          <p className="figure mt-4 text-5xl sm:text-6xl leading-none text-[var(--ink)]">
            {totals.lpv.toLocaleString()}
          </p>
          <p className="label mt-2">Landing page views</p>
        </div>

        <div className="text-right">
          <p className="label">Cost / LPV</p>
          <p className="figure mt-4 text-3xl sm:text-4xl leading-none text-[var(--data-1)]">
            ${costPerView}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="grid h-20 grid-cols-3 items-end gap-3" aria-hidden="true">
          {monthly.map((month) => (
            <div key={month.month} className="flex h-full flex-col justify-end gap-2">
              <div
                className="bg-[var(--data-1)]"
                style={{ height: `${Math.max((month.lpv / maxViews) * 100, 8)}%` }}
              />
              <span className="label text-center">{month.month.replace('Month ', 'M')}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

const EvidenceTile: React.FC<{ project: Project }> = ({ project }) => {
  if (project.slug === 'cornerstone-apartment-websites') {
    return (
      <img
        src="/captures/chatgpt-brownsville-pet-friendly.png"
        alt="ChatGPT Search result for pet-friendly apartments in Brownsville, Texas"
        className="h-full w-full object-cover object-top"
      />
    );
  }

  if (project.slug === 'towne-oaks-paid-social') {
    return <CampaignEvidenceTile project={project} />;
  }

  return <MediaTile type={project.mediaType} media={project.media} className="h-full w-full" />;
};

const Home: React.FC = () => {
  const featured = FEATURED_SLUGS.map((slug) => PROJECTS.find((project) => project.slug === slug))
    .filter(Boolean) as Project[];

  return (
    <>
      <section className="pt-28 md:pt-36 pb-20 md:pb-24">
        <div className={CONTAINER}>
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
            <div className="min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                className="flex items-center gap-4 mb-7"
              >
                <img
                  src="/images/mychal-memoji.png"
                  alt="Memoji of Mychal Olguin"
                  width={230}
                  height={312}
                  className="h-16 md:h-20 w-auto flex-none select-none"
                  draggable={false}
                />
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
                Marketing work you can inspect.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12, ease: [0.25, 0.4, 0.25, 1] }}
                className="mt-7 max-w-[46ch] text-lg leading-relaxed text-[var(--color-text-tertiary)]"
              >
                I build websites, run paid media, improve search visibility, and show the
                measurement behind the result.
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

            <motion.aside
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.25, 0.4, 0.25, 1] }}
              className="min-w-0 border border-[var(--rule)] bg-[var(--color-bg-elevated)] p-5 sm:p-6"
              aria-label="Portfolio proof summary"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="label">Proof ledger</h2>
                <span className="label">2023 — 2026</span>
              </div>

              <div className="mt-5">
                {PROOF_ROWS.map((row, index) => (
                  <div key={row.label}>
                    <DrawnRule delay={index * 0.05} />
                    <div className="grid grid-cols-[1fr_auto] gap-5 py-4">
                      <div>
                        <p className="text-[15px] font-medium text-[var(--ink)]">{row.label}</p>
                        <p className="mt-1 text-[13px] leading-relaxed text-[var(--graphite)]">
                          {row.detail}
                        </p>
                      </div>
                      <p
                        className={`figure text-2xl text-right ${
                          row.value.startsWith('+')
                            ? 'text-[var(--signal-up)]'
                            : 'text-[var(--ink)]'
                        }`}
                      >
                        {row.value}
                      </p>
                    </div>
                  </div>
                ))}
                <DrawnRule delay={PROOF_ROWS.length * 0.05} />
              </div>

              <p className="mt-5 text-[13px] leading-relaxed text-[var(--graphite)]">
                Numbers come from GA4, Meta Ads, Search Console, and live AI-search captures.
              </p>
            </motion.aside>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[var(--surface-sunken)]">
        <div className={CONTAINER}>
          <Reveal>
            <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-10 lg:gap-14 items-start">
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="label">Visual receipt</p>
                  <span className="label">ChatGPT · Aug 2026</span>
                </div>

                <h2 className="statement mt-6 text-3xl md:text-5xl text-[var(--ink)] max-w-[17ch]">
                  The work shows up where renters ask.
                </h2>

                <p className="mt-7 text-lg leading-relaxed text-[var(--color-text-tertiary)] max-w-[43ch]">
                  For the search "pet friendly apartments in brownsville tx," ChatGPT surfaced Los
                  Cedros in the map results and listed Borders in the answer.
                </p>

                <dl className="mt-10 border-y border-[var(--rule)]">
                  {RECEIPT_ROWS.map((row) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-[var(--rule)] py-3 last:border-b-0"
                    >
                      <dt className="label">{row.label}</dt>
                      <dd className="figure text-[15px] text-[var(--ink)]">{row.value}</dd>
                    </div>
                  ))}
                </dl>

                <Link
                  to="/work/cornerstone-apartment-websites"
                  className="mt-8 inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--ink)] underline underline-offset-4 decoration-[var(--rule)] transition-colors hover:decoration-[var(--ink)]"
                >
                  Read the AI-search case study
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>

              <figure className="min-w-0">
                <Link
                  to="/work/cornerstone-apartment-websites"
                  aria-label="Read the AI-search case study"
                  className="block w-full max-w-full overflow-x-auto border border-[var(--rule)] bg-[var(--color-bg-elevated)] p-3 sm:p-4 transition-colors hover:border-[var(--ink)]"
                >
                  <img
                    src="/captures/chatgpt-brownsville-pet-friendly.png"
                    alt="ChatGPT Search result for pet-friendly apartments in Brownsville, Texas"
                    className="block h-auto w-[38rem] max-w-none sm:w-full sm:max-w-full"
                  />
                </Link>
                <figcaption className="mt-4 text-[13px] leading-relaxed text-[var(--graphite)]">
                  Visibility proof, not attribution proof: the capture shows rebuilt properties
                  appearing in ChatGPT Search.
                </figcaption>
              </figure>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className={CONTAINER}>
          <Reveal>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="display text-2xl md:text-3xl text-[var(--ink)]">Selected work</h2>
              <Link to="/work" className={`label ${LINK_UNDERLINE}`}>
                All projects
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 md:mt-16 grid lg:grid-cols-2 gap-8 lg:gap-10">
            {featured.map((project) => (
              <Reveal key={project.slug}>
                <article className="h-full border border-[var(--rule)] bg-[var(--color-bg-elevated)]">
                  <Link
                    to={`/work/${project.slug}`}
                    aria-label={`Read the ${project.title} case study`}
                    className="block h-64 sm:h-80 overflow-hidden border-b border-[var(--rule)] transition-opacity hover:opacity-90"
                  >
                    <EvidenceTile project={project} />
                  </Link>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="label">{project.subtitle}</span>
                      {project.timeframe && <span className="label">{project.timeframe}</span>}
                    </div>

                    <h3 className="display text-2xl mt-5 text-[var(--ink)]">
                      <Link
                        to={`/work/${project.slug}`}
                        className="transition-opacity hover:opacity-70"
                      >
                        {project.title}
                      </Link>
                    </h3>

                    <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-text-tertiary)]">
                      {project.description}
                    </p>

                    <dl className="mt-8">
                      {formatProjectProof(project).map((metric) => (
                        <div
                          key={metric.label}
                          className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-[var(--rule)] py-3"
                        >
                          <dt className="label">{metric.label}</dt>
                          <dd className="figure text-[15px] text-[var(--ink)]">{metric.value}</dd>
                        </div>
                      ))}
                      <div className="border-t border-[var(--rule)]" />
                    </dl>

                    <Link
                      to={`/work/${project.slug}`}
                      className="mt-7 inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--ink)] underline underline-offset-4 decoration-[var(--rule)] transition-colors hover:decoration-[var(--ink)]"
                    >
                      Read the case study
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className={CONTAINER}>
          <Reveal>
            <p className="label">How I work</p>
            <h2 className="statement mt-5 text-3xl md:text-5xl text-[var(--ink)] max-w-[23ch]">
              One system from page to channel to report.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 md:mt-16 grid md:grid-cols-3 border-y border-[var(--rule)] divide-y md:divide-y-0 md:divide-x divide-[var(--rule)]">
              {WORKING_SYSTEM.map((item) => (
                <section key={item.title} className="py-7 md:px-7">
                  <h3 className="text-lg font-medium text-[var(--ink)]">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-text-tertiary)]">
                    {item.body}
                  </p>
                  <p className="label mt-5">{item.tools}</p>
                </section>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[var(--surface-sunken)]">
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
            <div className="mt-14 md:mt-16">
              <LazyCertificationShelf />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-28 md:py-40 bg-[var(--brand-field)]">
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
