import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Menu, X, Sparkles, Atom } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { ThemeSwitcher } from './ThemeSwitcher';

interface NavbarProps {
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { isClinical } = useTheme();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isClinical
          ? isScrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-purple-200/80 shadow-md shadow-slate-200/40'
            : 'bg-transparent border-b border-transparent'
          : isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-purple-500/25 shadow-xl shadow-black/40'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* Thin, animated scroll progress bar at the top of the viewport */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-300 origin-left z-50 shadow-sm shadow-purple-500/50"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Distinctive Portfolio Logo (No text 'lubna akter') */}
          <a
            href="#"
            aria-label="Portfolio Home"
            title="Portfolio Home"
            className="group flex items-center gap-3 shrink-0 py-1 transition-all"
          >
            {/* Visually Attractive Glowing Modern Emblem */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 shadow-lg shadow-purple-500/40 group-hover:scale-105 transition-all">
              <Atom className="w-5 h-5 text-white animate-spin-slow" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-purple-300 border-2 border-slate-950 animate-ping" />
            </div>

            {/* Logo Badge Label */}
            <div className="flex items-center">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-purple-300 group-hover:text-purple-200 transition-colors flex items-center gap-1.5">
                <span>PORTFOLIO</span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a
              href="#research"
              className="hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-purple-400"
            >
              {t.nav.research}
            </a>
            <a
              href="#competencies"
              className="hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-purple-400"
            >
              {t.nav.skills}
            </a>
            <a
              href="#experience"
              className="hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-purple-400"
            >
              {t.nav.timeline}
            </a>
            <a
              href="#education"
              className="hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-purple-400"
            >
              {t.nav.education}
            </a>
            <a
              href="#languages"
              className="hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-purple-400"
            >
              Language
            </a>
            <a
              href="#interests"
              className="hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-purple-400"
            >
              Interests
            </a>
            <a
              href="#references"
              className="hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-purple-400"
            >
              References
            </a>
            <a
              href="#contact"
              className="hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-purple-400"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Zone 3: Actions (Theme Switcher only) */}
          <div className="hidden sm:flex items-center gap-2.5">
            <ThemeSwitcher />
          </div>

          {/* Mobile Right Controls: Theme + Hamburger */}
          <div className="flex sm:hidden items-center gap-1.5">
            <ThemeSwitcher />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 rounded-lg border focus:outline-none ${
                isClinical
                  ? 'bg-white border-slate-200 text-slate-700'
                  : 'bg-slate-900 border-purple-500/30 text-slate-300 hover:text-white'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-purple-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer - Central aligned links */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-b px-4 pt-3 pb-5 space-y-1 backdrop-blur-xl transition-colors text-center ${
            isClinical
              ? 'bg-white/98 border-purple-200 text-slate-800 shadow-xl'
              : 'bg-slate-950/98 border-purple-500/20 text-slate-200'
          }`}
        >
          <a
            href="#research"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center text-xs font-semibold text-slate-200 hover:text-purple-300 py-2 border-b border-purple-500/10"
          >
            {t.nav.research}
          </a>
          <a
            href="#competencies"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center text-xs font-semibold text-slate-200 hover:text-purple-300 py-2 border-b border-purple-500/10"
          >
            {t.nav.skills}
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center text-xs font-semibold text-slate-200 hover:text-purple-300 py-2 border-b border-purple-500/10"
          >
            {t.nav.timeline}
          </a>
          <a
            href="#education"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center text-xs font-semibold text-slate-200 hover:text-purple-300 py-2 border-b border-purple-500/10"
          >
            {t.nav.education}
          </a>
          <a
            href="#languages"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center text-xs font-semibold text-slate-200 hover:text-purple-300 py-2 border-b border-purple-500/10"
          >
            Language
          </a>
          <a
            href="#interests"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center text-xs font-semibold text-slate-200 hover:text-purple-300 py-2 border-b border-purple-500/10"
          >
            Interests
          </a>
          <a
            href="#references"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center text-xs font-semibold text-slate-200 hover:text-purple-300 py-2 border-b border-purple-500/10"
          >
            References
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center text-xs font-semibold text-purple-300 hover:text-white py-2"
          >
            {t.nav.contact}
          </a>
        </div>
      )}
    </header>
  );
};
