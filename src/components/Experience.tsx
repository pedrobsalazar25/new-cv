import React from 'react';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';

export const Experience: React.FC = () => {
  const { experiences } = useData();
  const { t } = useLanguage();

  const localizedExperiences = experiences.map((exp) => {
    const loc = t.experience.items.find((i) => i.id === exp.id);
    if (!loc) return exp;
    return {
      ...exp,
      role: loc.role || exp.role,
      organization: loc.organization || exp.organization,
      description: loc.description || exp.description,
      highlights: loc.highlights || exp.highlights
    };
  });

  return (
    <section id="experience" className="py-20 bg-[#0f0f10] text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#d90429]" />
              <span className="font-body text-xs font-bold uppercase tracking-widest text-[#d90429]">
                {t.experience.tag}
              </span>
            </div>
            <h2 className="font-condensed text-6xl sm:text-7xl font-normal text-white uppercase tracking-tight">
              {t.experience.title}
            </h2>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="space-y-8">
          {localizedExperiences.map((exp) => (
            <div
              key={exp.id}
              className="p-6 sm:p-8 bg-neutral-900/80 border-l-4 border-[#d90429] border-y border-r border-neutral-800 transition-all hover:bg-neutral-900"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#d90429] mb-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {exp.period}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-neutral-400">
                      <MapPin className="w-3.5 h-3.5" /> {exp.location}
                    </span>
                  </div>
                  <h3 className="font-condensed text-3xl font-bold uppercase tracking-wide text-white">
                    {exp.role}
                  </h3>
                  <p className="font-body text-sm font-semibold text-neutral-300">
                    {exp.organization}
                  </p>
                </div>
              </div>

              <p className="font-body text-xs sm:text-sm text-neutral-400 mb-4 leading-relaxed">
                {exp.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-neutral-800/80">
                {exp.highlights.map((highlight, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2 font-body text-xs text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d90429] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
