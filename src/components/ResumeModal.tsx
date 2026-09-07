import React from 'react';
import { X, Download, Printer, Award } from 'lucide-react';
import { PERSONAL_INFO, CERTIFICATIONS } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { t } = useLanguage();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#0f0f10] text-[#0f0f10] dark:text-[#f4f4f5] border-2 border-[#0f0f10] dark:border-neutral-700 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col transition-colors duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0f0f10] text-white border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <span className="bg-[#d90429] text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest font-body">
              RESUME / CV
            </span>
            <span className="font-condensed text-xl font-bold tracking-wide text-white">
              PEDRO BARRIOS — {t.nav.roleBadge}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> PRINT
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 font-body">
          
          {/* Header Block */}
          <div className="border-b-2 border-[#0f0f10] dark:border-white pb-6 flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h1 className="font-condensed text-5xl font-bold uppercase text-[#0f0f10] dark:text-white tracking-tight">
                PEDRO BARRIOS
              </h1>
              <p className="font-body text-xs font-bold text-[#d90429] uppercase tracking-widest mt-1">
                {PERSONAL_INFO.title}
              </p>
            </div>
            <div className="text-left sm:text-right text-xs font-semibold text-neutral-600 dark:text-neutral-400 space-y-1">
              {PERSONAL_INFO.location && <p>{PERSONAL_INFO.location}</p>}
              <p><a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-[#d90429] transition-colors">{PERSONAL_INFO.email}</a></p>
              <p>Calls: <a href={`tel:${PERSONAL_INFO.phoneRaw}`} className="hover:text-[#d90429] transition-colors">{PERSONAL_INFO.phone}</a></p>
              <p>WhatsApp: <a href={PERSONAL_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">{PERSONAL_INFO.whatsapp} ↗</a></p>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h3 className="font-condensed text-xl font-bold uppercase tracking-wider text-[#0f0f10] dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-1">
              PROFESSIONAL SUMMARY
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {t.about.fullBio}
            </p>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h3 className="font-condensed text-xl font-bold uppercase tracking-wider text-[#0f0f10] dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-1">
              {t.experience.title}
            </h3>
            <div className="space-y-6">
              {t.experience.items.map((exp) => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-bold">
                    <span className="text-[#0f0f10] dark:text-white font-bold text-sm uppercase">{exp.role} — {exp.organization}</span>
                    <span className="text-[#d90429]">{exp.period} | {exp.location}</span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{exp.description}</p>
                  <ul className="list-disc list-inside text-[11px] text-neutral-700 dark:text-neutral-300 space-y-0.5 pt-1">
                    {exp.highlights.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Key Skills & Tech Stack */}
          <div className="space-y-3">
            <h3 className="font-condensed text-xl font-bold uppercase tracking-wider text-[#0f0f10] dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-1">
              TECHNICAL PROFICIENCY & SKILLS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <span className="font-bold text-[#d90429] block uppercase">FRONTEND ENGINEERING</span>
                <span className="text-neutral-700 dark:text-neutral-300 font-medium">React, TypeScript, Next.js, Vite, Tailwind CSS, Framer Motion, HTML5/CSS3.</span>
              </div>
              <div className="p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <span className="font-bold text-[#d90429] block uppercase">UI/UX & PRODUCT DESIGN</span>
                <span className="text-neutral-700 dark:text-neutral-300 font-medium">Figma, Design Systems, Wireframing, Responsive Design, Accessibility (WCAG).</span>
              </div>
              <div className="p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <span className="font-bold text-[#d90429] block uppercase">BACKEND & INTEGRATIONS</span>
                <span className="text-neutral-700 dark:text-neutral-300 font-medium">Node.js, Express, REST APIs, GraphQL, PostgreSQL, WebSockets, Shopify API.</span>
              </div>
              <div className="p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <span className="font-bold text-[#d90429] block uppercase">DEVELOPMENT & WORKFLOW</span>
                <span className="text-neutral-700 dark:text-neutral-300 font-medium">Git, GitHub, CI/CD, Storybook, Jest, Web Performance & SEO Optimization.</span>
              </div>
            </div>
          </div>

          {/* Certifications & Credentials */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-1">
              <h3 className="font-condensed text-xl font-bold uppercase tracking-wider text-[#0f0f10] dark:text-white">
                VERIFIED CERTIFICATIONS & CREDENTIALS ({CERTIFICATIONS.length})
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#d90429] flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> 70+ CREDENTIALS
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
              {CERTIFICATIONS.slice(0, 16).map((cert) => (
                <div key={cert.id} className="p-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 flex flex-col justify-between">
                  <span className="font-bold text-neutral-900 dark:text-white text-[11px] leading-tight line-clamp-2">{cert.title}</span>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-neutral-500">
                    <span className="truncate max-w-[90px]">{cert.issuer}</span>
                    <span className="font-mono text-[#d90429]">{cert.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-neutral-500 text-right italic pt-1">
              + {CERTIFICATIONS.length - 16} additional certifications available in full profile
            </p>
          </div>

          {/* Footer CTA */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              PEDRO BARRIOS • OFFICIAL WEB DEVELOPER RESUME 2026
            </span>
            <button
              onClick={() => {
                alert("Simulating PDF download for Pedro Barrios Web Developer Resume...");
              }}
              className="flex items-center gap-2 bg-[#d90429] text-white px-5 py-2.5 font-body text-xs font-bold uppercase tracking-widest hover:bg-[#b80322] transition-colors cursor-pointer"
            >
              <span>{t.about.downloadResume}</span>
              <Download className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
