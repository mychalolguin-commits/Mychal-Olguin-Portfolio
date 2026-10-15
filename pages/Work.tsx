import React from 'react';
import { SOCIAL_CREATIVE, WORK_PRESENTATIONS } from '../constants';
import { useSEO } from '../hooks/useSEO';
import { CONTAINER } from '../components/layout';
import { EditorialHeader, EditorialClose } from '../components/EditorialPage';
import WorkCard from '../components/WorkCard';

const Work: React.FC = () => {
  useSEO({ title: 'Work', description: 'Video, websites, organic social, and paid media. See what Mychal Olguin made and the evidence behind each project.' });
  return <div className="editorial-page">
    <EditorialHeader label="Selected work" title="Marketing projects.">
      <p>Video, websites, and campaigns. Each project shows what I made, my role, and the evidence available.</p>
    </EditorialHeader>
    <section className="work-collection" aria-label="Case studies"><div className={CONTAINER}>
      <div className="work-grid">
        {WORK_PRESENTATIONS.map((item) => <WorkCard item={item} key={item.slug} />)}
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
              <div className="work-creative-copy">
                <p className="editorial-eyebrow">{creative.property}</p>
                <h3>{creative.title}</h3>
                <p>{creative.strategy}</p>
              </div>
              <figure className="work-creative-media">
                <img src={creative.images[0].src} alt={creative.images[0].alt} loading="lazy" />
                <figcaption>{creative.images[0].caption}</figcaption>
              </figure>
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
