import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Volume2, VolumeX, Activity } from 'lucide-react';
import { sound } from '../utils/audio';

interface NeuralCore3DProps {
  onInteract?: () => void;
}

export const NeuralCore3D: React.FC<NeuralCore3DProps> = ({ onInteract }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [soundActive, setSoundActive] = useState<boolean>(sound.enabled);
  const [fps, setFps] = useState<number>(60);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 520;
    let height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.outline = 'none';
    renderer.domElement.style.cursor = 'grab';
    renderer.domElement.className = 'w-full h-full object-contain';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const pointLightAmber = new THREE.PointLight(0xf59e0b, 4.5, 35);
    pointLightAmber.position.set(5, 5, 5);
    scene.add(pointLightAmber);

    const pointLightCyan = new THREE.PointLight(0x06b6d4, 3.2, 35);
    pointLightCyan.position.set(-5, -3, 4);
    scene.add(pointLightCyan);

    // Master Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Central AI Neural Core (Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(1.35, 2);
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0x0c0e14,
      emissive: 0x221805,
      specular: 0xf59e0b,
      shininess: 95,
      transparent: true,
      opacity: 0.92,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Core glowing wireframe
    const wireGeo = new THREE.IcosahedronGeometry(1.38, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    // Inner pulsing energy sphere
    const innerSphereGeo = new THREE.SphereGeometry(0.8, 24, 24);
    const innerSphereMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.85,
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    coreGroup.add(innerSphere);

    // Orbital Gimbal Rings
    const ringMats = [
      new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.75, side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65, side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ color: 0xe2e8f0, transparent: true, opacity: 0.45, side: THREE.DoubleSide }),
    ];

    const ring1Geo = new THREE.RingGeometry(2.0, 2.05, 64);
    const ring1 = new THREE.Mesh(ring1Geo, ringMats[0]);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.RingGeometry(2.5, 2.54, 64);
    const ring2 = new THREE.Mesh(ring2Geo, ringMats[1]);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 4;
    coreGroup.add(ring2);

    const ring3Geo = new THREE.RingGeometry(3.0, 3.03, 64);
    const ring3 = new THREE.Mesh(ring3Geo, ringMats[2]);
    ring3.rotation.x = Math.PI / 2.2;
    coreGroup.add(ring3);

    // Satellites
    const satelliteGroup = new THREE.Group();
    coreGroup.add(satelliteGroup);

    const satCount = 6;
    const satellites: {
      mesh: THREE.Mesh;
      orbitRadius: number;
      speed: number;
      offset: number;
      tilt: number;
    }[] = [];

    for (let i = 0; i < satCount; i++) {
      const satGeo = new THREE.OctahedronGeometry(0.14, 0);
      const satMat = new THREE.MeshPhongMaterial({
        color: i % 2 === 0 ? 0xf59e0b : 0x38bdf8,
        emissive: i % 2 === 0 ? 0x92400e : 0x0369a1,
        shininess: 100,
      });
      const sat = new THREE.Mesh(satGeo, satMat);
      satelliteGroup.add(sat);
      satellites.push({
        mesh: sat,
        orbitRadius: 2.0 + (i % 3) * 0.5,
        speed: (0.4 + i * 0.15) * (i % 2 === 0 ? 1 : -1),
        offset: (i * Math.PI * 2) / satCount,
        tilt: i * 0.35,
      });
    }

    // Particle Constellation
    const particleCount = 280;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 1.6 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particles);

    // Mouse Tracking & Interaction
    let mouseX = 0,
      mouseY = 0,
      targetX = 0,
      targetY = 0;
    let isDragging = false;
    let prevPointerX = 0,
      prevPointerY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / (rect.width || 1);
      const y = (e.clientY - rect.top) / (rect.height || 1);

      if (isDragging) {
        const deltaX = (e.clientX - prevPointerX) * 0.01;
        const deltaY = (e.clientY - prevPointerY) * 0.01;
        coreGroup.rotation.y += deltaX;
        coreGroup.rotation.x += deltaY;
        prevPointerX = e.clientX;
        prevPointerY = e.clientY;
      } else {
        targetX = (x - 0.5) * 2;
        targetY = (y - 0.5) * 2;
      }

      // Audio feedback on pointer movement
      if (Math.abs(targetX) > 0.15 || Math.abs(targetY) > 0.15) {
        const toneFreq = 300 + Math.abs(targetX) * 350 + Math.abs(targetY) * 220;
        sound.playTone(toneFreq, 'sine', 0.08, 0.02);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      setIsInteracting(true);
      renderer.domElement.style.cursor = 'grabbing';
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      sound.playCorePulse();
      innerSphere.scale.set(1.4, 1.4, 1.4);
      onInteract?.();
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
      renderer.domElement.style.cursor = 'grab';
    };

    container.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 520;
      height = container.clientHeight || 520;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Animation loop & FPS calculation
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let frameCount = 0;
    let lastFpsTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // FPS estimate
      frameCount++;
      const now = performance.now();
      if (now - lastFpsTime >= 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (now - lastFpsTime))));
        frameCount = 0;
        lastFpsTime = now;
      }

      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      if (!isDragging) {
        coreGroup.rotation.y = elapsedTime * 0.25 + mouseX * 0.85;
        coreGroup.rotation.x = Math.sin(elapsedTime * 0.15) * 0.15 - mouseY * 0.85;
      }

      const pulse = 1.0 + Math.sin(elapsedTime * 3.0) * 0.15;
      innerSphere.scale.lerp(new THREE.Vector3(pulse, pulse, pulse), 0.1);

      ring1.rotation.z = elapsedTime * 0.4;
      ring2.rotation.z = -elapsedTime * 0.35;
      ring3.rotation.z = elapsedTime * 0.2;

      satellites.forEach((sat) => {
        const angle = elapsedTime * sat.speed + sat.offset;
        sat.mesh.position.x = Math.cos(angle) * sat.orbitRadius;
        sat.mesh.position.z = Math.sin(angle) * sat.orbitRadius;
        sat.mesh.position.y = Math.sin(angle * 1.5 + sat.tilt) * 0.85;
        sat.mesh.rotation.x += 0.02;
        sat.mesh.rotation.y += 0.03;
      });

      particles.rotation.y = -elapsedTime * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Cleanup GPU memory
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      innerSphereGeo.dispose();
      innerSphereMat.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      ringMats.forEach((m) => m.dispose());
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [onInteract]);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const active = sound.toggleSound();
    setSoundActive(active);
  };

  return (
    <div className="relative w-full aspect-square max-w-[580px] mx-auto select-none">
      {/* Top Controls Overlay */}
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 flex flex-col items-end gap-1.5 pointer-events-auto">
        <button
          onClick={toggleSound}
          className={`px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 border transition-all ${
            soundActive
              ? 'bg-[#F59E0B]/10 border-[#F59E0B]/40 text-[#FFB800] hover:bg-[#F59E0B]/20 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
              : 'bg-black/40 border-white/10 text-gray-400 hover:text-gray-200 hover:border-white/20'
          }`}
          title="Toggle audio synthesizer sound effects"
        >
          {soundActive ? <Volume2 className="w-3.5 h-3.5 text-[#FFB800]" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>Audio: {soundActive ? 'ON' : 'OFF'}</span>
        </button>
        <div className="text-[11px] font-mono text-[#FFB800]/90 tracking-wider flex items-center gap-1.5">
          <Activity className="w-3 h-3 text-[#FFB800] animate-pulse" />
          <span>Interactive 3D Neural Core</span>
        </div>
      </div>

      {/* Dynamic Tag Overlay */}
      <div className="absolute top-1/3 left-4 sm:left-8 z-10 pointer-events-none">
        <div className="px-2.5 py-1 rounded-full bg-black/60 border border-[#06B6D4]/30 text-[10px] sm:text-xs font-mono text-[#4cd7f6] flex items-center gap-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-ping" />
          <span>WEBGL 2.0 DYNAMIC</span>
        </div>
      </div>

      {/* WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center relative z-0 touch-none"
      />

      {/* Bottom Telemetry Overlay matching Image */}
      <div className="absolute bottom-2 sm:bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[11px] font-mono text-gray-400 border-t border-white/5 pt-2">
        <div className="flex items-center gap-2 text-gray-300">
          <span className="w-2 h-2 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
          <span className="font-semibold text-white">Direct 3D Interaction</span>
          <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-[#4cd7f6]">
            {fps}FPS
          </span>
        </div>
        <div className="text-[10px] sm:text-[11px] text-gray-400 tracking-tight flex items-center gap-1.5">
          <span>{isInteracting ? 'Manipulating neural coordinates...' : 'Click / drag core or move mouse for audio synth'}</span>
        </div>
      </div>
    </div>
  );
};
