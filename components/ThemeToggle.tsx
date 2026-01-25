import React from 'react';
import { Sun, Moon } from 'lucide-react';
import useTheme from '../hooks/useTheme';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-10 h-10 rounded-full flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-border-subtle)] transition-all duration-300 ${className}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className="relative w-5 h-5">
        <Sun
          size={20}
          className={`absolute inset-0 transition-all duration-300 ${
            theme === 'light'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 rotate-90 scale-0'
          }`}
        />
        <Moon
          size={20}
          className={`absolute inset-0 transition-all duration-300 ${
            theme === 'dark'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-0'
          }`}
        />
      </span>
    </button>
  );
};

export default ThemeToggle;
