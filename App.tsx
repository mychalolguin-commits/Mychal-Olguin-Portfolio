import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MotionProvider from './components/MotionProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Work from './pages/Work';
import WorkDetail from './pages/WorkDetail';
import Resume from './pages/Resume';
import Contact from './pages/Contact';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<WorkDetail />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <MotionProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col font-sans bg-[var(--color-bg-base)] text-[var(--color-text-secondary)] selection:bg-mint-500/30 selection:text-mint-200">
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
