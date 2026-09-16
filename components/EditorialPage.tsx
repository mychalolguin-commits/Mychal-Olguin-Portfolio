import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CONTAINER, BTN_ON_BRAND } from './layout';

export function EditorialHeader({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return <header className="editorial-page-header"><div className={CONTAINER}>
    <p className="editorial-eyebrow">{label}</p>
    <h1>{title}</h1>
    <div className="editorial-page-intro">{children}</div>
  </div></header>;
}

export function EditorialClose() {
  return <section className="home-contact"><div className={`${CONTAINER} home-contact-grid`}>
    <div><p className="editorial-eyebrow">Let’s work together</p><h2>Let’s talk about<br />what comes next.</h2></div>
    <div className="home-contact-copy"><p>Open to digital marketing and growth roles. Based in Austin, Texas.</p>
      <Link to="/contact" className={`${BTN_ON_BRAND} editorial-button`}>Get in touch <ArrowUpRight size={18} aria-hidden="true" /></Link>
    </div>
  </div></section>;
}
