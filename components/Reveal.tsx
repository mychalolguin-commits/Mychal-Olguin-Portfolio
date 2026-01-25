import React from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  amount?: number | 'some' | 'all';
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  y = 20,
  once = true,
  amount = 0.3,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Staggered container for card grids
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  staggerDelay = 0.1,
  once = true,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.2 });

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Staggered item for use inside StaggerContainer
interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = '',
}) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

export default Reveal;
