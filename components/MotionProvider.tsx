import React from 'react';
import { MotionConfig } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface MotionProviderProps {
  children: React.ReactNode;
}

export const MotionProvider: React.FC<MotionProviderProps> = ({ children }) => {
  const reducedMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion={reducedMotion ? 'always' : 'never'}>
      {children}
    </MotionConfig>
  );
};

export default MotionProvider;
