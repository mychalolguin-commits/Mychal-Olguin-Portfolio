import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { EXPERIENCE } from '../constants';
import { catalog as CERTIFICATIONS } from '../components/shelf/catalog';
import { useSEO } from '../hooks/useSEO';
import { CONTAINER, BTN_PRIMARY, BTN_SECONDARY } from '../components/layout';

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

const PROOF = [
  {
    label: 'Portfolio',
    value: '14 properties',
    detail: 'Multifamily marketing across web, search, paid media, and reporting.',
  },
  {
    label: 'Paid social',
    value: '$0.52 LPV',
    detail: 'Towne Oaks floorplan campaign tracked through Meta, UTMs, and GA4.',
  },
  {
    label: 'Search',
    value: '+20% organic',
    detail: 'SEO and AEO work across property pages, FAQs, metadata, and local profiles.',
  },
  {
    label: 'AI search',
    value: '3 properties',
    detail: 'Client properties surfaced in ChatGPT answers from owned content and public web data.',
  },
];

const WORKING_STYLE = [
  {
    title: 'Build the page',
    body: 'I care about the page people land on: copy hierarchy, mobile clarity, FAQs, floorplan paths, and CTAs that do not make renters think too hard.',
  },
  {
    title: 'Find the demand',
    body: 'Paid social, Google Ads, local SEO, answer-engine visibility, and the useful work of matching the message to the searcher.',
  },
  {
    title: 'Prove what moved',
    body: 'UTMs, GA4, campaign exports, and Excel reporting. I like claims better when the source is visible.',
  },
];

const TOOLS = [
  'Meta Ads Manager',
  'Google Ads',
  'GA4',
  'Google Business Profile',
  'Search Console',
  'Excel',
  'Yardi RentCafe',
  'Shopify',
  'Squarespace',
  'Canva',
  'Photoshop',
  'Premiere Pro',
  'Claude',
  'ChatGPT',
];

const SectionHead: React.FC<{ title: string; meta?: string }> = ({ title, meta }) => (
  <div className="flex flex-wrap items-baseline justify-between gap-2">
    <h2 className="display text-2xl md:text-3xl text-[var(--ink)]">{title}</h2>
    {meta && <span className="label">{meta}</span>}
  </div>
);

const About: React.FC = () => {
  useSEO({
    title: 'About',
    description:
      'About Mychal Olguin, a digital marketer working across websites, paid media, SEO, answer-engine optimization, and measurement.',
  });

  return (
    <>
      <section className="pt-36 md:pt-52 pb-24 md:pb-32">
        <div className={CONTAINER}>
          <div className="grid lg:grid-cols-[1fr_22rem] gap-12 lg:gap-16 items-start">
            <Reveal>
              <h1 className="label">About</h1>
              <h2 className="display text-[2.25rem] sm:text-5xl lg:text-6xl text-[var(--ink)] mt-5 max-w-[17ch]">
                I build marketing work that can be inspected.
              </h2>
              <p className="mt-7 max-w-[55ch] text-lg leading-relaxed text-[var(--color-text-tertiary)]">
                I am a digital marketer in Texas working across websites, paid media, SEO, AI
                search, and analytics. The throughline is simple: make the page clearer, get the
                right people to it, and show the measurement behind the result.
              </p>
              <div className="mt-10 flex flex-wrap gap-3 sm:gap-4">
                <a href={`mailto:${EMAIL_ADDRESS}`} className={BTN_PRIMARY}>
                  <Mail size={16} />
                  Email me
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={BTN_SECONDARY}
                >
                  LinkedIn
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <aside className="border border-[var(--rule)] bg-[var(--color-bg-elevated)] p-6">
                <p className="label">Current shape</p>
                <p className="mt-5 display text-2xl text-[var(--ink)]">
                  Marketing operator, website builder, measurement person.
                </p>
                <dl className="mt-8 space-y-4 border-t border-[var(--rule)] pt-5">
                  <div className="flex items-baseline justify-between gap-5">
                    <dt className="label">Based</dt>
                    <dd className="text-[15px] text-[var(--ink)]">Texas</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-5">
                    <dt className="label">Focus</dt>
                    <dd className="text-[15px] text-right text-[var(--ink)]">
                      Growth marketing
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-5">
                    <dt className="label">Proof</dt>
                    <dd className="text-[15px] text-right text-[var(--ink)]">
                      Case studies first
                    </dd>
                  </div>
                </dl>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[var(--surface-sunken)]">
        <div className={CONTAINER}>
          <Reveal>
            <SectionHead title="How I Work" />
          </Reveal>

          <div className="mt-10 grid md:grid-cols-3 gap-px border border-[var(--rule)] bg-[var(--rule)]">
            {WORKING_STYLE.map((item, index) => (
              <Reveal key={item.title} delay={0.05 * index}>
                <article className="h-full bg-[var(--color-bg-base)] p-6 md:p-7">
                  <p className="figure label">0{index + 1}</p>
                  <h3 className="mt-8 display text-xl text-[var(--ink)]">{item.title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-text-tertiary)]">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 md:py-40">
        <div className={CONTAINER}>
          <Reveal>
            <SectionHead title="Proof Points" meta="selected signals" />
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-10 grid sm:grid-cols-2 gap-px border border-[var(--rule)] bg-[var(--rule)]">
              {PROOF.map((item) => (
                <div key={item.label} className="bg-[var(--color-bg-base)] p-6 md:p-7">
                  <dt className="label">{item.label}</dt>
                  <dd className="mt-4 display text-3xl text-[var(--ink)]">{item.value}</dd>
                  <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-text-tertiary)]">
                    {item.detail}
                  </p>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="py-28 md:py-40 bg-[var(--surface-sunken)]">
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
                      {job.description.map((desc) => (
                        <li
                          key={desc}
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

      <section className="py-28 md:py-40">
        <div className={CONTAINER}>
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16">
            <div>
              <Reveal>
                <SectionHead title="Education" />
              </Reveal>

              <Reveal delay={0.1}>
                <dl className="mt-10">
                  {EDUCATION.map((edu) => (
                    <div
                      key={edu.degree}
                      className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-[var(--rule)] py-5 transition-colors duration-150 hover:bg-[var(--surfaceHover)]"
                    >
                      <div>
                        <dt className="text-[17px] font-medium text-[var(--ink)]">
                          {edu.degree}
                        </dt>
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

            <div>
              <Reveal>
                <SectionHead title="Tools" meta={`${TOOLS.length} in rotation`} />
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-10 flex flex-wrap gap-2">
                  {TOOLS.map((tool) => (
                    <span
                      key={tool}
                      className="label border border-[var(--rule)] bg-[var(--color-bg-elevated)] px-3 py-2"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 md:py-40 bg-[var(--surface-sunken)]">
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
    </>
  );
};

export default About;
