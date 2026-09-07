import React from 'react';
import { Download } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface AboutProps {
  onOpenResume: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenResume }) => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-[#fcfcfd] dark:bg-[#0b0b0c] border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center gap-2 mb-8"
        >
          <span className="w-2 h-2 bg-[#d90429]" />
          <span className="font-body text-xs font-bold uppercase tracking-widest text-[#d90429]">
            {t.about.tag}
          </span>
        </motion.div>

        {/* 3-Column Layout matching Reference Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Bio Column (Cols 1-5) */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#0f0f10] dark:text-white leading-tight">
              {t.about.headline}
            </h2>
            
            <p className="font-body text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
              {t.about.fullBio}
            </p>

            <div className="pt-2">
              <span className="font-signature text-4xl text-[#d90429] block select-none">
                Pedro Barrios
              </span>
              <span className="font-body text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mt-1 block">
                {t.about.subtitle}
              </span>
            </div>
          </motion.div>

          {/* Center Portrait Image Column (Cols 6-8) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-3 relative my-6 lg:my-0"
          >
            <div className="relative w-full max-w-xs mx-auto">
              
              {/* Red Rectangular Background Block */}
              <div className="absolute top-4 right-4 w-full h-full bg-[#d90429] z-0" />

              {/* Foreground Image */}
              <div className="relative z-10 border-4 border-white dark:border-neutral-800 bg-neutral-900 shadow-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                  alt="Pedro Barrios Studio Portrait"
                  className="w-full h-[320px] sm:h-[380px] object-cover object-center grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                />
              </div>

            </div>
          </motion.div>

          {/* Right Skills & Action Column (Cols 9-12) */}
          <motion.div 
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-4 bg-white dark:bg-[#121214] p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6"
          >
            
            <h3 className="font-condensed text-2xl font-bold uppercase tracking-wider text-[#0f0f10] dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-3">
              {t.about.capabilities}
            </h3>

            {/* Skill Progress Bars */}
            <div className="space-y-4">
              {t.about.skills.map((skill, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between font-body text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                    <span>{skill.name}</span>
                    <span className="text-[#d90429]">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + idx * 0.1, ease: "easeOut" }}
                      className="h-full bg-[#d90429]"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Resume Button */}
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <button
                onClick={onOpenResume}
                className="w-full flex items-center justify-center gap-2 bg-[#0f0f10] dark:bg-white text-white dark:text-black hover:bg-[#d90429] dark:hover:bg-[#d90429] dark:hover:text-white py-3.5 px-4 font-body text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>{t.about.downloadResume}</span>
                <Download className="w-4 h-4" />
              </button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
