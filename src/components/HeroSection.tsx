import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { ThreeMolecularViewer } from './ThreeMolecularViewer';
import { User, Box, Download, Send, ArrowRight } from 'lucide-react';
import { downloadCvFile } from '../utils/downloadCv';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import lubnaProfilePic from '../assets/images/Lubna-Akter-Pharmacist-Profile-Photo.png';

interface HeroSectionProps {
  onOpenResume?: () => void;
  onOpenContact?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const [viewMode, setViewMode] = useState<'photo' | '3d'>('photo'); // Start on user uploaded photo
  const { lang, t } = useLanguage();
  const { isClinical } = useTheme();
  const { data } = usePortfolio();

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-24 pb-14 md:pt-32 md:pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Identity & Summary */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-2.5">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border transition-colors ${
                  isClinical
                    ? 'bg-purple-50 border-purple-200 text-purple-700 shadow-sm'
                    : 'bg-purple-500/10 border-purple-400/30 text-purple-300'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isClinical ? 'bg-purple-600' : 'bg-purple-400'} animate-pulse`} />
                <span>{data.profile.subtitle || t.hero.subtitle}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight transition-colors ${
                  isClinical ? 'text-slate-900' : 'text-white'
                }`}
              >
                {t.hero.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className={`text-base sm:text-lg md:text-xl font-medium transition-colors ${
                  isClinical ? 'text-purple-700' : 'text-purple-200/90'
                }`}
              >
                {data.profile.headline || t.hero.headline}
              </motion.p>
            </div>

            {/* Authentic Professional Summary from CV */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`text-sm sm:text-base leading-relaxed max-w-2xl transition-colors ${
                isClinical ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              {t.hero.summary}
            </motion.p>

            {/* Strict Two Action Buttons As Requested: Download CV & Contact Me */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              {/* Button 1: Download CV */}
              <button
                onClick={downloadCvFile}
                className={`px-6 py-3 text-sm font-bold rounded-xl transition-all duration-300 flex items-center gap-2.5 cursor-pointer shadow-lg hover:scale-[1.02] ${
                  isClinical
                    ? 'text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-purple-500/20'
                    : 'text-slate-950 bg-gradient-to-r from-purple-400 to-indigo-300 hover:from-purple-300 hover:to-indigo-200 shadow-purple-500/25 hover:shadow-purple-500/40'
                }`}
              >
                <Download className={`w-4 h-4 stroke-[2.5] ${isClinical ? 'text-white' : 'text-slate-950'}`} />
                <span>{t.hero.downloadCv}</span>
              </button>

              {/* Button 2: Contact Me (Connected directly to Contact Form Section) */}
              <a
                href="#contact"
                onClick={handleScrollToContact}
                className={`px-6 py-3 text-sm font-semibold rounded-xl border transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] ${
                  isClinical
                    ? 'bg-white hover:bg-slate-50 text-slate-800 border-purple-200 hover:border-purple-400 shadow-slate-200/50'
                    : 'bg-slate-900/90 hover:bg-slate-800 text-purple-200 hover:text-white border-purple-500/30 hover:border-purple-400/60 shadow-black/20'
                }`}
              >
                <Send className={`w-4 h-4 ${isClinical ? 'text-purple-600' : 'text-purple-400'}`} />
                <span>{t.hero.contactMe}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isClinical ? 'text-purple-600' : 'text-purple-400'}`} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: User's Uploaded Profile Photo & 3D Interactive View */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            {/* View Mode Switcher */}
            <div className="flex items-center justify-end gap-2 mb-2.5">
              <button
                onClick={() => setViewMode('photo')}
                className={`px-3 py-1.5 text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'photo'
                    ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-500/20'
                    : isClinical
                    ? 'text-slate-600 hover:text-purple-700 bg-white border border-slate-200'
                    : 'text-slate-400 hover:text-purple-200 bg-slate-900/80 border border-slate-800'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>{t.hero.photo || 'This is Lubna ✨'}</span>
              </button>
              <button
                onClick={() => setViewMode('3d')}
                className={`px-3 py-1.5 text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === '3d'
                    ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-500/20'
                    : isClinical
                    ? 'text-slate-600 hover:text-purple-700 bg-white border border-slate-200'
                    : 'text-slate-400 hover:text-purple-200 bg-slate-900/80 border border-slate-800'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>{t.hero.view3d}</span>
              </button>
            </div>

            {viewMode === 'photo' ? (
              <div
                className={`relative rounded-2xl overflow-hidden border aspect-3/4 shadow-2xl group lavender-glow transition-all ${
                  isClinical
                    ? 'border-purple-200 bg-white shadow-slate-200/60'
                    : 'border-purple-500/30 bg-slate-900/90'
                }`}
              >
                {/* User's Uploaded Photo As-Is without alteration */}
                <img
                  src={data.profile.photoUrl || lubnaProfilePic}
                  alt="Lubna Akter - Aspiring Pharmacist"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-102"
                />

                {/* Chic Badge */}
                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-purple-500/30 text-[11px] font-mono text-purple-200 flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>This is Lubna ✨</span>
                </div>
              </div>
            ) : (
              <ThreeMolecularViewer />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
