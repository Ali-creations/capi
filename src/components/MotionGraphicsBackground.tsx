import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/audio';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  pulseSpeed: number;
  r: number;
  g: number;
  b: number;
}

interface DataPacket {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  color: string;
  size: number;
}

export const MotionGraphicsBackground: React.FC = () => {
  const { palette } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [motionMode, setMotionMode] = useState<'neural' | 'cyber-grid' | 'warp'>('neural');
  const [hudCoordinates, setHudCoordinates] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let scanLineY = 0;

    // Create constellation particles
    const particleCount = Math.min(85, Math.floor((width * height) / 18000));
    const particles: Particle[] = [];
    // Derive RGB from palette.threeColorHex
    const hex = palette.threeColorHex;
    const pr = (hex >> 16) & 255;
    const pg = (hex >> 8) & 255;
    const pb = hex & 255;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        r: i % 3 === 0 ? 255 : pr,
        g: i % 3 === 0 ? 255 : pg,
        b: i % 3 === 0 ? 255 : pb,
      });
    }

    // Dynamic data packets traveling between nodes
    const packets: DataPacket[] = [];
    const maxPackets = 12;

    const spawnPacket = () => {
      if (particles.length < 2 || packets.length >= maxPackets) return;
      const p1 = particles[Math.floor(Math.random() * particles.length)];
      // find a close particle
      const candidates = particles.filter((p2) => {
        if (p2 === p1) return false;
        const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        return d < 220 && d > 30;
      });
      if (candidates.length > 0) {
        const p2 = candidates[Math.floor(Math.random() * candidates.length)];
        packets.push({
          x: p1.x,
          y: p1.y,
          targetX: p2.x,
          targetY: p2.y,
          progress: 0,
          speed: Math.random() * 0.02 + 0.015,
          color: Math.random() > 0.4 ? '#FFB800' : '#38bdf8',
          size: Math.random() * 2.5 + 1.5,
        });
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      setHudCoordinates({
        x: Math.round(e.clientX),
        y: Math.round(e.clientY),
      });
      // Kinetic mouse synthesizer feedback
      sound.feedMouseMotion(e.clientX, e.clientY);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let lastPacketSpawn = 0;
    let time = 0;

    const render = () => {
      time += 0.015;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Subtle moving cybernetic perspective grid in the background
      const gridSpacing = 64;
      const gridOffset = (time * 12) % gridSpacing;
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.018)';

      // Vertical grid lines with subtle warp toward mouse
      for (let x = 0; x < width; x += gridSpacing) {
        const distFromMouse = Math.abs(x - mouseX);
        const warp = Math.max(0, 1 - distFromMouse / 350) * 12;
        ctx.beginPath();
        ctx.moveTo(x + (x > mouseX ? -warp : warp), 0);
        ctx.lineTo(x + (x > mouseX ? -warp : warp), height);
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let y = gridOffset; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. High-tech Cyber HUD Scanning beam line
      scanLineY = (scanLineY + 1.2) % height;
      const scanGradient = ctx.createLinearGradient(0, scanLineY - 40, 0, scanLineY + 40);
      scanGradient.addColorStop(0, 'rgba(245, 158, 11, 0)');
      scanGradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.045)');
      scanGradient.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = scanGradient;
      ctx.fillRect(0, scanLineY - 40, width, 80);

      // Fine bright laser line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.12)';
      ctx.lineWidth = 1;
      ctx.moveTo(0, scanLineY);
      ctx.lineTo(width, scanLineY);
      ctx.stroke();

      // 3. Mouse Ambient Light Orb
      const mouseGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 320);
      mouseGrad.addColorStop(0, 'rgba(245, 158, 11, 0.08)');
      mouseGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.03)');
      mouseGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = mouseGrad;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 320, 0, Math.PI * 2);
      ctx.fill();

      // 4. Update & Draw Constellation Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse slight attraction / repulsion
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 180) {
          const force = (180 - dist) / 180;
          p.x -= (dx / dist) * force * 0.8;
          p.y -= (dy / dist) * force * 0.8;
        }

        // Pulse opacity
        const currentAlpha = p.alpha + Math.sin(time * 3 + i) * 0.15;
        const clampedAlpha = Math.max(0.08, Math.min(0.65, currentAlpha));

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${clampedAlpha})`;
        ctx.fill();

        // Connect nearby particles with luminous cyber filaments
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          const maxDist = 150;

          if (d < maxDist) {
            const lineAlpha = (1 - d / maxDist) * 0.14;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${pr}, ${pg}, ${pb}, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 5. Spawn & Animate High-Speed Data Packets
      if (Date.now() - lastPacketSpawn > 400) {
        spawnPacket();
        lastPacketSpawn = Date.now();
      }

      for (let i = packets.length - 1; i >= 0; i--) {
        const pkt = packets[i];
        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) {
          packets.splice(i, 1);
          continue;
        }

        const curX = pkt.x + (pkt.targetX - pkt.x) * pkt.progress;
        const curY = pkt.y + (pkt.targetY - pkt.y) * pkt.progress;

        // Glowing packet head
        ctx.beginPath();
        ctx.arc(curX, curY, pkt.size, 0, Math.PI * 2);
        ctx.fillStyle = pkt.color;
        ctx.shadowColor = pkt.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Subtle trail
        const trailX = pkt.x + (pkt.targetX - pkt.x) * Math.max(0, pkt.progress - 0.08);
        const trailY = pkt.y + (pkt.targetY - pkt.y) * Math.max(0, pkt.progress - 0.08);
        ctx.beginPath();
        ctx.moveTo(trailX, trailY);
        ctx.lineTo(curX, curY);
        ctx.strokeStyle = pkt.color;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [motionMode]);

  return (
    <>
      {/* Canvas container fixed behind all DOM */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      />

      {/* Floating Cyber HUD telemetry corner tags (very quiet and futuristic) */}
      <div className="fixed bottom-4 left-4 z-10 pointer-events-none hidden xl:flex flex-col gap-1 font-mono text-[10px] text-gray-500/80">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] animate-pulse" />
          <span>SYS_GRID: NEURAL FLUX 60FPS</span>
        </div>
        <div className="text-gray-600">
          COORD: [X:{hudCoordinates.x} Y:{hudCoordinates.y}]
        </div>
      </div>

      <div className="fixed top-24 right-4 z-10 pointer-events-none hidden xl:flex flex-col items-end gap-1 font-mono text-[10px] text-gray-600">
        <div className="text-gray-500">AP-SOUTH-1 // TELEMETRY NODE</div>
        <div className="text-[#06B6D4]/70">LATENCY: 14.2ms [QUANTUM MESH]</div>
      </div>
    </>
  );
};
