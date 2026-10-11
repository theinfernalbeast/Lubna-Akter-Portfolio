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

  return (
    <section id="research" className="py-14 sm:py-16 border-t border-purple-500/20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Concise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-xs font-mono mb-2">
            <FlaskConical className="w-3.5 h-3.5 text-purple-400" />
            <span>{t.research.tag}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {data.sectionTitles?.research || t.research.title}
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/70 mt-1 max-w-xl mx-auto">
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
                  <span className="truncate max-w-[130px] sm:max-w-[170px]">{shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Tab Research Card Display - Concise */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.99 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-slate-900/80 border border-purple-400/40 rounded-2xl p-5 sm:p-7 shadow-xl lavender-glow space-y-4"
          >
            {/* Top Bar: Role & Status */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-purple-500/20 text-xs font-mono">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-purple-600 text-white font-semibold">
                  {currentProject.role}
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-purple-950 border border-purple-400/40 text-purple-300">
                  {currentProject.status}
                </span>
              </div>
              {currentProject.institution && (
                <span className="text-purple-300/80 text-[11px]">
                  {currentProject.institution}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {currentProject.title}
            </h3>

            {/* Image + Description Grid - Tightened */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
              <div className={currentProject.image ? "md:col-span-8 space-y-3" : "md:col-span-12 space-y-3"}>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-purple-500/20">
                  {currentProject.description}
                </p>

                {currentProject.scientificDetails && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-purple-300">
                      <BookOpen className="w-3 h-3 text-purple-400" />
                      <span>Scientific Context</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed bg-purple-950/25 p-3 rounded-xl border border-purple-500/20">
                      {currentProject.scientificDetails}
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column: Image Preview */}
              {currentProject.image && (
                <div className="md:col-span-4">
                  <div className="relative rounded-xl overflow-hidden border border-purple-500/30 aspect-4/3 bg-slate-950 shadow-md">
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

            {/* Methodology Highlights - Bullet points one by one */}
            {currentProject.highlights && currentProject.highlights.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-purple-500/20">
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-purple-300">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Key Methodology & Highlights</span>
                </div>
                <ul className="space-y-1.5">
                  {currentProject.highlights.map((highlight: string, hIdx: number) => (
                    <li
                      key={hIdx}
                      className="p-2.5 sm:p-3 rounded-xl bg-slate-950/80 border border-purple-500/20 text-xs text-slate-200 flex items-start gap-2.5 shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-1.5 shadow-sm shadow-purple-400/60" />
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
