import React, { useState, useMemo } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Clock, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Tag, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Download, 
  Search, 
  Filter, 
  Briefcase, 
  Layers, 
  Sparkles, 
  Timer, 
  Check, 
  X,
  FileSpreadsheet,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../context/DataContext';
import { TimeLog, WorkCategory } from '../types';

const CATEGORY_COLORS: Record<WorkCategory, { bg: string; text: string; border: string; dot: string; label: string }> = {
  'development': {
    bg: 'bg-blue-500/10 dark:bg-blue-500/20',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/30',
    dot: 'bg-blue-500',
    label: 'Web Dev & Software'
  },
  'design': {
    bg: 'bg-pink-500/10 dark:bg-pink-500/20',
    text: 'text-pink-600 dark:text-pink-400',
    border: 'border-pink-500/30',
    dot: 'bg-pink-500',
    label: 'UI/UX & Branding'
  },
  'art-mural': {
    bg: 'bg-amber-500/10 dark:bg-amber-500/20',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500/30',
    dot: 'bg-amber-500',
    label: 'Mural & Fine Art'
  },
  'consultation': {
    bg: 'bg-purple-500/10 dark:bg-purple-500/20',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-500/30',
    dot: 'bg-purple-500',
    label: 'Consultation & Strategy'
  },
  'maintenance': {
    bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/30',
    dot: 'bg-emerald-500',
    label: 'Maintenance & SEO'
  },
  'admin': {
    bg: 'bg-neutral-500/10 dark:bg-neutral-500/20',
    text: 'text-neutral-600 dark:text-neutral-400',
    border: 'border-neutral-500/30',
    dot: 'bg-neutral-500',
    label: 'Administration'
  },
  'other': {
    bg: 'bg-neutral-500/10 dark:bg-neutral-500/20',
    text: 'text-neutral-600 dark:text-neutral-400',
    border: 'border-neutral-500/30',
    dot: 'bg-neutral-500',
    label: 'General Session'
  }
};

const formatSecondsToHMS = (totalSeconds: number) => {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return {
    hours: String(hrs).padStart(2, '0'),
    minutes: String(mins).padStart(2, '0'),
    seconds: String(secs).padStart(2, '0'),
    formatted: `${hrs}h ${mins}m ${secs}s`,
    shortFormatted: hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m ${secs}s`
  };
};

export const WorkTimeTrackerCMS: React.FC = () => {
  const { 
    projects, 
    timeLogs, 
    activeTimer, 
    currentElapsedSeconds,
    startTimer, 
    pauseTimer, 
    resumeTimer, 
    stopTimer, 
    resetTimer, 
    updateActiveTimerDraft,
    addTimeLog,
    updateTimeLog,
    deleteTimeLog,
    clearAllTimeLogs
  } = useData();

  // Local UI state
  const [sessionNotes, setSessionNotes] = useState<string>('');
  const [filterProject, setFilterProject] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterDateRange, setFilterDateRange] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Manual Entry Form Modal State
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [manualForm, setManualForm] = useState<{
    taskName: string;
    projectName: string;
    projectId: string;
    category: WorkCategory;
    hours: number;
    minutes: number;
    hourlyRate: number;
    billable: boolean;
    date: string;
    notes: string;
  }>({
    taskName: '',
    projectName: '',
    projectId: '',
    category: 'development',
    hours: 2,
    minutes: 30,
    hourlyRate: 85,
    billable: true,
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  // Edit Log Modal State
  const [editingLog, setEditingLog] = useState<TimeLog | null>(null);

  // Success Toast state
  const [toast, setToast] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Time calculations
  const { hours, minutes, seconds } = formatSecondsToHMS(currentElapsedSeconds);
  const currentAccruedRevenue = activeTimer.billable && activeTimer.hourlyRate 
    ? ((currentElapsedSeconds / 3600) * activeTimer.hourlyRate).toFixed(2)
    : '0.00';

  // Filtered logs
  const filteredLogs = useMemo(() => {
    return timeLogs.filter((log) => {
      // Category filter
      if (filterCategory !== 'all' && log.category !== filterCategory) {
        return false;
      }
      // Project filter
      if (filterProject !== 'all' && log.projectName !== filterProject && log.projectId !== filterProject) {
        return false;
      }
      // Date filter
      if (filterDateRange !== 'all') {
        const logDate = new Date(log.startTime || log.createdAt);
        const now = new Date();
        if (filterDateRange === 'today') {
          const isSameDay = logDate.toDateString() === now.toDateString();
          if (!isSameDay) return false;
        } else if (filterDateRange === 'week') {
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          if (logDate < oneWeekAgo) return false;
        } else if (filterDateRange === 'month') {
          const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          if (logDate < oneMonthAgo) return false;
        }
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTask = log.taskName.toLowerCase().includes(q);
        const matchProj = (log.projectName || '').toLowerCase().includes(q);
        const matchNotes = (log.notes || '').toLowerCase().includes(q);
        const matchCat = log.category.toLowerCase().includes(q);
        if (!matchTask && !matchProj && !matchNotes && !matchCat) return false;
      }
      return true;
    });
  }, [timeLogs, filterCategory, filterProject, filterDateRange, searchQuery]);

  // Analytics Metrics
  const stats = useMemo(() => {
    const totalSeconds = timeLogs.reduce((acc, l) => acc + (l.durationSeconds || 0), 0);
    const totalHours = (totalSeconds / 3600).toFixed(1);
    
    const totalEarnings = timeLogs.reduce((acc, l) => {
      if (l.billable && l.hourlyRate) {
        return acc + ((l.durationSeconds / 3600) * l.hourlyRate);
      }
      return acc;
    }, 0);

    const billedEarnings = timeLogs.reduce((acc, l) => {
      if (l.billable && l.isBilled && l.hourlyRate) {
        return acc + ((l.durationSeconds / 3600) * l.hourlyRate);
      }
      return acc;
    }, 0);

    const pendingEarnings = totalEarnings - billedEarnings;

    // Category breakdown
    const categoryTotals: Record<string, number> = {};
    timeLogs.forEach((l) => {
      categoryTotals[l.category] = (categoryTotals[l.category] || 0) + l.durationSeconds;
    });

    const categoryBreakdown = Object.entries(categoryTotals).map(([cat, secs]) => ({
      category: cat as WorkCategory,
      seconds: secs,
      percentage: totalSeconds > 0 ? Math.round((secs / totalSeconds) * 100) : 0,
      hours: (secs / 3600).toFixed(1)
    })).sort((a, b) => b.seconds - a.seconds);

    // Unique projects count
    const uniqueProjects = new Set(timeLogs.map((l) => l.projectName || 'General')).size;

    return {
      totalHours,
      totalSeconds,
      totalEarnings: totalEarnings.toFixed(2),
      billedEarnings: billedEarnings.toFixed(2),
      pendingEarnings: pendingEarnings.toFixed(2),
      totalLogsCount: timeLogs.length,
      uniqueProjects,
      categoryBreakdown
    };
  }, [timeLogs]);

  // Handle Stop & Save Timer
  const handleStopAndSave = async () => {
    try {
      const saved = await stopTimer(sessionNotes);
      setSessionNotes('');
      if (saved) {
        triggerToast(`Logged ${formatSecondsToHMS(saved.durationSeconds).shortFormatted} for "${saved.taskName}"`);
      } else {
        triggerToast('Timer discarded (session too short).');
      }
    } catch (e) {
      console.error(e);
      triggerToast('Error saving time entry.');
    }
  };

  // Handle Manual Log Submission
  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.taskName.trim()) return;

    const totalSeconds = (Number(manualForm.hours) * 3600) + (Number(manualForm.minutes) * 60);
    if (totalSeconds <= 0) return;

    const startTime = new Date(`${manualForm.date}T09:00:00`).toISOString();
    const endTime = new Date(new Date(startTime).getTime() + (totalSeconds * 1000)).toISOString();

    const newLog: Omit<TimeLog, 'id'> = {
      taskName: manualForm.taskName.trim(),
      projectName: manualForm.projectName.trim() || 'General Work',
      projectId: manualForm.projectId || undefined,
      category: manualForm.category,
      startTime,
      endTime,
      durationSeconds: totalSeconds,
      hourlyRate: Number(manualForm.hourlyRate) || 85,
      billable: manualForm.billable,
      isBilled: false,
      notes: manualForm.notes.trim() || undefined,
      createdAt: new Date().toISOString()
    };

    await addTimeLog(newLog);
    setIsManualModalOpen(false);
    setManualForm({
      taskName: '',
      projectName: '',
      projectId: '',
      category: 'development',
      hours: 2,
      minutes: 30,
      hourlyRate: 85,
      billable: true,
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
    triggerToast('Manual time entry logged successfully.');
  };

  // Handle Edit Log Save
  const handleSaveEditedLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLog) return;
    await updateTimeLog(editingLog.id, editingLog);
    setEditingLog(null);
    triggerToast('Time log updated.');
  };

  // Toggle Billed status
  const handleToggleBilled = async (log: TimeLog) => {
    await updateTimeLog(log.id, { isBilled: !log.isBilled });
    triggerToast(log.isBilled ? 'Marked as unbilled.' : 'Marked as billed & invoiced.');
  };

  // Export Time Logs to CSV
  const handleExportCSV = () => {
    if (timeLogs.length === 0) {
      triggerToast('No time logs available to export.');
      return;
    }

    const headers = ['ID', 'Task Name', 'Project', 'Category', 'Date', 'Start Time', 'End Time', 'Duration (Hours)', 'Duration (Seconds)', 'Rate ($/hr)', 'Billable', 'Billed', 'Total Earnings ($)', 'Notes'];
    
    const rows = timeLogs.map((l) => {
      const durHrs = (l.durationSeconds / 3600).toFixed(2);
      const earnings = l.billable && l.hourlyRate ? ((l.durationSeconds / 3600) * l.hourlyRate).toFixed(2) : '0.00';
      const dateStr = l.startTime ? new Date(l.startTime).toLocaleDateString() : '';
      return [
        `"${l.id}"`,
        `"${(l.taskName || '').replace(/"/g, '""')}"`,
        `"${(l.projectName || '').replace(/"/g, '""')}"`,
        `"${l.category}"`,
        `"${dateStr}"`,
        `"${l.startTime || ''}"`,
        `"${l.endTime || ''}"`,
        durHrs,
        l.durationSeconds,
        l.hourlyRate || 0,
        l.billable ? 'YES' : 'NO',
        l.isBilled ? 'YES' : 'NO',
        earnings,
        `"${(l.notes || '').replace(/"/g, '""')}"`
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pedro_barrios_work_time_logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Exported CSV time log report.');
  };

  return (
    <div className="space-y-8">

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-[#0f0f10] dark:bg-white text-white dark:text-black px-5 py-3 text-xs font-bold uppercase tracking-wider shadow-2xl flex items-center gap-2 border border-[#d90429]"
          >
            <CheckCircle2 className="w-4 h-4 text-[#d90429]" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO STOPWATCH & ACTIVE TRACKER CARD */}
      <div className="bg-[#121214] border border-neutral-800 text-white p-6 sm:p-8 relative overflow-hidden">
        {/* Glow effect on tracking */}
        {activeTimer.isRunning && (
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d90429]/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        )}

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          
          {/* Left: Digital Stopwatch Display */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-neutral-900 border border-neutral-700 text-neutral-300">
                <Timer className="w-3.5 h-3.5 text-[#d90429]" />
                <span>Live Work Hours Counter</span>
              </span>

              {activeTimer.isRunning ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Tracking Active Session</span>
                </span>
              ) : currentElapsedSeconds > 0 ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-amber-500/20 text-amber-400 border border-amber-500/40">
                  <Pause className="w-3 h-3" />
                  <span>Session Paused</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-neutral-800 text-neutral-400 border border-neutral-700">
                  <span>Ready to Work</span>
                </span>
              )}
            </div>

            {/* Giant Clock Numbers */}
            <div className="flex items-baseline gap-2 sm:gap-4 font-mono font-bold select-none">
              <div className="flex flex-col items-center">
                <span className="text-5xl sm:text-7xl tracking-tighter text-white font-extrabold">{hours}</span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-sans mt-1">Hours</span>
              </div>
              <span className="text-4xl sm:text-6xl text-[#d90429] font-light">:</span>
              <div className="flex flex-col items-center">
                <span className="text-5xl sm:text-7xl tracking-tighter text-white font-extrabold">{minutes}</span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-sans mt-1">Minutes</span>
              </div>
              <span className="text-4xl sm:text-6xl text-[#d90429] font-light">:</span>
              <div className="flex flex-col items-center">
                <span className="text-5xl sm:text-7xl tracking-tighter text-white font-extrabold">{seconds}</span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-sans mt-1">Seconds</span>
              </div>
            </div>

            {/* Accrued revenue calculation */}
            {activeTimer.billable && (
              <div className="flex items-center gap-3 pt-2 text-xs font-mono text-neutral-300">
                <div className="flex items-center gap-1 text-emerald-400 font-bold">
                  <DollarSign className="w-4 h-4" />
                  <span>${currentAccruedRevenue} USD</span>
                </div>
                <span className="text-neutral-500">•</span>
                <span className="text-neutral-400">Rate: ${activeTimer.hourlyRate || 85}/hr</span>
              </div>
            )}
          </div>

          {/* Right: Quick Controls & Session Config */}
          <div className="flex-1 max-w-xl space-y-4 bg-neutral-900/90 border border-neutral-800 p-4 sm:p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Task Name */}
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Task / Activity Description *
                </label>
                <input
                  type="text"
                  value={activeTimer.taskName}
                  onChange={(e) => updateActiveTimerDraft({ taskName: e.target.value })}
                  placeholder="e.g., Smile Sanctuary Booking API Integration..."
                  className="w-full bg-[#121214] border border-neutral-700 text-white px-3 py-2 text-xs focus:outline-none focus:border-[#d90429]"
                />
              </div>

              {/* Project Selector */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Project / Client
                </label>
                <select
                  value={activeTimer.projectId || activeTimer.projectName}
                  onChange={(e) => {
                    const selected = projects.find(p => p.id === e.target.value);
                    if (selected) {
                      updateActiveTimerDraft({
                        projectId: selected.id,
                        projectName: selected.title
                      });
                    } else {
                      updateActiveTimerDraft({
                        projectId: '',
                        projectName: e.target.value
                      });
                    }
                  }}
                  className="w-full bg-[#121214] border border-neutral-700 text-white px-3 py-2 text-xs focus:outline-none focus:border-[#d90429]"
                >
                  <option value="">General Creative / Dev</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              {/* Work Category */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Category
                </label>
                <select
                  value={activeTimer.category}
                  onChange={(e) => updateActiveTimerDraft({ category: e.target.value as WorkCategory })}
                  className="w-full bg-[#121214] border border-neutral-700 text-white px-3 py-2 text-xs focus:outline-none focus:border-[#d90429]"
                >
                  <option value="development">Web Dev & Software</option>
                  <option value="design">UI/UX & Branding</option>
                  <option value="art-mural">Mural & Fine Art</option>
                  <option value="consultation">Consultation & Strategy</option>
                  <option value="maintenance">Maintenance & SEO</option>
                  <option value="admin">Administration</option>
                  <option value="other">General Session</option>
                </select>
              </div>

              {/* Hourly Rate & Billable */}
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Rate ($/hr)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                    <input
                      type="number"
                      value={activeTimer.hourlyRate || ''}
                      onChange={(e) => updateActiveTimerDraft({ hourlyRate: Number(e.target.value) })}
                      placeholder="85"
                      className="w-full bg-[#121214] border border-neutral-700 text-white pl-8 pr-2 py-2 text-xs focus:outline-none focus:border-[#d90429]"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-neutral-300">
                    <input
                      type="checkbox"
                      checked={activeTimer.billable}
                      onChange={(e) => updateActiveTimerDraft({ billable: e.target.checked })}
                      className="w-4 h-4 accent-[#d90429]"
                    />
                    <span>Billable</span>
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Optional Session Notes
                </label>
                <input
                  type="text"
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  placeholder="Summary of deliverables accomplished..."
                  className="w-full bg-[#121214] border border-neutral-700 text-white px-3 py-2 text-xs focus:outline-none focus:border-[#d90429]"
                />
              </div>

            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {!activeTimer.isRunning ? (
                <button
                  type="button"
                  onClick={() => {
                    if (currentElapsedSeconds > 0) {
                      resumeTimer();
                    } else {
                      startTimer();
                    }
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#d90429] hover:bg-[#b00320] text-white font-body text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-lg active:scale-95"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{currentElapsedSeconds > 0 ? 'Resume Timer' : 'Start Timer'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={pauseTimer}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-amber-600 hover:bg-amber-700 text-white font-body text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-lg active:scale-95"
                >
                  <Pause className="w-4 h-4 fill-white" />
                  <span>Pause Timer</span>
                </button>
              )}

              {currentElapsedSeconds > 0 && (
                <>
                  <button
                    type="button"
                    onClick={handleStopAndSave}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-body text-xs font-bold uppercase tracking-widest transition-all cursor-pointer active:scale-95"
                    title="Finish session and save log to Firestore"
                  >
                    <Square className="w-3.5 h-3.5 fill-white" />
                    <span>Stop & Log Hours</span>
                  </button>

                  <button
                    type="button"
                    onClick={resetTimer}
                    className="p-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    title="Reset timer without saving"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* 2. ANALYTICS & METRICS DASHBOARD */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-[#121214] border border-neutral-200 dark:border-neutral-800 p-5">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Tracked</span>
            <Clock className="w-4 h-4 text-[#d90429]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white font-mono">
            {stats.totalHours} <span className="text-xs font-sans text-neutral-500">HRS</span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">{stats.totalLogsCount} logged work sessions</p>
        </div>

        <div className="bg-white dark:bg-[#121214] border border-neutral-200 dark:border-neutral-800 p-5">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
            ${stats.totalEarnings}
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">${stats.billedEarnings} billed / ${stats.pendingEarnings} pending</p>
        </div>

        <div className="bg-white dark:bg-[#121214] border border-neutral-200 dark:border-neutral-800 p-5">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Active Projects</span>
            <Briefcase className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white font-mono">
            {stats.uniqueProjects}
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">Clients & creative initiatives</p>
        </div>

        <div className="bg-white dark:bg-[#121214] border border-neutral-200 dark:border-neutral-800 p-5">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Work Breakdown</span>
            <TrendingUp className="w-4 h-4 text-purple-500" />
          </div>
          <div className="space-y-1.5 mt-2">
            {stats.categoryBreakdown.slice(0, 3).map((cb) => {
              const info = CATEGORY_COLORS[cb.category] || CATEGORY_COLORS.other;
              return (
                <div key={cb.category} className="text-[10px]">
                  <div className="flex justify-between font-bold mb-0.5">
                    <span className="text-neutral-700 dark:text-neutral-300 truncate max-w-[120px]">{info.label}</span>
                    <span className="text-neutral-500">{cb.hours}h ({cb.percentage}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${info.dot}`} 
                      style={{ width: `${cb.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 3. TIME LOGS MANAGEMENT HEADER & CONTROLS */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <h3 className="font-condensed text-2xl font-bold uppercase tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
              <span>Work Logs Repository</span>
              <span className="text-xs px-2 py-0.5 bg-[#d90429]/10 text-[#d90429] border border-[#d90429]/30 font-sans">
                {filteredLogs.length} Entries
              </span>
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Comprehensive record of hours worked across web engineering, mural art, and branding.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsManualModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0f0f10] dark:bg-white text-white dark:text-black hover:bg-[#d90429] dark:hover:bg-[#d90429] dark:hover:text-white font-body text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Manual Hours</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 font-body text-xs font-bold uppercase tracking-wider border border-neutral-300 dark:border-neutral-700 transition-all cursor-pointer"
              title="Download CSV report"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-neutral-50 dark:bg-[#121214]/60 p-3 border border-neutral-200 dark:border-neutral-800">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks, notes..."
              className="w-full bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-[#d90429]"
            />
          </div>

          {/* Project Filter */}
          <div>
            <select
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
              className="w-full bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white px-3 py-1.5 text-xs focus:outline-none focus:border-[#d90429]"
            >
              <option value="all">All Projects & Clients</option>
              {projects.map((p) => (
                <option key={p.id} value={p.title}>{p.title}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white px-3 py-1.5 text-xs focus:outline-none focus:border-[#d90429]"
            >
              <option value="all">All Work Categories</option>
              <option value="development">Web Dev & Software</option>
              <option value="design">UI/UX & Branding</option>
              <option value="art-mural">Mural & Fine Art</option>
              <option value="consultation">Consultation & Strategy</option>
              <option value="maintenance">Maintenance & SEO</option>
              <option value="admin">Administration</option>
              <option value="other">General Session</option>
            </select>
          </div>

          {/* Date Range Filter */}
          <div>
            <select
              value={filterDateRange}
              onChange={(e) => setFilterDateRange(e.target.value as any)}
              className="w-full bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white px-3 py-1.5 text-xs focus:outline-none focus:border-[#d90429]"
            >
              <option value="all">All Time</option>
              <option value="today">Today Only</option>
              <option value="week">Past 7 Days</option>
              <option value="month">Past 30 Days</option>
            </select>
          </div>

        </div>

      </div>

      {/* 4. WORK TIME LOGS TABLE / LIST */}
      {filteredLogs.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-neutral-300 dark:border-neutral-800 p-8">
          <Clock className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
          <h4 className="font-condensed text-xl font-bold uppercase text-neutral-800 dark:text-neutral-200">
            No Time Logs Matching Filters
          </h4>
          <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria, or click "Start Timer" above to record a new session.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#121214] border border-neutral-200 dark:border-neutral-800 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                <th className="py-3 px-4">Task & Activity</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Project / Client</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4 text-right">Duration</th>
                <th className="py-3 px-4 text-right">Billing</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-xs">
              {filteredLogs.map((log) => {
                const catInfo = CATEGORY_COLORS[log.category] || CATEGORY_COLORS.other;
                const formattedTime = formatSecondsToHMS(log.durationSeconds);
                const earnings = log.billable && log.hourlyRate 
                  ? ((log.durationSeconds / 3600) * log.hourlyRate).toFixed(2)
                  : null;
                const dateObj = new Date(log.startTime || log.createdAt);

                return (
                  <tr key={log.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-colors">
                    
                    {/* Task Title & Notes */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-bold text-neutral-900 dark:text-white">
                        {log.taskName}
                      </div>
                      {log.notes && (
                        <div className="text-[11px] text-neutral-500 truncate mt-0.5" title={log.notes}>
                          {log.notes}
                        </div>
                      )}
                    </td>

                    {/* Category Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-none ${catInfo.bg} ${catInfo.text} border ${catInfo.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${catInfo.dot}`} />
                        <span>{catInfo.label}</span>
                      </span>
                    </td>

                    {/* Project Name */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-neutral-700 dark:text-neutral-300 font-medium">
                      {log.projectName || 'General Creative'}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-neutral-500 font-mono text-[11px]">
                      <div>{dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                      <div className="text-[10px] text-neutral-400">
                        {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>

                    {/* Duration */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-right font-mono font-bold text-neutral-900 dark:text-white">
                      {formattedTime.shortFormatted}
                    </td>

                    {/* Billing Info */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-right font-mono">
                      {log.billable && earnings ? (
                        <div>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">${earnings}</span>
                          <span className="text-[10px] text-neutral-400 block">${log.hourlyRate}/hr</span>
                        </div>
                      ) : (
                        <span className="text-neutral-400 text-[11px]">Non-billable</span>
                      )}
                    </td>

                    {/* Billed Toggle Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-center">
                      {log.billable ? (
                        <button
                          onClick={() => handleToggleBilled(log)}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                            log.isBilled 
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500/30'
                          }`}
                          title="Click to toggle billed status"
                        >
                          {log.isBilled ? <Check className="w-3 h-3" /> : null}
                          <span>{log.isBilled ? 'Billed' : 'Pending'}</span>
                        </button>
                      ) : (
                        <span className="text-neutral-400 text-[10px] uppercase">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingLog(log)}
                          className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                          title="Edit log entry"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={async () => {
                            if (window.confirm(`Delete time log "${log.taskName}"?`)) {
                              await deleteTimeLog(log.id);
                              triggerToast('Time log deleted.');
                            }
                          }}
                          className="p-1.5 text-neutral-400 hover:text-[#d90429] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                          title="Delete log"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. MODAL: MANUAL TIME LOG ENTRY */}
      <AnimatePresence>
        {isManualModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-[#121214] border border-neutral-300 dark:border-neutral-800 w-full max-w-lg shadow-2xl p-6 sm:p-8"
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-200 dark:border-neutral-800">
                <h4 className="font-condensed text-2xl font-bold uppercase text-neutral-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#d90429]" />
                  <span>Log Manual Hours</span>
                </h4>
                <button
                  onClick={() => setIsManualModalOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                    Task / Activity Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={manualForm.taskName}
                    onChange={(e) => setManualForm({ ...manualForm, taskName: e.target.value })}
                    placeholder="e.g. Legal Platform Database Optimization"
                    className="w-full bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#d90429]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      Project
                    </label>
                    <select
                      value={manualForm.projectId || manualForm.projectName}
                      onChange={(e) => {
                        const sel = projects.find(p => p.id === e.target.value);
                        if (sel) {
                          setManualForm({ ...manualForm, projectId: sel.id, projectName: sel.title });
                        } else {
                          setManualForm({ ...manualForm, projectId: '', projectName: e.target.value });
                        }
                      }}
                      className="w-full bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#d90429]"
                    >
                      <option value="">General Work</option>
                      {projects.map((p) => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      Category
                    </label>
                    <select
                      value={manualForm.category}
                      onChange={(e) => setManualForm({ ...manualForm, category: e.target.value as WorkCategory })}
                      className="w-full bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#d90429]"
                    >
                      <option value="development">Web Dev & Software</option>
                      <option value="design">UI/UX & Branding</option>
                      <option value="art-mural">Mural & Fine Art</option>
                      <option value="consultation">Consultation & Strategy</option>
                      <option value="maintenance">Maintenance & SEO</option>
                      <option value="admin">Administration</option>
                      <option value="other">General Session</option>
                    </select>
                  </div>
                </div>

                {/* Duration Inputs: Hours and Minutes */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      Hours *
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="24"
                      required
                      value={manualForm.hours}
                      onChange={(e) => setManualForm({ ...manualForm, hours: Number(e.target.value) })}
                      className="w-full bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#d90429]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      Minutes *
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      required
                      value={manualForm.minutes}
                      onChange={(e) => setManualForm({ ...manualForm, minutes: Number(e.target.value) })}
                      className="w-full bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#d90429]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      Rate ($/hr)
                    </label>
                    <input
                      type="number"
                      value={manualForm.hourlyRate}
                      onChange={(e) => setManualForm({ ...manualForm, hourlyRate: Number(e.target.value) })}
                      className="w-full bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#d90429]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={manualForm.date}
                      onChange={(e) => setManualForm({ ...manualForm, date: e.target.value })}
                      className="w-full bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#d90429]"
                    />
                  </div>

                  <div className="pt-6">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-neutral-700 dark:text-neutral-300">
                      <input
                        type="checkbox"
                        checked={manualForm.billable}
                        onChange={(e) => setManualForm({ ...manualForm, billable: e.target.checked })}
                        className="w-4 h-4 accent-[#d90429]"
                      />
                      <span>Billable to Client</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                    Deliverables & Notes
                  </label>
                  <textarea
                    rows={2}
                    value={manualForm.notes}
                    onChange={(e) => setManualForm({ ...manualForm, notes: e.target.value })}
                    placeholder="Provide details about what was built..."
                    className="w-full bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#d90429]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setIsManualModalOpen(false)}
                    className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#d90429] hover:bg-[#b00320] text-white text-xs font-bold uppercase tracking-widest cursor-pointer shadow-md"
                  >
                    Save Time Log
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. MODAL: EDIT TIME LOG */}
      <AnimatePresence>
        {editingLog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-[#121214] border border-neutral-300 dark:border-neutral-800 w-full max-w-lg shadow-2xl p-6 sm:p-8"
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-200 dark:border-neutral-800">
                <h4 className="font-condensed text-2xl font-bold uppercase text-neutral-900 dark:text-white flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-[#d90429]" />
                  <span>Edit Time Log</span>
                </h4>
                <button
                  onClick={() => setEditingLog(null)}
                  className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEditedLog} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                    Task / Activity Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingLog.taskName}
                    onChange={(e) => setEditingLog({ ...editingLog, taskName: e.target.value })}
                    className="w-full bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#d90429]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={editingLog.projectName || ''}
                      onChange={(e) => setEditingLog({ ...editingLog, projectName: e.target.value })}
                      className="w-full bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#d90429]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      Category
                    </label>
                    <select
                      value={editingLog.category}
                      onChange={(e) => setEditingLog({ ...editingLog, category: e.target.value as WorkCategory })}
                      className="w-full bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#d90429]"
                    >
                      <option value="development">Web Dev & Software</option>
                      <option value="design">UI/UX & Branding</option>
                      <option value="art-mural">Mural & Fine Art</option>
                      <option value="consultation">Consultation & Strategy</option>
                      <option value="maintenance">Maintenance & SEO</option>
                      <option value="admin">Administration</option>
                      <option value="other">General Session</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      Duration in Minutes
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={Math.round(editingLog.durationSeconds / 60)}
                      onChange={(e) => setEditingLog({ ...editingLog, durationSeconds: Number(e.target.value) * 60 })}
                      className="w-full bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#d90429]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      Hourly Rate ($/hr)
                    </label>
                    <input
                      type="number"
                      value={editingLog.hourlyRate || ''}
                      onChange={(e) => setEditingLog({ ...editingLog, hourlyRate: Number(e.target.value) })}
                      className="w-full bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#d90429]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    <input
                      type="checkbox"
                      checked={editingLog.billable}
                      onChange={(e) => setEditingLog({ ...editingLog, billable: e.target.checked })}
                      className="w-4 h-4 accent-[#d90429]"
                    />
                    <span>Billable</span>
                  </label>

                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    <input
                      type="checkbox"
                      checked={editingLog.isBilled}
                      onChange={(e) => setEditingLog({ ...editingLog, isBilled: e.target.checked })}
                      className="w-4 h-4 accent-[#d90429]"
                    />
                    <span>Already Billed / Invoiced</span>
                  </label>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                    Notes
                  </label>
                  <textarea
                    rows={2}
                    value={editingLog.notes || ''}
                    onChange={(e) => setEditingLog({ ...editingLog, notes: e.target.value })}
                    className="w-full bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#d90429]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setEditingLog(null)}
                    className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#d90429] hover:bg-[#b00320] text-white text-xs font-bold uppercase tracking-widest cursor-pointer shadow-md"
                  >
                    Update Log
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
