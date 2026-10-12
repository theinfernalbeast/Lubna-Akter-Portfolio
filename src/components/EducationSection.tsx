import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { GraduationCap, School, ExternalLink, Calendar, MapPin, Award, BookOpen, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const EducationSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { t } = useLanguage();
  const { data } = usePortfolio();

  return (
    <section id="education" className="py-12 sm:py-16 border-t border-purple-500/20 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Section Header - Compact & Elegant */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 sm:mb-8 text-center px-2"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-[11px] sm:text-xs font-mono mb-2 shadow-sm">
            <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
            <span>{t.education.tag}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {data.sectionTitles?.education || t.education.title}
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/70 mt-1 max-w-md mx-auto leading-relaxed">
            {t.education.subtitle}
          </p>
        </motion.div>

        {/* Education List - Compact Cards */}
        <div className="space-y-2.5 sm:space-y-3">
          {data.education.map((item, idx) => {
            const isExpanded = hoveredIndex === idx || activeIndex === idx;

            const institutionName = item.institution || '';
            const instituteLink = item.institutionUrl || `https://www.google.com/search?q=${encodeURIComponent(institutionName)}`;

            // Resilient data fallbacks in case of cached storage
            const displayTimeline = item.timeline || (item as any).yearStatus?.split('•')[0]?.trim() || '';
            const displayLocation = item.location || (item as any).yearStatus?.split('•')[1]?.trim() || 'Dhaka, Bangladesh';
            const displayGroup = item.group || (item.discipline.includes('HSC') || item.discipline.includes('SSC') ? 'Science Group' : item.discipline.includes('B. Pharm') ? 'Faculty of Pharmacy' : '');

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className={`rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md ${
                  isExpanded
                    ? 'bg-slate-900/95 border-purple-400 shadow-lg shadow-purple-500/15 lavender-glow ring-1 ring-purple-400/30'
                    : 'bg-slate-900/60 border-purple-500/20 hover:border-purple-400/40 shadow-sm hover:bg-slate-900/80'
                }`}
              >
                {/* Card Header: Shows Certification Title Only by Default */}
                <div className="py-2.5 px-3.5 sm:py-3 sm:px-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 sm:gap-3 w-full md:w-auto justify-center md:justify-start text-center md:text-left">
                    <div className={`hidden md:flex w-8 h-8 rounded-lg items-center justify-center shrink-0 border transition-colors ${
                      isExpanded
                        ? 'bg-purple-600/30 border-purple-400/50 text-white'
                        : 'bg-purple-950/60 border-purple-500/30 text-purple-300'
                    }`}>
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-white tracking-wide">
                        {item.discipline}
                      </h3>
                    </div>
                  </div>

                  {/* Dropdown Arrow: Exactly matches Reference Section styling */}
                  <div className="flex items-center justify-center gap-2 shrink-0">
                    <span className="hidden sm:inline-block text-[11px] font-mono text-purple-300/80 bg-purple-950/50 px-2.5 py-0.5 rounded-lg border border-purple-500/20">
                      {isExpanded ? 'Details' : 'Expand'}
                    </span>
                    <span className={`text-[11px] font-mono p-1 rounded-md transition-colors ${
                      isExpanded ? 'text-purple-300' : 'text-slate-500'
                    }`}>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </span>
                  </div>
                </div>

                {/* Dropdown Content: Appears Smoothly on Hover (Desktop) & Tap (Mobile) */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="border-t border-purple-500/20 bg-slate-950/60 px-3.5 sm:px-5 py-3 sm:py-3.5 space-y-2.5 overflow-hidden text-center md:text-left"
                    >
                      {/* Institution - Separate Line (Without UITS) */}
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-2 sm:gap-2.5">
                        <div className="hidden md:flex p-1.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 mt-0.5 shrink-0">
                          <School className="w-3.5 h-3.5" />
                        </div>
                        <div className="w-full">
                          <span className="text-[10px] sm:text-[11px] font-mono text-purple-300/70 block">Institution</span>
                          <a
                            href={instituteLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs sm:text-sm font-semibold text-white hover:text-purple-300 inline-flex items-center justify-center md:justify-start gap-1.5 transition-colors mt-0.5 no-underline group/link"
                          >
                            <span>{institutionName}</span>
                            <ExternalLink className="w-3 h-3 text-purple-400 opacity-60 group-hover/link:opacity-100 transition-opacity" />
                          </a>
                        </div>
                      </div>

                      {/* Year / Timeline - Separate Line with Icon */}
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-2 sm:gap-2.5 pt-2 border-t border-purple-500/10">
                        <div className="hidden md:flex p-1.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 mt-0.5 shrink-0">
                          <Calendar className="w-3.5 h-3.5" />
                        </div>
                        <div className="w-full">
                          <span className="text-[10px] sm:text-[11px] font-mono text-purple-300/70 block">Timeline / Year</span>
                          <span className="text-xs sm:text-sm font-medium text-slate-200 mt-0.5 block">
                            {displayTimeline}
                          </span>
                        </div>
                      </div>

                      {/* Location - Separate Line with Icon */}
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-2 sm:gap-2.5 pt-2 border-t border-purple-500/10">
                        <div className="hidden md:flex p-1.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 mt-0.5 shrink-0">
                          <MapPin className="w-3.5 h-3.5" />
                        </div>
                        <div className="w-full">
                          <span className="text-[10px] sm:text-[11px] font-mono text-purple-300/70 block">Location</span>
                          <span className="text-xs sm:text-sm font-medium text-slate-200 mt-0.5 block">
                            {displayLocation}
                          </span>
                        </div>
                      </div>

                      {/* Group / Faculty - Separate Line with Icon (if present) */}
                      {displayGroup && (
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-2 sm:gap-2.5 pt-2 border-t border-purple-500/10">
                          <div className="hidden md:flex p-1.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 mt-0.5 shrink-0">
                            <BookOpen className="w-3.5 h-3.5" />
                          </div>
                          <div className="w-full">
                            <span className="text-[10px] sm:text-[11px] font-mono text-purple-300/70 block">Group / Faculty</span>
                            <span className="text-xs sm:text-sm font-semibold text-purple-200 mt-0.5 block">
                              {displayGroup}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Academic Result / Grade - Aligned & Professional */}
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-2 sm:gap-2.5 pt-2 border-t border-purple-500/10">
                        <div className="hidden md:flex p-1.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
                          <Award className="w-3.5 h-3.5" />
                        </div>
                        <div className="w-full">
                          <span className="text-[10px] sm:text-[11px] font-mono text-purple-300/70 block">Academic Achievement / Result</span>
                          <div className="mt-1 flex justify-center md:justify-start">
                            <span className="inline-block text-xs font-bold font-mono text-purple-200 bg-purple-900/60 px-3 py-0.5 rounded-md border border-purple-400/40 shadow-sm">
                              {item.result}
                            </span>
                          </div>
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
    </section>
  );
};
