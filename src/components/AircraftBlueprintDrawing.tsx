import React from 'react';

interface AircraftBlueprintDrawingProps {
  fighterId: string;
  name: string;
  type: 'aircraft' | 'noseart' | 'cockpit';
}

export default function AircraftBlueprintDrawing({ fighterId, name, type }: AircraftBlueprintDrawingProps) {
  // Common drafting table elements: grid lines, circular radar crosshairs, technical markings
  const renderCommonGrid = () => (
    <>
      {/* Drafting board technical grid */}
      <defs>
        <pattern id="blueprint-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#2c2217" strokeWidth="0.5" />
          <path d="M 150 0 L 0 0 0 150" fill="none" stroke="#3a2e1f" strokeWidth="1" />
        </pattern>
        <filter id="glow-gold">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="glow-crimson">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Base blueprint paper texture */}
      <rect width="100%" height="100%" fill="#0a0705" />
      <rect width="100%" height="100%" fill="url(#blueprint-grid)" opacity="0.8" />
      
      {/* Circular target scope crosshair */}
      <circle cx="250" cy="180" r="100" fill="none" stroke="#382e21" strokeWidth="1" strokeDasharray="3 6" />
      <circle cx="250" cy="180" r="50" fill="none" stroke="#453826" strokeWidth="0.75" />
      <circle cx="250" cy="180" r="140" fill="none" stroke="#251e16" strokeWidth="0.5" />
      
      {/* Axis crosshairs */}
      <line x1="50" y1="180" x2="450" y2="180" stroke="#3a2e1f" strokeWidth="0.75" strokeDasharray="5 5" />
      <line x1="250" y1="40" x2="250" y2="320" stroke="#3a2e1f" strokeWidth="0.75" strokeDasharray="5 5" />

      {/* Decorative drafting corner crosshairs */}
      <path d="M 20,40 L 40,40 M 20,40 L 20,60" fill="none" stroke="#524330" strokeWidth="1" />
      <path d="M 480,40 L 460,40 M 480,40 L 480,60" fill="none" stroke="#524330" strokeWidth="1" />
      <path d="M 20,320 L 40,320 M 20,320 L 20,300" fill="none" stroke="#524330" strokeWidth="1" />
      <path d="M 480,320 L 460,320 M 480,320 L 480,300" fill="none" stroke="#524330" strokeWidth="1" />
    </>
  );

  const renderSilhouette = () => {
    // Return custom SVG paths according to fighter ID
    switch (fighterId) {
      case 'p51-mustang':
        return (
          <g filter="url(#glow-gold)" stroke="#eed095" strokeWidth="1.5" fill="none" opacity="0.85">
            {/* Wings (Laminar flow, tapered) */}
            <path d="M 120,180 L 200,165 L 246,165 L 246,195 L 200,195 Z" />
            <path d="M 380,180 L 300,165 L 254,165 L 254,195 L 300,195 Z" />
            {/* Fuselage & Engine Cowl */}
            <path d="M 250,80 Q 256,80 258,110 L 258,260 Q 257,285 250,295 Q 243,285 242,260 L 242,110 Q 244,80 250,80 Z" />
            {/* Cockpit canopy */}
            <path d="M 246,145 Q 250,135 254,145 L 254,190 Q 250,195 246,190 Z" fill="#eed095" fillOpacity="0.15" />
            {/* Radiator belly scoop */}
            <path d="M 244,210 Q 250,205 256,210 L 255,235 L 245,235 Z" />
            {/* Tail stabilizers */}
            <path d="M 220,285 L 242,280 L 242,290 Z" />
            <path d="M 280,285 L 258,280 L 258,290 Z" />
            {/* Propeller Arc */}
            <ellipse cx="250" cy="80" rx="35" ry="6" strokeDasharray="3 3" strokeWidth="1" />
            <line x1="215" y1="80" x2="285" y2="80" strokeWidth="0.75" />
            {/* Gun barrels */}
            <line x1="150" y1="175" x2="150" y2="182" strokeWidth="2" />
            <line x1="160" y1="173" x2="160" y2="180" strokeWidth="2" />
            <line x1="170" y1="171" x2="170" y2="178" strokeWidth="2" />
            <line x1="350" y1="175" x2="350" y2="182" strokeWidth="2" />
            <line x1="340" y1="173" x2="340" y2="180" strokeWidth="2" />
            <line x1="330" y1="171" x2="330" y2="178" strokeWidth="2" />
          </g>
        );

      case 'spitfire-mkix':
        return (
          <g filter="url(#glow-gold)" stroke="#eed095" strokeWidth="1.5" fill="none" opacity="0.85">
            {/* Legendary Elliptical Wings */}
            <path d="M 100,180 C 120,135 190,148 245,162 L 245,198 C 190,212 120,225 100,180 Z" />
            <path d="M 400,180 C 380,135 310,148 255,162 L 255,198 C 310,212 380,225 400,180 Z" />
            {/* Narrow sleek fuselage */}
            <path d="M 250,75 Q 255,75 256,105 L 255,260 Q 255,285 250,295 Q 245,285 245,260 L 244,105 Q 245,75 250,75 Z" />
            {/* Cockpit glass */}
            <path d="M 246,135 Q 250,122 254,135 L 254,175 Q 250,180 246,175 Z" fill="#eed095" fillOpacity="0.15" />
            {/* Elliptical tail elevators */}
            <path d="M 215,280 C 220,268 238,272 245,278 L 245,288 Z" />
            <path d="M 285,280 C 280,268 262,272 255,278 L 255,288 Z" />
            {/* Prop spinner and Rotol blades */}
            <ellipse cx="250" cy="75" rx="38" ry="5" strokeDasharray="2 4" strokeWidth="1" />
            <line x1="250" y1="50" x2="250" y2="100" strokeWidth="0.75" />
            {/* Canonical Hispano cannons extending from wings */}
            <line x1="160" y1="135" x2="160" y2="170" strokeWidth="2.5" />
            <line x1="340" y1="135" x2="340" y2="170" strokeWidth="2.5" />
          </g>
        );

      case 'p38-lightning':
        return (
          <g filter="url(#glow-gold)" stroke="#eed095" strokeWidth="1.5" fill="none" opacity="0.85">
            {/* Wide Wingspan straight wings */}
            <path d="M 70,180 L 140,165 L 360,165 L 430,180 L 360,195 L 140,195 Z" />
            {/* Central Cockpit Nacelle (center pod) */}
            <path d="M 250,110 Q 257,110 258,130 L 258,220 Q 255,240 250,245 Q 245,240 242,220 L 242,130 Q 243,110 250,110 Z" />
            <path d="M 245,140 L 255,140 L 254,185 L 246,185 Z" fill="#eed095" fillOpacity="0.15" />
            {/* Left Engine Boom */}
            <path d="M 170,105 L 176,105 L 178,285 Q 178,295 174,295 Q 170,295 170,285 Z" />
            <ellipse cx="173" cy="105" rx="20" ry="4" strokeDasharray="3 3" />
            {/* Right Engine Boom */}
            <path d="M 330,105 L 336,105 L 338,285 Q 338,295 334,295 Q 330,295 330,285 Z" />
            <ellipse cx="333" cy="105" rx="20" ry="4" strokeDasharray="3 3" />
            {/* Dual tail horizontal stabilizer */}
            <rect x="174" y="275" width="158" height="12" />
          </g>
        );

      case 'bf109-g6':
        return (
          <g filter="url(#glow-gold)" stroke="#eed095" strokeWidth="1.5" fill="none" opacity="0.85">
            {/* Angular squared wings */}
            <path d="M 110,185 L 195,170 L 245,170 L 245,198 L 195,198 Z" />
            <path d="M 390,185 L 305,170 L 255,170 L 255,198 L 305,198 Z" />
            {/* Slim fuselage */}
            <path d="M 250,85 Q 255,85 256,115 L 255,265 Q 254,285 250,292 Q 246,285 245,265 L 244,115 Q 245,85 250,85 Z" />
            {/* Canopy */}
            <path d="M 246,145 L 254,145 L 254,180 L 246,180 Z" fill="#eed095" fillOpacity="0.15" />
            {/* Horizontal Stabilizer squared */}
            <path d="M 224,278 L 276,278 L 270,288 L 230,288 Z" />
            <ellipse cx="250" cy="85" rx="30" ry="5" />
          </g>
        );

      case 'a6m-zero':
        return (
          <g filter="url(#glow-gold)" stroke="#eed095" strokeWidth="1.5" fill="none" opacity="0.85">
            {/* Long high-aspect-ratio tapered wings */}
            <path d="M 80,180 C 130,160 200,165 245,168 L 245,196 C 200,198 130,198 80,180 Z" />
            <path d="M 420,180 C 370,160 300,165 255,168 L 255,196 C 300,198 370,198 420,180 Z" />
            {/* Radial engine wide nose & cowling */}
            <path d="M 250,85 Q 258,85 259,105 L 256,260 Q 254,285 250,292 Q 246,285 244,260 L 241,105 Q 242,85 250,85 Z" />
            <ellipse cx="250" cy="95" rx="12" ry="12" />
            {/* Canopy */}
            <path d="M 246,140 Q 250,130 254,140 L 254,185 Q 250,192 246,185 Z" fill="#eed095" fillOpacity="0.15" />
            {/* Tail stabilizers */}
            <path d="M 220,278 L 242,274 L 242,286 Z" />
            <path d="M 280,278 L 258,274 L 258,286 Z" />
            {/* Big spinning prop */}
            <ellipse cx="250" cy="85" rx="42" ry="6" strokeDasharray="3 3" />
          </g>
        );

      case 'f4u-corsair':
        return (
          <g filter="url(#glow-gold)" stroke="#eed095" strokeWidth="1.5" fill="none" opacity="0.85">
            {/* Iconic Inverted Gull Wings (curving down from roots, then up to tips) */}
            {/* Left Gull Wing */}
            <path d="M 242,165 C 210,175 190,195 180,190 C 160,180 120,170 100,180 C 120,195 160,205 180,198 C 190,202 210,185 242,175 Z" />
            {/* Right Gull Wing */}
            <path d="M 258,165 C 290,175 310,195 320,190 C 340,180 380,170 400,180 C 380,195 340,205 320,198 C 310,202 290,185 258,175 Z" />
            {/* Robust heavy fuselage with long nose */}
            <path d="M 250,75 Q 256,75 258,105 L 256,260 Q 255,285 250,295 Q 245,285 244,260 L 242,105 Q 244,75 250,75 Z" />
            {/* Bubble canopy set far back */}
            <path d="M 246,165 Q 250,155 254,165 L 254,200 Q 250,205 246,200 Z" fill="#eed095" fillOpacity="0.15" />
            {/* Large propeller spinner arc */}
            <ellipse cx="250" cy="75" rx="42" ry="6" strokeDasharray="3 3" />
            {/* Tail stabilizers */}
            <path d="M 220,280 L 242,276 L 242,286 Z" />
            <path d="M 280,280 L 258,276 L 258,286 Z" />
          </g>
        );

      default: // Generic beautifully crafted combat aircraft blueprint wireframe
        return (
          <g filter="url(#glow-gold)" stroke="#eed095" strokeWidth="1.25" fill="none" opacity="0.8">
            {/* Generic fighter layout */}
            <path d="M 110,180 L 245,165 L 245,195 Z" />
            <path d="M 390,180 L 255,165 L 255,195 Z" />
            <path d="M 250,90 L 256,120 L 254,270 L 246,270 L 244,120 Z" />
            <circle cx="250" cy="180" r="15" strokeDasharray="2 2" />
            <ellipse cx="250" cy="90" rx="35" ry="5" />
          </g>
        );
    }
  };

  // Specific layout decoration for noseart & cockpit
  if (type === 'noseart') {
    return (
      <svg viewBox="0 0 500 360" className="w-full h-full font-mono text-stone-400">
        {renderCommonGrid()}
        
        {/* Crest shield outline */}
        <g filter="url(#glow-crimson)" stroke="#dc2626" strokeWidth="1.5" fill="none" opacity="0.6" className="animate-pulse">
          <path d="M 250,60 L 370,60 C 370,180 340,260 250,300 C 160,260 130,180 130,60 Z" />
          <path d="M 250,75 L 350,75 C 350,175 320,245 250,282 C 180,245 150,175 150,75 Z" strokeDasharray="3 3" />
        </g>
        
        {/* Stencil badge markers */}
        <g filter="url(#glow-gold)" stroke="#eed095" strokeWidth="1.25" fill="none" opacity="0.8">
          {/* Symmetrical wing decals in center */}
          <path d="M 180,160 L 230,170 L 230,185 L 190,180 Z" fill="#eed095" fillOpacity="0.1" />
          <path d="M 320,160 L 270,170 L 270,185 L 310,180 Z" fill="#eed095" fillOpacity="0.1" />
          <circle cx="250" cy="175" r="14" />
          <polygon points="250,165 254,173 263,173 256,178 259,187 250,181 241,187 244,178 237,173 246,173" fill="#eed095" />
        </g>
        
        <text x="250" y="325" fill="#eed095" fontSize="10" fontWeight="bold" textAnchor="middle" letterSpacing="2" className="font-stencil">
          SQUADRON COAT-OF-ARMS: {name.toUpperCase()}
        </text>
        <text x="250" y="340" fill="#78716c" fontSize="8" textAnchor="middle">
          NOSE ART WORKSTATION DRAFT // CLASSIFIED INTEL
        </text>
      </svg>
    );
  }

  if (type === 'cockpit') {
    return (
      <svg viewBox="0 0 500 360" className="w-full h-full font-mono text-stone-400">
        {renderCommonGrid()}
        
        {/* Cockpit Arch Console Layout */}
        <g filter="url(#glow-gold)" stroke="#eed095" strokeWidth="1.5" fill="none" opacity="0.8">
          {/* Main instrument shield arch */}
          <path d="M 100,280 C 100,120 150,80 250,80 C 350,80 400,120 400,280 Z" fill="#eed095" fillOpacity="0.05" />
          
          {/* Center flight controls stick */}
          <path d="M 250,280 L 250,220" strokeWidth="4" />
          <circle cx="250" cy="210" r="12" strokeWidth="2" fill="#000" />
          <circle cx="250" cy="210" r="5" strokeWidth="1.5" />
          
          {/* Main dashboard dials (Gauges) */}
          <circle cx="180" cy="150" r="24" strokeWidth="2" />
          <line x1="180" y1="150" x2="195" y2="135" strokeWidth="2" /> {/* Needle */}
          
          <circle cx="250" cy="135" r="20" strokeWidth="2" />
          <line x1="250" y1="135" x2="242" y2="120" strokeWidth="2" stroke="#dc2626" /> {/* Altimeter */}
          
          <circle cx="320" cy="150" r="24" strokeWidth="2" />
          <line x1="320" y1="150" x2="310" y2="168" strokeWidth="2" /> {/* RPM */}
          
          {/* Subsidiary gauge meters */}
          <rect x="140" y="200" width="30" height="30" rx="3" />
          <line x1="140" y1="215" x2="170" y2="215" strokeDasharray="2 2" />
          
          <rect x="330" y="200" width="30" height="30" rx="3" />
          <line x1="330" y1="215" x2="360" y2="215" strokeDasharray="2 2" />
          
          {/* Warning lights */}
          <circle cx="215" cy="190" r="4" fill="#dc2626" stroke="none" className="animate-pulse" />
          <circle cx="285" cy="190" r="4" fill="#ef4444" stroke="none" className="animate-pulse" />
        </g>
        
        <text x="250" y="325" fill="#eed095" fontSize="10" fontWeight="bold" textAnchor="middle" letterSpacing="2" className="font-stencil">
          FLIGHT DECK TELEMETRY: {name.toUpperCase()}
        </text>
        <text x="250" y="340" fill="#78716c" fontSize="8" textAnchor="middle">
          ANALOG INSTRUMENTATION SCHEMATIC // 1940s PATTERN
        </text>
      </svg>
    );
  }

  // Base 'aircraft' profile wireframe view
  return (
    <svg viewBox="0 0 500 360" className="w-full h-full font-mono text-stone-400">
      {renderCommonGrid()}
      
      {/* Flight line background axes */}
      <text x="60" y="70" fill="#78716c" fontSize="8" letterSpacing="1">DRAFTING TABLE RECORD // DECLASSIFIED</text>
      <text x="60" y="85" fill="#eed095" fontSize="12" fontWeight="bold" className="font-stencil">{name.toUpperCase()}</text>
      
      {/* Core Silhouette */}
      {renderSilhouette()}
      
      {/* Dimension Line Markings */}
      <g stroke="#3a2e1f" strokeWidth="0.75" fill="none">
        {/* Wingspan width indicator lines */}
        <line x1="70" y1="310" x2="430" y2="310" />
        <line x1="70" y1="305" x2="70" y2="315" strokeWidth="1.5" />
        <line x1="430" y1="305" x2="430" y2="315" strokeWidth="1.5" />
        
        {/* Height length indicator lines */}
        <line x1="40" y1="75" x2="40" y2="295" />
        <line x1="35" y1="75" x2="45" y2="75" strokeWidth="1.5" />
        <line x1="35" y1="295" x2="45" y2="295" strokeWidth="1.5" />
      </g>
      
      {/* Dimension labels */}
      <text x="250" y="306" fill="#78716c" fontSize="8" textAnchor="middle">WINGS REFERENCE DIAL</text>
      <text x="44" y="190" fill="#78716c" fontSize="8" textAnchor="middle" transform="rotate(-90 44 190)">FUSELAGE DATUM</text>
      
      {/* Blueprint Spec block */}
      <rect x="365" y="60" width="105" height="50" fill="#000" fillOpacity="0.5" stroke="#3d342a" strokeWidth="1" />
      <text x="375" y="72" fill="#eed095" fontSize="7" fontWeight="bold">SQUADRON STATUS</text>
      <text x="375" y="83" fill="#a8a29e" fontSize="7">GRID REF: B-240</text>
      <text x="375" y="94" fill="#10b981" fontSize="7" className="animate-pulse">● AIRWORTHY FEED</text>
    </svg>
  );
}
