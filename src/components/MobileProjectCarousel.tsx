import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  ExternalLink, 
  Layers, 
  Sparkles,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface MobileProjectCarouselProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenAllProjectsSite: () => void;
}

const AUTOPLAY_INTERVAL = 4000; // 4 seconds per slide

export const MobileProjectCarousel: React.FC<MobileProjectCarouselProps> = ({
  projects,
  onSelectProject,
  onOpenAllProjectsSite,
}) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<number>(1); // 1 = next, -1 = prev

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const total = projects.length;

  const goToNext = useCallback(() => {
    if (total === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
    setProgress(0);
  }, [total]);

  const goToPrev = useCallback(() => {
    if (total === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setProgress(0);
  }, [total]);

  const goToIndex = (idx: number) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
    setProgress(0);
  };

  // Autoplay and progress bar ticks
  useEffect(() => {
    if (!isPlaying || total <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      return;
    }

    const stepMs = 50;
    const increment = (stepMs / AUTOPLAY_INTERVAL) * 100;

    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPlaying, total, goToNext, currentIndex]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }
  };

  if (total === 0) return null;

  const currentProject = projects[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 30 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    }),
  };

  return (
    <div className="w-full select-none">
      
      {/* Top Carousel Status Bar */}
      <div className="flex items-center justify-between gap-2 px-1 mb-3">
        
        {/* Left: Badge & Live Counter */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#d90429]/10 text-[#d90429] text-[10px] font-bold tracking-widest uppercase border border-[#d90429]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d90429] animate-pulse" />
            {t.work.featuredCarouselTag}
          </span>
          <span className="font-condensed font-bold text-xs text-neutral-500 dark:text-neutral-400">
            {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        {/* Right: Autoplay toggle & controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white text-[10px] font-bold tracking-wider uppercase transition-colors"
            title={isPlaying ? t.work.autoplayActive : t.work.autoplayPaused}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 text-[#d90429]" />
                <span className="text-[10px]">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-emerald-400" />
                <span className="text-[10px]">Auto</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Progress Bar for Autoplay */}
      <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-[#d90429] transition-all duration-75 ease-linear rounded-full"
          style={{ width: `${isPlaying ? progress : 100}%` }}
        />
      </div>

      {/* Main Slide Touch Stage */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] shadow-lg shadow-black/5"
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentProject.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full flex flex-col"
          >
            {/* Project Image Frame */}
            <div 
              onClick={() => onSelectProject(currentProject)}
              className="relative w-full h-[260px] sm:h-[300px] overflow-hidden bg-neutral-900 cursor-pointer group"
            >
              <img
                src={currentProject.image}
                alt={currentProject.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Category Badge */}
              <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5">
                <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest border-l-2 border-[#d90429]">
                  {currentProject.categoryLabel}
                </span>
                {currentProject.year && (
                  <span className="px-2 py-1 bg-neutral-900/80 backdrop-blur-md text-neutral-300 text-[10px] font-bold uppercase tracking-wider">
                    {currentProject.year}
                  </span>
                )}
              </div>

              {/* Favicon / Client */}
              {currentProject.faviconUrl && (
                <div className="absolute top-3.5 right-3.5 z-10 bg-white/95 p-1 rounded shadow-md">
                  <img src={currentProject.faviconUrl} alt="" className="w-4 h-4 object-contain" />
                </div>
              )}

              {/* Quick View Tag Over Image */}
              <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 px-3 py-1.5 bg-[#d90429] text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg shadow-[#d90429]/40 active:scale-95">
                <Eye className="w-3 h-3" />
                <span>{t.work.viewCaseStudy}</span>
              </div>
            </div>

            {/* Project Details Footer */}
            <div className="p-5 bg-[#0f0f10] text-white flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 
                    onClick={() => onSelectProject(currentProject)}
                    className="font-condensed text-2xl font-bold uppercase tracking-tight text-white hover:text-[#d90429] transition-colors cursor-pointer"
                  >
                    {currentProject.title}
                  </h3>
                  
                  {currentProject.liveUrl && (
                    <a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-neutral-800 hover:bg-[#d90429] text-neutral-300 hover:text-white transition-colors shrink-0"
                      title="Visit Live Site"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {currentProject.subtitle && (
                  <p className="font-body text-[11px] font-bold uppercase tracking-wider text-[#d90429] mt-0.5">
                    {currentProject.subtitle}
                  </p>
                )}

                <p className="font-body text-xs text-neutral-300 line-clamp-2 mt-2 leading-relaxed">
                  {currentProject.description}
                </p>
              </div>

              {/* Tech Stack Pills */}
              {currentProject.techStack && currentProject.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-800/80">
                  {currentProject.techStack.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 bg-neutral-900 text-neutral-300 border border-neutral-800 rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                  {currentProject.techStack.length > 3 && (
                    <span className="text-[9.5px] font-bold text-neutral-500 self-center">
                      +{currentProject.techStack.length - 3}
                    </span>
                  )}
                </div>
              )}

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating Left / Right Chevrons */}
        <button
          onClick={goToPrev}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-[#d90429] backdrop-blur-md text-white flex items-center justify-center transition-all active:scale-90 z-20 shadow-lg border border-white/10"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-[#d90429] backdrop-blur-md text-white flex items-center justify-center transition-all active:scale-90 z-20 shadow-lg border border-white/10"
          aria-label="Next project"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>

      {/* Pagination Dot Indicators */}
      <div className="flex items-center justify-center gap-1.5 my-4">
        {projects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToIndex(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentIndex
                ? 'w-6 h-2 bg-[#d90429]'
                : 'w-2 h-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-500'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* PRIMARY CTA: SHOW ALL PROJECTS IN A SEPARATE SITE */}
      <div className="pt-2">
        <button
          onClick={onOpenAllProjectsSite}
          className="w-full group relative flex items-center justify-center gap-2.5 px-6 py-4 bg-[#0f0f10] dark:bg-neutral-900 border-2 border-[#d90429] hover:bg-[#d90429] text-white font-body text-xs font-extrabold uppercase tracking-widest rounded-none shadow-xl transition-all duration-300 active:scale-[0.98] cursor-pointer"
        >
          <Layers className="w-4 h-4 text-[#d90429] group-hover:text-white transition-colors" />
          <span className="tracking-widest">{t.work.viewAllSeparateSite}</span>
          <ArrowUpRight className="w-4 h-4 text-[#d90429] group-hover:text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>
      </div>

    </div>
  );
};
