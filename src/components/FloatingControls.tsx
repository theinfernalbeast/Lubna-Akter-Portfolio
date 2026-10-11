import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Sliders } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface FloatingControlsProps {
  onOpenDashboard: () => void;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({ onOpenDashboard }) => {
  const [showTop, setShowTop] = useState(false);
  const { t } = useLanguage();
  const { isClinical } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <aside 
      aria-label="Floating page controls"
      className="fixed right-5 sm:right-6 bottom-6 z-50 flex flex-col items-center gap-3 select-none pointer-events-none"
    >
      {/* 1. Edit Content / Admin Dashboard Button (Top) - Right side stuck to window, icon only with modern animation */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.12, rotate: 6 }}
        whileTap={{ scale: 0.92 }}
        onClick={onOpenDashboard}
        aria-label="Dashboard"
        title="Dashboard"
        className="pointer-events-auto relative w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-500 text-white shadow-xl shadow-purple-600/40 hover:shadow-purple-500/60 border border-purple-300/40 cursor-pointer group backdrop-blur-md transition-shadow"
      >
        {/* Modern ambient pulsing aura */}
        <span className="absolute -inset-1 rounded-2xl bg-purple-500/25 blur-sm group-hover:bg-purple-500/45 transition-all pointer-events-none" />
        
        {/* Sleek dashboard controls icon */}
        <Sliders className="w-5 h-5 text-purple-100 group-hover:text-white transition-colors relative z-10" />

        {/* Floating tooltip */}
        <span className="absolute right-14 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900/90 text-purple-200 border border-purple-500/30 shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
          Dashboard
        </span>
      </motion.button>

      {/* 2. Go to the Top Button - Right below the edit content button when visible */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.6, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: -12 }}
            transition={{ type: 'spring', stiffness: 420, damping: 24 }}
            whileHover={{ scale: 1.12, y: -2 }}
            whileTap={{ scale: 0.92 }}
            onClick={scrollToTop}
            aria-label={t.footer.backToTop || 'Go to top'}
            title={t.footer.backToTop || 'Go to top'}
            className={`pointer-events-auto relative p-3.5 rounded-2xl border backdrop-blur-md transition-all duration-300 cursor-pointer group ${
              isClinical
                ? 'bg-white/95 hover:bg-purple-50 text-purple-700 hover:text-purple-900 border-purple-300 shadow-xl shadow-purple-500/15'
                : 'bg-slate-900/90 hover:bg-purple-950/80 text-purple-200 hover:text-white border-purple-400/50 shadow-2xl shadow-purple-950/60'
            }`}
            style={{
              boxShadow: isClinical
                ? '0 10px 25px -5px rgba(124, 58, 237, 0.2), 0 4px 10px -2px rgba(124, 58, 237, 0.1)'
                : '0 0 24px -2px rgba(168, 85, 247, 0.35), 0 8px 16px -4px rgba(0, 0, 0, 0.6)',
            }}
          >
            {/* Subtle lavender ambient pulse ring */}
            <span className="absolute -inset-1 rounded-2xl bg-purple-500/20 blur-sm group-hover:bg-purple-500/35 transition-all pointer-events-none" />

            <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5 relative z-10" />

            {/* Floating tooltip */}
            <span className="absolute right-14 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900/90 text-purple-200 border border-purple-500/30 shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
              {t.footer.backToTop || 'Top'}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </aside>
  );
};
