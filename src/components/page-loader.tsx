"use client";

import { useEffect, useState } from "react";

interface PageLoaderProps {
  isLoading?: boolean;
}

export function PageLoaderComponent({ isLoading = true }: PageLoaderProps) {
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

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 transition-opacity duration-300 ${
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Animated gradient orbs */}
      <div className="relative w-20 h-20">
        {/* Outer rotating ring */}
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-neutral-900 border-r-neutral-400 dark:border-t-neutral-100 dark:border-r-neutral-600"
          style={{
            animation: "spin 2s linear infinite",
          }}
        />

        {/* Middle pulsing ring */}
        <div
          className="absolute inset-2 rounded-full border border-neutral-300 dark:border-neutral-700"
          style={{
            animation: "pulse 1.8s ease-in-out infinite",
          }}
        />

        <div className="absolute inset-4 rounded-full overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-700 dark:from-neutral-100 dark:to-neutral-300"
            style={{
              animation: "pulse 1.5s ease-in-out infinite reverse",
            }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent dark:via-white opacity-0 dark:opacity-0"
            style={{
              animation: "orbShine 1.5s ease-in infinite",
            }}
          />
        </div>

        {/* Floating dots */}
        <div
          className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-neutral-900 dark:bg-neutral-100 rounded-full"
          style={{
            animation: "orbit 2.5s linear infinite",
            transformOrigin: "0 10px",
          }}
        />
        <div
          className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-neutral-700 dark:bg-neutral-300 rounded-full"
          style={{
            animation: "orbit 2.5s linear infinite 1s",
            transformOrigin: "-10px 0",
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-neutral-600 dark:bg-neutral-400 rounded-full"
          style={{
            animation: "orbit 2.5s linear infinite 2s",
            transformOrigin: "0 -10px",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes orbit {
          from {
            transform: rotateZ(0deg) translateX(10px) rotateZ(0deg);
          }
          to {
            transform: rotateZ(360deg) translateX(10px) rotateZ(-360deg);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(0.95);
            opacity: 0.8;
          }
        }

        /* Added shine animation that sweeps across the screen */
        @keyframes shine {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.1;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        /* Added shine animation for the orb */
        @keyframes orbShine {
          0% {
            transform: translateX(-100%) rotateZ(-45deg);
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateX(100%) rotateZ(-45deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
