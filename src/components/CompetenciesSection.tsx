import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Sparkles, Layers, Award, Cpu, Users, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CompetenciesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'core' | 'soft' | 'computer' | null>('core');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const { t } = useLanguage();
  const { data } = usePortfolio();

  const handleTabClick = (tab: 'core' | 'soft' | 'computer') => {
    setActiveTab(prev => (prev === tab ? null : tab));
  };

  return (
    <section id="competencies" className="py-20 border-t border-purple-500/20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-10 text-center px-2"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-[11px] sm:text-xs font-mono mb-2">
            <Layers className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-purple-400" />
            <span>{t.skills.tag}</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-white mt-1 tracking-tight text-center">
            {data.sectionTitles?.skills || t.skills.title}
          </h2>
        </motion.div>

        {/* Icon-based navigation for mobile (< 768px), full labels on desktop */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-row items-center justify-center gap-2 bg-slate-900/90 border border-purple-500/30 p-1.5 rounded-2xl shadow-lg max-w-full">
            <button
              onClick={() => handleTabClick('core')}
              title="Pharmaceutical Knowledge"
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'core'
                  ? 'bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4 text-purple-300 shrink-0" />
              <span className="hidden md:inline">Pharmaceutical Knowledge</span>
            </button>
            <button
              onClick={() => handleTabClick('soft')}
              title="Soft Skills & Leadership"
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'soft'
                  ? 'bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4 text-indigo-300 shrink-0" />
              <span className="hidden md:inline">Soft Skills & Leadership</span>
            </button>
            <button
              onClick={() => handleTabClick('computer')}
              title="Computer & Tools"
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'computer'
                  ? 'bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4 text-pink-300 shrink-0" />
              <span className="hidden md:inline">Computer & Tools</span>
            </button>
          </div>
        </div>

        {/* Concise Organized Active Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
          >
            {activeTab === 'core' &&
              data.coreCompetencies.map((skill, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                  className={`p-3.5 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-center sm:text-left gap-3 group ${
                    selectedSkill === skill
                      ? 'bg-slate-900 border-purple-400 shadow-xl shadow-purple-500/20 lavender-glow'
                      : 'bg-slate-900/60 border-purple-500/20 hover:border-purple-400/50'
                  }`}
                >
                  <div className="flex items-center gap-3 text-left">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-purple-500/15 border border-purple-400/30 text-purple-300 group-hover:scale-110 transition-transform shrink-0">
                      <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-white">{skill}</span>
                  </div>
                  <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-purple-400 opacity-80 shrink-0 hidden sm:block" />
                </div>
              ))}

            {activeTab === 'soft' &&
              data.softSkills.map((skill, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                  className={`p-3.5 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-center sm:text-left gap-3 group ${
                    selectedSkill === skill
                      ? 'bg-slate-900 border-indigo-400 shadow-xl shadow-indigo-500/20 lavender-glow'
                      : 'bg-slate-900/60 border-purple-500/20 hover:border-purple-400/50'
                  }`}
                >
                  <div className="flex items-center gap-3 text-left">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 group-hover:scale-110 transition-transform shrink-0">
                      <Users className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-white">{skill}</span>
                  </div>
                  <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-indigo-400 opacity-80 shrink-0 hidden sm:block" />
                </div>
              ))}

            {activeTab === 'computer' &&
              data.computerLiteracy.map((skill, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                  className={`p-3.5 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-center sm:text-left gap-3 group ${
                    selectedSkill === skill
                      ? 'bg-slate-900 border-pink-400 shadow-xl shadow-pink-500/20 lavender-glow'
                      : 'bg-slate-900/60 border-purple-500/20 hover:border-purple-400/50'
                  }`}
                >
                  <div className="flex items-center gap-3 text-left">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-pink-500/15 border border-pink-400/30 text-pink-300 group-hover:scale-110 transition-transform shrink-0">
                      <Cpu className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-white">{skill}</span>
                  </div>
                  <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-pink-400 opacity-80 shrink-0 hidden sm:block" />
                </div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
