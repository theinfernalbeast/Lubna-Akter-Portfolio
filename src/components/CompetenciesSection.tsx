import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Sparkles, CheckCircle2, Layers, Award, Cpu, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CompetenciesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'core' | 'soft' | 'computer'>('core');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const { lang, t } = useLanguage();
  const { data } = usePortfolio();

  return (
    <section id="competencies" className="py-20 border-t border-purple-500/20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-xs font-mono mb-2">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>{t.skills.tag}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 tracking-tight">
            {data.sectionTitles?.skills || t.skills.title}
          </h2>
          <p className="text-sm text-purple-200/70 mt-1.5 max-w-xl mx-auto">
            {t.skills.subtitle}
          </p>
        </motion.div>

        {/* Concise Organized Category Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-purple-500/30 p-1.5 rounded-2xl shadow-lg">
            <button
              onClick={() => setActiveTab('core')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'core'
                  ? 'bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4 text-purple-300" />
              <span>Pharmaceutical Knowledge</span>
            </button>
            <button
              onClick={() => setActiveTab('soft')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'soft'
                  ? 'bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4 text-indigo-300" />
              <span>Soft Skills & Leadership</span>
            </button>
            <button
              onClick={() => setActiveTab('computer')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'computer'
                  ? 'bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4 text-pink-300" />
              <span>Computer & Research Tools</span>
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
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {activeTab === 'core' &&
              data.coreCompetencies.map((skill, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                    selectedSkill === skill
                      ? 'bg-slate-900 border-purple-400 shadow-xl shadow-purple-500/20 lavender-glow'
                      : 'bg-slate-900/60 border-purple-500/20 hover:border-purple-400/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-500/15 border border-purple-400/30 text-purple-300 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-white">{skill}</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-purple-400 opacity-80" />
                </div>
              ))}

            {activeTab === 'soft' &&
              data.softSkills.map((skill, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                    selectedSkill === skill
                      ? 'bg-slate-900 border-indigo-400 shadow-xl shadow-indigo-500/20 lavender-glow'
                      : 'bg-slate-900/60 border-purple-500/20 hover:border-purple-400/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 group-hover:scale-110 transition-transform">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-white">{skill}</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 opacity-80" />
                </div>
              ))}

            {activeTab === 'computer' &&
              data.computerLiteracy.map((skill, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                    selectedSkill === skill
                      ? 'bg-slate-900 border-pink-400 shadow-xl shadow-pink-500/20 lavender-glow'
                      : 'bg-slate-900/60 border-purple-500/20 hover:border-purple-400/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-pink-500/15 border border-pink-400/30 text-pink-300 group-hover:scale-110 transition-transform">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-white">{skill}</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-pink-400 opacity-80" />
                </div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
