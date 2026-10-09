import React, { useState } from 'react';
import { MessageSquare, Linkedin, Github, Copy, Check, Send, ShieldCheck, Loader2 } from 'lucide-react';
import { sound } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    payload: '',
  });
  const [dispatchStatus, setDispatchStatus] = useState<'idle' | 'transmitting' | 'success'>('idle');
  const [dispatchLogs, setDispatchLogs] = useState<string>('');

  const targetEmail = 'ali.ai.architect@gmail.com';

  const handleCopyEmail = () => {
    sound.playSuccess();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(targetEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleWhatsApp = () => {
    sound.playBeep(550, 0.06);
    const msg = encodeURIComponent(
      'Hello Mr. Ali, I reviewed your AI Architecture portfolio and would like to collaborate on an intelligent agent project.'
    );
    window.open(`https://wa.me/923234503036?text=${msg}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.payload) return;

    sound.playBeep(620, 0.1);
    setDispatchStatus('transmitting');
    setDispatchLogs('Initializing 256-bit GCM encryption channel...');

    setTimeout(() => {
      setDispatchLogs('Routing quantum packet to node [AP-SOUTH-1-LHE]...');
    }, 450);

    setTimeout(() => {
      sound.playSuccess();
      setDispatchStatus('success');
      setDispatchLogs('Transmission confirmed. Acknowledged by Mr. Ali core dispatcher.');
    }, 1100);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', payload: '' });
    setDispatchStatus('idle');
    setDispatchLogs('');
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative scroll-mt-20 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="font-mono text-xs uppercase tracking-wider text-[#FFB800] mb-3 flex items-center justify-center gap-2">
            <span>// 05. DIRECT MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Get In Touch
          </h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Open for specialized AI engineering, autonomous workflow pipelines, and
            forward-looking technical collaborations.
          </p>
        </div>

        {/* Quick Link Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            onClick={handleWhatsApp}
            className="px-4 py-2.5 rounded-lg bg-[#0D1117] hover:bg-[#161d28] border border-white/10 hover:border-[#10B981]/50 text-xs font-mono text-gray-200 hover:text-white flex items-center gap-2 transition-all cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#10B981]" />
            <span>WhatsApp (+92 323 4503036)</span>
          </button>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.playBeep(500, 0.05)}
            className="px-4 py-2.5 rounded-lg bg-[#0D1117] hover:bg-[#161d28] border border-white/10 hover:border-[#06B6D4]/50 text-xs font-mono text-gray-200 hover:text-white flex items-center gap-2 transition-all cursor-pointer"
          >
            <Linkedin className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span>LinkedIn Profile</span>
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.playBeep(500, 0.05)}
            className="px-4 py-2.5 rounded-lg bg-[#0D1117] hover:bg-[#161d28] border border-white/10 hover:border-[#FFB800]/50 text-xs font-mono text-gray-200 hover:text-white flex items-center gap-2 transition-all cursor-pointer"
          >
            <Github className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>GitHub Repos</span>
          </a>

          <button
            onClick={handleCopyEmail}
            className="px-4 py-2.5 rounded-lg bg-[#F59E0B] hover:bg-[#ffb800] text-[#090A0F] text-xs font-bold font-mono tracking-wider flex items-center gap-2 glow-amber-btn shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all cursor-pointer"
          >
            {copiedEmail ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedEmail ? 'COPIED TO CLIPBOARD!' : 'COPY EMAIL'}</span>
          </button>
        </div>

        {/* Transmission Dispatch Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 mb-6 gap-2">
            <div className="font-mono text-xs text-gray-300 flex items-center gap-2">
              <span className="text-[#FFB800]">//</span>
              <span>SECURE TRANSMISSION DISPATCH</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#10B981]">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>ENCRYPTED PROTOCOL</span>
            </div>
          </div>

          {dispatchStatus === 'success' ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Signal Dispatched Successfully</h3>
              <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto font-mono">
                {dispatchLogs}
              </p>
              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-gray-300 hover:text-white cursor-pointer transition-all"
                >
                  Send Another Transmission
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-[11px] text-gray-400 uppercase tracking-wider mb-2">
                    IDENTIFIER / NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Connor"
                    className="w-full px-4 py-3 rounded-lg bg-[#07080C] border border-white/10 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] text-sm text-white placeholder-gray-600 outline-none transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-gray-400 uppercase tracking-wider mb-2">
                    RETURN CHANNEL / EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full px-4 py-3 rounded-lg bg-[#07080C] border border-white/10 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] text-sm text-white placeholder-gray-600 outline-none transition-all font-mono"
                  />
                </div>
              </div>

              {/* Row 2: Transmission Payload */}
              <div>
                <label className="block font-mono text-[11px] text-gray-400 uppercase tracking-wider mb-2">
                  TRANSMISSION PAYLOAD
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.payload}
                  onChange={(e) => setFormData({ ...formData, payload: e.target.value })}
                  placeholder="Project parameters, AI model requirements, workflow scope..."
                  className="w-full px-4 py-3 rounded-lg bg-[#07080C] border border-white/10 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] text-sm text-white placeholder-gray-600 outline-none transition-all resize-none font-mono"
                />
              </div>

              {/* Status Log line if transmitting */}
              {dispatchStatus === 'transmitting' && (
                <div className="font-mono text-xs text-[#FFB800] flex items-center gap-2 animate-pulse">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{dispatchLogs}</span>
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={dispatchStatus === 'transmitting'}
                  className="w-full py-4 rounded-md bg-[#F59E0B] hover:bg-[#ffb800] text-[#090A0F] font-extrabold text-sm uppercase tracking-wider glow-amber-btn shadow-[0_0_25px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {dispatchStatus === 'transmitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>ENCRYPTING &amp; DISPATCHING...</span>
                    </>
                  ) : (
                    <>
                      <span>DISPATCH SIGNAL</span>
                      <Send className="w-4 h-4 fill-current stroke-none" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
