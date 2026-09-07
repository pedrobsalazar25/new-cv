import React, { useRef } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ProjectCardProps {
  project: Project;
  idx: number;
  onSelectProject: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, idx, onSelectProject }) => {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  // Normalized mouse coordinates [0, 1]
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Smooth 3D tilt rotation
  const rotateXSpring = useSpring(useTransform(y, [0, 1], [7, -7]), { stiffness: 250, damping: 25 });
  const rotateYSpring = useSpring(useTransform(x, [0, 1], [-7, 7]), { stiffness: 250, damping: 25 });

  // Parallax translation for the image element
  const imgXSpring = useSpring(useTransform(x, [0, 1], [-10, 10]), { stiffness: 250, damping: 25 });
  const imgYSpring = useSpring(useTransform(y, [0, 1], [-10, 10]), { stiffness: 250, damping: 25 });

  // Light glare reflection offset
  const glareX = useTransform(x, [0, 1], ['0%', '100%']);
  const glareY = useTransform(y, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const isRedAccentCard = idx % 5 === 1;

  return (
    <div style={{ perspective: '1000px' }}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: (idx % 3) * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: 'preserve-3d',
        }}
        className="group relative flex flex-col justify-between overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] transition-shadow duration-500 hover:shadow-2xl hover:shadow-[#d90429]/15 rounded-none transform-gpu cursor-pointer"
      >
        {/* Dynamic Light Glare Overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) => `radial-gradient(500px circle at ${gx} ${gy}, rgba(255,255,255,0.08), transparent 50%)`
            ),
          }}
        />

        {/* Visual Thumbnail Area */}
        <div 
          onClick={() => onSelectProject(project)}
          className="relative h-[280px] sm:h-[320px] overflow-hidden bg-neutral-900 cursor-pointer"
          style={{ transform: 'translateZ(15px)' }}
        >
          {isRedAccentCard && (
            <div className="absolute top-0 right-0 w-full h-full bg-[#d90429] clip-path-diagonal z-0 opacity-90" />
          )}

          {/* Parallax Image */}
          <motion.img
            src={project.image}
            alt={project.title}
            style={{
              x: imgXSpring,
              y: imgYSpring,
              scale: 1.1,
            }}
            className="relative z-10 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-115"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 z-20 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
            <span className="w-12 h-12 rounded-full bg-[#d90429] text-white flex items-center justify-center mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg shadow-[#d90429]/40">
              <ArrowUpRight className="w-6 h-6" />
            </span>
            <span className="font-body text-xs font-bold uppercase tracking-widest text-white">
              {t.projectModal.caseStudy}
            </span>
          </div>

          {/* Category Tag & Favicon */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <div className="bg-black/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">
              {project.categoryLabel}
            </div>
          </div>

          {project.faviconUrl && (
            <div className="absolute top-4 right-4 z-20 bg-white/95 p-1 rounded shadow-md">
              <img src={project.faviconUrl} alt="" className="w-5 h-5 object-contain" />
            </div>
          )}
        </div>

        {/* Card Title & Content Info Block */}
        <div 
          className="p-6 bg-[#0f0f10] dark:bg-[#161618] text-white flex flex-col justify-between flex-grow border-t border-neutral-800"
          style={{ transform: 'translateZ(25px)' }}
        >
          <div>
            <div className="flex items-start justify-between gap-3 mb-1">
              <h3 
                onClick={() => onSelectProject(project)}
                className="font-condensed text-2xl font-bold tracking-tight text-white group-hover:text-[#d90429] transition-colors uppercase cursor-pointer"
              >
                {project.title}
              </h3>
              
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title="Visit live website"
                  className="shrink-0 p-1.5 rounded-full bg-neutral-800 hover:bg-[#d90429] text-neutral-300 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <p className="font-body text-[11px] font-bold tracking-wider uppercase text-[#d90429] mb-3">
              {project.subtitle} • {project.year}
            </p>

            <p className="font-body text-xs text-neutral-400 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          {project.liveUrl && (
            <div className="mt-4 pt-4 border-t border-neutral-800/80 flex items-center justify-end text-xs font-bold uppercase tracking-widest">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-neutral-300 hover:text-[#d90429] flex items-center gap-1.5 transition-colors font-bold"
              >
                <span>VISIT WEBSITE</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#d90429]" />
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
