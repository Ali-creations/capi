import React from 'react';

export const DossierSection: React.FC = () => {
  return (
    <section id="dossier" className="py-20 md:py-28 relative scroll-mt-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="font-mono text-xs uppercase tracking-wider text-[#FFB800] mb-3 flex items-center gap-2">
            <span>// 04. IDENTITY DOSSIER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Personal Information
          </h2>
          <p className="text-base text-gray-400 max-w-3xl leading-relaxed">
            Key telemetry and logistical details for technical collaboration and contract
            evaluation.
          </p>
        </div>

        {/* 3-Column Identity Grid */}
        <div className="glass-panel rounded-2xl p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {/* Column 1: Full Name */}
            <div className="pt-4 md:pt-0">
              <div className="font-mono text-xs text-gray-500 mb-3 tracking-wider">
                // FULL NAME
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
                Mr. Ali
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
                <span className="w-2 h-2 rounded-full bg-[#FFB800] shadow-[0_0_8px_#FFB800]" />
                <span>AI Core Engineer &amp; Architect</span>
              </div>
            </div>

            {/* Column 2: Age & Cohort */}
            <div className="pt-6 md:pt-0 md:pl-10">
              <div className="font-mono text-xs text-gray-500 mb-3 tracking-wider">
                // AGE & COHORT
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
                18 Years
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
                <span className="w-2 h-2 rounded-full bg-[#06B6D4] shadow-[0_0_8px_#06B6D4]" />
                <span>Next-Gen AI First Builder</span>
              </div>
            </div>

            {/* Column 3: Location Base */}
            <div className="pt-6 md:pt-0 md:pl-10">
              <div className="font-mono text-xs text-gray-500 mb-3 tracking-wider">
                // LOCATION BASE
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
                Lahore, Punjab, PK
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
                <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
                <span>PKT Timezone (UTC +5)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
