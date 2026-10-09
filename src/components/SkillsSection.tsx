import React, { useState } from 'react';
import { Cpu, GitFork, BarChart3, TerminalSquare, Info } from 'lucide-react';
import { sound } from '../utils/audio';

interface SkillItem {
  id: string;
  category: string;
  icon: React.ReactNode;
  iconColor: string;
  description: string;
  tags: string[];
}

export const SkillsSection: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const skills: SkillItem[] = [
    {
      id: 'ai-ml',
      category: 'AI & Machine Learning',
      icon: <Cpu className="w-6 h-6 text-[#FFB800]" />,
      iconColor: 'bg-[#F59E0B]/10 border-[#F59E0B]/30',
      description:
        'Agentic AI architectures, Deep Learning (DL), automated reasoning loops, Prompt Engineering, and synthetic data setups.',
      tags: ['LangChain', 'AutoGen', 'PyTorch'],
    },
    {
      id: 'automation',
      category: 'Automation & Tools',
      icon: <GitFork className="w-6 h-6 text-[#4cd7f6]" />,
      iconColor: 'bg-[#06B6D4]/10 border-[#06B6D4]/30',
      description:
        'Workflow Automations, Python Scripting, AI Tool Integration, local inference servers, and scheduled data extraction.',
      tags: ['FastAPI', 'n8n', 'Ollama'],
    },
    {
      id: 'analytics',
      category: 'Data Analytics',
      icon: <BarChart3 className="w-6 h-6 text-[#10B981]" />,
      iconColor: 'bg-[#10B981]/10 border-[#10B981]/30',
      description:
        'Data parsing, structured extraction from PDFs/APIs, Natural Language Processing (NLP) pipelines, and statistical analysis.',
      tags: ['Pandas', 'NLTK', 'Vector DB'],
    },
    {
      id: 'software',
      category: 'Software & Tools',
      icon: <TerminalSquare className="w-6 h-6 text-[#f59e0b]" />,
      iconColor: 'bg-[#F59E0B]/10 border-[#F59E0B]/30',
      description:
        'Graphic design, MS Office Suite, Streamlit interactive web applications, Linux environments, and physical hardware diagnostics.',
      tags: ['Streamlit', 'Git', 'Hardware'],
    },
  ];

  const handleTagClick = (tag: string) => {
    sound.playBeep(selectedTag === tag ? 400 : 640, 0.05);
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  return (
    <section id="skills" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="font-mono text-xs uppercase tracking-wider text-[#FFB800] mb-3 flex items-center gap-2">
            <span>// 01. CORE TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Skills & Architecture
          </h2>
          <p className="text-base text-gray-400 max-w-3xl leading-relaxed">
            Engineered with deep foundations across modern machine learning stacks, automated
            orchestration, and resilient software mechanics.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="glass-panel glass-panel-hover rounded-xl p-6 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle top indicator glow */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F59E0B]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Icon Container */}
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center border mb-6 ${skill.iconColor}`}
                >
                  {skill.icon}
                </div>

                {/* Category Title */}
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#FFB800] transition-colors">
                  {skill.category}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal mb-6">
                  {skill.description}
                </p>
              </div>

              {/* Bottom Tags with Hairline Divider */}
              <div className="pt-4 border-t border-white/10 mt-auto">
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map((tag) => {
                    const isSelected = selectedTag === tag;
                    return (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#F59E0B] text-[#090A0F] font-bold shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                            : 'bg-white/5 border border-white/10 text-gray-300 hover:border-[#F59E0B]/40 hover:text-white'
                        }`}
                        title={`Click to filter capability by ${tag}`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Active Tag Telemetry Callout if clicked */}
        {selectedTag && (
          <div className="mt-6 p-4 rounded-lg bg-[#0D1117] border border-[#F59E0B]/40 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-gray-300">
              <Info className="w-4 h-4 text-[#FFB800]" />
              <span>
                Capability filter active:{' '}
                <span className="text-[#FFB800] font-bold">[{selectedTag}]</span> — Tested in
                production pipelines & automated agents.
              </span>
            </div>
            <button
              onClick={() => setSelectedTag(null)}
              className="text-gray-400 hover:text-white underline cursor-pointer text-xs"
            >
              Clear filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
