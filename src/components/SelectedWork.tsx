import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp, FolderX, Layers, RotateCcw, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../context/DataContext';
import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ProjectCard } from './ProjectCard';
import { MobileProjectCarousel } from './MobileProjectCarousel';

interface SelectedWorkProps {
  onSelectProject: (project: Project) => void;
  onOpenAllProjectsSite: () => void;
}

const INITIAL_LIMIT = 6;

export const SelectedWork: React.FC<SelectedWorkProps> = ({ 
  onSelectProject,
  onOpenAllProjectsSite 
}) => {
  const { projects } = useData();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAll, setShowAll] = useState<boolean>(true);
  const { t } = useLanguage();

  const tabs = [
    { id: 'all', label: t.work.tabs.all },
    { id: 'financial', label: t.work.tabs.financial },
    { id: 'health', label: t.work.tabs.health },
    { id: 'marketing', label: t.work.tabs.marketing },
    { id: 'realestate-environment', label: t.work.tabs['realestate-environment'] },
  ];

  const localizedProjects = projects.map((proj) => {
    const loc = t.projects.find((p) => p.id === proj.id);
    if (!loc) return proj;
    return {
      ...proj,
      title: loc.title || proj.title,
      categoryLabel: loc.categoryLabel || proj.categoryLabel,
      description: loc.description || proj.description,
      story: loc.story || proj.story,
      medium: loc.medium || proj.medium
    };
  });

  // Featured projects for mobile carousel
  const mobileFeaturedProjects = localizedProjects.filter((p) => p.featured || true);

  const filteredProjects = localizedProjects.filter((p) => {
    // Category filter
    const matchesCategory = activeTab === 'all'
      ? true
      : activeTab === 'financial'
      ? ['financial', 'legal', 'credit'].includes(p.category)
      : activeTab === 'health'
      ? ['health', 'medical'].includes(p.category)
      : activeTab === 'marketing'
      ? ['marketing', 'tourism', 'non-profit'].includes(p.category)
      : activeTab === 'realestate-environment'
      ? ['realestate', 'renewable-energy', 'environmental'].includes(p.category)
      : true;

    if (!matchesCategory) return false;

    // Search query filter
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      p.title.toLowerCase().includes(q) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.medium && p.medium.toLowerCase().includes(q)) ||
      (p.client && p.client.toLowerCase().includes(q))
    );
  });

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_LIMIT);
  const hasMoreProjects = filteredProjects.length > INITIAL_LIMIT;

  const handleToggleShow = () => {
    if (showAll) {
      setShowAll(false);
      const workSection = document.getElementById('work');
      if (workSection) {
        workSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setShowAll(true);
    }
  };

  return (
    <section id="work" className="py-16 sm:py-20 bg-[#fcfcfd] dark:bg-[#0b0b0c] border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#d90429]" />
              <span className="font-body text-xs font-bold uppercase tracking-widest text-[#d90429]">
                {t.work.tag}
              </span>
            </div>
            <h2 className="font-condensed text-5xl sm:text-7xl font-normal text-[#0f0f10] dark:text-white uppercase tracking-tight">
              {t.work.title}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Button to show all projects in a separate site */}
            <button
              onClick={onOpenAllProjectsSite}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0f0f10] dark:bg-neutral-800 hover:bg-[#d90429] dark:hover:bg-[#d90429] text-white font-body text-xs font-bold tracking-widest uppercase transition-all duration-300 border border-neutral-700 hover:border-[#d90429] shadow-sm hover:shadow-md active:scale-95 group cursor-pointer"
              title="Open full projects repository"
            >
              <Layers className="w-3.5 h-3.5 text-[#d90429] group-hover:text-white transition-colors" />
              <span>{t.work.viewAllSeparateSiteShort}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 font-body text-xs font-bold tracking-widest uppercase text-[#d90429] hover:text-[#0f0f10] dark:hover:text-white transition-colors group px-2 py-1"
            >
              <span>{t.work.startProject}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.div>

        {/* 1. MOBILE VIEW: AUTOPLAY CAROUSEL (Displayed exclusively on mobile screens < md) */}
        <div className="block md:hidden mb-6">
          <MobileProjectCarousel
            projects={mobileFeaturedProjects}
            onSelectProject={onSelectProject}
            onOpenAllProjectsSite={onOpenAllProjectsSite}
          />
        </div>

        {/* 2. DESKTOP & TABLET VIEW: FULL FILTERABLE GRID (Displayed on md: and up) */}
        <div className="hidden md:block">
          
          {/* Filter & Search Bar Controls */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 mb-10 border-b border-neutral-200 dark:border-neutral-800"
          >
            {/* Filter Navigation Tabs */}
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                  }}
                  className={`px-4 py-2 font-body text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#0f0f10] dark:bg-white text-white dark:text-black border-b-2 border-[#d90429]'
                      : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Box Input */}
            <div className="relative w-full lg:w-80 shrink-0 group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-[#d90429] transition-colors duration-300 pointer-events-none z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                placeholder={t.work.searchPlaceholder}
                className="w-full bg-white dark:bg-[#121214] border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white pl-10 pr-9 py-2 text-xs font-body focus:outline-none focus:border-[#d90429] dark:focus:border-[#d90429] focus:ring-2 focus:ring-[#d90429]/20 focus:shadow-[0_0_18px_rgba(217,4,41,0.25)] transition-all duration-300 rounded-none placeholder:text-neutral-500"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#d90429] transition-colors p-1"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Friendly Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="py-16 px-6 text-center border border-dashed border-neutral-300 dark:border-neutral-800 bg-white/50 dark:bg-[#121214]/50 my-6 max-w-2xl mx-auto rounded-none"
            >
              <div className="w-14 h-14 rounded-full bg-neutral-100 dark:bg-neutral-800/80 text-[#d90429] flex items-center justify-center mx-auto mb-4 shadow-inner">
                <FolderX className="w-7 h-7" />
              </div>

              <h3 className="font-condensed text-2xl font-bold uppercase text-neutral-900 dark:text-white mb-2 tracking-tight">
                {t.work.noResultsTitle}
              </h3>

              {searchQuery && (
                <p className="font-body text-xs font-bold uppercase tracking-wider text-[#d90429] mb-3">
                  {t.work.noResultsMatching}: "{searchQuery}"
                </p>
              )}

              <p className="font-body text-xs text-neutral-600 dark:text-neutral-400 mb-6 max-w-md mx-auto leading-relaxed">
                {t.work.noResultsDesc}
              </p>

              <button
                onClick={() => { setSearchQuery(''); setActiveTab('all'); setShowAll(false); }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f0f10] dark:bg-white text-white dark:text-black font-body text-xs font-bold uppercase tracking-widest hover:bg-[#d90429] dark:hover:bg-[#d90429] dark:hover:text-white transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.work.clearSearch}</span>
              </button>
            </motion.div>
          )}

          {/* Grid matching the layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  idx={idx}
                  onSelectProject={onSelectProject}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Show More / Show Less Toggle Button & Separate Site CTA */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            {hasMoreProjects && (
              <button
                onClick={handleToggleShow}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#0f0f10] dark:bg-neutral-900 border border-neutral-800 hover:border-[#d90429] text-white font-body text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-xl hover:shadow-[#d90429]/10 cursor-pointer overflow-hidden"
              >
                <span className="relative z-10 transition-colors group-hover:text-white">
                  {showAll ? t.work.showLess : `${t.work.showMore} (${filteredProjects.length - INITIAL_LIMIT})`}
                </span>
                <span className="relative z-10 w-6 h-6 rounded-full bg-neutral-800 group-hover:bg-[#d90429] flex items-center justify-center transition-colors">
                  {showAll ? (
                    <ChevronUp className="w-4 h-4 text-neutral-300 group-hover:text-white" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-300 group-hover:text-white" />
                  )}
                </span>
                <div className="absolute inset-0 bg-[#d90429] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
              </button>
            )}

            <button
              onClick={onOpenAllProjectsSite}
              className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-100 dark:bg-neutral-800 hover:bg-[#d90429] dark:hover:bg-[#d90429] text-[#0f0f10] dark:text-white hover:text-white font-body text-xs font-bold uppercase tracking-widest border border-neutral-300 dark:border-neutral-700 hover:border-[#d90429] transition-all duration-300 shadow-sm hover:shadow-lg cursor-pointer"
            >
              <Layers className="w-4 h-4 text-[#d90429] group-hover:text-white transition-colors" />
              <span>{t.work.viewAllSeparateSite}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

