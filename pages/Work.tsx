import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, SOCIAL_CREATIVE } from '../constants';
import { useSEO } from '../hooks/useSEO';
import { CONTAINER, LINK_UNDERLINE } from '../components/layout';
import { EditorialHeader, EditorialClose } from '../components/EditorialPage';

// Keep artwork and short index titles separate from the complete case-study record.
const presentations = [
  { slug: 'cornerstone-apartment-websites', title: 'Built around renter questions.', client: 'Cornerstone Capital', body: 'Four property websites, rebuilt around the questions renters ask.', image: '/images/home-borders-1200.jpg', alt: 'Borders Apartments website and pool photography', kind: 'website' },
  { slug: 'towne-oaks-paid-social', title: 'Traffic with a purpose.', client: 'Towne Oaks', body: 'A Meta campaign connecting interested renters with available floorplans.', kind: 'metric' },
  { slug: 'ire-junk-removal-website', title: 'A first place to get found.', client: 'IRE Junk Removal', body: 'A first website, with local service information and a clear path to request a quote.', image: '/captures/ire-quote-form.png', alt: 'IRE’s branded trailer on a removal job', kind: 'story' },
];

const Work: React.FC = () => {
  useSEO({ title: 'Work', description: 'Websites, paid media, and search. Explore the work and evidence behind Mychal Olguin’s marketing projects.' });
  return <div className="editorial-page">
    <EditorialHeader label="Selected work" title="The work. The thinking behind it.">
      <p>Websites, campaigns, and search. A closer look at what I built and what happened next.</p>
    </EditorialHeader>
    <section className="work-collection" aria-label="Case studies"><div className={CONTAINER}>
      {presentations.map((item) => {
        const project = PROJECTS.find(project => project.slug === item.slug)!;
        const totals = project.dashboardData?.totals;
        return <article className={`work-feature work-feature--${item.kind}`} key={item.slug}>
          <Link to={`/work/${item.slug}`} className={`work-art work-art--${item.kind}`} aria-label={`Explore ${item.client}`}>
            {totals ? <div className="work-metric"><p className="editorial-eyebrow">{item.client}</p><div><p className="work-metric-value">{totals.lpv.toLocaleString('en-US')}</p><p>landing page views</p></div><p className="work-metric-source">${(totals.spend / totals.lpv).toFixed(2)} per view<br /><span>Meta Ads Manager · {project.timeframe}</span></p></div>
              : <img src={item.image} alt={item.alt} loading="lazy" />}
          </Link>
          <div className="work-feature-copy"><p className="editorial-eyebrow">{item.client} · {project.subtitle}</p>
            <h2><Link to={`/work/${item.slug}`}>{item.title}</Link></h2>
            <p className="editorial-body">{item.body}</p>
            <Link className="editorial-link" to={`/work/${item.slug}`}>Explore the project <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </article>;
      })}
    </div></section>
      <section id="paid-social-creative" aria-labelledby="social-creative-heading" className="editorial-chapter work-creative editorial-dark">
        <div className={CONTAINER}>
          <>
            <p className="editorial-eyebrow">Selected paid-social creative</p>
            <h2 id="social-creative-heading" className="statement mt-5 max-w-[22ch] text-3xl md:text-5xl ">
              Give renters a reason to look closer.
            </h2>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-[var(--editorial-inverse-muted)]">
              Paid-social carousels for Christy Estates and Borders Apartments. I shot all the
              photography, created the graphics, and wrote the captions.
            </p>
          </>

          <div className="mt-14 space-y-16 md:space-y-24">
            {SOCIAL_CREATIVE.map((creative) => (
              <React.Fragment key={creative.property}>
                <article className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
                  <div>
                    <p className="editorial-eyebrow">{creative.property}</p>
                    <h3 className="display mt-4 text-2xl md:text-3xl ">{creative.title}</h3>
                    <p className="mt-5 text-[16px] leading-relaxed text-[var(--editorial-inverse-muted)]">{creative.strategy}</p>
                    <p className="mt-4 text-[16px] leading-relaxed text-[var(--editorial-inverse-muted)]">{creative.execution}</p>
                  </div>
                  <div className={`grid items-start gap-4 ${creative.images.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'mx-auto w-full max-w-sm'}`}>
                    {creative.images.map((asset) => (
                      <figure key={asset.src} className="min-w-0">
                        <a href={asset.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full screenshot: ${asset.alt}`} className="block">
                          <img src={asset.src} alt={asset.alt} loading="lazy" className="block h-auto w-full rounded-[24px]" />
                        </a>
                        <figcaption className="mt-3 text-[13px] leading-relaxed text-[var(--editorial-inverse-muted)]">
                          {asset.caption}
                          <a href={asset.src} target="_blank" rel="noopener noreferrer" className={`mt-2 block ${LINK_UNDERLINE}`}>View full screenshot ↗</a>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </article>
              </React.Fragment>
            ))}
          </div>
          <p className="mt-12 max-w-[68ch] text-[14px] leading-relaxed text-[var(--editorial-inverse-muted)]">
            Source: screenshots of the published Facebook creative. The $2,400 figure describes
            the advertised savings over a 12-month lease. These examples document the creative;
            campaign performance is not reported here.
          </p>
        </div>
      </section>

    <EditorialClose />
  </div>;
};
export default Work;
