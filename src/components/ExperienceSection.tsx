import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Calendar, MapPin, ChevronLeft, ChevronRight, ExternalLink, History } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MilestoneItem {
  id: string;
  type: 'work' | 'venture' | 'certification' | 'extracurricular';
  title: string;
  organization: string;
  organizationUrl?: string;
  period: string;
  location?: string;
  points: string[];
}

export const ExperienceSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'experience' | 'certifications'>('all');
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useLanguage();
  const { data } = usePortfolio();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const milestones: MilestoneItem[] = [
    // Dynamic Work Experience items
    ...data.workExperience.map((item, idx) => ({
      id: `work-${idx}`,
      type: 'work' as const,
      title: item.role,
      organization: item.organization,
      organizationUrl: item.organizationUrl || (idx === 0 ? data.profile.linkedinUrl : `https://www.google.com/search?q=${encodeURIComponent(item.organization)}`),
      period: item.period,
      location: item.location,
      points: item.points || [],
    })),
    // Dynamic Entrepreneurial Ventures
    ...data.entrepreneurialExperience.map((item, idx) => ({
      id: `venture-${idx}`,
      type: 'venture' as const,
      title: item.role,
      organization: item.organization,
      organizationUrl: item.organizationUrl || data.profile.facebookUrl || `https://www.google.com/search?q=${encodeURIComponent(item.organization)}`,
      period: item.period,
      location: item.location,
      points: item.points || [],
    })),
    // Dynamic Certifications & Courses
    ...data.certifications.map((item, idx) => ({
      id: `cert-${idx}`,
      type: 'certification' as const,
      title: item.title,
      organization: item.issuer,
      organizationUrl: item.organizationUrl || `https://www.google.com/search?q=${encodeURIComponent(item.issuer)}`,
      period: item.year,
      points: item.points && item.points.length > 0 ? item.points : [item.title],
    })),
    // Dynamic Extracurricular & Voluntary
    ...(data.extraCurricular || []).map((item, idx) => ({
      id: `extra-${idx}`,
      type: 'extracurricular' as const,
      title: item.role,
      organization: item.organization,
      organizationUrl: item.organizationUrl || `https://www.google.com/search?q=${encodeURIComponent(item.organization)}`,
      period: item.period,
      points: item.points || [],
    })),
  ];

  const filteredMilestones = milestones.filter((m) => {
    if (filter === 'experience') return m.type === 'work' || m.type === 'venture';
    if (filter === 'certifications') return m.type === 'certification' || m.type === 'extracurricular';
    return true;
  });

  const getTypeBadge = (type: MilestoneItem['type']) => {
    switch (type) {
      case 'work':
        return { label: 'Work Experience', color: 'text-purple-300 bg-purple-500/15 border-purple-400/30' };
      case 'venture':
        return { label: 'Entrepreneurial Venture', color: 'text-indigo-300 bg-indigo-500/15 border-indigo-400/30' };
      case 'certification':
        return { label: 'Training & Certification', color: 'text-pink-300 bg-pink-500/15 border-pink-400/30' };
      case 'extracurricular':
        return { label: 'Affiliations & Voluntary', color: 'text-purple-300 bg-purple-500/15 border-purple-400/30' };
    }
  };

  return (
    <section id="experience" className="py-20 border-t border-purple-500/20 relative overflow-hidden">
      {/* Modern Sleek Minimalist Floating Bar - Track Completely Removed */}
      <style>{`
        .modern-sleek-scroll {
          scrollbar-width: thin;
          scrollbar-color: #a855f7 transparent;
        }
        .modern-sleek-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .modern-sleek-scroll::-webkit-scrollbar-track {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
        .modern-sleek-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #9333ea, #6366f1, #a855f7);
          border-radius: 9999px;
          border: none;
          box-shadow: 0 0 12px rgba(168, 85, 247, 0.6);
        }
        .modern-sleek-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(90deg, #a855f7, #818cf8, #c084fc);
          box-shadow: 0 0 18px rgba(192, 132, 252, 0.9);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-xs font-mono mb-2">
              <History className="w-3.5 h-3.5 text-purple-400" />
              <span>{t.timeline.tag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 tracking-tight">
              {data.sectionTitles?.experience || t.timeline.title}
            </h2>
            <p className="text-sm text-purple-200/70 mt-1 max-w-xl">
              {t.timeline.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Interactive Filter Tabs */}
            <div className="flex items-center bg-slate-900/90 border border-purple-500/20 p-1.5 rounded-xl shrink-0">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  filter === 'all'
                    ? 'bg-purple-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.timeline.all}
              </button>
              <button
                onClick={() => setFilter('experience')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  filter === 'experience'
                    ? 'bg-purple-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.timeline.work}
              </button>
              <button
                onClick={() => setFilter('certifications')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  filter === 'certifications'
                    ? 'bg-purple-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.timeline.training}
              </button>
            </div>

            {/* Sideways Scroll Control Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-2.5 rounded-xl bg-slate-900 border border-purple-500/30 text-purple-300 hover:text-white hover:bg-slate-800 transition-colors shadow-lg cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2.5 rounded-xl bg-slate-900 border border-purple-500/30 text-purple-300 hover:text-white hover:bg-slate-800 transition-colors shadow-lg cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Sideways Scrolling Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 px-2 snap-x snap-mandatory modern-sleek-scroll"
        >
          {filteredMilestones.map((item, idx) => {
            const badge = getTypeBadge(item.type);
            const isHovered = hoveredCardIndex === idx;
            const isClicked = activeCardIndex === idx;
            const isExpanded = isHovered || isClicked;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onMouseEnter={() => setHoveredCardIndex(idx)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                onClick={() => setActiveCardIndex(isClicked ? null : idx)}
                className={`snap-start shrink-0 w-[340px] sm:w-[380px] p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between relative group ${
                  isExpanded
                    ? 'bg-slate-900 border-purple-400 shadow-2xl shadow-purple-500/25 lavender-glow scale-105 z-10'
                    : 'bg-slate-900/70 border-purple-500/20 hover:border-purple-400/50 shadow-xl shadow-black/30'
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-md border ${badge.color}`}>
                      {badge.label}
                    </span>
                    <span className="text-xs font-mono text-purple-300/80 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-purple-400" />
                      {item.period}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                    {item.title}
                  </h3>

                  <div className="mb-3">
                    <a
                      href={item.organizationUrl || 'https://www.google.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-purple-300 hover:text-purple-200 hover:underline group/link"
                    >
                      <span>{item.organization}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-purple-400 opacity-70 group-hover/link:opacity-100 transition-opacity" />
                    </a>
                  </div>

                  {item.location && (
                    <div className="text-xs text-purple-300/70 font-mono flex items-center gap-1 mb-3">
                      <MapPin className="w-3 h-3 text-purple-400" />
                      {item.location}
                    </div>
                  )}

                  <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-300 border-t border-purple-500/20 pt-3">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-purple-400 mt-0.5">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-purple-500/20 flex items-center justify-between text-[11px] font-mono text-purple-400">
                  <span>{item.organizationUrl?.includes('facebook') ? 'Facebook Page' : 'Official Website / LinkedIn'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
