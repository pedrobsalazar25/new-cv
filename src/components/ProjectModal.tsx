import React, { useState } from 'react';
import { X, MapPin, Calendar, Tag, ArrowUpRight, Timer, Play, Pause, Square, CheckCircle2, FileText } from 'lucide-react';
import { Project, WorkCategory } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenContact: () => void;
  onOpenAdmin?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ 
  project, 
  onClose, 
  onOpenContact,
  onOpenAdmin 
}) => {
  if (!project) return null;

  const { t } = useLanguage();
  const { 
    activeTimer, 
    currentElapsedSeconds, 
    startTimer, 
    pauseTimer, 
    resumeTimer, 
    stopTimer 
  } = useData();

  const locProj = t.projects.find((p) => p.id === project.id);
  const title = locProj ? locProj.title : project.title;
  const description = locProj ? locProj.description : project.description;
  const story = locProj ? locProj.story : project.story;
  const medium = locProj ? locProj.medium : project.medium;
  const categoryLabel = locProj ? locProj.categoryLabel : project.categoryLabel;

  const [activeImage, setActiveImage] = useState(project.image);
  const [taskNotes, setTaskNotes] = useState('');
  const [timerToast, setTimerToast] = useState<string | null>(null);
  const gallery = project.galleryImages && project.galleryImages.length > 0 ? project.galleryImages : [project.image];

  const showNotification = (msg: string) => {
    setTimerToast(msg);
    setTimeout(() => setTimerToast(null), 3000);
  };

  const isCurrentProjectTracking = activeTimer.projectId === project.id;
  const isTimerRunning = activeTimer.isRunning;

  const formatTimerHMS = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hrs > 0) {
      return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleQuickStartTimer = () => {
    const category: WorkCategory = project.category.includes('art') 
      ? 'art-mural' 
      : project.category.includes('design') 
        ? 'design' 
        : 'development';

    const customTask = taskNotes.trim() 
      ? `${title} - ${taskNotes.trim()}` 
      : `${title} - Active Session`;

    startTimer({
      taskName: customTask,
      projectName: title,
      projectId: project.id,
      category,
      hourlyRate: 85,
      billable: true
    });
    showNotification(`Timer started for ${title}`);
  };

  const handleStopAndSaveTimer = async () => {
    const noteContent = taskNotes.trim() ? taskNotes.trim() : undefined;
    const saved = await stopTimer(noteContent);
    if (saved) {
      showNotification(`Logged session for ${title}`);
      setTaskNotes('');
    } else {
      showNotification('Timer reset.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      
      {/* Toast in Modal */}
      {timerToast && (
        <div className="fixed top-6 right-6 z-60 bg-[#0f0f10] text-white px-5 py-3 text-xs font-bold uppercase tracking-wider shadow-2xl flex items-center gap-2 border border-emerald-500 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{timerToast}</span>
        </div>
      )}

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#fcfcfd] dark:bg-[#0f0f10] text-[#0f0f10] dark:text-[#f4f4f5] border-2 border-[#0f0f10] dark:border-neutral-700 shadow-2xl overflow-hidden my-8 my-auto max-h-[90vh] flex flex-col transition-colors duration-300">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0f0f10] text-white border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <span className="bg-[#d90429] text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest font-body">
              {categoryLabel}
            </span>
            <span className="font-condensed text-xl font-bold tracking-wide text-neutral-200">
              {title}
            </span>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Main Showcase Image */}
          <div className="space-y-4">
            <div className="relative w-full h-[320px] sm:h-[450px] bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden group">
              <img
                src={activeImage}
                alt={title}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
              <div className="absolute top-4 right-4 bg-black/75 text-white px-3 py-1 font-body text-xs font-bold uppercase tracking-wider">
                {project.year}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-24 h-16 border-2 transition-all overflow-hidden shrink-0 cursor-pointer ${
                      activeImage === img ? 'border-[#d90429] ring-2 ring-[#d90429]/30' : 'border-neutral-300 dark:border-neutral-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            
            {/* Story & Description (Cols 1-7) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="font-display text-2xl font-extrabold uppercase text-[#0f0f10] dark:text-white mb-2">
                  {t.projectModal.overview}
                </h3>
                <p className="font-body text-neutral-700 dark:text-neutral-300 text-base leading-relaxed">
                  {description}
                </p>
              </div>

              {story && (
                <div className="bg-neutral-50 dark:bg-neutral-900 p-5 border-l-4 border-[#d90429] space-y-2">
                  <h4 className="font-body text-xs font-bold uppercase tracking-widest text-[#d90429]">
                    {t.projectModal.concept}
                  </h4>
                  <p className="font-body text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed italic">
                    "{story}"
                  </p>
                </div>
              )}
            </div>

            {/* Specifications Sidebar (Cols 8-12) */}
            <div className="lg:col-span-5 bg-[#0f0f10] text-white p-6 border-t-4 border-[#d90429] space-y-6">
              <h4 className="font-condensed text-2xl font-bold tracking-wider uppercase text-white border-b border-neutral-800 pb-3">
                {t.projectModal.specs}
              </h4>

              <div className="space-y-4 font-body text-xs sm:text-sm">
                {project.client && (
                  <div className="flex items-start justify-between border-b border-neutral-800/80 pb-2">
                    <span className="text-neutral-400 font-bold uppercase tracking-wider">{t.projectModal.client}</span>
                    <span className="text-white font-semibold text-right">{project.client}</span>
                  </div>
                )}

                {project.location && (
                  <div className="flex items-start justify-between border-b border-neutral-800/80 pb-2">
                    <span className="text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#d90429]" /> {t.projectModal.location}
                    </span>
                    <span className="text-white font-semibold text-right">{project.location}</span>
                  </div>
                )}

                <div className="flex items-start justify-between border-b border-neutral-800/80 pb-2">
                  <span className="text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#d90429]" /> {t.projectModal.year}
                  </span>
                  <span className="text-white font-semibold">{project.year}</span>
                </div>

                <div className="flex items-start justify-between border-b border-neutral-800/80 pb-2">
                  <span className="text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-[#d90429]" /> {t.projectModal.medium}
                  </span>
                  <span className="text-white font-semibold text-right">{medium}</span>
                </div>

                {project.dimensions && (
                  <div className="flex items-start justify-between pb-2">
                    <span className="text-neutral-400 font-bold uppercase tracking-wider">{t.projectModal.format}</span>
                    <span className="text-[#d90429] font-bold text-right">{project.dimensions}</span>
                  </div>
                )}
              </div>

              {/* QUICK-START WORK TIMER SECTION */}
              <div className="pt-2 border-t border-neutral-800">
                <div className="bg-neutral-900/90 border border-neutral-800 p-3.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4 text-[#d90429]" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-300">
                        Project Time Tracking
                      </span>
                    </div>

                    {isCurrentProjectTracking && isTimerRunning && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Active</span>
                      </span>
                    )}
                  </div>

                  {/* Optional Task Notes Input Field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                      <FileText className="w-3 h-3 text-[#d90429]" />
                      <span>Task / Session Notes (Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Responsive layout fixes, mural sketching..."
                      value={taskNotes}
                      onChange={(e) => setTaskNotes(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d90429] font-body transition-colors"
                    />
                  </div>

                  {/* If timer is active on this project */}
                  {isCurrentProjectTracking ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-neutral-950 p-2.5 border border-neutral-800">
                        <span className="text-xs text-neutral-400 font-body">Session Time:</span>
                        <span className="text-lg font-mono font-bold text-emerald-400">
                          {formatTimerHMS(currentElapsedSeconds)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isTimerRunning ? (
                          <button
                            type="button"
                            onClick={pauseTimer}
                            className="flex-1 flex items-center justify-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white py-2 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            <Pause className="w-3.5 h-3.5 fill-white" />
                            <span>Pause</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={resumeTimer}
                            className="flex-1 flex items-center justify-center gap-1.5 bg-[#d90429] hover:bg-[#b00320] text-white py-2 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 fill-white" />
                            <span>Resume</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={handleStopAndSaveTimer}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white py-2 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                          title="Finish session and save to work logs"
                        >
                          <Square className="w-3 h-3 fill-white" />
                          <span>Stop & Log</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* If not currently tracking this project */
                    <button
                      type="button"
                      onClick={handleQuickStartTimer}
                      className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-[#d90429] text-white py-2.5 px-3 text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-neutral-700 hover:border-[#d90429] cursor-pointer group"
                    >
                      <Play className="w-3.5 h-3.5 fill-neutral-300 group-hover:fill-white transition-colors" />
                      <span>Start Quick Timer for this Project</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#0f0f10] hover:bg-neutral-800 text-white border border-neutral-700 py-3 font-body text-xs font-bold uppercase tracking-widest transition-all duration-300"
                  >
                    {project.faviconUrl && (
                      <img src={project.faviconUrl} alt="" className="w-4 h-4 object-contain rounded bg-white p-0.5" />
                    )}
                    <span>Visit Live Website</span>
                    <ArrowUpRight className="w-4 h-4 text-[#d90429]" />
                  </a>
                )}
                <button
                  onClick={() => {
                    onClose();
                    onOpenContact();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#d90429] hover:bg-[#b80322] text-white py-3 font-body text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer"
                >
                  <span>{t.projectModal.inquire}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

