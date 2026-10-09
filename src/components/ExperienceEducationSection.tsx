import React from 'react';
import { Briefcase, GraduationCap, Printer, Check } from 'lucide-react';
import { sound } from '../utils/audio';

interface ExperienceEducationSectionProps {
  onPrintDossier: () => void;
}

export const ExperienceEducationSection: React.FC<ExperienceEducationSectionProps> = ({
  onPrintDossier,
}) => {
  const experiences = [
    {
      role: 'Govt. Bano Qabil Training Program',
      badge: '4 Months (Ongoing)',
      badgeHighlight: true,
      description: 'Specialized AI Development & Architecture',
    },
    {
      role: 'Local Corporate Companies',
      badge: '3 Months',
      badgeHighlight: false,
      description: 'Workflow Automation & System Integration',
    },
    {
      role: 'Sales (Local Market)',
      badge: '6 Months',
      badgeHighlight: false,
      description: 'Client Facing & Commercial Solutions',
    },
    {
      role: 'Laptop Hardware Maintenance',
      badge: '4 Months',
      badgeHighlight: false,
      description: 'Board Level Diagnostics & Assembly',
    },
  ];

  const handlePrint = () => {
    sound.playSuccess();
    onPrintDossier();
  };

  return (
    <section id="experience" className="py-20 md:py-28 relative scroll-mt-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="font-mono text-xs uppercase tracking-wider text-[#FFB800] mb-3 flex items-center gap-2">
            <span>// 03. TIMELINE & FOUNDATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Experience & Education
          </h2>
          <p className="text-base text-gray-400 max-w-3xl leading-relaxed">
            Hands-on technical background balancing rigorous government-sponsored AI training,
            corporate workflow execution, and academic objectives.
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Card: Practical Experience */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center text-[#FFB800]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Practical Experience</h3>
              </div>

              {/* Experience Items List */}
              <div className="space-y-4">
                {experiences.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                      <h4 className="text-sm sm:text-base font-bold text-white">{item.role}</h4>
                      <span
                        className={`text-xs font-mono px-2.5 py-0.5 rounded-full w-fit ${
                          item.badgeHighlight
                            ? 'bg-[#F59E0B]/15 border border-[#F59E0B]/40 text-[#FFB800]'
                            : 'bg-white/5 border border-white/10 text-gray-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Runtime Note */}
            <div className="mt-8 pt-4 border-t border-white/10 font-mono text-xs text-gray-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span>Cumulative field runtime: 17+ months active problem solving.</span>
            </div>
          </div>

          {/* Right Card: Education & Vision */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/30 flex items-center justify-center text-[#4cd7f6]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Education & Vision</h3>
              </div>

              {/* Academic Status Block */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 mb-6">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#FFB800] mb-1">
                  ACADEMIC STATUS
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                  Undergraduate Student
                </h4>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  Rigorous study path focused on computer science, mathematical foundations, and
                  intelligent machines.
                </p>
              </div>

              {/* Long-Term Technical Vision Callout */}
              <div className="p-5 rounded-xl bg-[#0D1117]/80 border-l-4 border-l-[#F59E0B] border border-white/5 mb-8">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#FFB800] mb-2">
                  LONG-TERM TECHNICAL VISION
                </div>
                <p className="text-xs sm:text-sm text-gray-300 italic leading-relaxed">
                  &ldquo;Continuously surpassing technological boundaries by building scalable,
                  automated, and practical Artificial Intelligence systems.&rdquo;
                </p>
              </div>
            </div>

            {/* Save Portfolio Dossier Strip */}
            <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <span className="font-mono text-[#FFB800]">&lt;&gt;</span>
                  <span>Save Portfolio Dossier</span>
                </div>
                <div className="text-[11px] font-mono text-gray-400">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-200">Ctrl + P</kbd> /
                  Print to export PDF
                </div>
              </div>

              <button
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#F59E0B]/50 text-xs font-mono text-white flex items-center gap-2 transition-all cursor-pointer self-start sm:self-auto shrink-0 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>Print Dossier</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
