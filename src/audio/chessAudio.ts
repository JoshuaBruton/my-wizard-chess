import { ArmyType } from '../types/chess';

class ChessAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;
  private masterGain: GainNode | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = this.muted ? 0 : 0.45;
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.45, this.ctx.currentTime);
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  public playSelect() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(480, t);
    osc.frequency.exponentialRampToValueAtTime(320, t + 0.06);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.07);
  }

  public playMove(armyType: ArmyType = 'gothic') {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;

    switch (armyType) {
      case 'roman': {
        // Metallic legion step + bronze clink
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(340, t);
        osc.frequency.exponentialRampToValueAtTime(140, t + 0.16);

        gain.gain.setValueAtTime(0.24, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

        // High bronze metallic resonance
        const bronze = this.ctx.createOscillator();
        const bronzeGain = this.ctx.createGain();
        bronze.type = 'sine';
        bronze.frequency.setValueAtTime(1480, t);
        bronze.frequency.exponentialRampToValueAtTime(1120, t + 0.22);
        bronzeGain.gain.setValueAtTime(0.12, t);
        bronzeGain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

        osc.connect(gain);
        bronze.connect(bronzeGain);
        gain.connect(this.masterGain);
        bronzeGain.connect(this.masterGain);

        osc.start(t);
        bronze.start(t);
        osc.stop(t + 0.2);
        bronze.stop(t + 0.25);
        break;
      }

      case 'crusader': {
        // Heavy iron plate stomp & chainmail rattle
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(120, t);
        osc.frequency.exponentialRampToValueAtTime(45, t + 0.24);

        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

        // Chivalric chime ring
        const bell = this.ctx.createOscillator();
        const bellGain = this.ctx.createGain();
        bell.type = 'sine';
        bell.frequency.setValueAtTime(660, t + 0.04);
        bellGain.gain.setValueAtTime(0.15, t + 0.04);
        bellGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

        osc.connect(gain);
        bell.connect(bellGain);
        gain.connect(this.masterGain);
        bellGain.connect(this.masterGain);

        osc.start(t);
        bell.start(t + 0.04);
        osc.stop(t + 0.26);
        bell.stop(t + 0.36);
        break;
      }

      case 'samurai': {
        // Swift stealth whoosh + wooden tatami tap
        const noise = this.createNoiseBuffer(0.18);
        const noiseNode = this.ctx.createBufferSource();
        noiseNode.buffer = noise;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1200, t);
        filter.frequency.exponentialRampToValueAtTime(400, t + 0.16);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

        noiseNode.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        noiseNode.start(t);
        noiseNode.stop(t + 0.19);
        break;
      }

      case 'viking': {
        // Deep war-drum thud and granite slide
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(90, t);
        osc.frequency.exponentialRampToValueAtTime(32, t + 0.28);

        gain.gain.setValueAtTime(0.42, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t);
        osc.stop(t + 0.32);
        break;
      }

      case 'egyptian': {
        // Gilded sistrum rattle + shifting warm sand resonance
        const bell = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        bell.type = 'sine';
        bell.frequency.setValueAtTime(880, t);
        bell.frequency.exponentialRampToValueAtTime(540, t + 0.28);

        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

        bell.connect(gain);
        gain.connect(this.masterGain);

        bell.start(t);
        bell.stop(t + 0.32);
        break;
      }

      default: {
        // Gothic stone grind
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(160, t);
        osc.frequency.exponentialRampToValueAtTime(60, t + 0.22);

        gain.gain.setValueAtTime(0.28, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.24);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t);
        osc.stop(t + 0.26);
        break;
      }
    }
  }

  public playAttack(armyType: ArmyType = 'gothic', pieceType: string = 'pawn') {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;

    switch (armyType) {
      case 'roman': {
        // Gladius blade impact & metallic scrape
        this.playMetalClash(t, 920, 240, 0.45);
        this.playLowPunch(t, 180, 0.5);
        break;
      }

      case 'crusader': {
        // Holy broadsword heavy cleave & iron bell chime
        this.playMetalClash(t, 780, 160, 0.55);
        this.playLowPunch(t, 140, 0.6);
        // Cathedral bell overtone
        this.playBellTone(t + 0.05, 523.25, 0.6); // C5
        break;
      }

      case 'samurai': {
        // High-velocity Katana clean razor slice
        const noise = this.createNoiseBuffer(0.22);
        const noiseNode = this.ctx.createBufferSource();
        noiseNode.buffer = noise;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1800, t);
        filter.frequency.exponentialRampToValueAtTime(4500, t + 0.08);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.48, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

        noiseNode.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        noiseNode.start(t);
        noiseNode.stop(t + 0.24);

        this.playMetalClash(t + 0.04, 1650, 480, 0.38);
        break;
      }

      case 'viking': {
        // Thunderous Dane axe crunch & crushing impact
        this.playLowPunch(t, 90, 0.75);
        this.playMetalClash(t, 420, 95, 0.5);
        // Splinter burst
        const noise = this.createNoiseBuffer(0.35);
        const src = this.ctx.createBufferSource();
        src.buffer = noise;
        const g = this.ctx.createGain();
        g.gain.setValueAtTime(0.45, t + 0.03);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        src.connect(g);
        g.connect(this.masterGain);
        src.start(t + 0.03);
        src.stop(t + 0.38);
        break;
      }

      case 'egyptian': {
        // Whipping bronze Khopesh slash & ringing gong
        this.playMetalClash(t, 840, 310, 0.4);
        this.playBellTone(t, 392.0, 0.55); // G4
        this.playLowPunch(t, 130, 0.45);
        break;
      }

      default: {
        // Arcane magical strike & thunder shockwave
        this.playLowPunch(t, 110, 0.7);
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(620, t);
        osc.frequency.exponentialRampToValueAtTime(80, t + 0.28);
        g.gain.setValueAtTime(0.4, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.connect(g);
        g.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + 0.32);
        break;
      }
    }
  }

  public playShatter() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;

    // Heavy stone explosion crack
    const noise = this.createNoiseBuffer(0.45);
    const noiseNode = this.ctx.createBufferSource();
    noiseNode.buffer = noise;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2800, t);
    filter.frequency.exponentialRampToValueAtTime(220, t + 0.45);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.65, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.48);

    noiseNode.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noiseNode.start(t);
    noiseNode.stop(t + 0.5);

    // Deep sub-bass crumbling foundation
    this.playLowPunch(t, 75, 0.85);
  }

  public playCheck() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    // Tense dual diminished fifth sting
    [330, 466.16].forEach((freq) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.96, t + 0.45);

      gain.gain.setValueAtTime(0.28, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.52);
    });
  }

  public playCheckmate(winningArmy: ArmyType = 'gothic') {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    // Royal triumphant arpeggio sequence
    const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99]; // C Major
    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const noteTime = t + idx * 0.12;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = winningArmy === 'roman' || winningArmy === 'crusader' ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.3, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.65);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(noteTime);
      osc.stop(noteTime + 0.7);
    });
  }

  private playMetalClash(startTime: number, startFreq: number, endFreq: number, vol: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(startFreq, startTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, startTime + 0.18);

    gain.gain.setValueAtTime(vol, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + 0.24);
  }

  private playLowPunch(startTime: number, freq: number, vol: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);
    osc.frequency.exponentialRampToValueAtTime(30, startTime + 0.32);

    gain.gain.setValueAtTime(vol, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + 0.38);
  }

  private playBellTone(startTime: number, freq: number, vol: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(vol, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.75);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + 0.8);
  }

  private createNoiseBuffer(duration: number): AudioBuffer {
    if (!this.ctx) throw new Error('AudioContext not ready');
    const sampleRate = this.ctx.sampleRate;
    const frameCount = Math.floor(sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, frameCount, sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < frameCount; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }
}

export const chessAudio = new ChessAudioSynthesizer();
