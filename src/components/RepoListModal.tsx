import React, { useState } from 'react';
import { X, Search, GitBranch, Star, ArrowUpRight, Copy, Check } from 'lucide-react';
import { sound } from '../utils/audio';

interface RepoListModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFilter?: string;
}

interface RepoItem {
  id: string;
  name: string;
  category: 'Agentic AI' | 'NLP & Data' | 'Infrastructure' | 'Tools';
  description: string;
  language: string;
  stars: number;
  tags: string[];
}

export const RepoListModal: React.FC<RepoListModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [copiedRepo, setCopiedRepo] = useState<string | null>(null);

  if (!isOpen) return null;

  const repositories: RepoItem[] = [
    {
      id: 'agent-orchestrator',
      name: 'autonomous-ai-agent-orchestrator',
      category: 'Agentic AI',
      description:
        'Multi-agent state mesh orchestrating local LLM tool calling, validation loops, and dynamic task delegation.',
      language: 'Python',
      stars: 48,
      tags: ['AutoGen', 'LangChain', 'Local LLM'],
    },
    {
      id: 'resume-detection',
      name: 'intelligent-resume-detection-engine',
      category: 'NLP & Data',
      description:
        'Automated resume parsing with semantic entity extraction, vector similarity scoring, and Streamlit visualization.',
      language: 'Python',
      stars: 39,
      tags: ['NLTK', 'Streamlit', 'Vector DB'],
    },
    {
      id: 'corp-automation',
      name: 'hardware-corporate-automations',
      category: 'Infrastructure',
      description:
        'Production batch scripts for corporate workflow management, automated PC provisioning, and diagnostics.',
      language: 'Bash / Python',
      stars: 27,
      tags: ['Linux', 'Hardware', 'Batch'],
    },
    {
      id: 'local-llm-gateway',
      name: 'local-llm-concurrency-gateway',
      category: 'Agentic AI',
      description:
        'FastAPI asynchronous proxy orchestrating Ollama and vLLM quantized instances with automatic queue routing.',
      language: 'Python',
      stars: 34,
      tags: ['FastAPI', 'Ollama', 'Quantized'],
    },
    {
      id: 'pdf-structured-ocr',
      name: 'pdf-structured-extractor-pipeline',
      category: 'NLP & Data',
      description:
        'High-speed tabular & key-value extraction pipeline converting unstructured business documents into verified JSON.',
      language: 'Python',
      stars: 22,
      tags: ['Pandas', 'OCR', 'Regex'],
    },
    {
      id: 'autogen-consensus',
      name: 'autogen-multi-agent-consensus',
      category: 'Agentic AI',
      description:
        'Multi-role debate consensus system testing hypothesis generation and validation with peer-review agent loops.',
      language: 'Python',
      stars: 31,
      tags: ['AutoGen', 'Reasoning'],
    },
    {
      id: 'linux-hw-diag',
      name: 'linux-hardware-recovery-toolkit',
      category: 'Infrastructure',
      description:
        'Automated memory, CPU stress-testing, and disk health diagnostics report generator for corporate fleets.',
      language: 'Shell',
      stars: 19,
      tags: ['SysAdmin', 'Diagnostic'],
    },
    {
      id: 'rag-vector-retriever',
      name: 'rag-dense-sparse-hybrid-retriever',
      category: 'NLP & Data',
      description:
        'Hybrid BM25 + dense embedding vector search engine with reranking support for local offline knowledge bases.',
      language: 'Python',
      stars: 42,
      tags: ['Vector DB', 'RAG', 'HNSW'],
    },
  ];

  const categories = ['All', 'Agentic AI', 'NLP & Data', 'Infrastructure'];

  const filtered = repositories.filter((repo) => {
    const matchesCat = activeCategory === 'All' || repo.category === activeCategory;
    const matchesSearch =
      repo.name.toLowerCase().includes(search.toLowerCase()) ||
      repo.description.toLowerCase().includes(search.toLowerCase()) ||
      repo.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleCopyClone = (name: string) => {
    sound.playSuccess();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`git clone https://github.com/mrali/${name}.git`);
      setCopiedRepo(name);
      setTimeout(() => setCopiedRepo(null), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#090A0F] border border-white/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8 text-white relative shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#FFB800]">
              <GitBranch className="w-4 h-4" />
              <span>PRODUCTION REPOSITORIES INDEX // 20+ CODEBASES</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Shipped Architectures &amp; Frameworks
            </h2>
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

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, tag, or technology (e.g. AutoGen, Linux)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#0D1117] border border-white/10 text-xs text-white placeholder-gray-500 focus:border-[#F59E0B] outline-none font-mono"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playBeep(520, 0.04);
                  setActiveCategory(cat);
                }}
                className={`px-3 py-2 rounded-lg text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#F59E0B] text-[#090A0F] font-bold shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Repo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((repo) => (
            <div
              key={repo.id}
              className="p-5 rounded-xl bg-[#0D1117] border border-white/10 hover:border-[#F59E0B]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 font-mono text-xs">
                  <span className="text-gray-400 font-semibold truncate group-hover:text-[#FFB800] transition-colors">
                    {repo.name}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400/90 shrink-0">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{repo.stars}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  {repo.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 font-mono text-[11px]">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[#4cd7f6]">{repo.language}</span>
                  <span className="text-gray-600">•</span>
                  {repo.tags.map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleCopyClone(repo.name)}
                  className="px-2 py-1 rounded bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors shrink-0"
                  title="Copy git clone URL"
                >
                  {copiedRepo === repo.name ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-[#FFB800]" />
                  )}
                  <span>{copiedRepo === repo.name ? 'Copied' : 'Clone'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
