import React, { useState, useRef } from 'react';
import { Compass, MapPin } from 'lucide-react';
import { audioEngine } from './AudioEngine';

interface ArtistRenditionCanvasProps {
  fighterId: string;
  name: string;
  country: string;
  year: number;
  faction: 'allied' | 'axis';
  posterUrl: string;
}

export default function ArtistRenditionCanvas({
  fighterId,
  name,
  country,
  year,
  faction,
  posterUrl
}: ArtistRenditionCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [enginePower, setEnginePower] = useState<'idle' | 'cruise' | 'combat'>('cruise');

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setParallax({ x, y });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Get airfield and squadron details based on fighter ID
  const getAirfieldDetails = () => {
    switch (fighterId) {
      case 'p51-mustang':
        return {
          airfield: 'Ramitelli Airfield',
          location: 'Foggia, Southern Italy',
          squadron: '332nd Fighter Group "Red Tails"',
          description: 'A makeshift steel-plate runway laid over farmland at sunset.',
          accentColor: '#ef4444',
          bgImage: 'images/airfield_ramitelli.jpg'
        };
      case 'spitfire-mkix':
        return {
          airfield: 'RAF Tangmere',
          location: 'West Sussex, England',
          squadron: 'No. 111 Squadron RAF',
          description: 'Grass taxiways, brick hangars under high overcast British skies.',
          accentColor: '#3b82f6',
          bgImage: 'images/airfield_tangmere.jpg'
        };
      case 'p38-lightning':
        return {
          airfield: 'Dobodura Airfield',
          location: 'Oro Province, New Guinea',
          squadron: '49th Fighter Group "Marge"',
          description: 'Lush tropical palm tree lines with mist rising over mountain ridges.',
          accentColor: '#f59e0b',
          bgImage: 'images/airfield_dobodura.jpg'
        };
      case 'f6f-hellcat':
        return {
          airfield: 'USS Essex (CV-9) Flight Deck',
          location: 'Philippine Sea, Pacific',
          squadron: 'VF-27 "Snarling Cats"',
          description: 'Wooden flight deck sailing through choppy navy-blue waters.',
          accentColor: '#1d4ed8',
          bgImage: 'images/airfield_essex.jpg'
        };
      case 'p47-thunderbolt':
        return {
          airfield: 'RAF Halesworth',
          location: 'Suffolk, England',
          squadron: '56th Fighter Group "Wolfpack"',
          description: 'Twilight runways, Nissen huts, and early runway spotlight beams.',
          accentColor: '#10b981',
          bgImage: 'images/airfield_halesworth.jpg'
        };
      case 'p40-warhawk':
        return {
          airfield: 'Kunming Airfield',
          location: 'Yunnan Province, China',
          squadron: '1st AVG "Flying Tigers"',
          description: 'Dramatic limestone karst peaks and river gorges of the Yunnan valley.',
          accentColor: '#dc2626',
          bgImage: 'images/airfield_kunming.jpg'
        };
      case 'f8f-bearcat':
        return {
          airfield: 'NAS Jacksonville',
          location: 'Duval County, Florida',
          squadron: 'U.S. Navy Blue Angels (1946)',
          description: 'Clear tropical blue skies, flat sandy coast and concrete runways.',
          accentColor: '#fbbf24',
          bgImage: 'images/airfield_jacksonville.jpg'
        };
      case 'f4u-corsair':
        return {
          airfield: 'Vella Lavella Airfield',
          location: 'Western Province, Solomon Islands',
          squadron: 'VMF-214 "Black Sheep"',
          description: 'Carved coral runway landing strip surrounded by dense Pacific jungle.',
          accentColor: '#4f46e5',
          bgImage: 'images/airfield_vella_lavella.jpg'
        };
      default:
        return {
          airfield: 'Allied Air Base',
          location: 'Tactical Deployment Grid',
          squadron: 'Squadron Escort Unit',
          description: 'Standard operational wartime airbase coordination coordinates.',
          accentColor: '#dfb743',
          bgImage: 'images/airfield_ramitelli.jpg'
        };
    }
  };

  const details = getAirfieldDetails();

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full min-h-[460px] bg-stone-950 rounded-xl overflow-hidden border-2 border-[#3d342a] shadow-inner select-none flex flex-col justify-between p-4"
      id={`artist-canvas-${fighterId}`}
    >
      {/* 1. LAYERED SCENIC ART BACKGROUND WITH PARALLAX (Lightened for better visibility!) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transition-transform duration-300 ease-out">
        {/* Layer A: Airfield Background Picture (Slight parallax) */}
        <div 
          className="absolute inset-0 w-[110%] h-[110%] -left-[5%] -top-[5%] transition-transform duration-200 ease-out bg-cover bg-center bg-no-repeat"
          style={{
            transform: `translate3d(${parallax.x * -6}px, ${parallax.y * -6}px, 0)`,
            backgroundImage: `url(${details.bgImage})`,
            filter: 'brightness(0.75) contrast(1.1) saturate(1.15)' // Lightened background picture!
          }}
        />
        {/* Soft overlay gradient to ensure HUD text remains perfectly readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/45 via-transparent to-stone-950/60" />
      </div>

      {/* 2. PHOTOREALISTIC AIRCRAFT ART LAYER (With smooth parallax translation) */}
      <div 
        className="absolute inset-0 z-10 overflow-hidden pointer-events-none transition-transform duration-300 ease-out flex items-center justify-center"
        style={{
          transform: `translate3d(${parallax.x * 12}px, ${parallax.y * 12}px, 0)`,
        }}
      >
        {posterUrl ? (
          <img 
            src={posterUrl} 
            alt={`${name} Photorealistic Art`}
            className="w-[82%] h-[82%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] brightness-[1.05] contrast-[1.03] transition-all"
          />
        ) : (
          <div className="font-mono text-[10px] text-stone-500 bg-stone-950/40 p-4 border border-stone-900 rounded">
            NO ARTWORK AVAILABLE
          </div>
        )}
      </div>

      {/* 3. RETRO HUD TARGETING SIGHT OVERLAY */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${parallax.x * 24}px, ${parallax.y * 24}px, 0)`,
        }}
      >
        {/* HUD Crosshairs in center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border border-diesel-brass/20 rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-diesel-crimson/45" />
          <div className="absolute top-0 bottom-0 left-1/2 w-[0.5px] bg-diesel-brass/15" />
          <div className="absolute left-0 right-0 top-1/2 h-[0.5px] bg-diesel-brass/15" />
          <div className="absolute top-4 bottom-4 left-1/2 w-6 border-l border-r border-diesel-brass/10" />
        </div>
      </div>

      {/* 4. UPPER DECLASSIFIED HEADER INFO METADATA BLOCK (Dropped down 1 inch / top-16 for clearance) */}
      <div className="absolute top-16 left-4 right-4 z-30 pointer-events-none flex justify-between items-start font-mono text-[9px] text-stone-300 bg-stone-950/85 p-2.5 rounded-lg border border-stone-800/50 backdrop-blur-sm shadow-md">
        <div className="flex flex-col gap-1 pointer-events-auto">
          <div className="flex items-center gap-1.5 text-diesel-brass font-bold uppercase tracking-widest font-stencil text-[10px]">
            <Compass className="w-3.5 h-3.5 text-diesel-brass animate-spin-slow" />
            PHOTOREALISTIC COMBAT FEED
          </div>
          <div className="text-stone-400">
            AIRFRAME: <strong className="text-stone-200">{name}</strong> ({year}) • {country.toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 text-right pointer-events-auto">
          <div className="text-stone-400 flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5 text-diesel-crimson" />
            STATION: <strong className="text-[#eed095]">{details.airfield}</strong>
          </div>
          <div className="text-[8px] text-stone-500 font-bold">
            {details.location.toUpperCase()}
          </div>
        </div>
      </div>

      {/* 5. INTERACTIVE LOWER CONTROL STRIP (Pointer events none on parent, auto on panels) */}
      <div className="absolute bottom-4 left-4 right-4 z-30 pointer-events-none flex flex-col sm:flex-row justify-between items-stretch gap-3">
        {/* Squadron details text plate */}
        <div className="bg-stone-950/90 border border-[#4a3e31] p-3 rounded-lg flex-1 shadow-2xl backdrop-blur-md pointer-events-auto">
          <div className="font-mono text-[10px]">
            <span className="text-diesel-brass font-bold uppercase tracking-wider block font-stencil">
              🛡️ {details.squadron}
            </span>
            <p className="text-[9.5px] text-stone-300 mt-1 leading-normal font-sans">
              {details.description} Declassified high-fidelity photographical capture of the <strong className="text-[#eed095]">{name}</strong> on frontline patrol.
            </p>
          </div>
        </div>

        {/* Engine RPM control switches */}
        <div className="bg-slate-950/95 border border-white/10 p-2.5 rounded-lg flex flex-col gap-1.5 shrink-0 shadow-lg font-mono pointer-events-auto justify-center">
          <span className="text-[8px] text-[#dfb743] font-bold uppercase tracking-wider text-center">Engine Throttle Panel</span>
          <div className="flex gap-1">
            {(['idle', 'cruise', 'combat'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  audioEngine.playClick();
                  setEnginePower(mode);
                  audioEngine.setEngineSpeed(mode);
                }}
                className={`px-2.5 py-1 rounded text-[8px] font-bold uppercase transition-all cursor-pointer ${
                  enginePower === mode
                    ? 'bg-[#dfb743] text-slate-950 font-bold'
                    : 'bg-white/5 hover:bg-white/10 text-slate-400'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Engine Sound Toggle Switch */}
          <button
            onClick={() => {
              audioEngine.playClick();
              if (audioEngine.isRunning) {
                audioEngine.stop();
              } else {
                const isTwin = (name.includes('P-38') || name.includes('Lightning') || name.includes('Corsair') || name.includes('P-47') || name.includes('Hellcat') || name.includes('Twin') || fighterId.includes('p38') || fighterId.includes('p47') || fighterId.includes('corsair') || fighterId.includes('hellcat'));
                audioEngine.setEngineType(isTwin ? 'twin' : 'single');
                audioEngine.setEngineSpeed(enginePower);
                audioEngine.start();
              }
            }}
            className={`mt-1.5 w-full py-1.5 px-2 rounded text-[8px] font-bold uppercase transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-white/5 ${
              audioEngine.isRunning
                ? 'bg-red-950/80 text-red-400 border-red-800 shadow-[inset_0_0_10px_rgba(239,68,68,0.2)]'
                : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${audioEngine.isRunning ? 'bg-red-500 animate-pulse' : 'bg-slate-700'}`} />
            {audioEngine.isRunning ? 'SHUTDOWN ENGINE' : 'START ENGINE'}
          </button>
        </div>
      </div>
    </div>
  );
}
