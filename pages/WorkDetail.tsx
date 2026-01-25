import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { Reveal, StaggerContainer, StaggerItem } from '../components/Reveal';
import ScrollProgress from '../components/ScrollProgress';
import MeasurementNote from '../components/MeasurementNote';
import CaseStudyDashboard from '../components/CaseStudyDashboard';
import { PROJECTS } from '../constants';
import { Artifact } from '../types';
import { useSEO } from '../hooks/useSEO';

// Graceful image component - returns null if image fails to load
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
        className="w-full rounded-xl border border-[var(--color-border-default)] shadow-lg"
      />
      {artifact.caption && (
        <figcaption className="text-center text-sm text-[var(--color-text-muted)] mt-3 italic">
          {artifact.caption}
        </figcaption>
      )}
    </figure>
  );
};

const WorkDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const projectIndex = PROJECTS.findIndex(p => p.slug === slug);
  const project = PROJECTS[projectIndex];

  // Logic for Next Project Navigation
  const nextProjectIndex = (projectIndex + 1) % PROJECTS.length;
  const nextProject = PROJECTS[nextProjectIndex];

  // SEO: Update page title and description
  useSEO({
    title: project?.title || 'Case Study',
    description: project?.description || 'View this growth marketing case study by Mychal Olguin.'
  });

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  // Structured data for the case study
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": project.title,
    "description": project.description,
    "author": {
      "@type": "Person",
      "name": "Mychal Olguin"
    },
    "publisher": {
      "@type": "Person",
      "name": "Mychal Olguin"
    },
    "image": project.heroImage,
    "articleSection": "Case Study",
    "keywords": project.tags.join(", ")
  };

  return (
    <PageTransition>
      {/* Structured Data for Case Study */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />
      <ScrollProgress />
      <article className="pt-32 pb-20" itemScope itemType="https://schema.org/Article">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <Link to="/work" className="inline-flex items-center text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] mb-8 transition-colors group">
              <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Work
            </Link>
          </Reveal>

          <div className="mb-12">
            <Reveal delay={0.05}>
              <span className="text-[var(--color-accent-dark)] text-sm font-medium tracking-widest uppercase mb-4 block">
                {project.eyebrow || project.subtitle}
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-semibold text-[var(--color-text-primary)] mb-8 leading-[1.1]">
                {project.title}
              </h1>
            </Reveal>

            {/* Extended metadata */}
            {(project.timeframe || project.objective || project.channels) && (
              <Reveal delay={0.15}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-[var(--color-bg-elevated)]/50 rounded-xl border border-[var(--color-border-subtle)]">
                  {project.timeframe && (
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] mb-1">Timeframe</p>
                      <p className="text-sm text-[var(--color-text-secondary)] font-medium">{project.timeframe}</p>
                    </div>
                  )}
                  {project.objective && (
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] mb-1">Objective</p>
                      <p className="text-sm text-[var(--color-text-secondary)] font-medium">{project.objective}</p>
                    </div>
                  )}
                  {project.channels && (
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] mb-1">Channels</p>
                      <p className="text-sm text-[var(--color-text-secondary)] font-medium">{project.channels}</p>
                    </div>
                  )}
                  {project.destination && (
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] mb-1">Destination</p>
                      <p className="text-sm text-[var(--color-text-secondary)] font-medium font-mono">{project.destination}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            )}

            {project.tools && (
              <Reveal delay={0.2}>
                <div className="mb-6">
                  <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] mb-2">Tools</p>
                  <p className="text-sm text-[var(--color-text-tertiary)]">{project.tools}</p>
                </div>
              </Reveal>
            )}

            <Reveal delay={0.25}>
              <div className="flex flex-wrap gap-3">
                {project.tags.map(tag => (
                  <span key={tag} className="text-sm text-[var(--color-text-tertiary)] bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] px-4 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal y={30}>
          <div className="w-full h-[400px] md:h-[600px] overflow-hidden bg-[var(--color-bg-elevated)] mb-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-base)] to-transparent opacity-50 z-10" />
            <motion.img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            />
          </div>
        </Reveal>

        <div className="max-w-3xl mx-auto px-6">
          {/* Key Metrics */}
          <Reveal>
            <section className="mb-24">
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.metrics.map((metric, idx) => (
                  <StaggerItem key={idx}>
                    <motion.div
                      className="bg-[var(--color-bg-elevated)]/30 border border-[var(--color-border-subtle)] p-6 rounded-2xl relative overflow-hidden group hover:border-mint-500/20 transition-colors"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mint-500 to-mint-400 opacity-30 group-hover:opacity-100 transition-opacity" />
                      <h3 className="text-[var(--color-text-muted)] text-xs font-medium mb-3 uppercase tracking-widest">{metric.label}</h3>
                      <p className="text-3xl font-semibold text-[var(--color-text-primary)]">{metric.value}</p>
                      {metric.placeholder && (
                        <div className="mt-4 inline-flex items-center px-2 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded text-[10px] text-yellow-500 font-mono tracking-tight">
                          Placeholder — update in 30 days
                        </div>
                      )}
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
              <MeasurementNote />
            </section>
          </Reveal>

          {/* Case Study Dashboard (if data available) */}
          {project.dashboardData && (
            <Reveal>
              <CaseStudyDashboard
                data={project.dashboardData}
                objective={project.objective}
                destination={project.destination}
                timeframe={project.timeframe}
              />
            </Reveal>
          )}

          {/* Content */}
          <div className="space-y-24">
            {/* Extended sections for detailed case studies */}
            {project.problem ? (
              <>
                <Reveal>
                  <div className="group">
                    <h2 className="text-2xl font-serif italic text-[var(--color-text-primary)] mb-6 opacity-80 group-hover:opacity-100 transition-opacity">Problem</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg md:text-xl font-light whitespace-pre-line">{project.problem}</p>
                  </div>
                </Reveal>

                <Reveal>
                  <div className="group">
                    <h2 className="text-2xl font-serif italic text-[var(--color-text-primary)] mb-6 opacity-80 group-hover:opacity-100 transition-opacity">Approach</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg md:text-xl font-light whitespace-pre-line">{project.approach}</p>
                  </div>
                </Reveal>

                {/* First artifact after Approach */}
                {project.artifacts && project.artifacts[0] && (
                  <Reveal>
                    <div className="my-16">
                      <ArtifactImage artifact={project.artifacts[0]} />
                    </div>
                  </Reveal>
                )}

                {project.execution && (
                  <Reveal>
                    <div className="group">
                      <h2 className="text-2xl font-serif italic text-[var(--color-text-primary)] mb-6 opacity-80 group-hover:opacity-100 transition-opacity">Execution</h2>
                      <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg md:text-xl font-light whitespace-pre-line">{project.execution}</p>
                    </div>
                  </Reveal>
                )}

                {project.reporting && (
                  <Reveal>
                    <div className="group">
                      <h2 className="text-2xl font-serif italic text-[var(--color-text-primary)] mb-6 opacity-80 group-hover:opacity-100 transition-opacity">Reporting</h2>
                      <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg md:text-xl font-light">{project.reporting}</p>
                    </div>
                  </Reveal>
                )}

                {/* Second artifact after Execution/Reporting */}
                {project.artifacts && project.artifacts[1] && (
                  <Reveal>
                    <div className="my-16">
                      <ArtifactImage artifact={project.artifacts[1]} />
                    </div>
                  </Reveal>
                )}

                <Reveal>
                  <div className="group">
                    <h2 className="text-2xl font-serif italic text-[var(--color-text-primary)] mb-6 opacity-80 group-hover:opacity-100 transition-opacity">Results</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg md:text-xl font-light whitespace-pre-line">{project.results}</p>
                  </div>
                </Reveal>

                {project.nextSteps && (
                  <Reveal>
                    <div className="group">
                      <h2 className="text-2xl font-serif italic text-[var(--color-text-primary)] mb-6 opacity-80 group-hover:opacity-100 transition-opacity">Next Steps</h2>
                      <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg md:text-xl font-light whitespace-pre-line">{project.nextSteps}</p>
                    </div>
                  </Reveal>
                )}
              </>
            ) : (
              <>
                {/* Legacy sections for existing case studies */}
                <Reveal>
                  <div className="group">
                    <h2 className="text-2xl font-serif italic text-[var(--color-text-primary)] mb-6 opacity-80 group-hover:opacity-100 transition-opacity">The Challenge</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg md:text-xl font-light">{project.challenge}</p>
                  </div>
                </Reveal>

                <Reveal>
                  <div className="group">
                    <h2 className="text-2xl font-serif italic text-[var(--color-text-primary)] mb-6 opacity-80 group-hover:opacity-100 transition-opacity">The Solution</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg md:text-xl font-light">{project.solution}</p>
                  </div>
                </Reveal>

                <Reveal>
                  <div className="group">
                    <h2 className="text-2xl font-serif italic text-[var(--color-text-primary)] mb-6 opacity-80 group-hover:opacity-100 transition-opacity">The Result</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg md:text-xl font-light">{project.result}</p>
                  </div>
                </Reveal>
              </>
            )}
          </div>
        </div>

        {/* Next Project Navigation */}
        <div className="max-w-3xl mx-auto px-6 mt-32">
          <Reveal>
            <div className="border-t border-[var(--color-border-default)] pt-12">
              <p className="text-[var(--color-text-muted)] text-sm mb-4">Next Project</p>
              <Link to={`/work/${nextProject.slug}`} className="group block">
                <motion.h3
                  className="text-3xl md:text-4xl font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  {nextProject.title}
                </motion.h3>
                <motion.div
                  className="flex items-center gap-2 text-[var(--color-text-tertiary)]"
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  <span>View Case Study</span>
                  <ArrowRight size={18} />
                </motion.div>
              </Link>
            </div>
          </Reveal>
        </div>
      </article>
    </PageTransition>
  );
};

export default WorkDetail;
