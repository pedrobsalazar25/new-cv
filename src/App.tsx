import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { Services } from './components/Services';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Certifications } from './components/Certifications';
import { TrustedBy } from './components/TrustedBy';
import { ContactBanner } from './components/ContactBanner';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ContactModal } from './components/ContactModal';
import { ResumeModal } from './components/ResumeModal';
import { BackendPage } from './components/BackendPage';
import { AllProjectsModal } from './components/AllProjectsModal';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import { Project } from './types';

function checkIsAdminRoute(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  const hash = (window.location.hash || '').toLowerCase();
  const pathname = (window.location.pathname || '').toLowerCase();
  
  return (
    params.get('view') === 'admin' ||
    params.get('view') === 'backend' ||
    params.get('view') === 'cms' ||
    params.get('admin') === 'true' ||
    params.get('cms') === 'true' ||
    params.get('backend') === 'true' ||
    params.has('admin') ||
    params.has('cms') ||
    params.has('backend') ||
    hash === '#admin' ||
    hash === '#cms' ||
    hash === '#backend' ||
    hash === '#timetracker' ||
    pathname === '/admin' ||
    pathname === '/cms' ||
    pathname === '/backend'
  );
}

function checkIsProjectsRoute(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  const hash = (window.location.hash || '').toLowerCase();
  const pathname = (window.location.pathname || '').toLowerCase();
  return (
    params.get('view') === 'projects' ||
    hash === '#all-projects' ||
    pathname === '/projects'
  );
}

function AppContent() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(checkIsAdminRoute);
  const [isAllProjectsOpen, setIsAllProjectsOpen] = useState<boolean>(checkIsProjectsRoute);

  const syncRoutesFromURL = useCallback(() => {
    setIsAdminOpen(checkIsAdminRoute());
    setIsAllProjectsOpen(checkIsProjectsRoute());
  }, []);

  useEffect(() => {
    syncRoutesFromURL();

    window.addEventListener('popstate', syncRoutesFromURL);
    window.addEventListener('hashchange', syncRoutesFromURL);

    // Optional keyboard shortcut (Ctrl/Cmd + Shift + A) to quickly toggle the admin backend
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', syncRoutesFromURL);
      window.removeEventListener('hashchange', syncRoutesFromURL);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [syncRoutesFromURL]);

  const handleOpenAdmin = () => {
    setIsAdminOpen(true);
    const url = new URL(window.location.href);
    url.searchParams.set('view', 'backend');
    window.history.pushState({}, '', url.toString());
  };

  const handleOpenAllProjects = () => {
    setIsAllProjectsOpen(true);
    const url = new URL(window.location.href);
    url.searchParams.set('view', 'projects');
    window.history.pushState({}, '', url.toString());
  };

  const handleCloseAllProjects = () => {
    setIsAllProjectsOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.delete('view');
    if (url.hash.toLowerCase() === '#all-projects') {
      url.hash = '';
    }
    if (url.pathname.toLowerCase() === '/projects') {
      window.history.pushState({}, '', '/' + url.search + url.hash);
    } else {
      window.history.pushState({}, '', url.toString());
    }
  };

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.delete('admin');
    url.searchParams.delete('cms');
    url.searchParams.delete('backend');
    url.searchParams.delete('view');
    if (['#admin', '#cms', '#backend', '#timetracker'].includes(url.hash.toLowerCase())) {
      url.hash = '';
    }
    if (['/admin', '/cms', '/backend'].includes(url.pathname.toLowerCase())) {
      window.history.pushState({}, '', '/' + url.search + url.hash);
    } else {
      window.history.pushState({}, '', url.toString());
    }
  };

  // If on Admin / Backend route, render the standalone Backend Page
  if (isAdminOpen) {
    return (
      <BackendPage 
        onBackToPortfolio={handleCloseAdmin} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#0b0b0c] text-[#0f0f10] dark:text-[#f4f4f5] flex flex-col font-body selection:bg-[#d90429] selection:text-white transition-colors duration-300">
      
      {/* Top Header (Public Clean View) */}
      <Header 
        onOpenContact={() => setIsContactOpen(true)} 
        onOpenBackend={handleOpenAdmin}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenContact={() => setIsContactOpen(true)} />
        <SelectedWork 
          onSelectProject={(project) => setSelectedProject(project)} 
          onOpenAllProjectsSite={handleOpenAllProjects}
        />
        <Services onOpenContact={() => setIsContactOpen(true)} />
        <About onOpenResume={() => setIsResumeOpen(true)} />
        <Experience />
        <Certifications />
        <TrustedBy />
        <ContactBanner onOpenContact={() => setIsContactOpen(true)} />
      </main>

      {/* Footer */}
      <Footer 
        onOpenBackend={handleOpenAdmin}
      />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={() => {
          setSelectedProject(null);
          setIsContactOpen(true);
        }}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Standalone All Projects Site / Archive Modal */}
      <AllProjectsModal
        isOpen={isAllProjectsOpen}
        onClose={handleCloseAllProjects}
        onSelectProject={(project) => setSelectedProject(project)}
      />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <DataProvider>
            <AppContent />
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
