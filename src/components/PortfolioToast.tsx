import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

export const PortfolioToast: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed previously in this session
    try {
      const dismissed = sessionStorage.getItem('portfolio_toast_dismissed');
      if (dismissed === 'true') {
        setIsDismissed(true);
        return;
      }
    } catch {
      // In case storage is inaccessible
    }

    // Slide in smoothly after 1 second delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    try {
      sessionStorage.setItem('portfolio_toast_dismissed', 'true');
    } catch {
      // Ignore storage errors
    }
  };

  if (isDismissed || !isVisible) return null;

  return (
    <div
      dir="rtl"
      className="fixed bottom-20 lg:bottom-6 left-4 sm:left-6 z-50 max-w-sm w-[calc(100%-2rem)] sm:w-auto animate-in fade-in slide-in-from-bottom-5 duration-500"
    >
      <div className="relative bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-slate-700/80 ring-1 ring-academic-500/30 flex items-start gap-3.5 group hover:border-academic-500/60 transition-all">
        {/* Subtle accent icon */}
        <div className="w-9 h-9 rounded-xl bg-academic-600/30 text-academic-300 border border-academic-500/40 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
          <Sparkles className="w-4 h-4 text-academic-300 animate-pulse" />
        </div>

        {/* Content copy */}
        <div className="flex-1 pl-6 pr-0.5">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-academic-500/20 text-academic-200 border border-academic-400/30">
              פרויקט להצגה בתיק עבודות
            </span>
          </div>

          <p className="text-xs sm:text-sm font-bold text-slate-100 leading-snug">
            את האתר הזה הקמתי בשעתיים, דמיינו מה אוכל לעשות בשבוע 😉
          </p>
        </div>

        {/* Close Button ("✕") */}
        <button
          onClick={handleDismiss}
          className="absolute top-2.5 left-2.5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          title="סגור הודעה"
          aria-label="סגור הודעה"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PortfolioToast;
