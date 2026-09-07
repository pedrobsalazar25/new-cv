import React, { useState, useRef } from 'react';
import { 
  X, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Database, 
  Sparkles, 
  Award, 
  Briefcase, 
  FolderGit2, 
  Check, 
  ExternalLink,
  RefreshCw,
  Sliders,
  Download,
  Upload,
  FileJson,
  AlertCircle,
  CheckCircle2,
  FileUp,
  RotateCcw,
  Timer,
  Lock,
  LogOut,
  ShieldCheck,
  Loader2,
  Globe,
  Wand2
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Project, Certification, ExperienceItem, TimeLog } from '../types';
import { WorkTimeTrackerCMS } from './WorkTimeTrackerCMS';

// Helper to extract domain from URL or string
const extractDomain = (urlOrSubtitle?: string): string => {
  if (!urlOrSubtitle) return '';
  let str = urlOrSubtitle.trim();
  if (str.startsWith('http://') || str.startsWith('https://')) {
    try {
      return new URL(str).hostname;
    } catch {
      // fallback
    }
  }
  return str.replace(/^https?:\/\//, '').split('/')[0].split('?')[0].replace(/^www\./, '');
};

interface AdminCMSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminCMSModal: React.FC<AdminCMSModalProps> = ({ isOpen, onClose }) => {
  const { user, loading: authLoading, signInWithGoogle, logout, authError, clearAuthError } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const { 
    projects, 
    certifications, 
    experiences, 
    timeLogs,
    activeTimer,
    currentElapsedSeconds,
    dbConnected,
    addProject, 
    updateProject, 
    deleteProject,
    addCertification,
    updateCertification,
    deleteCertification,
    addExperience,
    updateExperience,
    deleteExperience,
    seedDatabaseIfEmpty,
    exportPortfolioData,
    importPortfolioData
  } = useData();

  const [activeTab, setActiveTab] = useState<'projects' | 'certifications' | 'experiences' | 'timetracker'>('projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal forms state
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);

  const [editingCert, setEditingCert] = useState<Partial<Certification> | null>(null);
  const [isCertFormOpen, setIsCertFormOpen] = useState(false);

  const [editingExp, setEditingExp] = useState<Partial<ExperienceItem> | null>(null);
  const [isExpFormOpen, setIsExpFormOpen] = useState(false);

  // Import / Export state
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importMode, setImportMode] = useState<'replace' | 'merge'>('replace');
  const [importFile, setImportFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<{
    projects?: Project[];
    certifications?: Certification[];
    experiences?: ExperienceItem[];
    timeLogs?: TimeLog[];
    version?: string;
    exportedAt?: string;
  } | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // --- EXPORT JSON HANDLER ---
  const handleExportJSON = () => {
    try {
      const data = exportPortfolioData();
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(data, null, 2)
      )}`;
      const downloadAnchor = document.createElement('a');
      const dateStr = new Date().toISOString().split('T')[0];
      downloadAnchor.setAttribute('href', jsonString);
      downloadAnchor.setAttribute('download', `pedro-barrios-portfolio-backup-${dateStr}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      showToast(`Exported ${projects.length} projects, ${certifications.length} certs, ${experiences.length} exps, ${timeLogs.length} time logs!`);
    } catch (err) {
      console.error('Export error:', err);
      showToast('Failed to export portfolio data.');
    }
  };

  // --- IMPORT JSON HANDLERS ---
  const handleFileChange = (file: File) => {
    setImportFile(file);
    setImportError(null);
    setParsedData(null);

    if (!file.name.toLowerCase().endsWith('.json') && file.type !== 'application/json') {
      setImportError('Please select a valid .json file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);

        let normalized: {
          projects?: Project[];
          certifications?: Certification[];
          experiences?: ExperienceItem[];
          timeLogs?: TimeLog[];
          version?: string;
          exportedAt?: string;
        } = {};

        if (Array.isArray(parsed)) {
          normalized.projects = parsed;
        } else if (typeof parsed === 'object' && parsed !== null) {
          normalized = {
            projects: Array.isArray(parsed.projects) ? parsed.projects : [],
            certifications: Array.isArray(parsed.certifications) ? parsed.certifications : [],
            experiences: Array.isArray(parsed.experiences) ? parsed.experiences : [],
            timeLogs: Array.isArray(parsed.timeLogs) ? parsed.timeLogs : [],
            version: parsed.version,
            exportedAt: parsed.exportedAt,
          };
        } else {
          throw new Error('Invalid JSON format. Expected a JSON object with portfolio data.');
        }

        const totalItems = (normalized.projects?.length || 0) + 
                           (normalized.certifications?.length || 0) + 
                           (normalized.experiences?.length || 0) +
                           (normalized.timeLogs?.length || 0);

        if (totalItems === 0) {
          setImportError('The uploaded JSON does not contain any portfolio data or time logs.');
          return;
        }

        setParsedData(normalized);
      } catch (err: any) {
        console.error('JSON parse error:', err);
        setImportError(err.message || 'Invalid JSON syntax in file.');
      }
    };

    reader.onerror = () => {
      setImportError('Failed to read file from disk.');
    };

    reader.readAsText(file);
  };

  const handleConfirmImport = async () => {
    if (!parsedData) return;
    setIsImporting(true);
    try {
      const result = await importPortfolioData(parsedData, importMode);
      showToast(
        `Successfully restored ${result.projectsCount} projects, ${result.certsCount} certs, ${result.expsCount} exps, and ${result.timeLogsCount} time logs!`
      );
      setIsImportModalOpen(false);
      setImportFile(null);
      setParsedData(null);
      setImportError(null);
    } catch (err: any) {
      console.error('Import error:', err);
      setImportError(err.message || 'Failed to restore data to Firestore.');
    } finally {
      setIsImporting(false);
    }
  };

  if (!isOpen) return null;

  // --- PROJECT FORM HANDLERS ---
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title) return;

    try {
      const payload: Partial<Project> = {
        ...editingProject,
        liveUrl: editingProject.liveUrl || editingProject.link || '',
        link: editingProject.link || editingProject.liveUrl || '',
        faviconUrl: editingProject.faviconUrl?.trim() || ''
      };

      if (editingProject.id) {
        await updateProject(editingProject.id, payload);
        showToast(`Project "${editingProject.title}" updated in Firestore!`);
      } else {
        await addProject(payload as any);
        showToast(`New project "${editingProject.title}" created in Firestore!`);
      }
      setIsProjectFormOpen(false);
      setEditingProject(null);
    } catch (err) {
      console.error(err);
      showToast('Error saving project to database.');
    }
  };

  const handleDeleteProject = async (proj: Project) => {
    if (window.confirm(`Are you sure you want to delete "${proj.title}"?`)) {
      await deleteProject(proj.id);
      showToast(`Deleted project "${proj.title}"`);
    }
  };

  // --- CERTIFICATION FORM HANDLERS ---
  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert?.title) return;

    try {
      if (editingCert.id) {
        await updateCertification(editingCert.id, editingCert);
        showToast(`Certification updated!`);
      } else {
        await addCertification(editingCert as any);
        showToast(`New certification created!`);
      }
      setIsCertFormOpen(false);
      setEditingCert(null);
    } catch (err) {
      console.error(err);
      showToast('Error saving certification.');
    }
  };

  const handleDeleteCert = async (cert: Certification) => {
    if (window.confirm(`Are you sure you want to delete "${cert.title}"?`)) {
      await deleteCertification(cert.id);
      showToast(`Deleted certification`);
    }
  };

  // --- EXPERIENCE FORM HANDLERS ---
  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp?.role || !editingExp?.organization) return;

    try {
      if (editingExp.id) {
        await updateExperience(editingExp.id, editingExp);
        showToast(`Experience updated!`);
      } else {
        await addExperience(editingExp as any);
        showToast(`New experience created!`);
      }
      setIsExpFormOpen(false);
      setEditingExp(null);
    } catch (err) {
      console.error(err);
      showToast('Error saving experience.');
    }
  };

  const handleDeleteExp = async (exp: ExperienceItem) => {
    if (window.confirm(`Delete experience item for "${exp.role}" at ${exp.organization}?`)) {
      await deleteExperience(exp.id);
      showToast(`Deleted experience`);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    try {
      const success = await signInWithGoogle();
      if (success) {
        showToast('Successfully signed in with Google!');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    showToast('Signed out of Administrator CMS.');
  };

  if (!isOpen) return null;

  // Google Authentication Gate (If not logged in)
  if (!user) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
        <div className="relative w-full max-w-md bg-[#0f0f10] border border-neutral-800 text-white rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Lock / Security Badge */}
          <div className="flex flex-col items-center text-center space-y-4 pt-2 pb-6">
            <div className="w-16 h-16 rounded-2xl bg-[#d90429]/10 border border-[#d90429]/30 flex items-center justify-center text-[#d90429] shadow-lg shadow-[#d90429]/10">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#d90429]">
                Restricted Administrative Zone
              </span>
              <h2 className="font-condensed text-3xl uppercase tracking-wider font-bold mt-1 text-white">
                Admin Authentication
              </h2>
              <p className="text-xs text-neutral-400 font-body mt-2 leading-relaxed max-w-xs mx-auto">
                Sign in with your verified Google Account to access portfolio management, time tracking, and cloud databases.
              </p>
            </div>
          </div>

          {/* Auth Error Banner */}
          {authError && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/50 border border-red-800/80 text-red-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">Sign-in Error</p>
                <p className="opacity-90 mt-0.5">{authError}</p>
              </div>
            </div>
          )}

          {/* Google Sign In Button */}
          <div className="space-y-4">
            <button
              onClick={handleGoogleSignIn}
              disabled={isSigningIn || authLoading}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-neutral-100 text-neutral-900 px-5 py-3.5 rounded-xl font-body text-sm font-bold tracking-wide transition-all shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSigningIn || authLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-neutral-900" />
                  <span>Connecting to Google...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </>
              )}
            </button>

            <div className="text-center">
              <span className="text-[11px] text-neutral-500 font-body">
                Authorized: <span className="text-neutral-400 font-mono">pedrorafaelbarriossalazar@gmail.com</span>
              </span>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-8 pt-4 border-t border-neutral-800 flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 font-body">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Protected by Google Identity & Cloud Firestore</span>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-6 right-6 z-[120] px-4 py-3 rounded-lg bg-[#d90429] text-white font-medium text-sm shadow-2xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main CMS Container */}
      <div className="relative w-full max-w-5xl h-[88vh] bg-[#0f0f10] border border-neutral-800 text-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d90429]/10 border border-[#d90429]/30 flex items-center justify-center text-[#d90429]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-condensed text-2xl uppercase tracking-wider font-bold">
                  CMS Backend Dashboard
                </h2>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  dbConnected ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${dbConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  {dbConnected ? 'Firestore Synced' : 'Offline / Local Fallback'}
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-body">
                Update projects, certifications, and work experience in real time.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Authenticated User Badge */}
            {user && (
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 mr-2">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Admin'}
                    referrerPolicy="no-referrer"
                    className="w-5 h-5 rounded-full border border-neutral-700 object-cover"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-[#d90429] text-white text-[10px] font-bold flex items-center justify-center">
                    {(user.email || 'A')[0].toUpperCase()}
                  </div>
                )}
                <span className="text-xs text-neutral-300 font-medium max-w-[140px] truncate" title={user.email || ''}>
                  {user.displayName || user.email}
                </span>
              </div>
            )}

            {/* Export JSON button */}
            <button
              onClick={handleExportJSON}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors flex items-center gap-1.5 border border-neutral-700 active:scale-95"
              title="Export all portfolio data as JSON backup"
            >
              <Download className="w-3.5 h-3.5 text-[#d90429]" />
              <span className="hidden sm:inline">Export JSON</span>
            </button>

            {/* Import JSON button */}
            <button
              onClick={() => {
                setImportFile(null);
                setParsedData(null);
                setImportError(null);
                setIsImportModalOpen(true);
              }}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors flex items-center gap-1.5 border border-neutral-700 active:scale-95"
              title="Import JSON to restore data"
            >
              <Upload className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Import JSON</span>
            </button>

            {/* Sync Defaults button */}
            <button
              onClick={() => {
                if (window.confirm('Restore initial starter data to Firestore? This will reset custom edits.')) {
                  seedDatabaseIfEmpty();
                  showToast('Database synced with starter data!');
                }
              }}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors flex items-center gap-1.5 border border-neutral-700"
              title="Reseed starter dataset"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Sync Defaults</span>
            </button>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-950/40 hover:bg-red-900/50 text-red-300 transition-colors flex items-center gap-1.5 border border-red-800/60 active:scale-95 cursor-pointer"
              title="Sign out of Admin CMS"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation & Search Toolbar */}
        <div className="px-6 py-3 bg-neutral-900/50 border-b border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800 w-full sm:w-auto">
            <button
              onClick={() => { setActiveTab('projects'); setSearchQuery(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'projects'
                  ? 'bg-[#d90429] text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Projects ({projects.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('certifications'); setSearchQuery(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'certifications'
                  ? 'bg-[#d90429] text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Certifications ({certifications.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('experiences'); setSearchQuery(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'experiences'
                  ? 'bg-[#d90429] text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Experience ({experiences.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('timetracker'); setSearchQuery(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all relative ${
                activeTab === 'timetracker'
                  ? 'bg-[#d90429] text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Timer className="w-4 h-4" />
              <span>Time Tracker ({timeLogs.length})</span>
              {activeTimer.isRunning && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {activeTab !== 'timetracker' && (
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d90429]"
                />
              </div>
            )}

            {activeTab === 'projects' && (
              <button
                onClick={() => {
                  setEditingProject({
                    title: '',
                    subtitle: '',
                    category: 'financial',
                    categoryLabel: 'SERVICIOS FINANCIEROS',
                    year: new Date().getFullYear().toString(),
                    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
                    medium: 'React, Web Application, UI/UX',
                    description: '',
                    featured: false
                  });
                  setIsProjectFormOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            )}

            {activeTab === 'certifications' && (
              <button
                onClick={() => {
                  setEditingCert({
                    title: '',
                    issuer: '',
                    date: '2025',
                    category: 'cs-dev',
                    iconUrl: ''
                  });
                  setIsCertFormOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Add Certification</span>
              </button>
            )}

            {activeTab === 'experiences' && (
              <button
                onClick={() => {
                  setEditingExp({
                    role: '',
                    organization: '',
                    period: '2025 – PRESENT',
                    location: 'Remote',
                    description: '',
                    highlights: []
                  });
                  setIsExpFormOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Add Experience</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          
          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects
                .filter((p) => 
                  p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  p.category.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((proj) => (
                  <div 
                    key={proj.id}
                    className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={proj.image} 
                            alt={proj.title} 
                            className="w-14 h-14 object-cover rounded-lg border border-neutral-700 bg-neutral-950" 
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-sm text-white">{proj.title}</h3>
                              {proj.featured && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#d90429]/20 text-[#d90429] border border-[#d90429]/30">
                                  FEATURED
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-neutral-400">{proj.subtitle || proj.medium}</p>
                            <span className="text-[10px] uppercase tracking-wider text-neutral-500">{proj.categoryLabel || proj.category} • {proj.year}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-300 line-clamp-2 mb-3 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                      {proj.liveUrl ? (
                        <a 
                          href={proj.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Visit Site</span>
                        </a>
                      ) : <span />}

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingProject(proj);
                            setIsProjectFormOpen(true);
                          }}
                          className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors flex items-center gap-1 text-xs"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj)}
                          className="p-1.5 rounded bg-red-950/50 hover:bg-red-900/60 text-red-300 transition-colors flex items-center gap-1 text-xs border border-red-800/40"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* CERTIFICATIONS TAB */}
          {activeTab === 'certifications' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {certifications
                .filter((c) => 
                  c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  c.issuer.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((cert) => (
                  <div 
                    key={cert.id}
                    className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        {cert.iconUrl ? (
                          <img src={cert.iconUrl} alt={cert.issuer} className="w-6 h-6 object-contain rounded" />
                        ) : (
                          <Award className="w-5 h-5 text-[#d90429]" />
                        )}
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                          {cert.category}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-white leading-snug mb-1">{cert.title}</h4>
                      <p className="text-[11px] text-neutral-400">{cert.issuer} • {cert.date}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-neutral-800 flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setEditingCert(cert);
                          setIsCertFormOpen(true);
                        }}
                        className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] flex items-center gap-1 px-2"
                      >
                        <Edit3 className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCert(cert)}
                        className="p-1 rounded bg-red-950/50 hover:bg-red-900/60 text-red-300 text-[11px] flex items-center gap-1 px-2"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* EXPERIENCES TAB */}
          {activeTab === 'experiences' && (
            <div className="space-y-3">
              {experiences
                .filter((e) => 
                  e.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  e.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  e.description.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((exp) => (
                  <div 
                    key={exp.id}
                    className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#d90429] uppercase">{exp.period}</span>
                        <span className="text-neutral-600">•</span>
                        <span className="text-xs text-neutral-400">{exp.location}</span>
                      </div>
                      <h3 className="text-base font-bold text-white">{exp.role} — <span className="text-neutral-400 font-normal">{exp.organization}</span></h3>
                      <p className="text-xs text-neutral-300 leading-relaxed">{exp.description}</p>
                      {exp.highlights && exp.highlights.length > 0 && (
                        <ul className="list-disc list-inside text-[11px] text-neutral-400 space-y-0.5 pt-1">
                          {exp.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-start">
                      <button
                        onClick={() => {
                          setEditingExp(exp);
                          setIsExpFormOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs flex items-center gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteExp(exp)}
                        className="px-3 py-1.5 rounded-lg bg-red-950/50 hover:bg-red-900/60 text-red-300 text-xs flex items-center gap-1.5 border border-red-800/40"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* TIME TRACKER & HOURS COUNTER TAB */}
          {activeTab === 'timetracker' && (
            <div className="animate-in fade-in duration-150">
              <WorkTimeTrackerCMS />
            </div>
          )}

        </div>
      </div>

      {/* MODAL FORM: PROJECT */}
      {isProjectFormOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-white max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-4">
              <h3 className="font-bold text-lg">{editingProject?.id ? 'Edit Project' : 'Add New Project'}</h3>
              <button onClick={() => setIsProjectFormOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={editingProject?.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:border-[#d90429]"
                  placeholder="e.g. SMILE SANCTUARY"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Category</label>
                  <select
                    value={editingProject?.category || 'financial'}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:border-[#d90429]"
                  >
                    <option value="financial">Financial</option>
                    <option value="health">Health</option>
                    <option value="marketing">Marketing</option>
                    <option value="realestate-environment">Real Estate / Environment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Year</label>
                  <input
                    type="text"
                    value={editingProject?.year || '2025'}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:border-[#d90429]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-neutral-400">Cover Image Path / URL *</label>
                  <span className="text-[10px] text-neutral-500">e.g. /images/project.jpg or https://...</span>
                </div>
                <input
                  type="text"
                  required
                  value={editingProject?.image || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:border-[#d90429]"
                  placeholder="/images/my-project.jpg or https://..."
                />
              </div>

              {/* LIVE URL & FAVICON SECTION */}
              <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#d90429]" />
                    <span>Live Website & Favicon</span>
                  </label>
                  <span className="text-[10px] text-neutral-500 font-mono">Custom Favicon or Auto-Detect</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Live URL
                    </label>
                    <input
                      type="url"
                      value={editingProject?.liveUrl || editingProject?.link || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditingProject({ ...editingProject, liveUrl: val, link: val });
                      }}
                      className="w-full p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#d90429]"
                      placeholder="https://smilesanctuary.net"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                        Favicon URL
                      </label>
                      {editingProject?.faviconUrl && (
                        <button
                          type="button"
                          onClick={() => setEditingProject({ ...editingProject, faviconUrl: '' })}
                          className="text-[10px] text-neutral-500 hover:text-red-400 transition-colors"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-white p-1 flex items-center justify-center shrink-0 border border-neutral-700">
                        {editingProject?.faviconUrl ? (
                          <img
                            src={editingProject.faviconUrl}
                            alt=""
                            className="w-full h-full object-contain"
                            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                          />
                        ) : (
                          <Globe className="w-3.5 h-3.5 text-neutral-400" />
                        )}
                      </div>
                      <input
                        type="url"
                        value={editingProject?.faviconUrl || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, faviconUrl: e.target.value })}
                        className="flex-1 p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#d90429]"
                        placeholder="https://.../favicon.png"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const domain = extractDomain(editingProject?.liveUrl || editingProject?.link || editingProject?.subtitle || editingProject?.title);
                      if (!domain) {
                        showToast('Please enter Live URL or Subtitle domain first.');
                        return;
                      }
                      const autoIcon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
                      setEditingProject({ ...editingProject, faviconUrl: autoIcon });
                      showToast(`Auto-detected Google Favicon for ${domain}!`);
                    }}
                    className="px-2.5 py-1 rounded bg-[#d90429]/15 hover:bg-[#d90429]/30 text-[#d90429] border border-[#d90429]/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                  >
                    <Wand2 className="w-3 h-3" />
                    <span>Auto-Detect Favicon</span>
                  </button>

                  {editingProject?.faviconUrl && (
                    <a
                      href={editingProject.faviconUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-neutral-400 hover:text-white flex items-center gap-1 font-mono"
                    >
                      <span>Test Icon</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Medium / Tech Stack</label>
                <input
                  type="text"
                  value={editingProject?.medium || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, medium: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:border-[#d90429]"
                  placeholder="React, Express, UI/UX"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={editingProject?.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:border-[#d90429]"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Story / Detail</label>
                <textarea
                  rows={3}
                  value={editingProject?.story || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, story: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:border-[#d90429]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={editingProject?.featured || false}
                  onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                  className="w-4 h-4 accent-[#d90429]"
                />
                <label htmlFor="featured-check" className="text-neutral-300 font-medium cursor-pointer">
                  Feature this project on top highlight grid
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsProjectFormOpen(false)}
                  className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#d90429] hover:bg-[#b00320] text-white font-bold uppercase tracking-wider"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FORM: CERTIFICATION */}
      {isCertFormOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-4">
              <h3 className="font-bold text-lg">{editingCert?.id ? 'Edit Certification' : 'Add Certification'}</h3>
              <button onClick={() => setIsCertFormOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCert} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Certification Title *</label>
                <input
                  type="text"
                  required
                  value={editingCert?.title || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:border-[#d90429]"
                  placeholder="e.g. AWS Certified Developer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Issuer *</label>
                  <input
                    type="text"
                    required
                    value={editingCert?.issuer || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:border-[#d90429]"
                    placeholder="e.g. HubSpot, Google, Cisco"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Date *</label>
                  <input
                    type="text"
                    required
                    value={editingCert?.date || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, date: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:border-[#d90429]"
                    placeholder="e.g. Aug 2025"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Category</label>
                <select
                  value={editingCert?.category || 'cs-dev'}
                  onChange={(e) => setEditingCert({ ...editingCert, category: e.target.value as any })}
                  className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:border-[#d90429]"
                >
                  <option value="cs-dev">Computer Science & Dev</option>
                  <option value="ai-data">AI & Data</option>
                  <option value="marketing-ads">Marketing & Ads</option>
                  <option value="seo-analytics">SEO & Analytics</option>
                  <option value="business-security">Business & Security</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Icon / Favicon URL</label>
                <input
                  type="url"
                  value={editingCert?.iconUrl || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, iconUrl: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:border-[#d90429]"
                  placeholder="https://..."
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsCertFormOpen(false)}
                  className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#d90429] hover:bg-[#b00320] text-white font-bold uppercase tracking-wider"
                >
                  Save Certification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FORM: EXPERIENCE */}
      {isExpFormOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-4">
              <h3 className="font-bold text-lg">{editingExp?.id ? 'Edit Experience' : 'Add Experience'}</h3>
              <button onClick={() => setIsExpFormOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveExp} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Role Title *</label>
                <input
                  type="text"
                  required
                  value={editingExp?.role || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:border-[#d90429]"
                  placeholder="e.g. Senior Web Developer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Organization *</label>
                  <input
                    type="text"
                    required
                    value={editingExp?.organization || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, organization: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:border-[#d90429]"
                    placeholder="e.g. Origami Solutions"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Period *</label>
                  <input
                    type="text"
                    required
                    value={editingExp?.period || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, period: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:border-[#d90429]"
                    placeholder="e.g. 2024 – PRESENT"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Location</label>
                <input
                  type="text"
                  value={editingExp?.location || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:border-[#d90429]"
                  placeholder="e.g. Remote / On-site"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={editingExp?.description || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:border-[#d90429]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsExpFormOpen(false)}
                  className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#d90429] hover:bg-[#b00320] text-white font-bold uppercase tracking-wider"
                >
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: IMPORT JSON BACKUP & RESTORE */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#141416] border border-neutral-800 rounded-2xl p-6 text-white shadow-2xl space-y-5">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <FileJson className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-condensed text-xl font-bold uppercase tracking-wider">
                    Import Portfolio Backup
                  </h3>
                  <p className="text-xs text-neutral-400 font-body">
                    Upload a JSON export file to restore portfolio content.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* File Upload / Drop Area */}
            <div>
              <input
                type="file"
                ref={fileInputRef}
                accept=".json,application/json"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileChange(file);
                }}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFileChange(file);
                }}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                  importFile
                    ? 'border-emerald-500/50 bg-emerald-950/10'
                    : 'border-neutral-700 hover:border-neutral-500 bg-neutral-950/60'
                }`}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400">
                  <FileUp className="w-6 h-6 text-[#d90429]" />
                </div>
                {importFile ? (
                  <div>
                    <p className="text-sm font-semibold text-emerald-400">{importFile.name}</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      {(importFile.size / 1024).toFixed(1)} KB • Click or drop to change file
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-semibold text-neutral-200">
                      Click to select or drag & drop a JSON backup file
                    </p>
                    <p className="text-[11px] text-neutral-500 mt-1">
                      Supports Pedro Barrios portfolio backup JSON (.json)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Error Message */}
            {importError && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{importError}</span>
              </div>
            )}

            {/* Parsed Preview */}
            {parsedData && (
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Valid Backup Content Detected
                  </span>
                  {parsedData.exportedAt && (
                    <span className="text-[10px] text-neutral-500">
                      Exported: {new Date(parsedData.exportedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-lg bg-neutral-900/90 border border-neutral-800 text-center">
                    <p className="text-lg font-bold font-condensed text-white">
                      {parsedData.projects?.length || 0}
                    </p>
                    <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">
                      Projects
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-neutral-900/90 border border-neutral-800 text-center">
                    <p className="text-lg font-bold font-condensed text-white">
                      {parsedData.certifications?.length || 0}
                    </p>
                    <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">
                      Certifications
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-neutral-900/90 border border-neutral-800 text-center">
                    <p className="text-lg font-bold font-condensed text-white">
                      {parsedData.experiences?.length || 0}
                    </p>
                    <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">
                      Experiences
                    </p>
                  </div>
                </div>

                {/* Import Strategy Selection */}
                <div className="pt-2 border-t border-neutral-900 space-y-2">
                  <p className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider">
                    Restore Strategy:
                  </p>
                  
                  <div className="space-y-1.5">
                    <label className={`flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-all ${
                      importMode === 'replace' 
                        ? 'bg-[#d90429]/10 border-[#d90429]/40 text-white' 
                        : 'bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}>
                      <input
                        type="radio"
                        name="importMode"
                        value="replace"
                        checked={importMode === 'replace'}
                        onChange={() => setImportMode('replace')}
                        className="mt-0.5 accent-[#d90429]"
                      />
                      <div>
                        <p className="text-xs font-bold text-white">Replace All (Full Restore)</p>
                        <p className="text-[11px] text-neutral-400 leading-snug">
                          Replaces existing records with the backup file data.
                        </p>
                      </div>
                    </label>

                    <label className={`flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-all ${
                      importMode === 'merge' 
                        ? 'bg-[#d90429]/10 border-[#d90429]/40 text-white' 
                        : 'bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}>
                      <input
                        type="radio"
                        name="importMode"
                        value="merge"
                        checked={importMode === 'merge'}
                        onChange={() => setImportMode('merge')}
                        className="mt-0.5 accent-[#d90429]"
                      />
                      <div>
                        <p className="text-xs font-bold text-white">Merge & Append</p>
                        <p className="text-[11px] text-neutral-400 leading-snug">
                          Updates matching records and adds new items without deleting existing data.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

              </div>
            )}

            {/* Actions */}
            <div className="pt-3 flex justify-end gap-2.5 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setIsImportModalOpen(false)}
                disabled={isImporting}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
              >
                Cancel
              </button>
              
              <button
                type="button"
                onClick={handleConfirmImport}
                disabled={!parsedData || isImporting}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-2 transition-all shadow-md ${
                  parsedData && !isImporting
                    ? 'bg-[#d90429] hover:bg-[#b00320] text-white active:scale-95 cursor-pointer'
                    : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                }`}
              >
                {isImporting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Restoring to Firestore...</span>
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore Portfolio Data</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
