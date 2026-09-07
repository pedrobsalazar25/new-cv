import React, { useState, useMemo } from 'react';
import { Award, Search, X, CheckCircle2, ShieldCheck, Sparkles, Code2, LineChart, Briefcase } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { Certification } from '../types';

export const Certifications: React.FC = () => {
  const { certifications } = useData();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAll, setShowAll] = useState<boolean>(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const INITIAL_VISIBLE_COUNT = 12;

  const handleImageError = (certId: string) => {
    setFailedImages((prev) => ({ ...prev, [certId]: true }));
  };

  const categories = [
    { id: 'all', label: t.certifications.all, icon: Award },
    { id: 'cs-dev', label: t.certifications.csDev, icon: Code2 },
    { id: 'ai-data', label: t.certifications.aiData, icon: Sparkles },
    { id: 'marketing-ads', label: t.certifications.marketingAds, icon: Briefcase },
    { id: 'seo-analytics', label: t.certifications.seoAnalytics, icon: LineChart },
    { id: 'business-security', label: t.certifications.businessSecurity, icon: ShieldCheck },
  ];

  const filteredCertifications = useMemo(() => {
    return certifications.filter((cert) => {
      const matchesCategory = activeTab === 'all' || cert.category === activeTab;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        cert.title.toLowerCase().includes(query) ||
        cert.issuer.toLowerCase().includes(query) ||
        cert.date.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const displayedCertifications = showAll
    ? filteredCertifications
    : filteredCertifications.slice(0, INITIAL_VISIBLE_COUNT);

  const getCategoryBadge = (cat: Certification['category']) => {
    switch (cat) {
      case 'cs-dev':
        return 'CS & TECH';
      case 'ai-data':
        return 'AI & DATA';
      case 'marketing-ads':
        return 'MARKETING';
      case 'seo-analytics':
        return 'SEO & ANALYTICS';
      case 'business-security':
        return 'SECURITY & BIZ';
      default:
        return 'CREDENTIAL';
    }
  };

  return (
    <section id="certifications" className="py-24 bg-neutral-50 dark:bg-[#0d0d0e] border-t border-neutral-200/60 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-[#d90429]" />
              <span className="font-body text-xs font-bold uppercase tracking-widest text-[#d90429]">
                {t.certifications.tag}
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#0f0f10] dark:text-white tracking-tight">
              {t.certifications.title}
            </h2>
            <p className="font-body text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mt-3 leading-relaxed">
              {t.certifications.subtitle}
            </p>
          </div>

          {/* Stat Badge */}
          <div className="self-start md:self-auto flex items-center gap-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-5 py-3 shadow-sm">
            <Award className="w-6 h-6 text-[#d90429]" />
            <div>
              <p className="font-condensed text-2xl font-bold leading-none text-neutral-900 dark:text-white">
                {certifications.length}
              </p>
              <p className="font-body text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mt-0.5">
                {t.certifications.totalCount}
              </p>
            </div>
          </div>
        </div>

        {/* Controls: Search Bar & Category Filters */}
        <div className="space-y-6 mb-10">
          
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.certifications.searchPlaceholder}
              className="w-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white pl-10 pr-10 py-2.5 font-body text-xs border border-neutral-300 dark:border-neutral-800 focus:outline-none focus:border-[#d90429] dark:focus:border-[#d90429] transition-colors shadow-sm placeholder:text-neutral-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-1"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              const count =
                cat.id === 'all'
                  ? certifications.length
                  : certifications.filter((c) => c.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveTab(cat.id);
                    setShowAll(false);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 font-body text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm border ${
                    isActive
                      ? 'bg-[#d90429] text-white border-[#d90429]'
                      : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Certifications Grid */}
        {displayedCertifications.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayedCertifications.map((cert) => {
              const hasFailed = failedImages[cert.id] || !cert.iconUrl;

              return (
                <div
                  key={cert.id}
                  className="group relative bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-5 flex flex-col justify-between hover:border-[#d90429] dark:hover:border-[#d90429] transition-all duration-300 hover:shadow-md"
                >
                  <div>
                    {/* Top Row: Icon + Category Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-8 h-8 rounded-sm bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-center shrink-0 overflow-hidden">
                        {!hasFailed ? (
                          <img
                            src={cert.iconUrl}
                            alt={cert.issuer}
                            onError={() => handleImageError(cert.id)}
                            className="w-4 h-4 object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <Award className="w-4 h-4 text-[#d90429]" />
                        )}
                      </div>

                      <span className="font-body text-[9px] font-bold tracking-widest uppercase text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 border border-neutral-200/60 dark:border-neutral-700/60">
                        {getCategoryBadge(cert.category)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-sm sm:text-base text-neutral-900 dark:text-white leading-snug group-hover:text-[#d90429] transition-colors mb-2">
                      {cert.title}
                    </h3>
                  </div>

                  {/* Footer Meta */}
                  <div className="pt-3 mt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between font-body text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="font-medium text-neutral-700 dark:text-neutral-300 truncate max-w-[150px]">
                      {cert.issuer}
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-neutral-400 shrink-0">
                      {cert.date}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-12 text-center">
            <Award className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
            <p className="font-body text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              No certifications matched your filter or search query.
            </p>
            <button
              onClick={() => {
                setActiveTab('all');
                setSearchQuery('');
              }}
              className="mt-4 font-body text-xs font-bold uppercase tracking-wider text-[#d90429] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Expand / Collapse Toggle Button */}
        {filteredCertifications.length > INITIAL_VISIBLE_COUNT && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 bg-[#0f0f10] dark:bg-white text-white dark:text-[#0f0f10] hover:bg-[#d90429] dark:hover:bg-[#d90429] dark:hover:text-white px-8 py-3.5 font-body text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md cursor-pointer"
            >
              <span>
                {showAll
                  ? t.certifications.showLess
                  : `${t.certifications.showMore} (${filteredCertifications.length})`}
              </span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
