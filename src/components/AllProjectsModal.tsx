import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  ExternalLink, 
  ArrowUpRight, 
  ArrowLeft, 
  Filter, 
  SlidersHorizontal, 
  Grid3X3, 
  LayoutGrid, 
  List, 
  Sparkles, 
  FolderX, 
  RotateCcw,
  Globe,
  Share2,
  Calendar,
  Layers,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Project } from '../types';
import { BrandLogo } from './BrandLogo';

interface AllProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export const AllProjectsModal: React.FC<AllProjectsModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const { projects } = useData();
  const { t, language, toggleLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'alpha' | 'featured'>('featured');
  const [viewLayout, setViewLayout] = useState<'grid' | 'compact' | 'list'>('grid');
  const [onlyFeatured, setOnlyFeatured] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const tabs = [
    { id: 'all', label: t.work.tabs.all },
    { id: 'financial', label: t.work.tabs.financial },
    { id: 'health', label: t.work.tabs.health },
    { id: 'marketing', label: t.work.tabs.marketing },
    { id: 'realestate-environment', label: t.work.tabs['realestate-environment'] },
  ];

  // Map localized content
  const localizedProjects = useMemo(() => {
    return projects.map((proj) => {
      const loc = t.projects.find((p) => p.id === proj.id);
      if (!loc) return proj;
      return {
        ...proj,
        title: loc.title || proj.title,
        categoryLabel: loc.categoryLabel || proj.categoryLabel,
        description: loc.description || proj.description,
        story: loc.story || proj.story,
        medium: loc.medium || proj.medium,
      };
    });
  }, [projects, t.projects]);

  // Filtering & Sorting logic
  const filteredAndSortedProjects = useMemo(() => {
    let list = localizedProjects.filter((p) => {
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

      // Only featured
      if (onlyFeatured && !p.featured) return false;

      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        p.title.toLowerCase().includes(q) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.medium && p.medium.toLowerCase().includes(q)) ||
        (p.client && p.client.toLowerCase().includes(q)) ||
        (p.techStack && p.techStack.some((tech) => tech.toLowerCase().includes(q)))
      );
    });

    // Sorting
    return list.sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (b.year || '2024').localeCompare(a.year || '2024');
      }
      if (sortBy === 'latest') {
        return (b.year || '2024').localeCompare(a.year || '2024');
      }
      if (sortBy === 'oldest') {
        return (a.year || '2024').localeCompare(b.year || '2024');
      }
      if (sortBy === 'alpha') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [localizedProjects, activeTab, onlyFeatured, searchQuery, sortBy]);

  const handleOpenStandaloneTab = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('view', 'projects');
    window.open(url.toString(), '_blank');
  };

  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('view', 'projects');
    navigator.clipboard.writeText(url.toString());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] overflow-y-auto bg-[#fcfcfd] dark:bg-[#0b0b0c] text-[#0f0f10] dark:text-neutral-100 flex flex-col transition-colors duration-300">
      
      {/* Top Standalone Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0f0f10]/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand & Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-[#d90429] dark:hover:bg-[#d90429] text-neutral-800 dark:text-neutral-200 hover:text-white dark:hover:text-white transition-all text-xs font-bold uppercase tracking-wider group cursor-pointer"
              title={t.allProjectsPage.backHome}
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="hidden sm:inline">{t.allProjectsPage.backHome}</span>
            </button>

            <div className="h-6 w-px bg-neutral-300 dark:bg-neutral-800 hidden sm:block" />

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0f0f10] dark:bg-white text-white dark:text-black flex items-center justify-center p-1.5 shadow-sm">
                <BrandLogo className="w-full h-full text-[#d90429]" />
              </div>
              <div>
                <h1 className="font-condensed text-xl sm:text-2xl font-bold uppercase tracking-tight leading-none text-[#0f0f10] dark:text-white">
                  PEDRO BARRIOS <span className="text-[#d90429]">•</span> ARCHIVE
                </h1>
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {localizedProjects.length} {t.allProjectsPage.totalCount}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions & Close */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Open in Standalone Tab */}
            <button
              onClick={handleOpenStandaloneTab}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-bold uppercase tracking-wider transition-colors border border-neutral-200 dark:border-neutral-700"
              title={t.allProjectsPage.openNewTab}
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#d90429]" />
              <span>{t.allProjectsPage.openNewTab}</span>
            </button>

            {/* Share / Copy Link */}
            <button
              onClick={handleShare}
              className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-[#d90429] transition-colors"
              title="Copy Standalone Link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:text-[#d90429] transition-colors"
            >
              {language === 'en' ? 'ES' : 'EN'}
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-amber-400 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-lg bg-[#0f0f10] dark:bg-neutral-800 text-white hover:bg-[#d90429] dark:hover:bg-[#d90429] transition-colors cursor-pointer ml-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Catalog Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        
        {/* Hero Title Section */}
        <div className="mb-10 pb-8 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-[#d90429]" />
            <span className="font-body text-xs font-bold uppercase tracking-widest text-[#d90429]">
              {t.allProjectsPage.tag}
            </span>
          </div>
          <h2 className="font-condensed text-5xl sm:text-7xl font-normal text-[#0f0f10] dark:text-white uppercase tracking-tight">
            {t.allProjectsPage.title}
          </h2>
          <p className="font-body text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl mt-3 leading-relaxed">
            {t.allProjectsPage.subtitle}
          </p>
        </div>

        {/* Filter Controls & Search Toolbar */}
        <div className="space-y-4 mb-8">
          
          {/* Category Tabs & Featured Toggle */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
              {tabs.map((tab) => {
                const count = tab.id === 'all'
                  ? localizedProjects.length
                  : tab.id === 'financial'
                  ? localizedProjects.filter((p) => ['financial', 'legal', 'credit'].includes(p.category)).length
                  : tab.id === 'health'
                  ? localizedProjects.filter((p) => ['health', 'medical'].includes(p.category)).length
                  : tab.id === 'marketing'
                  ? localizedProjects.filter((p) => ['marketing', 'tourism', 'non-profit'].includes(p.category)).length
                  : localizedProjects.filter((p) => ['realestate', 'renewable-energy', 'environmental'].includes(p.category)).length;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 font-body text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                      activeTab === tab.id
                        ? 'bg-[#0f0f10] dark:bg-white text-white dark:text-black border-b-2 border-[#d90429]'
                        : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      activeTab === tab.id 
                        ? 'bg-neutral-800 dark:bg-neutral-200 text-white dark:text-black' 
                        : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Featured Only Filter Toggle */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setOnlyFeatured(!onlyFeatured)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                  onlyFeatured
                    ? 'bg-[#d90429] text-white border-[#d90429] shadow-md shadow-[#d90429]/30'
                    : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Only</span>
              </button>
            </div>

          </div>

          {/* Search, Sort, and Layout Switcher Row */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-[#d90429] transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.work.searchPlaceholder}
                className="w-full bg-white dark:bg-[#121214] border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white pl-10 pr-9 py-2.5 text-xs font-body focus:outline-none focus:border-[#d90429] focus:ring-1 focus:ring-[#d90429] transition-all placeholder:text-neutral-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#d90429] p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort & Layout Controls */}
            <div className="flex items-center gap-2.5 shrink-0 justify-between md:justify-end">
              
              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 bg-white dark:bg-[#121214] border border-neutral-300 dark:border-neutral-800 px-3 py-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  {t.allProjectsPage.sortBy}:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 focus:outline-none cursor-pointer"
                >
                  <option value="featured" className="dark:bg-neutral-900">Featured First</option>
                  <option value="latest" className="dark:bg-neutral-900">{t.allProjectsPage.sortLatest}</option>
                  <option value="oldest" className="dark:bg-neutral-900">{t.allProjectsPage.sortOldest}</option>
                  <option value="alpha" className="dark:bg-neutral-900">{t.allProjectsPage.sortAlpha}</option>
                </select>
              </div>

              {/* View Layout Switcher */}
              <div className="flex items-center bg-white dark:bg-[#121214] border border-neutral-300 dark:border-neutral-800 p-1">
                <button
                  onClick={() => setViewLayout('grid')}
                  className={`p-1.5 rounded transition-colors ${
                    viewLayout === 'grid' 
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-black' 
                      : 'text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                  title="Grid View"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewLayout('compact')}
                  className={`p-1.5 rounded transition-colors ${
                    viewLayout === 'compact' 
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-black' 
                      : 'text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                  title="Compact Bento View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewLayout('list')}
                  className={`p-1.5 rounded transition-colors ${
                    viewLayout === 'list' 
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-black' 
                      : 'text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Empty State */}
        {filteredAndSortedProjects.length === 0 && (
          <div className="py-20 px-6 text-center border border-dashed border-neutral-300 dark:border-neutral-800 bg-white/50 dark:bg-[#121214]/50 my-8 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[#d90429] flex items-center justify-center mx-auto mb-4">
              <FolderX className="w-8 h-8" />
            </div>
            <h3 className="font-condensed text-2xl font-bold uppercase text-neutral-900 dark:text-white mb-2">
              {t.work.noResultsTitle}
            </h3>
            <p className="font-body text-xs text-neutral-500 dark:text-neutral-400 mb-6 max-w-sm mx-auto">
              {t.work.noResultsDesc}
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveTab('all'); setOnlyFeatured(false); }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f0f10] dark:bg-white text-white dark:text-black font-body text-xs font-bold uppercase tracking-widest hover:bg-[#d90429] transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.work.clearSearch}</span>
            </button>
          </div>
        )}

        {/* RESULTS: Grid View */}
        {viewLayout === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredAndSortedProjects.map((project) => (
              <div
                key={project.id}
                className="group relative flex flex-col justify-between overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] transition-all duration-300 hover:shadow-2xl hover:shadow-[#d90429]/15 hover:border-neutral-400 dark:hover:border-neutral-700"
              >
                {/* Visual Image */}
                <div 
                  onClick={() => onSelectProject(project)}
                  className="relative h-[260px] sm:h-[300px] overflow-hidden bg-neutral-900 cursor-pointer"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 bg-[#d90429] text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                      <span>{t.allProjectsPage.quickView}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest border-l-2 border-[#d90429]">
                      {project.categoryLabel}
                    </span>
                    {project.featured && (
                      <span className="px-2 py-1 bg-[#d90429] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  {project.year && (
                    <div className="absolute top-3.5 right-3.5 z-10 bg-black/80 backdrop-blur-md px-2.5 py-1 text-white text-[10px] font-bold">
                      {project.year}
                    </div>
                  )}
                </div>

                {/* Details Footer */}
                <div className="p-6 bg-[#0f0f10] text-white flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 
                        onClick={() => onSelectProject(project)}
                        className="font-condensed text-2xl font-bold uppercase tracking-tight text-white group-hover:text-[#d90429] transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>
                      
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded bg-neutral-800 hover:bg-[#d90429] text-neutral-300 hover:text-white transition-colors"
                          title="Visit live site"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    {project.subtitle && (
                      <p className="font-body text-[11px] font-bold uppercase tracking-wider text-[#d90429] mb-2">
                        {project.subtitle}
                      </p>
                    )}

                    <p className="font-body text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack */}
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-neutral-800">
                      {project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 bg-neutral-900 text-neutral-300 border border-neutral-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}

        {/* RESULTS: Compact Bento View */}
        {viewLayout === 'compact' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredAndSortedProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group relative bg-[#0f0f10] text-white border border-neutral-800 hover:border-[#d90429] p-4 flex flex-col justify-between transition-all duration-300 cursor-pointer hover:shadow-xl"
              >
                <div className="relative h-44 overflow-hidden mb-3 bg-neutral-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-[9px] font-bold uppercase text-white">
                    {project.categoryLabel}
                  </div>
                  {project.year && (
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/80 text-[9px] font-bold text-neutral-300">
                      {project.year}
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-condensed text-xl font-bold uppercase tracking-tight group-hover:text-[#d90429] transition-colors line-clamp-1">
                    {project.title}
                  </h4>
                  <p className="text-[11px] text-neutral-400 line-clamp-2 mt-1">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-neutral-800 text-[10px] text-neutral-400">
                  <span>{project.client || 'Portfolio Work'}</span>
                  <span className="text-[#d90429] font-bold flex items-center gap-0.5">
                    <span>View</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* RESULTS: List View */}
        {viewLayout === 'list' && (
          <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
            {filteredAndSortedProjects.map((project) => (
              <div
                key={project.id}
                className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-neutral-50 dark:hover:bg-neutral-900/50 px-3 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div 
                    onClick={() => onSelectProject(project)}
                    className="w-20 h-16 sm:w-24 sm:h-18 shrink-0 overflow-hidden bg-neutral-900 rounded cursor-pointer"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#d90429]/10 text-[#d90429] rounded">
                        {project.categoryLabel}
                      </span>
                      {project.year && (
                        <span className="text-[10px] text-neutral-500 font-bold">
                          {project.year}
                        </span>
                      )}
                      {project.featured && (
                        <span className="text-[10px] font-bold text-amber-500 flex items-center gap-0.5">
                          <Sparkles className="w-3 h-3" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>

                    <h4 
                      onClick={() => onSelectProject(project)}
                      className="font-condensed text-xl sm:text-2xl font-bold uppercase tracking-tight text-neutral-900 dark:text-white group-hover:text-[#d90429] transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h4>

                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 max-w-2xl mt-0.5">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-[#d90429] hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Live</span>
                    </a>
                  )}

                  <button
                    onClick={() => onSelectProject(project)}
                    className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-[#0f0f10] dark:bg-white text-white dark:text-black hover:bg-[#d90429] dark:hover:bg-[#d90429] dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* Standalone Footer */}
      <footer className="mt-auto border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0f0f10] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-neutral-500">
          <div>
            © {new Date().getFullYear()} PEDRO BARRIOS • {t.allProjectsPage.title}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="text-[#d90429] font-bold uppercase tracking-wider hover:underline"
            >
              {t.allProjectsPage.backHome}
            </button>
          </div>
        </div>
      </footer>

      {/* Copy Toast */}
      {copiedLink && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-[#0f0f10] text-white border border-[#d90429] text-xs font-bold uppercase tracking-wider shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Link copied to clipboard!</span>
        </div>
      )}

    </div>
  );
};
