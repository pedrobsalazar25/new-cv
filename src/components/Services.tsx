import React from 'react';
import { Brush, Palette, Frame, LayoutGrid, ArrowUpRight, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface ServicesProps {
  onOpenContact: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenContact }) => {
  const { t } = useLanguage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brush':
        return <Brush className="w-6 h-6 text-[#d90429]" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-[#d90429]" />;
      case 'FramedImage':
        return <Frame className="w-6 h-6 text-[#d90429]" />;
      case 'LayoutGrid':
        return <LayoutGrid className="w-6 h-6 text-[#d90429]" />;
      default:
        return <Brush className="w-6 h-6 text-[#d90429]" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-[#fcfcfd] dark:bg-[#0b0b0c] border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid matching reference layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Hero Red Square Card (Cols 1-4) */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-4 bg-[#d90429] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden min-h-[320px] shadow-xl"
          >
            <div>
              <span className="font-body text-xs font-bold uppercase tracking-widest text-white/80 block mb-2">
                {t.services.leftTag}
              </span>
              <h2 className="font-condensed text-7xl sm:text-8xl font-normal leading-none tracking-tight uppercase text-[#0f0f10] select-none">
                {t.nav.services}
              </h2>
            </div>

            <div className="pt-8 flex items-center justify-between border-t border-white/20">
              <p className="font-body text-xs font-bold uppercase tracking-widest text-white/90">
                {t.services.requestQuote}
              </p>
              <button
                onClick={onOpenContact}
                className="w-12 h-12 bg-[#0f0f10] text-white rounded-full flex items-center justify-center hover:bg-white hover:text-[#d90429] transition-colors shadow-md cursor-pointer"
                aria-label="Request service quote"
              >
                <ArrowUpRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>

          {/* Right Services 2x2 Grid (Cols 5-12) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {t.services.items.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                className="group p-6 sm:p-8 bg-white dark:bg-[#121214] border border-neutral-200 dark:border-neutral-800 transition-all duration-300 hover:border-[#d90429] dark:hover:border-[#d90429] hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center group-hover:border-[#d90429] group-hover:bg-[#d90429]/10 transition-colors">
                      {getIcon(index === 0 ? 'Brush' : index === 1 ? 'LayoutGrid' : index === 2 ? 'Palette' : 'FramedImage')}
                    </div>
                    <span className="font-condensed text-lg text-neutral-400 dark:text-neutral-500 group-hover:text-[#d90429] font-bold">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="font-condensed text-2xl font-bold uppercase tracking-wider text-[#0f0f10] dark:text-white mb-2 group-hover:text-[#d90429] dark:group-hover:text-[#d90429] transition-colors">
                    {service.title}
                  </h3>

                  <p className="font-body text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                <ul className="space-y-1.5 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 font-body text-[11px] font-semibold text-neutral-700 dark:text-neutral-300">
                      <CheckCircle className="w-3.5 h-3.5 text-[#d90429] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
