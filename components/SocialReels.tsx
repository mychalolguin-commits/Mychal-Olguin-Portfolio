import React, { useState } from 'react';
import { Project } from '../types';
import { CONTAINER, BTN_SECONDARY, LINK_UNDERLINE } from './layout';

const Reel: React.FC<{ reel: NonNullable<Project['socialReels']>[number] }> = ({ reel }) => {
  const [loaded, setLoaded] = useState(false);
  const url = `https://www.instagram.com/reel/${reel.id}/`;
  return <article className="social-reel">
    <h3 className="display text-2xl">{reel.title}</h3>
    <p className="mt-4 leading-relaxed text-[var(--graphite)]">{reel.description}</p>
    <div className="mt-6">
      {loaded ? <iframe src={`${url}embed/`} title={reel.title} className="social-reel-frame" allow="encrypted-media; fullscreen" allowFullScreen />
        : <button type="button" className={BTN_SECONDARY} onClick={() => setLoaded(true)}>Load Instagram reel</button>}
    </div>
    <a className={`mt-5 inline-block ${LINK_UNDERLINE}`} href={url} target="_blank" rel="noopener noreferrer">Watch on Instagram ↗</a>
  </article>;
};

export default function SocialReels({ reels }: { reels: NonNullable<Project['socialReels']> }) {
  return <section className="editorial-chapter" aria-labelledby="social-reels-heading"><div className={CONTAINER}>
    <p className="editorial-eyebrow">Published work</p>
    <h2 id="social-reels-heading" className="statement mt-5 text-3xl md:text-5xl">Watch the reels.</h2>
    <p className="mt-5 text-[var(--graphite)]">Players load from Instagram on request. If a player is unavailable, open the original post.</p>
    <div className="social-reels-grid mt-12">{reels.map(reel => <Reel key={reel.id} reel={reel} />)}</div>
  </div></section>;
}
