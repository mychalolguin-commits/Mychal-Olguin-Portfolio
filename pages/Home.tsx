import React from 'react';
import { ArrowRight, ArrowUpRight, Linkedin, Download, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Reveal, StaggerContainer, StaggerItem } from '../components/Reveal';
import MediaTile from '../components/MediaTile';
import { PROJECTS } from '../constants';

const Home: React.FC = () => {
  const [mousePos, setMousePos] = React.useState({ x: 50, y: 50 });
  const heroRef = React.useRef<HTMLElement>(null);
  const prefersReducedMotion = React.useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  const capabilities = [
    {
      title: 'Paid Social & Growth',
      description: 'Plan, launch, and optimize campaigns with disciplined testing and budget control.',
      chips: ['Meta Ads Manager', 'Creative Testing', 'Budget Pacing']
    },
    {
      title: 'Measurement & Attribution',
      description: 'Build clean tracking so performance ties to real behaviors.',
      chips: ['GA4', 'UTMs', 'Event Tracking', 'CAPI']
    },
    {
      title: 'SEO & Web',
      description: 'Design + optimize pages that rank locally and guide users to conversion.',
      chips: ['SEO', 'HTML', 'On-Page', 'CRO']
    },
    {
      title: 'Dashboards & Insights',
      description: 'Reporting that turns channel metrics into decisions and next steps.',
      chips: ['Excel', 'Tableau', 'Data Viz', 'KPIs']
    },
    {
      title: 'Creative Strategy',
      description: 'Use performance learnings to iterate creative, hooks, and messaging fast.',
      chips: ['A/B Testing', 'Ad Creative', 'Hooks', 'Iteration']
    },
    {
      title: 'Local Search & Reputation',
      description: 'Improve high-intent visibility through profile optimization + review strategy.',
      chips: ['Google Business', 'Reviews', 'Local SEO', 'Maps']
    }
  ];

  return (
    <PageTransition>
      <style>{`
        .hero-section { position: relative; overflow: hidden; background-color: var(--color-bg-base); }
        .hero-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }

        /* Work card theme-aware hover */
        .work-card {
          transition: transform 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease;
        }
        .work-card:hover {
          border-color: var(--borderGlow);
          box-shadow: var(--cardLift);
          transform: translateY(-2px);
        }
        .work-card-title {
          transition: color 0.3s ease;
        }
        .work-card:hover .work-card-title {
          color: var(--textHover);
        }

        /* Premium subtle orbs */
        .hero-orb {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(80px);
          opacity: calc(0.35 * var(--color-orb-opacity));
          animation: orbFloat1 20s ease-in-out infinite;
        }
        .hero-orb-1 {
          top: -10%;
          left: 10%;
          background: radial-gradient(circle, rgba(74,222,128,0.5) 0%, rgba(74,222,128,0.15) 40%, transparent 70%);
        }
        .hero-orb-2 {
          top: 20%;
          right: -5%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(52,211,153,0.4) 0%, rgba(52,211,153,0.1) 45%, transparent 70%);
          animation: orbFloat2 25s ease-in-out infinite;
          opacity: calc(0.25 * var(--color-orb-opacity));
        }
        .hero-orb-3 {
          bottom: -20%;
          left: 30%;
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, rgba(16,185,129,0.35) 0%, rgba(16,185,129,0.08) 50%, transparent 70%);
          animation: orbFloat3 18s ease-in-out infinite;
          opacity: calc(0.3 * var(--color-orb-opacity));
        }

        /* Dark vignette on edges */
        .hero-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, var(--color-bg-base) 100%);
          pointer-events: none;
          opacity: 0.6;
        }

        /* Subtle noise overlay */
        .hero-noise {
          position: absolute;
          inset: 0;
          opacity: var(--noiseOpacity);
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 150px 150px;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(15px, -10px) scale(1.02); }
          66% { transform: translate(-10px, 8px) scale(0.98); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 15px) scale(1.03); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(12px, -8px) scale(1.01); }
          80% { transform: translate(-8px, 12px) scale(0.99); }
        }

        /* Cursor-following spotlight glow */
        .hero-spotlight {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle 600px at var(--mx, 50%) var(--my, 50%),
            var(--glow) 0%,
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 1;
        }

        .hero-section:hover .hero-spotlight {
          opacity: 1;
        }

        /* Subtle grid texture */
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--color-text-muted) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-text-muted) 1px, transparent 1px);
          background-size: 60px 60px;
          opacity: var(--gridOpacity);
          pointer-events: none;
          z-index: 0;
        }

        /* Signal strip fade-slide animation */
        .signal-strip {
          animation: signalFadeIn 0.3s ease-out 0.1s both;
        }

        @keyframes signalFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-orb { animation: none; }
          .hero-spotlight {
            background: radial-gradient(
              circle 600px at 50% 40%,
              var(--glow) 0%,
              transparent 60%
            );
            opacity: 0.5;
          }
          .hero-section:hover .hero-spotlight {
            opacity: 0.5;
          }
          .signal-strip {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="hero-section pt-32 pb-20 md:pt-48 md:pb-32"
        onMouseMove={handleMouseMove}
        style={{
          '--mx': `${mousePos.x}%`,
          '--my': `${mousePos.y}%`,
        } as React.CSSProperties}
      >
        {/* Background Layer */}
        <div aria-hidden="true" className="hero-bg">
          <div className="hero-grid" />
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
          <div className="hero-spotlight" />
          <div className="hero-vignette" />
          <div className="hero-noise" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-6"
          >
            <div className="relative inline-block">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] rounded-full overflow-hidden border-2 border-[var(--color-border-default)] shadow-lg">
                <img
                  src="/images/mychal-headshot.png"
                  alt="Mychal Olguin headshot"
                  className="w-full h-full object-cover scale-[1.3] object-[center_20%]"
                />
              </div>
              {/* Subtle glow ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-mint-500/20 to-mint-400/10 blur-sm -z-10" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-mint-500/20 bg-mint-500/5 backdrop-blur-sm shadow-[0_0_15px_rgba(34,197,94,0.1)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-mint-500"></span>
            </span>
            <span className="text-mint-400 text-xs tracking-wide uppercase font-medium">Open to Roles</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-[var(--color-text-primary)] mb-8 leading-[1.05] drop-shadow-2xl"
          >
            Growth marketer with a <span className="font-serif italic font-light text-[var(--color-text-secondary)]">measurement obsession</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-[var(--color-text-tertiary)] max-w-2xl leading-relaxed font-light mb-12"
          >
            I specialize in paid social acquisition and full-funnel analytics. Currently seeking my next role where I can drive efficient growth and build reporting systems that actually get used.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/work"
                className="group inline-flex items-center gap-2 bg-[var(--color-text-primary)] text-[var(--color-bg-base)] px-8 py-4 rounded-full font-medium hover:bg-mint-400 transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(74,222,128,0.4)]"
              >
                View Selected Work
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/resume"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-[var(--color-text-primary)] border border-[var(--color-border-default)] hover:border-mint-400/50 hover:bg-[var(--color-border-subtle)] transition-all duration-300"
              >
                <Download size={18} />
                Download Resume
              </Link>
            </motion.div>

            <motion.a
              href="https://www.linkedin.com/in/mychalolguin/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors px-4 py-2"
              whileHover={{ x: 2 }}
            >
              <Linkedin size={18} />
              <span className="underline underline-offset-4 decoration-[var(--color-text-muted)] hover:decoration-mint-400">LinkedIn</span>
            </motion.a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="mt-8 text-xs text-[var(--color-text-muted)] tracking-wide"
          >
            Paid Social · GA4 · SEO · Web Design
          </motion.p>
        </div>
      </section>

      {/* Selected Work Preview */}
      <section className="py-24 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-muted)] wash-section relative">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-3xl font-semibold text-[var(--color-text-primary)] mb-2">Selected Work</h2>
                <p className="text-[var(--color-text-muted)]">Recent campaigns and system architecture.</p>
              </div>
              <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <Link to="/work" className="hidden md:flex items-center gap-2 text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors">
                  View all projects <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </Reveal>

          <StaggerContainer className="grid gap-12">
            {PROJECTS.filter(p => ['towne-oaks-paid-social', 'borders-seo-conversion'].includes(p.slug)).map((project) => (
              <StaggerItem key={project.slug}>
                <Link to={`/work/${project.slug}`} className="group block">
                  <motion.div
                    className="work-card relative overflow-hidden rounded-3xl bg-[var(--color-bg-elevated)] border border-[var(--card-border)] shadow-[var(--shadow-card)]"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                  >
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="h-52 sm:h-56 md:h-auto md:min-h-[320px] relative overflow-hidden">
                        <MediaTile
                          type={project.mediaType}
                          media={project.media}
                          className="w-full h-full opacity-80 group-hover:opacity-100 transition-all duration-700"
                        />
                      </div>
                      <div className="p-8 md:p-12 flex flex-col justify-center relative bg-gradient-to-b from-[var(--color-bg-elevated)] to-[var(--color-bg-base)]">
                        <motion.div
                          className="absolute top-8 right-8 opacity-0 group-hover:opacity-100"
                          initial={{ y: -8, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                        >
                          <ArrowUpRight className="text-[var(--color-accent)]" />
                        </motion.div>
                        <span className="text-[var(--color-accent-dark)] text-xs font-medium tracking-widest uppercase mb-4">{project.subtitle}</span>
                        <h3 className="work-card-title text-2xl md:text-3xl font-semibold text-[var(--color-text-primary)] mb-4">{project.title}</h3>
                        <p className="text-[var(--color-text-tertiary)] leading-relaxed mb-8">{project.description}</p>

                        <div className="flex flex-wrap gap-8 border-t border-[var(--color-border-subtle)] pt-6 mt-auto">
                          {project.metrics.slice(0, 3).map((metric, i) => (
                            <div key={i}>
                              <div className="text-xl font-semibold text-[var(--color-text-primary)]">{metric.value}</div>
                              <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide mt-1">{metric.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <Reveal delay={0.2}>
            <div className="mt-12 md:hidden">
              <Link to="/work" className="flex items-center gap-2 text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors">
                View all projects <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 wash-section relative">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="mb-12">
              <h2 className="text-3xl font-semibold text-[var(--color-text-primary)] mb-4">Capabilities</h2>
              <p className="text-[var(--color-text-tertiary)] max-w-2xl text-lg leading-relaxed">
                Full-stack growth marketing—from campaign strategy to measurement infrastructure to the reporting that makes it actionable.
              </p>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  className="group relative p-6 rounded-2xl bg-[var(--color-bg-elevated)] border border-[var(--card-border)] shadow-[var(--shadow-card)] hover:border-[var(--card-border-hover)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 overflow-hidden"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">{cap.title}</h3>
                  <p className="text-sm text-[var(--color-text-tertiary)] leading-relaxed mb-4">
                    {cap.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cap.chips.map(chip => (
                      <span key={chip} className="px-2 py-1 text-[10px] rounded-md bg-[var(--color-bg-muted)] border border-[var(--card-border)] text-[var(--color-text-muted)]">
                        {chip}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 border-t border-[var(--color-border-subtle)] wash-cta relative">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-[var(--color-border-default)] shadow-lg">
                  <img
                    src="/images/mychal-headshot.png"
                    alt="Mychal Olguin headshot"
                    className="w-full h-full object-cover scale-[1.3] object-[center_20%]"
                  />
                </div>
                {/* Subtle glow ring */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-mint-500/20 to-mint-400/10 blur-sm -z-10" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-4xl md:text-5xl font-semibold text-[var(--color-text-primary)] mb-6">Let's connect.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[var(--color-text-tertiary)] text-lg mb-10">
              I'm exploring Paid Social / Growth Marketing roles. If you're hiring, I'd love to talk.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="mailto:mychalolguin@gmail.com"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[var(--color-text-primary)] text-[var(--color-bg-base)] px-8 py-4 rounded-full font-medium hover:bg-mint-400 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail size={18} />
                Email Me
              </motion.a>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/resume"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-[var(--color-text-primary)] border border-[var(--color-border-default)] hover:border-mint-400/50 hover:bg-[var(--color-border-subtle)] transition-all duration-300"
                >
                  <Download size={18} />
                  Download Resume
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
