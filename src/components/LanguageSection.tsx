import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Languages, CheckCircle2, Sparkles, BookOpen, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageSection: React.FC = () => {
  const { data } = usePortfolio();
  const { t } = useLanguage();
  const [selectedLangId, setSelectedLangId] = useState<string | null>(null);

  const languagesList = data.languages && data.languages.length > 0 ? data.languages : [
    {
      id: 'bn',
      language: 'Bengali (বাংলা)',
      level: 'Native / First Language',
      percentage: 100,
      description: 'Mother tongue, fully bilingual in academic, clinical, and interpersonal discourse.',
    },
    {
      id: 'en',
      language: 'English',
      level: 'Professional Working Proficiency',
      percentage: 70,
      description: 'Primary medium for pharmaceutical literature review, medical writing, and clinical reports.',
    },
  ];

  return (
    <section id="languages" className="py-16 border-t border-purple-500/20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 px-2"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-[11px] sm:text-xs font-mono mb-2">
            <Languages className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-purple-400" />
            <span>Bilingual Communication</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight text-center">
            {data.sectionTitles?.languages || 'Language Proficiency'}
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/70 mt-1 max-w-lg mx-auto text-center leading-relaxed">
            Scientific, clinical, and interpersonal fluency across professional environments
          </p>
        </motion.div>

        {/* Space-conscious, interactive language cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {languagesList.map((item, idx) => {
            const isSelected = selectedLangId === item.id;
            const pct = item.percentage ?? (item.id === 'bn' ? 100 : 70);

            return (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onClick={() => setSelectedLangId(prev => prev === item.id ? null : item.id)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer group ${
                  isSelected
                    ? 'bg-slate-900 border-purple-400 shadow-xl shadow-purple-500/25 lavender-glow scale-[1.01]'
                    : 'bg-slate-900/60 border-purple-500/20 hover:border-purple-400/50 shadow-md shadow-black/20 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-2.5 sm:gap-3 mb-3">
                  <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2.5 sm:gap-3 text-center sm:text-left">
                    <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-105 group-hover:text-purple-200 transition-all shrink-0">
                      <Languages className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm sm:text-base leading-tight text-center sm:text-left">
                        {item.language}
                      </h3>
                      <span className="text-[11px] sm:text-xs text-purple-300 font-mono block mt-0.5 text-center sm:text-left">
                        {item.level}
                      </span>
                    </div>
                  </div>

                  <div className="text-center sm:text-right">
                    <span className="text-[10px] sm:text-[11px] font-mono px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-400/30 text-purple-300">
                      Fluent
                    </span>
                  </div>
                </div>

                {/* Animated Progress Bar */}
                <div className="w-full h-2 sm:h-2.5 bg-slate-950 rounded-full overflow-hidden border border-purple-500/20 mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 + idx * 0.15 }}
                    className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-400 rounded-full shadow-sm shadow-purple-500/50"
                  />
                </div>

                <p className="text-xs text-slate-300/90 leading-relaxed text-center sm:text-left">
                  {item.description}
                </p>

                {/* Interactive subtle breakdown tags */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-3 mt-3 border-t border-purple-500/15 text-[10px] font-mono text-purple-200/80">
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-purple-400" /> Fluency
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-purple-400" /> Literature & Writing
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-purple-400" /> Clinical Counseling
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
