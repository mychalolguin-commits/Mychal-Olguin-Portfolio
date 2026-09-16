import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { EXPERIENCE } from '../constants';
import { catalog as CERTIFICATIONS } from '../components/shelf/catalog';
import { useSEO } from '../hooks/useSEO';
import { CONTAINER, BTN_PRIMARY } from '../components/layout';
import { EditorialClose } from '../components/EditorialPage';

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


const About: React.FC = () => {
  useSEO({ title: 'About', description: 'Meet Mychal Olguin, an Austin-based digital marketer working across websites, paid media, search, and measurement.' });
  return <div className="editorial-page">
    <header className="editorial-page-header about-intro"><div className={`${CONTAINER} about-intro-grid`}>
      <div><p className="editorial-eyebrow">About Mychal</p><h1>Curious mind.<br />Hands-on work.</h1>
        <p className="editorial-body">I’m a digital marketer in Austin, Texas. I build websites, run paid media, and connect the work to its results.</p>
        <div className="editorial-actions"><a href={`mailto:${EMAIL_ADDRESS}`} className={`${BTN_PRIMARY} editorial-button`}>Email me <ArrowUpRight size={18} aria-hidden="true" /></a><a className="editorial-link" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={18} aria-hidden="true" /></a></div>
      </div>
      <figure className="about-portrait"><img src="/images/mychal-suit-headshot.jpg" width={1536} height={1024} alt="Mychal Olguin wearing a suit and tie" /><figcaption>Austin, Texas · Open to growth roles</figcaption></figure>
    </div></header>
    <section className="editorial-chapter editorial-dark"><div className={CONTAINER}>
      <p className="editorial-eyebrow">How I work</p><h2 className="chapter-title">From the page<br />to the bigger picture.</h2>
      <div className="about-method">{WORKING_STYLE.map((item, index) => <article key={item.title}><span className="editorial-eyebrow">0{index + 1}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
    </div></section>
    <section className="editorial-chapter"><div className={`${CONTAINER} about-record`}>
      <div><p className="editorial-eyebrow">Experience</p><h2 className="chapter-title">Built through<br />real work.</h2></div>
      <div className="experience-list">{EXPERIENCE.map((job, index) => <article key={`${job.company}-${index}`}><p className="editorial-eyebrow">{job.period}</p><h3>{job.role}</h3><p className="experience-company">{job.company}</p><ul>{job.description.map(desc => <li key={desc}>{desc}</li>)}</ul></article>)}</div>
    </div></section>
    <section className="editorial-chapter about-learning"><div className={CONTAINER}>
      <p className="editorial-eyebrow">Always learning</p><h2 className="chapter-title">A foundation to build on.</h2>
      <div className="about-learning-grid"><div><h3>Education</h3><div className="education-list">{EDUCATION.map(edu => <article key={edu.degree}><p className="editorial-eyebrow">{edu.period}</p><h4>{edu.degree}</h4><p>{edu.school}</p></article>)}</div></div>
      <div><h3>Tools I work with</h3><p className="tools-list">{TOOLS.join(' · ')}</p></div></div>
      <details className="credential-list"><summary>Certifications <span>{CERTIFICATIONS.length} credentials</span></summary><div>{CERTIFICATIONS.map(cert => <article key={cert.id}><h4>{cert.title}</h4><p>{cert.author} · {cert.format}</p></article>)}</div></details>
    </div></section>
    <EditorialClose />
  </div>;
};
export default About;
