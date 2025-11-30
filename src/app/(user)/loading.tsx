"use client";

import { useEffect, useState } from "react";
import { motion, easeInOut, Variants } from "framer-motion";
import { usePageLoader } from "@/hooks/use-page-loader";

export default function PageLoader() {
  const isLoading = usePageLoader();
  const [displayLoader, setDisplayLoader] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setDisplayLoader(true);
    } else {
      const timer = setTimeout(() => setDisplayLoader(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!displayLoader) return null;

  const outerRingVariants: Variants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear" as const,
      },
    },
  };

  const middleRingVariants: Variants = {
    animate: {
      scale: [1, 0.95, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 1.8,
        repeat: Number.POSITIVE_INFINITY,
        ease: easeInOut,
      },
    },
  };

  const gradientOrbVariants: Variants = {
    animate: {
      scale: [1, 0.95, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: easeInOut,
      },
    },
  };

  const dotVariants = (delay: number): Variants => ({
    animate: {
      rotate: 360,
      transition: {
        duration: 2.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear" as const,
        delay,
      },
    },
  });

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-50 dark:bg-neutral-950"
      style={{ pointerEvents: !isLoading ? "none" : "auto" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated gradient orbs */}
      <div className="relative w-20 h-20">
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-neutral-900 border-r-neutral-400 dark:border-t-neutral-100 dark:border-r-neutral-600"
          variants={outerRingVariants}
          animate="animate"
        />

        {/* Middle pulsing ring */}
        <motion.div
          className="absolute inset-2 rounded-full border border-neutral-300 dark:border-neutral-700"
          variants={middleRingVariants}
          animate="animate"
        />

        {/* Gradient orb */}
        <div className="absolute inset-4 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-linear-to-br from-neutral-900 to-neutral-700 dark:from-neutral-100 dark:to-neutral-300"
            variants={gradientOrbVariants}
            animate="animate"
          />
        </div>

        {/* Floating dots */}
        <motion.div
          className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-neutral-900 dark:bg-neutral-100 rounded-full"
          style={{ originX: 0, originY: "10px" }}
          variants={dotVariants(0)}
          animate="animate"
        />
        <motion.div
          className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-neutral-700 dark:bg-neutral-300 rounded-full"
          style={{ originX: "-10px", originY: 0 }}
          variants={dotVariants(1)}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-neutral-600 dark:bg-neutral-400 rounded-full"
          style={{ originX: 0, originY: "-10px" }}
          variants={dotVariants(2)}
          animate="animate"
        />
      </div>
    </motion.div>
  );
}
