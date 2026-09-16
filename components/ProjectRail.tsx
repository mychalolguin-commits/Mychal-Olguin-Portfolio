import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { CONTAINER } from './layout';
import { useReducedMotion } from '../hooks/useReducedMotion';

const campaign = PROJECTS.find((project) => project.slug === 'towne-oaks-paid-social');
const totals = campaign?.dashboardData?.totals;
const stories = [
  { slug: 'cornerstone-apartment-websites', category: 'Cornerstone Capital · Web design', title: 'Built around renter questions.', body: 'Four property websites, with the answers renters need to take the next step.', image: '/images/home-borders-1200.jpg', srcSet: '/images/home-borders-600.jpg 600w, /images/home-borders-1200.jpg 1200w', alt: 'A detail of the Borders Apartments website, showing its property photography and floorplan introduction', width: 2000, height: 1183, kind: 'lead' },
  { slug: 'towne-oaks-paid-social', category: 'Towne Oaks · Paid media', title: 'Traffic with a purpose.', body: 'A direct path from Meta ads to available floorplans.', kind: 'evidence' },
  { slug: 'ire-junk-removal-website', category: 'IRE Junk Removal', title: 'A first place to get found.', body: 'A first website, with a clear path to request a quote.', image: '/captures/ire-quote-form.png', alt: 'Detail of the IRE quote-page photograph, showing its branded trailer on a removal job', width: 1440, height: 1297, kind: 'story' },
];

const ProjectRail: React.FC = () => {
  const railRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [position, setPosition] = useState({ start: true, end: false, overflow: true });
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const update = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      const next = { start: rail.scrollLeft < 2, end: rail.scrollLeft >= max - 2, overflow: max > 2 };
      setPosition((current) => current.start === next.start && current.end === next.end && current.overflow === next.overflow ? current : next);
    };
    update();
    rail.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(rail);
    for (const card of rail.children) observer.observe(card);
    return () => { rail.removeEventListener('scroll', update); observer.disconnect(); };
  }, []);

  const move = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail || (direction === -1 && position.start) || (direction === 1 && position.end)) return;
    const inset = parseFloat(getComputedStyle(rail).paddingLeft);
    const max = rail.scrollWidth - rail.clientWidth;
    const cards = Array.from(rail.children) as HTMLElement[];
    const starts = cards.map((card) => Math.min(max, card.offsetLeft - inset));
    const index = direction === 1
      ? starts.findIndex((start) => start > rail.scrollLeft + 2)
      : starts.reduce((last, start, cardIndex) => start < rail.scrollLeft - 2 ? cardIndex : last, -1);
    const target = index < 0 ? (direction === 1 ? cards.length - 1 : 0) : index;
    rail.scrollTo({ left: starts[target], behavior: reducedMotion ? 'instant' : 'smooth' });
    setAnnouncement(`Showing project ${target + 1} of ${stories.length}: ${stories[target].title}`);
  };

  return (
    <div className="project-carousel" role="region" aria-roledescription="carousel" aria-label="Selected projects">
      <div className="project-rail" ref={railRef} id="project-rail">
        {stories.map((story, index) => (
          <article className={`project-story project-story--${story.kind}`} key={story.slug} aria-label={`${index + 1} of ${stories.length}`} aria-roledescription="slide">
            {story.kind === 'evidence' && totals ? (
              <div className="project-media project-evidence">
                <p className="editorial-eyebrow">Towne Oaks</p>
                <div className="project-evidence-main"><p className="project-evidence-value">{totals.lpv.toLocaleString('en-US')}</p><p className="project-evidence-label">landing page views</p></div>
                <div className="project-evidence-source"><p>${(totals.spend / totals.lpv).toFixed(2)} per view</p><span>Meta Ads Manager · {campaign?.timeframe}</span></div>
              </div>
            ) : story.kind === 'story' ? (
              <div className="project-media project-composed">
                <div className="project-embedded-copy">
                  <p className="editorial-eyebrow">{story.category}</p>
                  <h3><Link to={`/work/${story.slug}`}>{story.title}<ArrowUpRight size={20} aria-hidden="true" /></Link></h3>
                </div>
                <div className="project-detail-image"><img src={story.image} alt={story.alt} width={story.width} height={story.height} loading="lazy" /></div>
              </div>
            ) : (
              <div className="project-media project-website"><img src={story.image} srcSet={story.srcSet} sizes="(min-width: 1400px) 1200px, (min-width: 768px) 90vw, 140vw" alt={story.alt} width={story.width} height={story.height} loading="lazy" /></div>
            )}
            <div className="project-caption">
              {story.kind !== 'story' && <>
                <p className="editorial-eyebrow">{story.category}</p>
                <h3><Link to={`/work/${story.slug}`}>{story.title}<ArrowUpRight size={20} aria-hidden="true" /></Link></h3>
              </>}
              <p>{story.body}</p>
            </div>
          </article>
        ))}
      </div>
      {position.overflow && <div className={`${CONTAINER} rail-controls`}>
        <span className="editorial-note">Explore the work, one story at a time.</span>
        <div className="flex gap-3">
          <button type="button" aria-label="Previous project" aria-controls="project-rail" aria-disabled={position.start} onClick={() => move(-1)}><ArrowLeft size={20} aria-hidden="true" /></button>
          <button type="button" aria-label="Next project" aria-controls="project-rail" aria-disabled={position.end} onClick={() => move(1)}><ArrowRight size={20} aria-hidden="true" /></button>
        </div>
      </div>}
      <p className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>
    </div>
  );
};

export default ProjectRail;
