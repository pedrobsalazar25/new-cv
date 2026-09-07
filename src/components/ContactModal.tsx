import React, { useState } from 'react';
import { X, Send, CheckCircle2, Mail, Phone, MessageSquare, MapPin, Copy, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { t } = useLanguage();
  const [inquiryType, setInquiryType] = useState('webdesign');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    budget: '$5k - $15k',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-3xl bg-[#fcfcfd] dark:bg-[#0f0f10] text-[#0f0f10] dark:text-[#f4f4f5] border-2 border-[#0f0f10] dark:border-neutral-700 shadow-2xl overflow-hidden my-auto transition-colors duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0f0f10] text-white border-b border-neutral-800">
          <div>
            <span className="text-[#d90429] font-body text-[10px] font-bold uppercase tracking-widest block">
              {t.contactModal.title}
            </span>
            <h3 className="font-condensed text-2xl font-bold uppercase tracking-wider text-white">
              {t.contactModal.subtitle}
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-[#d90429]/10 text-[#d90429] rounded-full flex items-center justify-center mx-auto border-2 border-[#d90429]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-condensed text-3xl font-bold uppercase text-[#0f0f10] dark:text-white">
                {t.contactModal.successTitle}
              </h4>
              <p className="font-body text-sm text-neutral-600 dark:text-neutral-300 max-w-md mx-auto leading-relaxed">
                {t.contactModal.successMessage}
              </p>
              <button
                onClick={resetAndClose}
                className="mt-6 bg-[#0f0f10] dark:bg-white text-white dark:text-black px-8 py-3 font-body text-xs font-bold uppercase tracking-widest hover:bg-[#d90429] dark:hover:bg-[#d90429] dark:hover:text-white transition-colors cursor-pointer"
              >
                {t.contactModal.returnButton}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Inquiry Category Selector */}
              <div>
                <label className="block font-body text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 mb-2">
                  {t.contactModal.stepCategory}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'webdesign', label: 'WEB DESIGN' },
                    { id: 'uiux', label: 'UI/UX DESIGN' },
                    { id: 'fullstack', label: 'FULL-STACK' },
                    { id: 'branding', label: 'BRANDING' },
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setInquiryType(cat.id)}
                      className={`py-2.5 px-3 font-body text-[11px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                        inquiryType === cat.id
                          ? 'bg-[#d90429] text-white border-[#d90429]'
                          : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-neutral-800 dark:hover:border-neutral-500'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-[11px] font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                    {t.contactModal.nameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-body text-xs focus:bg-white dark:focus:bg-neutral-800 focus:border-[#d90429] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-body text-[11px] font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                    {t.contactModal.emailLabel} *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-body text-xs focus:bg-white dark:focus:bg-neutral-800 focus:border-[#d90429] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-[11px] font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                    {t.contactModal.companyLabel}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Inc. / Personal"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-body text-xs focus:bg-white dark:focus:bg-neutral-800 focus:border-[#d90429] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-body text-[11px] font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                    {t.contactModal.budgetLabel}
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-body text-xs focus:bg-white dark:focus:bg-neutral-800 focus:border-[#d90429] focus:outline-none"
                  >
                    <option value="Under $5k">Under $5,000</option>
                    <option value="$5k - $15k">$5,000 – $15,000</option>
                    <option value="$15k - $30k">$15,000 – $30,000</option>
                    <option value="$30k+">$30,000+</option>
                  </select>
                </div>
              </div>

              {/* Message Details */}
              <div>
                <label className="block font-body text-[11px] font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                  {t.contactModal.messageLabel} *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your web product requirements, tech stack preference, target timeline, or project goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-body text-xs focus:bg-white dark:focus:bg-neutral-800 focus:border-[#d90429] focus:outline-none resize-none"
                />
              </div>

              {/* Direct Info Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3.5 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 font-body text-[11px] border border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center justify-between gap-1 truncate font-bold">
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-1.5 hover:text-[#d90429] transition-colors truncate">
                    <Mail className="w-3.5 h-3.5 text-[#d90429] shrink-0" /> <span className="truncate">{PERSONAL_INFO.email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    title="Copy email to clipboard"
                    className="p-1 text-neutral-500 hover:text-[#d90429] dark:hover:text-[#d90429] transition-colors shrink-0 cursor-pointer rounded hover:bg-neutral-200 dark:hover:bg-neutral-800"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <a href={`tel:${PERSONAL_INFO.phoneRaw}`} className="flex items-center gap-1.5 font-bold hover:text-[#d90429] transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#d90429] shrink-0" /> CALLS: {PERSONAL_INFO.phone}
                </a>
                <a href={PERSONAL_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-bold hover:text-[#25D366] transition-colors">
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366] shrink-0" /> WHATSAPP: {PERSONAL_INFO.whatsapp} ↗
                </a>
                {PERSONAL_INFO.location && (
                  <span className="flex items-center gap-1.5 font-bold">
                    <MapPin className="w-3.5 h-3.5 text-[#d90429] shrink-0" /> {PERSONAL_INFO.location}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#d90429] hover:bg-[#b80322] text-white py-3.5 font-body text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md cursor-pointer"
              >
                <span>{t.contactModal.submit}</span>
                <Send className="w-4 h-4" />
              </button>

            </form>
          )}
        </div>

      </div>

    </div>
  );
};
