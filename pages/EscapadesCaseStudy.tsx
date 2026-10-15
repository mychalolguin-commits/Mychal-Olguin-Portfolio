import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BTN_PRIMARY, CONTAINER } from '../components/layout';
import ScrollProgress from '../components/ScrollProgress';
import { useSEO } from '../hooks/useSEO';

const base = '/captures/escapades';
const videoUrl = 'https://www.youtube.com/watch?v=0JOdN52lTMg';

const EscapadesCaseStudy: React.FC = () => {
  useSEO({
    title: 'Escapades Coaching — Bilingual Content & Website Case Study',
    description: 'How Mychal Olguin turned one coaching talk into bilingual short-form creative, a rollout plan, and a website path from viewing to booking.',
  });

  return <article className="editorial-page escapades-case">
    <ScrollProgress />
    <header className="escapades-hero">
      <div className={CONTAINER}>
        <Link to="/work" className="case-back"><ArrowLeft size={14} aria-hidden="true" /> All work</Link>
        <p className="editorial-eyebrow escapades-kicker">Escapades Coaching · Content strategy, video & web</p>
        <h1>One conversation.<br />A whole content system.</h1>
        <p className="escapades-intro">A self-care talk became bilingual short-form creative, a platform-specific publishing plan, and a clearer path from watching to booking a coaching call.</p>
        <a className={`${BTN_PRIMARY} editorial-button escapades-video-link`} href={videoUrl} target="_blank" rel="noopener noreferrer">Watch the published talk <ArrowUpRight size={18} aria-hidden="true" /></a>
        <div className="escapades-meta" aria-label="Project details">
          <span>My role: strategy, editing, website design</span>
          <span>2026 · Work in rollout</span>
        </div>
      </div>
    </header>

    <section className="escapades-overview" aria-labelledby="escapades-overview-title">
      <div className={`${CONTAINER} escapades-overview-grid`}>
        <div>
          <p className="editorial-eyebrow">The assignment</p>
          <h2 id="escapades-overview-title">Make one talk work harder.</h2>
          <p>Loreinna Hernandez coaches people navigating change in work and life, in English and Spanish. The challenge was to turn a single long-form video into content that speaks to specific moments her audience recognizes, then give interested viewers a useful next step.</p>
        </div>
        <div className="escapades-source">
          <img src={`${base}/self-care-thumbnail.webp`} alt="Escapades Coaching self-care video thumbnail reading Time to Reset?" width="1280" height="720" />
          <p>Thumbnail created for the self-care talk.</p>
        </div>
      </div>
    </section>

    <section className="escapades-output" aria-labelledby="escapades-output-title">
      <div className={CONTAINER}>
        <p className="editorial-eyebrow">What I made</p>
        <h2 id="escapades-output-title">A connected set of assets.</h2>
        <div className="escapades-output-grid">
          <div><strong>01</strong><h3>One published talk</h3><p>The long-form video gives the campaign a home and a deeper story to point back to.</p></div>
          <div><strong>10 × 2</strong><h3>Bilingual short cuts</h3><p>Ten distinct moments were edited into English and Spanish versions: 20 finished vertical files, ready for publishing.</p></div>
          <div><strong>54</strong><h3>Schedule rows</h3><p>A four-week plan maps 52 planned posts and emails, plus two measurement check-ins, across five platforms.</p></div>
        </div>
        <p className="escapades-qualifier">These are production and planning totals. The short-form rollout has not been published, so they are not reach or conversion results.</p>
      </div>
    </section>

    <section className="escapades-chapter" aria-labelledby="escapades-creative-title">
      <div className={`${CONTAINER} escapades-chapter-grid`}>
        <div className="escapades-chapter-copy">
          <p className="editorial-eyebrow">01 / Creative</p>
          <h2 id="escapades-creative-title">Choose the moment, then shape the message.</h2>
          <p>I selected clips for the woman balancing career and personal change, including the moment Loreinna speaks directly to people who moved away from family for work. Each cut has one idea, a clear opening, and captions designed to stay readable inside a Reel.</p>
          <p>The footage was recut from the final graded 4K export so the vertical edits match the published talk. Each selected moment has an English and a Spanish version of the same edit.</p>
        </div>
        <div className="escapades-reel-pair">
          <figure><video controls playsInline preload="none" poster={`${base}/reel-career.webp`} width="540" height="960" aria-label="Play the English career and relocation short"><source src={`${base}/reel-career-en.mp4`} type="video/mp4" />Your browser does not support this video.</video><figcaption>English · Career and relocation angle</figcaption></figure>
          <figure><video controls playsInline preload="none" poster={`${base}/reel-reset.webp`} width="540" height="960" aria-label="Play the Spanish reset short"><source src={`${base}/reel-reset-es.mp4`} type="video/mp4" />Your browser does not support this video.</video><figcaption>Spanish · Reset and next-step angle</figcaption></figure>
        </div>
      </div>
    </section>

    <section className="escapades-chapter escapades-chapter--plan" aria-labelledby="escapades-plan-title">
      <div className={`${CONTAINER} escapades-chapter-grid`}>
        <div className="escapades-chapter-copy">
          <p className="editorial-eyebrow">02 / Distribution</p>
          <h2 id="escapades-plan-title">Give each channel a job.</h2>
          <p>The publishing plan starts with the full YouTube conversation. Short clips then bring viewers in through the themes most relevant to each platform: career and relocation on LinkedIn, a broader self-care conversation on Instagram and YouTube Shorts, and Spanish-first posts on Facebook.</p>
          <p>I wrote the post copy, calls to action, and schedule together. That way, each short points toward the full talk, a free resource, or a coaching conversation instead of ending at the view.</p>
        </div>
        <ol className="escapades-flow" aria-label="Content journey">
          <li><span>01</span><div><h3>Discover</h3><p>A short opens with a situation the viewer recognizes.</p></div></li>
          <li><span>02</span><div><h3>Go deeper</h3><p>The full YouTube talk gives the idea room to breathe.</p></div></li>
          <li><span>03</span><div><h3>Take a step</h3><p>The website offers a worksheet and a route to a free call.</p></div></li>
        </ol>
      </div>
    </section>

    <section className="escapades-chapter" aria-labelledby="escapades-web-title">
      <div className={CONTAINER}>
        <div className="escapades-web-heading">
          <div><p className="editorial-eyebrow">03 / Website</p><h2 id="escapades-web-title">Build the next step into the site.</h2></div>
          <p>The redesigned Squarespace site brings Loreinna’s coaching, testimonials, and booking path into a clearer sequence. A dedicated Reset page pairs the talk with a free worksheet and a call to action. The build is complete on the private site and is awaiting client approval to launch.</p>
        </div>
        <div className="escapades-web-artifacts">
          <figure className="escapades-site-shot"><img src={`${base}/site-detail.png`} alt="Escapades Coaching site design showing audience situations and the coaching process" width="1568" height="1110" loading="lazy" /><figcaption>Redesigned page sections on the private Squarespace site</figcaption></figure>
          <figure className="escapades-worksheet"><img src={`${base}/reset-worksheet.jpg`} alt="Preview of the 15-Minute Reset worksheet" loading="lazy" /><figcaption>The free resource connected to the video</figcaption></figure>
        </div>
      </div>
    </section>

    <section className="escapades-status" aria-labelledby="escapades-status-title">
      <div className={`${CONTAINER} escapades-status-grid`}>
        <div><p className="editorial-eyebrow">Where it stands</p><h2 id="escapades-status-title">Built, with results to come.</h2></div>
        <div>
          <p>The long-form video is published on YouTube. The website is built and awaiting client approval. The Shorts and Reels are finished but have not been posted. This case study documents the strategy and creative work; reach, sign-ups, and calls will be added after the rollout is live and measured.</p>
          <Link to="/work" className="editorial-link">Explore more work <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  </article>;
};

export default EscapadesCaseStudy;
