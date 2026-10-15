import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import WorkCard from '../components/WorkCard';
import { WORK_PRESENTATIONS } from '../constants';
import { CONTAINER, BTN_PRIMARY, BTN_ON_BRAND } from '../components/layout';
import { useSEO } from '../hooks/useSEO';

const homeProjects = WORK_PRESENTATIONS.filter((item) =>
  ['escapades-coaching', 'borders-organic-social', 'towne-oaks-paid-social', 'ire-junk-removal-website'].includes(item.slug)
);

const Home: React.FC = () => {
  useSEO({
    title: 'Digital marketing & selected work',
    description: 'Video, websites, paid media, and search. Explore Mychal Olguin’s projects, contributions, and results.',
  });

  return (
    <div className="editorial-home">
      <section className="home-intro" aria-labelledby="home-heading">
        <div className={CONTAINER}>
          <div className="home-intro-grid">
            <h1 id="home-heading">Good marketing.<br />Built with purpose.</h1>
            <div className="home-intro-copy">
              <p>I’m Mychal. I build websites, create social content, run paid media, and help businesses get found.</p>
              <a href="#selected-work" className={`${BTN_PRIMARY} editorial-button`}>Explore my work <ArrowUpRight size={18} aria-hidden="true" /></a>
              <span className="editorial-note">Austin, Texas · Open to growth roles</span>
            </div>
          </div>
          <figure className="home-lead-story">
            <Link to="/work/cornerstone-apartment-websites" className="home-lead-image" aria-label="Explore the Cornerstone Capital website project">
              <img src="/images/home-feature-1440.jpg" srcSet="/images/home-feature-768.jpg 768w, /images/home-feature-1440.jpg 1440w" sizes="(min-width: 1440px) 1312px, (min-width: 1024px) calc(100vw - 128px), (min-width: 768px) calc(100vw - 80px), calc(100vw - 48px)" alt="The Compass Bay website I rebuilt, featuring its waterfront apartments and marina" width={2000} height={1156} fetchPriority="high" />
            </Link>
            <figcaption className="home-lead-caption">
              <div><span className="editorial-eyebrow">Featured project · Cornerstone Capital · Web design & search</span><p>Four apartment websites rebuilt.</p></div>
              <Link to="/work/cornerstone-apartment-websites" className="editorial-link">View case study <ArrowUpRight size={19} aria-hidden="true" /></Link>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="selected-work" className="home-work editorial-dark" aria-labelledby="work-heading">
        <div className={CONTAINER}>
          <div className="editorial-section-heading">
            <div><p className="editorial-eyebrow">Selected work</p><h2 id="work-heading">Video, web, and paid media.</h2></div>
            <Link to="/work" className="editorial-link">View all six projects <ArrowUpRight size={19} aria-hidden="true" /></Link>
          </div>
          <div className="work-grid home-work-grid">
            {homeProjects.map((item) => <WorkCard item={item} headingLevel="h3" key={item.slug} />)}
          </div>
        </div>
      </section>

      <section className="home-approach" aria-labelledby="approach-heading">
        <div className={`${CONTAINER} home-approach-grid`}>
          <figure className="home-portrait">
            <img src="/images/mychal-suit-headshot.jpg" alt="Mychal Olguin wearing a suit and tie" width={1536} height={1024} loading="lazy" />
            <figcaption>Mychal Olguin <span>Digital marketer · Austin, TX</span></figcaption>
          </figure>
          <div className="home-approach-copy">
            <p className="editorial-eyebrow">The person behind the work</p>
            <h2 id="approach-heading">From first question<br />to next step.</h2>
            <p className="editorial-body">I connect the page, the campaign, and the measurement. Each part starts with what someone needs to know.</p>
            <dl className="home-method">
              <div><dt>Make it useful.</dt><dd>Build pages that answer real questions.</dd></div>
              <div><dt>Help it get found.</dt><dd>Bring search and paid media to the right page.</dd></div>
              <div><dt>Know what happened.</dt><dd>Set up tracking before the campaign starts.</dd></div>
            </dl>
            <Link to="/about" className="editorial-link">More about me <ArrowUpRight size={19} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="home-contact" aria-labelledby="contact-heading">
        <div className={`${CONTAINER} home-contact-grid`}>
          <div><p className="editorial-eyebrow">Let’s work together</p><h2 id="contact-heading">Good work starts<br />with a conversation.</h2></div>
          <div className="home-contact-copy"><p>I’m looking for my next digital marketing or growth role. Let’s talk about what you’re building.</p><a href="mailto:mychalolguin@gmail.com" className={`${BTN_ON_BRAND} editorial-button`}>Get in touch <ArrowUpRight size={18} aria-hidden="true" /></a></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
