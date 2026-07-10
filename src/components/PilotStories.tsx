import React, { useState, useEffect } from 'react';
import { PilotStory, FighterAircraft } from '../types';
import { Award, User, Quote, Check, ShieldAlert, Crosshair, ArrowRight, UserCheck, Radio, Volume2, VolumeX } from 'lucide-react';
import { PhotoAuthenticityBadge, PhotoPlaceholder } from './PhotoAuthenticityBadge';
import { audioEngine } from './AudioEngine';

interface PilotStoriesProps {
  pilots: PilotStory[];
  fighters: FighterAircraft[];
  initialFilter?: 'all' | 'tuskegee' | 'other';
}

export default function PilotStories({ 
  pilots, 
  fighters,
  initialFilter = 'all'
}: PilotStoriesProps) {
  // Only keep American and British (Allied) pilots
  const alliedPilots = pilots.filter(p => p.id !== 'adolf-galland' && p.id !== 'saburo-sakai');
  
  const [selectedPilot, setSelectedPilot] = useState<PilotStory>(alliedPilots[0] || pilots[0]);
  const [filter, setFilter] = useState<'all' | 'tuskegee' | 'other'>(initialFilter);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Sync prop filter when tab changes
  useEffect(() => {
    setFilter(initialFilter);
    const filtered = alliedPilots.filter((p) => {
      if (initialFilter === 'tuskegee') return p.isTuskegee;
      if (initialFilter === 'other') return !p.isTuskegee;
      return true;
    });
    if (filtered.length > 0 && !filtered.some(p => p.id === selectedPilot.id)) {
      setSelectedPilot(filtered[0]);
    }
  }, [initialFilter]);

  // Cancel any ongoing voice announcements when pilot selection changes
  useEffect(() => {
    audioEngine.cancelSpeech();
    setIsSpeaking(false);
    return () => {
      audioEngine.cancelSpeech();
    };
  }, [selectedPilot]);

  const handleToggleVoice = () => {
    if (isSpeaking) {
      audioEngine.cancelSpeech();
      setIsSpeaking(false);
    } else {
      const transmission = `Allied Command HQ bulletin. Dossier profile for ${selectedPilot.rank} ${selectedPilot.name}. Quote: ${selectedPilot.quote}. End transmission.`;
      setIsSpeaking(true);
      audioEngine.speakVintageRadio(
        transmission,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  // Filter pilots
  const filteredPilots = alliedPilots.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'tuskegee') return p.isTuskegee;
    if (filter === 'other') return !p.isTuskegee;
    return true;
  });

  const getFighterName = (pilotId: string) => {
    const aircraft = fighters.find((f) => f.pilotStories.some((p) => p.id === pilotId));
    return aircraft ? aircraft.name : 'N/A';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="pilot-dossiers">
      {/* Sidebar: Pilot List styled as military index cards */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        {/* Navigation Filters with Warbird Panels */}
        <div className="warbird-panel warbird-screws p-4">
          <div className="rivet-row-top" />
          <span className="font-serif tracking-wide text-xs text-[#dfb743] tracking-wider uppercase mb-2 block font-bold relative z-10">
            Filter Service Dossiers
          </span>
          <div className="grid grid-cols-3 gap-1.5 text-[10px] sm:text-xs font-mono relative z-10">
            <button
              onClick={() => setFilter('all')}
              className={`py-1.5 px-1 rounded-md border text-center transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#dfb743] text-slate-950 border-[#3d342a] font-bold shadow-md'
                  : 'bg-stone-900 text-[#dfb743] border-[#3d342a] hover:bg-stone-800'
              }`}
            >
              All Pilots
            </button>
            <button
              onClick={() => setFilter('tuskegee')}
              className={`py-1.5 px-1 rounded-md border text-center transition-all flex items-center justify-center gap-1 cursor-pointer ${
                filter === 'tuskegee'
                  ? 'bg-diesel-crimson text-stone-100 border-[#3d342a] font-bold shadow-[0_0_8px_rgba(185,28,28,0.5)]'
                  : 'bg-stone-900 text-red-400 border-[#3d342a] hover:bg-stone-800'
              }`}
            >
              Tuskegee Airmen
            </button>
            <button
              onClick={() => setFilter('other')}
              className={`py-1.5 px-1 rounded-md border text-center transition-all cursor-pointer ${
                filter === 'other'
                  ? 'bg-[#dfb743] text-slate-950 border-[#3d342a] font-bold shadow-md'
                  : 'bg-stone-900 text-[#dfb743] border-[#3d342a] hover:bg-stone-800'
              }`}
            >
              Other Allied Aces
            </button>
          </div>
          <div className="rivet-row-bottom" />
        </div>

        {/* Index cards */}
        <div className="flex flex-col gap-2.5 max-h-[460px] overflow-y-auto pr-1">
          {filteredPilots.map((p) => {
            const isSelected = p.id === selectedPilot.id;
            
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPilot(p)}
                className={`p-3 text-left rounded-lg transition-all border-l-4 border-y border-r border-white/5/85 shadow-md ${
                  isSelected
                    ? p.isTuskegee 
                      ? 'border-l-red-600 bg-[#1a1313] border-[#3d342a] shadow-[inset_0_0_12px_rgba(185,28,28,0.2)]' 
                      : 'border-l-diesel-brass bg-[#171411] border-[#3d342a] shadow-[inset_0_0_12px_rgba(197,160,89,0.2)]'
                    : 'border-l-stone-700 bg-stone-950/70 hover:bg-stone-900/40'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className={`font-serif tracking-wide text-sm tracking-wider font-bold ${isSelected ? 'text-[#dfb743]' : 'text-stone-300'}`}>
                      {p.name}
                    </h4>
                    <span className="font-mono text-[10px] text-stone-400">
                      {p.rank}
                    </span>
                  </div>
                  {p.isTuskegee && (
                    <span className="bg-red-950/80 text-red-400 text-[9px] font-bold px-1.5 py-0.5 rounded border border-red-900/40 tracking-wider">
                      RED TAIL
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center mt-2.5 font-mono text-[10px] text-stone-500">
                  <span>CONFIRMED KILLS: <strong className="text-stone-300">{p.kills}</strong></span>
                  <span className="text-emerald-700 font-bold uppercase text-[9px]">Active Duty</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Panel: Interactive Dossier Binder Sheet */}
      <div className="lg:col-span-8">
        <div className="ledger-paper p-6 rounded-lg min-h-[500px] shadow-2xl relative border-2 border-[#d2c29e] flex flex-col justify-between overflow-hidden">
          {/* Top binder holes (dieselpunk touch) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-12 -mt-2">
            <div className="w-4 h-4 rounded-full bg-stone-950 border border-white/5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]"></div>
            <div className="w-4 h-4 rounded-full bg-stone-950 border border-white/5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]"></div>
            <div className="w-4 h-4 rounded-full bg-stone-950 border border-white/5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]"></div>
          </div>

          <div>
            {/* Header stamps */}
            <div className="flex justify-between items-start mt-2 border-b border-stone-400/40 pb-4">
              <div>
                <span className="font-typewriter text-[11px] uppercase tracking-wider text-stone-600 block">
                  WAR DEPARTMENT • ARMY AIR FORCES Dossier
                </span>
                <h2 className="font-serif tracking-wide text-2xl text-stone-900 tracking-wide mt-1 uppercase">
                  {selectedPilot.name}
                </h2>
                <div className="flex flex-wrap gap-x-4 gap-y-1 font-typewriter text-xs text-stone-700 mt-1">
                  <span>RANK: <strong>{selectedPilot.rank}</strong></span>
                  <span>SERVICE: <strong>{selectedPilot.yearsOfService}</strong></span>
                  <span>THEATER: <strong>{selectedPilot.isTuskegee ? 'Mediterranean / Europe' : selectedPilot.id === 'richard-bong' || selectedPilot.id === 'saburo-sakai' ? 'Pacific' : 'Western Europe'}</strong></span>
                </div>
              </div>

              {/* Status stamp */}
              <div className="flex flex-col items-end">
                {selectedPilot.isTuskegee ? (
                  <div className="border-2 border-red-700 text-red-700 font-serif tracking-wide font-bold rounded px-3 py-1 text-center rotate-3 tracking-widest text-xs select-none shadow-[2px_2px_0_rgba(185,28,28,0.15)]">
                    99th PURSUIT / RED TAILS
                  </div>
                ) : (
                  <div className="border-2 border-white/5 text-stone-800 font-serif tracking-wide font-bold rounded px-3 py-1 text-center -rotate-2 tracking-widest text-xs select-none">
                    ACTIVE CONFIDENTIAL
                  </div>
                )}
              </div>
            </div>

            {/* Content Core */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
              {/* Profile Image & Medals Panel */}
              <div className="md:col-span-4 flex flex-col gap-4">
                {/* Photo holder */}
                <div className="relative p-2 bg-stone-100 border border-stone-300 shadow-md rotate-[-1deg] max-w-[200px] mx-auto md:mx-0">
                  <div className="w-full aspect-[4/5] bg-stone-200 border border-dashed border-stone-400 overflow-hidden relative group flex flex-col items-center justify-center select-none">
                    {selectedPilot.photoUrl ? (
                      <>
                        <img
                          src={selectedPilot.photoUrl}
                          alt={selectedPilot.name}
                          className="w-full h-full object-cover filter sepia contrast-125 saturate-50"
                          referrerPolicy={selectedPilot.photoUrl.startsWith('http') ? 'no-referrer' : undefined}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent pointer-events-none"></div>
                        <PhotoAuthenticityBadge
                          isVerified={selectedPilot.photoVerified || false}
                          source={selectedPilot.photoSource || 'Unspecified'}
                          hasPhoto={true}
                          type="pilot"
                          tooltipAlign="right"
                        />
                      </>
                    ) : (
                      <PhotoPlaceholder 
                        type="pilot"
                        name={selectedPilot.name}
                        className="w-full h-full border-0 rounded-none bg-stone-200 p-2"
                      />
                    )}
                  </div>
                  <div className="mt-2 font-typewriter text-[10px] text-center text-stone-600">
                    ID: FLT-{selectedPilot.id.substring(0, 5).toUpperCase()}
                  </div>
                </div>

                {/* Tactical Stats */}
                <div className="bg-stone-800/5 p-3 rounded border border-stone-400/20 font-typewriter text-xs text-stone-800">
                  <span className="font-serif tracking-wide text-[11px] text-stone-900 tracking-wider block mb-2 uppercase flex items-center gap-1">
                    {selectedPilot.isTuskegee ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                        RED TAIL RECORD
                      </>
                    ) : (
                      'Combat Ledger'
                    )}
                  </span>
                  <div className="flex justify-between border-b border-stone-400/20 py-1">
                    <span>Aerial Victories:</span>
                    <strong className="text-red-800 font-bold text-sm flex items-center gap-1">
                      <Crosshair className="w-3.5 h-3.5" /> {selectedPilot.kills}
                    </strong>
                  </div>
                  <div className="flex justify-between border-b border-stone-400/20 py-1">
                    <span>Primary Aircraft:</span>
                    <strong className="text-stone-900">{getFighterName(selectedPilot.id)}</strong>
                  </div>
                  <div className="flex justify-between border-b border-stone-400/20 py-1">
                    <span>Flight Status:</span>
                    <strong className="text-green-800">Active Duty</strong>
                  </div>

                  {selectedPilot.combatHours !== undefined && (
                    <div className="flex justify-between border-b border-stone-400/20 py-1">
                      <span>Combat Hours:</span>
                      <strong className="text-stone-950 font-bold">{selectedPilot.combatHours} Hrs</strong>
                    </div>
                  )}
                  {selectedPilot.combatMissions !== undefined && (
                    <div className="flex justify-between border-b border-stone-400/20 py-1">
                      <span>Combat Missions:</span>
                      <strong className="text-stone-950 font-bold">{selectedPilot.combatMissions} Sorties</strong>
                    </div>
                  )}
                  {selectedPilot.squadronRank && (
                    <div className="flex justify-between border-b border-stone-400/20 py-1">
                      <span>Squadron Role:</span>
                      <strong className="text-stone-900 text-[11px] text-right">{selectedPilot.squadronRank}</strong>
                    </div>
                  )}
                  {selectedPilot.baseOfOperations && (
                    <div className="flex flex-col py-1 text-[11px]">
                      <span className="text-stone-500">Base of Operations:</span>
                      <strong className="text-stone-900 mt-0.5">{selectedPilot.baseOfOperations}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Bio and medals */}
              <div className="md:col-span-8 flex flex-col gap-4">
                {/* Quote block and radio play button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-500/5 p-3 rounded border border-stone-400/20">
                  <div className="relative pl-8 pr-4 py-2 border-l-4 border-stone-400/40 italic text-stone-700 text-sm font-typewriter flex-1">
                    <Quote className="absolute top-1 left-2 w-5 h-5 text-stone-400/40" />
                    <p className="relative z-10">"{selectedPilot.quote}"</p>
                  </div>
                  
                  <button
                    onClick={handleToggleVoice}
                    className={`shrink-0 py-2 px-3 rounded-md border text-xs font-serif tracking-wide uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                      isSpeaking
                        ? 'bg-[#dfb743] text-slate-950 border-[#3d342a] animate-pulse font-bold shadow-[0_0_8px_rgba(197,160,89,0.4)]'
                        : 'bg-stone-900 hover:bg-stone-800 text-[#dfb743] border-[#3d342a] hover:border-diesel-brass'
                    }`}
                    title={isSpeaking ? "Cancel radio transmission" : "Broadcast dossier quote over 1940's cockpit radio"}
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 animate-bounce" />
                        Cancel Feed
                      </>
                    ) : (
                      <>
                        <Radio className="w-3.5 h-3.5" />
                        Radio Dispatch
                      </>
                    )}
                  </button>
                </div>

                {/* Pulsing Vintage Radio Transceiver Monitor */}
                {isSpeaking && (
                  <div className="bg-[#0b1c11] border border-emerald-900/50 rounded-lg p-3 font-mono text-[10px] text-emerald-400 relative overflow-hidden shadow-inner">
                    {/* Glowing scanning lines */}
                    <div className="absolute inset-0 bg-repeat-y opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(16,185,129,0.3) 50%, transparent 50%)', backgroundSize: '100% 4px' }} />
                    <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-emerald-900/30 relative z-10">
                      <span className="flex items-center gap-1.5 uppercase font-bold text-[9px] tracking-wider text-emerald-300">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                        Live Transmit • Allied Dispatch
                      </span>
                      <span className="text-emerald-500 font-semibold tracking-widest text-[8px]">84.5 MHZ • AM BAND</span>
                    </div>
                    <p className="leading-relaxed font-typewriter italic relative z-10 text-emerald-300">
                      "Allied Command HQ bulletin. Dossier profile for {selectedPilot.rank} {selectedPilot.name}. Quote: {selectedPilot.quote}. End transmission."
                    </p>
                    <div className="flex justify-between items-center mt-2 pt-1 border-t border-emerald-900/20 text-[8px] text-emerald-600 relative z-10 font-bold">
                      <span>WAAF STATION X • CLASSIFIED</span>
                      <span className="animate-pulse">DECRYPT ACTIVE</span>
                    </div>
                  </div>
                )}

                {/* Dossier Biography */}
                <div className="space-y-3">
                  <h3 className="font-serif tracking-wide text-xs text-stone-950 tracking-wider uppercase border-b border-stone-400/30 pb-0.5">
                    Service Record & Summary
                  </h3>
                  <p className="font-typewriter text-xs text-stone-800 leading-relaxed text-justify">
                    {selectedPilot.bio}
                  </p>
                </div>

                {/* Medals & Citations */}
                <div className="mt-2">
                  <h3 className="font-serif tracking-wide text-xs text-stone-950 tracking-wider uppercase border-b border-stone-400/30 pb-1 mb-2">
                    Decorations & Honors
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPilot.medals.map((medal, i) => (
                      <div
                        key={i}
                        className="bg-[#e4dbbe] text-stone-800 text-[10px] font-mono border border-stone-400 rounded-md px-2.5 py-1 flex items-center gap-1.5 shadow-sm"
                      >
                        <Award className="w-3.5 h-3.5 text-red-800 shrink-0" />
                        <span className="font-semibold">{medal}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Special Tuskegee Airmen Squadron Commendation Board */}
                {selectedPilot.isTuskegee && (
                  <div className="mt-4 p-4 border-2 border-dashed border-red-700/55 bg-red-900/5 rounded-lg relative overflow-hidden">
                    {/* Retro watermark background */}
                    <div className="absolute right-2 bottom-2 text-red-900/10 font-serif tracking-wide text-7xl select-none pointer-events-none uppercase tracking-tighter">
                      332ND
                    </div>
                    
                    <h4 className="font-serif tracking-wide text-xs text-red-800 tracking-wider uppercase flex items-center gap-1.5 mb-2 font-bold">
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                      99TH PURSUIT / 332ND FIGHTER GROUP COMMAND BRIEF
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-stone-700">
                      <div>
                        <span className="text-stone-500 text-[10px] uppercase block">Squadron Posting</span>
                        <span className="text-red-950 font-bold block mt-0.5">{selectedPilot.squadronName || '332nd Fighter Group'}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 text-[10px] uppercase block">Operations Base</span>
                        <span className="text-red-950 font-bold block mt-0.5">{selectedPilot.baseOfOperations || 'Ramitelli, Italy'}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-stone-500 text-[10px] uppercase block">Unit Commendations & Citations</span>
                        <span className="text-red-950 font-semibold block mt-1 bg-red-900/5 border border-red-900/15 rounded px-2.5 py-1.5 italic text-justify text-[11px] leading-relaxed">
                          "{selectedPilot.specialCommendation}"
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
