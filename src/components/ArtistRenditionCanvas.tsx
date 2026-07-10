import React, { useState, useRef } from 'react';
import { Shield, Sparkles, MapPin, Calendar, Compass, RefreshCw, Volume2 } from 'lucide-react';
import { audioEngine } from './AudioEngine';

interface ArtistRenditionCanvasProps {
  fighterId: string;
  name: string;
  country: string;
  year: number;
  faction: 'allied' | 'axis';
}

export default function ArtistRenditionCanvas({
  fighterId,
  name,
  country,
  year,
  faction
}: ArtistRenditionCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [enginePower, setEnginePower] = useState<'idle' | 'cruise' | 'combat'>('cruise');
  const [renderTrigger, setRenderTrigger] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // Range: -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // Range: -0.5 to 0.5
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
          accentColor: '#ef4444'
        };
      case 'spitfire-mkix':
        return {
          airfield: 'RAF Tangmere',
          location: 'West Sussex, England',
          squadron: 'No. 111 Squadron RAF',
          description: 'Grass taxiways, brick hangars under high overcast British skies.',
          accentColor: '#3b82f6'
        };
      case 'p38-lightning':
        return {
          airfield: 'Dobodura Airfield',
          location: 'Oro Province, New Guinea',
          squadron: '49th Fighter Group "Marge"',
          description: 'Lush tropical palm tree lines with mist rising over mountain ridges.',
          accentColor: '#f59e0b'
        };
      case 'f6f-hellcat':
        return {
          airfield: 'USS Essex (CV-9) Flight Deck',
          location: 'Philippine Sea, Pacific',
          squadron: 'VF-27 "Snarling Cats"',
          description: 'Wooden flight deck sailing through choppy navy-blue waters.',
          accentColor: '#1d4ed8'
        };
      case 'p47-thunderbolt':
        return {
          airfield: 'RAF Halesworth',
          location: 'Suffolk, England',
          squadron: '56th Fighter Group "Wolfpack"',
          description: 'Twilight runways, Nissen huts, and early runway spotlight beams.',
          accentColor: '#10b981'
        };
      case 'p40-warhawk':
        return {
          airfield: 'Kunming Airfield',
          location: 'Yunnan Province, China',
          squadron: '1st AVG "Flying Tigers"',
          description: 'Dramatic limestone karst peaks and river gorges of the Yunnan valley.',
          accentColor: '#dc2626'
        };
      case 'f8f-bearcat':
        return {
          airfield: 'NAS Jacksonville',
          location: 'Duval County, Florida',
          squadron: 'U.S. Navy Blue Angels (1946)',
          description: 'Clear tropical blue skies, flat sandy coast and concrete runways.',
          accentColor: '#fbbf24'
        };
      case 'f4u-corsair':
        return {
          airfield: 'Vella Lavella Airfield',
          location: 'Solomon Islands, South Pacific',
          squadron: 'VMF-214 "Black Sheep"',
          description: 'A remote island coral dirt runway carved through dense tropical jungle, surrounded by high coco palms and humid sea breezes.',
          accentColor: '#1d4ed8'
        };
      default:
        return {
          airfield: 'Wartime Airbase X',
          location: 'Secret Location',
          squadron: 'Combined Air Fleet Command',
          description: 'Declassified tactical flight operations sector.',
          accentColor: '#eed095'
        };
    }
  };

  const details = getAirfieldDetails();

  // Propeller speed configuration
  const propAnimDuration = {
    idle: '0.4s',
    cruise: '0.12s',
    combat: '0.04s'
  }[enginePower];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full min-h-[440px] bg-stone-950 rounded-xl overflow-hidden border-2 border-[#3d342a] shadow-inner select-none flex flex-col justify-between p-4"
      id={`artist-canvas-${fighterId}`}
    >
      {/* 1. LAYERED SCENIC ART BACKGROUND WITH PARALLAX */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transition-transform duration-300 ease-out">
        {/* Layer A: Sky and Atmosphere (Slight parallax) */}
        <div 
          className="absolute inset-0 w-[110%] h-[110%] -left-[5%] -top-[5%] transition-transform duration-200 ease-out"
          style={{
            transform: `translate3d(${parallax.x * -8}px, ${parallax.y * -8}px, 0)`,
          }}
        >
          {fighterId === 'p51-mustang' && (
            // Southern Italy golden hour sunset
            <div className="w-full h-full bg-gradient-to-b from-[#1c1c3a] via-[#854d0e] to-[#f97316] opacity-90">
              <div className="absolute top-[10%] left-[20%] w-32 h-32 rounded-full bg-[#fef08a] filter blur-xl opacity-40 animate-pulse" />
              <div className="absolute top-[40%] left-[40%] w-60 h-24 bg-[#fed7aa] filter blur-2xl opacity-20" />
            </div>
          )}
          {fighterId === 'spitfire-mkix' && (
            // English Channel cloudy day
            <div className="w-full h-full bg-gradient-to-b from-[#334155] via-[#64748b] to-[#cbd5e1] opacity-90">
              <div className="absolute top-[20%] left-0 right-0 h-40 bg-[#94a3b8] filter blur-3xl opacity-30" />
            </div>
          )}
          {fighterId === 'p38-lightning' && (
            // Pacific Jungle Dawn / Mist
            <div className="w-full h-full bg-gradient-to-b from-[#134e5e] to-[#71b280] opacity-90">
              <div className="absolute top-[15%] left-[60%] w-24 h-24 rounded-full bg-[#fef08a] filter blur-lg opacity-30" />
            </div>
          )}
          {fighterId === 'f6f-hellcat' && (
            // Philippine Sea deep blue water and ocean sky
            <div className="w-full h-full bg-gradient-to-b from-[#172554] via-[#1e3a8a] to-[#3b82f6] opacity-95">
              <div className="absolute top-[30%] right-[10%] w-44 h-16 bg-white/10 filter blur-2xl" />
            </div>
          )}
          {fighterId === 'p47-thunderbolt' && (
            // twilight English field
            <div className="w-full h-full bg-gradient-to-b from-[#090d16] via-[#1e1b4b] to-[#311042] opacity-95">
              <div className="absolute top-[10%] left-[10%] w-2 h-2 rounded-full bg-white opacity-80" />
              <div className="absolute top-[25%] left-[75%] w-1.5 h-1.5 rounded-full bg-white opacity-40" />
              <div className="absolute top-[15%] left-[85%] w-2 h-2 rounded-full bg-white opacity-60 animate-pulse" />
            </div>
          )}
          {fighterId === 'p40-warhawk' && (
            // Kunming hazy valley green orange
            <div className="w-full h-full bg-gradient-to-b from-[#312e81] via-[#d97706] to-[#fef08a] opacity-90">
              <div className="absolute top-[40%] left-[20%] w-80 h-32 bg-[#ffedd5] filter blur-3xl opacity-25" />
            </div>
          )}
          {fighterId === 'f8f-bearcat' && (
            // Florida bright blue
            <div className="w-full h-full bg-gradient-to-b from-[#0284c7] via-[#38bdf8] to-[#bae6fd] opacity-90">
              <div className="absolute top-[10%] left-[10%] w-60 h-40 bg-white/30 filter blur-3xl rounded-full" />
            </div>
          )}
          {fighterId === 'f4u-corsair' && (
            // Solomon Islands brilliant South Pacific dawn/sunrise
            <div className="w-full h-full bg-gradient-to-b from-[#1e1b4b] via-[#a21caf] to-[#f43f5e] opacity-90">
              <div className="absolute top-[10%] left-[15%] w-24 h-24 rounded-full bg-[#fef08a] filter blur-xl opacity-50 animate-pulse" />
              <div className="absolute top-[35%] left-[25%] w-72 h-16 bg-[#ffd1d1] filter blur-2xl opacity-20" />
            </div>
          )}
        </div>

        {/* Layer B: Far Mountains / Horizon features (Medium parallax) */}
        <div 
          className="absolute inset-0 w-[115%] h-[115%] -left-[7.5%] -top-[7.5%] transition-transform duration-200 ease-out"
          style={{
            transform: `translate3d(${parallax.x * -16}px, ${parallax.y * -16}px, 0)`,
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
            {/* Custom mountain silhouette based on theater */}
            {fighterId === 'p51-mustang' && (
              // Italian Apennine hills far away
              <g fill="#451a03" opacity="0.4">
                <path d="M 0,320 L 120,240 L 250,280 L 410,210 L 590,260 L 720,200 L 800,240 L 800,400 L 0,400 Z" />
                <path d="M 0,330 L 180,260 L 320,310 L 490,230 L 640,280 L 800,220 L 800,400 L 0,400 Z" fill="#290f02" opacity="0.6" />
              </g>
            )}

            {fighterId === 'spitfire-mkix' && (
              // White cliffs / soft rolling downs
              <g fill="#475569" opacity="0.3">
                <path d="M 0,350 Q 150,290 300,310 T 600,280 T 800,310 L 800,400 L 0,400 Z" />
                <path d="M 0,365 Q 100,320 250,330 T 500,310 T 800,335 L 800,400 L 0,400 Z" fill="#334155" opacity="0.5" />
                {/* Chalk Cliff profile */}
                <path d="M 620,340 L 650,280 Q 670,285 710,290 L 720,350 Z" fill="#e2e8f0" opacity="0.35" />
              </g>
            )}

            {fighterId === 'p38-lightning' && (
              // Lush high mountains of New Guinea
              <g fill="#064e3b" opacity="0.45">
                <path d="M 0,340 L 90,200 L 210,280 L 340,160 L 480,260 L 620,180 L 710,240 L 800,190 L 800,400 L 0,400 Z" />
                <path d="M 0,360 L 120,240 L 280,310 L 410,220 L 550,280 L 680,220 L 800,270 L 800,400 L 0,400 Z" fill="#022c22" opacity="0.75" />
              </g>
            )}

            {fighterId === 'f6f-hellcat' && (
              // Waves of the Pacific
              <g fill="#1e3a8a" opacity="0.6">
                <path d="M 0,360 C 100,350 200,370 300,360 C 400,350 500,370 600,360 C 700,350 800,365 800,365 L 800,400 L 0,400 Z" />
                <path d="M 0,375 C 80,370 160,380 240,375 C 320,370 400,380 480,375 C 560,370 640,380 720,375 C 760,372 800,378 800,378 L 800,400 L 0,400 Z" fill="#172554" opacity="0.85" />
              </g>
            )}

            {fighterId === 'p47-thunderbolt' && (
              // Twilight English rural flat horizon
              <g fill="#1e1b4b" opacity="0.4">
                <path d="M 0,370 Q 200,355 400,360 T 800,370 L 800,400 L 0,400 Z" />
                <path d="M 0,380 Q 250,370 500,372 T 800,380 L 800,400 L 0,400 Z" fill="#0f172a" opacity="0.7" />
              </g>
            )}

            {fighterId === 'p40-warhawk' && (
              // Dramatic Karst mountain pillars
              <g fill="#451a03" opacity="0.5">
                <path d="M 50,400 L 80,240 C 90,120 130,120 140,240 L 170,400 Z" />
                <path d="M 280,400 L 310,180 C 320,80 355,80 370,180 L 390,400 Z" />
                <path d="M 580,400 L 610,210 C 620,100 650,100 660,210 L 690,400 Z" />
                {/* Secondary closer layer */}
                <path d="M 0,400 L 20,310 C 30,220 55,220 65,310 L 85,400 M 180,400 L 220,290 C 230,180 260,180 270,290 L 310,400 M 460,400 L 490,320 C 500,240 530,240 540,320 L 570,400 Z" fill="#1e1b4b" opacity="0.75" />
              </g>
            )}

            {fighterId === 'f8f-bearcat' && (
              // Florida flat coastline and palm silhouettes
              <g fill="#0284c7" opacity="0.3">
                <path d="M 0,380 L 800,380 L 800,400 L 0,400 Z" />
                {/* Palms */}
                <path d="M 80,380 Q 85,340 95,300 M 95,300 L 80,290 M 95,300 L 110,290 M 95,300 L 75,305 M 95,300 L 115,305 M 95,300 L 95,280" stroke="#0369a1" strokeWidth="2" strokeLinecap="round" />
                <path d="M 720,380 Q 715,335 710,295 M 710,295 L 695,285 M 710,295 L 725,285 M 710,295 L 690,300 M 710,295 L 730,300 M 710,295 L 710,275" stroke="#0369a1" strokeWidth="2" strokeLinecap="round" />
              </g>
            )}

            {fighterId === 'f4u-corsair' && (
              // Sharp tropical volcano peaks & island silhouette horizons
              <g fill="#111" opacity="0.5">
                <path d="M 0,330 L 140,180 L 280,320 L 410,210 L 520,290 L 680,150 L 800,280 L 800,400 L 0,400 Z" />
                <path d="M 0,350 L 190,240 L 330,340 L 470,250 L 590,320 L 740,210 L 800,290 L 800,400 L 0,400 Z" fill="#080808" opacity="0.75" />
              </g>
            )}
          </svg>
        </div>

        {/* Layer C: Midground Airfield layout & Squadron infrastructure (Heavy parallax) */}
        <div 
          className="absolute inset-x-0 bottom-0 w-[120%] h-[120%] -left-[10%] -bottom-[10%] transition-transform duration-200 ease-out"
          style={{
            transform: `translate3d(${parallax.x * -25}px, ${parallax.y * -25}px, 0)`,
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
            {/* Core Airfield Runways and Squadron structures */}
            {fighterId === 'p51-mustang' && (
              // Ramitelli Airfield southern Italy: Marston steel runway plate textures and tents
              <g>
                {/* Grassy fields and dirt tracks */}
                <rect x="0" y="320" width="800" height="80" fill="#451a03" opacity="0.8" />
                {/* Steel strip runway angled */}
                <polygon points="100,400 350,320 440,320 220,400" fill="#4b5563" opacity="0.9" stroke="#374151" strokeWidth="0.5" />
                {/* Runway rivets patterns */}
                <line x1="120" y1="390" x2="360" y2="330" stroke="#1f2937" strokeWidth="1" strokeDasharray="1 15" />
                <line x1="180" y1="390" x2="420" y2="330" stroke="#1f2937" strokeWidth="1" strokeDasharray="1 15" />
                {/* Army Air Force Tents in distance */}
                <polygon points="600,320 620,300 640,320" fill="#78350f" opacity="0.95" />
                <polygon points="635,320 650,305 665,320" fill="#78350f" opacity="0.95" />
                <polygon points="660,320 680,300 700,320" fill="#78350f" opacity="0.95" />
              </g>
            )}

            {fighterId === 'spitfire-mkix' && (
              // RAF Tangmere: lush green English grass airfield, concrete pathways, classic metal hangar
              <g>
                {/* Green grass plains */}
                <rect x="0" y="330" width="800" height="70" fill="#14532d" opacity="0.8" />
                {/* Concrete perimeter track */}
                <path d="M 0,380 Q 300,340 800,360 L 800,380 Q 300,360 0,400 Z" fill="#78716c" opacity="0.85" />
                {/* Metal C-type Hangar dome */}
                <path d="M 50,330 Q 120,260 190,330 Z" fill="#1e293b" opacity="0.95" />
                <rect x="75" y="310" width="90" height="20" fill="#475569" opacity="0.9" />
                <line x1="120" y1="265" x2="120" y2="330" stroke="#0f172a" strokeWidth="1" />
                {/* Wind sock */}
                <line x1="280" y1="330" x2="280" y2="290" stroke="#475569" strokeWidth="2" />
                <polygon points="280,290 310,294 280,298" fill="#ef4444" />
              </g>
            )}

            {fighterId === 'p38-lightning' && (
              // Dobodura, New Guinea: Dense tropical forest, dirt runway under mist
              <g>
                {/* Dirt field */}
                <rect x="0" y="340" width="800" height="60" fill="#2d1500" opacity="0.9" />
                {/* Marston plate landing strip */}
                <polygon points="50,400 300,340 380,340 150,400" fill="#334155" opacity="0.9" />
                {/* Jungle Palms/Forest line silhouette */}
                <path d="M 450,340 Q 460,310 470,340 Q 480,305 490,340 Q 510,290 530,340 Q 550,300 570,340 Q 600,280 630,340 L 800,340 L 800,400 L 450,400 Z" fill="#064e3b" />
                <path d="M 480,340 Q 490,320 500,340 Q 515,310 530,340 Q 560,295 590,340 Z" fill="#022c22" opacity="0.7" />
              </g>
            )}

            {fighterId === 'f6f-hellcat' && (
              // USS Essex (CV-9) Flight Deck structures
              <g>
                {/* Dark sea water */}
                <rect x="0" y="340" width="800" height="60" fill="#172554" />
                {/* Flight Deck wood planks */}
                <polygon points="0,400 400,340 800,340 800,400" fill="#451a03" stroke="#292524" strokeWidth="1" />
                {/* Catapult line */}
                <line x1="200" y1="400" x2="480" y2="340" stroke="#eed095" strokeWidth="2" strokeDasharray="6 6" />
                {/* Carrier Island Superstructure far right */}
                <rect x="680" y="160" width="90" height="180" fill="#1e293b" opacity="0.95" />
                <polygon points="680,160 710,120 750,120 770,160" fill="#1e293b" opacity="0.95" />
                {/* Radar dish */}
                <line x1="725" y1="120" x2="725" y2="100" stroke="#475569" strokeWidth="3" />
                <path d="M 710,100 Q 725,85 740,100 Z" fill="none" stroke="#475569" strokeWidth="2.5" />
                {/* Deck Crew figures silhouette */}
                <circle cx="580" cy="342" r="4" fill="#15803d" />
                <path d="M 577,346 L 583,346 L 581,358 L 579,358 Z" fill="#15803d" />
                
                <circle cx="595" cy="341" r="4" fill="#b91c1c" />
                <path d="M 592,345 L 598,345 L 596,357 L 594,357 Z" fill="#b91c1c" />
              </g>
            )}

            {fighterId === 'p47-thunderbolt' && (
              // RAF Halesworth: Twlight airbase with illuminated runway and searchlights
              <g>
                {/* Dark grassland */}
                <rect x="0" y="340" width="800" height="60" fill="#0f172a" opacity="0.95" />
                {/* Concrete broad runway */}
                <polygon points="200,400 380,340 460,340 380,400" fill="#334155" opacity="0.9" />
                {/* Runway lights */}
                <circle cx="210" cy="390" r="3" fill="#34d399" className="animate-pulse" />
                <circle cx="295" cy="365" r="2.5" fill="#34d399" />
                <circle cx="380" cy="342" r="2" fill="#34d399" />
                <circle cx="378" cy="390" r="3" fill="#ef4444" className="animate-pulse" />
                {/* Searchlight beams */}
                <polygon points="120,340 0,0 80,0" fill="url(#searchlight-grad)" opacity="0.2" />
                <polygon points="650,340 700,0 780,0" fill="url(#searchlight-grad)" opacity="0.2" />
                {/* Searchlight beam gradient definition */}
                <defs>
                  <linearGradient id="searchlight-grad" x1="0%" y1="100%" x2="50%" y2="0%">
                    <stop offset="0%" stopColor="#fef08a" stopOpacity="0" />
                    <stop offset="100%" stopColor="#fef08a" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </g>
            )}

            {fighterId === 'p40-warhawk' && (
              // Kunming, China: River gorge dirt field with AVG tents and nationalists flags
              <g>
                {/* Reddish dirt airfield */}
                <rect x="0" y="340" width="800" height="60" fill="#78350f" opacity="0.8" />
                {/* Deep rocky gorge background */}
                <polygon points="0,340 220,310 240,340" fill="#2d1500" />
                <polygon points="550,340 580,290 800,340" fill="#2d1500" />
                {/* AVG command huts */}
                <rect x="620" y="315" width="50" height="25" fill="#451a03" />
                <polygon points="615,315 645,295 675,315" fill="#1e1b4b" />
                {/* Flagpole and Chinese Nationalist Flag */}
                <line x1="590" y1="340" x2="590" y2="280" stroke="#78716c" strokeWidth="2" />
                <rect x="591" y="280" width="22" height="14" fill="#3b82f6" />
                <rect x="602" y="287" width="11" height="7" fill="#ef4444" />
                <circle cx="596" cy="284" r="2.5" fill="#fff" />
              </g>
            )}

            {fighterId === 'f8f-bearcat' && (
              // NAS Jacksonville: Modern control tower, paved runway, Florida sun
              <g>
                {/* Light concrete apron */}
                <rect x="0" y="340" width="800" height="60" fill="#78716c" opacity="0.7" />
                <polygon points="100,400 350,340 450,340 280,400" fill="#475569" opacity="0.9" />
                {/* NAS control tower */}
                <rect x="580" y="220" width="45" height="120" fill="#e2e8f0" stroke="#cbd5e1" />
                <rect x="570" y="210" width="65" height="15" fill="#334155" />
                {/* Glass cabin top */}
                <polygon points="575,210 580,185 625,185 630,210" fill="#64748b" opacity="0.8" />
                {/* Beacon light */}
                <circle cx="602" cy="180" r="4" fill="#ef4444" className="animate-ping" />
              </g>
            )}

            {fighterId === 'f4u-corsair' && (
              // Vella Lavella coral runway and tall palm tree trunks
              <g>
                {/* Coral dirt runway surface */}
                <rect x="0" y="340" width="800" height="60" fill="#7a7062" opacity="0.8" />
                <polygon points="60,400 320,340 420,340 200,400" fill="#a89d8e" opacity="0.65" />
                {/* Tall palm silhouettes framing left and right sides */}
                <path d="M 50,340 Q 40,240 20,130 M 20,130 L 5,120 M 20,130 L 35,115 M 20,130 L -15,140 M 20,130 L 38,145" stroke="#1c1917" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M 750,340 Q 760,250 770,140 M 770,140 L 750,130 M 770,140 L 785,125 M 770,140 L 745,150 M 770,140 L 795,155" stroke="#1c1917" strokeWidth="4.5" strokeLinecap="round" />
                {/* Remote coastal reef wave ripple */}
                <path d="M 320,340 Q 510,345 750,340" stroke="#0284c7" strokeWidth="1" strokeDasharray="3 9" fill="none" opacity="0.4" />
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* 2. DYNAMIC FLOATING AIRCRAFT ILLUST WITH PROP SPEED (Foreground Layer - Intense Parallax) */}
      <div 
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none transition-all duration-300 ease-out"
        style={{
          transform: `translate3d(${parallax.x * 20}px, ${parallax.y * 20}px, 0) rotate(${parallax.x * 3}deg)`,
        }}
      >
        <svg 
          className="w-full h-full max-w-[500px] max-h-[340px] drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] filter contrast-[1.05] brightness-[1.02]" 
          viewBox="0 0 500 360"
        >
          {/* DEFINITIONS OF GLOWS AND EXHAUST FLAMES */}
          <defs>
            <filter id="exhaust-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="silver-metal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="40%" stopColor="#cbd5e1" />
              <stop offset="70%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
            <linearGradient id="spitfire-camo" x1="0%" y1="0%" x2="100%" y2="105%">
              <stop offset="0%" stopColor="#15803d" />
              <stop offset="35%" stopColor="#1e293b" />
              <stop offset="70%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
            <linearGradient id="p38-metal" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="50%" stopColor="#475569" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="hellcat-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="55%" stopColor="#172554" />
              <stop offset="100%" stopColor="#090d16" />
            </linearGradient>
          </defs>

          {/* CHOOSE PLANE VECTOR RENDER */}
          {fighterId === 'p51-mustang' && (
            // DETAILED ARTIST ILLUSTRATION OF P-51 MUSTANG (3/4 Angled Front Dynamic View)
            <g id="p51-vector-group">
              {/* Back wing (starboard) */}
              <path d="M 230,135 L 340,110 Q 360,112 350,125 L 260,155 Z" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
              <line x1="280" y1="123" x2="330" y2="114" stroke="#64748b" strokeWidth="1.5" />

              {/* Tail fin & elevators */}
              <g id="p51-silver-tail">
                {/* Horizontal Stabilizer (Starboard) */}
                <path d="M 120,135 L 70,125 L 80,140 Z" fill="url(#silver-metal)" stroke="#334155" />
                {/* Main vertical tail fin (Sleek standard silver tail of the Airmen!) */}
                <path d="M 110,130 L 75,70 Q 60,60 70,85 L 100,145 Z" fill="url(#silver-metal)" stroke="#334155" strokeWidth="1.25" />
                {/* Trim tab */}
                <path d="M 72,78 L 65,80 L 78,135 L 85,135 Z" fill="#475569" />
                {/* Horizontal Stabilizer (Port) */}
                <path d="M 105,145 L 60,155 L 75,162 Z" fill="url(#silver-metal)" stroke="#334155" />
              </g>

              {/* Fuselage core body (Sleek silver aluminum plating) */}
              <path d="M 310,148 Q 230,120 100,145 Q 120,165 240,160 Z" fill="url(#silver-metal)" stroke="#334155" strokeWidth="1.5" />
              {/* Radiator belly scoop */}
              <path d="M 180,158 Q 210,172 235,160 L 230,155 Q 195,155 180,158 Z" fill="#475569" stroke="#1e293b" />

              {/* Cockpit Canopy (Bubble canopy with pilot profile) */}
              <path d="M 205,133 Q 230,110 260,135 Z" fill="#38bdf8" fillOpacity="0.5" stroke="#1e293b" strokeWidth="1.5" />
              {/* Pilot head silhouette inside */}
              <circle cx="225" cy="126" r="4.5" fill="#1e293b" />
              <path d="M 222,130 Q 228,133 232,130 Z" fill="#1e293b" />
              {/* Canopy reflex glare */}
              <path d="M 215,125 Q 230,118 245,128" stroke="#fff" strokeWidth="1.25" strokeLinecap="round" opacity="0.6" />

              {/* Silver nose cowl ring */}
              <path d="M 310,148 C 310,148 335,153 340,148 C 345,143 330,130 310,134 Z" fill="url(#silver-metal)" stroke="#334155" />

              {/* Engine Exhaust stacks (Glowing hot!) */}
              <rect x="290" y="138" width="12" height="3" rx="1.5" fill="#ea580c" />
              <rect x="275" y="137" width="10" height="3" rx="1.5" fill="#ea580c" />
              <rect x="260" y="136" width="10" height="3" rx="1.5" fill="#ea580c" />
              {/* Exhaust flame fire trail */}
              <path d="M 260,138 Q 210,142 160,148" stroke="#f97316" strokeWidth="2.5" filter="url(#exhaust-glow)" opacity="0.7" strokeLinecap="round" className="animate-pulse" />

              {/* Main wing (Port - large foreground) */}
              <path d="M 255,158 L 390,205 C 410,212 390,225 370,220 L 210,162 Z" fill="url(#silver-metal)" stroke="#334155" strokeWidth="1.5" />
              {/* Panel panel lines on wing */}
              <line x1="280" y1="172" x2="355" y2="198" stroke="#475569" strokeWidth="1.25" />
              <line x1="310" y1="182" x2="375" y2="204" stroke="#475569" strokeWidth="1.25" />
              {/* USAF Star decal insignia on wing */}
              <g transform="translate(325, 185) scale(0.65) rotate(15)">
                <circle cx="0" cy="0" r="16" fill="#1e3a8a" />
                <rect x="-18" y="-4" width="36" height="8" fill="#fff" />
                <rect x="-18" y="-1" width="36" height="2" fill="#ef4444" />
                <polygon points="0,-12 3,2 14,2 5,8 9,20 0,13 -9,20 -5,8 -14,2 -3,2" fill="#fff" />
              </g>

              {/* Gun ports detail */}
              <line x1="365" y1="198" x2="368" y2="199" stroke="#000" strokeWidth="3" strokeLinecap="round" />
              <line x1="358" y1="196" x2="361" y2="197" stroke="#000" strokeWidth="3" strokeLinecap="round" />
              <line x1="351" y1="193" x2="354" y2="194" stroke="#000" strokeWidth="3" strokeLinecap="round" />

              {/* Propeller hub and spinning blades */}
              <g id="spinning-propeller">
                {/* Silver nose spinner dome */}
                <path d="M 330,134 Q 355,142 330,150 Z" fill="url(#silver-metal)" stroke="#334155" />
                
                {/* Propeller motion blur circle */}
                <ellipse cx="335" cy="142" rx="14" ry="110" fill="none" stroke="rgba(254, 240, 138, 0.25)" strokeWidth="8" strokeDasharray="5 15" className="animate-spin" style={{ animationDuration: propAnimDuration, transformOrigin: '335px 142px' }} />
                <ellipse cx="335" cy="142" rx="10" ry="80" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="4" className="animate-spin" style={{ animationDuration: propAnimDuration, transformOrigin: '335px 142px' }} />
                
                {/* Yellow tips blur lines */}
                <path d="M 335,42 A 14 110 0 0 1 345,62" fill="none" stroke="#facc15" strokeWidth="4" opacity="0.8" />
                <path d="M 335,242 A 14 110 0 0 1 325,222" fill="none" stroke="#facc15" strokeWidth="4" opacity="0.8" />
              </g>
            </g>
          )}

          {fighterId === 'spitfire-mkix' && (
            // BEAUTIFUL SPITFIRE MK IX (Elegant curved lines and elliptical wings)
            <g id="spitfire-vector-group">
              {/* Starboard elliptical wing background */}
              <path d="M 235,130 Q 360,85 320,115 Q 260,145 235,145 Z" fill="#1e293b" stroke="#0f172a" />

              {/* Elegant Tail fin structure */}
              <g id="spitfire-tail">
                <path d="M 120,140 Q 60,105 75,115 Q 85,130 110,145 Z" fill="#1e293b" stroke="#0f172a" />
                {/* Vertical rounded stabilizer (Famous Spitfire rounded tail) */}
                <path d="M 110,135 C 105,100 80,75 80,95 Q 92,130 102,142 Z" fill="#15803d" stroke="#0f172a" />
                {/* British RAF Tail Fin Flash Red/White/Blue */}
                <rect x="92" y="105" width="4" height="12" fill="#b91c1c" />
                <rect x="96" y="105" width="3" height="12" fill="#fff" />
                <rect x="99" y="105" width="4" height="12" fill="#1e3a8a" />
              </g>

              {/* Fuselage core (Fluid elegant lines with olive camo) */}
              <path d="M 310,145 Q 220,118 100,140 Q 120,158 240,152 Z" fill="url(#spitfire-camo)" stroke="#1f2937" strokeWidth="1.5" />

              {/* Under-wing radiator box */}
              <rect x="180" y="152" width="28" height="8" fill="#334155" rx="1" />

              {/* Cockpit Canopy (Sliding teardrop shape) */}
              <path d="M 202,132 Q 225,112 250,135 Z" fill="#06b6d4" fillOpacity="0.4" stroke="#0f172a" strokeWidth="1.5" />
              <path d="M 212,126 Q 225,120 238,128" stroke="#fff" strokeWidth="1" opacity="0.5" />

              {/* Propeller Spinner and cowl nose */}
              <path d="M 310,145 Q 338,142 310,132 Z" fill="#0f172a" />

              {/* Exhaust ports (Merlin engine exhausts) */}
              <circle cx="288" cy="138" r="2" fill="#ea580c" />
              <circle cx="280" cy="137" r="2" fill="#ea580c" />
              <circle cx="272" cy="136" r="2" fill="#ea580c" />
              <circle cx="264" cy="135" r="2" fill="#ea580c" />
              <circle cx="256" cy="134" r="2" fill="#ea580c" />
              <circle cx="248" cy="133" r="2" fill="#ea580c" />

              {/* Foreground elliptical wing (Port) */}
              <path d="M 230,152 C 280,180 395,240 340,225 C 265,190 205,160 230,152 Z" fill="url(#spitfire-camo)" stroke="#0f172a" strokeWidth="1.5" />
              {/* Yellow leading wing edge strip */}
              <path d="M 305,190 L 340,225 Q 345,224 335,215 L 295,182 Z" fill="#fbbf24" opacity="0.9" />

              {/* RAF Roundel decal on wing */}
              <g transform="translate(285, 178) scale(0.65) rotate(-15)">
                <circle cx="0" cy="0" r="18" fill="#1e3a8a" />
                <circle cx="0" cy="0" r="12" fill="#fff" />
                <circle cx="0" cy="0" r="6" fill="#b91c1c" />
              </g>

              {/* Famous Spitfire wing Hispano Cannon extending forward */}
              <line x1="285" y1="175" x2="320" y2="160" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
              <line x1="320" y1="160" x2="328" y2="157" stroke="#000" strokeWidth="1.5" />

              {/* Propeller rotation */}
              <g id="spitfire-prop">
                <ellipse cx="320" cy="138" rx="10" ry="95" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="3" className="animate-spin" style={{ animationDuration: propAnimDuration, transformOrigin: '320px 138px' }} />
                <ellipse cx="320" cy="138" rx="12" ry="115" fill="none" stroke="rgba(238, 208, 149, 0.12)" strokeWidth="6" className="animate-spin" style={{ animationDuration: propAnimDuration, transformOrigin: '320px 138px' }} />
              </g>
            </g>
          )}

          {fighterId === 'p38-lightning' && (
            // DYNAMIC TWIN-BOOM P-38 LIGHTNING (Highly unique shape!)
            <g id="p38-vector-group">
              {/* Back wing/boom (Starboard) */}
              <path d="M 250,135 L 370,120 L 350,135 Z" fill="#475569" />
              <path d="M 320,125 L 180,110 L 195,140 Z" fill="#334155" />

              {/* Core central cockpit nacelle pod */}
              <path d="M 230,130 Q 250,110 270,130 L 265,165 Q 250,175 235,165 Z" fill="url(#p38-metal)" stroke="#1e293b" strokeWidth="1.5" />
              {/* Central cockpit glass canopy */}
              <path d="M 240,125 Q 250,112 260,125 L 258,140 L 242,140 Z" fill="#34d399" fillOpacity="0.4" stroke="#1e293b" />

              {/* Port engine boom (Foreground left) */}
              <path d="M 185,138 L 190,120 Q 200,120 205,138 L 198,240 Q 192,245 188,240 Z" fill="url(#p38-metal)" stroke="#0f172a" strokeWidth="1.5" />
              <ellipse cx="196" cy="122" rx="10" ry="3" fill="#0f172a" />

              {/* Starboard engine boom (Far right background) */}
              <path d="M 305,132 L 310,118 Q 318,118 322,132 L 316,230 Q 312,235 308,230 Z" fill="#334155" stroke="#1e293b" />

              {/* Dual tail horizontal connector and rudders */}
              <rect x="194" y="225" width="120" height="8" fill="#1e293b" stroke="#0f172a" />
              <polygon points="186,220 198,210 198,245 186,240" fill="#dc2626" /> {/* Red rudder tips */}
              <polygon points="314,215 324,208 324,238 314,233" fill="#dc2626" />

              {/* Main Wing (connecting booms and pod) */}
              <path d="M 110,145 L 390,130 C 400,130 380,145 360,142 L 140,155 Z" fill="url(#p38-metal)" stroke="#0f172a" strokeWidth="1.25" />

              {/* Marge Nose Art text on Port engine casing */}
              <text x="192" y="148" fill="#fff" fontSize="5" fontWeight="bold" transform="rotate(-10 192 148)" className="font-typewriter italic">Marge</text>

              {/* Nose-grouped cannon fires (glowing bullets extending forward) */}
              <line x1="250" y1="145" x2="250" y2="185" stroke="#382e21" strokeWidth="1.5" />
              
              {/* Twin rotating propellers */}
              <g id="p38-props">
                <ellipse cx="196" cy="122" rx="35" ry="8" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2.5" className="animate-spin" style={{ animationDuration: propAnimDuration, transformOrigin: '196px 122px' }} />
                <ellipse cx="316" cy="118" rx="32" ry="8" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2.5" className="animate-spin" style={{ animationDuration: propAnimDuration, transformOrigin: '316px 118px' }} />
              </g>
            </g>
          )}

          {fighterId === 'f6f-hellcat' && (
            // POWERFUL carrier-based F6F HELLCAT (Deep Navy Sea Blue and snarling cat face)
            <g id="hellcat-vector-group">
              {/* Far starboard wing */}
              <path d="M 230,140 L 350,115 Q 365,115 355,130 L 260,158 Z" fill="#1e293b" />

              {/* Tail structures */}
              <g id="hellcat-tail">
                <path d="M 120,135 Q 70,110 80,120 Q 90,135 110,145 Z" fill="#172554" stroke="#0f172a" />
                {/* Muscular vertical fin */}
                <path d="M 110,135 C 105,95 85,82 85,100 Q 95,130 102,142 Z" fill="#1e3a8a" stroke="#0f172a" />
              </g>

              {/* Thick barrel-shaped fuselage (Deep navy sea blue) */}
              <path d="M 315,148 Q 220,115 100,138 Q 120,165 240,158 Z" fill="url(#hellcat-blue)" stroke="#020617" strokeWidth="1.5" />

              {/* Cockpit canopy (Squarish navy style) */}
              <path d="M 205,131 L 222,112 L 245,112 L 255,132 Z" fill="#38bdf8" fillOpacity="0.4" stroke="#020617" strokeWidth="1.5" />
              <line x1="222" y1="112" x2="225" y2="132" stroke="#020617" strokeWidth="1" />
              <line x1="245" y1="112" x2="242" y2="132" stroke="#020617" strokeWidth="1" />

              {/* Snarling Cat-Mouth Nose Art on cowling! */}
              <g id="hellcat-nose-art" transform="translate(290, 138) scale(0.8)">
                {/* Red mouth */}
                <path d="M 5,10 Q 15,18 25,8 Q 15,22 5,10" fill="#dc2626" />
                {/* White sharp teeth */}
                <polygon points="8,11 10,14 12,11" fill="#fff" />
                <polygon points="14,11 16,15 18,11" fill="#fff" />
                <polygon points="20,10 22,13 24,10" fill="#fff" />
                <polygon points="10,16 12,13 14,16" fill="#fff" />
                <polygon points="16,16 18,13 20,16" fill="#fff" />
                {/* Cat eyes */}
                <polygon points="12,2 16,5 10,5" fill="#facc15" />
              </g>

              {/* Broad squared port wing (Foreground) */}
              <path d="M 230,158 L 380,215 C 395,222 375,235 350,225 L 210,165 Z" fill="url(#hellcat-blue)" stroke="#020617" strokeWidth="1.5" />

              {/* Three bladed spinning propeller */}
              <g id="hellcat-prop">
                <path d="M 315,148 Q 332,148 315,132 Z" fill="#020617" />
                <ellipse cx="320" cy="140" rx="12" ry="110" fill="none" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="4" className="animate-spin" style={{ animationDuration: propAnimDuration, transformOrigin: '320px 140px' }} />
              </g>
            </g>
          )}

          {fighterId === 'p47-thunderbolt' && (
            // MASSIVE BARREL-SHAPED P-47 THUNDERBOLT ("The Jug")
            <g id="p47-vector-group">
              {/* Back wing (Starboard) */}
              <path d="M 235,135 L 345,110 L 260,155 Z" fill="#3f6212" />

              {/* Tail sections */}
              <g id="p47-tail">
                <path d="M 120,135 Q 60,105 75,115 Q 85,130 110,145 Z" fill="#4d7c0f" stroke="#3f6212" />
                {/* Large high vertical fin */}
                <path d="M 110,135 C 105,90 80,72 80,92 Q 92,125 102,142 Z" fill="#4d7c0f" stroke="#3f6212" />
              </g>

              {/* Giant, wide barrel fuselage (Olive drab with yellow nose cowl) */}
              <path d="M 315,148 Q 210,105 95,138 Q 115,172 235,162 Z" fill="#4d7c0f" stroke="#14532d" strokeWidth="1.5" />
              
              {/* Yellow Cowl Ring nose */}
              <path d="M 315,148 C 315,148 340,154 345,148 C 350,142 330,126 310,130 Z" fill="#eab308" stroke="#ca8a04" />

              {/* Bubble canopy canopy peak */}
              <path d="M 200,129 Q 225,102 255,129 Z" fill="#38bdf8" fillOpacity="0.4" stroke="#14532d" strokeWidth="1.5" />

              {/* Broad port wing (Foreground) */}
              <path d="M 225,162 L 385,218 C 400,225 380,238 355,228 L 205,168 Z" fill="#4d7c0f" stroke="#14532d" strokeWidth="1.5" />
              
              {/* Decal star */}
              <circle cx="280" cy="190" r="12" fill="#1e3a8a" />
              <polygon points="280,182 283,190 291,190 285,194 287,202 280,197 273,202 275,194 269,190 277,190" fill="#fff" />

              {/* Four-bladed huge propeller */}
              <g id="p47-prop">
                <ellipse cx="325" cy="139" rx="14" ry="120" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="5" className="animate-spin" style={{ animationDuration: propAnimDuration, transformOrigin: '325px 139px' }} />
              </g>
            </g>
          )}

          {fighterId === 'p40-warhawk' && (
            // FAMOUS P-40 WARHAWK WITH SHARK MOUTH (AVG Flying Tigers Livery)
            <g id="p40-vector-group">
              {/* Starboard Wing */}
              <path d="M 230,135 L 340,110 L 260,155 Z" fill="#7c2d12" opacity="0.65" />

              {/* Tail fin and rudder */}
              <g id="p40-tail">
                <path d="M 120,135 Q 60,105 75,115 L 110,145 Z" fill="#78350f" stroke="#451a03" />
                <path d="M 110,135 C 105,95 82,75 82,95 L 102,142 Z" fill="#78350f" stroke="#451a03" />
              </g>

              {/* Fuselage core (Dark green/tan camouflage) */}
              <path d="M 310,148 Q 230,118 100,142 Q 120,165 240,158 Z" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />

              {/* Cockpit glass */}
              <path d="M 205,133 Q 228,110 255,134 Z" fill="#a5f3fc" fillOpacity="0.4" stroke="#451a03" strokeWidth="1.5" />

              {/* Prominent chin radiator scoop (very unique to P-40) */}
              <path d="M 280,154 Q 305,168 322,154 L 305,148 Z" fill="#1e293b" stroke="#000" />

              {/* ICONIC SHARK MOUTH LIERY NOSE ART (Glows with defiance!) */}
              <g id="p40-shark-mouth" transform="translate(265, 140) scale(0.95)">
                {/* Big Red Mouth with sharp white teeth */}
                <path d="M 10,10 Q 30,22 45,6 C 35,28 15,22 10,10" fill="#dc2626" stroke="#000" strokeWidth="1" />
                {/* Teeth top */}
                <polygon points="15,11 18,15 21,11" fill="#fff" />
                <polygon points="23,12 26,16 29,12" fill="#fff" />
                <polygon points="31,12 34,17 37,11" fill="#fff" />
                <polygon points="39,10 41,14 43,9" fill="#fff" />
                {/* Teeth bottom */}
                <polygon points="18,18 20,15 22,18" fill="#fff" />
                <polygon points="25,19 27,15 29,19" fill="#fff" />
                <polygon points="32,19 34,15 36,18" fill="#fff" />
                {/* Angry eye */}
                <ellipse cx="22" cy="1" rx="5" ry="3" fill="#fbbf24" stroke="#000" strokeWidth="1" />
                <polygon points="18,-1 25,1 23,-3" fill="#000" />
              </g>

              {/* Port Wing Foreground */}
              <path d="M 225,158 L 385,210 C 400,218 380,230 355,222 L 205,165 Z" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />

              {/* Spinning prop */}
              <g id="p40-prop">
                <path d="M 310,148 Q 328,144 310,132 Z" fill="#1e293b" />
                <ellipse cx="318" cy="140" rx="12" ry="110" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="3.5" className="animate-spin" style={{ animationDuration: propAnimDuration, transformOrigin: '318px 140px' }} />
              </g>
            </g>
          )}

          {fighterId === 'f8f-bearcat' && (
            // LIGHTNING FAST STUBBY BLUE ANGELS F8F BEARCAT (High-gloss blue with golden logos)
            <g id="bearcat-vector-group">
              {/* Back wing */}
              <path d="M 235,138 L 330,115 L 260,155 Z" fill="#1e3a8a" />

              {/* Tail */}
              <g id="bearcat-tail">
                <path d="M 120,135 Q 70,110 85,120 L 110,145 Z" fill="#1e3a8a" stroke="#0f172a" />
                <path d="M 110,135 C 105,92 85,74 85,92 L 102,142 Z" fill="#1e3a8a" stroke="#0f172a" />
              </g>

              {/* Super stubby fat fuselage (High gloss navy sea blue) */}
              <path d="M 310,148 Q 200,105 100,138 Q 120,165 240,155 Z" fill="#172554" stroke="#0f172a" strokeWidth="1.5" />

              {/* High bubble canopy */}
              <path d="M 200,128 Q 220,95 245,128 Z" fill="#06b6d4" fillOpacity="0.35" stroke="#0f172a" strokeWidth="1.5" />

              {/* Golden "Blue Angels" writing on the side! */}
              <text x="145" y="145" fill="#facc15" fontSize="7" fontWeight="bold" transform="rotate(3 145 145)" className="font-sans">Blue Angels</text>
              <text x="125" y="144" fill="#facc15" fontSize="11" fontWeight="bold" className="font-stencil">1</text>

              {/* Port Wing Foreground (Clipped square-ish bearcat style) */}
              <path d="M 225,155 L 360,205 C 375,212 360,225 340,215 L 205,162 Z" fill="#172554" stroke="#0f172a" strokeWidth="1.5" />

              {/* Four bladed propeller rotation */}
              <g id="bearcat-prop">
                <ellipse cx="316" cy="138" rx="12" ry="115" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="4.5" className="animate-spin" style={{ animationDuration: propAnimDuration, transformOrigin: '316px 138px' }} />
              </g>
            </g>
          )}

          {fighterId === 'f4u-corsair' && (
            // POWERFUL NAVY BLUE COLOURED F4U CORSAIR (Inverted Gull Wing Carrier Fighter)
            <g id="corsair-vector-group">
              {/* Back wing (Starboard - Inverted Gull wing bent) */}
              <path d="M 235,138 L 290,125 Q 315,110 340,118 L 260,155 Z" fill="#1e3a8a" opacity="0.8" />

              {/* Tail fin & elevators */}
              <g id="corsair-tail">
                <path d="M 120,135 Q 70,110 85,120 L 110,145 Z" fill="#1e3a8a" stroke="#0f172a" />
                <path d="M 110,135 C 105,92 82,72 82,92 L 102,142 Z" fill="#1e3a8a" stroke="#0f172a" />
              </g>

              {/* Long, beefy fuselage with rear-set cockpit */}
              <path d="M 310,148 Q 210,108 100,138 Q 120,165 240,155 Z" fill="#172554" stroke="#0f172a" strokeWidth="1.5" />

              {/* Cockpit canopy set far back */}
              <path d="M 195,128 Q 215,102 235,128 Z" fill="#06b6d4" fillOpacity="0.3" stroke="#0f172a" strokeWidth="1.5" />

              {/* White Star and Bar Decal on fuselage */}
              <g id="corsair-star-decal" transform="translate(142, 137) scale(0.6)">
                {/* Blue circle background */}
                <circle cx="20" cy="20" r="14" fill="#0c4a6e" stroke="#fff" strokeWidth="1" />
                {/* White bar */}
                <rect x="0" y="16" width="40" height="8" fill="#fff" />
                {/* White star */}
                <polygon points="20,8 23,15 31,15 25,20 27,27 20,22 13,27 15,20 9,15 17,15" fill="#fff" />
              </g>

              {/* Port Wing Foreground ( Iconic Gull Wing Bend ) */}
              {/* This is styled to bend down from root, then up to the tip */}
              <path d="M 225,155 Q 260,175 285,185 Q 330,225 365,212 C 380,205 345,180 320,170 Q 265,155 205,162 Z" fill="#172554" stroke="#0f172a" strokeWidth="1.5" />

              {/* Giant 3-blade prop rotating arc */}
              <g id="corsair-prop">
                <ellipse cx="316" cy="138" rx="14" ry="120" fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="4.5" className="animate-spin" style={{ animationDuration: propAnimDuration, transformOrigin: '316px 138px' }} />
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* 3. SCI-FI / RETRO OVERLAY HUD DISPLAY GAUGES (Absolute Top-level) */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${parallax.x * 28}px, ${parallax.y * 28}px, 0)`,
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

      {/* 4. UPPER DECLASSIFIED HEADER INFO METADATA BLOCK */}
      <div className="relative z-30 flex justify-between items-start font-mono text-[9px] text-stone-300 w-full bg-stone-950/80 p-2 rounded border border-stone-800/50 backdrop-blur-sm">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-diesel-brass font-bold uppercase tracking-widest font-stencil text-[10px]">
            <Compass className="w-3.5 h-3.5 text-diesel-brass animate-spin-slow" />
            HD ARTIST RENDITION ACTIVE FEED
          </div>
          <div className="text-stone-400">
            AIRFRAME: <strong className="text-stone-200">{name}</strong> ({year}) • {country.toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <div className="text-stone-400 flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5 text-diesel-crimson" />
            STATION: <strong className="text-[#eed095]">{details.airfield}</strong>
          </div>
          <div className="text-[8px] text-stone-500 font-bold">
            {details.location.toUpperCase()}
          </div>
        </div>
      </div>

      {/* 5. INTERACTIVE LOWER CONTROL STRIP (ENGINE RPM SLIDERS) */}
      <div className="relative z-30 mt-auto w-full flex flex-col sm:flex-row justify-between items-end gap-3 pt-24">
        {/* Squadron details text plate */}
        <div className="bg-stone-950/90 border border-[#4a3e31] p-3 rounded-lg flex-1 shadow-2xl backdrop-blur-md">
          <div className="font-mono text-[10px]">
            <span className="text-diesel-brass font-bold uppercase tracking-wider block font-stencil">
              🛡️ {details.squadron}
            </span>
            <p className="text-[9.5px] text-stone-300 mt-1 leading-normal font-sans">
              {details.description} Featuring an artist's high-definition perspective of the <strong className="text-[#eed095]">{name}</strong> flying combat patrol over the base.
            </p>
          </div>
        </div>

        {/* Engine RPM control switches */}
        <div className="bg-slate-950/95 border border-white/10 p-2.5 rounded-lg flex flex-col gap-1.5 shrink-0 shadow-lg font-mono">
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

          {/* Engine Sound Toggle Switch under Throttle panel */}
          <button
            onClick={() => {
              audioEngine.playClick();
              if (audioEngine.isRunning) {
                audioEngine.stop();
              } else {
                // Determine engine cylinder type based on aircraft name/id
                const isTwin = (name.includes('P-38') || name.includes('Lightning') || name.includes('Corsair') || name.includes('P-47') || name.includes('Hellcat') || name.includes('Twin') || fighterId.includes('p38') || fighterId.includes('p47') || fighterId.includes('corsair') || fighterId.includes('hellcat'));
                audioEngine.setEngineType(isTwin ? 'twin' : 'single');
                audioEngine.setEngineSpeed(enginePower);
                audioEngine.start();
              }
              setRenderTrigger(prev => prev + 1);
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
