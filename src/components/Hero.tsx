import React from 'react';
import { ArrowUpRight, MessageCircle, Cpu, Layers, CheckCircle2, Bot } from 'lucide-react';
import { NeuralCore3D } from './NeuralCore3D';
import { sound } from '../utils/audio';

interface HeroProps {
  onExploreProjects: () => void;
  onWhatsAppClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProjects, onWhatsAppClick }) => {
  return (
    <section className="relative pt-8 pb-20 md:pt-14 md:pb-28 overflow-hidden">
      {/* Subtle ambient amber lighting in background */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F59E0B]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#06B6D4]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10">
            {/* Top Monospace Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit mb-6 shadow-sm">
              <span className="font-mono text-xs text-[#FFB800]">&lt;/&gt;</span>
              <span className="font-mono text-xs uppercase tracking-wider text-gray-300">
                AUTONOMOUS SYSTEMS & NEURAL FABRICS
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] shadow-[0_0_8px_#FFB800]" />
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-[68px] font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              Building Next–Gen <br />
              <span className="text-[#FFB800] drop-shadow-[0_0_35px_rgba(255,184,0,0.25)]">
                AI Agents
              </span>{' '}
              & <br />
              Intelligent <br />
              Workflows.
            </h1>

            {/* Supporting Subtitle */}
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed mb-8 font-normal">
              Architecting production-ready Agentic AI, high-concurrency neural pipelines, automated
              algorithmic infrastructures, and resilient full-stack systems.
            </p>

            {/* Primary Action Row */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button
                onClick={() => {
                  sound.playSuccess();
                  onExploreProjects();
                }}
                className="px-6 py-3.5 rounded-md bg-[#F59E0B] hover:bg-[#ffb800] text-[#090A0F] font-bold text-sm uppercase tracking-wider glow-amber-btn shadow-[0_0_25px_rgba(245,158,11,0.35)] flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>EXPLORE SHIPPED SYSTEMS</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={() => {
                  sound.playBeep(520, 0.08);
                  onWhatsAppClick();
                }}
                className="px-5 py-3.5 rounded-md bg-[#0D1117]/80 hover:bg-[#151b24] border border-white/15 hover:border-[#10B981]/50 text-gray-200 hover:text-white font-mono text-xs flex items-center gap-2.5 transition-all cursor-pointer backdrop-blur-md"
              >
                <MessageCircle className="w-4 h-4 text-[#10B981]" />
                <span>Encrypted WhatsApp Dispatch</span>
              </button>
            </div>

            {/* 4 Technical Parameter / Attribute Metric Cells */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-[#F59E0B]/30 transition-all group">
                <div className="flex items-center gap-1.5 mb-1 text-[#FFB800]">
                  <Bot className="w-3.5 h-3.5" />
                  <span className="font-mono text-xs font-bold text-white group-hover:text-[#FFB800] transition-colors">
                    Multi-Agent
                  </span>
                </div>
                <div className="text-[11px] font-mono text-gray-400">Autonomous Loops</div>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-[#06B6D4]/30 transition-all group">
                <div className="flex items-center gap-1.5 mb-1 text-[#4cd7f6]">
                  <Cpu className="w-3.5 h-3.5" />
                  <span className="font-mono text-xs font-bold text-white group-hover:text-[#4cd7f6] transition-colors">
                    Local LLMs
                  </span>
                </div>
                <div className="text-[11px] font-mono text-gray-400">Quantized Runs</div>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-[#FFB800]/30 transition-all group">
                <div className="flex items-center gap-1.5 mb-1 text-[#FFB800]">
                  <Layers className="w-3.5 h-3.5" />
                  <span className="font-mono text-xs font-bold text-white group-hover:text-[#FFB800] transition-colors">
                    Full-Stack
                  </span>
                </div>
                <div className="text-[11px] font-mono text-gray-400">End-to-End Core</div>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-[#10B981]/30 transition-all group">
                <div className="flex items-center gap-1.5 mb-1 text-[#10B981]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="font-mono text-xs font-bold text-white group-hover:text-[#10B981] transition-colors">
                    100% Focused
                  </span>
                </div>
                <div className="text-[11px] font-mono text-gray-400">Scalable Deploy</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D WebGL Neural Core */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <NeuralCore3D
              onInteract={() => {
                // interactive trigger
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
