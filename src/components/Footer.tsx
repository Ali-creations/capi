import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  const handleScrollTo = (id: string) => {
    sound.playBeep(450, 0.05);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="pt-16 pb-12 border-t border-white/10 bg-[#07080C] text-gray-400 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          {/* Col 1: Left Brand & Telemetry (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-[#FFB800] font-bold">&lt;/&gt;</span>
              <span className="font-mono font-bold text-white text-sm tracking-wide">
                MR. ALI // ARCHITECTURAL AI CORE
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 max-w-lg leading-relaxed">
              Engineering autonomous agent fabrics, high-concurrency neural orchestration layers,
              and resilient full-stack systems. Built for extreme precision and low-latency
              interaction.
            </p>

            {/* Status Telemetry */}
            <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-[11px]">
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>TELEMETRY: ALL AGENTS OPERATIONAL</span>
              </div>
              <div className="flex items-center gap-2 text-[#FFB800]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800]" />
                <span>LATENCY: 14MS</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Index (3 cols) */}
          <div className="md:col-span-3">
            <div className="font-mono text-xs uppercase tracking-wider text-[#FFB800] mb-4 font-bold">
              NAVIGATION INDEX
            </div>
            <ul className="space-y-2.5 font-mono text-xs">
              {[
                { id: 'skills', label: '01. Specialized Skills' },
                { id: 'projects', label: '02. Shipped Projects' },
                { id: 'experience', label: '03. Career Timeline' },
                { id: 'dossier', label: '04. Architecture Dossier' },
                { id: 'contact', label: '05. Secure Dispatch' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleScrollTo(item.id)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Signal Channels (3 cols) */}
          <div className="md:col-span-3">
            <div className="font-mono text-xs uppercase tracking-wider text-[#FFB800] mb-4 font-bold">
              SIGNAL CHANNELS
            </div>
            <ul className="space-y-2.5 font-mono text-xs">
              {[
                { name: 'GITHUB', url: 'https://github.com' },
                { name: 'LINKEDIN', url: 'https://linkedin.com' },
                { name: 'WHATSAPP', url: 'https://wa.me/923234503036' },
                { name: 'ENCRYPTED EMAIL', url: 'mailto:ali.ai.architect@gmail.com' },
              ].map((chan) => (
                <li key={chan.name}>
                  <a
                    href={chan.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playBeep(450, 0.05)}
                    className="flex items-center justify-between hover:text-[#FFB800] transition-colors group cursor-pointer"
                  >
                    <span>{chan.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#FFB800] transition-colors" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Metadata Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-gray-500">
          <div>© 2026 // MR. ALI. ALL RIGHTS RESERVED.</div>
          <div className="flex flex-wrap items-center gap-4">
            <span>SYSVER: 5.2.0-PROD</span>
            <span>ZONE: AP-SOUTH-1</span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>NODE ENCRYPTION: ACTIVE</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
