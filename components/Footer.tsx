import React from 'react';
import { Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 mt-20 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-base)]">
      <div className="max-w-4xl lg:max-w-6xl mx-auto px-6 lg:px-10 xl:px-16 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[var(--color-text-muted)] text-sm">
          © {new Date().getFullYear()} Mychal Olguin. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href="mailto:hello@mychal.com" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors" aria-label="Email">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;