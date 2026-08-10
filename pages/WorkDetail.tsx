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
import { Artifact } from '../types';
import { useSEO } from '../hooks/useSEO';
import { CONTAINER, LINK_UNDERLINE } from '../components/layout';

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

  // The Borders timeframe literally reads "(placeholder)" in the data; the
  // disclosure beneath the metrics states it properly instead.
  const timeframe = project.timeframe?.replace(/\s*\(placeholder\)/i, '');
  const hasDirectional = project.metrics.some((m) => m.placeholder);

  /** Facts that belong in a masthead block, not in the prose. */
  const FACTS: { label: string; value?: string; mono?: boolean }[] = [
    { label: 'Timeframe', value: timeframe },
    { label: 'Objective', value: project.objective },
    { label: 'Channels', value: project.channels },
    { label: 'Destination', value: project.destination, mono: true },
    { label: 'Tools', value: project.tools },
  ];
  const facts = FACTS.filter((f) => f.value);

  const sections: Section[] = project.problem
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
        {/* ── Masthead ────────────────────────────────────────────────── */}
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

            {facts.length > 0 && (
              <Reveal delay={0.1}>
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
                <p className="label mt-6">{project.tags.join(' · ')}</p>
              </Reveal>
            )}
          </div>
        </section>

        {/* ── The capture: a real platform view, or the rendered tile ──── */}
        <Reveal y={30}>
          <Capture
            bleed
            src={project.heroImage}
            alt={`Platform view for ${project.title}`}
            source={project.channels || 'Platform'}
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

        {/* ── Headline metrics ────────────────────────────────────────── */}
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
