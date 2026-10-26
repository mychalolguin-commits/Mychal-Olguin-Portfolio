import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const SESSION_KEY = 'escapades-case-study-nudge-seen';

const NewCaseStudyNudge: React.FC = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [overDarkSection, setOverDarkSection] = useState(false);
  const nudge = useRef<HTMLElement>(null);

  useEffect(() => {
    if (pathname !== '/' || sessionStorage.getItem(SESSION_KEY)) return;
    const timer = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1');
      setOpen(true);
    }, 2500);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/') setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open || pathname !== '/') return;
    let frame = 0;
    const updateSurface = () => {
      frame = 0;
      const card = nudge.current;
      if (!card) return;
      const bounds = card.getBoundingClientRect();
      const behind = document.elementsFromPoint(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2)
        .find((element) => element !== card && !card.contains(element));
      setOverDarkSection(Boolean(behind?.closest('.editorial-dark, .home-contact')));
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateSurface);
    };
    updateSurface();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [open, pathname]);

  if (!open || pathname !== '/') return null;

  return <aside ref={nudge} className={`new-case-nudge${overDarkSection ? ' new-case-nudge--over-dark' : ''}`} aria-label="New case study">
    <button type="button" className="new-case-nudge-close" aria-label="Dismiss new case study notice" onClick={() => setOpen(false)}><X size={17} aria-hidden="true" /></button>
    <p className="new-case-nudge-title">Bilingual videos and a coaching website.</p>
    <Link to="/work/escapades-coaching" className="editorial-link" onClick={() => setOpen(false)}>See the case study <ArrowUpRight size={17} aria-hidden="true" /></Link>
  </aside>;
};

export default NewCaseStudyNudge;
