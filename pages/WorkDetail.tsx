import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import Capture from '../components/Capture';
import SocialReels from '../components/SocialReels';
import ScrollProgress from '../components/ScrollProgress';
import CaseStudyDashboard from '../components/CaseStudyDashboard';
import { PROJECTS } from '../constants';
import { Artifact, Project } from '../types';
import { useSEO } from '../hooks/useSEO';
import { CONTAINER, LINK_UNDERLINE } from '../components/layout';

const TOWNE_OAKS_CASE_STUDY_SLUG = 'towne-oaks-paid-social';
const AEO_CASE_STUDY_SLUG = 'cornerstone-apartment-websites';
const CHATGPT_CITATION_CROP = '/captures/apts-ai-answer-citations.png';
const PET_WIDGET_CAPTURE = '/captures/apts-pet-widget.png';
const BORDERS_SITE_CAPTURE = '/captures/borders-site.png';
const VERANO_CHATGPT_CAPTURE = '/captures/verano-oaks-chatgpt.png';

type Fact = { label: string; value?: string; mono?: boolean };
type MethodStep = { label: string; value: string };

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

const TOWNE_MEASUREMENT_STEPS: MethodStep[] = [
  {
    label: 'Objective',
    value:
      'Optimized for landing page views instead of link clicks, because the goal was loaded floorplan traffic.',
  },
  {
    label: 'Tracking',
    value:
      'Used one UTM structure across ad variants so Meta traffic could be separated cleanly inside GA4.',
  },
  {
    label: 'Validation',
    value:
      'Compared Meta landing page views against GA4 sessions, engagement, and floorplan-page behavior.',
  },
  {
    label: 'Reporting',
    value:
      'Built weekly reporting from Meta Ads Manager exports, GA4 explorations, and an Excel performance view.',
  },
  {
    label: 'Privacy',
    value:
      'Redrew the visuals from real exports so account names, IDs, audiences, and billing details stay private.',
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
        className="case-artifact-image"
      />
      {artifact.caption && (
        <figcaption className="editorial-note mt-4">{artifact.caption}</figcaption>
      )}
    </figure>
  );
};

type Section = { title: string; body?: string; artifact?: Artifact };
type SnapshotItem = { label: string; value: string };

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
      className={`case-evidence-image ${imageClassName || 'h-auto'}`}
    />
    <figcaption className="mt-3">
      <span className="editorial-eyebrow block">{label}</span>
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
      <dl className="case-facts">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="case-fact"
          >
            <dt className="editorial-eyebrow">{fact.label}</dt>
            <dd
              className={`break-words ${
                fact.mono ? 'figure' : ''
              }`}
            >
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
      {tags && <p className="case-tags">{tags.join(' · ')}</p>}
    </>
  );
};

const AEOHero: React.FC<{ project: Project }> = ({ project }) => (
  <section className="case-hero case-hero--aeo">
    <div className={CONTAINER}>
      <Reveal>
        <Link to="/work" className="case-back">
          <ArrowLeft size={13} />
          All case studies
        </Link>
      </Reveal>

      <div className="case-hero-split">
        <Reveal delay={0.05}>
          <p className="editorial-eyebrow">{project.eyebrow || project.subtitle}</p>
          <h1>
            Pages built to be found.
          </h1>
          <p className="case-hero-intro">
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
        <dl className="case-proof-strip">
          {AEO_PROOF_POINTS.map((point) => (
            <div key={point.label}>
              <dt className="editorial-eyebrow">{point.label}</dt>
              <dd className="case-proof-value">
                {point.value}
              </dd>
              <p>
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
  <section className="case-evidence-chapter">
    <div className={CONTAINER}>
      <Reveal>
        <p className="editorial-eyebrow">Evidence chain</p>
        <h2 className="case-section-title">
          The AI answer traces back to page-level work.
        </h2>
        <p className="editorial-body case-section-intro">
          The point is not that a screenshot proves rankings. It proves retrieval: the assistant
          found property-owned pages because the pages answered the question directly.
        </p>
      </Reveal>

      <div className="case-evidence-grid">
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
  <section className="case-project-frame">
    <div className={CONTAINER}>
      <Reveal>
        <p className="editorial-eyebrow">Project frame</p>
        <h2 className="case-subheading">
          What was actually in scope.
        </h2>
        <FactsTable facts={facts} tags={tags} />
      </Reveal>
    </div>
  </section>
);

const VirtualTourSection: React.FC<{ tour: NonNullable<Project['virtualTour']> }> = ({ tour }) => (
  <section className="case-virtual-tour" aria-labelledby="virtual-tour-heading">
    <div className={CONTAINER}>
      <Reveal>
        <p className="editorial-eyebrow">360° tours · Los Cedros</p>
        <h2 id="virtual-tour-heading" className="case-section-title">
          {tour.title}
        </h2>
        <p className="editorial-body case-section-intro">{tour.description}</p>
        <dl className="case-tour-facts">
          <div>
            <dt className="editorial-eyebrow">My role</dt>
            <dd className="mt-3 text-[16px] leading-relaxed text-[var(--graphite)]">{tour.role}</dd>
          </div>
          <div>
            <dt className="editorial-eyebrow">Observed outcome</dt>
            <dd className="mt-3 text-[16px] leading-relaxed text-[var(--graphite)]">{tour.outcome}</dd>
          </div>
        </dl>
        <figure className="mt-10">
          <iframe
            src={tour.embedUrl}
            title="Interactive 360° tour of the Cedros floor plan at Los Cedros Apartments"
            loading="lazy"
            allowFullScreen
            className="case-tour-frame"
          />
          <figcaption className="mt-4 flex flex-col gap-3 text-[14px] leading-relaxed text-[var(--graphite)] sm:flex-row sm:justify-between">
            <span>Drag to look around. Select the room markers to move through the apartment.</span>
            <a href={tour.embedUrl} target="_blank" rel="noopener noreferrer" className={`shrink-0 ${LINK_UNDERLINE}`}>
              Open tour in a new tab ↗
            </a>
          </figcaption>
        </figure>
        <p className="mt-6 text-[15px] text-[var(--graphite)]">
          <a href={tour.sourceUrl} target="_blank" rel="noopener noreferrer" className={LINK_UNDERLINE}>
            View all tours on the Los Cedros website ↗
          </a>
          <span className="mt-2 block">Choose “360 view” under Cedros, Cenizo, or Mesquite.</span>
        </p>
      </Reveal>
    </div>
  </section>
);

const CaseSnapshot: React.FC<{ project: Project }> = ({ project }) => {
  const items: SnapshotItem[] = [
    { label: 'Challenge', value: project.challenge },
    { label: 'What I did', value: project.solution },
    { label: 'Result', value: project.result },
  ];

  return (
    <section className="case-snapshot editorial-dark">
      <div className={CONTAINER}>
        <Reveal>
          <div className="case-snapshot-layout">
            <div>
              <p className="editorial-eyebrow">Case snapshot</p>
              <h2>What changed.<br />What came back.</h2>
            </div>

            <dl className="case-snapshot-items">
              {items.map((item) => (
                <div
                  key={item.label}
                  className="case-snapshot-item"
                >
                  <dt className="editorial-eyebrow">{item.label}</dt>
                  <dd>
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const ProofMethodology: React.FC = () => (
  <section className="case-proof-note">
    <div className={CONTAINER}>
      <Reveal>
        <details>
          <summary>About the evidence</summary>
          <p>
            Some campaign and reporting visuals are redrawn from real platform exports to protect
            employer and client account details. Account names, IDs, billing, and audience data are
            removed; the visible metrics stay tied to the case study. Public website and AI-search
            captures are shown directly when they do not expose private account data.
          </p>
        </details>
      </Reveal>
    </div>
  </section>
);

const TowneMeasurementMethodology: React.FC = () => (
  <section className="case-methodology">
    <div className={CONTAINER}>
      <Reveal>
        <div className="case-methodology-layout">
          <div>
            <p className="editorial-eyebrow">How I measured it</p>
            <h2 className="case-subheading">
              The setup mattered as much as the spend.
            </h2>
          </div>

          <dl className="case-method-steps">
            {TOWNE_MEASUREMENT_STEPS.map((step) => (
              <div
                key={step.label}
                className="case-method-step"
              >
                <dt className="editorial-eyebrow">{step.label}</dt>
                <dd>
                  {step.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
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
    <section className="case-prose-section">
      <div>
        <span className="editorial-eyebrow">{String(index).padStart(2, '0')}</span>
        <h2>{section.title}</h2>
      </div>
      <div>
        {section.body && (
          <p className="case-prose-body">
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
  const headlineMetrics = [...project.metrics].sort((a, b) => {
    const priority = (label: string) => (label.toLowerCase().includes('lp views') ? 0 : 1);
    return priority(a.label) - priority(b.label);
  });

  const isAeoCaseStudy = project.slug === AEO_CASE_STUDY_SLUG;
  const isTowneOaksCaseStudy = project.slug === TOWNE_OAKS_CASE_STUDY_SLUG;
  const displayTitle = isTowneOaksCaseStudy
    ? 'Traffic with a purpose.'
    : project.slug === 'ire-junk-removal-website'
      ? 'A first place to get found.'
      : project.title;

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

      <article className="editorial-page case-study" itemScope itemType="https://schema.org/Article">
        {isAeoCaseStudy ? (
          <AEOHero project={project} />
        ) : (
          /* ── Masthead ──────────────────────────────────────────────── */
          <section className="case-hero">
            <div className={CONTAINER}>
              <Reveal>
                <Link
                  to="/work"
                  className="case-back"
                >
                  <ArrowLeft size={13} />
                  All case studies
                </Link>
              </Reveal>

              <Reveal delay={0.05}>
                <p className="editorial-eyebrow case-hero-label">{project.title.split(' — ')[0]} · {project.subtitle}</p>
                <h1>
                  {displayTitle}
                </h1>
                <p className="case-hero-intro">
                  {project.description}
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <FactsTable facts={facts} tags={project.tags} />
              </Reveal>
            </div>
          </section>
        )}

        <CaseSnapshot project={project} />
        {project.websiteUrl && (
          <div className={`${CONTAINER} case-live-link`}>
            <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="editorial-link">
              Visit the live website <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        )}
        {!project.socialReels && project.media?.variant !== 'website' && <ProofMethodology />}
        {isTowneOaksCaseStudy && <TowneMeasurementMethodology />}

        {/* ── The capture: a real platform view, or the rendered tile ──── */}
        {isAeoCaseStudy ? (
          <>
            <AEOEvidenceChain />
            <AEOProjectFrame facts={facts} tags={project.tags} />
          </>
        ) : (
          <Reveal y={30}>
            <div className={`${CONTAINER} case-primary-capture`}>
            <Capture
              bare
              src={project.heroImage}
              alt={project.media?.variant === 'website' ? project.media.alt : `Platform view for ${project.title}`}
              source={project.heroSource || project.channels || 'Platform'}
              fallback={
                project.dashboardData ? (
                  <div className="case-campaign-proof">
                    <p className="editorial-eyebrow">Towne Oaks · Paid media</p>
                    <div className="case-campaign-proof-main">
                      <p>{project.dashboardData.totals.lpv.toLocaleString('en-US')}</p>
                      <span>landing page views</span>
                    </div>
                    <div className="case-campaign-proof-footer">
                      <p>${(project.dashboardData.totals.spend / project.dashboardData.totals.lpv).toFixed(2)} per view</p>
                      <span>Meta Ads Manager · {timeframe}</span>
                    </div>
                  </div>
                ) : null
              }
            />
            </div>
          </Reveal>
        )}

        {/* ── Headline metrics ──────────────────────────────────────────
            Skipped entirely when a case study has no numbers. An empty
            metrics rail reads as missing data; no rail reads as a case
            study that argues from something other than a figure. */}
        {project.metrics.length > 0 && (
        <section className="case-results">
          <div className={CONTAINER}>
            <Reveal>
              <div className="case-results-heading">
                <div><p className="editorial-eyebrow">Results</p><h2>{project.socialReels ? 'The content' : 'The campaign'}<br />in numbers.</h2></div>
                {timeframe && <span className="editorial-note">{timeframe}</span>}
              </div>

              <dl className="case-metrics">
                {headlineMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="case-metric"
                  >
                    <dd>{metric.value}</dd>
                    <dt>{metric.label}</dt>
                  </div>
                ))}
              </dl>

              {project.metricsSource && <p className="mt-6 max-w-[75ch] text-sm leading-relaxed text-[var(--graphite)]">{project.metricsSource}</p>}

              {hasDirectional && (
                <p className="mt-4 max-w-[58ch] text-[13px] leading-relaxed text-[var(--graphite)]">
                  Directional — a 30-day snapshot rather than a measured result. Full attribution
                  lands at 60–90 days as indexing propagates.
                </p>
              )}

            </Reveal>
          </div>
        </section>
        )}

        {/* ── Dashboard ───────────────────────────────────────────────── */}
        {project.dashboardData && (
          <div className={`${CONTAINER} case-dashboard-wrap`}>
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

        {project.virtualTour && <VirtualTourSection tour={project.virtualTour} />}

        {project.socialReels && <SocialReels reels={project.socialReels} />}

        {/* ── The write-up ────────────────────────────────────────────── */}
        <section className="case-writeup">
          <div className={CONTAINER}>
            <div className="case-writeup-sections">
              {sections.map((section, i) => (
                <ProseSection key={section.title} index={i + 1} section={section} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Next ────────────────────────────────────────────────────── */}
        <section className="case-next editorial-dark">
          <div className={CONTAINER}>
            <Reveal>
              <p className="editorial-eyebrow">Next case study</p>
              <Link to={`/work/${nextProject.slug}`} className="group block">
                <h2>
                  {nextProject.title}
                </h2>
                <span className="editorial-link">
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
