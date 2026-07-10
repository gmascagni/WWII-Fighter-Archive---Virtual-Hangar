/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class DieselpunkAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  
  // Engine components
  private engineOsc1: OscillatorNode | null = null;
  private engineOsc2: OscillatorNode | null = null;
  private engineFilter: BiquadFilterNode | null = null;
  private engineLfo: OscillatorNode | null = null;
  private engineLfoGain: GainNode | null = null;
  private engineGain: GainNode | null = null;

  // Radio static components
  private staticGain: GainNode | null = null;
  private staticBufferSource: AudioBufferSourceNode | null = null;

  // Morse telegraph components
  private morseInterval: number | null = null;

  public isRunning: boolean = false;
  private engineType: 'single' | 'twin' = 'single';
  private masterVol: number = 0.25;

  constructor() {
    // Pre-warm Speech Synthesis voices asynchronously
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }

  private initContext() {
    if (this.ctx) return;
    
    // Create audio context
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    this.ctx = new AudioContextClass();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.masterVol, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  public start() {
    this.initContext();
    if (!this.ctx || this.isRunning) return;

    // Resume if suspended
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isRunning = true;
    this.startEngine();
    this.startRadioStatic();
    this.startMorseTelegraph();
  }

  public stop() {
    if (!this.isRunning) return;
    this.isRunning = false;

    this.stopEngine();
    this.stopRadioStatic();
    this.stopMorseTelegraph();
  }

  public setVolume(val: number) {
    this.masterVol = val;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(val, this.ctx.currentTime + 0.1);
    }
  }

  private engineSpeed: 'idle' | 'cruise' | 'combat' = 'cruise';

  public setEngineSpeed(speed: 'idle' | 'cruise' | 'combat') {
    this.engineSpeed = speed;
    if (this.ctx && this.isRunning && this.engineOsc1 && this.engineOsc2 && this.engineLfo) {
      const t = this.ctx.currentTime;
      let baseFreq = this.engineType === 'single' ? 45 : 40;
      let lfoFreq = 6.5;
      
      if (speed === 'idle') {
        baseFreq = this.engineType === 'single' ? 28 : 24;
        lfoFreq = 3.8;
      } else if (speed === 'combat') {
        baseFreq = this.engineType === 'single' ? 65 : 58;
        lfoFreq = 11.0;
      }

      this.engineOsc1.frequency.exponentialRampToValueAtTime(baseFreq, t + 0.6);
      this.engineOsc2.frequency.exponentialRampToValueAtTime(baseFreq + (this.engineType === 'single' ? 0.4 : 0.6), t + 0.6);
      this.engineLfo.frequency.exponentialRampToValueAtTime(lfoFreq, t + 0.6);
    }
  }

  public setEngineType(type: 'single' | 'twin') {
    this.engineType = type;
    if (this.isRunning) {
      // Re-initialize engine nodes to change frequency characteristics
      this.stopEngine();
      this.startEngine();
    }
  }

  private startEngine() {
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;

    let baseFreq = this.engineType === 'single' ? 45 : 40;
    let lfoFreq = 6.5;
    if (this.engineSpeed === 'idle') {
      baseFreq = this.engineType === 'single' ? 28 : 24;
      lfoFreq = 3.8;
    } else if (this.engineSpeed === 'combat') {
      baseFreq = this.engineType === 'single' ? 65 : 58;
      lfoFreq = 11.0;
    }

    // Create Oscillators (sawtooth makes a great throbbing mechanical sound)
    this.engineOsc1 = this.ctx.createOscillator();
    this.engineOsc1.type = 'sawtooth';
    this.engineOsc1.frequency.setValueAtTime(baseFreq, t);

    this.engineOsc2 = this.ctx.createOscillator();
    this.engineOsc2.type = 'triangle';
    this.engineOsc2.frequency.setValueAtTime(baseFreq + (this.engineType === 'single' ? 0.4 : 0.6), t);

    // Filter to sweep out harsh high frequencies, giving us a deep metallic drone
    this.engineFilter = this.ctx.createBiquadFilter();
    this.engineFilter.type = 'lowpass';
    this.engineFilter.frequency.setValueAtTime(140, t);
    this.engineFilter.Q.setValueAtTime(4, t);

    // Volume controllers
    this.engineGain = this.ctx.createGain();
    this.engineGain.gain.setValueAtTime(0.4, t);

    // LFO (Low Frequency Oscillator) to modulate filter frequency to simulate pistons and propeller revolutions
    this.engineLfo = this.ctx.createOscillator();
    this.engineLfo.frequency.setValueAtTime(lfoFreq, t);

    this.engineLfoGain = this.ctx.createGain();
    this.engineLfoGain.gain.setValueAtTime(25, t); // Depth of filter sweeps

    // Connect LFO to modulate the filter cutoff
    this.engineLfo.connect(this.engineLfoGain);
    if (this.engineFilter.frequency) {
      this.engineLfoGain.connect(this.engineFilter.frequency);
    }

    // Main Audio Routing: Oscs -> Filter -> Gain -> Master
    this.engineOsc1.connect(this.engineFilter);
    this.engineOsc2.connect(this.engineFilter);
    this.engineFilter.connect(this.engineGain);
    this.engineGain.connect(this.masterGain);

    // Start everything
    this.engineOsc1.start(t);
    this.engineOsc2.start(t);
    this.engineLfo.start(t);
  }

  private stopEngine() {
    try {
      this.engineOsc1?.stop();
      this.engineOsc2?.stop();
      this.engineLfo?.stop();
    } catch (e) {
      // already stopped or not started
    }
    this.engineOsc1 = null;
    this.engineOsc2 = null;
    this.engineLfo = null;
    this.engineFilter = null;
    this.engineLfoGain = null;
    this.engineGain = null;
  }

  private startRadioStatic() {
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    
    // Generate 1.5 seconds of random noise
    const bufferSize = this.ctx.sampleRate * 1.5;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    // Set buffer source to loop
    this.staticBufferSource = this.ctx.createBufferSource();
    this.staticBufferSource.buffer = noiseBuffer;
    this.staticBufferSource.loop = true;

    // Filter to make static sound narrow and retro (high-pass + low-pass)
    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(1200, t); // radio bandwidth centering
    bandpass.Q.setValueAtTime(1.5, t);

    this.staticGain = this.ctx.createGain();
    this.staticGain.gain.setValueAtTime(0.015, t); // Keep it subtle and crackly in background

    // Route: Noise -> Bandpass -> StaticGain -> Master
    this.staticBufferSource.connect(bandpass);
    bandpass.connect(this.staticGain);
    this.staticGain.connect(this.masterGain);

    this.staticBufferSource.start(t);
  }

  private stopRadioStatic() {
    try {
      this.staticBufferSource?.stop();
    } catch (e) {}
    this.staticBufferSource = null;
    this.staticGain = null;
  }

  private startMorseTelegraph() {
    if (this.morseInterval) return;

    // Trigger occasional retro Morse blips
    this.morseInterval = window.setInterval(() => {
      if (!this.ctx || !this.masterGain || Math.random() > 0.4) return;
      this.playMorseLetter();
    }, 12000); // Check every 12 seconds
  }

  private stopMorseTelegraph() {
    if (this.morseInterval) {
      clearInterval(this.morseInterval);
      this.morseInterval = null;
    }
  }

  private playMorseLetter() {
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    // Standard morse letter duration
    const dotDuration = 0.08;
    const dashDuration = 0.24;
    const elementSpacing = 0.08;

    // Generate random short morse letters (e.g. S.O.S or airbase callsigns)
    // We'll play a random sequence of 3-4 elements
    const elements = Math.random() > 0.5 ? [dotDuration, dotDuration, dotDuration] : [dashDuration, dotDuration, dashDuration];
    
    let timeOffset = 0;

    elements.forEach((duration) => {
      if (!this.ctx || !this.masterGain) return;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(850, t + timeOffset); // clear vintage Morse tone
      
      // Envelope
      gain.gain.setValueAtTime(0, t + timeOffset);
      gain.gain.linearRampToValueAtTime(0.02, t + timeOffset + 0.01);
      gain.gain.setValueAtTime(0.02, t + timeOffset + duration - 0.01);
      gain.gain.linearRampToValueAtTime(0, t + timeOffset + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + timeOffset);
      osc.stop(t + timeOffset + duration);

      timeOffset += duration + elementSpacing;
    });
  }

  // Play a retro click sound on dial change
  public playClick() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(10, t + 0.05);

    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.06);
  }

  // Synthesize a fast, Doppler-shifted aircraft engine flyby sweeping past
  public playFighterFlyby() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;
    
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    
    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';
    
    // Frequency sweep (Doppler shift: high frequency falling to low frequency)
    osc1.frequency.setValueAtTime(130, t);
    osc1.frequency.exponentialRampToValueAtTime(175, t + 0.7);
    osc1.frequency.exponentialRampToValueAtTime(32, t + 2.4);
    
    osc2.frequency.setValueAtTime(131.5, t);
    osc2.frequency.exponentialRampToValueAtTime(177.2, t + 0.7);
    osc2.frequency.exponentialRampToValueAtTime(32.5, t + 2.4);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(160, t);
    filter.frequency.exponentialRampToValueAtTime(500, t + 0.7);
    filter.frequency.exponentialRampToValueAtTime(90, t + 2.4);
    filter.Q.setValueAtTime(4.5, t);
    
    // Volume envelope (fading in -> roaring loud at the pass -> fading out)
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.exponentialRampToValueAtTime(0.38, t + 0.7);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 2.4);
    
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    
    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 2.5);
    osc2.stop(t + 2.5);
  }

  // Synthesize rapid-fire machine gun nose-art cannon bursts
  public playMachineGunBurst() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;
    
    const duration = 1.0; // 1 second firing burst
    const shotInterval = 0.095; // rapid rate of fire
    const totalShots = Math.floor(duration / shotInterval);
    
    // Generate static noise buffer once to reuse
    const bufferSize = this.ctx.sampleRate * 0.12;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let j = 0; j < bufferSize; j++) {
      data[j] = Math.random() * 2 - 1;
    }
    
    for (let i = 0; i < totalShots; i++) {
      const shotTime = t + (i * shotInterval);
      
      const noiseNode = this.ctx.createBufferSource();
      const noiseFilter = this.ctx.createBiquadFilter();
      const noiseGain = this.ctx.createGain();
      
      noiseNode.buffer = noiseBuffer;
      
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(900, shotTime);
      noiseFilter.frequency.exponentialRampToValueAtTime(180, shotTime + 0.08);
      noiseFilter.Q.setValueAtTime(2.5, shotTime);
      
      noiseGain.gain.setValueAtTime(0.28, shotTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, shotTime + 0.09);
      
      noiseNode.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);
      
      // Metallic heavy piston action thud
      const thudOsc = this.ctx.createOscillator();
      const thudGain = this.ctx.createGain();
      
      thudOsc.type = 'triangle';
      thudOsc.frequency.setValueAtTime(85, shotTime);
      thudOsc.frequency.exponentialRampToValueAtTime(10, shotTime + 0.05);
      
      thudGain.gain.setValueAtTime(0.22, shotTime);
      thudGain.gain.exponentialRampToValueAtTime(0.001, shotTime + 0.06);
      
      thudOsc.connect(thudGain);
      thudGain.connect(this.masterGain);
      
      noiseNode.start(shotTime);
      noiseNode.stop(shotTime + 0.1);
      thudOsc.start(shotTime);
      thudOsc.stop(shotTime + 0.07);
    }
  }

  // Speak with 1940's vintage radio filter (chirps, static, hum)
  public speakVintageRadio(text: string, onStart?: () => void, onEnd?: () => void) {
    this.initContext();
    
    if (!this.ctx || !this.masterGain) {
      // Web Speech API fallback without filters
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const fallbackUtt = new SpeechSynthesisUtterance(text);
        if (onStart) fallbackUtt.onstart = () => onStart();
        if (onEnd) {
          fallbackUtt.onend = () => onEnd();
          fallbackUtt.onerror = () => onEnd();
        }
        window.speechSynthesis.speak(fallbackUtt);
      }
      return;
    }

    const t = this.ctx.currentTime;

    // 1. Cancel ongoing speech
    this.cancelSpeech();

    // 2. Synthesize Mic Key-In chirp beeps
    const chirp = this.ctx.createOscillator();
    const chirpGain = this.ctx.createGain();
    chirp.type = 'sine';
    chirp.frequency.setValueAtTime(1050, t);
    chirp.frequency.exponentialRampToValueAtTime(1100, t + 0.1);
    
    chirpGain.gain.setValueAtTime(0.05, t);
    chirpGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    
    chirp.connect(chirpGain);
    chirpGain.connect(this.masterGain);
    chirp.start(t);
    chirp.stop(t + 0.11);

    // 3. Play louder static squelch initial burst
    const burstSource = this.ctx.createBufferSource();
    const burstGain = this.ctx.createGain();
    const bufferSize = this.ctx.sampleRate * 0.15;
    const burstBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const channelData = burstBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      channelData[i] = Math.random() * 2 - 1;
    }
    burstSource.buffer = burstBuffer;
    
    const burstFilter = this.ctx.createBiquadFilter();
    burstFilter.type = 'bandpass';
    burstFilter.frequency.setValueAtTime(1100, t);
    burstFilter.Q.setValueAtTime(1.5, t);

    burstGain.gain.setValueAtTime(0.07, t);
    burstGain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

    burstSource.connect(burstFilter);
    burstFilter.connect(burstGain);
    burstGain.connect(this.masterGain);
    burstSource.start(t);
    burstSource.stop(t + 0.15);

    // 4. sustained radio transmission hum and crackle
    const humOsc = this.ctx.createOscillator();
    const humGain = this.ctx.createGain();
    humOsc.type = 'triangle';
    humOsc.frequency.setValueAtTime(110, t); // 110Hz background hum
    humGain.gain.setValueAtTime(0.012, t);
    humOsc.connect(humGain);
    humGain.connect(this.masterGain);
    humOsc.start(t);

    const crackleSize = this.ctx.sampleRate * 2.0;
    const crackleBuffer = this.ctx.createBuffer(1, crackleSize, this.ctx.sampleRate);
    const crackleData = crackleBuffer.getChannelData(0);
    for (let i = 0; i < crackleSize; i++) {
      crackleData[i] = (Math.random() * 2 - 1) * 0.18;
    }
    const crackleSource = this.ctx.createBufferSource();
    crackleSource.buffer = crackleBuffer;
    crackleSource.loop = true;
    
    const crackleFilter = this.ctx.createBiquadFilter();
    crackleFilter.type = 'bandpass';
    crackleFilter.frequency.setValueAtTime(1350, t);
    crackleFilter.Q.setValueAtTime(2.0, t);

    const crackleGain = this.ctx.createGain();
    crackleGain.gain.setValueAtTime(0.015, t);

    crackleSource.connect(crackleFilter);
    crackleFilter.connect(crackleGain);
    crackleGain.connect(this.masterGain);
    crackleSource.start(t);

    let active = true;
    const releaseRadioTrans = () => {
      if (!active) return;
      active = false;
      try {
        humOsc.stop();
        crackleSource.stop();
      } catch (e) {}

      // Mic key-out mechanical release and hiss burst
      if (this.ctx && this.masterGain) {
        const outT = this.ctx.currentTime;
        
        const clunk = this.ctx.createOscillator();
        const clunkG = this.ctx.createGain();
        clunk.type = 'sine';
        clunk.frequency.setValueAtTime(85, outT);
        clunk.frequency.linearRampToValueAtTime(15, outT + 0.08);
        clunkG.gain.setValueAtTime(0.04, outT);
        clunkG.gain.exponentialRampToValueAtTime(0.001, outT + 0.08);
        clunk.connect(clunkG);
        clunkG.connect(this.masterGain);
        clunk.start(outT);
        clunk.stop(outT + 0.09);

        const hiss = this.ctx.createBufferSource();
        const hissG = this.ctx.createGain();
        hiss.buffer = burstBuffer;
        hissG.gain.setValueAtTime(0.05, outT);
        hissG.gain.exponentialRampToValueAtTime(0.001, outT + 0.11);
        hiss.connect(crackleFilter);
        crackleFilter.connect(hissG);
        hissG.connect(this.masterGain);
        hiss.start(outT);
        hiss.stop(outT + 0.12);
      }
      if (onEnd) onEnd();
    };

    // 5. Invoke Speech Synthesis
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      
      const voices = window.speechSynthesis.getVoices();
      const enVoices = voices.filter(v => v.lang.toLowerCase().startsWith('en'));
      
      // Prioritize natural/neural online English female voices for high-quality human speech
      const preferredFemale = enVoices.find(v => {
        const name = v.name.toLowerCase();
        const isNatural = name.includes('natural') || name.includes('neural') || name.includes('online') || name.includes('wavenet') || name.includes('google');
        const isFemale = name.includes('female') || name.includes('samantha') || name.includes('zira') || name.includes('karen') || name.includes('aria') || name.includes('jenny') || name.includes('michelle') || name.includes('hazel') || name.includes('google us english') || name.includes('victoria') || name.includes('moira');
        return isNatural && isFemale;
      }) || enVoices.find(v => {
        const name = v.name.toLowerCase();
        return name.includes('female') || name.includes('samantha') || name.includes('zira') || name.includes('karen') || name.includes('aria') || name.includes('jenny') || name.includes('hazel') || name.includes('google us english') || name.includes('victoria') || name.includes('moira') || name.includes('michelle');
      }) || enVoices.find(v => {
        const name = v.name.toLowerCase();
        return name.includes('natural') || name.includes('neural') || name.includes('online');
      }) || enVoices[0] || voices[0];

      if (preferredFemale) {
        utterance.voice = preferredFemale;
      }
      
      // Formal slow 1940s tempo
      utterance.rate = 0.88;
      utterance.pitch = 1.05;

      utterance.onstart = () => {
        if (onStart) onStart();
      };

      utterance.onend = () => {
        releaseRadioTrans();
      };

      utterance.onerror = () => {
        releaseRadioTrans();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Visual simulation fallback
      setTimeout(() => {
        releaseRadioTrans();
      }, 3500);
    }
  }

  // Cancel any active SpeechSynthesis transmissions
  public cancelSpeech() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }
}

// Singleton export
export const audioEngine = new DieselpunkAudioEngine();
