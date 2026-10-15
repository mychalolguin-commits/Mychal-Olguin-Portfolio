import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, WORK_PRESENTATIONS } from '../constants';

type WorkPresentation = (typeof WORK_PRESENTATIONS)[number];

const WorkCard: React.FC<{ item: WorkPresentation; headingLevel?: 'h2' | 'h3' }> = ({ item, headingLevel = 'h2' }) => {
  const project = PROJECTS.find(project => project.slug === item.slug);
  const totals = project?.dashboardData?.totals;
  const Heading = headingLevel;

  return <article className="work-card">
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
      <Heading><Link to={`/work/${item.slug}`}>{item.title}</Link></Heading>
      <p className="work-card-contribution">{item.contribution}</p>
      <p className="work-card-evidence">{item.evidence}</p>
      <Link className="editorial-link" to={`/work/${item.slug}`}>View case study <ArrowUpRight size={18} aria-hidden="true" /></Link>
    </div>
  </article>;
};

export default WorkCard;
