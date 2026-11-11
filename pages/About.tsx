import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EXPERIENCE } from '../constants';
import { catalog as CERTIFICATIONS } from '../components/shelf/catalog';
import { useSEO } from '../hooks/useSEO';
import { CONTAINER, BTN_PRIMARY } from '../components/layout';
import { EditorialClose } from '../components/EditorialPage';

const LINKEDIN_URL = 'https://www.linkedin.com/in/mychalolguin/';
const EMAIL_ADDRESS = 'mychalolguin@gmail.com';
const PERSONAL_VIDEO_URL = 'https://www.youtube.com/watch?v=cW9rv1iSSKc&t=20s';

const SELECTED_WORK = [
  {
    slug: 'towne-oaks-paid-social',
    title: 'Towne Oaks paid social',
    contribution: 'I ran a Meta campaign to drive renters to available floorplans and set up tracking in GA4.',
    evidence: '2,475 landing page views at $0.52 per view over three months, according to Meta Ads Manager.',
  },
  {
    slug: 'cornerstone-apartment-websites',
    title: 'Cornerstone apartment websites',
    contribution: 'I rebuilt four property websites around common renter questions, floorplan details, and clearer paths to schedule a tour.',
    evidence: 'See the page designs and the tour paths in the case study.',
  },
];

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

const WORKING_STYLE = [
  {
    title: 'Build the page',
    body: 'I care about the page people land on: copy hierarchy, mobile clarity, FAQs, floorplan paths, and clear calls to action.',
  },
  {
    title: 'Find the demand',
    body: 'Paid social, Google Ads, local SEO, answer-engine visibility, with messaging that matches what people are looking for.',
  },
  {
    title: 'Prove what moved',
    body: 'UTMs, GA4, campaign exports, and Excel reporting. I set up tracking before launch so I can see which campaigns drive the actions we care about.',
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


const About: React.FC = () => {
  useSEO({ title: 'About', description: 'Mychal Olguin is an Austin-based digital marketer open to digital marketing and growth roles. See case studies in paid media, websites, and measurement.' });
  return <div className="editorial-page">
    <header className="editorial-page-header about-intro"><div className={`${CONTAINER} about-intro-grid`}>
      <div><h1>Mychal Olguin</h1>
        <p className="editorial-body">I’m an Austin-based digital marketer and former marketing director. I build websites, run paid search and social campaigns, and set up tracking to see what drives results.</p>
        <p className="about-availability">Open to digital marketing and growth roles.</p>
        <div className="editorial-actions"><a href={`mailto:${EMAIL_ADDRESS}`} className={`${BTN_PRIMARY} editorial-button`}>Email me <ArrowUpRight size={18} aria-hidden="true" /></a><a className="editorial-link" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={18} aria-hidden="true" /></a></div>
      </div>
      <figure className="about-portrait"><img src="/images/mychal-suit-headshot.jpg" width={1536} height={1024} alt="Mychal Olguin wearing a suit and tie" /></figure>
    </div></header>
    <section className="editorial-chapter about-selected-work"><div className={CONTAINER}>
      <h2 className="chapter-title">Selected work</h2>
      <div className="about-proof-grid">
        {SELECTED_WORK.map(project => (
          <article key={project.slug} className="work-card-copy">
            <h3>{project.title}</h3>
            <p className="work-card-contribution">{project.contribution}</p>
            <p className="work-card-evidence">{project.evidence}</p>
            <Link className="editorial-link" to={`/work/${project.slug}`}>
              Read case study <span className="sr-only">for {project.title}</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </div></section>
    <section className="editorial-chapter about-selected-work">
      <div className={`${CONTAINER} about-record`}>
        <h2 className="chapter-title">I make videos for fun, too.</h2>
        <div className="work-card-copy">
          <p className="editorial-body">
            I love making videos out of whatever I’m up to. A date night in Austin turned into a short vlog with a robotaxi ride and two stops for pizza.
          </p>
          <a className="editorial-link" href={PERSONAL_VIDEO_URL} target="_blank" rel="noopener noreferrer">
            Watch “date night” on YouTube <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
    <section className="editorial-chapter"><div className={`${CONTAINER} about-record`}>
      <div><h2 className="chapter-title">Experience.</h2></div>
      <div className="experience-list">{EXPERIENCE.map((job, index) => <article key={`${job.company}-${index}`}><p className="editorial-eyebrow">{job.period}</p><h3>{job.role}</h3><p className="experience-company">{job.company}</p><ul>{job.description.map(desc => <li key={desc}>{desc}</li>)}</ul></article>)}</div>
    </div></section>
    <section className="editorial-chapter editorial-dark"><div className={CONTAINER}>
      <h2 className="chapter-title">How I work.</h2>
      <div className="about-method">{WORKING_STYLE.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
    </div></section>
    <section className="editorial-chapter about-learning"><div className={CONTAINER}>
      <h2 className="chapter-title">Education and tools.</h2>
      <div className="about-learning-grid"><div><h3>Education</h3><div className="education-list">{EDUCATION.map(edu => <article key={edu.degree}><p className="editorial-eyebrow">{edu.period}</p><h4>{edu.degree}</h4><p>{edu.school}</p></article>)}</div></div>
      <div><h3>Tools I work with</h3><p className="tools-list">{TOOLS.join(' · ')}</p></div></div>
      <details className="credential-list"><summary>Certifications <span>{CERTIFICATIONS.length} credentials</span></summary><div>{CERTIFICATIONS.map(cert => <article key={cert.id}><h4>{cert.title}</h4><p>{cert.author} · {cert.format}</p></article>)}</div></details>
    </div></section>
    <EditorialClose />
  </div>;
};
export default About;
