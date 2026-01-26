import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Reveal, StaggerContainer, StaggerItem } from '../components/Reveal';
import MediaTile from '../components/MediaTile';
import { PROJECTS } from '../constants';
import { ArrowUpRight } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

const Work: React.FC = () => {
  useSEO({
    title: 'Work',
    description: 'Case studies in growth marketing, paid social campaigns, SEO optimization, and analytics systems by Mychal Olguin.'
  });

  return (
    <PageTransition>
      <div className="pt-32 pb-20 max-w-4xl lg:max-w-6xl mx-auto px-6 lg:px-10 xl:px-16 wash-section">
        <Reveal>
          <h1 className="text-4xl font-semibold text-[var(--color-text-primary)] mb-6">Work</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[var(--color-text-tertiary)] max-w-xl mb-16 leading-relaxed">
            A selection of projects focusing on growth architecture, paid acquisition, and analytics systems.
          </p>
        </Reveal>

        <StaggerContainer className="grid gap-12">
          {PROJECTS.map((project) => (
            <StaggerItem key={project.slug}>
              <Link
                to={`/work/${project.slug}`}
                className="group relative block"
              >
                <motion.div
                  className="absolute -inset-4 rounded-3xl bg-[var(--color-border-subtle)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <motion.div
                    className="aspect-video md:aspect-auto md:min-h-[280px] rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--card-border)] shadow-[var(--shadow-card)] relative group-hover:border-[var(--card-border-hover)] group-hover:shadow-[var(--shadow-card-hover)] transition-all duration-300"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                  >
                    <MediaTile
                      type={project.mediaType}
                      media={project.media}
                      className="w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  </motion.div>
                  <div className="py-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[var(--color-accent)] text-xs font-medium tracking-wider uppercase">{project.subtitle}</span>
                      <motion.div
                        whileHover={{ x: 2, y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowUpRight className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors" size={20} />
                      </motion.div>
                    </div>
                    <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-3 group-hover:text-mint-300 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-[var(--color-text-tertiary)] text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-muted)] border border-[var(--card-border)] px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </PageTransition>
  );
};

export default Work;
