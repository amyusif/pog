import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Flag persists during client-side navigation within a single session,
// but resets when the user reloads/refreshes the browser.
export let hasLoadedInitialPage = false;

export function PageLoader() {
  const [loading, setLoading] = useState(() => !hasLoadedInitialPage);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (hasLoadedInitialPage) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    let minTimeElapsed = false;
    let pageIsLoaded = document.readyState === 'complete';

    const startTime = Date.now();
    const minDuration = 3000; // Minimum 3 seconds load time

    const handleLoad = () => {
      pageIsLoaded = true;
    };

    if (!pageIsLoaded) {
      window.addEventListener('load', handleLoad);
    }

    const interval = setInterval(() => {
      if (!isMounted) return;

      const elapsed = Date.now() - startTime;
      if (elapsed >= minDuration) {
        minTimeElapsed = true;
      }

      setProgress((prev) => {
        // Once 3 seconds pass AND the page is loaded, complete to 100%
        if (minTimeElapsed && pageIsLoaded) {
          if (prev >= 100) {
            clearInterval(interval);
            hasLoadedInitialPage = true;
            window.dispatchEvent(new Event('pageloader-complete'));
            setTimeout(() => setLoading(false), 400);
            return 100;
          }
          return Math.min(prev + 8, 100);
        }

        // Cap at 90% until minimum duration and page load are complete
        if (prev >= 90) {
          return 90;
        }

        // Smooth progress toward 90% over the 3-second window
        const targetProgress = Math.min(Math.floor((elapsed / minDuration) * 90), 90);
        return Math.max(prev, targetProgress);
      });
    }, 40);

    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!loading && hasLoadedInitialPage) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="initial-page-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: -30, 
            transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#080707] flex flex-col items-center justify-center select-none"
        >
          {/* Logo container */}
          <div className="relative w-56 md:w-72 h-36 md:h-44 flex items-center justify-center mb-8">
            {/* Grey Background Logo */}
            <img
              src="/logo.png"
              alt="POG Logo Grey"
              className="absolute inset-0 w-full h-full object-contain filter grayscale opacity-25"
            />
            {/* Color Logo Reveal Overlay */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-100 ease-out"
              style={{
                clipPath: `inset(${100 - progress}% 0 0 0)`
              }}
            >
              <img
                src="/logo.png"
                alt="POG Logo Color"
                className="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(212,50,12,0.4)]"
              />
            </div>
          </div>

          {/* Progress Bar & Percentage */}
          <div className="w-48 md:w-64 flex flex-col items-center gap-3">
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-primary/50 via-primary to-primary transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-white/50 font-medium">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
