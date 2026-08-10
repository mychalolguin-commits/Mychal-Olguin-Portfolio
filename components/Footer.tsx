import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-10 mt-20 border-t border-[var(--rule)] bg-[var(--paper)]">
      <div className="max-w-4xl lg:max-w-6xl mx-auto px-6 lg:px-10 xl:px-16 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <span className="label">© {new Date().getFullYear()} Mychal Olguin</span>
        <div className="flex gap-6">
          <a
            href="https://www.linkedin.com/in/mychalolguin/"
            target="_blank"
            rel="noreferrer"
            className="label underline underline-offset-4 decoration-[var(--rule)] transition-colors hover:text-[var(--ink)] hover:decoration-[var(--ink)]"
          >
            LinkedIn
          </a>
          <a
            href="mailto:mychalolguin@gmail.com"
            className="label underline underline-offset-4 decoration-[var(--rule)] transition-colors hover:text-[var(--ink)] hover:decoration-[var(--ink)]"
          >
            mychalolguin@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
