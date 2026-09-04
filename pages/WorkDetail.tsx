import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import Capture from '../components/Capture';
import MediaTile from '../components/MediaTile';
import ScrollProgress from '../components/ScrollProgress';
import MeasurementNote from '../components/MeasurementNote';
import CaseStudyDashboard from '../components/CaseStudyDashboard';
import { PROJECTS } from '../constants';
import { Artifact, Project } from '../types';
import { useSEO } from '../hooks/useSEO';
import { CONTAINER, LINK_UNDERLINE } from '../components/layout';

const AEO_CASE_STUDY_SLUG = 'cornerstone-apartment-websites';
const CHATGPT_CITATION_CROP = '/captures/apts-ai-answer-citations.png';
const PET_WIDGET_CAPTURE = '/captures/apts-pet-widget.png';
const BORDERS_SITE_CAPTURE = '/captures/borders-site.png';
const VERANO_CHATGPT_CAPTURE = '/captures/verano-oaks-chatgpt.png';

type Fact = { label: string; value?: string; mono?: boolean };

const AEO_PROOF_POINTS = [
  {
    label: 'Sites rebuilt',
    value: '4',
    detail: 'Borders, Los Cedros, Compass Bay, Verano Oaks',
  },
  {
    label: 'AI-surfaced properties',
    value: '3',
    detail: 'Borders, Los Cedros, and Verano Oaks appeared across ChatGPT answers',
  },
  {
    label: 'Owned-page citations',
    value: '2',
    detail: 'Borders and Los Cedros were cited from property-owned pages',
  },
  {
    label: 'Schema shipped',
    value: '0',
    detail: 'The citation came from readable page structure, not markup',
  },
];

/** Renders nothing if the image 404s, so a missing artifact never leaves a gap. */
const ArtifactImage: React.FC<{ artifact: Artifact }> = ({ artifact }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return null;
  }

  return (
    <figure className="w-full">
      <img
        src={artifact.src}
        alt={artifact.alt}
        onError={() => setHasError(true)}
        className="w-full border border-[var(--rule)]"
      />
      {artifact.caption && (
        <figcaption className="label mt-3">{artifact.caption}</figcaption>
      )}
    </figure>
  );
};

type Section = { title: string; body?: string; artifact?: Artifact };

const EvidenceFigure: React.FC<{
  src: string;
  alt: string;
  label: string;
  caption: string;
  className?: string;
  imageClassName?: string;
}> = ({ src, alt, label, caption, className = '', imageClassName = '' }) => (
  <figure className={className}>
    <img
      src={src}
      alt={alt}
      className={`w-full border border-[var(--rule)] block ${imageClassName || 'h-auto'}`}
    />
    <figcaption className="mt-3">
      <span className="label block">{label}</span>
      <span className="mt-1 block text-[14px] leading-relaxed text-[var(--graphite)]">
        {caption}
      </span>
    </figcaption>
  </figure>
);

const FactsTable: React.FC<{ facts: Fact[]; tags?: string[] }> = ({ facts, tags }) => {
  if (facts.length === 0) {
    return null;
  }

  return (
    <>
      <dl className="mt-12 max-w-3xl">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="grid grid-cols-[8rem_1fr] items-baseline gap-4 border-t border-[var(--rule)] py-3 transition-colors duration-150 hover:bg-[var(--surfaceHover)]"
          >
            <dt className="label">{fact.label}</dt>
            <dd
              className={`text-[15px] text-[var(--color-text-secondary)] break-words ${
                fact.mono ? 'figure' : ''
              }`}
            >
              {fact.value}
            </dd>
          </div>
        ))}
        <div className="border-t border-[var(--rule)]" />
      </dl>
      {tags && <p className="label mt-6">{tags.join(' · ')}</p>}
    </>
  );
};

const AEOHero: React.FC<{ project: Project }> = ({ project }) => (
  <section className="pt-24 md:pt-28 pb-16 md:pb-20">
    <div className={CONTAINER}>
      <Reveal>
        <Link to="/work" className={`label inline-flex items-center gap-2 ${LINK_UNDERLINE}`}>
          <ArrowLeft size={13} />
          All case studies
        </Link>
      </Reveal>

      <div className="mt-8 grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-center">
        <Reveal delay={0.05}>
          <p className="label">{project.eyebrow || project.subtitle}</p>
          <h1 className="display text-[2.35rem] sm:text-5xl lg:text-6xl text-[var(--ink)] mt-4 max-w-[16ch]">
            Pages I rebuilt showed up as ChatGPT sources.
          </h1>
          <p className="mt-7 max-w-[48ch] text-lg leading-relaxed text-[var(--color-text-tertiary)]">
            Four apartment websites were rebuilt around the questions renters actually ask.
            Later, ChatGPT cited Borders and Los Cedros from their own pages instead of only
            pulling from listing sites, and Verano Oaks surfaced in a separate Hurst search.
          </p>
        </Reveal>

        <Reveal delay={0.12} y={28}>
          <EvidenceFigure
            src={CHATGPT_CITATION_CROP}
            alt="ChatGPT answer showing property-owned citations for Los Cedros and Borders Apartments"
            label="ChatGPT citation receipt"
            caption="The visible source chips name Los Cedros Apartments and Borders Apartments. That is the case study's main proof."
          />
        </Reveal>
      </div>

      <Reveal delay={0.18}>
        <dl className="mt-10 grid md:grid-cols-4 border-y border-[var(--rule)] divide-y md:divide-y-0 md:divide-x divide-[var(--rule)]">
          {AEO_PROOF_POINTS.map((point) => (
            <div key={point.label} className="py-6 md:px-6">
              <dt className="label">{point.label}</dt>
              <dd className="figure text-4xl md:text-5xl text-[var(--ink)] mt-3">
                {point.value}
              </dd>
              <p className="mt-3 text-[14px] leading-relaxed text-[var(--graphite)]">
                {point.detail}
              </p>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  </section>
);

const AEOEvidenceChain: React.FC = () => (
  <section className="py-24 md:py-32 bg-[var(--surface-sunken)]">
    <div className={CONTAINER}>
      <Reveal>
        <p className="label">Evidence chain</p>
        <h2 className="statement text-3xl md:text-5xl text-[var(--ink)] mt-5 max-w-[22ch]">
          The AI answer traces back to page-level work.
        </h2>
        <p className="mt-7 max-w-[58ch] text-lg leading-relaxed text-[var(--color-text-tertiary)]">
          The point is not that a screenshot proves rankings. It proves retrieval: the assistant
          found property-owned pages because the pages answered the question directly.
        </p>
      </Reveal>

      <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 items-start">
        <Reveal y={26}>
          <EvidenceFigure
            src={PET_WIDGET_CAPTURE}
            alt="Pet policy tiers and floor-plan FAQ written into a Los Cedros Apartments page"
            label="Source content"
            caption="The pet policy and FAQ answer the same questions the AI result repeats."
            imageClassName="aspect-[4/3] object-cover object-top"
          />
        </Reveal>

        <Reveal delay={0.08} y={26}>
          <EvidenceFigure
            src={BORDERS_SITE_CAPTURE}
            alt="Borders Apartments website rebuilt with renter-focused page structure"
            label="Published website"
            caption="One of four rebuilt RentCafe sites, with content structured around renter questions."
            imageClassName="aspect-[4/3] object-cover object-top"
          />
        </Reveal>

        <Reveal delay={0.16} y={26}>
          <EvidenceFigure
            src={VERANO_CHATGPT_CAPTURE}
            alt="ChatGPT apartment answer surfacing Verano Oaks Apartments in Hurst, Texas"
            label="Additional AI surface"
            caption="A separate Hurst query surfaced Verano Oaks in the map and options list. This is a visibility signal, separate from the owned-page citations."
            imageClassName="aspect-[4/3] object-cover object-top"
          />
        </Reveal>
      </div>
    </div>
  </section>
);

const AEOProjectFrame: React.FC<{ facts: Fact[]; tags: string[] }> = ({ facts, tags }) => (
  <section className="py-20 md:py-28">
    <div className={CONTAINER}>
      <Reveal>
        <p className="label">Project frame</p>
        <h2 className="display text-2xl md:text-3xl text-[var(--ink)] mt-4">
          What was actually in scope.
        </h2>
        <FactsTable facts={facts} tags={tags} />
      </Reveal>
    </div>
  </section>
);

/**
 * A numbered section of the write-up. The numbers are not decoration — a case
 * study is a real sequence (what was wrong, what I did, what came back), and
 * the order is part of the argument.
 */
const ProseSection: React.FC<{ index: number; section: Section }> = ({ index, section }) => (
  <Reveal>
    <section className="border-t border-[var(--rule)] pt-7 grid md:grid-cols-[13rem_1fr] gap-4 md:gap-10">
      <div>
        <span className="figure label">{String(index).padStart(2, '0')}</span>
        <h2 className="display text-xl text-[var(--ink)] mt-2">{section.title}</h2>
      </div>
      <div>
        {section.body && (
          <p className="text-[17px] md:text-lg leading-relaxed text-[var(--color-text-secondary)] whitespace-pre-line max-w-[64ch]">
            {section.body}
          </p>
        )}
        {section.artifact && (
          <div className="mt-10">
            <ArtifactImage artifact={section.artifact} />
          </div>
        )}
      </div>
    </section>
  </Reveal>
);

const WorkDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[projectIndex];

  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  useSEO({
    title: project?.title || 'Case Study',
    description: project?.description || 'View this growth marketing case study by Mychal Olguin.',
  });

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const caseStudySchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: project.title,
    description: project.description,
    author: { '@type': 'Person', name: 'Mychal Olguin' },
    publisher: { '@type': 'Person', name: 'Mychal Olguin' },
    image: project.heroImage,
    articleSection: 'Case Study',
    keywords: project.tags.join(', '),
  };

  // Kept as a guard for any future entry that ships a "(placeholder)"
  // timeframe. No current project has one.
  const timeframe = project.timeframe?.replace(/\s*\(placeholder\)/i, '');
  const hasDirectional = project.metrics.some((m) => m.placeholder);

  const isAeoCaseStudy = project.slug === AEO_CASE_STUDY_SLUG;

  /** Facts that belong in a framing block, not in the prose. */
  const FACTS: Fact[] = [
    { label: 'Timeframe', value: timeframe },
    { label: 'Objective', value: project.objective },
    { label: 'Channels', value: project.channels },
    { label: 'Destination', value: project.destination, mono: true },
    { label: 'Tools', value: project.tools },
  ];
  const facts = FACTS.filter((f) => f.value);

  const sections: Section[] = project.narrative
    ? project.narrative.filter((s) => s.body || s.artifact)
    : project.problem
    ? [
        { title: 'Problem', body: project.problem },
        { title: 'Approach', body: project.approach, artifact: project.artifacts?.[0] },
        { title: 'Execution', body: project.execution },
        { title: 'Reporting', body: project.reporting, artifact: project.artifacts?.[1] },
        { title: 'Results', body: project.results },
        { title: 'Next steps', body: project.nextSteps },
      ].filter((s) => s.body || s.artifact)
    : [
        { title: 'The challenge', body: project.challenge },
        { title: 'The solution', body: project.solution },
        { title: 'The result', body: project.result },
      ].filter((s) => s.body);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />
      <ScrollProgress />

      <article itemScope itemType="https://schema.org/Article">
        {isAeoCaseStudy ? (
          <AEOHero project={project} />
        ) : (
          /* ── Masthead ──────────────────────────────────────────────── */
          <section className="pt-36 md:pt-52 pb-16 md:pb-24">
            <div className={CONTAINER}>
              <Reveal>
                <Link
                  to="/work"
                  className={`label inline-flex items-center gap-2 ${LINK_UNDERLINE}`}
                >
                  <ArrowLeft size={13} />
                  All case studies
                </Link>
              </Reveal>

              <Reveal delay={0.05}>
                <p className="label mt-9">{project.eyebrow || project.subtitle}</p>
                <h1 className="display text-[2.25rem] sm:text-5xl lg:text-6xl text-[var(--ink)] mt-4 max-w-[20ch]">
                  {project.title}
                </h1>
                <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-[var(--color-text-tertiary)]">
                  {project.description}
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <FactsTable facts={facts} tags={project.tags} />
              </Reveal>
            </div>
          </section>
        )}

        {/* ── The capture: a real platform view, or the rendered tile ──── */}
        {isAeoCaseStudy ? (
          <>
            <AEOEvidenceChain />
            <AEOProjectFrame facts={facts} tags={project.tags} />
          </>
        ) : (
          <Reveal y={30}>
            <Capture
              bleed
              src={project.heroImage}
              alt={`Platform view for ${project.title}`}
              source={project.heroSource || project.channels || 'Platform'}
              fallback={
                project.media ? (
                  <div className="w-full h-[320px] md:h-[520px] overflow-hidden border border-[var(--rule)] bg-[var(--color-bg-elevated)]">
                    <MediaTile
                      type={project.mediaType}
                      media={project.media}
                      className="w-full h-full"
                    />
                  </div>
                ) : null
              }
            />
          </Reveal>
        )}

        {/* ── Headline metrics ──────────────────────────────────────────
            Skipped entirely when a case study has no numbers. An empty
            metrics rail reads as missing data; no rail reads as a case
            study that argues from something other than a figure. */}
        {project.metrics.length > 0 && (
        <section className="py-28 md:py-40">
          <div className={CONTAINER}>
            <Reveal>
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="label">Headline metrics</h2>
                {timeframe && <span className="label">{timeframe}</span>}
              </div>

              <dl className="mt-4 max-w-3xl">
                {project.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="grid grid-cols-[1fr_auto] items-baseline gap-5 border-t border-[var(--rule)] py-3.5 transition-colors duration-150 hover:bg-[var(--surfaceHover)]"
                  >
                    <dt className="text-[15px] text-[var(--color-text-secondary)]">
                      {metric.label}
                    </dt>
                    <dd className="figure text-lg sm:text-xl text-[var(--ink)]">{metric.value}</dd>
                  </div>
                ))}
                <div className="border-t border-[var(--rule)]" />
              </dl>

              {hasDirectional && (
                <p className="mt-4 max-w-[58ch] text-[13px] leading-relaxed text-[var(--graphite)]">
                  Directional — a 30-day snapshot rather than a measured result. Full attribution
                  lands at 60–90 days as indexing propagates.
                </p>
              )}

              <MeasurementNote />
            </Reveal>
          </div>
        </section>
        )}

        {/* ── Dashboard ───────────────────────────────────────────────── */}
        {project.dashboardData && (
          <div className={CONTAINER}>
            <Reveal>
              <CaseStudyDashboard
                data={project.dashboardData}
                objective={project.objective}
                destination={project.destination}
                timeframe={project.timeframe}
              />
            </Reveal>
          </div>
        )}

        {/* ── The write-up ────────────────────────────────────────────── */}
        <section className="py-28 md:py-40">
          <div className={CONTAINER}>
            <div className="space-y-16 md:space-y-20">
              {sections.map((section, i) => (
                <ProseSection key={section.title} index={i + 1} section={section} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Next ────────────────────────────────────────────────────── */}
        <section className="py-28 md:py-40">
          <div className={CONTAINER}>
            <Reveal>
              <p className="label">Next case study</p>
              <Link to={`/work/${nextProject.slug}`} className="group block mt-4">
                <h2 className="display text-3xl md:text-4xl text-[var(--ink)] transition-opacity group-hover:opacity-70 max-w-[20ch]">
                  {nextProject.title}
                </h2>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--ink)] underline underline-offset-4 decoration-[var(--rule)] transition-colors group-hover:decoration-[var(--ink)]">
                  Read it
                  <ArrowRight size={16} />
                </span>
              </Link>
            </Reveal>
          </div>
        </section>
      </article>
    </>
  );
};

export default WorkDetail;
