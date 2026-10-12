import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { FlaskConical, Sparkles, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ResearchSection: React.FC = () => {
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);
  const { t } = useLanguage();
  const { data } = usePortfolio();

  const currentProject = data.researchProjects[activeTabIdx] || data.researchProjects[0];

  const highlightsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const highlightItemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="research" className="py-14 sm:py-16 border-t border-purple-500/20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Concise & Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 sm:mb-8 text-center px-2"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-[11px] sm:text-xs font-mono mb-2">
            <FlaskConical className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-purple-400" />
            <span>{t.research.tag}</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight text-center">
            {data.sectionTitles?.research || t.research.title}
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/70 mt-1 max-w-xl mx-auto text-center leading-relaxed">
            {t.research.subtitle}
          </p>
        </motion.div>

        {/* Tab Buttons Navigation - Compact */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 bg-slate-900/90 border border-purple-500/30 p-1.5 rounded-2xl shadow-lg max-w-full">
            {data.researchProjects.map((proj, idx) => {
              const isActive = activeTabIdx === idx;
              const shortTitle = proj.title.split('(')[0].trim();
              return (
                <button
                  key={proj.id}
                  onClick={() => setActiveTabIdx(idx)}
                  title={proj.title}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] sm:text-xs font-medium rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <FlaskConical className="w-3.5 h-3.5 text-purple-300 shrink-0" />
                  <span className="hidden sm:inline truncate max-w-[130px] sm:max-w-[170px]">{shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Tab Research Card Display - Instant smooth transition */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="bg-slate-900/80 border border-purple-400/40 rounded-2xl p-5 sm:p-7 shadow-xl lavender-glow space-y-4 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-purple-500/20 transform-gpu"
          >
            {/* Top Bar: Role & Status - Centered on mobile */}
            <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2.5 pb-3 border-b border-purple-500/20 text-xs font-mono">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-purple-600 text-white font-semibold text-[11px] sm:text-xs">
                  {currentProject.role}
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-purple-950 border border-purple-400/40 text-purple-300 text-[11px] sm:text-xs">
                  {currentProject.status}
                </span>
              </div>
              {currentProject.institution && (
                <span className="text-purple-300/80 text-[11px] text-center sm:text-right w-full sm:w-auto">
                  {currentProject.institution}
                </span>
              )}
            </div>

            {/* Title - Centered on mobile */}
            <h3 className="text-base sm:text-xl font-bold text-white leading-snug text-center sm:text-left">
              {currentProject.title}
            </h3>

            {/* Image + Description Grid - Tightened & Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-start">
              <div className={currentProject.image ? "md:col-span-8 space-y-3" : "md:col-span-12 space-y-3"}>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/70 p-3 sm:p-3.5 rounded-xl border border-purple-500/20 text-center md:text-left">
                  {currentProject.description}
                </p>

                {currentProject.scientificDetails && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-center md:justify-start gap-1.5 text-[11px] font-mono uppercase tracking-wider text-purple-300">
                      <BookOpen className="w-3 h-3 text-purple-400" />
                      <span>Scientific Context</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed bg-purple-950/25 p-3 rounded-xl border border-purple-500/20 text-center md:text-left">
                      {currentProject.scientificDetails}
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column: Image Preview */}
              {currentProject.image && (
                <div className="md:col-span-4 flex justify-center">
                  <div className="relative rounded-xl overflow-hidden border border-purple-500/30 aspect-4/3 bg-slate-950 shadow-md w-full max-w-[260px] md:max-w-none mx-auto">
                    <img
                      src={currentProject.image}
                      alt={currentProject.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Methodology Highlights - Staggered reveal bullet points */}
            {currentProject.highlights && currentProject.highlights.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-purple-500/20">
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-purple-300">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Key Methodology & Highlights</span>
                </div>
                <motion.ul
                  variants={highlightsContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-1.5"
                >
                  {currentProject.highlights.map((highlight: string, hIdx: number) => (
                    <motion.li
                      key={hIdx}
                      variants={highlightItemVariants}
                      className="p-2.5 sm:p-3 rounded-xl bg-slate-950/80 border border-purple-500/20 text-xs text-slate-200 flex items-start gap-2.5 shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-1.5 shadow-sm shadow-purple-400/60" />
                      <span className="leading-relaxed break-words">{highlight}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
