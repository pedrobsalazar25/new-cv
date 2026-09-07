import React from 'react';
import { CLIENT_PARTNERS } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export const TrustedBy: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-[#fcfcfd] dark:bg-[#0b0b0c] border-b border-neutral-200 dark:border-neutral-800 py-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="shrink-0">
            <span className="font-condensed text-xl font-bold uppercase tracking-wider text-[#d90429] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#d90429]" /> {t.experience.partnersTitle}
            </span>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <div className="flex items-center justify-between gap-8 md:gap-12 min-w-max">
              {CLIENT_PARTNERS.map((partner, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                  <span className="font-condensed text-xl sm:text-2xl font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 group-hover:text-[#0f0f10] dark:group-hover:text-white transition-colors">
                    {partner.logoText}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity text-[#d90429]">
                    {partner.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
