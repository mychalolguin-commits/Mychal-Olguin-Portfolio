import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { CONTAINER } from './layout';

const navItems = [{ name: 'Work', path: '/work' }, { name: 'About', path: '/about' }, { name: 'Contact', path: '/contact' }];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  useEffect(() => { setIsOpen(false); }, [pathname]);
  useEffect(() => {
    if (!isOpen) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setIsOpen(false); menuButton.current?.focus(); }
    };
    const outside = (event: PointerEvent) => { if (!nav.current?.contains(event.target as Node)) setIsOpen(false); };
    const desktop = window.matchMedia('(min-width: 768px)');
    const resize = () => { if (desktop.matches) setIsOpen(false); };
    document.addEventListener('keydown', dismiss);
    document.addEventListener('pointerdown', outside);
    desktop.addEventListener('change', resize);
    return () => { document.removeEventListener('keydown', dismiss); document.removeEventListener('pointerdown', outside); desktop.removeEventListener('change', resize); };
  }, [isOpen]);

  return (
    <nav className="site-navigation" aria-label="Main navigation" ref={nav} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setIsOpen(false); }}>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className={`${CONTAINER} site-navigation-inner`}>
        <NavLink to="/" className="site-wordmark">Mychal Olguin<span>Digital marketing</span></NavLink>
        <div className="flex items-center gap-2 md:gap-6">
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => <NavLink key={item.path} to={item.path} className="site-nav-link">{item.name}</NavLink>)}
          </div>
          <ThemeToggle />
          <button ref={menuButton} type="button" onClick={() => setIsOpen((value) => !value)} aria-expanded={isOpen} aria-controls="mobile-navigation" className="site-menu-button md:hidden">{isOpen ? 'Close' : 'Menu'}</button>
        </div>
      </div>
      {isOpen && <div id="mobile-navigation" className={`${CONTAINER} site-mobile-navigation md:hidden`}>{navItems.map((item) => <NavLink key={item.path} to={item.path} className="site-nav-link" onClick={() => setIsOpen(false)}>{item.name}</NavLink>)}</div>}
    </nav>
  );
};
export default Navbar;
