import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { AdminDashboard } from './components/AdminDashboard';
import { PasswordModal } from './components/PasswordModal';
import { ThreeBackgroundCanvas } from './components/ThreeBackgroundCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ResearchSection } from './components/ResearchSection';
import { CompetenciesSection } from './components/CompetenciesSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { LanguageSection } from './components/LanguageSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { ScrollSection3D } from './components/ScrollSection3D';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { FloatingControls } from './components/FloatingControls';

function PortfolioApp() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const { isClinical } = useTheme();

  return (
    <div
      className={`relative min-h-screen transition-colors duration-300 overflow-x-hidden ${
        isClinical
          ? 'bg-slate-50 text-slate-900 selection:bg-purple-600 selection:text-white'
          : 'bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white'
      }`}
    >
      {/* 3D Ambient Background Canvas - consistent real-time physics in both themes */}
      <ThreeBackgroundCanvas />

      {/* Fixed Top Navigation Bar with Theme Switcher */}
      <Navbar />

      {/* Main Content Flow with 3D IntersectionObserver scroll entrance animations */}
      <main className="relative z-10">
        <ScrollSection3D>
          <HeroSection />
        </ScrollSection3D>

        <ScrollSection3D>
          <ResearchSection />
        </ScrollSection3D>

        <ScrollSection3D>
          <CompetenciesSection />
        </ScrollSection3D>

        <ScrollSection3D>
          <ExperienceSection />
        </ScrollSection3D>

        <ScrollSection3D>
          <EducationSection />
        </ScrollSection3D>

        <ScrollSection3D>
          <LanguageSection />
        </ScrollSection3D>

        <ScrollSection3D>
          <AboutSection />
        </ScrollSection3D>

        <ScrollSection3D>
          <ContactSection onOpenResume={() => setIsResumeOpen(true)} />
        </ScrollSection3D>
      </main>

      {/* Footer with social channels, contact methods, and centered Lubna Akter Portfolio */}
      <Footer />

      {/* Floating Controls: Edit Dashboard Trigger Button on top & Go-To-Top arrow right below it */}
      <FloatingControls
        onOpenDashboard={() => setIsPasswordModalOpen(true)}
      />

      {/* Interactive Full CV Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Password Authentication Modal */}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={() => {
          setIsPasswordModalOpen(false);
          setIsAdminOpen(true);
        }}
      />

      {/* Admin Content & Image Editing Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PortfolioProvider>
          <PortfolioApp />
        </PortfolioProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
