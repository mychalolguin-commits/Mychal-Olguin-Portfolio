import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Get initial theme from DOM (set by flash prevention script)
    if (typeof window !== 'undefined') {
      const stored = document.documentElement.getAttribute('data-theme') as Theme;
      return stored || 'dark';
    }
    return 'dark';
  });

  const setThemeValue = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeValue(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setThemeValue]);

  useEffect(() => {
    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if no stored preference
      if (!localStorage.getItem('theme')) {
        setThemeValue(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setThemeValue]);

  return { theme, toggleTheme, setTheme: setThemeValue };
};

export default useTheme;
