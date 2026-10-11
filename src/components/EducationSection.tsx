import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { GraduationCap, School, Calendar, ExternalLink, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const EducationSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { lang, t } = useLanguage();
  const { data } = usePortfolio();

  return (
    <section id="education" className="py-20 border-t border-purple-500/20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-xs font-mono mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
            <span>{t.education.tag}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 tracking-tight">
            {data.sectionTitles?.education || t.education.title}
          </h2>
          <p className="text-sm text-purple-200/70 mt-1 max-w-xl mx-auto">
            {t.education.subtitle}
          </p>
        </motion.div>

        {/* Vertical Stack in a Row / List */}
        <div className="space-y-4">
          {data.education.map((item, idx) => {
            const isHovered = hoveredIndex === idx;
            const isActive = activeIndex === idx;
            const isExpanded = isHovered || isActive;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setActiveIndex(isActive ? null : idx)}
                className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer relative group ${
                  isExpanded
                    ? 'bg-slate-900 border-purple-400 shadow-xl shadow-purple-500/20 lavender-glow scale-[1.01]'
                    : 'bg-slate-900/60 border-purple-500/20 hover:border-purple-400/50 shadow-md'
                }`}
              >
                {/* Default Row View: Education Level & Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border transition-colors ${
                      isExpanded
                        ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-500/30'
                        : 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                    }`}>
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-200 transition-colors">
                        {item.discipline}
                      </h3>
                      <span className="text-xs font-mono text-purple-300/80 block mt-0.5 sm:hidden">
                        {item.institution}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-950/80 border border-purple-400/40 text-purple-300 shadow-sm">
                      {item.badge || item.result}
                    </span>
                    <span className="text-xs font-mono text-purple-400 hidden sm:inline">
                      {isExpanded ? '▲ Details' : '▼ Details'}
                    </span>
                  </div>
                </div>

                {/* Expanded Details on Hover / Click */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-4 pt-4 border-t border-purple-500/20 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider block">
                          Institution
                        </span>
                        <a
                          href={`https://www.google.com/search?q=${encodeURIComponent(item.institution)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-white font-semibold flex items-center gap-1.5 hover:text-purple-300 hover:underline transition-colors group/link"
                        >
                          <School className="w-4 h-4 text-purple-400 shrink-0" />
                          <span>{item.institution}</span>
                          <ExternalLink className="w-3 h-3 text-purple-400 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </a>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider block">
                          Year & Location
                        </span>
                        <div className="text-slate-300 font-mono flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>{item.yearStatus}</span>
                        </div>
                      </div>

                      <div className="space-y-1 sm:text-right">
                        <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider block">
                          Result / GPA
                        </span>
                        <span className="inline-block text-sm font-bold font-mono text-purple-200 bg-purple-950/80 px-3 py-0.5 rounded-lg border border-purple-400/40 shadow">
                          {item.result}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
