import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ContactBannerProps {
  onOpenContact: () => void;
}

export const ContactBanner: React.FC<ContactBannerProps> = ({ onOpenContact }) => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="relative overflow-hidden bg-[#d90429] text-white py-16 sm:py-20 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* Main Giant Banner Headline */}
          <div className="max-w-3xl">
            <span className="font-body text-xs font-bold uppercase tracking-widest text-white/80 block mb-2">
              {t.services.requestQuote}
            </span>
            <h2 className="font-condensed text-5xl sm:text-7xl md:text-8xl font-normal leading-[0.9] uppercase tracking-tight text-white select-none">
              {t.contactModal.subtitle}<span className="text-[#0f0f10]">.</span>
            </h2>
          </div>

          {/* Large Circular White Action Button matching Reference Image */}
          <div className="shrink-0 flex items-center">
            <button
              onClick={onOpenContact}
              className="group w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white text-[#0f0f10] hover:bg-[#0f0f10] hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xl transform hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Open contact form"
            >
              <ArrowUpRight className="w-12 h-12 sm:w-16 sm:h-16 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
