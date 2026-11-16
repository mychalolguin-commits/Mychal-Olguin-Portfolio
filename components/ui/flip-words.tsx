"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { cn } from "../../lib/utils";

type FlipWordsProps = {
  words: readonly string[];
  duration?: number;
  className?: string;
};

export function FlipWords({ words, duration = 3000, className }: FlipWordsProps) {
  const reducedMotion = useReducedMotion();
  const firstWord = words[0];
  const wordClassName = cn(
    "z-10 inline-block relative text-left text-neutral-900 dark:text-neutral-100 px-2",
    className,
  );

  if (!firstWord) return null;
  if (reducedMotion || words.length === 1) {
    return <span className={wordClassName}>{firstWord}</span>;
  }

  return (
    <>
      <span className="sr-only">{firstWord}</span>
      <AnimatedWords words={words} duration={duration} className={wordClassName} />
    </>
  );
}

function AnimatedWords({ words, duration, className }: Required<FlipWordsProps>) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentWord = words[index % words.length];
  const parts = currentWord.split(" ");

  useEffect(() => {
    if (isAnimating) return;
    const timer = window.setTimeout(() => {
      setIndex((previous) => (previous + 1) % words.length);
      setIsAnimating(true);
    }, duration);
    return () => window.clearTimeout(timer);
  }, [duration, isAnimating, words.length]);

  return (
    <span aria-hidden="true" className="relative inline-grid max-w-full align-baseline">
      {/* The widest phrase sets the slot width while the visible word changes. */}
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className={cn(className, "invisible [grid-area:1/1]")}>
          {word}
        </span>
      ))}
      <span className="absolute inset-0">
        <AnimatePresence initial={false} onExitComplete={() => setIsAnimating(false)}>
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            exit={{
              opacity: 0,
              y: -40,
              x: 40,
              filter: "blur(8px)",
              scale: 2,
              position: "absolute",
              top: 0,
              left: 0,
            }}
            className={className}
          >
            {parts.map((word, wordIndex) => (
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: wordIndex * 0.3, duration: 0.3 }}
                className="inline-block whitespace-nowrap"
              >
                {Array.from(word).map((letter, letterIndex) => (
                  <motion.span
                    key={letterIndex}
                    initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      delay: wordIndex * 0.3 + letterIndex * 0.05,
                      duration: 0.2,
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
                {wordIndex < parts.length - 1 && <span className="inline-block">&nbsp;</span>}
              </motion.span>
            ))}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
