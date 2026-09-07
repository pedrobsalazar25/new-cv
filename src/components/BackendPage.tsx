import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Database, 
  Award, 
  Briefcase, 
  FolderGit2, 
  Check, 
  ExternalLink, 
  RefreshCw, 
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
  ArrowLeft, 
  Sun, 
  Moon, 
  Globe, 
  Sliders,
  Wand2,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Project, Certification, ExperienceItem, TimeLog } from '../types';
import { WorkTimeTrackerCMS } from './WorkTimeTrackerCMS';
import { BrandLogo } from './BrandLogo';

// Helper to extract clean domain from URL or string
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

interface BackendPageProps {
  onBackToPortfolio: () => void;
}

export const BackendPage: React.FC<BackendPageProps> = ({ onBackToPortfolio }) => {
  const { user, loading: authLoading, signInWithGoogle, logout, authError, clearAuthError } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

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
      setImportError('Failed to read file.');
    };

    reader.readAsText(file);
  };

  const handleExecuteImport = async () => {
    if (!parsedData) return;

    setIsImporting(true);
    setImportError(null);

    try {
      await importPortfolioData(parsedData, importMode);
      showToast(
        `Restored data (${importMode === 'replace' ? 'replaced existing' : 'merged with existing'}): ` +
        `${parsedData.projects?.length || 0} projects, ${parsedData.certifications?.length || 0} certs, ` +
        `${parsedData.experiences?.length || 0} exps, ${parsedData.timeLogs?.length || 0} time logs.`
      );
      setIsImportModalOpen(false);
      setImportFile(null);
      setParsedData(null);
    } catch (err: any) {
      console.error('Import error:', err);
      setImportError(err.message || 'Failed to restore data to Firestore.');
    } finally {
      setIsImporting(false);
    }
  };

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

  // Google Authentication Gate (If not logged in)
  if (!user) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex flex-col justify-between p-4 sm:p-8 font-body">
        {/* Top bar on Auth Screen */}
        <div className="max-w-6xl w-full mx-auto flex items-center justify-between py-4">
          <button
            onClick={onBackToPortfolio}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider border border-neutral-800 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#d90429]" />
            <span>Back to Public Portfolio</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-bold text-neutral-300"
            >
              {language.toUpperCase()}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Center Auth Card */}
        <div className="relative w-full max-w-md mx-auto bg-[#121214] border border-neutral-800 text-white rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 my-auto">
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

        {/* Footer */}
        <div className="text-center text-xs text-neutral-600 py-4">
          Pedro Barrios Portfolio Backend CMS &bull; Secure Administrative Console
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-white flex flex-col font-body selection:bg-[#d90429] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[120] px-4 py-3 rounded-lg bg-[#d90429] text-white font-medium text-sm shadow-2xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#121214]/95 backdrop-blur-md border-b border-neutral-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Brand and Back Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToPortfolio}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-all text-xs font-bold uppercase tracking-wider border border-neutral-700 cursor-pointer shadow-sm active:scale-95"
              title="Return to public portfolio homepage"
            >
              <ArrowLeft className="w-4 h-4 text-[#d90429]" />
              <span className="hidden sm:inline">Back to Portfolio</span>
            </button>

            <div className="h-6 w-px bg-neutral-800 hidden sm:block" />

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#d90429]/10 border border-[#d90429]/30 flex items-center justify-center text-[#d90429]">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-condensed text-xl sm:text-2xl uppercase tracking-wider font-bold text-white">
                    CMS Backend
                  </h1>
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    dbConnected ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${dbConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                    <span className="hidden md:inline">{dbConnected ? 'Firestore Synced' : 'Offline / Local'}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Authenticated User Badge */}
            {user && (
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800">
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
                <span className="text-xs text-neutral-300 font-medium max-w-[130px] truncate" title={user.email || ''}>
                  {user.displayName || user.email}
                </span>
              </div>
            )}

            {/* Export JSON button */}
            <button
              onClick={handleExportJSON}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 transition-colors flex items-center gap-1.5 border border-neutral-700 active:scale-95 cursor-pointer"
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
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 transition-colors flex items-center gap-1.5 border border-neutral-700 active:scale-95 cursor-pointer"
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
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 transition-colors flex items-center gap-1.5 border border-neutral-700 cursor-pointer"
              title="Reseed starter dataset"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Sync Defaults</span>
            </button>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-red-950/40 hover:bg-red-900/50 text-red-300 transition-colors flex items-center gap-1.5 border border-red-800/60 active:scale-95 cursor-pointer"
              title="Sign out of Admin CMS"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* Secondary Navigation & Sub-Tabs Bar */}
      <div className="bg-[#121214] border-b border-neutral-800 sticky top-18 sm:top-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Tabs */}
          <div className="flex items-center gap-1.5 bg-neutral-950 p-1 rounded-xl border border-neutral-800 w-full md:w-auto overflow-x-auto">
            <button
              onClick={() => { setActiveTab('projects'); setSearchQuery(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
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
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
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
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
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
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all relative whitespace-nowrap cursor-pointer ${
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

          {/* Search & Add Action */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {activeTab !== 'timetracker' && (
              <div className="relative flex-1 md:w-64">
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
                    liveUrl: '',
                    link: '',
                    faviconUrl: '',
                    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
                    medium: 'React, Web Application, UI/UX',
                    description: '',
                    featured: false
                  });
                  setIsProjectFormOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg whitespace-nowrap cursor-pointer"
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
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg whitespace-nowrap cursor-pointer"
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
                    type: 'Full-time',
                    description: '',
                    skills: []
                  });
                  setIsExpFormOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg whitespace-nowrap cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Experience</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
                Managed Projects ({projects.length} Total)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects
                .filter(p => 
                  p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  p.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  p.description?.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((project) => (
                  <div 
                    key={project.id}
                    className="p-5 rounded-2xl bg-[#141417] border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between group shadow-lg"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                            {project.categoryLabel || project.category}
                          </span>

                          {project.faviconUrl ? (
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/10 border border-white/20" title={`Favicon: ${project.faviconUrl}`}>
                              <div className="w-3.5 h-3.5 rounded bg-white p-0.5 flex items-center justify-center shrink-0">
                                <img 
                                  src={project.faviconUrl} 
                                  alt="" 
                                  className="w-full h-full object-contain" 
                                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                                />
                              </div>
                              <span className="text-[9px] font-mono text-neutral-300">Favicon</span>
                            </div>
                          ) : (
                            <span className="text-[9px] font-mono text-neutral-500 bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-800">
                              No Favicon
                            </span>
                          )}
                        </div>

                        {project.featured && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#d90429]/20 text-[#d90429] border border-[#d90429]/30 shrink-0">
                            Featured
                          </span>
                        )}
                      </div>

                      <h3 className="font-condensed text-xl font-bold uppercase text-white group-hover:text-[#d90429] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-neutral-400 font-mono mt-0.5 mb-2">
                        {project.subtitle} &bull; {project.year}
                      </p>
                      <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                      {project.link ? (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 font-mono"
                        >
                          <span>Visit Domain</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-[11px] text-neutral-500 font-mono">No Live URL</span>
                      )}

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingProject(project);
                            setIsProjectFormOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                          title="Edit project"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project)}
                          className="p-1.5 rounded-lg bg-neutral-900 hover:bg-red-950/60 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* CERTIFICATIONS TAB */}
        {activeTab === 'certifications' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
                Certificates & Accreditations ({certifications.length} Total)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications
                .filter(c => 
                  c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  c.issuer.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((cert) => (
                  <div 
                    key={cert.id}
                    className="p-5 rounded-2xl bg-[#141417] border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between group shadow-lg"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                          {cert.category}
                        </span>
                        <span className="text-xs font-mono text-neutral-400">{cert.date}</span>
                      </div>

                      <h3 className="font-condensed text-lg font-bold uppercase text-white group-hover:text-[#d90429] transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1 font-body">
                        {cert.issuer}
                      </p>
                      {cert.credentialId && (
                        <p className="text-[11px] font-mono text-neutral-500 mt-2">
                          ID: {cert.credentialId}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between mt-4">
                      {cert.credentialUrl ? (
                        <a 
                          href={cert.credentialUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 font-mono"
                        >
                          <span>Verify Credential</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-[11px] text-neutral-500">Verified</span>
                      )}

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingCert(cert);
                            setIsCertFormOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                          title="Edit certification"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCert(cert)}
                          className="p-1.5 rounded-lg bg-neutral-900 hover:bg-red-950/60 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete certification"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* EXPERIENCE TAB */}
        {activeTab === 'experiences' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
                Work Experience Records ({experiences.length} Total)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {experiences
                .filter(e => 
                  e.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  e.organization.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((exp) => (
                  <div 
                    key={exp.id}
                    className="p-5 rounded-2xl bg-[#141417] border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between group shadow-lg"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-xs font-mono font-bold text-[#d90429]">
                          {exp.period}
                        </span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                          {exp.type}
                        </span>
                      </div>

                      <h3 className="font-condensed text-xl font-bold uppercase text-white group-hover:text-[#d90429] transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-xs font-bold text-neutral-300 mt-0.5">
                        {exp.organization} &bull; <span className="text-neutral-400">{exp.location}</span>
                      </p>
                      
                      <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
                        {exp.description}
                      </p>

                      {exp.skills && exp.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {exp.skills.map((s, idx) => (
                            <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-end gap-1 mt-4">
                      <button
                        onClick={() => {
                          setEditingExp(exp);
                          setIsExpFormOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                        title="Edit experience"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteExp(exp)}
                        className="p-1.5 rounded-lg bg-neutral-900 hover:bg-red-950/60 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
                        title="Delete experience"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TIME TRACKER CMS TAB */}
        {activeTab === 'timetracker' && (
          <WorkTimeTrackerCMS />
        )}

      </main>

      {/* ============================================================ */}
      {/* EDIT/ADD PROJECT MODAL DIALOG */}
      {/* ============================================================ */}
      {isProjectFormOpen && editingProject && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#121214] border border-neutral-800 rounded-2xl p-6 text-white max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="font-condensed text-2xl font-bold uppercase mb-4 text-[#d90429]">
              {editingProject.id ? 'Edit Project' : 'Create New Project'}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:border-[#d90429]"
                    placeholder="e.g., Smile Sanctuary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Subtitle / Domain
                  </label>
                  <input
                    type="text"
                    value={editingProject.subtitle || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:border-[#d90429]"
                    placeholder="e.g., smilesanctuary.net"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Category Key
                  </label>
                  <select
                    value={editingProject.category || 'financial'}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:border-[#d90429]"
                  >
                    <option value="financial">Financial / Legal</option>
                    <option value="health">Health / Medical</option>
                    <option value="marketing">Marketing / Non-Profit</option>
                    <option value="realestate">Real Estate / Green Energy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Category Badge Label
                  </label>
                  <input
                    type="text"
                    value={editingProject.categoryLabel || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, categoryLabel: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:border-[#d90429]"
                    placeholder="e.g., HEALTHCARE & DENTAL"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    value={editingProject.year || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:border-[#d90429]"
                    placeholder="2025"
                  />
                </div>
              </div>

              {/* LIVE URL & FAVICON CONFIGURATION SECTION */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#d90429]" />
                    <span>Live Website & Favicon Icon</span>
                  </label>
                  <span className="text-[10px] text-neutral-500 font-mono">Auto-detect or custom URL</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Live Project URL / Link
                    </label>
                    <input
                      type="url"
                      value={editingProject.link || editingProject.liveUrl || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditingProject({ 
                          ...editingProject, 
                          link: val, 
                          liveUrl: val 
                        });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:border-[#d90429]"
                      placeholder="https://smilesanctuary.net/"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                        Favicon / Site Icon URL
                      </label>
                      {editingProject.faviconUrl && (
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
                      {/* Live Favicon Preview Avatar */}
                      <div className="w-9 h-9 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 border border-neutral-700 shadow-inner" title="Favicon Live Preview">
                        {editingProject.faviconUrl ? (
                          <img
                            src={editingProject.faviconUrl}
                            alt="Favicon preview"
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <Globe className="w-4 h-4 text-neutral-400" />
                        )}
                      </div>

                      <input
                        type="url"
                        value={editingProject.faviconUrl || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, faviconUrl: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:border-[#d90429]"
                        placeholder="https://.../favicon.png or .ico"
                      />
                    </div>
                  </div>
                </div>

                {/* Auto-Detect & Quick Preset Helper Buttons */}
                <div className="pt-2 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      type="button"
                      onClick={() => {
                        const targetDomain = extractDomain(editingProject.link || editingProject.liveUrl || editingProject.subtitle || editingProject.title);
                        if (!targetDomain) {
                          showToast('Please enter a Live URL or Subtitle domain first.');
                          return;
                        }
                        const autoIcon = `https://www.google.com/s2/favicons?domain=${targetDomain}&sz=64`;
                        setEditingProject({ ...editingProject, faviconUrl: autoIcon });
                        showToast(`Auto-detected Google Favicon for ${targetDomain}!`);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-[#d90429]/15 hover:bg-[#d90429]/30 text-[#d90429] border border-[#d90429]/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                      title="Automatically fetch high-res icon via Google S2 Favicon API"
                    >
                      <Wand2 className="w-3 h-3" />
                      <span>Auto-Detect Favicon</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const targetDomain = extractDomain(editingProject.link || editingProject.liveUrl || editingProject.subtitle);
                        if (!targetDomain) {
                          showToast('Please enter a Live URL or Subtitle domain first.');
                          return;
                        }
                        const ddgIcon = `https://icons.duckduckgo.com/ip2/${targetDomain}.ico`;
                        setEditingProject({ ...editingProject, faviconUrl: ddgIcon });
                        showToast(`Set DuckDuckGo Favicon for ${targetDomain}!`);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer"
                      title="Use DuckDuckGo Favicon Service"
                    >
                      <span>DuckDuckGo CDN</span>
                    </button>
                  </div>

                  {editingProject.faviconUrl && (
                    <a
                      href={editingProject.faviconUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-neutral-400 hover:text-white flex items-center gap-1 font-mono"
                    >
                      <span>Test Icon URL</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={editingProject.image || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:border-[#d90429]"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Technologies / Medium
                </label>
                <input
                  type="text"
                  value={editingProject.medium || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, medium: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:border-[#d90429]"
                  placeholder="e.g., React, TypeScript, Tailwind, Node.js"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:border-[#d90429]"
                  placeholder="Provide an overview of the project, architecture, and impact..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="projectFeatured"
                  checked={editingProject.featured || false}
                  onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-[#d90429] focus:ring-0 bg-neutral-950 border-neutral-800"
                />
                <label htmlFor="projectFeatured" className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Feature in highlighted showcase
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsProjectFormOpen(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#d90429] hover:bg-[#b80322] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-lg"
                >
                  Save Project to Cloud
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* EDIT/ADD CERTIFICATION MODAL DIALOG */}
      {/* ============================================================ */}
      {isCertFormOpen && editingCert && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#121214] border border-neutral-800 rounded-2xl p-6 text-white max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="font-condensed text-2xl font-bold uppercase mb-4 text-[#d90429]">
              {editingCert.id ? 'Edit Certification' : 'Create Certification'}
            </h3>

            <form onSubmit={handleSaveCert} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Certification Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingCert.title || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:border-[#d90429]"
                  placeholder="e.g., Meta Frontend Developer Professional Certificate"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Issuer Organization
                  </label>
                  <input
                    type="text"
                    value={editingCert.issuer || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:border-[#d90429]"
                    placeholder="e.g., Meta / Coursera"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Year / Date
                  </label>
                  <input
                    type="text"
                    value={editingCert.date || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:border-[#d90429]"
                    placeholder="2025"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Credential ID
                  </label>
                  <input
                    type="text"
                    value={editingCert.credentialId || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, credentialId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:border-[#d90429]"
                    placeholder="e.g., CERT-9482938"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={editingCert.category || 'cs-dev'}
                    onChange={(e) => setEditingCert({ ...editingCert, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:border-[#d90429]"
                    placeholder="cs-dev, cloud, design..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Credential Verification URL
                </label>
                <input
                  type="url"
                  value={editingCert.credentialUrl || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, credentialUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:border-[#d90429]"
                  placeholder="https://coursera.org/verify/..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsCertFormOpen(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#d90429] hover:bg-[#b80322] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-lg"
                >
                  Save Certification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* EDIT/ADD EXPERIENCE MODAL DIALOG */}
      {/* ============================================================ */}
      {isExpFormOpen && editingExp && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#121214] border border-neutral-800 rounded-2xl p-6 text-white max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="font-condensed text-2xl font-bold uppercase mb-4 text-[#d90429]">
              {editingExp.id ? 'Edit Work Experience' : 'Create Work Experience'}
            </h3>

            <form onSubmit={handleSaveExp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Job Role / Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingExp.role || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:border-[#d90429]"
                  placeholder="e.g., Senior Full-Stack Engineer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingExp.organization || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, organization: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:border-[#d90429]"
                    placeholder="e.g., Tech Innovations LLC"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Period
                  </label>
                  <input
                    type="text"
                    value={editingExp.period || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, period: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:border-[#d90429]"
                    placeholder="2022 – PRESENT"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingExp.location || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:border-[#d90429]"
                    placeholder="New York / Remote"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Type
                  </label>
                  <input
                    type="text"
                    value={editingExp.type || 'Full-time'}
                    onChange={(e) => setEditingExp({ ...editingExp, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:border-[#d90429]"
                    placeholder="Full-time, Contract, Lead..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Description / Responsibilities
                </label>
                <textarea
                  rows={4}
                  value={editingExp.description || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:border-[#d90429]"
                  placeholder="Key contributions and achievements..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Skills (Comma Separated)
                </label>
                <input
                  type="text"
                  value={editingExp.skills ? editingExp.skills.join(', ') : ''}
                  onChange={(e) => setEditingExp({ 
                    ...editingExp, 
                    skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:border-[#d90429]"
                  placeholder="React, TypeScript, GraphQL, Cloud..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsExpFormOpen(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#d90429] hover:bg-[#b80322] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-lg"
                >
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* IMPORT JSON MODAL */}
      {/* ============================================================ */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#121214] border border-neutral-800 rounded-2xl p-6 text-white shadow-2xl">
            <h3 className="font-condensed text-2xl font-bold uppercase mb-2 text-emerald-400 flex items-center gap-2">
              <FileUp className="w-5 h-5" />
              <span>Import JSON Backup</span>
            </h3>
            <p className="text-xs text-neutral-400 font-body mb-4">
              Restore your portfolio database from a previous JSON backup file.
            </p>

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-neutral-700 hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-neutral-950/60"
            >
              <input
                type="file"
                ref={fileInputRef}
                accept=".json,application/json"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileChange(e.target.files[0]);
                }}
              />
              <FileJson className="w-10 h-10 mx-auto text-emerald-400 mb-2" />
              <p className="text-xs font-bold text-neutral-200">
                {importFile ? importFile.name : 'Click to choose or drop a backup .json file'}
              </p>
              <p className="text-[11px] text-neutral-500 mt-1">
                Supports full backups including projects, certs, experiences, and time tracker logs
              </p>
            </div>

            {importError && (
              <div className="mt-3 p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{importError}</span>
              </div>
            )}

            {parsedData && (
              <div className="mt-4 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Valid Backup File Detected</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-400 pt-1">
                  <div>Projects: <span className="text-white font-bold">{parsedData.projects?.length || 0}</span></div>
                  <div>Certifications: <span className="text-white font-bold">{parsedData.certifications?.length || 0}</span></div>
                  <div>Experiences: <span className="text-white font-bold">{parsedData.experiences?.length || 0}</span></div>
                  <div>Time Logs: <span className="text-white font-bold">{parsedData.timeLogs?.length || 0}</span></div>
                </div>

                <div className="pt-2 border-t border-neutral-800 mt-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Restore Strategy
                  </label>
                  <div className="flex items-center gap-4 text-xs">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="importMode"
                        value="replace"
                        checked={importMode === 'replace'}
                        onChange={() => setImportMode('replace')}
                        className="text-emerald-500"
                      />
                      <span>Replace All</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="importMode"
                        value="merge"
                        checked={importMode === 'merge'}
                        onChange={() => setImportMode('merge')}
                        className="text-emerald-500"
                      />
                      <span>Merge & Update</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-5 mt-4 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setIsImportModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!parsedData || isImporting}
                onClick={handleExecuteImport}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-lg flex items-center gap-2"
              >
                {isImporting && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Confirm Restore</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
