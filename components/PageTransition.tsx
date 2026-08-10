import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  /**
   * Reset the scroll here rather than on route change. AnimatePresence runs in
   * "wait" mode, so the outgoing page stays mounted through its exit animation
   * and a scroll reset fired at navigation time gets undone before this page
   * appears. Doing it as the new page mounts is the moment that actually holds
   * — otherwise you leave a long case study and land halfway down Contact.
   */
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
