import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceEducationSection } from './components/ExperienceEducationSection';
import { DossierSection } from './components/DossierSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PrintDossierModal } from './components/PrintDossierModal';
import { CodeInspectModal } from './components/CodeInspectModal';
import { RepoListModal } from './components/RepoListModal';
import { AgentTerminalModal } from './components/AgentTerminalModal';
import { MotionGraphicsBackground } from './components/MotionGraphicsBackground';
import { ThemeProvider } from './context/ThemeContext';
import { sound } from './utils/audio';

function PortfolioApp() {
  const [isPrintDossierOpen, setIsPrintDossierOpen] = useState(false);
  const [isCodeInspectOpen, setIsCodeInspectOpen] = useState(false);
  const [isRepoListOpen, setIsRepoListOpen] = useState(false);
  const [isAgentTerminalOpen, setIsAgentTerminalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    sound.playBeep(520, 0.05);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsApp = () => {
    sound.playBeep(600, 0.06);
    const msg = encodeURIComponent(
      'Hello Mr. Ali, I am reaching out from your AI Architecture Portfolio.'
    );
    window.open(`https://wa.me/923234503036?text=${msg}`, '_blank');
  };

  const handleSelectProject = (_projectTitle: string) => {
    sound.playSuccess();
    setIsRepoListOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-[#F9FAFB] flex flex-col font-sans selection:bg-[#F59E0B]/30 selection:text-[#FFB800] relative">
      {/* Advanced Kinetic Motion Graphics Canvas Layer */}
      <MotionGraphicsBackground />

      {/* Top Navigation */}
      <Navbar
        onOpenCodeInspect={() => setIsCodeInspectOpen(true)}
        onOpenFastMessage={() => scrollToSection('contact')}
        onOpenAgentTerminal={() => setIsAgentTerminalOpen(true)}
      />

      {/* Main Content Layout */}
      <main className="flex-grow relative z-10">
        {/* Hero with Interactive 3D WebGL Neural Core */}
        <Hero
          onExploreProjects={() => scrollToSection('projects')}
          onWhatsAppClick={handleWhatsApp}
        />

        {/* 01. Core Technical Capabilities */}
        <SkillsSection />

        {/* 02. Upgraded Projects Showcase */}
        <ProjectsSection
          onOpenRepoList={() => setIsRepoListOpen(true)}
          onSelectProject={handleSelectProject}
        />

        {/* 03. Experience & Education Timeline */}
        <ExperienceEducationSection
          onPrintDossier={() => setIsPrintDossierOpen(true)}
        />

        {/* 04. Identity Dossier / Personal Information */}
        <DossierSection />

        {/* 05. Direct Matrix / Get In Touch Contact Dispatch */}
        <ContactSection />
      </main>

      {/* Footer & Telemetry */}
      <Footer />

      {/* Printable / Viewable Official Dossier Modal */}
      <PrintDossierModal
        isOpen={isPrintDossierOpen}
        onClose={() => setIsPrintDossierOpen(false)}
      />

      {/* System Telemetry & Architecture Specification Modal */}
      <CodeInspectModal
        isOpen={isCodeInspectOpen}
        onClose={() => setIsCodeInspectOpen(false)}
      />

      {/* 20+ Production Repositories Explorer Modal */}
      <RepoListModal
        isOpen={isRepoListOpen}
        onClose={() => setIsRepoListOpen(false)}
      />

      {/* Autonomous AI Architecture Agent Console Modal */}
      <AgentTerminalModal
        isOpen={isAgentTerminalOpen}
        onClose={() => setIsAgentTerminalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}

