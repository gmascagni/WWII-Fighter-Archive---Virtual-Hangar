import React, { useState } from 'react';
import { FlightLog } from '../types';
import { BookOpen, Calendar, Clock, MapPin, Search, PlusCircle, Bookmark, Compass, Radio } from 'lucide-react';
import { audioEngine } from './AudioEngine';

interface FlightLogsProps {
  logs: FlightLog[];
  onAddNewLog?: (log: Omit<FlightLog, 'id'>) => void;
}

const AIRCRAFT_PRESETS = [
  { id: 'p51', name: 'P-51 Mustang "By Request"', pilot: 'Lt. Lee Archer' },
  { id: 'spitfire', name: 'Spitfire Mk IX "Graceful Shield"', pilot: 'Wg Cdr Douglas Bader' },
  { id: 'p38', name: 'P-38 Lightning "Marge"', pilot: 'Maj. Richard Bong' }
];

export default function FlightLogs({ logs, onAddNewLog }: FlightLogsProps) {
  const [selectedLog, setSelectedLog] = useState<FlightLog>(logs[0] || null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Completed' | 'Engaged' | 'Aborted'>('ALL');

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Cancel any ongoing narration if the selected log shifts
  React.useEffect(() => {
    if (isSpeaking) {
      audioEngine.cancelSpeech();
      setIsSpeaking(false);
    }
  }, [selectedLog]);

  // Clean up narration on component unmount
  React.useEffect(() => {
    return () => {
      audioEngine.cancelSpeech();
    };
  }, []);

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      audioEngine.cancelSpeech();
      setIsSpeaking(false);
    } else {
      if (!selectedLog) return;
      const text = `Sortie Report. Deployed Pilot: ${selectedLog.pilotName}. Deployed Aircraft: ${selectedLog.aircraftName}. Mission Type: ${selectedLog.mission}. Post-Flight Intelligence Memo reads: ${selectedLog.logText}`;
      setIsSpeaking(true);
      audioEngine.speakVintageRadio(
        text,
        () => {},
        () => setIsSpeaking(false)
      );
    }
  };
  
  // Custom Log Form State
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [formPilot, setFormPilot] = useState<string>('');
  const [formAircraft, setFormAircraft] = useState<string>('');
  const [formMission, setFormMission] = useState<string>('Routine Air Patrol');
  const [formDuration, setFormDuration] = useState<string>('2h 15m');
  const [formLogText, setFormLogText] = useState<string>('');
  const [formLocation, setFormLocation] = useState<string>('European Theater');
  const [formAirbase, setFormAirbase] = useState<string>('Ramitelli Airfield, Italy');
  const [formStatus, setFormStatus] = useState<'Completed' | 'Aborted' | 'Engaged'>('Completed');

  // Filtered log list
  const filteredLogs = logs.filter((log) => {
    const matchesSearch = 
      log.pilotName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.aircraftName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.mission.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.logText.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'ALL' || log.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSubmitLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formPilot || !formAircraft || !formLogText) return;

    if (onAddNewLog) {
      onAddNewLog({
        date: new Date().toISOString().split('T')[0],
        pilotName: formPilot,
        aircraftName: formAircraft,
        mission: formMission,
        duration: formDuration,
        logText: formLogText,
        status: formStatus,
        location: formLocation,
        airbase: formAirbase
      });
    }

    // Reset Form
    setFormLogText('');
    setShowAddForm(false);
  };

  const handleFillFromPreset = (p: typeof AIRCRAFT_PRESETS[0]) => {
    setFormAircraft(p.name);
    setFormPilot(p.pilot);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="wartime-flight-logs">
      {/* Sidebar: Log Index Sheets */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        {/* Search & Filter Metal panel */}
        <div className="warbird-panel warbird-screws p-4">
          <div className="rivet-row-top" />
          <div className="flex justify-between items-center border-b border-stone-800 pb-2 mb-3 relative z-10">
            <span className="font-stencil text-xs text-diesel-gold tracking-wider uppercase font-bold">
              Flight Ledger Archives
            </span>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-[#eed095] hover:bg-[#c5a059] text-stone-950 font-mono text-[10px] font-bold px-3 py-1 rounded-md border border-[#3d342a] flex items-center gap-1 uppercase transition-all shadow-md"
            >
              <PlusCircle className="w-3 h-3" /> Log Sortie
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mb-3 z-10">
            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-stone-500" />
            <input
              type="text"
              placeholder="Search signatures, logs, airfields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-stone-950 border-2 border-[#3d342a] rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-stone-200 focus:outline-none focus:border-diesel-gold"
            />
          </div>

          {/* Filter Status Pills */}
          <div className="flex flex-wrap gap-1.5 text-[10px] font-mono z-10 relative">
            {(['ALL', 'Completed', 'Engaged', 'Aborted'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-md border transition-all uppercase ${
                  statusFilter === st
                    ? 'bg-diesel-brass text-stone-950 border-[#3d342a] font-bold'
                    : 'bg-stone-950 text-stone-400 border-stone-900 hover:bg-stone-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
          <div className="rivet-row-bottom" />
        </div>

        {/* Dynamic Flight log index list */}
        <div className="flex flex-col gap-2.5 max-h-[460px] overflow-y-auto pr-1">
          {filteredLogs.map((log) => {
            const isSelected = selectedLog && log.id === selectedLog.id;
            return (
              <button
                key={log.id}
                onClick={() => { setSelectedLog(log); setShowAddForm(false); }}
                className={`p-4 text-left rounded-lg transition-all border-l-4 border-y border-r shadow-md ${
                  isSelected
                    ? 'border-l-diesel-brass bg-[#171411] border-[#3d342a] shadow-[inset_0_0_15px_rgba(197,160,89,0.15)]'
                    : 'border-l-stone-800 bg-stone-950/70 border-stone-900/80 opacity-80 hover:opacity-100 hover:bg-stone-900/20'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`font-stencil text-xs tracking-wider uppercase font-bold ${isSelected ? 'text-[#eed095]' : 'text-stone-300'}`}>
                    {log.mission}
                  </span>
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    log.status === 'Completed' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-900/30' :
                    log.status === 'Engaged' ? 'bg-red-950/80 text-red-400 border border-red-900/30 shadow-[0_0_8px_rgba(239,68,68,0.2)] animate-pulse' :
                    'bg-amber-950/80 text-amber-400 border border-amber-900/30'
                  }`}>
                    {log.status}
                  </span>
                </div>

                <div className="font-mono text-[11px] text-stone-400 space-y-0.5">
                  <div className="flex justify-between">
                    <span>PILOT: <strong className="text-stone-300">{log.pilotName}</strong></span>
                    <span className="text-stone-500">{log.date}</span>
                  </div>
                  <div>AIRCRAFT: <span className="text-[#eed095] font-semibold">{log.aircraftName}</span></div>
                </div>

                <p className="font-typewriter text-[10.5px] text-stone-500 mt-2 line-clamp-2 italic">
                  "{log.logText}"
                </p>
              </button>
            );
          })}
          {filteredLogs.length === 0 && (
            <div className="text-center py-8 font-mono text-xs text-stone-500 bg-stone-950/40 rounded border border-stone-900">
              No aviation logs match current filters.
            </div>
          )}
        </div>
      </div>

      {/* Main Panel: Interactive Ledger Notebook */}
      <div className="lg:col-span-7">
        {showAddForm ? (
          /* Form to file a simulated Custom Hangar Log */
          <div className="ledger-paper p-6 rounded-lg shadow-2xl relative border-2 border-[#d2c29e] h-full flex flex-col justify-between">
            <div>
              <div className="border-b border-stone-400/30 pb-3 mb-4">
                <h3 className="font-stencil text-xl text-stone-900 tracking-wider">
                  FILE SQUADRON FLIGHT LOG
                </h3>
                <span className="font-typewriter text-[10px] text-stone-600">
                  RECORD SIMULATED SORTIE DATA FOR SQUADRON ARCHIVES
                </span>
              </div>

              {/* Quick autofill from historical presets */}
              <div className="mb-4 bg-stone-900/5 p-2 rounded border border-stone-400/20 font-typewriter text-xs text-stone-800">
                <span className="font-semibold text-stone-900">Autofill from Squadron Presets:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {AIRCRAFT_PRESETS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleFillFromPreset(p)}
                      className="bg-[#e2d5b4] hover:bg-[#d5c7a4] text-stone-800 text-[10px] px-2 py-0.5 rounded border border-stone-300 transition-colors"
                    >
                      {p.name.split('"')[0].trim()}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmitLog} className="grid grid-cols-2 gap-4 font-typewriter text-xs text-stone-800">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-stone-900">PILOT SIGNATURE:</label>
                  <input
                    type="text"
                    required
                    value={formPilot}
                    onChange={(e) => setFormPilot(e.target.value)}
                    placeholder="e.g. Captain Buddy"
                    className="bg-transparent border-b border-stone-500 focus:outline-none py-1 text-stone-900 font-bold"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-stone-900">AIRCRAFT / TAIL CODE:</label>
                  <input
                    type="text"
                    required
                    value={formAircraft}
                    onChange={(e) => setFormAircraft(e.target.value)}
                    placeholder="e.g. P-51 Mustang 'By Request'"
                    className="bg-transparent border-b border-stone-500 focus:outline-none py-1 text-stone-900 font-bold"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-stone-900">MISSION TYPE:</label>
                  <select
                    value={formMission}
                    onChange={(e) => setFormMission(e.target.value)}
                    className="bg-transparent border-b border-stone-500 focus:outline-none py-1 text-stone-900 font-bold"
                  >
                    <option value="Routine Air Patrol">Routine Air Patrol</option>
                    <option value="Bomber Escort Protection">Bomber Escort Protection</option>
                    <option value="Air-to-Air Interception">Air-to-Air Interception</option>
                    <option value="Tactical Reconnaissance">Tactical Reconnaissance</option>
                    <option value="Aviation Training Run">Aviation Training Run</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-stone-900">FLIGHT DURATION:</label>
                  <input
                    type="text"
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    className="bg-transparent border-b border-stone-500 focus:outline-none py-1 text-stone-900 font-bold"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-stone-900">THEATER GRID / AREA:</label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    className="bg-transparent border-b border-stone-500 focus:outline-none py-1 text-stone-900 font-bold"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-stone-900">DEPLOYED AIRBASE:</label>
                  <input
                    type="text"
                    value={formAirbase}
                    onChange={(e) => setFormAirbase(e.target.value)}
                    className="bg-transparent border-b border-stone-500 focus:outline-none py-1 text-stone-900 font-bold"
                  />
                </div>

                <div className="col-span-2 flex flex-col gap-1">
                  <label className="font-bold text-stone-900">SORTIE OUTCOME STATUS:</label>
                  <div className="flex gap-4 mt-1">
                    {(['Completed', 'Engaged', 'Aborted'] as const).map((st) => (
                      <label key={st} className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name="formStatus"
                          checked={formStatus === st}
                          onChange={() => setFormStatus(st)}
                          className="accent-stone-900"
                        />
                        <span className="font-semibold">{st}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="col-span-2 flex flex-col gap-1 mt-1">
                  <label className="font-bold text-stone-900">AUTHENTIC FLIGHT LOG MEMORANDUM:</label>
                  <textarea
                    required
                    rows={4}
                    value={formLogText}
                    onChange={(e) => setFormLogText(e.target.value)}
                    placeholder="Describe oil pressure, engine rpms, altitude, enemy fighter contact, and aircraft handling characteristics..."
                    className="bg-transparent border border-stone-400/40 p-2 focus:outline-none text-stone-900 rounded font-typewriter placeholder-stone-500 leading-relaxed"
                  />
                </div>

                <div className="col-span-2 flex justify-end gap-2.5 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border border-stone-500 rounded text-stone-800 hover:bg-stone-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-stone-950 text-white rounded hover:bg-stone-800 shadow transition-colors font-bold"
                  >
                    Submit Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : selectedLog ? (
          /* View individual ledger sheet */
          <div className="ledger-paper p-6 rounded-lg min-h-[500px] shadow-2xl relative border-2 border-[#d2c29e] flex flex-col justify-between overflow-hidden">
            {/* Binder details */}
            <div className="absolute top-0 left-12 flex flex-col gap-4 -mt-2">
              <div className="w-4 h-4 rounded-full bg-stone-950 border border-stone-800 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]"></div>
            </div>
            
            <div>
              {/* Ledger Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-dashed border-stone-400/40 pb-4 gap-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-stone-800 shrink-0" />
                  <div>
                    <span className="font-stencil text-[11px] text-red-800 tracking-wider block">
                      OFFICIAL SQUADRON LOGBOOK
                    </span>
                    <h2 className="font-typewriter text-lg font-bold text-stone-900 uppercase">
                      SORTIE REPORT #{selectedLog.id ? selectedLog.id.substring(4, 9).toUpperCase() : 'LOG'}
                    </h2>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Play radio dispatch voice narration button */}
                  <button
                    onClick={handleToggleSpeech}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded text-[9px] font-mono font-bold uppercase transition-all shadow border cursor-pointer ${
                      isSpeaking
                        ? 'bg-red-800 hover:bg-red-900 text-white border-red-950 shadow-[0_0_10px_rgba(185,28,28,0.4)] animate-pulse'
                        : 'bg-[#faf6eb] hover:bg-stone-200 text-stone-900 border-stone-300'
                    }`}
                    title="Read log narrative via 1940s female radio dispatch"
                  >
                    {isSpeaking ? (
                      <>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        STOP RADIO
                      </>
                    ) : (
                      <>
                        <Radio className="w-3.5 h-3.5 text-stone-600" />
                        PLAY NARRATIVE
                      </>
                    )}
                  </button>
                  <div className="font-typewriter text-xs text-stone-600 bg-stone-200/50 border border-stone-300 px-3 py-1 rounded">
                    DATE: <strong>{selectedLog.date}</strong>
                  </div>
                </div>
              </div>

              {/* Core Information Grid */}
              <div className="grid grid-cols-2 gap-4 mt-6 font-typewriter text-xs text-stone-800 border-b border-stone-400/20 pb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                    <span>PILOT: <strong className="text-stone-900">{selectedLog.pilotName}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                    <span>SORTIE DURATION: <strong className="text-stone-900">{selectedLog.duration}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                    <span>MISSION: <strong className="text-stone-900 text-red-800 uppercase font-bold">{selectedLog.mission}</strong></span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1.5">
                    <Bookmark className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                    <span>AIRCRAFT: <strong className="text-stone-900">{selectedLog.aircraftName}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                    <span>THEATER GRID: <strong className="text-stone-900">{selectedLog.location}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                    <span>STATION / AIRBASE: <strong className="text-stone-900">{selectedLog.airbase}</strong></span>
                  </div>
                </div>
              </div>

              {/* Main Log Entry body text */}
              <div className="mt-6 space-y-3">
                <span className="font-stencil text-xs text-stone-900 tracking-wider uppercase block">
                  Post-Flight Intelligence Memo
                </span>
                <p className="font-typewriter text-xs leading-relaxed text-justify text-stone-800 bg-[#faf6eb] p-4 border border-stone-300 rounded shadow-inner whitespace-pre-wrap min-h-[180px]">
                  {selectedLog.logText}
                </p>
              </div>
            </div>

            {/* Bottom stamp */}
            <div className="mt-8 border-t border-stone-400/30 pt-4 flex justify-between items-center font-typewriter text-[10px] text-stone-500">
              <span>SECURITY RATING: RESTRICTED WARTIME ARCHIVE</span>
              <div className="flex items-center gap-1 text-stone-800 font-bold border border-stone-400 px-2 py-0.5 rounded uppercase">
                <span>VERIFIED</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="ledger-paper p-6 rounded-lg min-h-[500px] shadow-2xl relative border-2 border-[#d2c29e] flex items-center justify-center">
            <span className="font-typewriter text-xs text-stone-500">Select a flight log to read archives.</span>
          </div>
        )}
      </div>
    </div>
  );
}
