import React from 'react';
import { CONTAINER } from './layout';

const Footer: React.FC = () => (
  <footer className="site-footer">
    <div className={`${CONTAINER} flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4`}>
      <span>© {new Date().getFullYear()} Mychal Olguin</span>
      <div className="flex flex-wrap gap-x-8 gap-y-2">
        <a href="https://www.linkedin.com/in/mychalolguin/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="mailto:mychalolguin@gmail.com">Email</a>
      </div>
    </div>
  </footer>
);
export default Footer;
