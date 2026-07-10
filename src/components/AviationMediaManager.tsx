import React, { useState, useRef } from 'react';
import { Upload, Link, AlertTriangle, RefreshCw, CheckCircle, Sliders, Radio, Volume2, VolumeX, Flame, Zap } from 'lucide-react';
import { FighterAircraft } from '../types';
import ConflictTimeline from './ConflictTimeline';
import TheaterMap from './TheaterMap';
import { audioEngine } from './AudioEngine';

interface AviationMediaManagerProps {
  focusedFighter: FighterAircraft;
  onUpdateFighterImages: (fighterId: string, updates: { posterUrl?: string; noseArtUrl?: string; cockpitUrl?: string }) => void;
  onResetFighterImages: (fighterId: string) => void;
}

export default function AviationMediaManager({
  focusedFighter,
  onUpdateFighterImages,
  onResetFighterImages
}: AviationMediaManagerProps) {
  const [dragActive, setDragActive] = useState<Record<string, boolean>>({});
  const [urlInputs, setUrlInputs] = useState({
    poster: '',
    noseArt: '',
    cockpit: ''
  });
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [spokenText, setSpokenText] = useState<string>('');

  // Cancel any ongoing voice announcements when plane selection changes
  React.useEffect(() => {
    audioEngine.cancelSpeech();
    setIsSpeaking(false);
    return () => {
      audioEngine.cancelSpeech();
    };
  }, [focusedFighter]);

  const triggerBriefing = () => {
    if (isSpeaking) {
      audioEngine.cancelSpeech();
      setIsSpeaking(false);
      return;
    }

    const name = focusedFighter.name;
    const country = focusedFighter.country;
    const speed = focusedFighter.specs.maxSpeed;
    const engine = focusedFighter.specs.engine;
    const arm = focusedFighter.specs.armament;
    const desc = focusedFighter.description.split('.')[0];

    const text = `Attention all squadron commanders, this is Sector Radio Control. Airframe specifications retrieved for the ${name} fighter, origin ${country}. Powered by ${engine}, max airspeed ${speed}, armed with ${arm}. Historical report: ${desc}. Transmission complete. Out.`;
    
    setSpokenText(text);
    setIsSpeaking(true);
    
    audioEngine.speakVintageRadio(
      text,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const fileInputRefs = {
    poster: useRef<HTMLInputElement>(null),
    noseArt: useRef<HTMLInputElement>(null),
    cockpit: useRef<HTMLInputElement>(null)
  };

  const handleDrag = (e: React.DragEvent, type: string, active: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(prev => ({ ...prev, [type]: active }));
  };

  const processFile = (file: File, type: 'poster' | 'noseArt' | 'cockpit') => {
    if (!file.type.startsWith('image/')) {
      alert('Wartime intelligence warning: Uploaded file must be an image format (PNG, JPG, etc.).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      if (base64String) {
        onUpdateFighterImages(focusedFighter.id, {
          [`${type}Url`]: base64String
        });
        triggerNotification(`Custom ${type === 'poster' ? 'recon photo' : type === 'noseArt' ? 'nose art' : 'cockpit'} file successfully loaded!`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent, type: 'poster' | 'noseArt' | 'cockpit') => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(prev => ({ ...prev, [type]: false }));

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0], type);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'poster' | 'noseArt' | 'cockpit') => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0], type);
    }
  };

  const handleUrlSubmit = (type: 'poster' | 'noseArt' | 'cockpit') => {
    const url = urlInputs[type].trim();
    if (!url) return;

    onUpdateFighterImages(focusedFighter.id, {
      [`${type}Url`]: url
    });

    setUrlInputs(prev => ({ ...prev, [type]: '' }));
    triggerNotification(`Custom URL applied to ${type === 'poster' ? 'recon' : type === 'noseArt' ? 'nose art' : 'cockpit'} feed.`);
  };

  const triggerNotification = (message: string) => {
    setShowNotification(message);
    setTimeout(() => {
      setShowNotification(null);
    }, 4000);
  };

  return (
    <div className="flex flex-col gap-6" id="aviation-media-manager-desk">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch" id="aviation-media-desk-grid">
        {/* Media Configuration Desk */}
        <div className="warbird-panel warbird-screws p-5 relative overflow-hidden flex flex-col justify-between" id="aviation-media-panel">
          <div>
            <div className="rivet-row-top" />
            
            {/* Title */}
            <span className="font-stencil text-xs text-diesel-gold tracking-widest uppercase mb-4 block border-b border-stone-800 pb-2 font-bold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-diesel-brass" />
                Aviation Media Control Desk
              </span>
              <button
                onClick={() => {
                  onResetFighterImages(focusedFighter.id);
                  triggerNotification('Restored factory default imagery feed.');
                }}
                className="text-[9px] bg-stone-900 hover:bg-stone-800 border border-[#3d342a] text-[#eed095] px-2 py-1 rounded transition-all uppercase font-stencil flex items-center gap-1 cursor-pointer active:scale-95"
                title="Restore original image links"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                Reset to Factory
              </button>
            </span>

            {/* Warning Briefing */}
            <div className="mb-5 bg-amber-950/20 border border-amber-900/40 rounded p-3 text-[10px] font-mono leading-relaxed text-stone-300 relative z-10 flex gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#eed095] uppercase block mb-1">CORS & Iframe Security Briefing</strong>
                Wartime photos from public archives (like Wikimedia) may fail to load directly inside this sandboxed iframe due to security referrer policies or network blocks. 
                <div className="mt-1.5 font-bold flex flex-col gap-1 text-[9px] text-stone-400">
                  <span>• To resolve, click the <strong className="text-stone-100">"Open in New Tab"</strong> button in the top right of the application frame.</span>
                  <span>• Alternatively, save any image to your desktop and <strong className="text-stone-100">drag and drop</strong> it below for 100% reliable local rendering.</span>
                </div>
              </div>
            </div>

            {/* Media customizer list */}
            <div className="flex flex-col gap-4 relative z-10">
              {(['poster', 'noseArt', 'cockpit'] as const).map((mediaKey) => {
                const title = mediaKey === 'poster' ? 'Recon Airframe Photo' : mediaKey === 'noseArt' ? 'Nose Art Decal' : 'Cockpit Flight Deck';
                const iconType = mediaKey === 'poster' ? 'aircraft' : mediaKey;
                
                return (
                  <div key={mediaKey} className="border border-stone-900/80 bg-stone-950/60 rounded p-3 font-mono text-[11px]">
                    <span className="text-[#eed095] font-stencil uppercase tracking-wider block mb-2 text-[10px] font-bold">
                      {title} Configuration
                    </span>
                    
                    {/* Drag & Drop File Upload Area */}
                    <div
                      className={`border-2 border-dashed rounded-lg p-3 text-center transition-all cursor-pointer select-none mb-2 ${
                        dragActive[mediaKey]
                          ? 'border-diesel-brass bg-stone-900/40 text-[#eed095]'
                          : 'border-stone-800/80 bg-stone-950/80 hover:bg-stone-900/10 text-stone-400 hover:text-stone-300'
                      }`}
                      onDragOver={(e) => handleDrag(e, mediaKey, true)}
                      onDragEnter={(e) => handleDrag(e, mediaKey, true)}
                      onDragLeave={(e) => handleDrag(e, mediaKey, false)}
                      onDrop={(e) => handleDrop(e, mediaKey)}
                      onClick={() => fileInputRefs[mediaKey].current?.click()}
                    >
                      <input
                        ref={fileInputRefs[mediaKey]}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, mediaKey)}
                        className="hidden"
                      />
                      <Upload className="w-5 h-5 mx-auto mb-1.5 opacity-60 text-diesel-brass" />
                      <span className="font-bold block text-[10px] uppercase text-stone-300">Drag & Drop Image File</span>
                      <span className="text-[9px] text-stone-500">or click to browse workstation directories</span>
                    </div>

                    {/* Custom URL Input fallback */}
                    <div className="flex gap-1.5">
                      <div className="relative flex-1">
                        <Link className="w-3 h-3 text-stone-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="url"
                          placeholder="Paste direct HTTPS secure URL..."
                          value={urlInputs[mediaKey]}
                          onChange={(e) => setUrlInputs(prev => ({ ...prev, [mediaKey]: e.target.value }))}
                          className="w-full bg-stone-950 border border-[#3d342a] rounded px-2.5 py-1.5 pl-7 text-[10px] text-[#eed095] font-mono focus:outline-none focus:border-diesel-brass placeholder-stone-600"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleUrlSubmit(mediaKey);
                            }
                          }}
                        />
                      </div>
                      <button
                        onClick={() => handleUrlSubmit(mediaKey)}
                        className="bg-stone-900 hover:bg-stone-800 border border-[#3d342a] text-[#eed095] text-[10px] px-3 rounded transition-all uppercase font-stencil cursor-pointer active:scale-95"
                      >
                        Link
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Floating success notifications */}
          {showNotification && (
            <div className="absolute bottom-4 inset-x-4 bg-stone-950 border-2 border-emerald-950 rounded-lg p-2.5 flex items-center gap-2.5 text-stone-200 shadow-2xl z-50 font-mono text-[10px] animate-fade-in">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 animate-bounce" />
              <span className="flex-1 text-emerald-400 font-bold">{showNotification}</span>
            </div>
          )}

          <div className="rivet-row-bottom" />
        </div>

        {/* Historical Conflict Timeline Section */}
        <ConflictTimeline fighterId={focusedFighter.id} fighterName={focusedFighter.name} />
      </div>

      {/* Interactive Flight Deck Acoustic System & Radio Desk */}
      <div className="warbird-panel warbird-screws p-6 relative overflow-hidden" id="flight-deck-audio-system">
        <div className="rivet-row-top" />
        <div className="warbird-plate-joint-h top-12" />
        
        {/* Title */}
        <span className="font-stencil text-xs text-[#eed095] tracking-widest uppercase mb-4 block border-b border-stone-800 pb-2 font-bold flex items-center justify-between relative z-10">
          <span className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-diesel-brass animate-pulse" />
            Wartime Flight Deck Acoustic System & Radio Desk
          </span>
          <span className="font-mono text-[9px] text-stone-500 font-normal">DECLASSIFIED // RESTRICTED AUDIO FEED</span>
        </span>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
          {/* Left Column: Airplane Mechanical Synthesizer */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <h4 className="font-stencil text-xs text-stone-300 tracking-wider uppercase border-b border-stone-800 pb-1 mb-1 font-bold">
              ⚙️ Acoustic Synthesizer Testbed
            </h4>
            <p className="font-mono text-[10px] text-stone-400 leading-normal">
              Directly stimulate the high-frequency airframe and piston dynamics of the <strong className="text-stone-200">{focusedFighter.name}</strong> over the local workstation audio oscillators.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <button
                onClick={() => {
                  audioEngine.playClick();
                  audioEngine.playFighterFlyby();
                }}
                className="bg-stone-900 hover:bg-stone-850 border-2 border-[#3d342a] hover:border-diesel-brass rounded-lg p-3 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 active:scale-95 text-[#eed095]"
                id="btn-doppler-flyby"
              >
                <Zap className="w-5 h-5 text-amber-500" />
                <span className="font-stencil text-[10px] uppercase tracking-wider font-bold">Doppler Flyby</span>
                <span className="font-mono text-[8px] text-stone-500 font-normal leading-tight">High-speed engine sweep</span>
              </button>

              <button
                onClick={() => {
                  audioEngine.playClick();
                  audioEngine.playMachineGunBurst();
                }}
                className="bg-stone-900 hover:bg-stone-850 border-2 border-[#3d342a] hover:border-diesel-brass rounded-lg p-3 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 active:scale-95 text-red-400"
                id="btn-gunfire-burst"
              >
                <Flame className="w-5 h-5 text-red-500 animate-pulse" />
                <span className="font-stencil text-[10px] uppercase tracking-wider font-bold">Nose Gunfire</span>
                <span className="font-mono text-[8px] text-stone-500 font-normal leading-tight">M2 Machine gun burst</span>
              </button>
            </div>
          </div>

          {/* Right Column: 1940s female voice announcer dispatcher radio */}
          <div className="md:col-span-7 flex flex-col gap-3">
            <h4 className="font-stencil text-xs text-stone-300 tracking-wider uppercase border-b border-stone-800 pb-1 mb-1 font-bold">
              📻 WAAF Station X Radio Briefing
            </h4>
            
            <div className="flex items-start gap-4">
              <button
                onClick={triggerBriefing}
                className={`py-3 px-4 rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all shrink-0 cursor-pointer active:scale-95 w-32 ${
                  isSpeaking
                    ? 'bg-red-800 text-red-100 border-red-700 animate-pulse font-bold shadow-[0_0_12px_rgba(185,28,28,0.4)]'
                    : 'bg-stone-900 hover:bg-stone-800 text-[#eed095] border-[#3d342a] hover:border-diesel-brass'
                }`}
                id="btn-start-briefing"
              >
                <Radio className="w-6 h-6" />
                <span className="font-stencil text-[10px] uppercase tracking-wider font-bold text-center">
                  {isSpeaking ? "Mute Radio" : "Start Brief"}
                </span>
                <span className="font-mono text-[8px] opacity-70">1940s Female Voice</span>
              </button>

              <div className="flex-1 font-mono text-[10px] text-stone-400 leading-normal">
                Click the button to tune the receiver to <strong className="text-stone-300">84.5 MHz</strong>. A female 1940s Women's Auxiliary Air Force (WAAF) radio dispatcher will broadcast the declassified specs and combat reports of the active fighter.
              </div>
            </div>

            {/* Glowing vintage receiver readout green monitor */}
            {isSpeaking && (
              <div className="bg-[#09170e] border border-emerald-950/80 rounded-lg p-3 font-mono text-[10px] text-emerald-400 mt-2 relative overflow-hidden shadow-inner select-none animate-pulse" id="voice-decrypt-monitor">
                <div className="absolute inset-0 bg-repeat-y opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(16,185,129,0.3) 50%, transparent 50%)', backgroundSize: '100% 4px' }} />
                <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-emerald-950/40 relative z-10 text-[9px]">
                  <span className="font-bold flex items-center gap-1.5 text-emerald-300 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    DECRYPTION MONITOR IN PROGRESS
                  </span>
                  <span className="text-emerald-500 font-semibold">SIGNAL ACQUIRED // 100%</span>
                </div>
                <p className="leading-relaxed text-emerald-300 font-typewriter italic relative z-10">
                  "{spokenText}"
                </p>
                <div className="flex justify-between items-center mt-2 pt-1 border-t border-emerald-950/30 text-[8px] text-emerald-600 relative z-10 font-bold">
                  <span>STATION CODEX • SEC-845</span>
                  <span>TRANSMITTING...</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="rivet-row-bottom" />
      </div>

      {/* Theater of Operations Interactive Map Section */}
      <TheaterMap fighterId={focusedFighter.id} fighterName={focusedFighter.name} />
    </div>
  );
}
