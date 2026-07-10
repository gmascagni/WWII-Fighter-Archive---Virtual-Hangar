import React, { useState } from 'react';
import { Shield, ShieldAlert, ShieldCheck, CameraOff, Info } from 'lucide-react';
import AircraftBlueprintDrawing from './AircraftBlueprintDrawing';

interface PhotoAuthenticityBadgeProps {
  isVerified: boolean;
  source: string;
  hasPhoto: boolean;
  type: 'aircraft' | 'pilot' | 'noseart' | 'cockpit';
  tooltipAlign?: 'left' | 'right' | 'center';
}

export function PhotoAuthenticityBadge({
  isVerified,
  source,
  hasPhoto,
  type,
  tooltipAlign = 'right'
}: PhotoAuthenticityBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!hasPhoto) {
    return null;
  }

  // Determine alignment classes
  const alignClasses = {
    left: 'left-0 origin-top-left',
    right: 'right-0 origin-top-right',
    center: 'left-1/2 -translate-x-1/2 origin-top'
  }[tooltipAlign];

  return (
    <div 
      className="absolute top-2.5 right-2.5 z-30 select-none"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={(e) => {
        e.stopPropagation();
        setShowTooltip(!showTooltip);
      }}
    >
      {/* Badge Button */}
      <button
        type="button"
        className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider shadow-md transition-all border cursor-pointer ${
          isVerified
            ? 'bg-emerald-950/90 text-emerald-400 border-emerald-500/40 hover:bg-emerald-900'
            : 'bg-amber-950/90 text-amber-400 border-amber-500/40 hover:bg-amber-900'
        }`}
      >
        {isVerified ? (
          <ShieldCheck className="w-2.5 h-2.5 shrink-0 text-emerald-400" />
        ) : (
          <ShieldAlert className="w-2.5 h-2.5 shrink-0 text-amber-400" />
        )}
        <span>{isVerified ? 'Verified Historical' : 'Modern Recon'}</span>
        <Info className="w-2 h-2 ml-0.5 opacity-60 text-current shrink-0" />
      </button>

      {/* Tooltip Content */}
      <div
        className={`absolute mt-1.5 w-56 p-2.5 rounded-lg border bg-stone-950/95 text-stone-300 font-sans shadow-2xl transition-all duration-200 backdrop-blur-md ${alignClasses} ${
          showTooltip 
            ? 'opacity-100 scale-100 visible' 
            : 'opacity-0 scale-95 invisible pointer-events-none'
        }`}
        style={{ zIndex: 100 }}
      >
        <div className="flex items-start gap-1.5 mb-1">
          {isVerified ? (
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          )}
          <span className={`font-stencil text-[10px] tracking-wider uppercase ${isVerified ? 'text-emerald-400' : 'text-amber-400'}`}>
            {isVerified ? 'Authentic Historical Media' : 'Stock Representation'}
          </span>
        </div>
        <p className="text-[10px] text-stone-300 leading-normal mb-1.5 font-typewriter">
          {isVerified
            ? `Wartime capture authenticated by Military Intelligence Archives. This photograph depicts the actual subject.`
            : `A modern restoration photograph or stock representation of this ${type} is shown because a verified wartime photograph is unavailable in the public archive.`}
        </p>
        <div className="border-t border-stone-800/80 pt-1 flex justify-between items-center font-mono text-[8px] text-stone-400">
          <span>SOURCE:</span>
          <span className="text-[#eed095] font-bold uppercase tracking-wider">{source}</span>
        </div>
      </div>
    </div>
  );
}

interface PhotoPlaceholderProps {
  type: 'aircraft' | 'pilot' | 'noseart' | 'cockpit';
  name: string;
  className?: string;
  fighterId?: string;
}

export function PhotoPlaceholder({ type, name, className = '', fighterId }: PhotoPlaceholderProps) {
  // If we have a fighter ID and it's a structural aircraft/noseart/cockpit asset, render the high-fidelity SVG drafting blueprint
  if (fighterId && type !== 'pilot') {
    return (
      <div className={`relative w-full h-full min-h-[300px] flex items-center justify-center bg-stone-950 rounded-lg overflow-hidden border-2 border-stone-800/60 shadow-inner select-none ${className}`}>
        <AircraftBlueprintDrawing fighterId={fighterId} name={name} type={type} />
      </div>
    );
  }

  return (
    <div className={`relative bg-stone-950/95 border-2 border-stone-800 rounded-lg flex flex-col items-center justify-center p-4 text-center min-h-[150px] shadow-inner select-none ${className}`}>
      {/* Ledger background texture */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-stone-950/80 opacity-70 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-red-950/40 border border-red-900/30 flex items-center justify-center mb-3 text-red-500 animate-pulse">
          <CameraOff className="w-5 h-5" />
        </div>
        
        <div className="font-stencil text-[10px] text-red-400 tracking-widest uppercase font-bold px-2 py-0.5 rounded border border-red-900/30 bg-red-950/10 rotate-[-1deg] mb-2.5">
          UNAVAILABLE / DECLASSIFIED
        </div>
        
        <h4 className="font-typewriter text-xs text-stone-200 font-bold leading-tight uppercase max-w-[180px] mb-1">
          No Verified Photo Available
        </h4>
        
        <p className="font-sans text-[9px] text-stone-400 max-w-[190px] leading-relaxed">
          Historical wartime record search completed. Photographic proof of {name} is currently missing or restricted.
        </p>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-stone-800" />
      <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-stone-800" />
      <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-stone-800" />
      <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-stone-800" />
    </div>
  );
}
