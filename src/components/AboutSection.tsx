import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Tv, 
  Sparkles, 
  BookOpen, 
  Utensils, 
  Heart, 
  Compass, 
  UserCheck, 
  Mail, 
  Phone,
  CheckCircle2,
  GraduationCap,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AboutSection: React.FC = () => {
  // State for the single expanded passion card: only that card expands on click
  const [expandedCardKey, setExpandedCardKey] = useState<string | null>(null);

  // State for reference hover/tap
  const [activeRefIdx, setActiveRefIdx] = useState<number | null>(null);

  const { t } = useLanguage();
  const { data } = usePortfolio();

  const getInterestIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-5 h-5 text-indigo-400" />;
      case 'Tv':
        return <Tv className="w-5 h-5 text-purple-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-pink-400" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-violet-400" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section id="interests" className="py-20 border-t border-purple-500/20 relative overflow-x-hidden">
      {/* Inline styles for continuous seamless marquee without snap-back */}
      <style>{`
        @keyframes marqueeSmoothTrack {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-10 text-center px-2"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-[11px] sm:text-xs font-mono mb-2">
            <Heart className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-purple-400" />
            <span>{t.about.tag}</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-white mt-1 tracking-tight text-center">
            {data.sectionTitles?.about || t.about.title}
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/70 mt-1 max-w-xl mx-auto text-center leading-relaxed">
            {t.about.interestsSubtitle}
          </p>
        </motion.div>

        {/* Auto-running Right-to-Left Continuous Marquee Track */}
        <div className="mb-20 overflow-hidden relative py-3">
          {/* Gradient Edge Masks for smooth fade out */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

          <div
            className="flex gap-4 sm:gap-5 w-max items-start"
            style={{
              animation: 'marqueeSmoothTrack 40s linear infinite',
              animationPlayState: expandedCardKey !== null ? 'paused' : 'running',
            }}
          >
            {/* Duplicated list to allow infinite seamless marquee */}
            {[
              ...data.personalInterests,
              ...data.personalInterests,
              ...data.personalInterests,
              ...data.personalInterests,
            ].map((interest, idx) => {
              const cardKey = `${interest.id}-${idx}`;
              const isExpanded = expandedCardKey === cardKey;

              return (
                <div
                  key={cardKey}
                  onClick={() => {
                    // Click expands ONLY this tab; clicking again collapses it
                    setExpandedCardKey(prev => (prev === cardKey ? null : cardKey));
                  }}
                  onMouseLeave={() => {
                    // Once mouse leaves this specific expanded card, close it and resume running
                    if (expandedCardKey === cardKey) {
                      setExpandedCardKey(null);
                    }
                  }}
                  className={`shrink-0 transition-all duration-300 cursor-pointer p-4 rounded-2xl border flex flex-col justify-between ${
                    isExpanded
                      ? 'w-[290px] sm:w-[340px] bg-slate-900 border-purple-400 shadow-2xl shadow-purple-500/30 lavender-glow scale-105 z-20'
                      : 'w-[210px] sm:w-[240px] bg-slate-900/80 border-purple-500/20 hover:border-purple-400/50 shadow-md shadow-black/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2.5 rounded-xl border transition-colors shrink-0 ${
                        isExpanded
                          ? 'bg-purple-950 border-purple-400 text-purple-200'
                          : 'bg-slate-950 border-purple-500/20 text-purple-300'
                      }`}
                    >
                      {getInterestIcon(interest.icon)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-white leading-tight truncate">
                        {interest.title}
                      </h4>
                      <span className="text-[10px] font-mono text-purple-300/80 block mt-0.5 truncate">
                        {interest.category}
                      </span>
                    </div>
                  </div>

                  {/* ONLY this card expands and shows full info */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-3 pt-3 border-t border-purple-500/20 space-y-2 text-xs"
                    >
                      <p className="text-purple-200/90 leading-relaxed bg-purple-950/40 p-2.5 rounded-xl border border-purple-500/30">
                        {interest.detailedDesc}
                      </p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {interest.keywords.map((kw, kIdx) => (
                          <span
                            key={kw || kIdx}
                            className="text-[9px] font-mono bg-purple-500/10 text-purple-200 px-1.5 py-0.5 rounded border border-purple-500/20"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dedicated Professional References Section */}
        <div id="references" className="max-w-4xl mx-auto pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-8 px-2"
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-[11px] sm:text-xs font-mono mb-2">
              <UserCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-purple-400" />
              <span>Academic & Clinical Endorsements</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight text-center">
              {data.sectionTitles?.references || 'Professional References'}
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/70 mt-1 max-w-xl mx-auto text-center leading-relaxed">
              Academic & clinical credentials with direct institutional endorsements.
            </p>
          </motion.div>

          {/* Interactive Reference Cards - Upfront ONLY shows the name */}
          <div className="space-y-4">
            {data.references.map((ref, idx) => {
              const isHovered = activeRefIdx === idx;

              return (
                <motion.div
                  key={ref.name || idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  onMouseEnter={() => setActiveRefIdx(idx)}
                  onMouseLeave={() => setActiveRefIdx(null)}
                  onClick={() => setActiveRefIdx(prev => prev === idx ? null : idx)}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isHovered
                      ? 'bg-slate-900 border-purple-400 shadow-xl shadow-purple-500/20 lavender-glow translate-y-[-2px]'
                      : 'bg-slate-900/60 border-purple-500/20 hover:border-purple-400/40 shadow-md shadow-black/20'
                  }`}
                >
                  {/* Upfront view: ONLY the referee's name is displayed - Centered on mobile */}
                  <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-3">
                    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2.5 sm:gap-3.5 text-center sm:text-left">
                      <div className={`w-10 sm:w-11 h-10 sm:h-11 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                        isHovered 
                          ? 'bg-purple-600 border-purple-300 text-white shadow-md shadow-purple-600/30' 
                          : 'bg-purple-950/60 border-purple-500/30 text-purple-300'
                      }`}>
                        <GraduationCap className="w-4 sm:w-5 h-4 sm:h-5" />
                      </div>
                      <div>
                        {/* ONLY Name displayed first */}
                        <h4 className="font-bold text-white text-base sm:text-lg leading-snug text-center sm:text-left">
                          {ref.name}
                        </h4>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center justify-center gap-2">
                      <span className="text-[11px] font-mono text-purple-300/80 bg-purple-950/50 px-3 py-1 rounded-lg border border-purple-500/20">
                        {isHovered ? 'Details' : 'Contact'}
                      </span>
                      <span className={`text-[11px] font-mono p-1 rounded-md transition-colors ${
                        isHovered ? 'text-purple-300' : 'text-slate-500'
                      }`}>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'rotate-180' : ''}`} />
                      </span>
                    </div>
                  </div>

                  {/* Revealed on hover/click: Complete details, title, institution, phone, and email */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="mt-4 pt-4 border-t border-purple-500/20 space-y-3 text-xs sm:text-sm text-center sm:text-left"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 text-center sm:text-left">
                          <div>
                            <span className="text-[10px] uppercase font-mono text-purple-400 block">Designation / Role</span>
                            <span className="text-white font-medium">
                              <span className="sm:hidden whitespace-pre-line">{ref.title.replace(/,\s*/g, ',\n')}</span>
                              <span className="hidden sm:inline">{ref.title}</span>
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-mono text-purple-400 block">Institution</span>
                            <span className="text-white font-medium">
                              <span className="sm:hidden whitespace-pre-line">{ref.institution.replace(/,\s*/g, ',\n')}</span>
                              <span className="hidden sm:inline">{ref.institution}</span>
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-xs sm:text-sm font-mono pt-2">
                          <a
                            href={`tel:${ref.phone.replace(/[^0-9+]/g, '')}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-200 hover:bg-purple-600 hover:text-white transition-all shadow-sm group"
                          >
                            <Phone className="w-4 h-4 text-purple-400 group-hover:text-white" />
                            <span>{ref.phone}</span>
                          </a>

                          <a
                            href={`mailto:${ref.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-200 hover:bg-purple-600 hover:text-white transition-all shadow-sm group"
                          >
                            <Mail className="w-4 h-4 text-purple-400 group-hover:text-white" />
                            <span>{ref.email}</span>
                          </a>

                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-950/80 px-3 py-2 rounded-xl border border-slate-800">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Verified Faculty Referee</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
