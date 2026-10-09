import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemePalette = 'amber' | 'cyan' | 'emerald' | 'platinum';

export interface ThemeConfig {
  id: ThemePalette;
  name: string;
  tagline: string;
  primary: string; // hex
  primaryGlow: string;
  accent: string;
  threeColorHex: number;
  secondaryThreeHex: number;
}

export const PALETTES: Record<ThemePalette, ThemeConfig> = {
  amber: {
    id: 'amber',
    name: 'Kinetic Amber',
    tagline: 'Cybernetic AI Cockpit',
    primary: '#FFB800',
    primaryGlow: 'rgba(255, 184, 0, 0.35)',
    accent: '#F59E0B',
    threeColorHex: 0xf59e0b,
    secondaryThreeHex: 0x06b6d4,
  },
  cyan: {
    id: 'cyan',
    name: 'Quantum Cyan',
    tagline: 'Deep-Tech Research Lab',
    primary: '#00E5FF',
    primaryGlow: 'rgba(0, 229, 255, 0.35)',
    accent: '#06B6D4',
    threeColorHex: 0x00e5ff,
    secondaryThreeHex: 0x38bdf8,
  },
  emerald: {
    id: 'emerald',
    name: 'Neural Emerald',
    tagline: 'Algorithmic Integrity',
    primary: '#10B981',
    primaryGlow: 'rgba(16, 185, 129, 0.35)',
    accent: '#059669',
    threeColorHex: 0x10b981,
    secondaryThreeHex: 0x34d399,
  },
  platinum: {
    id: 'platinum',
    name: 'Monolith Titanium',
    tagline: 'Executive Architectural Minimal',
    primary: '#FFFFFF',
    primaryGlow: 'rgba(255, 255, 255, 0.35)',
    accent: '#CBD5E1',
    threeColorHex: 0xe2e8f0,
    secondaryThreeHex: 0x94a3b8,
  },
};

interface ThemeContextType {
  palette: ThemeConfig;
  setPalette: (id: ThemePalette) => void;
  availablePalettes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType>({
  palette: PALETTES.amber,
  setPalette: () => {},
  availablePalettes: Object.values(PALETTES),
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentId, setCurrentId] = useState<ThemePalette>('amber');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_palette') as ThemePalette;
    if (saved && PALETTES[saved]) {
      setCurrentId(saved);
    }
  }, []);

  const setPalette = (id: ThemePalette) => {
    setCurrentId(id);
    localStorage.setItem('portfolio_palette', id);

    // Update root CSS variables for dynamic styling
    const p = PALETTES[id];
    document.documentElement.style.setProperty('--color-primary', p.primary);
    document.documentElement.style.setProperty('--color-accent', p.accent);
    document.documentElement.style.setProperty('--color-glow', p.primaryGlow);
  };

  return (
    <ThemeContext.Provider
      value={{
        palette: PALETTES[currentId],
        setPalette,
        availablePalettes: Object.values(PALETTES),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
