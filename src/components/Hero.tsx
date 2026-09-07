import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { BrandLogo } from './BrandLogo';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-6 pb-0 bg-[#fcfcfd] dark:bg-[#0b0b0c] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-12 lg:pb-16">
          
          {/* Left Hero Content (Cols 1-7) */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-7 flex flex-col justify-between space-y-8 pt-2 sm:pt-6"
          >
            
            {/* Giant Condensed Headline */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block w-2.5 h-2.5 bg-[#d90429] rounded-full animate-pulse" />
                <span className="font-body text-xs font-bold uppercase tracking-widest text-[#d90429]">
                  PEDRO BARRIOS — {t.nav.roleBadge}
                </span>
              </div>
              <h1 className="font-condensed text-7xl sm:text-8xl md:text-[110px] xl:text-[125px] font-normal leading-[0.85] tracking-tight text-[#0f0f10] dark:text-white uppercase select-none">
                WEB <span className="text-[#d90429] font-bold">*</span>
                <br />
                DEVELOPER
              </h1>
            </div>

            {/* Subhead & Intro */}
            <div className="max-w-xl space-y-4">
              <h2 className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#0f0f10] dark:text-white">
                {t.hero.headlinePart1} <br className="hidden sm:inline" />
                <span className="text-[#d90429]">{t.hero.headlinePart2}</span> {t.hero.headlineSub}
              </h2>
              <p className="font-body text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
                {t.hero.bio}
              </p>
            </div>

            {/* Rotating Badge & CTA */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-4">
              
              {/* Circular Rotating Badge */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center shrink-0">
                <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[8.5px] font-bold uppercase tracking-[0.18em] fill-neutral-800 dark:fill-neutral-200">
                    <textPath href="#circlePath" startOffset="0%">
                      • PEDRO BARRIOS • {t.hero.badge} •
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 m-auto w-11 h-11 bg-[#0f0f10] dark:bg-neutral-800 border border-neutral-700/80 text-white rounded-full flex items-center justify-center p-2 shadow-md">
                  <BrandLogo className="w-full h-full text-[#d90429]" />
                </div>
              </div>

              {/* View My Work Button */}
              <a
                href="#work"
                className="group flex items-center gap-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-[#d90429] dark:hover:bg-[#d90429] text-[#0f0f10] dark:text-white hover:text-white px-6 py-4 rounded-full font-body text-xs font-bold tracking-widest uppercase transition-all duration-300 border border-neutral-300 dark:border-neutral-700 hover:border-[#d90429] shadow-sm hover:shadow-lg"
              >
                <span className="w-8 h-8 rounded-full bg-[#d90429] group-hover:bg-white text-white group-hover:text-[#d90429] flex items-center justify-center transition-colors">
                  <ArrowDownRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </span>
                <span>{t.hero.viewWork}</span>
              </a>

            </div>

          </motion.div>

          {/* Right Hero Image Frame (Cols 8-12) */}
          <motion.div 
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-5 relative mt-6 lg:mt-0"
          >
            <div className="relative w-full max-w-md mx-auto lg:max-w-none">
              
              {/* Red Vertical Accent Box */}
              <div className="absolute top-0 right-0 w-2/5 h-full bg-[#bd2424] z-0 flex flex-col justify-between p-4 sm:p-6 text-white select-none">
                <div className="text-right">
                  <span className="font-condensed text-xs sm:text-sm tracking-widest uppercase text-white/80 block">
                    LOCATION
                  </span>
                  <span className="font-condensed text-lg sm:text-2xl font-bold uppercase leading-tight block">
                    NEW YORK<br />& REMOTE
                  </span>
                </div>
                <div className="writing-mode-vertical text-xs font-bold tracking-widest opacity-60 uppercase text-right rotate-180 hidden sm:block">
                  PEDRO BARRIOS PORTFOLIO
                </div>
              </div>

              {/* Main Portrait Frame */}
              <div className="relative z-10 mr-[22%] sm:mr-[25%] shadow-2xl border-4 border-white dark:border-neutral-800 bg-neutral-900 group overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
                  alt="Pedro Barrios - Web Developer"
                  className="w-full h-[380px] sm:h-[480px] object-cover object-center grayscale contrast-125 transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                
                {/* Floating Image Label */}
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md text-white px-3 py-1.5 border-l-2 border-[#d90429]">
                  <p className="font-body text-[10px] font-bold uppercase tracking-widest text-neutral-300">{t.nav.roleBadge} & DESIGNER</p>
                  <p className="font-condensed text-sm text-white font-bold tracking-wider">PEDRO BARRIOS</p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>

      {/* Dark Statistics Bar - Full Width Matching Image */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-[#0f0f10] text-white border-y border-neutral-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-neutral-800 text-center md:text-left">
            {t.hero.stats.map((stat, idx) => (
              <div key={idx} className={`pt-4 md:pt-0 ${idx !== 0 ? 'md:pl-8' : ''}`}>
                <div className="font-condensed text-4xl sm:text-5xl md:text-6xl font-bold text-[#d90429] tracking-tight">
                  {stat.value}
                </div>
                <div className="font-body text-xs font-bold uppercase tracking-widest text-neutral-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </section>
  );
};
