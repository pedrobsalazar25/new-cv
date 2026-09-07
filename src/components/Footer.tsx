import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenBackend?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBackend }) => {
  const { t } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer className="bg-[#fcfcfd] dark:bg-[#0b0b0c] text-[#0f0f10] dark:text-[#f4f4f5] border-t border-neutral-200 dark:border-neutral-800 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-neutral-200 dark:border-neutral-800">
          
          {/* Brand Info (Cols 1-6) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 p-1.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 flex items-center justify-center">
                <BrandLogo className="w-full h-full" />
              </div>
              <span className="font-display font-extrabold text-3xl tracking-tighter text-[#0f0f10] dark:text-white">
                PEDRO BARRIOS<span className="text-[#d90429]">.</span>
              </span>
            </div>
            <p className="font-body text-xs text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed">
              {t.footer.desc}
            </p>
          </div>

          {/* Get In Touch (Cols 7-9) */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-body text-xs font-bold uppercase tracking-widest text-[#d90429]">
              {t.footer.getInTouch}
            </h4>
            <ul className="space-y-1.5 font-body text-xs text-neutral-700 dark:text-neutral-300">
              <li className="flex items-center gap-1.5 flex-wrap">
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-[#d90429] font-medium transition-colors break-all">
                  {PERSONAL_INFO.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title="Copy email address"
                  className="inline-flex items-center gap-1 p-1 text-[11px] text-neutral-500 hover:text-[#d90429] dark:hover:text-[#d90429] transition-colors rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer shrink-0"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <span className="inline-flex items-center gap-0.5 text-green-600 dark:text-green-400 font-bold">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </li>
              <li>
                <a href={`tel:${PERSONAL_INFO.phoneRaw}`} className="hover:text-[#d90429] font-medium transition-colors">
                  Calls: {PERSONAL_INFO.phone}
                </a>
              </li>
              <li>
                <a href={PERSONAL_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] font-medium transition-colors inline-flex items-center gap-1">
                  WhatsApp: {PERSONAL_INFO.whatsapp} ↗
                </a>
              </li>
              {PERSONAL_INFO.location && (
                <li className="text-neutral-500 dark:text-neutral-400 pt-1">{PERSONAL_INFO.location}</li>
              )}
            </ul>
          </div>

          {/* Social Links (Cols 10-12) */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-body text-xs font-bold uppercase tracking-widest text-[#d90429]">
              {t.footer.followConnect}
            </h4>
            <div className="grid grid-cols-2 gap-1 font-body text-xs text-neutral-700 dark:text-neutral-300">
              <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#d90429] transition-colors">
                GitHub ↗
              </a>
              <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#d90429] transition-colors">
                LinkedIn ↗
              </a>
              <a href={PERSONAL_INFO.socials.behance} target="_blank" rel="noopener noreferrer" className="hover:text-[#d90429] transition-colors">
                Behance ↗
              </a>
              <a href={PERSONAL_INFO.socials.dribbble} target="_blank" rel="noopener noreferrer" className="hover:text-[#d90429] transition-colors">
                Dribbble ↗
              </a>
              <a href={PERSONAL_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#d90429] transition-colors">
                Instagram ↗
              </a>
              <a href={PERSONAL_INFO.socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-[#d90429] transition-colors">
                Twitter ↗
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between font-body text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 gap-4">
          <div>
            © {new Date().getFullYear()} PEDRO BARRIOS. {t.footer.rights}
          </div>
          <div className="flex items-center gap-3">
            <span>{t.nav.roleBadge} & UI ARCHITECT • NEW YORK & REMOTE</span>
            {onOpenBackend && (
              <>
                <span className="opacity-40">•</span>
                <button
                  onClick={onOpenBackend}
                  className="hover:text-[#d90429] dark:hover:text-[#d90429] transition-colors cursor-pointer uppercase font-bold"
                  title="Open Admin Backend CMS & Time Tracker"
                >
                  Admin CMS
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
