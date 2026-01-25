import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: 'Work', path: '/work' },
    { name: 'Resume', path: '/resume' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-nav-bg)] backdrop-blur-md border-b border-[var(--color-border-subtle)]">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="text-[var(--color-text-primary)] font-semibold tracking-tight text-lg hover:text-[var(--color-accent)] transition-colors">
          Mychal Olguin
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="relative text-sm font-medium transition-colors duration-200 group"
            >
              {({ isActive }) => (
                <>
                  <span className={isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text-primary)]'}>
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-mint-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <motion.button
            onClick={toggleMenu}
            className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] p-1"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
            className="md:hidden absolute top-16 left-0 right-0 bg-[var(--color-bg-elevated)] border-b border-[var(--color-border-default)] overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 flex flex-col gap-6"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <NavLink
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `text-lg ${isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-tertiary)]'}`
                    }
                  >
                    {item.name}
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
