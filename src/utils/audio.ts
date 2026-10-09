// Advanced Web Audio API Kinetic Theremin & Cyber Synth Engine
// Reacts in real-time to mouse speed, direction, and spatial coordinates.

class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private lastSoundTime: number = 0;
  private lastChirpTime: number = 0;
  private lastMotionX: number = 0;
  private lastMotionY: number = 0;
  private lastMotionTime: number = 0;

  // Continuous kinetic synth nodes
  private continuousOsc: OscillatorNode | null = null;
  private continuousGain: GainNode | null = null;
  private continuousFilter: BiquadFilterNode | null = null;
  private isContinuousRunning: boolean = false;
  private idleTimeout: any = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sound_enabled');
      if (saved !== null) {
        this.enabled = saved === 'true';
      }
    }
  }

  public toggleSound(): boolean {
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('sound_enabled', String(this.enabled));
    }
    if (this.enabled) {
      this.playSuccess();
    } else {
      this.stopContinuous();
    }
    return this.enabled;
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private startContinuous() {
    if (!this.enabled || !this.ctx || this.isContinuousRunning) return;
    try {
      this.continuousOsc = this.ctx.createOscillator();
      this.continuousGain = this.ctx.createGain();
      this.continuousFilter = this.ctx.createBiquadFilter();

      this.continuousOsc.type = 'sawtooth';
      this.continuousFilter.type = 'lowpass';
      this.continuousFilter.frequency.setValueAtTime(450, this.ctx.currentTime);
      this.continuousFilter.Q.setValueAtTime(4.0, this.ctx.currentTime);

      this.continuousGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

      this.continuousOsc.connect(this.continuousFilter);
      this.continuousFilter.connect(this.continuousGain);
      this.continuousGain.connect(this.ctx.destination);

      this.continuousOsc.start();
      this.isContinuousRunning = true;
    } catch {
      // safe
    }
  }

  private stopContinuous() {
    if (!this.isContinuousRunning) return;
    try {
      if (this.continuousGain && this.ctx) {
        this.continuousGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      }
      setTimeout(() => {
        try {
          this.continuousOsc?.stop();
          this.continuousOsc?.disconnect();
          this.continuousFilter?.disconnect();
          this.continuousGain?.disconnect();
        } catch {}
        this.isContinuousRunning = false;
      }, 100);
    } catch {}
  }

  /**
   * Main crazy kinetic mouse reactor:
   * Translates mouse velocity and 2D coordinates into cyber synth notes,
   * frequency modulations, and high-tech UI laser chirps.
   */
  public feedMouseMotion(clientX: number, clientY: number) {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = Date.now();
    const dt = Math.max(1, now - this.lastMotionTime);
    const dx = clientX - this.lastMotionX;
    const dy = clientY - this.lastMotionY;
    const dist = Math.hypot(dx, dy);
    const speed = dist / dt; // pixels per ms

    this.lastMotionX = clientX;
    this.lastMotionY = clientY;
    this.lastMotionTime = now;

    // Normalize coordinates (0.0 to 1.0)
    const normX = Math.min(1, Math.max(0, clientX / (window.innerWidth || 1)));
    const normY = Math.min(1, Math.max(0, clientY / (window.innerHeight || 1)));

    // Pentatonic scale quantized frequencies for pleasing cyber arpeggios
    // Notes: C4, D4, E4, G4, A4, C5, D5, E5, G5, A5, C6
    const pentatonic = [
      261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99, 880.0, 1046.5,
    ];

    // Rapid cyber arpeggio chirps on motion
    if (speed > 0.45 && now - this.lastChirpTime > Math.max(50, 140 - speed * 30)) {
      this.lastChirpTime = now;
      const noteIdx = Math.floor(normX * pentatonic.length) % pentatonic.length;
      const baseFreq = pentatonic[noteIdx];
      const pitchMod = baseFreq * (1 + (1 - normY) * 0.4);

      this.triggerCyberChirp(pitchMod, speed);
    }

    // High velocity sub-laser sweep
    if (speed > 2.8 && now - this.lastSoundTime > 320) {
      this.lastSoundTime = now;
      this.triggerWarpSweep(normX);
    }

    // Smooth continuous drone tracking
    if (!this.isContinuousRunning) {
      this.startContinuous();
    }

    if (this.isContinuousRunning && this.continuousOsc && this.continuousFilter && this.continuousGain) {
      const audioNow = this.ctx.currentTime;
      const targetFreq = 120 + normX * 180 + (1 - normY) * 140;
      const targetFilter = 350 + speed * 600 + normX * 400;
      const targetGain = Math.min(0.025, 0.005 + speed * 0.008);

      this.continuousOsc.frequency.setTargetAtTime(targetFreq, audioNow, 0.05);
      this.continuousFilter.frequency.setTargetAtTime(targetFilter, audioNow, 0.05);
      this.continuousGain.gain.setTargetAtTime(targetGain, audioNow, 0.04);

      // Reset idle timeout to silence drone when user stops moving
      clearTimeout(this.idleTimeout);
      this.idleTimeout = setTimeout(() => {
        if (this.continuousGain && this.ctx) {
          this.continuousGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.1);
        }
      }, 140);
    }
  }

  private triggerCyberChirp(freq: number, speed: number) {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = speed > 1.2 ? 'square' : 'triangle';
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq, now);
      filter.Q.setValueAtTime(6.0, now);

      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.06);

      const vol = Math.min(0.045, 0.015 + speed * 0.01);
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {}
  }

  private triggerWarpSweep(normX: number) {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const startFreq = 220 + normX * 300;
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(startFreq * 2.5, now + 0.14);

      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch {}
  }

  public playTone(freq: number = 440, type: OscillatorType = 'sine', duration: number = 0.1, gainLevel: number = 0.03) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.4, now + duration);

      gain.gain.setValueAtTime(gainLevel, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {}
  }

  public playBeep(freq: number = 520, duration: number = 0.06, type: OscillatorType = 'sine') {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    } catch {}
  }

  public playSuccess() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const freqs = [440, 554.37, 659.25, 880];
      freqs.forEach((f, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + i * 0.07);
        gain.gain.setValueAtTime(0.04, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.18);
      });
    } catch {}
  }

  public playCorePulse() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08); // A5
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {}
  }
}

export const sound = new SoundEngine();
