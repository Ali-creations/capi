import React from 'react';
import { X, Terminal, Cpu, HardDrive, Wifi, Activity } from 'lucide-react';
import { sound } from '../utils/audio';

interface CodeInspectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeInspectModal: React.FC<CodeInspectModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#090A0F] border border-[#F59E0B]/30 w-full max-w-2xl rounded-2xl p-6 sm:p-8 text-white relative shadow-[0_0_50px_rgba(245,158,11,0.15)] font-mono text-xs">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2 text-[#FFB800]">
            <Terminal className="w-4 h-4" />
            <span className="font-bold">SYSTEM TELEMETRY &amp; ARCHITECTURAL SPECIFICATION</span>
          </div>
          <button
            onClick={() => {
              sound.playBeep(450, 0.05);
              onClose();
            }}
            className="w-8 h-8 rounded-md bg-white/5 hover:bg-white/15 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-5">
          {/* Live Node Status */}
          <div className="p-4 rounded-lg bg-[#0D1117] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-gray-400">
              <span className="flex items-center gap-2 text-white font-bold">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Primary Agent Fabric State:</span>
              </span>
              <span className="text-emerald-400 font-bold">ONLINE [AP-SOUTH-1]</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-gray-400">
              <div>
                Measured P99 Latency: <span className="text-[#FFB800]">14.2ms</span>
              </div>
              <div>
                Multi-Agent Quorum: <span className="text-[#4cd7f6]">4 Active Workers</span>
              </div>
              <div>
                Local Context Window: <span className="text-white">8,192 Tokens</span>
              </div>
              <div>
                Inference Protocol: <span className="text-white">FP16 / Q4_K_M GGUF</span>
              </div>
            </div>
          </div>

          {/* Engine Stack */}
          <div className="space-y-2">
            <div className="text-gray-400 uppercase tracking-wider text-[11px]">
              Active Tech Mechanics
            </div>
            <div className="p-4 rounded-lg bg-black/60 border border-white/5 text-[11px] leading-relaxed text-gray-300 space-y-1.5">
              <div>
                <span className="text-[#FFB800]">&gt; Model Orchestration:</span> LangChain / AutoGen
                Autonomous Feedback Loops
              </div>
              <div>
                <span className="text-[#4cd7f6]">&gt; Local Compute:</span> Ollama + vLLM on Linux
                Dedicated Hardware Rig
              </div>
              <div>
                <span className="text-emerald-400">&gt; Vector Indexing:</span> HNSW cosine
                similarity matching, &lt;8ms lookup
              </div>
              <div>
                <span className="text-purple-400">&gt; Visual Canvas:</span> Three.js WebGL 2.0
                Kinetic Neural Mesh + Web Audio Synthesis
              </div>
            </div>
          </div>

          {/* System Environment */}
          <div className="pt-2 text-[11px] text-gray-500 flex items-center justify-between border-t border-white/10">
            <span>ENGINE: MR_ALI_CORE_V5.2</span>
            <span>ENCRYPTED NODE: AP-SOUTH-1-LHE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
