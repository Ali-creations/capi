import React, { useState } from 'react';
import { Terminal, Share2, MessageSquare, Menu, X, Check, Bot } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/audio';

interface NavbarProps {
  onOpenCodeInspect: () => void;
  onOpenFastMessage: () => void;
  onOpenAgentTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCodeInspect,
  onOpenFastMessage,
  onOpenAgentTerminal,
}) => {
  const { palette } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const handleNavClick = (id: string) => {
    sound.playBeep(480, 0.05);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShare = () => {
    sound.playSuccess();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#090A0F]/85 backdrop-blur-xl border-b border-white/5 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left Brand Lockup */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-mono text-sm font-bold border transition-colors shadow-sm"
            style={{
              backgroundColor: `${palette.primary}15`,
              borderColor: `${palette.primary}40`,
              color: palette.primary,
            }}
          >
            &lt;/&gt;
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white font-mono">
                MR. ALI
              </span>
              <span className="text-gray-500 font-mono text-xs">// AI ARCHITECT</span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[11px] font-mono text-gray-400">
                Available Q2 2026 <span className="text-gray-600">//</span>{' '}
                <span className="text-[#10B981] font-medium">Active</span>
              </span>
            </div>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 font-mono text-xs text-gray-400">
          {[
            { id: 'skills', label: '01. Skills' },
            { id: 'projects', label: '02. Projects' },
            { id: 'experience', label: '03. Experience' },
            { id: 'dossier', label: '04. Dossier' },
            { id: 'contact', label: '05. Contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="hover:text-white transition-colors py-1 relative group cursor-pointer"
            >
              <span>{item.label}</span>
              <span
                className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-200 group-hover:w-full"
                style={{ backgroundColor: palette.primary }}
              />
            </button>
          ))}
        </nav>

        {/* Right Action Island */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Professional Palette Collab Switcher */}
          <ThemeSwitcher />

          {/* Interactive Agent Terminal Button */}
          <button
            onClick={() => {
              sound.playSuccess();
              onOpenAgentTerminal();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-gray-300 hover:text-white cursor-pointer transition-all"
            title="Talk to Mr. Ali's Autonomous AI Agent"
          >
            <Bot className="w-3.5 h-3.5" style={{ color: palette.primary }} />
            <span>AI Console</span>
          </button>

          {/* Initiate Signal CTA */}
          <button
            onClick={() => handleNavClick('contact')}
            className="px-4 py-2 rounded-md font-bold text-xs uppercase tracking-wider glow-amber-btn flex items-center gap-2 cursor-pointer transition-all text-[#090A0F]"
            style={{
              backgroundColor: palette.primary,
              boxShadow: `0 0 20px ${palette.primaryGlow}`,
            }}
          >
            <span>INITIATE SIGNAL</span>
          </button>

          {/* Action icon buttons */}
          <div className="flex items-center gap-1.5 border-l border-white/10 pl-2 sm:pl-3">
            <button
              onClick={() => {
                sound.playBeep(600, 0.05);
                onOpenCodeInspect();
              }}
              title="Inspect System Telemetry & Architecture"
              className="w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleShare}
              title={copiedShare ? 'Copied link!' : 'Share Portfolio link'}
              className="w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              {copiedShare ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Share2 className="w-3.5 h-3.5" />
              )}
            </button>

            <button
              onClick={() => {
                sound.playBeep(520, 0.05);
                onOpenFastMessage();
              }}
              title="Quick Transmission Dispatch"
              className="w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 rounded-md bg-white/5 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center cursor-pointer ml-1"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090A0F] border-b border-white/10 px-4 py-4 space-y-2 font-mono text-sm">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAgentTerminal();
            }}
            className="w-full text-left py-2 px-3 rounded bg-white/5 border border-white/10 text-white flex items-center gap-2"
          >
            <Bot className="w-4 h-4" style={{ color: palette.primary }} />
            <span>Launch Mr. Ali AI Console</span>
          </button>
          {[
            { id: 'skills', label: '01. Skills & Architecture' },
            { id: 'projects', label: '02. Upgraded Projects' },
            { id: 'experience', label: '03. Experience & Timeline' },
            { id: 'dossier', label: '04. Personal Information Dossier' },
            { id: 'contact', label: '05. Get In Touch' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left py-2 px-3 rounded hover:bg-white/5 text-gray-300 hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
