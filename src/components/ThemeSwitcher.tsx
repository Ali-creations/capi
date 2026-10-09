import React, { useState } from 'react';
import { Palette, ChevronDown, Check } from 'lucide-react';
import { useTheme, ThemePalette } from '../context/ThemeContext';
import { sound } from '../utils/audio';

export const ThemeSwitcher: React.FC = () => {
  const { palette, setPalette, availablePalettes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (id: ThemePalette) => {
    sound.playBeep(640, 0.05);
    setPalette(id);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left no-print">
      <button
        onClick={() => {
          sound.playBeep(520, 0.04);
          setIsOpen(!isOpen);
        }}
        className="px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs font-mono text-gray-300 hover:text-white flex items-center gap-2 transition-all cursor-pointer shadow-sm"
        title="Collaborate on Portfolio Colorway / Theme"
      >
        <span
          className="w-2.5 h-2.5 rounded-full shadow-sm"
          style={{ backgroundColor: palette.primary }}
        />
        <span className="hidden sm:inline">{palette.name}</span>
        <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#0D1117] border border-white/15 p-2 shadow-2xl z-50 font-mono text-xs animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2 py-1.5 text-[10px] text-gray-400 border-b border-white/10 mb-1 flex items-center justify-between">
            <span>PROFESSIONAL PALETTE</span>
            <Palette className="w-3 h-3 text-gray-400" />
          </div>

          <div className="space-y-1">
            {availablePalettes.map((p) => {
              const isSelected = p.id === palette.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelect(p.id)}
                  className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-white/10 text-white font-bold'
                      : 'hover:bg-white/5 text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: p.primary }}
                    />
                    <div>
                      <div className="text-xs">{p.name}</div>
                      <div className="text-[10px] text-gray-500 font-sans">{p.tagline}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
