/**
 * Audio Manager: handles both custom background audio and built-in procedural
 * ambient romantic music box synth via Web Audio API, plus interactive SFX!
 */

class RomanticAudioManager {
  constructor() {
    this.audioContext = null;
    this.customAudio = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.ambientInterval = null;
    this.subBassNode = null;
    this.masterGain = null;
    this.currentTrackTitle = "Romantic Ambient Piano";
    this.listeners = new Set();
  }

  initContext() {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
        this.masterGain = this.audioContext.createGain();
        this.masterGain.gain.setValueAtTime(0.35, this.audioContext.currentTime);
        this.masterGain.connect(this.audioContext.destination);
      }
    }
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) =>
      listener({
        isPlaying: this.isPlaying,
        isMuted: this.isMuted,
        title: this.currentTrackTitle,
      })
    );
  }

  setup(audioSrc, title = "A Soft Melody for You ♡") {
    this.currentTrackTitle = title;
    if (audioSrc && audioSrc.trim() !== "") {
      if (this.customAudio) {
        this.customAudio.pause();
      }
      this.customAudio = new Audio(audioSrc);
      this.customAudio.loop = true;
      this.customAudio.volume = this.isMuted ? 0 : 0.45;
      this.customAudio.addEventListener('ended', () => {
        this.isPlaying = false;
        this.notify();
      });
    }
  }

  async play() {
    this.initContext();
    this.isPlaying = true;
    this.notify();

    if (this.customAudio) {
      try {
        await this.customAudio.play();
        return;
      } catch (err) {
        console.warn("Could not play custom audio, falling back to ambient synth:", err);
      }
    }

    // Procedural ambient music fallback
    this.startAmbientSynth();
  }

  pause() {
    this.isPlaying = false;
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.stopAmbientSynth();
    this.notify();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.customAudio) {
      this.customAudio.volume = this.isMuted ? 0 : 0.45;
    }
    if (this.masterGain && this.audioContext) {
      this.masterGain.gain.setTargetAtTime(
        this.isMuted ? 0 : 0.35,
        this.audioContext.currentTime,
        0.05
      );
    }
    this.notify();
  }

  // ── Procedural Romantic Ambient Synth ─────────────────────────────────
  startAmbientSynth() {
    this.stopAmbientSynth();
    if (!this.audioContext || !this.masterGain) return;

    // Peaceful Romantic Pentatonic notes (Hz)
    // D major / B minor pentatonic: D4, E4, F#4, A4, B4, D5, E5, F#5, A5
    const notes = [293.66, 329.63, 369.99, 440.00, 493.88, 587.33, 659.25, 739.99, 880.00];
    const chords = [
      [293.66, 369.99, 440.00], // D major
      [246.94, 293.66, 369.99, 440.00], // Bm7
      [196.00, 246.94, 293.66, 369.99], // Gmaj7
      [220.00, 277.18, 329.63, 440.00], // A
    ];

    let chordIdx = 0;
    let step = 0;

    const playNextNote = () => {
      if (!this.isPlaying || !this.audioContext) return;

      const now = this.audioContext.currentTime;
      const currentChord = chords[chordIdx];

      // Play soft pad chord note
      if (step % 4 === 0) {
        currentChord.forEach((freq) => {
          this.triggerSoftNote(freq * 0.5, 3.5, 0.04, "sine");
        });
        chordIdx = (chordIdx + 1) % chords.length;
      }

      // Play sparkling arpeggiated music box chime
      const noteFreq = notes[Math.floor(Math.random() * notes.length)];
      this.triggerSoftNote(noteFreq, 2.0, 0.08, "triangle");

      // Occasional sparkling higher chime
      if (Math.random() > 0.4) {
        setTimeout(() => {
          if (this.isPlaying) {
            const highFreq = notes[Math.floor(Math.random() * notes.length)] * 1.5;
            this.triggerSoftNote(highFreq, 1.8, 0.05, "sine");
          }
        }, 350 + Math.random() * 200);
      }

      step++;
    };

    // Play immediately, then every ~1200ms
    playNextNote();
    this.ambientInterval = setInterval(playNextNote, 1400);
  }

  triggerSoftNote(freq, duration = 2.0, maxVol = 0.08, type = "sine") {
    if (!this.audioContext || !this.masterGain || this.isMuted) return;

    try {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);

      gain.gain.setValueAtTime(0, this.audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(maxVol, this.audioContext.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.audioContext.currentTime + duration);
    } catch {
      // Audio context might be closing
    }
  }

  stopAmbientSynth() {
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
  }

  // ── Sound Effects ─────────────────────────────────────────────────────
  playChime() {
    this.initContext();
    if (!this.audioContext || this.isMuted) return;
    const freqs = [587.33, 739.99, 880.00, 1174.66];
    freqs.forEach((f, i) => {
      setTimeout(() => {
        this.triggerSoftNote(f, 1.5, 0.1, "sine");
      }, i * 80);
    });
  }

  playEnvelopeRustle() {
    this.initContext();
    if (!this.audioContext || this.isMuted) return;
    this.playChime();
    // Low whoosh
    this.triggerSoftNote(220, 0.8, 0.05, "sine");
  }

  playBlowCandles() {
    this.initContext();
    if (!this.audioContext || this.isMuted) return;
    // Gentle gentle noise sweep
    try {
      const freqs = [880, 1046.5, 1318.5, 1760];
      freqs.forEach((f, i) => {
        setTimeout(() => {
          this.triggerSoftNote(f, 1.8, 0.12, "triangle");
        }, i * 100);
      });
    } catch {
      // Silent fail
    }
  }

  playGiftOpen() {
    this.initContext();
    if (!this.audioContext || this.isMuted) return;
    const freqs = [440, 554.37, 659.25, 880, 1108.7];
    freqs.forEach((f, i) => {
      setTimeout(() => {
        this.triggerSoftNote(f, 2.0, 0.14, "sine");
      }, i * 70);
    });
  }
}

export const audioManager = new RomanticAudioManager();
