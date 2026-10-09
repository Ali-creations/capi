import React, { useState } from 'react';
import { ArrowUpRight, Play, RefreshCw, Terminal, CheckCircle2, ChevronRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface ProjectsSectionProps {
  onOpenRepoList: () => void;
  onSelectProject: (title: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onOpenRepoList,
  onSelectProject,
}) => {
  // Terminal simulation state for Project 1
  const [terminalCycle, setTerminalCycle] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const terminalLogs = [
    {
      file: 'AGENT_ROUTER_V2.PY',
      status: 'DISPATCHER LIVE',
      line1: 'Delegating task to SubAgent-04: "Inference & Tool Hook"',
      line2: 'Context window: 8,192 tokens | Measured latency: 42ms',
      line3: 'Feedback Loop: Verified | Success: 99.8%',
    },
    {
      file: 'CONSENSUS_ENGINE.PY',
      status: 'PARALLEL EVAL',
      line1: 'Synchronizing multi-agent quorum: 4/4 nodes responding',
      line2: 'Ollama local inference: LLaMA-3-8B-Q4_K_M allocated',
      line3: 'Feedback Loop: State updated in 38ms | Error Rate: 0.00%',
    },
    {
      file: 'AUTOGEN_COORDINATOR.PY',
      status: 'EXECUTION LOOP',
      line1: 'SubAgent-02 synthesized structured JSON output schema',
      line2: 'Vector retrieval: similarity index 0.941 across 12k chunks',
      line3: 'Feedback Loop: Memory cache flushed | Success: 100%',
    },
  ];

  const handleNextTerminalState = () => {
    sound.playBeep(700, 0.05);
    setIsSimulating(true);
    setTimeout(() => {
      setTerminalCycle((prev) => (prev + 1) % terminalLogs.length);
      setIsSimulating(false);
    }, 280);
  };

  // Resume Engine state for Project 2
  const candidateProfiles = [
    { name: 'AI Core Architect (Default)', extraction: 96.4, fit: 98.2, status: 'Optimal Fit' },
    { name: 'Senior MLOps Engineer', extraction: 94.2, fit: 95.8, status: 'Optimal Fit' },
    { name: 'Full-Stack Agent Dev', extraction: 92.0, fit: 91.5, status: 'High Match' },
  ];
  const [candidateIndex, setCandidateIndex] = useState(0);

  const handleCycleCandidate = () => {
    sound.playBeep(580, 0.05);
    setCandidateIndex((prev) => (prev + 1) % candidateProfiles.length);
  };

  const currentLog = terminalLogs[terminalCycle];
  const currentCandidate = candidateProfiles[candidateIndex];

  return (
    <section id="projects" className="py-20 md:py-28 relative scroll-mt-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-[#FFB800] mb-3 flex items-center gap-2">
              <span>// 02. PRODUCTION IMPLEMENTATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Upgraded Projects
            </h2>
            <p className="text-base text-gray-400 max-w-2xl leading-relaxed">
              Showcase of autonomous agent frameworks, natural language intelligence, and
              enterprise-grade automation systems.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playSuccess();
              onOpenRepoList();
            }}
            className="group flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FFB800] hover:text-amber-300 font-bold transition-colors cursor-pointer self-start md:self-end"
          >
            <span>EXPLORE ALL 20+ REPOSITORIES</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Card 1: Autonomous AI Agent Orchestrator */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between group">
            <div>
              {/* Header Tags */}
              <div className="flex items-center justify-between mb-6 text-xs font-mono">
                <span className="px-3 py-1 rounded-md bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#FFB800] font-bold">
                  AGENTIC AI SYSTEM
                </span>
                <span className="text-gray-400">Python / Local LLMs</span>
              </div>

              {/* Title & Desc */}
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#FFB800] transition-colors">
                Autonomous AI Agent Orchestrator
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6 font-normal">
                Multi-agent workflow framework designed to automate decision-making processes, local
                model execution, state machines, and synchronized multi-step task delegation.
              </p>

              {/* Terminal View */}
              <div className="rounded-lg bg-[#07080C] border border-white/10 p-4 font-mono text-xs mb-6 relative overflow-hidden shadow-inner">
                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3 text-[11px]">
                  <div className="flex items-center gap-2 text-gray-300 font-semibold">
                    <Terminal className="w-3.5 h-3.5 text-[#FFB800]" />
                    <span>[{currentLog.file}]</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 text-[#10B981] text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                      <span>{currentLog.status}</span>
                    </span>
                    <button
                      onClick={handleNextTerminalState}
                      disabled={isSimulating}
                      className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-gray-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                      title="Trigger next agent state cycle"
                    >
                      <RefreshCw
                        className={`w-2.5 h-2.5 ${isSimulating ? 'animate-spin text-[#FFB800]' : ''}`}
                      />
                      <span>Cycle</span>
                    </button>
                  </div>
                </div>

                {/* Terminal Output Lines */}
                <div className="space-y-2 text-[11px] leading-relaxed">
                  <div className="text-amber-200/90 flex items-start gap-2">
                    <span className="text-[#FFB800] select-none">&gt;</span>
                    <span>{currentLog.line1}</span>
                  </div>
                  <div className="text-gray-400 flex items-start gap-2">
                    <span className="text-gray-600 select-none">&gt;</span>
                    <span>{currentLog.line2}</span>
                  </div>
                  <div className="text-emerald-400 flex items-start gap-2 font-medium">
                    <span className="text-emerald-500 select-none">&gt;&gt;</span>
                    <span>{currentLog.line3}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-[11px] font-mono text-gray-400 tracking-wider">
                MULTI-AGENT STATE MESH
              </span>
              <button
                onClick={() => {
                  sound.playSuccess();
                  onSelectProject('Autonomous AI Agent Orchestrator');
                }}
                className="px-4 py-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#F59E0B]/40 text-xs font-mono text-white flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>View Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FFB800]" />
              </button>
            </div>
          </div>

          {/* Card 2: Intelligent Resume Detection Engine */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between group">
            <div>
              {/* Header Tags */}
              <div className="flex items-center justify-between mb-6 text-xs font-mono">
                <span className="px-3 py-1 rounded-md bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-[#4cd7f6] font-bold">
                  NLP & DATA PIPELINE
                </span>
                <span className="text-gray-400">Streamlit / NLTK</span>
              </div>

              {/* Title & Desc */}
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#4cd7f6] transition-colors">
                Intelligent Resume Detection Engine
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6 font-normal">
                Automated candidate evaluation engine using PDF parsing, skill extraction, vector
                matching algorithms, and interactive analytical visual dashboards.
              </p>

              {/* Visual Telemetry Container */}
              <div className="rounded-lg bg-[#07080C] border border-white/10 p-5 font-mono text-xs mb-6 relative overflow-hidden shadow-inner">
                {/* Metric 1: Skill Extraction */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-gray-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FFB800]" />
                      <span>Semantic Skill Extraction</span>
                    </span>
                    <span className="text-[#FFB800] font-bold tabular-nums">
                      {currentCandidate.extraction}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#F59E0B] to-[#FFB800] rounded-full transition-all duration-500"
                      style={{ width: `${currentCandidate.extraction}%` }}
                    />
                  </div>
                </div>

                {/* Metric 2: Candidate Score */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-gray-300">Candidate Score Threshold</span>
                    <span className="text-[#10B981] font-bold tabular-nums">
                      {currentCandidate.status} ({currentCandidate.fit}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${currentCandidate.fit}%` }}
                    />
                  </div>
                </div>

                {/* Profile cycler */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
                  <span className="truncate">Sample: {currentCandidate.name}</span>
                  <button
                    onClick={handleCycleCandidate}
                    className="text-[#4cd7f6] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <span>Test sample</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-[11px] font-mono text-gray-400 tracking-wider">
                AUTOMATED SCORING PIPELINE
              </span>
              <button
                onClick={() => {
                  sound.playSuccess();
                  onSelectProject('Intelligent Resume Detection Engine');
                }}
                className="px-4 py-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#06B6D4]/40 text-xs font-mono text-white flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>View Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#4cd7f6]" />
              </button>
            </div>
          </div>
        </div>

        {/* Card 3: Wide Bento - Hardware & Corporate Workflow Automations */}
        <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group">
          <div className="max-w-3xl">
            {/* Header Tags */}
            <div className="flex items-center gap-3 mb-4 text-xs font-mono">
              <span className="px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                INFRASTRUCTURE & HARDWARE
              </span>
              <span className="text-gray-400">Enterprise Workflows</span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
              Hardware & Corporate Workflow Automations
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6 font-normal">
              Administrative, diagnostic, and hardware-level maintenance tools created to streamline
              physical corporate operations, batch data entry pipelines, and automated system
              recovery.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {['System Recovery', 'Batch Scripting', 'Diagnostic Utilities'].map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-gray-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="shrink-0 self-start md:self-center">
            <button
              onClick={() => {
                sound.playSuccess();
                onSelectProject('Hardware & Corporate Workflow Automations');
              }}
              className="px-5 py-3 rounded-md bg-[#0D1117] hover:bg-white/10 border border-white/15 hover:border-emerald-400/50 text-white font-mono text-xs flex items-center gap-2 cursor-pointer transition-all shadow-sm"
            >
              <span>EXPLORE REPOSITORIES</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
