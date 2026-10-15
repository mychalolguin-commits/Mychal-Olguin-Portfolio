import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, SOCIAL_CREATIVE } from '../constants';
import { useSEO } from '../hooks/useSEO';
import { CONTAINER, LINK_UNDERLINE } from '../components/layout';
import { EditorialHeader, EditorialClose } from '../components/EditorialPage';

// The index names the work plainly; the case studies carry the full story and sources.
const presentations = [
  {
    slug: 'escapades-coaching',
    category: 'Content · video · website',
    title: 'Bilingual coaching videos and website',
    client: 'Escapades Coaching',
    contribution: 'Edited ten short concepts in both English and Spanish, planned the rollout, and built a path from the videos to a coaching call.',
    evidence: 'YouTube talk live · Website awaiting approval · Shorts finished, unpublished',
    image: '/captures/escapades/self-care-thumbnail.webp',
    alt: 'Escapades Coaching self-care video thumbnail reading Time to Reset?',
    kind: 'video',
  },
  {
    slug: 'borders-organic-social',
    category: 'Organic social · video',
    title: 'Reels for an apartment fitness-center launch',
    client: 'Borders Apartments',
    contribution: 'Filmed and edited an installation timelapse, a teaser, and seasonal content for the property’s social channels.',
    evidence: 'Installation reel: 1,783 views · Instagram screenshot',
    image: '/captures/borders-fitness-reel-views.png',
    alt: 'Screenshots of the published Borders Apartments fitness-center reels and their view counts',
    kind: 'reels',
  },
  {
    slug: 'cornerstone-apartment-websites',
    category: 'Web design · search',
    title: 'Four apartment websites rebuilt',
    client: 'Cornerstone Capital',
    contribution: 'Rebuilt property sites around renter questions, floorplan details, and clearer paths to schedule a tour.',
    evidence: 'Four sites rebuilt · Two property-owned pages later cited by ChatGPT',
    image: '/captures/borders-site.png',
    alt: 'Borders Apartments website, one of four rebuilt property websites',
    kind: 'website',
  },
  {
    slug: 'towne-oaks-paid-social',
    category: 'Paid social · measurement',
    title: 'Meta ads for floorplan traffic',
    client: 'Towne Oaks',
    contribution: 'Ran a traffic campaign to available floorplans and connected ad links to GA4 reporting.',
    evidence: '2,475 landing page views · $0.52 per view · Meta Ads Manager',
    kind: 'metric',
  },
  {
    slug: 'ire-junk-removal-website',
    category: 'Website · local services',
    title: 'A first website for a junk-removal business',
    client: 'IRE Junk Removal',
    contribution: 'Built service pages and a simple quote path so local customers could understand the offer and get in touch.',
    evidence: 'Live website · Quote request flow',
    image: '/captures/ire-homepage.png',
    alt: 'IRE Junk Removal homepage with service headline and quote call to action',
    kind: 'website',
  },
  {
    slug: '392chulo-organic-video',
    category: 'Organic social · video',
    title: 'Car-culture videos for Instagram',
    client: '392chulo',
    contribution: 'Created and published a self-directed stream of car-culture videos, then tracked account and post performance.',
    evidence: 'Self-directed account · Instagram insights, Jan 2023–Oct 1, 2026',
    kind: 'social',
  },
] as const;

const Work: React.FC = () => {
  useSEO({ title: 'Work', description: 'Video, websites, organic social, and paid media. See what Mychal Olguin made and the evidence behind each project.' });
  return <div className="editorial-page">
    <EditorialHeader label="Selected work" title="Marketing projects.">
      <p>Video, websites, and campaigns. Each project shows what I made, my role, and the evidence available.</p>
    </EditorialHeader>
    <section className="work-collection" aria-label="Case studies"><div className={CONTAINER}>
      <div className="work-grid">
        {presentations.map((item) => {
          const project = PROJECTS.find(project => project.slug === item.slug);
          const totals = project?.dashboardData?.totals;
          return <article className="work-card" key={item.slug}>
            <Link to={`/work/${item.slug}`} className={`work-card-media work-card-media--${item.kind}`} aria-label={`View ${item.client} case study`}>
              {item.kind === 'metric' && totals ? <div className="work-card-metric">
                <span>Meta Ads Manager · {project?.timeframe}</span>
                <div><strong>{totals.lpv.toLocaleString('en-US')}</strong><span>landing page views</span></div>
                <span>${(totals.spend / totals.lpv).toFixed(2)} per view</span>
              </div> : item.kind === 'social' ? <div className="work-card-metric">
                <span>392chulo · Instagram Reels</span>
                <div><strong>1.23M</strong><span>estimated accounts reached</span></div>
                <span>Instagram insights · Jan 2023–Oct 1, 2026</span>
              </div> : 'image' in item ? <img src={item.image} alt={item.alt} loading="lazy" /> : null}
            </Link>
            <div className="work-card-copy">
              <p className="editorial-eyebrow">{item.client} <span aria-hidden="true">·</span> {item.category}</p>
              <h2><Link to={`/work/${item.slug}`}>{item.title}</Link></h2>
              <p className="work-card-contribution">{item.contribution}</p>
              <p className="work-card-evidence">{item.evidence}</p>
              <Link className="editorial-link" to={`/work/${item.slug}`}>View case study <ArrowUpRight size={18} aria-hidden="true" /></Link>
            </div>
          </article>;
        })}
      </div>
    </div></section>

    <section id="paid-social-creative" aria-labelledby="social-creative-heading" className="editorial-chapter work-creative editorial-dark">
      <div className={CONTAINER}>
        <p className="editorial-eyebrow">More creative samples</p>
        <h2 id="social-creative-heading" className="statement mt-5 text-3xl md:text-5xl">Paid social for apartment communities</h2>
        <p className="work-creative-intro">I shot the photography, designed these carousel graphics, and wrote the captions. These published examples show the creative; campaign results are not available.</p>
        <div className="work-creative-grid">
          {SOCIAL_CREATIVE.map((creative) => (
            <article className="work-creative-card" key={creative.property}>
              <a href={creative.images[0].src} target="_blank" rel="noopener noreferrer" aria-label={`Open full screenshot: ${creative.images[0].alt}`}>
                <img src={creative.images[0].src} alt={creative.images[0].alt} loading="lazy" />
              </a>
              <div>
                <p className="editorial-eyebrow">{creative.property}</p>
                <h3>{creative.title}</h3>
                <p>{creative.strategy}</p>
                <a href={creative.images[0].src} target="_blank" rel="noopener noreferrer" className={LINK_UNDERLINE}>View published creative ↗</a>
              </div>
            </article>
          ))}
        </div>
        <p className="work-creative-note">Source: published Facebook carousel screenshots. Christy Estates’ $2,400 figure describes advertised savings over a 12-month lease.</p>
      </div>
    </section>

    <EditorialClose />
  </div>;
};
export default Work;
