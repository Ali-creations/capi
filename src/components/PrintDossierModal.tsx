import React from 'react';
import { X, Printer, Download, CheckCircle2, Shield } from 'lucide-react';
import { sound } from '../utils/audio';

interface PrintDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintDossierModal: React.FC<PrintDossierModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playSuccess();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0D1117] border border-white/20 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8 text-white relative shadow-2xl">
        {/* Modal Controls Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 no-print">
          <div className="flex items-center gap-2 font-mono text-xs text-[#FFB800]">
            <Shield className="w-4 h-4" />
            <span>ARCHITECTURAL DOSSIER // OFFICIAL SPECIFICATION</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-md bg-[#F59E0B] hover:bg-[#ffb800] text-[#090A0F] font-mono font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-md bg-white/5 hover:bg-white/15 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dossier Document Content (Optimized for print) */}
        <div className="space-y-6 text-sm font-sans" id="printable-dossier">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">MR. ALI</h1>
              <p className="text-base text-[#FFB800] font-mono mt-1 font-semibold">
                AI Architect &amp; Core Systems Engineer
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Lahore, Punjab, PK • UTC +5 • ali.ai.architect@gmail.com
              </p>
            </div>
            <div className="font-mono text-xs text-right text-gray-400">
              <div>SYS ID: PK-LHE-2026-AI</div>
              <div>COHORT: 18 Years / Next-Gen First Builder</div>
              <div className="text-emerald-400 font-bold mt-1">VERIFIED ACTIVE</div>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#FFB800] mb-2 font-bold">
              // EXECUTIVE SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Specialized in production-grade Agentic AI pipelines, multi-agent state orchestration,
              local quantized LLM inference loops (Ollama, vLLM), and end-to-end full-stack
              automations. Proven background bridging government-level specialized machine learning
              training with corporate workflow system integrations.
            </p>
          </div>

          {/* Core Technical Capabilities */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#FFB800] mb-3 font-bold">
              // TECHNICAL CAPABILITIES MATRIX
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="font-bold text-white mb-1">AI &amp; Machine Learning</div>
                <div className="text-gray-400">
                  LangChain, AutoGen, PyTorch, Deep Learning, Prompt Engineering, Synthetic Data
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="font-bold text-white mb-1">Automation &amp; Orchestration</div>
                <div className="text-gray-400">
                  FastAPI, n8n, Ollama, Python Scripting, Local Inference Servers, State Machines
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="font-bold text-white mb-1">Data &amp; NLP Pipelines</div>
                <div className="text-gray-400">
                  Pandas, NLTK, Vector Databases (Chroma/Qdrant), PDF OCR Parsing, Analytics
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="font-bold text-white mb-1">Hardware &amp; Infrastructure</div>
                <div className="text-gray-400">
                  Linux Systems, Hardware Diagnostics, Board Level Assembly, Streamlit, Git
                </div>
              </div>
            </div>
          </div>

          {/* Practical Experience */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#FFB800] mb-3 font-bold">
              // EXPERIENCE TIMELINE
            </h2>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-start pb-2 border-b border-white/5">
                <div>
                  <span className="font-bold text-white">Govt. Bano Qabil Training Program</span>
                  <div className="text-gray-400">Specialized AI Development &amp; Architecture</div>
                </div>
                <span className="font-mono text-[#FFB800]">4 Months (Ongoing)</span>
              </div>
              <div className="flex justify-between items-start pb-2 border-b border-white/5">
                <div>
                  <span className="font-bold text-white">Local Corporate Companies</span>
                  <div className="text-gray-400">Workflow Automation &amp; System Integration</div>
                </div>
                <span className="font-mono text-gray-400">3 Months</span>
              </div>
              <div className="flex justify-between items-start pb-2 border-b border-white/5">
                <div>
                  <span className="font-bold text-white">Sales &amp; Client Consultation</span>
                  <div className="text-gray-400">Client Facing &amp; Commercial Solutions</div>
                </div>
                <span className="font-mono text-gray-400">6 Months</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-bold text-white">Laptop Hardware Maintenance</span>
                  <div className="text-gray-400">Board Level Diagnostics &amp; Assembly</div>
                </div>
                <span className="font-mono text-gray-400">4 Months</span>
              </div>
            </div>
          </div>

          {/* Shipped Systems */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#FFB800] mb-2 font-bold">
              // KEY SHIPPED SYSTEMS
            </h2>
            <ul className="text-xs text-gray-300 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-white">Autonomous AI Agent Orchestrator:</strong> Multi-agent
                workflow routing, local model execution, feedback loops with 99.8% verification
                accuracy.
              </li>
              <li>
                <strong className="text-white">Intelligent Resume Detection Engine:</strong> NLP
                pipeline, 96.4% semantic extraction accuracy, automated ranking &amp; scoring dashboard.
              </li>
              <li>
                <strong className="text-white">Hardware &amp; Enterprise Automations:</strong> Batch
                recovery, corporate data ingestion, zero-downtime scripting.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
