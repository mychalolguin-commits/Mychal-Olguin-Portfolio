import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { EXPERIENCE } from '../constants';
import { catalog as CERTIFICATIONS } from '../components/shelf/catalog';
import { useSEO } from '../hooks/useSEO';
import { CONTAINER, BTN_PRIMARY, BTN_SECONDARY } from '../components/layout';

const RESUME_PDF_PATH = '/Mychal_Olguin_Resume.pdf';
const LINKEDIN_URL = 'https://www.linkedin.com/in/mychalolguin/';
const EMAIL_ADDRESS = 'mychalolguin@gmail.com';

const EDUCATION = [
  {
    degree: 'Master of Science in Marketing',
    school: 'The University of Texas Rio Grande Valley',
    period: '2026',
  },
  {
    degree: 'Bachelor of Arts in Communication',
    school: 'The University of Texas San Antonio',
    period: '2023',
  },
];

const SKILLS = {
  'Strategy & Analytics': [
    'Local SEO',
    'On-Page SEO',
    'Google Business Profile',
    'UTM Tracking',
    'CTR/CPL Reporting',
  ],
  'Creative & Web': [
    'Website Copy Updates',
    'Mobile UX',
    'CTA Best Practices',
    'Content Development',
    'Basic HTML',
  ],
  Platforms: [
    'Meta Ads Manager',
    'Google Ads',
    'Google Analytics',
    'Meta Business Suite',
    'Excel',
    'Canva',
    'Claude',
  ],
  'Media Production': [
    'Photography',
    'Video',
    '360 Tours',
    'Social Posting',
    'Photoshop',
    'Premiere Pro',
  ],
};

/** Section head: a label and a count, ruled off from the content below it. */
const SectionHead: React.FC<{ title: string; meta?: string }> = ({ title, meta }) => (
  <div className="flex flex-wrap items-baseline justify-between gap-2">
    <h2 className="display text-2xl md:text-3xl text-[var(--ink)]">{title}</h2>
    {meta && <span className="label">{meta}</span>}
  </div>
);

const Resume: React.FC = () => {
  useSEO({
    title: 'Resume',
    description:
      'The resume of Mychal Olguin, a digital marketer working across web design, SEO and answer-engine optimization, paid media, and analytics.',
  });

  const [pdfExists, setPdfExists] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(RESUME_PDF_PATH, { method: 'HEAD' })
      .then((res) => setPdfExists(res.ok))
      .catch(() => setPdfExists(false));
  }, []);

  return (
    <>
      {/* ── Masthead ──────────────────────────────────────────────────── */}
      <section className="pt-36 md:pt-52 pb-20 md:pb-28">
        <div className={CONTAINER}>
          <Reveal>
            <h1 className="label">Resume</h1>
            <h2 className="display text-[2.25rem] sm:text-5xl lg:text-6xl text-[var(--ink)] mt-5 max-w-[16ch]">
              Three years of running marketing.
            </h2>
            <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-[var(--color-text-tertiary)]">
              Websites, paid media, local search, and the measurement under all of it — across a
              14-property multifamily portfolio.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9 flex flex-wrap gap-3 sm:gap-4">
              <a href={RESUME_PDF_PATH} download="Mychal_Olguin_Resume.pdf" className={BTN_PRIMARY}>
                <Download size={16} />
                Download PDF
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={BTN_SECONDARY}
              >
                LinkedIn
              </a>
              <a href={`mailto:${EMAIL_ADDRESS}`} className={BTN_SECONDARY}>
                Email me
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PDF preview ───────────────────────────────────────────────── */}
      <section className="pb-28 md:pb-40">
        <div className={CONTAINER}>
          <Reveal>
            {pdfExists === null ? (
              <div
                className="w-full border border-[var(--rule)] bg-[var(--color-bg-elevated)] flex items-center justify-center"
                style={{ aspectRatio: '8.5 / 11' }}
              >
                <p className="label">Loading preview</p>
              </div>
            ) : pdfExists ? (
              <div
                className="w-full border border-[var(--rule)] overflow-hidden bg-white"
                style={{ aspectRatio: '8.5 / 11' }}
              >
                <object
                  data={`${RESUME_PDF_PATH}#view=FitH&toolbar=0`}
                  type="application/pdf"
                  className="w-full h-full"
                >
                  <iframe
                    src={`${RESUME_PDF_PATH}#view=FitH&toolbar=0`}
                    title="Resume PDF preview"
                    className="w-full h-full"
                  />
                </object>
              </div>
            ) : (
              /* If the file is ever missing, a visitor gets a way forward —
                 not a note addressed to whoever builds the site. */
              <div className="w-full border border-[var(--rule)] p-10 md:p-14 text-center">
                <h3 className="display text-xl text-[var(--ink)]">
                  The inline preview isn't available right now.
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-text-tertiary)] max-w-[46ch] mx-auto">
                  The full history is on this page below, and I'll send the PDF straight over if you
                  ask.
                </p>
                <a href={`mailto:${EMAIL_ADDRESS}`} className={`${BTN_PRIMARY} mt-7`}>
                  Request the PDF
                </a>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ── Experience ────────────────────────────────────────────────── */}
      <section className="py-28 md:py-40">
        <div className={CONTAINER}>
          <Reveal>
            <SectionHead title="Experience" />
          </Reveal>

          <div className="mt-10 md:mt-14">
            {EXPERIENCE.map((job, idx) => (
              <Reveal key={`${job.company}-${idx}`}>
                <article className="border-t border-[var(--rule)] py-8 md:py-10 grid md:grid-cols-[13rem_1fr] gap-3 md:gap-10">
                  <div className="label md:pt-1.5">{job.period}</div>
                  <div>
                    <h3 className="display text-xl md:text-2xl text-[var(--ink)]">
                      {job.role}
                    </h3>
                    <p className="mt-1.5 text-[15px] text-[var(--color-text-secondary)]">
                      {job.company}
                    </p>
                    <ul className="mt-5 space-y-2.5 max-w-[64ch]">
                      {job.description.map((desc, i) => (
                        <li
                          key={i}
                          className="relative pl-5 text-[15px] leading-relaxed text-[var(--color-text-tertiary)] before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-[var(--rule)]"
                        >
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
            <div className="border-t border-[var(--rule)]" />
          </div>
        </div>
      </section>

      {/* ── Education ─────────────────────────────────────────────────── */}
      <section className="py-28 md:py-40 bg-[var(--surface-sunken)]">
        <div className={CONTAINER}>
          <Reveal>
            <SectionHead title="Education" />
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-10 md:mt-12">
              {EDUCATION.map((edu) => (
                <div
                  key={edu.degree}
                  className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-[var(--rule)] py-5 transition-colors duration-150 hover:bg-[var(--surfaceHover)]"
                >
                  <div>
                    <dt className="text-[17px] font-medium text-[var(--ink)]">{edu.degree}</dt>
                    <dd className="mt-1 text-[15px] text-[var(--color-text-tertiary)]">
                      {edu.school}
                    </dd>
                  </div>
                  <span className="figure label">{edu.period}</span>
                </div>
              ))}
              <div className="border-t border-[var(--rule)]" />
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ── Certifications ────────────────────────────────────────────── */}
      <section className="py-28 md:py-40">
        <div className={CONTAINER}>
          <Reveal>
            <SectionHead title="Certifications" meta={`${CERTIFICATIONS.length} credentials`} />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 md:mt-12 grid sm:grid-cols-2 gap-x-14">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.id}
                  className="flex gap-4 border-t border-[var(--rule)] py-5 transition-colors duration-150 hover:bg-[var(--surfaceHover)]"
                >
                  {/* Echoes the spine color of this credential on the homepage
                      shelf, so the list and the 3D shelf read as one set. */}
                  <span
                    aria-hidden="true"
                    className="w-[3px] shrink-0"
                    style={{ backgroundColor: cert.cover }}
                  />
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-medium leading-snug text-[var(--ink)]">
                      {cert.title}
                    </h3>
                    <p className="mt-1 text-[14px] text-[var(--color-text-tertiary)]">
                      {cert.author}
                    </p>
                    <p className="label mt-1.5">{cert.format}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-[var(--rule)]" />
          </Reveal>
        </div>
      </section>

      {/* ── Skills ────────────────────────────────────────────────────── */}
      <section className="py-28 md:py-40">
        <div className={CONTAINER}>
          <Reveal>
            <SectionHead title="Skills" />
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-10 md:mt-12">
              {Object.entries(SKILLS).map(([category, skills]) => (
                <div
                  key={category}
                  className="grid md:grid-cols-[13rem_1fr] gap-1.5 md:gap-10 border-t border-[var(--rule)] py-5 transition-colors duration-150 hover:bg-[var(--surfaceHover)]"
                >
                  <dt className="label md:pt-1">{category}</dt>
                  <dd className="text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
                    {skills.join(' · ')}
                  </dd>
                </div>
              ))}
              <div className="border-t border-[var(--rule)]" />
            </dl>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Resume;
