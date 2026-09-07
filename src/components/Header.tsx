import React, { useState } from 'react';
import { ArrowUpRight, Menu, X, Sun, Moon, Globe, Shield, Database } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  onOpenContact: () => void;
  onOpenBackend?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact, onOpenBackend }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { name: t.nav.work, href: '#work' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.experience, href: '#experience' },
    { name: t.nav.certifications, href: '#certifications' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#fcfcfd]/90 dark:bg-[#0f0f10]/90 backdrop-blur-md border-b border-neutral-200/60 dark:border-neutral-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3.5 group py-1" aria-label="Pedro Barrios Portfolio">
          <BrandLogo className="h-11 sm:h-14 md:h-[68px] w-auto max-w-[190px] object-contain transition-transform duration-300 group-hover:scale-105" />
          <span className="hidden lg:inline-block text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 border-l border-neutral-300 dark:border-neutral-700 pl-3 py-1">
            {t.nav.roleBadge}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-7 lg:space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-body text-xs font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-300 hover:text-[#d90429] dark:hover:text-[#d90429] transition-colors py-2 relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#d90429] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA, Language & Theme Switchers */}
        <div className="hidden md:flex items-center gap-3 sm:gap-3.5">
          
          {/* Backend Portal Link */}
          {onOpenBackend && (
            <button
              onClick={onOpenBackend}
              aria-label="Open Backend CMS Portal"
              title="Open Backend CMS & Time Tracker"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 font-body text-[11px] font-bold tracking-wider transition-all duration-300 cursor-pointer shadow-sm hover:border-[#d90429] dark:hover:border-[#d90429] active:scale-95"
            >
              <Database className="w-3.5 h-3.5 text-[#d90429]" />
              <span className="hidden xl:inline">BACKEND</span>
            </button>
          )}

          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            aria-label="Switch language"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 font-body text-[11px] font-bold tracking-wider hover:border-[#d90429] dark:hover:border-[#d90429] transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
            title={language === 'en' ? "Cambiar a Español" : "Switch to English"}
          >
            <Globe className="w-3.5 h-3.5 text-[#d90429]" />
            <span className={language === 'en' ? 'text-[#d90429] font-extrabold' : 'opacity-60'}>EN</span>
            <span className="opacity-30">/</span>
            <span className={language === 'es' ? 'text-[#d90429] font-extrabold' : 'opacity-60'}>ES</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:text-[#d90429] dark:hover:text-[#d90429] border border-neutral-300 dark:border-neutral-700 transition-all duration-300 cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
          </button>

          <button
            onClick={onOpenContact}
            className="group flex items-center gap-2 bg-[#d90429] hover:bg-[#b80322] text-white px-5 py-2.5 font-body text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
          >
            <span>{t.nav.talk}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Actions (Language, Theme Toggle & Menu Trigger) */}
        <div className="flex md:hidden items-center gap-2">
          {onOpenBackend && (
            <button
              onClick={onOpenBackend}
              aria-label="Open Backend CMS"
              className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700"
              title="Open Backend"
            >
              <Database className="w-4 h-4 text-[#d90429]" />
            </button>
          )}

          {/* Mobile Language Button */}
          <button
            onClick={toggleLanguage}
            aria-label="Switch language"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 font-body text-[11px] font-bold"
          >
            <Globe className="w-3.5 h-3.5 text-[#d90429]" />
            <span className="text-[#d90429] uppercase">{language}</span>
          </button>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-neutral-700" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-800 dark:text-neutral-200 hover:text-[#d90429] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0f0f10] text-white border-b border-neutral-800 px-6 py-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-condensed text-3xl tracking-wider text-neutral-200 hover:text-[#d90429] transition-colors border-b border-neutral-800 pb-2"
              >
                {link.name}
              </a>
            ))}

            {onOpenBackend && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBackend();
                }}
                className="flex items-center justify-between bg-neutral-900 border border-neutral-800 text-white px-6 py-3 font-body text-sm font-bold uppercase tracking-wider w-full text-left"
              >
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#d90429]" />
                  <span>Admin Backend CMS</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400" />
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="flex items-center justify-between bg-[#d90429] text-white px-6 py-3.5 font-body text-sm font-bold uppercase tracking-wider w-full mt-2"
            >
              <span>{t.nav.talk}</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
