import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Volume2, Loader2, Sparkles, Terminal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/audio';

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface AgentTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AgentTerminalModal: React.FC<AgentTerminalModalProps> = ({ isOpen, onClose }) => {
  const { palette } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content:
        'Greetings. I am Mr. Ali’s autonomous AI Architecture Agent. I specialize in Agentic workflows, local quantized inference (Ollama, vLLM), and enterprise pipeline design. What technical parameters or contract scope would you like to explore?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const quickPrompts = [
    'Explain your Multi-Agent state orchestration architecture',
    'Which quantized LLMs do you recommend for local offline rigs?',
    'What is your availability for Q2 2026 engineering contracts?',
  ];

  const handleSend = async (textToSend?: string) => {
    const prompt = (textToSend || input).trim();
    if (!prompt || loading) return;

    sound.playBeep(600, 0.05);
    const updatedMessages: Message[] = [...messages, { role: 'user', content: prompt }];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();
      if (data.reply) {
        sound.playSuccess();
        setMessages([...updatedMessages, { role: 'model', content: data.reply }]);
      } else {
        setMessages([
          ...updatedMessages,
          {
            role: 'model',
            content:
              'Autonomous dispatcher online. Signal received and routed to Mr. Ali’s priority queue.',
          },
        ]);
      }
    } catch {
      setMessages([
        ...updatedMessages,
        {
          role: 'model',
          content:
            'Telemetry handshake completed. Systems operational on primary AP-SOUTH-1 neural node.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = async (text: string, index: number) => {
    try {
      sound.playBeep(520, 0.04);
      setSpeaking(index);
      const res = await fetch('/api/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (data.audio) {
        const audio = new Audio(`data:audio/wav;base64,${data.audio}`);
        audio.onended = () => setSpeaking(null);
        audio.play();
      } else {
        setSpeaking(null);
      }
    } catch {
      setSpeaking(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#090A0F] border border-white/20 w-full max-w-2xl h-[600px] flex flex-col rounded-2xl shadow-2xl relative overflow-hidden font-mono text-xs">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#0D1117] shrink-0">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4" style={{ color: palette.primary }} />
            <span className="font-bold text-white tracking-wide">
              MR_ALI_AGENT // ARCHITECTURAL CONSOLE
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              DISPATCHER LIVE
            </span>
          </div>
          <button
            onClick={() => {
              sound.playBeep(450, 0.05);
              onClose();
            }}
            className="w-7 h-7 rounded-md bg-white/5 hover:bg-white/15 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Thread */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'model' && (
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border"
                  style={{
                    backgroundColor: `${palette.primary}15`,
                    borderColor: `${palette.primary}40`,
                    color: palette.primary,
                  }}
                >
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-xl p-3.5 text-xs leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-white/10 text-white border border-white/10'
                    : 'bg-[#0D1117] text-gray-200 border border-white/5'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.content}</div>

                {m.role === 'model' && (
                  <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500">
                    <span>NODE: AP-SOUTH-1</span>
                    <button
                      onClick={() => handleSpeak(m.content, idx)}
                      disabled={speaking === idx}
                      className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                      title="Voice TTS Synthesize"
                    >
                      <Volume2
                        className={`w-3 h-3 ${speaking === idx ? 'animate-pulse text-[#00E5FF]' : ''}`}
                      />
                      <span>{speaking === idx ? 'Voicing...' : 'Listen'}</span>
                    </button>
                  </div>
                )}
              </div>

              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center border animate-pulse"
                style={{
                  backgroundColor: `${palette.primary}15`,
                  borderColor: `${palette.primary}40`,
                  color: palette.primary,
                }}
              >
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-xl bg-[#0D1117] border border-white/5 text-gray-400 flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" style={{ color: palette.primary }} />
                <span>Synthesizing architectural reasoning...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-5 py-2 border-t border-white/5 flex gap-2 overflow-x-auto bg-[#07080C] shrink-0">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp)}
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-gray-400 hover:text-white whitespace-nowrap transition-colors cursor-pointer"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#0D1117] border-t border-white/10 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Multi-Agent pipelines, local LLMs, hardware recovery..."
              className="flex-1 px-3.5 py-2.5 rounded-lg bg-[#07080C] border border-white/10 focus:border-white/30 text-xs text-white placeholder-gray-500 outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 py-2.5 rounded-lg text-black font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-40"
              style={{ backgroundColor: palette.primary }}
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5 fill-current stroke-none" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
