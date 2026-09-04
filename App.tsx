import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MotionProvider from './components/MotionProvider';
import PageTransition from './components/PageTransition';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Work from './pages/Work';
import WorkDetail from './pages/WorkDetail';
import Resume from './pages/Resume';
import Contact from './pages/Contact';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    /*
      Deliberately no AnimatePresence. It previously wrapped <Routes> in
      mode="wait", where it had no motion element whose exit it could track —
      so it never learned the outgoing page had finished leaving and only
      swapped when the *next* navigation forced it. The site rendered one
      click behind its own URL: you clicked Contact and got Work.

      Keying PageTransition on the pathname remounts it per route, which
      replays the entrance and resets the scroll. Pages fade in; they don't
      fade out. That costs nothing visually and removes the whole failure mode.
    */
    <PageTransition key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<WorkDetail />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </PageTransition>
  );
};

const App: React.FC = () => {
  return (
    <MotionProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans bg-[var(--color-bg-base)] text-[var(--color-text-secondary)] selection:bg-[var(--ink)] selection:text-[var(--paper)]">
          <Navbar />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </MotionProvider>
  );
};

export default App;
