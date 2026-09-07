import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Project, Certification, ExperienceItem, TimeLog, ActiveTimerState, WorkCategory } from '../types';
import { 
  PROJECTS as DEFAULT_PROJECTS, 
  CERTIFICATIONS as DEFAULT_CERTS, 
  EXPERIENCES as DEFAULT_EXPS,
  DEFAULT_TIME_LOGS
} from '../data/portfolioData';

export interface PortfolioExportData {
  version: string;
  exportedAt: string;
  projects: Project[];
  certifications: Certification[];
  experiences: ExperienceItem[];
  timeLogs?: TimeLog[];
}

const DEFAULT_ACTIVE_TIMER: ActiveTimerState = {
  isRunning: false,
  startTime: null,
  taskName: '',
  projectName: '',
  projectId: '',
  category: 'development',
  hourlyRate: 85,
  billable: true,
  accumulatedSeconds: 0,
};

const TIMER_STORAGE_KEY = 'pedro_portfolio_active_timer';

interface DataContextType {
  projects: Project[];
  certifications: Certification[];
  experiences: ExperienceItem[];
  timeLogs: TimeLog[];
  activeTimer: ActiveTimerState;
  currentElapsedSeconds: number;
  loading: boolean;
  dbConnected: boolean;
  
  // Projects CRUD
  addProject: (project: Omit<Project, 'id'> & { id?: string }) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  // Certifications CRUD
  addCertification: (cert: Omit<Certification, 'id'> & { id?: string }) => Promise<void>;
  updateCertification: (id: string, cert: Partial<Certification>) => Promise<void>;
  deleteCertification: (id: string) => Promise<void>;

  // Experience CRUD
  addExperience: (exp: Omit<ExperienceItem, 'id'> & { id?: string }) => Promise<void>;
  updateExperience: (id: string, exp: Partial<ExperienceItem>) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;

  // Time Logs CRUD
  addTimeLog: (log: Omit<TimeLog, 'id'> & { id?: string }) => Promise<string>;
  updateTimeLog: (id: string, log: Partial<TimeLog>) => Promise<void>;
  deleteTimeLog: (id: string) => Promise<void>;
  clearAllTimeLogs: () => Promise<void>;

  // Active Timer Controller
  startTimer: (params?: { 
    taskName?: string; 
    projectName?: string; 
    category?: WorkCategory; 
    hourlyRate?: number; 
    billable?: boolean; 
    projectId?: string; 
  }) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  stopTimer: (notes?: string) => Promise<TimeLog | null>;
  resetTimer: () => void;
  updateActiveTimerDraft: (draft: Partial<ActiveTimerState>) => void;

  // Seed / Sync / Backup
  seedDatabaseIfEmpty: () => Promise<void>;
  exportPortfolioData: () => PortfolioExportData;
  importPortfolioData: (
    data: { 
      projects?: Project[]; 
      certifications?: Certification[]; 
      experiences?: ExperienceItem[];
      timeLogs?: TimeLog[];
    },
    mode?: 'replace' | 'merge'
  ) => Promise<{ projectsCount: number; certsCount: number; expsCount: number; timeLogsCount: number }>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [certifications, setCertifications] = useState<Certification[]>(DEFAULT_CERTS);
  const [experiences, setExperiences] = useState<ExperienceItem[]>(DEFAULT_EXPS);
  const [timeLogs, setTimeLogs] = useState<TimeLog[]>(DEFAULT_TIME_LOGS);
  const [loading, setLoading] = useState<boolean>(true);
  const [dbConnected, setDbConnected] = useState<boolean>(false);

  // Active Timer State with localStorage cache
  const [activeTimer, setActiveTimer] = useState<ActiveTimerState>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(TIMER_STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (e) {
        console.error('Error loading active timer from storage:', e);
      }
    }
    return DEFAULT_ACTIVE_TIMER;
  });

  const [currentElapsedSeconds, setCurrentElapsedSeconds] = useState<number>(0);

  // Persist timer state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(activeTimer));
      } catch (e) {
        console.error('Error saving active timer to storage:', e);
      }
    }
  }, [activeTimer]);

  // Live stopwatch counter tick
  useEffect(() => {
    const calculateElapsed = () => {
      if (!activeTimer.isRunning || !activeTimer.startTime) {
        return activeTimer.accumulatedSeconds || 0;
      }
      const startMs = new Date(activeTimer.startTime).getTime();
      const nowMs = Date.now();
      const sessionSeconds = Math.max(0, Math.floor((nowMs - startMs) / 1000));
      return (activeTimer.accumulatedSeconds || 0) + sessionSeconds;
    };

    setCurrentElapsedSeconds(calculateElapsed());

    if (!activeTimer.isRunning) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentElapsedSeconds(calculateElapsed());
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTimer]);

  // Initialize listeners and seed if needed
  useEffect(() => {
    let unsubProjects: (() => void) | null = null;
    let unsubCerts: (() => void) | null = null;
    let unsubExps: (() => void) | null = null;
    let unsubTimeLogs: (() => void) | null = null;

    const setupDatabase = async () => {
      try {
        // Check if collections exist / seed if empty
        const projectsRef = collection(db, 'projects');
        const certsRef = collection(db, 'certifications');
        const expsRef = collection(db, 'experiences');
        const timeLogsRef = collection(db, 'time_logs');

        const [projectsSnap, certsSnap, expsSnap, timeLogsSnap] = await Promise.all([
          getDocs(projectsRef),
          getDocs(certsRef),
          getDocs(expsRef),
          getDocs(timeLogsRef)
        ]);

        // Seed or update projects in Firestore to ensure all 14 default projects exist
        const existingProjectIds = new Set(projectsSnap.docs.map((d) => d.id));
        for (const proj of DEFAULT_PROJECTS) {
          if (!existingProjectIds.has(proj.id)) {
            console.log(`Seeding missing project ${proj.id} to Firestore...`);
            await setDoc(doc(db, 'projects', proj.id), proj);
          }
        }

        if (certsSnap.empty) {
          console.log('Seeding certifications to Firestore...');
          for (const cert of DEFAULT_CERTS) {
            await setDoc(doc(db, 'certifications', cert.id), cert);
          }
        }

        if (expsSnap.empty) {
          console.log('Seeding experiences to Firestore...');
          for (const exp of DEFAULT_EXPS) {
            await setDoc(doc(db, 'experiences', exp.id), exp);
          }
        }

        if (timeLogsSnap.empty) {
          console.log('Seeding initial time logs to Firestore...');
          for (const log of DEFAULT_TIME_LOGS) {
            await setDoc(doc(db, 'time_logs', log.id), log);
          }
        }

        setDbConnected(true);

        // Subscribe to Projects
        unsubProjects = onSnapshot(projectsRef, (snapshot) => {
          if (!snapshot.empty) {
            const list: Project[] = snapshot.docs.map((d) => ({
              id: d.id,
              ...d.data()
            } as Project));
            
            // Merge with DEFAULT_PROJECTS to ensure no default project is dropped
            const existingIds = new Set(list.map((p) => p.id));
            const merged = [...list];
            for (const defProj of DEFAULT_PROJECTS) {
              if (!existingIds.has(defProj.id)) {
                merged.push(defProj);
              }
            }
            setProjects(merged);
          } else {
            setProjects(DEFAULT_PROJECTS);
          }
        }, (err) => {
          console.error('Projects subscription error:', err);
          setProjects(DEFAULT_PROJECTS);
        });

        // Subscribe to Certifications
        unsubCerts = onSnapshot(certsRef, (snapshot) => {
          if (!snapshot.empty) {
            const list: Certification[] = snapshot.docs.map((d) => ({
              id: d.id,
              ...d.data()
            } as Certification));
            setCertifications(list);
          }
        }, (err) => {
          console.error('Certifications subscription error:', err);
        });

        // Subscribe to Experiences
        unsubExps = onSnapshot(expsRef, (snapshot) => {
          if (!snapshot.empty) {
            const list: ExperienceItem[] = snapshot.docs.map((d) => ({
              id: d.id,
              ...d.data()
            } as ExperienceItem));
            setExperiences(list);
          }
        }, (err) => {
          console.error('Experiences subscription error:', err);
        });

        // Subscribe to Time Logs
        unsubTimeLogs = onSnapshot(timeLogsRef, (snapshot) => {
          if (!snapshot.empty) {
            const list: TimeLog[] = snapshot.docs.map((d) => ({
              id: d.id,
              ...d.data()
            } as TimeLog));
            // Sort by startTime / createdAt desc
            list.sort((a, b) => new Date(b.startTime || b.createdAt).getTime() - new Date(a.startTime || a.createdAt).getTime());
            setTimeLogs(list);
          }
        }, (err) => {
          console.error('TimeLogs subscription error:', err);
        });

      } catch (error) {
        console.error('Error connecting to Firestore:', error);
        setDbConnected(false);
      } finally {
        setLoading(false);
      }
    };

    setupDatabase();

    return () => {
      if (unsubProjects) unsubProjects();
      if (unsubCerts) unsubCerts();
      if (unsubExps) unsubExps();
      if (unsubTimeLogs) unsubTimeLogs();
    };
  }, []);

  // Manual seed helper
  const seedDatabaseIfEmpty = async () => {
    setLoading(true);
    try {
      for (const proj of DEFAULT_PROJECTS) {
        await setDoc(doc(db, 'projects', proj.id), proj);
      }
      for (const cert of DEFAULT_CERTS) {
        await setDoc(doc(db, 'certifications', cert.id), cert);
      }
      for (const exp of DEFAULT_EXPS) {
        await setDoc(doc(db, 'experiences', exp.id), exp);
      }
      for (const log of DEFAULT_TIME_LOGS) {
        await setDoc(doc(db, 'time_logs', log.id), log);
      }
      setDbConnected(true);
    } catch (e) {
      console.error('Failed manual seed:', e);
    } finally {
      setLoading(false);
    }
  };

  // --- PROJECTS CRUD ---
  const addProject = async (projectData: Omit<Project, 'id'> & { id?: string }) => {
    const id = projectData.id || `proj-${Date.now()}`;
    const newProj: Project = { ...projectData, id };
    await setDoc(doc(db, 'projects', id), newProj);
  };

  const updateProject = async (id: string, projectData: Partial<Project>) => {
    await updateDoc(doc(db, 'projects', id), projectData);
  };

  const deleteProject = async (id: string) => {
    await deleteDoc(doc(db, 'projects', id));
  };

  // --- CERTIFICATIONS CRUD ---
  const addCertification = async (certData: Omit<Certification, 'id'> & { id?: string }) => {
    const id = certData.id || `cert-${Date.now()}`;
    const newCert: Certification = { ...certData, id };
    await setDoc(doc(db, 'certifications', id), newCert);
  };

  const updateCertification = async (id: string, certData: Partial<Certification>) => {
    await updateDoc(doc(db, 'certifications', id), certData);
  };

  const deleteCertification = async (id: string) => {
    await deleteDoc(doc(db, 'certifications', id));
  };

  // --- EXPERIENCE CRUD ---
  const addExperience = async (expData: Omit<ExperienceItem, 'id'> & { id?: string }) => {
    const id = expData.id || `exp-${Date.now()}`;
    const newExp: ExperienceItem = { ...expData, id };
    await setDoc(doc(db, 'experiences', id), newExp);
  };

  const updateExperience = async (id: string, expData: Partial<ExperienceItem>) => {
    await updateDoc(doc(db, 'experiences', id), expData);
  };

  const deleteExperience = async (id: string) => {
    await deleteDoc(doc(db, 'experiences', id));
  };

  // --- TIME LOGS CRUD ---
  const addTimeLog = async (logData: Omit<TimeLog, 'id'> & { id?: string }): Promise<string> => {
    const id = logData.id || `log-${Date.now()}`;
    const newLog: TimeLog = {
      ...logData,
      id,
      createdAt: logData.createdAt || new Date().toISOString()
    };
    await setDoc(doc(db, 'time_logs', id), newLog);
    // Optimistic local update
    setTimeLogs((prev) => [newLog, ...prev.filter((l) => l.id !== id)]);
    return id;
  };

  const updateTimeLog = async (id: string, logData: Partial<TimeLog>) => {
    await updateDoc(doc(db, 'time_logs', id), logData);
    setTimeLogs((prev) => prev.map((l) => (l.id === id ? { ...l, ...logData } : l)));
  };

  const deleteTimeLog = async (id: string) => {
    await deleteDoc(doc(db, 'time_logs', id));
    setTimeLogs((prev) => prev.filter((l) => l.id !== id));
  };

  const clearAllTimeLogs = async () => {
    const timeLogsRef = collection(db, 'time_logs');
    const snap = await getDocs(timeLogsRef);
    const deletePromises: Promise<void>[] = [];
    snap.forEach((d) => {
      deletePromises.push(deleteDoc(doc(db, 'time_logs', d.id)));
    });
    await Promise.all(deletePromises);
    setTimeLogs([]);
  };

  // --- ACTIVE TIMER CONTROLS ---
  const updateActiveTimerDraft = (draft: Partial<ActiveTimerState>) => {
    setActiveTimer((prev) => ({ ...prev, ...draft }));
  };

  const startTimer = (params?: { 
    taskName?: string; 
    projectName?: string; 
    category?: WorkCategory; 
    hourlyRate?: number; 
    billable?: boolean; 
    projectId?: string; 
  }) => {
    const nowIso = new Date().toISOString();
    setActiveTimer((prev) => ({
      ...prev,
      taskName: params?.taskName ?? prev.taskName,
      projectName: params?.projectName ?? prev.projectName,
      category: params?.category ?? prev.category ?? 'development',
      hourlyRate: params?.hourlyRate ?? prev.hourlyRate ?? 85,
      billable: params?.billable ?? prev.billable ?? true,
      projectId: params?.projectId ?? prev.projectId ?? '',
      isRunning: true,
      startTime: nowIso,
      accumulatedSeconds: 0,
    }));
  };

  const pauseTimer = () => {
    if (!activeTimer.isRunning || !activeTimer.startTime) return;
    const startMs = new Date(activeTimer.startTime).getTime();
    const nowMs = Date.now();
    const sessionSeconds = Math.max(0, Math.floor((nowMs - startMs) / 1000));
    const newAccumulated = (activeTimer.accumulatedSeconds || 0) + sessionSeconds;

    setActiveTimer((prev) => ({
      ...prev,
      isRunning: false,
      startTime: null,
      accumulatedSeconds: newAccumulated,
    }));
  };

  const resumeTimer = () => {
    if (activeTimer.isRunning) return;
    setActiveTimer((prev) => ({
      ...prev,
      isRunning: true,
      startTime: new Date().toISOString(),
    }));
  };

  const resetTimer = () => {
    setActiveTimer(DEFAULT_ACTIVE_TIMER);
    setCurrentElapsedSeconds(0);
  };

  const stopTimer = async (notes?: string): Promise<TimeLog | null> => {
    let finalDuration = activeTimer.accumulatedSeconds || 0;
    if (activeTimer.isRunning && activeTimer.startTime) {
      const startMs = new Date(activeTimer.startTime).getTime();
      const nowMs = Date.now();
      finalDuration += Math.max(0, Math.floor((nowMs - startMs) / 1000));
    }

    if (finalDuration < 5 && !activeTimer.taskName.trim()) {
      // Very short click with no task name, simply reset
      resetTimer();
      return null;
    }

    const taskTitle = activeTimer.taskName.trim() || 'General Development & Creative Session';
    const nowIso = new Date().toISOString();
    const logId = `log-${Date.now()}`;

    const newLog: TimeLog = {
      id: logId,
      taskName: taskTitle,
      projectName: activeTimer.projectName.trim() || 'General Client Work',
      projectId: activeTimer.projectId || undefined,
      category: activeTimer.category || 'development',
      startTime: activeTimer.startTime || nowIso,
      endTime: nowIso,
      durationSeconds: Math.max(finalDuration, 1),
      hourlyRate: activeTimer.hourlyRate ?? 85,
      billable: activeTimer.billable ?? true,
      isBilled: false,
      notes: notes || undefined,
      createdAt: nowIso,
    };

    try {
      await addTimeLog(newLog);
      resetTimer();
      return newLog;
    } catch (e) {
      console.error('Failed to log time entry:', e);
      resetTimer();
      return newLog;
    }
  };

  // --- EXPORT & IMPORT BACKUP ---
  const exportPortfolioData = (): PortfolioExportData => {
    return {
      version: '1.2.0',
      exportedAt: new Date().toISOString(),
      projects,
      certifications,
      experiences,
      timeLogs,
    };
  };

  const importPortfolioData = async (
    data: { 
      projects?: Project[]; 
      certifications?: Certification[]; 
      experiences?: ExperienceItem[];
      timeLogs?: TimeLog[];
    },
    mode: 'replace' | 'merge' = 'replace'
  ): Promise<{ projectsCount: number; certsCount: number; expsCount: number; timeLogsCount: number }> => {
    setLoading(true);
    try {
      const newProjects = Array.isArray(data.projects) ? data.projects : [];
      const newCerts = Array.isArray(data.certifications) ? data.certifications : [];
      const newExps = Array.isArray(data.experiences) ? data.experiences : [];
      const newTimeLogs = Array.isArray(data.timeLogs) ? data.timeLogs : [];

      if (mode === 'replace') {
        // Fetch existing keys to clean up unreferenced items
        const projectsRef = collection(db, 'projects');
        const certsRef = collection(db, 'certifications');
        const expsRef = collection(db, 'experiences');
        const timeLogsRef = collection(db, 'time_logs');

        const [projSnap, certSnap, expSnap, timeLogsSnap] = await Promise.all([
          getDocs(projectsRef),
          getDocs(certsRef),
          getDocs(expsRef),
          getDocs(timeLogsRef),
        ]);

        const newProjIds = new Set(newProjects.map((p) => p.id));
        const newCertIds = new Set(newCerts.map((c) => c.id));
        const newExpIds = new Set(newExps.map((e) => e.id));
        const newLogIds = new Set(newTimeLogs.map((l) => l.id));

        // Delete items no longer present
        const deletePromises: Promise<void>[] = [];
        projSnap.forEach((d) => {
          if (!newProjIds.has(d.id)) deletePromises.push(deleteDoc(doc(db, 'projects', d.id)));
        });
        certSnap.forEach((d) => {
          if (!newCertIds.has(d.id)) deletePromises.push(deleteDoc(doc(db, 'certifications', d.id)));
        });
        expSnap.forEach((d) => {
          if (!newExpIds.has(d.id)) deletePromises.push(deleteDoc(doc(db, 'experiences', d.id)));
        });
        timeLogsSnap.forEach((d) => {
          if (!newLogIds.has(d.id)) deletePromises.push(deleteDoc(doc(db, 'time_logs', d.id)));
        });
        await Promise.all(deletePromises);
      }

      // Upsert new items
      const writePromises: Promise<void>[] = [];
      for (const p of newProjects) {
        if (p.id) writePromises.push(setDoc(doc(db, 'projects', p.id), p));
      }
      for (const c of newCerts) {
        if (c.id) writePromises.push(setDoc(doc(db, 'certifications', c.id), c));
      }
      for (const e of newExps) {
        if (e.id) writePromises.push(setDoc(doc(db, 'experiences', e.id), e));
      }
      for (const l of newTimeLogs) {
        if (l.id) writePromises.push(setDoc(doc(db, 'time_logs', l.id), l));
      }
      await Promise.all(writePromises);

      // Also update local state
      if (mode === 'replace') {
        setProjects(newProjects);
        setCertifications(newCerts);
        setExperiences(newExps);
        setTimeLogs(newTimeLogs);
      } else {
        // Merge with existing
        setProjects((prev) => {
          const map = new Map(prev.map((i) => [i.id, i]));
          newProjects.forEach((i) => map.set(i.id, i));
          return Array.from(map.values());
        });
        setCertifications((prev) => {
          const map = new Map(prev.map((i) => [i.id, i]));
          newCerts.forEach((i) => map.set(i.id, i));
          return Array.from(map.values());
        });
        setExperiences((prev) => {
          const map = new Map(prev.map((i) => [i.id, i]));
          newExps.forEach((i) => map.set(i.id, i));
          return Array.from(map.values());
        });
        setTimeLogs((prev) => {
          const map = new Map(prev.map((i) => [i.id, i]));
          newTimeLogs.forEach((i) => map.set(i.id, i));
          return Array.from(map.values());
        });
      }

      setDbConnected(true);

      return {
        projectsCount: newProjects.length,
        certsCount: newCerts.length,
        expsCount: newExps.length,
        timeLogsCount: newTimeLogs.length,
      };
    } catch (err) {
      console.error('Import failed:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        certifications,
        experiences,
        timeLogs,
        activeTimer,
        currentElapsedSeconds,
        loading,
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
        addTimeLog,
        updateTimeLog,
        deleteTimeLog,
        clearAllTimeLogs,
        startTimer,
        pauseTimer,
        resumeTimer,
        stopTimer,
        resetTimer,
        updateActiveTimerDraft,
        seedDatabaseIfEmpty,
        exportPortfolioData,
        importPortfolioData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
