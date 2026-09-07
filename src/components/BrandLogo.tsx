import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  className = "w-8 h-8", 
  showText = false 
}) => {
  return (
    <div className="inline-flex items-center gap-2.5">
      <img
        src="/images/LOGO.png"
        alt="Pedro Barrios Logo"
        className={`${className} object-contain transition-all duration-300 group-hover:scale-105`}
      />
      {showText && (
        <span className="font-display font-extrabold text-2xl sm:text-3xl tracking-tighter text-[#0f0f10] dark:text-white">
          PB<span className="text-[#d90429] inline-block transition-transform duration-300 group-hover:scale-125">.</span>
        </span>
      )}
    </div>
  );
};
