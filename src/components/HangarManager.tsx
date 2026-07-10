import React, { useState, useEffect } from 'react';
import { FighterAircraft, PilotStory, FlightLog } from '../types';
import { Shield, Compass, Crosshair, BookOpen, MapPin, User, Award, Info, Lock, CameraOff } from 'lucide-react';
import { audioEngine } from './AudioEngine';
import { PhotoAuthenticityBadge, PhotoPlaceholder } from './PhotoAuthenticityBadge';

interface HangarManagerProps {
  fighters: FighterAircraft[];
  pilots: PilotStory[];
  onSelectHangarAircraft?: (aircraftId: string | null) => void;
  onSwitchToTab?: (tab: 'hangar' | 'fighters' | 'pilots' | 'logs') => void;
}

interface HistoricalSquadron {
  id: string;
  name: string;
  nickname: string;
  aircraftId: string; // references 'p51-mustang' etc.
  aircraftName: string;
  division: string;
  airbase: string;
  description: string;
  insigniaColor: string;
  historyText: string;
  pilots: string[]; // PilotStory.id references
}

const HISTORICAL_SQUADRONS: HistoricalSquadron[] = [
  {
    id: '332nd-fg',
    name: '332nd Fighter Group',
    nickname: 'The Airmen',
    aircraftId: 'p51-mustang',
    aircraftName: 'P-51 Mustang',
    division: '15th Air Force, USAAF',
    airbase: 'Ramitelli Airfield, Foggia, Italy',
    description: 'The legendary flying group that shattered social barriers and achieved one of the most heroic escort records in air history.',
    insigniaColor: '#475569', // Standard Slate
    historyText: 'Consisting of the 99th, 100th, 301st, and 302nd Fighter Squadrons under the strict command of Col. Benjamin O. Davis Jr., the Airmen flew deep escort missions over Europe, maintaining a protective posture to safeguard allied heavy bombers, achieving an unrivaled bomber protection record.',
    pilots: ['benjamin-o-davis', 'lee-archer', 'charles-b-hall']
  },
  {
    id: '242nd-raf',
    name: 'No. 242 (Canadian) Squadron RAF',
    nickname: 'The Graceful Shields',
    aircraftId: 'spitfire-mkix',
    aircraftName: 'Supermarine Spitfire Mk IX',
    division: 'No. 12 Group, RAF Fighter Command',
    airbase: 'RAF Coltishall / RAF Tangmere, England',
    description: 'The celebrated Royal Air Force squadron that stood as the shield of Great Britain, commanded by the legless ace Douglas Bader.',
    insigniaColor: '#2563eb', // RAF Blue
    historyText: 'Active throughout the Battle of Britain and later sweeps over Europe. Under Wing Commander Douglas Bader, the squadron overcame early organizational struggles to pioneer "Big Wing" interception tactics, proving instrumental in turning the tide of the air war over the English Channel.',
    pilots: ['douglas-bader']
  },
  {
    id: '9th-fs-49th-fg',
    name: '9th Fighter Squadron (49th FG)',
    nickname: 'The Flying Knights',
    aircraftId: 'p38-lightning',
    aircraftName: 'P-38 Lightning',
    division: '5th Air Force, USAAF',
    airbase: 'Dobodura Airfield, Papua New Guinea / Tacloban, Philippines',
    description: 'The premier heavy interceptor squadron in the Southwest Pacific, led by America’s all-time Ace of Aces Richard Bong.',
    insigniaColor: '#eab308', // Yellow Knight Gold
    historyText: 'Operating the Lockheed P-38 Lightning, their concentrated nose guns gave them extreme range and surgical lethality, which pilot Richard "Dick" Bong leveraged to achieve 40 aerial victories, the highest individual score in American military history.',
    pilots: ['richard-bong']
  }
];

export default function HangarManager({
  fighters,
  pilots: masterPilots,
  onSelectHangarAircraft,
  onSwitchToTab
}: HangarManagerProps) {
  const [selectedSquadron, setSelectedSquadron] = useState<HistoricalSquadron>(HISTORICAL_SQUADRONS[0]);

  // Sync selected squadron's aircraft with the main app's background backdrop
  useEffect(() => {
    if (onSelectHangarAircraft) {
      onSelectHangarAircraft(selectedSquadron.aircraftId);
    }
  }, [selectedSquadron, onSelectHangarAircraft]);

  const handleSelectSquadron = (sq: HistoricalSquadron) => {
    audioEngine.playClick();
    setSelectedSquadron(sq);
  };

  // Get pilots that belong to this squadron
  const squadronPilots = masterPilots.filter(p => selectedSquadron.pilots.includes(p.id));

  // Get flight logs that belong to this aircraft/squadron
  const currentAircraft = fighters.find(f => f.id === selectedSquadron.aircraftId);
  const squadronLogs = currentAircraft?.flightLogs || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="squadron-command-deck">
      {/* Sidebar: Squadron List Index */}
      <div className="lg:col-span-4 flex flex-col gap-5">
        <div className="warbird-panel warbird-screws p-4 flex flex-col gap-3">
          <div className="rivet-row-top" />
          <h3 className="font-serif tracking-wide text-xs text-[#dfb743] tracking-wider uppercase mb-1 border-b border-white/5 pb-2 font-bold flex items-center justify-between">
            <span>① ALLIED SQUADRONS</span>
            <span className="text-[10px] font-mono text-stone-500">ACTIVE GRID</span>
          </h3>

          <div className="flex flex-col gap-3 relative z-10">
            {HISTORICAL_SQUADRONS.map((sq) => {
              const isSelected = selectedSquadron.id === sq.id;
              return (
                <button
                  key={sq.id}
                  onClick={() => handleSelectSquadron(sq)}
                  className={`p-4 rounded-xl text-left border transition-all flex flex-col gap-2 ${
                    isSelected
                      ? 'bg-white/5 border-[#dfb743]/50 shadow-[inset_0_0_12px_rgba(223,183,67,0.1)]'
                      : 'bg-stone-950/80 border-white/5 hover:bg-stone-900/40'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-serif tracking-wide text-sm text-stone-100 font-bold tracking-wider">
                      {sq.name}
                    </span>
                    <span 
                      className="w-3 h-3 rounded-full shadow-[0_0_8px_currentColor]" 
                      style={{ color: sq.insigniaColor }} 
                    />
                  </div>
                  
                  <div className="font-mono text-[11px] text-stone-400 space-y-1">
                    <div>
                      Aircraft: <span className="text-[#c4af7d] font-bold">{sq.aircraftName}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-stone-500">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{sq.airbase.split(',')[0]}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="rivet-row-bottom" />
        </div>
      </div>

      {/* Main Operations Console Panel */}
      <div className="lg:col-span-8 flex flex-col gap-5">
        <div className="warbird-panel warbird-screws p-6 flex-1 flex flex-col justify-between relative min-h-[580px]">
          <div className="rivet-row-top" />
          
          <div className="relative z-10 flex flex-col gap-6">
            {/* Main Header */}
            <div className="flex justify-between items-start border-b border-white/5 pb-4">
              <div>
                <span className="font-serif tracking-wide text-xs text-[#dfb743] tracking-wider uppercase block font-bold">
                  ② SQUADRON HISTORICAL ARCHIVE
                </span>
                <h2 className="font-serif tracking-wide text-3xl text-stone-100 tracking-wider uppercase font-bold text-shadow mt-1">
                  {selectedSquadron.name}
                </h2>
                <span className="font-mono text-sm text-stone-400 mt-1 block italic text-[#c4af7d]">
                  "{selectedSquadron.nickname}"
                </span>
              </div>
              <div 
                className="px-3 py-1 border rounded-lg font-mono text-[10px] font-bold uppercase tracking-widest text-stone-400"
                style={{ borderColor: selectedSquadron.insigniaColor + '40', background: selectedSquadron.insigniaColor + '10' }}
              >
                RESTRICTED DOSSIER
              </div>
            </div>

            {/* Quick Specs Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs text-stone-300">
              <div className="bg-slate-900/60 border border-white/10 p-4 rounded-xl shadow-md flex flex-col justify-between">
                <div>
                  <span className="text-stone-500 text-[10px] block uppercase font-bold tracking-wider mb-1">PRIMARY AIRCRAFT:</span>
                  <span className="text-sm text-[#dfb743] font-serif tracking-wide font-bold">{selectedSquadron.aircraftName}</span>
                </div>
                {onSwitchToTab && (
                  <button
                    onClick={() => { audioEngine.playClick(); onSwitchToTab('fighters'); }}
                    className="mt-3 text-stone-400 hover:text-[#dfb743] text-[10px] font-bold border border-white/5 hover:border-diesel-gold/40 px-2 py-1 rounded text-center transition-all bg-stone-950/40"
                  >
                    View Aircraft Blueprint
                  </button>
                )}
              </div>

              <div className="bg-slate-900/60 border border-white/10 p-4 rounded-xl shadow-md flex flex-col justify-between">
                <div>
                  <span className="text-stone-500 text-[10px] block uppercase font-bold tracking-wider mb-1">MILITARY DIVISION:</span>
                  <span className="text-sm text-stone-100 font-bold">{selectedSquadron.division}</span>
                </div>
                <div className="text-[10px] text-stone-500 mt-3 italic flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-blue-500" /> Allied Command
                </div>
              </div>

              <div className="bg-slate-900/60 border border-white/10 p-4 rounded-xl shadow-md flex flex-col justify-between">
                <div>
                  <span className="text-stone-500 text-[10px] block uppercase font-bold tracking-wider mb-1">DEPLOYED AIRPORT / BASE:</span>
                  <span className="text-sm text-stone-100 font-bold leading-tight">{selectedSquadron.airbase.split(',')[0]}</span>
                </div>
                <div className="text-[10px] text-stone-500 mt-3 truncate font-sans">
                  {selectedSquadron.airbase.substring(selectedSquadron.airbase.indexOf(',') + 1).trim()}
                </div>
              </div>
            </div>

            {/* Split layout: Historical Record & Aircraft Recon Photo */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Left Column: Historical record */}
              <div className="md:col-span-7 space-y-2 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif tracking-wide text-xs text-[#dfb743] tracking-wider uppercase border-b border-white/5 pb-1 font-bold">
                    ③ HISTORICAL RECORD & OVERVIEW
                  </h4>
                  <p className="font-sans text-xs text-stone-400 leading-relaxed text-justify mt-2">
                    {selectedSquadron.historyText}
                  </p>
                </div>
              </div>

              {/* Right Column: Aircraft Recon Photo Card */}
              <div className="md:col-span-5 flex flex-col justify-end">
                <h4 className="font-serif tracking-wide text-xs text-[#dfb743] tracking-wider uppercase border-b border-white/5 pb-1 font-bold mb-2">
                  📷 PRIMARY AIRCRAFT RECON
                </h4>
                {currentAircraft ? (
                  <div className="relative border-4 border-white/10 rounded-xl overflow-hidden aspect-[4/3] shadow-lg group bg-stone-950 flex-1 min-h-[160px]">
                    {currentAircraft.posterUrl ? (
                      <>
                        <img 
                          src={currentAircraft.posterUrl} 
                          alt={currentAircraft.name} 
                          referrerPolicy={currentAircraft.posterUrl.startsWith('http') ? 'no-referrer' : undefined}
                          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                          <div className="font-serif tracking-wide text-[10px] text-[#dfb743] tracking-wider uppercase font-bold">
                            {currentAircraft.name}
                          </div>
                        </div>
                        <PhotoAuthenticityBadge
                          isVerified={currentAircraft.posterVerified || false}
                          source={currentAircraft.posterSource || 'Unspecified'}
                          hasPhoto={true}
                          type="aircraft"
                          tooltipAlign="right"
                        />
                      </>
                    ) : (
                      <PhotoPlaceholder 
                        type="aircraft"
                        name={currentAircraft.name}
                        className="w-full h-full border-0 rounded-none bg-stone-950 p-2"
                      />
                    )}
                  </div>
                ) : (
                  <div className="bg-stone-950 border border-white/5 rounded-xl aspect-[4/3] flex items-center justify-center font-mono text-xs text-stone-500">
                    Image Unavailable
                  </div>
                )}
              </div>
            </div>

            {/* Squadron Pilots List */}
            <div className="space-y-3">
              <h4 className="font-serif tracking-wide text-xs text-[#dfb743] tracking-wider uppercase border-b border-white/5 pb-1 font-bold">
                ④ DEPLOYED HISTORICAL PILOTS
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {squadronPilots.map((p) => (
                  <div 
                    key={p.id}
                    className="bg-white/5 border-2 border-white/5 p-4 rounded-xl flex gap-3 shadow-inner"
                  >
                    {/* Declassified Pilot Photo */}
                    <div className="w-16 h-20 bg-stone-950 border border-white/5 flex flex-col items-center justify-center rounded overflow-hidden shrink-0 relative">
                      {p.photoUrl ? (
                        <>
                          <img 
                            src={p.photoUrl} 
                            alt={p.name} 
                            referrerPolicy={p.photoUrl.startsWith('http') ? 'no-referrer' : undefined}
                            className="w-full h-full object-cover filter sepia contrast-125 saturate-50"
                          />
                          <PhotoAuthenticityBadge
                            isVerified={p.photoVerified || false}
                            source={p.photoSource || 'Unspecified'}
                            hasPhoto={true}
                            type="pilot"
                            tooltipAlign="left"
                          />
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center p-1 text-[8px] font-mono text-stone-600 w-full h-full bg-stone-950/80">
                          <CameraOff className="w-3.5 h-3.5 mb-1 text-red-500/70" />
                          <span className="text-[7px] leading-tight font-bold text-red-500/80 uppercase">No Verified</span>
                          <span className="text-[6px] text-stone-500 block leading-none mt-0.5">PHOTO</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="font-serif tracking-wide text-xs text-stone-200 tracking-wide font-bold truncate">
                          {p.rank} {p.name}
                        </div>
                        <div className="font-mono text-[9px] text-stone-500">
                          Active: {p.yearsOfService}
                        </div>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className="font-mono text-[10px] text-red-500 font-bold flex items-center gap-0.5">
                            <Crosshair className="w-3 h-3" /> {p.kills} Victories
                          </span>
                        </div>
                      </div>

                      {onSwitchToTab && (
                        <button
                          onClick={() => { audioEngine.playClick(); onSwitchToTab('pilots'); }}
                          className="text-stone-400 hover:text-[#dfb743] text-[9px] font-bold text-left underline underline-offset-2 transition-colors mt-1"
                        >
                          View Full Dossier
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Squadron Logs Section */}
            {squadronLogs.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-serif tracking-wide text-xs text-[#dfb743] tracking-wider uppercase border-b border-white/5 pb-1 font-bold">
                  ⑤ HISTORICAL SORTIE LOGS
                </h4>
                <div className="flex flex-col gap-2.5 max-h-[180px] overflow-y-auto pr-1">
                  {squadronLogs.map((log) => (
                    <div 
                      key={log.id} 
                      className="bg-stone-950/80 border border-white/5 p-3.5 rounded-lg text-left text-xs font-mono"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-stone-300 font-bold uppercase text-[11px] tracking-wider text-[#c4af7d]">
                          {log.mission}
                        </span>
                        <span className="text-[10px] text-stone-500">{log.date}</span>
                      </div>
                      <div className="text-[10px] text-stone-400">
                        Pilot: <strong className="text-stone-300">{log.pilotName}</strong> | Base: <span className="text-stone-500">{log.airbase}</span>
                      </div>
                      <p className="font-typewriter text-[10px] text-stone-500 mt-2 italic leading-relaxed">
                        "{log.logText}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="rivet-row-bottom" />
        </div>
      </div>
    </div>
  );
}
