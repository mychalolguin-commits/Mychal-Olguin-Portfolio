import React, { useEffect, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const SESSION_KEY = 'escapades-case-study-nudge-seen';

const NewCaseStudyNudge: React.FC = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

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

  if (!open || pathname !== '/') return null;

  return <aside className="new-case-nudge" aria-label="New case study">
    <button type="button" className="new-case-nudge-close" aria-label="Dismiss new case study notice" onClick={() => setOpen(false)}><X size={17} aria-hidden="true" /></button>
    <p className="editorial-eyebrow">Just added · Escapades Coaching</p>
    <p className="new-case-nudge-title">Bilingual videos and a coaching website.</p>
    <Link to="/work/escapades-coaching" className="editorial-link" onClick={() => setOpen(false)}>See the case study <ArrowUpRight size={17} aria-hidden="true" /></Link>
  </aside>;
};

export default NewCaseStudyNudge;
