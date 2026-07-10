/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Wrench, 
  BookOpen, 
  User, 
  Flame, 
  Volume2, 
  VolumeX, 
  Radio, 
  Power, 
  Sliders, 
  Award,
  Globe,
  Gauge,
  HelpCircle,
  Camera,
  Shield,
  Images
} from 'lucide-react';

import { FighterAircraft, PilotStory, FlightLog } from './types';
import { fightersData } from './data/fighters';
import PilotStories from './components/PilotStories';
import FlightLogs from './components/FlightLogs';
import HangarManager from './components/HangarManager';
import NoseArtGallery from './components/NoseArtGallery';
import AlliedWarbirdsRegistry from './components/AlliedWarbirdsRegistry';
import { audioEngine } from './components/AudioEngine';
import { PhotoAuthenticityBadge, PhotoPlaceholder } from './components/PhotoAuthenticityBadge';
import AviationMediaManager from './components/AviationMediaManager';
import ArtistRenditionCanvas from './components/ArtistRenditionCanvas';

// Historic aviation specs hotspots for realistic declassified photo inspection
const FIGHTER_HOTSPOTS: Record<string, { x: number; y: number; title: string; desc: string }[]> = {
  'p51-mustang': [
    { x: 30, y: 55, title: 'Rolls-Royce Merlin V-12 Engine', desc: 'The V-1650-7 supercharged motor gave the Mustang peerless speed and power above 25,000 feet, allowing it to escort Allied bomber streams deep into German airspace.' },
    { x: 52, y: 35, title: 'Sliding Bubble Canopy', desc: 'Provided pilots with an unobstructed 360-degree field of view, critical for spotting Luftwaffe ambush attempts early in high-altitude dogfights.' },
    { x: 74, y: 58, title: 'Laminar Flow Airfoil Wing', desc: 'A revolutionary low-drag wing shape that maintained clean laminar boundary air flow, drastically improving fuel economy and cruise speed.' },
    { x: 80, y: 72, title: 'Ventral Radiator scoop', desc: 'Exploited the Meredith Effect—where expanding heated air passing through the radiator created net positive jet thrust, offsetting aerodynamic drag.' }
  ],
  'spitfire-mkix': [
    { x: 25, y: 52, title: 'Rotol Four-Blade Propeller', desc: 'Matched with the Merlin 66 engine and two-stage supercharger to optimize climb rates and throttle response during dogfights.' },
    { x: 45, y: 48, title: 'Dual Hispano 20mm Cannons', desc: 'Allowed Spitfire pilots to deliver crushing firepower, shredding German Messerschmitts and heavy bombers with explosive ammunition.' },
    { x: 70, y: 62, title: 'Elliptical Airfoil Design', desc: 'Unbelievably thin and aerodynamically perfect. It delivered low induced drag and gave the Spitfire its legendary, matchless turning radius.' }
  ],
  'bf109-g6': [
    { x: 28, y: 56, title: 'DB 605 Inverted V12 engine', desc: 'Equipped with direct fuel injection, which prevented engine cutout during intense negative-G maneuvers and vertical dives.' },
    { x: 55, y: 42, title: 'Erla Haube armored Canopy', desc: 'Thick bulletproof glass and steel headplates protecting German Aces from bomber tail-gunners during intercept passes.' },
    { x: 48, y: 72, title: 'Narrow-Track Outward Retracting Gear', desc: 'Mounted directly to the fuselage, making the aircraft extremely light in flight, but notoriously unstable and prone to ground-looping on rough dirt runways.' }
  ],
  'p38-lightning': [
    { x: 20, y: 58, title: 'Allison V-1710 Twin Propulsion', desc: 'Two powerful liquid-cooled V12 engines gave the Lightning immense speed, rapid climbing, and a critical safety backup over wide ocean expanses.' },
    { x: 50, y: 44, title: 'Concentrated Nose Firepower', desc: 'With four .50 caliber machine guns and a 20mm cannon clustered in the center nose, pilots could strike targets accurately at 500 yards without worrying about wing gun convergence.' },
    { x: 82, y: 60, title: 'Twin-Boom Structural Spine', desc: 'Offered superb airframe stability and structural integrity under heavy dive loads while serving as the perfect fairing for the engine turbo-superchargers.' }
  ],
  'a6m-zero': [
    { x: 25, y: 55, title: 'Sakae 12 Radial Engine', desc: 'A highly reliable, compact 14-cylinder air-cooled radial motor that delivered outstanding power-to-weight performance.' },
    { x: 68, y: 60, title: 'ESD Extra Super Duralumin', desc: 'Secretly developed ultra-light zinc-aluminum alloy. The Zero had no heavy self-sealing fuel tanks or pilot armor, trading defense for supernatural turn speed and climb.' },
    { x: 88, y: 65, title: 'Folding Carrier Wingtips', desc: 'Manual hinges allowed the Zero’s long, high-lift wings to fit safely inside the narrow aircraft elevator shafts of Imperial Navy fleet carriers.' }
  ],
  'f4u-corsair': [
    { x: 22, y: 58, title: 'Pratt & Whitney R-2800 Engine', desc: 'The massive 2,000 hp Double Wasp radial engine. It spun a giant 13-foot three-blade propeller, delivering extreme high-speed and diving energy.' },
    { x: 42, y: 72, title: 'Inverted Gull Wing Elbow', desc: 'The iconic bent-wing shape allowed short, rugged landing gear legs while still giving the enormous propeller ample ground clearance.' },
    { x: 62, y: 40, title: 'Rear-Set Cockpit Placement', desc: 'Repositioned far back behind the massive fuel tanks, giving the Corsair its characteristic long nose and making taxi visibility difficult.' }
  ],
  'f6f-hellcat': [
    { x: 20, y: 56, title: 'Cowled Radial Engine', desc: 'Equipped with a Pratt & Whitney R-2800-10W engine, providing incredible takeoff power and reliable operations on carrier flight decks.' },
    { x: 50, y: 35, title: 'Thick Cockpit Armor Plates', desc: 'Surrounded the pilot with hundreds of pounds of bullet-resistant glass and heavy steel armor plating, creating unmatched survival rates.' },
    { x: 78, y: 68, title: 'Wide-Track Rugged Struts', desc: 'Heavy-duty hydraulic landing gear designed to absorb the violent, high-impact carrier landings on rolling ocean decks.' }
  ],
  'p47-thunderbolt': [
    { x: 24, y: 58, title: 'Pratt & Whitney Double Wasp', desc: 'A colossal 18-cylinder radial engine. Coupled with water-injection boosting, it could produce over 2,500 hp for high-altitude interception.' },
    { x: 45, y: 62, title: 'Eight .50 Caliber Machine Guns', desc: 'Four Browning guns buried deep in each wing, delivering a crushing hail of steel that could literally saw German fighters in half.' },
    { x: 85, y: 65, title: 'Tail-Mounted Turbosupercharger', desc: 'A complex ducting system routed exhaust gases all the way to a turbine in the rear fuselage, maintaining sea-level engine power at 30,000 feet.' }
  ],
  'p40-warhawk': [
    { x: 18, y: 62, title: 'Serrated Shark Teeth Nose Art', desc: 'The world-famous styling of the Flying Tigers in China. The large lower chin radiator duct provided the perfect canvas for intimidating shark mouth designs.' },
    { x: 38, y: 54, title: 'Allison V-1710 Liquid-Cooled V12', desc: 'Extremely rugged engine with direct-acting valve gears, optimized for lower-altitude dogfighting and close air support duties.' },
    { x: 75, y: 60, title: 'Heavy Self-Sealing Fuel Tanks', desc: 'Multi-layer rubber and leather tank bladders that automatically swelled to plug bullet holes, preventing fuel fires in combat.' }
  ],
  'f8f-bearcat': [
    { x: 22, y: 56, title: 'Pratt & Whitney R-2800-34W', desc: 'The absolute peak of radial power. Combined with a tiny, stripped-down airframe, it gave the Bearcat a climb rate of 4,500 feet per minute.' },
    { x: 52, y: 32, title: 'Teardrop Bubble Canopy', desc: 'Provides flawless 360-degree pilot visibility with zero framing obstructions, a dramatic leap forward from early-war greenhouse canopies.' },
    { x: 80, y: 60, title: 'Safety Flush Safety Wings', desc: 'Engineered with breakaway wingtips. If structural G-limits were exceeded in high-speed dive recoveries, the outer wingtips snapped off cleanly, keeping the plane flyable.' }
  ]
};

// Factual cockpit hotspots for highly authentic instrumentation inspection
const COCKPIT_HOTSPOTS: Record<string, { x: number; y: number; title: string; desc: string }[]> = {
  'p51-mustang': [
    { x: 48, y: 45, title: 'Altimeter Indicator', desc: 'A Kollsman-type altimeter reading up to 50,000 feet with barometric pressure adjustments (Kollsman window) for precise altitude tracking.' },
    { x: 35, y: 35, title: 'Airspeed Indicator', desc: 'Calibrated up to 700 mph, with clear red lines indicating structural limit dive speeds (Vne at 505 mph).' },
    { x: 22, y: 65, title: 'Throttle Quadrant', desc: 'Controls fuel-air mixture, propeller RPM pitch, and manifold throttle pressure, mounted on the left side console for easy left-hand adjustments.' },
    { x: 65, y: 55, title: 'Manifold Pressure Gauge', desc: 'Measures engine intake pressure in inches of mercury (inHg). Vital for supervising the Merlin engine supercharger gears.' }
  ],
  'spitfire-mkix': [
    { x: 50, y: 68, title: 'Spade Grip Control Stick', desc: 'The signature British oval-shaped spade grip ring control column, including the brass pneumatic brake lever and gun trigger switch.' },
    { x: 38, y: 40, title: 'Boost Pressure Gauge', desc: 'Indicates supercharged induction boost in pounds per square inch (psi). High-power settings required monitoring boost levels closely.' },
    { x: 62, y: 40, title: 'Engine Speed Indicator (RPM)', desc: 'Analog tachometer measuring propeller and drive shaft rotations, with safe cruising bands marked.' },
    { x: 50, y: 25, title: 'Reflector Sight Mk II', desc: 'An optical combat gunsight projecting a glowing red ring-and-dot reticle directly onto a glass reflector plate.' }
  ],
  'p38-lightning': [
    { x: 50, y: 62, title: 'Whip Yoke Flight Control', desc: 'A dual-handled control wheel instead of a standard flight stick, designed to ease heavy aerodynamic forces during high-speed combat.' },
    { x: 32, y: 42, title: 'Dual Manifold Gauges', desc: 'Twin pressure gauges to independently balance the intake pressures of the left and right Allison V-12 supercharged engines.' },
    { x: 68, y: 42, title: 'Dual Tachometers', desc: 'Separate engine speed indicators used by the pilot to synchronize the rotation frequencies of both propellers.' },
    { x: 48, y: 28, title: 'Armament Selector Box', desc: 'Centrally mounted toggle panel allowing the pilot to select firing configurations for the nose-clustered .50 cal machine guns and 20mm cannon.' }
  ],
  'f4u-corsair': [
    { x: 50, y: 30, title: 'Mark VIII Reflector Gunsight', desc: 'Projects a glowing ring-and-dot reticle on the armored windscreen, essential for tracking fast-moving Zeros in deflection shooting.' },
    { x: 35, y: 48, title: 'Carrier Landing Hook Lever', desc: 'Deploys the heavy tailhook at the rear of the aircraft to catch arresting wires on aircraft carrier flight decks.' },
    { x: 20, y: 65, title: 'Fuel Valve Selector Quadrant', desc: 'Main fuel tank valve control, mounted within easy reach on the left bulkhead panel for fast tank switches during combat maneuvers.' },
    { x: 68, y: 52, title: 'Double Wasp Manifold Pressure Dial', desc: 'Monitors the massive 2,000 hp R-2800 engine supercharger boost levels, critical for preventing engine overboost.' }
  ],
  'f6f-hellcat': [
    { x: 48, y: 68, title: 'Robust Flight Grip Column', desc: 'A sturdy, heavy-duty control stick equipped with a master weapons trigger and bomb/rocket release button.' },
    { x: 32, y: 38, title: 'Airspeed & Bank Indicators', desc: 'Essential flight gauges clustered directly in front of the pilot to assist with blind instrument flying or landing in bad weather.' },
    { x: 64, y: 45, title: 'Cylinder Head Temp Gauge', desc: 'Monitors the temperature of the R-2800 radial cylinders. Overheating would lead to catastrophic engine failure on long overwater patrols.' },
    { x: 50, y: 20, title: 'Armored Pilot Backrest', desc: 'Thick, steel backing plate shielding the pilot from rear machine gun fire during intense dogfights.' }
  ],
  'p47-thunderbolt': [
    { x: 22, y: 62, title: 'Supercharger Auxiliary Boost Lever', desc: 'Controls the exhaust turbine in the rear tail, providing immense water-injection power boosts at high altitudes.' },
    { x: 48, y: 38, title: 'Reflector Sight & Bulletproof Windshield', desc: 'Main gunsight backed by a thick laminate glass pane that could withstand direct 20mm shrapnel hits.' },
    { x: 35, y: 50, title: '8-Gun Armament Panel', desc: 'Switches to toggle individual gun banks or configure the wings to fire rockets and heavy 500 lb general-purpose bombs.' },
    { x: 68, y: 48, title: 'Manifold & Oil Temp Instruments', desc: 'Primary gauges monitoring the health of the massive, complex Pratt & Whitney engine systems.' }
  ],
  'p40-warhawk': [
    { x: 48, y: 65, title: 'Mechanical Prop Pitch Handle', desc: 'Manually adjusts the angle of the Curtiss electric propeller blades to balance fuel economy with full combat thrust.' },
    { x: 30, y: 45, title: 'Emergency Hydraulic Hand Pump', desc: 'A manual lever that allowed the pilot to hand-crank the landing gear down if engine hydraulic lines were severed by enemy fire.' },
    { x: 62, y: 52, title: 'Allison Coolant Temp Dial', desc: 'Monitors glycol coolant temperature. The P-40 was highly vulnerable to radiator leaks, making this gauge vital.' }
  ],
  'f8f-bearcat': [
    { x: 50, y: 48, title: 'Symmetrical G-Meter Dial', desc: 'An analog accelerometer tracking instantaneous G-loads. Essential for prevent pilot blackout in the Bearcat’s insane +9G turns.' },
    { x: 34, y: 36, title: 'Climb Rate Indicator', desc: 'Measures vertical velocity in thousands of feet per minute, tracking the Bearcat\'s unmatched rocket-like climb.' },
    { x: 20, y: 60, title: 'Left Consolidated Throttle Console', desc: 'An advanced, ergonomic single-lever throttle combining engine RPM, manifold boost, and water-injection overrides.' },
    { x: 65, y: 40, title: 'Compact Electric Gyro Horizon', desc: 'Modern attitude indicator providing rapid, reliable horizon tracking during high-speed low-altitude aerobatics.' }
  ]
};

export default function App() {
  // Navigation active state
  const [activeTab, setActiveTab] = useState<'hangar' | 'fighters' | 'pilots' | 'logs' | 'noseart' | 'registry' | 'pilots-all'>('hangar');
  
  // Master data state with local storage overrides to resolve CORS/loading issues permanently
  const [fighters, setFighters] = useState<FighterAircraft[]>(() => {
    const savedCustomizations = localStorage.getItem('warbird_fighter_custom_images');
    if (savedCustomizations) {
      try {
        const customs = JSON.parse(savedCustomizations);
        return fightersData.map(f => {
          if (customs[f.id]) {
            const updated = { ...f };
            // Safely only override if custom url is non-empty, and sanitize leading slash (ignore remote HTTP URLs to prevent broken wikimedia hotlinks)
            if (customs[f.id].posterUrl && customs[f.id].posterUrl.trim() !== '' && !customs[f.id].posterUrl.startsWith('http')) {
              updated.posterUrl = customs[f.id].posterUrl.replace(/^\/images\//, 'images/');
            }
            if (customs[f.id].noseArtUrl && customs[f.id].noseArtUrl.trim() !== '' && !customs[f.id].noseArtUrl.startsWith('http')) {
              updated.noseArtUrl = customs[f.id].noseArtUrl.replace(/^\/images\//, 'images/');
            }
            if (customs[f.id].cockpitUrl && customs[f.id].cockpitUrl.trim() !== '' && !customs[f.id].cockpitUrl.startsWith('http')) {
              updated.cockpitUrl = customs[f.id].cockpitUrl.replace(/^\/images\//, 'images/');
            }
            return updated;
          }
          return f;
        });
      } catch (e) {
        console.error('Error loading custom fighter images', e);
      }
    }
    return fightersData;
  });
  
  // Currently focused aircraft in the Encyclopedia
  const [focusedFighter, setFocusedFighter] = useState<FighterAircraft>(() => fighters[0]);
  
  // Currently selected subview inside the Aircraft Encyclopedia tab (supporting custom media desk)
  const [fighterSubView, setFighterSubView] = useState<'photos' | 'cockpit' | 'specs' | 'media'>('photos');
  const [activeHotspot, setActiveHotspot] = useState<{ title: string; desc: string } | null>(null);
  const [showNoseArtDecal, setShowNoseArtDecal] = useState<boolean>(false);
  const [reconPhotoMode, setReconPhotoMode] = useState<'photo' | 'wireframe'>('photo');
  
  // State tracking image load failures to gracefully render SVG drafting blueprints
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Reset failed image states on tab changes to auto-retry loading
  useEffect(() => {
    setFailedImages({});
  }, [activeTab]);

  // Handlers to customize and override fighter images (remedying CORS blockages)
  const handleUpdateFighterImages = (fighterId: string, updates: { posterUrl?: string; noseArtUrl?: string; cockpitUrl?: string }) => {
    setFighters(prev => {
      const next = prev.map(f => {
        if (f.id === fighterId) {
          const updated = { ...f, ...updates };
          // If current focused fighter is updated, sync its active instance
          if (focusedFighter.id === fighterId) {
            setFocusedFighter(updated);
          }
          return updated;
        }
        return f;
      });

      // Persist in localStorage for permanent session recovery
      try {
        const savedCustomizations = localStorage.getItem('warbird_fighter_custom_images');
        let customs: Record<string, any> = {};
        if (savedCustomizations) {
          customs = JSON.parse(savedCustomizations);
        }
        customs[fighterId] = { ...(customs[fighterId] || {}), ...updates };
        localStorage.setItem('warbird_fighter_custom_images', JSON.stringify(customs));
      } catch (e) {
        console.error(e);
      }

      return next;
    });

    // Reset error trackers since new image file/link is applied
    if (updates.posterUrl) setFailedImages(prev => ({ ...prev, [updates.posterUrl!]: false }));
    if (updates.noseArtUrl) setFailedImages(prev => ({ ...prev, [updates.noseArtUrl!]: false }));
    if (updates.cockpitUrl) setFailedImages(prev => ({ ...prev, [updates.cockpitUrl!]: false }));
  };

  const handleResetFighterImages = (fighterId: string) => {
    const original = fightersData.find(x => x.id === fighterId);
    if (original) {
      setFailedImages(prev => ({
        ...prev,
        [original.posterUrl!]: false,
        [original.noseArtUrl!]: false,
        [original.cockpitUrl!]: false
      }));
    }
    setFighters(prev => {
      const next = prev.map(f => {
        if (f.id === fighterId) {
          const restored = original ? { 
            ...f, 
            posterUrl: original.posterUrl, 
            noseArtUrl: original.noseArtUrl, 
            cockpitUrl: original.cockpitUrl 
          } : f;
          
          if (focusedFighter.id === fighterId) {
            setFocusedFighter(restored);
          }
          return restored;
        }
        return f;
      });

      // Purge from localStorage
      try {
        const savedCustomizations = localStorage.getItem('warbird_fighter_custom_images');
        if (savedCustomizations) {
          const customs = JSON.parse(savedCustomizations);
          delete customs[fighterId];
          localStorage.setItem('warbird_fighter_custom_images', JSON.stringify(customs));
        }
      } catch (e) {
        console.error(e);
      }

      return next;
    });
  };
  
  // Extract all pilot profiles from the aircraft data to build a master list
  const [pilots] = useState<PilotStory[]>(() => {
    const list: PilotStory[] = [];
    fightersData.forEach((f) => {
      f.pilotStories.forEach((p) => {
        if (!list.some(x => x.id === p.id)) {
          list.push(p);
        }
      });
    });
    return list;
  });

  // Master historical flight logs list + custom logs state
  const [flightLogs, setFlightLogs] = useState<FlightLog[]>(() => {
    const list: FlightLog[] = [];
    fightersData.forEach((f) => {
      f.flightLogs.forEach((log) => {
        if (!list.some(x => x.id === log.id)) {
          list.push(log);
        }
      });
    });
    return list;
  });

  // Audio state
  const [audioActive, setAudioActive] = useState<boolean>(false);
  const [audioVolume, setAudioVolume] = useState<number>(0.2);
  const [radioFreq, setRadioFreq] = useState<string>('84.5');
  const [engineSetting, setEngineSetting] = useState<'single' | 'twin'>('single');

  // Currently selected Hangar aircraft's model ID
  const [selectedHangarModelId, setSelectedHangarModelId] = useState<string | null>(null);

  // Clear active hotspot detail and reset decal view on fighter model switch
  useEffect(() => {
    setActiveHotspot(null);
    setShowNoseArtDecal(false);
  }, [focusedFighter]);

  // Dynamically computed background image URL based on current screen selection
  const currentBgImage = React.useMemo(() => {
    if (activeTab === 'fighters' && focusedFighter) {
      return focusedFighter.posterUrl;
    }
    if (activeTab === 'hangar' && selectedHangarModelId) {
      const model = fighters.find(f => f.id === selectedHangarModelId);
      if (model) return model.posterUrl;
    }
    // Default fallback (beautiful vintage clouds/sky)
    return "https://images.unsplash.com/photo-1473830394358-91588751b241?q=50&w=2000&auto=format&fit=crop&blur=4";
  }, [activeTab, focusedFighter, selectedHangarModelId, fighters]);

  // Handle live audio updates on state change
  useEffect(() => {
    if (audioActive) {
      audioEngine.start();
      audioEngine.setVolume(audioVolume);
      audioEngine.setEngineType(engineSetting);
    } else {
      audioEngine.stop();
    }
  }, [audioActive, engineSetting]);

  useEffect(() => {
    audioEngine.setVolume(audioVolume);
  }, [audioVolume]);

  const handleToggleAudio = () => {
    audioEngine.playClick();
    setAudioActive(!audioActive);
  };

  const handleChangeEngineSetting = (type: 'single' | 'twin') => {
    audioEngine.playClick();
    setEngineSetting(type);
    setRadioFreq(type === 'single' ? '84.5' : '101.3');
  };

  // Manual log submission from form
  const handleAddNewManualLog = (newLogData: Omit<FlightLog, 'id'>) => {
    const log: FlightLog = {
      ...newLogData,
      id: `log-custom-${Date.now()}`
    };
    setFlightLogs(prev => [log, ...prev]);
  };

  return (
    <div className="min-h-screen pb-16 relative overflow-x-hidden" id="app-viewport">
      {/* Smoothly transitioning Crimson Skies background image overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-1000 ease-in-out bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `radial-gradient(circle at 50% 30%, rgba(20, 22, 28, 0.45) 0%, rgba(7, 9, 14, 0.99) 100%), url(${currentBgImage})`,
          filter: "hue-rotate(325deg) sepia(0.3) saturate(1.3) brightness(0.15) contrast(1.15)"
        }}
      />
      {/* Crimson Skies Cockpit Dashboard Header Banner */}
      <header className="relative w-full warbird-panel warbird-screws py-6 px-4 md:px-8 shadow-2xl rounded-none border-t-0 border-x-0 border-b-8">
        <div className="rivet-row-top" />
        <div className="rivet-row-bottom" />
        {/* Soft gold radial backlight glow in the top-left */}
        <div className="absolute -left-12 -top-12 w-48 h-48 bg-[#dfb743]/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header container matching Crimson Skies style */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6 relative z-10">
               {/* LEFT: Winged Crest Badge & Brand */}
          <div className="flex items-center gap-5 text-center md:text-left">
            {/* Early Army Air Corps / Air Forces One-Star Stripe Logo */}
            <div className="hidden sm:block shrink-0 relative bg-slate-900/80 p-2 rounded-xl border border-white/10 shadow-lg">
              <img 
                src="images/usaac_insignia.jpg" 
                alt="USAAC Insignia" 
                className="w-16 h-16 object-cover rounded-lg border border-white/5" 
              />
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-[#dfb743] text-slate-950 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest scale-90 shadow-md">
                v3.0.0
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="font-mono text-[10px] text-[#dfb743] tracking-widest uppercase bg-white/5 px-2.5 py-1 rounded border border-white/5 shadow-inner">
                  SQUADRON DECK
                </span>
                <span className="text-[10px] text-green-400 font-mono flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-white/5">
                  <span className="indicator-light light-green"></span> SYSTEM ONLINE
                </span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl text-white tracking-wide uppercase leading-none mt-2 font-normal">
                SQUADRON <span className="text-[#dfb743] italic font-light">AIRCORE</span>
              </h1>
              <p className="font-mono text-[9px] text-[#dfb743]/60 uppercase tracking-widest mt-1.5">
                WAR DEPARTMENT ARCHIVE // DECLASSIFIED LEDGER 1944-A
              </p>
            </div>
          </div>

          {/* CENTER/RIGHT: Audio & Nose Art Combo */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            
            {/* Interactive Cockpit Sound Console widget with Rounded Bezels */}
            <div className="glass-panel px-4 py-2.5 flex items-center gap-4 relative">
              <div className="absolute -top-2.5 left-4 px-2 bg-[#07090e] text-[8px] font-mono font-bold text-[#dfb743] tracking-wider uppercase border border-white/5 rounded">
                RECEIVER TUNING
              </div>
              
              {/* Toggle button */}
              <button
                onClick={handleToggleAudio}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  audioActive 
                    ? 'bg-[#dfb743] text-slate-950 border-[#dfb743] shadow-[0_0_15px_rgba(223,183,67,0.3)]' 
                    : 'bg-white/5 text-slate-400 border-white/5 hover:text-white hover:bg-white/10'
                }`}
                id="cockpit-power-btn"
                title="Toggle Cockpit Audio Synth"
              >
                <Power className="w-4 h-4" />
              </button>

              {/* Audio Info */}
              <div className="font-mono text-[10px] flex flex-col justify-center min-w-[110px]">
                <span className="text-slate-500 uppercase tracking-widest text-[8px] font-bold">PILOT LINK</span>
                <span className={`font-bold transition-all ${audioActive ? 'text-[#dfb743]' : 'text-slate-500'}`}>
                  {audioActive ? `TUNED: ${radioFreq} MHz` : 'RECEIVER OFF'}
                </span>
                <span className="text-[9px] text-[#dfb743]/60 mt-0.5">
                  {audioActive ? (engineSetting === 'single' ? 'Merlin V12 Humming' : 'Twin Allison Roar') : 'Click power to prime'}
                </span>
              </div>

              {/* Tuning toggle */}
              {audioActive && (
                <div className="flex flex-col gap-1 border-l border-white/10 pl-3">
                  <button
                    onClick={() => handleChangeEngineSetting('single')}
                    className={`px-2 py-0.5 text-[8px] font-bold rounded transition-colors cursor-pointer ${engineSetting === 'single' ? 'bg-[#dfb743] text-slate-950' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                  >
                    V12
                  </button>
                  <button
                    onClick={() => handleChangeEngineSetting('twin')}
                    className={`px-2 py-0.5 text-[8px] font-bold rounded transition-colors cursor-pointer ${engineSetting === 'twin' ? 'bg-[#dfb743] text-slate-950' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                  >
                    ALLISON
                  </button>
                </div>
              )}

              {/* Volume slider */}
              <div className="flex flex-col gap-1 items-center border-l border-white/10 pl-3">
                <span className="text-[8px] font-mono text-slate-500">GAIN</span>
                <input
                  type="range"
                  min="0"
                  max="0.5"
                  step="0.05"
                  value={audioVolume}
                  onChange={(e) => setAudioVolume(Number(e.target.value))}
                  className="w-12 h-1 accent-[#dfb743] bg-white/10 rounded appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* FAR RIGHT: Authentic AirCore Insignia Branding Card */}
            <div className="glass-panel px-4 py-2.5 flex items-center gap-3.5 relative">
              {/* Retro badge frame with early AirCore emblem */}
              <div className="relative w-14 h-14 bg-slate-950 rounded-full border border-[#bfa56a]/30 overflow-hidden shrink-0 flex items-center justify-center">
                <img 
                  src="images/usaac_insignia.jpg" 
                  alt="USAAC Emblem" 
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>

              {/* Insignia Branding Text */}
              <div className="font-mono text-left select-none">
                <span className="font-serif text-xs text-white leading-none block font-semibold uppercase tracking-wider">
                  AirCore Division
                </span>
                <span className="text-[9px] text-[#dfb743] uppercase block font-bold tracking-widest mt-1">
                  1st Star & Stripe
                </span>
                <span className="text-[7.5px] text-slate-500 uppercase block font-sans">
                  OFFICIAL SQUADRON MARKINGS
                </span>
              </div>
            </div>

          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-8 relative z-10" id="main-content-layout">
        {/* Navigation Tabs Console - 3D Tactile Cockpit Switches */}
        <nav className="flex flex-wrap gap-2.5 pb-4 border-b border-white/10 mb-8" id="cockpit-tabs-navigation">
          <button
            onClick={() => { audioEngine.playClick(); setActiveTab('hangar'); }}
            className={`flex items-center gap-2 py-3 px-4 min-h-[44px] text-[10px] font-bold uppercase rounded-lg transition-all cursor-pointer shadow-md ${
              activeTab === 'hangar'
                ? 'skeuo-push-btn text-slate-950 scale-[0.98] translate-y-0.5'
                : 'bg-slate-900/60 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            id="nav-hangar-tab"
          >
            <Shield className="w-4 h-4" />
            Command Deck
          </button>

          <button
            onClick={() => { audioEngine.playClick(); setActiveTab('fighters'); }}
            className={`flex items-center gap-2 py-3 px-4 min-h-[44px] text-[10px] font-bold uppercase rounded-lg transition-all cursor-pointer shadow-md ${
              activeTab === 'fighters'
                ? 'skeuo-push-btn text-slate-950 scale-[0.98] translate-y-0.5'
                : 'bg-slate-900/60 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            id="nav-encyclopedia-tab"
          >
            <Compass className="w-4 h-4 animate-spin-slow" />
            Encyclopedia
          </button>

          <button
            onClick={() => { audioEngine.playClick(); setActiveTab('logs'); }}
            className={`flex items-center gap-2 py-3 px-4 min-h-[44px] text-[10px] font-bold uppercase rounded-lg transition-all cursor-pointer shadow-md ${
              activeTab === 'logs'
                ? 'skeuo-push-btn text-slate-950 scale-[0.98] translate-y-0.5'
                : 'bg-slate-900/60 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            id="nav-logs-tab"
          >
            <BookOpen className="w-4 h-4" />
            Logbook Ledger
          </button>

          <button
            onClick={() => { audioEngine.playClick(); setActiveTab('pilots'); }}
            className={`flex items-center gap-2 py-3 px-4 min-h-[44px] text-[10px] font-bold uppercase rounded-lg transition-all cursor-pointer shadow-md ${
              activeTab === 'pilots'
                ? 'skeuo-push-btn text-slate-950 scale-[0.98] translate-y-0.5'
                : 'bg-slate-900/60 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            id="nav-dossiers-tab"
          >
            <User className="w-4 h-4" />
            Tuskegee Airmen
          </button>

          <button
            onClick={() => { audioEngine.playClick(); setActiveTab('pilots-all'); }}
            className={`flex items-center gap-2 py-3 px-4 min-h-[44px] text-[10px] font-bold uppercase rounded-lg transition-all cursor-pointer shadow-md ${
              activeTab === 'pilots-all'
                ? 'skeuo-push-btn text-slate-950 scale-[0.98] translate-y-0.5'
                : 'bg-slate-900/60 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            id="nav-pilots-all-tab"
          >
            <User className="w-4 h-4" />
            All Pilots
          </button>

          <button
            onClick={() => { audioEngine.playClick(); setActiveTab('noseart'); }}
            className={`flex items-center gap-2 py-3 px-4 min-h-[44px] text-[10px] font-bold uppercase rounded-lg transition-all cursor-pointer shadow-md ${
              activeTab === 'noseart'
                ? 'skeuo-push-btn text-slate-950 scale-[0.98] translate-y-0.5'
                : 'bg-slate-900/60 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            id="nav-noseart-tab"
          >
            <Images className="w-4 h-4" />
            Nose Art
          </button>

          <button
            onClick={() => { audioEngine.playClick(); setActiveTab('registry'); }}
            className={`flex items-center gap-2 py-3 px-4 min-h-[44px] text-[10px] font-bold uppercase rounded-lg transition-all cursor-pointer shadow-md ${
              activeTab === 'registry'
                ? 'skeuo-push-btn text-slate-950 scale-[0.98] translate-y-0.5'
                : 'bg-slate-900/60 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            id="nav-registry-tab"
          >
            <Globe className="w-4 h-4" />
            Photo Logs
          </button>
        </nav>

        {/* Core dynamic body viewport (with motion animations) */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === 'hangar' && (
              <motion.div
                key="hangar"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <HangarManager
                  fighters={fighters}
                  pilots={pilots}
                  onSelectHangarAircraft={setSelectedHangarModelId}
                  onSwitchToTab={(tab) => {
                    audioEngine.playClick();
                    setActiveTab(tab);
                  }}
                />
              </motion.div>
            )}

            {activeTab === 'fighters' && (
              <motion.div
                key="fighters"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative"
                id="fighters-encyclopedia"
              >
                {/* Selected Fighter Nose Art Watermark Backdrop (Semi-transparent background) */}
                {focusedFighter.noseArtUrl && !failedImages[focusedFighter.noseArtUrl] && (
                  <div 
                    className="absolute inset-0 z-0 pointer-events-none opacity-[0.09] bg-contain bg-center bg-no-repeat transition-all duration-700 select-none" 
                    style={{ backgroundImage: `url(${focusedFighter.noseArtUrl})` }}
                  />
                )}

                {/* Airplane Model selector sidebar */}
                <div className="lg:col-span-4 flex flex-col gap-5 relative z-10">
                  <div className="warbird-panel warbird-screws p-5">
                    <div className="rivet-row-top" />
                    <span className="font-stencil text-xs text-[#eed095] tracking-wider uppercase mb-3 block border-b border-white/10 pb-2 font-bold">
                      Select Aircraft Blueprint
                    </span>
                    <div className="flex flex-col gap-2.5 relative z-10">
                      {fighters.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => { audioEngine.playClick(); setFocusedFighter(f); }}
                          className={`p-3 rounded-lg text-left transition-all border flex items-center gap-3 cursor-pointer ${
                            focusedFighter.id === f.id
                              ? 'skeuo-push-btn-red text-white border-2'
                              : 'bg-slate-950/80 border-white/5 text-slate-300 hover:bg-slate-900/60'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded-full shrink-0 ${f.faction === 'allied' ? 'bg-blue-600 shadow-[0_0_8px_#2563eb]' : 'bg-red-600 shadow-[0_0_8px_#dc2626]'}`} />
                          <div className="flex-1">
                            <div className="font-stencil text-xs tracking-wider uppercase">{f.name}</div>
                            <div className="font-mono text-[9px] opacity-75">{f.country} ({f.year})</div>
                          </div>
                          {f.isTuskegee && (
                            <span className="bg-amber-500/20 text-[#eed095] font-bold px-2 py-0.5 rounded text-[8px] uppercase tracking-wider border border-[#bfa56a]/30">
                              RED TAIL
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="rivet-row-bottom" />
                  </div>

                  {/* Curated Historical Nose art and poster card */}
                  <div className="warbird-panel warbird-screws p-5 relative overflow-hidden flex-1 min-h-[240px] flex flex-col justify-end">
                    <div className="rivet-row-top" />
                    {focusedFighter.posterUrl ? (
                      <div className="absolute inset-0 bg-cover bg-center brightness-[0.35] saturate-[1.2] contrast-[1.05] transition-all duration-700" 
                           style={{ backgroundImage: `url(${focusedFighter.posterUrl})` }} />
                    ) : (
                      <div className="absolute inset-0 bg-stone-950 flex items-center justify-center font-mono text-[9px] text-stone-600 border border-stone-800">
                        NO VERIFIED RECON MEDIA
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />
                    
                    <div className="relative z-10 text-stone-100 font-mono text-xs">
                      <span className="bg-diesel-crimson text-stone-100 font-bold px-2.5 py-0.5 rounded text-[9px] uppercase tracking-wider border border-[#363f2d]">
                        SQUADRON NOSE ART
                      </span>
                      <h4 className="font-stencil text-sm text-[#f3c360] mt-2.5 tracking-wide uppercase font-bold">
                        {focusedFighter.name}: {focusedFighter.noseArtName}
                      </h4>
                      <p className="text-[10px] text-stone-400 mt-1 leading-normal font-sans">
                        Fighter planes were decorated with expressive hand-painted insignia to boost morale.
                      </p>
                    </div>
                    <div className="rivet-row-bottom" />
                  </div>
                </div>

                {/* Core Blueprint Sheet & Interactive Cockpit Display */}
                <div className="lg:col-span-8 flex flex-col gap-5">
                  
                  {/* Console Sub-view Switcher (Raised metal plate look) */}
                  <div className="p-3 bg-stone-950/90 rounded-xl border-2 border-[#363f2d] shadow-inner font-mono text-xs relative z-10 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <span className="text-stone-400 font-bold tracking-wider uppercase text-[10px] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-diesel-brass animate-pulse"></span>
                      CONSOLE FEED SELECT:
                    </span>
                    <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                      <button
                        onClick={() => { audioEngine.playClick(); setFighterSubView('photos'); setActiveHotspot(null); }}
                        className={`flex-1 sm:flex-initial py-1.5 px-3 rounded-md font-stencil text-[10px] tracking-wider uppercase font-bold transition-all border-2 cursor-pointer ${
                          fighterSubView === 'photos'
                            ? 'bg-[#bfa56a] text-stone-950 border-[#363f2d] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]'
                            : 'bg-stone-900 text-[#f3c360] border-transparent hover:bg-stone-800 hover:text-stone-100'
                        }`}
                      >
                        <span className="mr-1">①</span> RECON PHOTO
                      </button>
                      <button
                        onClick={() => { audioEngine.playClick(); setFighterSubView('cockpit'); setActiveHotspot(null); }}
                        className={`flex-1 sm:flex-initial py-1.5 px-3 rounded-md font-stencil text-[10px] tracking-wider uppercase font-bold transition-all border-2 cursor-pointer ${
                          fighterSubView === 'cockpit'
                            ? 'bg-[#bfa56a] text-stone-950 border-[#363f2d] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]'
                            : 'bg-stone-900 text-[#f3c360] border-transparent hover:bg-stone-800 hover:text-stone-100'
                        }`}
                      >
                        <span className="mr-1">②</span> COCKPIT DETAIL
                      </button>
                      <button
                        onClick={() => { audioEngine.playClick(); setFighterSubView('specs'); setActiveHotspot(null); }}
                        className={`flex-1 sm:flex-initial py-1.5 px-3 rounded-md font-stencil text-[10px] tracking-wider uppercase font-bold transition-all border-2 cursor-pointer ${
                          fighterSubView === 'specs'
                            ? 'bg-[#bfa56a] text-stone-950 border-[#363f2d] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]'
                            : 'bg-stone-900 text-[#f3c360] border-transparent hover:bg-stone-800 hover:text-stone-100'
                        }`}
                      >
                        <span className="mr-1">③</span> TECH SPECS
                      </button>
                      <button
                        onClick={() => { audioEngine.playClick(); setFighterSubView('media'); setActiveHotspot(null); }}
                        className={`flex-1 sm:flex-initial py-1.5 px-3 rounded-md font-stencil text-[10px] tracking-wider uppercase font-bold transition-all border-2 cursor-pointer ${
                          fighterSubView === 'media'
                            ? 'bg-[#bfa56a] text-stone-950 border-[#363f2d] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]'
                            : 'bg-stone-900 text-[#f3c360] border-transparent hover:bg-stone-800 hover:text-stone-100'
                        }`}
                      >
                        <span className="mr-1">④</span> MEDIA DESK
                      </button>
                    </div>
                  </div>

                  {/* DISPLAY VIEWPORTS */}
                  <AnimatePresence mode="wait">
                    {fighterSubView === 'photos' && (
                      <motion.div
                        key="photos"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-4"
                      >
                        {/* High-Resolution Photo Plate */}
                        {showNoseArtDecal ? (
                          <div className="warbird-panel warbird-screws p-4 relative overflow-hidden min-h-[440px] flex flex-col justify-between" id="hd-image-card">
                            <div className="rivet-row-top" />
                            <div className="warbird-plate-joint-h top-1/4" />
                            <div className="warbird-plate-joint-v left-1/3" />
                            
                            {/* Photo metadata */}
                            <div className="flex justify-between items-center border-b border-stone-800/80 pb-2 relative z-10 font-mono text-[10px]">
                              <span className="text-[#f3c360] font-stencil tracking-wider uppercase font-bold flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse border border-stone-950"></span>
                                HD HISTORICAL CAPTURE: {focusedFighter.name.toUpperCase()} (NOSE ART)
                              </span>
                              <span className="text-stone-500 font-bold bg-stone-950 px-2 py-0.5 rounded border border-stone-900/60">
                                REF: {focusedFighter.id.toUpperCase()}-NOSEART
                              </span>
                            </div>

                            {/* Image Box */}
                            <div className="absolute inset-0 z-0 select-none flex items-center justify-center bg-stone-950">
                              {focusedFighter.noseArtUrl && !failedImages[focusedFighter.noseArtUrl] ? (
                                <div className="w-full h-full flex items-center justify-center bg-stone-950 relative overflow-hidden">
                                  <img
                                    src={focusedFighter.noseArtUrl}
                                    alt={`${focusedFighter.name} Nose Art`}
                                    referrerPolicy={focusedFighter.noseArtUrl.startsWith('http') ? 'no-referrer' : undefined}
                                    className="w-full h-full object-contain select-none transition-all duration-500"
                                    onError={() => setFailedImages(prev => ({ ...prev, [focusedFighter.noseArtUrl!]: true }))}
                                  />
                                  <PhotoAuthenticityBadge
                                    isVerified={focusedFighter.noseArtVerified || false}
                                    source={focusedFighter.noseArtSource || 'Unspecified'}
                                    hasPhoto={true}
                                    type="noseart"
                                    tooltipAlign="right"
                                  />
                                </div>
                              ) : (
                                <PhotoPlaceholder 
                                  type="noseart"
                                  name={focusedFighter.name}
                                  fighterId={focusedFighter.id}
                                  className="w-full h-full border-0 rounded-none bg-stone-950 p-4"
                                />
                              )}
                              {/* Intelligent gradient shadow masks for UI text contrast */}
                              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent pointer-events-none" />
                            </div>

                            {/* Active view UI information details overlay */}
                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-4 mt-auto pt-48">
                              <div className="bg-stone-950/95 border-2 border-[#363f2d] p-3.5 rounded-lg max-w-full md:max-w-[70%] shadow-2xl backdrop-blur-md relative z-10">
                                <div className="font-mono text-xs">
                                  <span className="text-[#f3c360] font-stencil font-bold block uppercase tracking-wider text-[11px]">
                                    🛡️ SQUADRON MARKINGS & PAINT DECAL
                                  </span>
                                  <p className="text-[10px] text-stone-300 mt-1.5 leading-relaxed font-sans">
                                    {focusedFighter.noseArtDescription || `Close-up view of the historic squadron markings painted on ${focusedFighter.name}. Nose art was a highly customized symbol of defiance and brotherhood.`}
                                  </p>
                                </div>
                              </div>

                              {/* Art decal toggle switch */}
                              <button
                                onClick={() => { audioEngine.playClick(); setShowNoseArtDecal(false); setActiveHotspot(null); }}
                                className="w-full md:w-auto bg-stone-900 hover:bg-stone-800 text-[#f3c360] font-stencil border-2 border-[#363f2d] text-[10px] tracking-widest font-bold py-2.5 px-4 rounded-lg uppercase shadow-xl transition-all flex items-center justify-center gap-2 relative z-10 active:scale-95 cursor-pointer"
                              >
                                <Camera className="w-4 h-4 text-[#bfa56a]" />
                                VIEW FULL AIRFRAME
                              </button>
                            </div>

                            <div className="rivet-row-bottom" />
                          </div>
                        ) : (
                          // RENDER PHOTOS VIEWPORT SUB-TAB (Supporting historical photographic capture & 3D wireframe modes)
                          <div className="relative w-full h-full min-h-[440px]" id="hd-image-card">
                            {/* Mode toggle selectors */}
                            <div className="absolute top-3 left-3 z-30 flex gap-1 bg-stone-950/90 p-1 rounded-md border border-[#363f2d] backdrop-blur-md">
                              <button
                                onClick={() => { audioEngine.playClick(); setReconPhotoMode('photo'); setActiveHotspot(null); }}
                                className={`px-2.5 py-1 rounded font-stencil text-[9px] uppercase font-bold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                                  reconPhotoMode === 'photo'
                                    ? 'bg-[#bfa56a] text-stone-950 font-bold'
                                    : 'text-stone-400 hover:text-stone-100 hover:bg-stone-900'
                                }`}
                              >
                                <Camera className="w-3 h-3" />
                                ① HISTORICAL PHOTO
                              </button>
                              <button
                                onClick={() => { audioEngine.playClick(); setReconPhotoMode('wireframe'); setActiveHotspot(null); }}
                                className={`px-2.5 py-1 rounded font-stencil text-[9px] uppercase font-bold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                                  reconPhotoMode === 'wireframe'
                                    ? 'bg-[#bfa56a] text-stone-950 font-bold'
                                    : 'text-stone-400 hover:text-stone-100 hover:bg-stone-900'
                                }`}
                              >
                                <Compass className="w-3 h-3 animate-spin-slow" />
                                ② 3D INTERACTIVE WIREFRAME
                              </button>
                            </div>

                            {reconPhotoMode === 'photo' ? (
                              // 1. HISTORICAL PHOTO OPTION
                              <div className="w-full h-full min-h-[440px] relative overflow-hidden flex flex-col justify-between p-4 bg-stone-950 rounded-xl border-2 border-[#363f2d] shadow-inner select-none">
                                {/* Photo Title header */}
                                <div className="flex justify-between items-center border-b border-stone-800/80 pb-2 relative z-10 font-mono text-[10px] mt-10">
                                  <span className="text-[#f3c360] font-stencil tracking-wider uppercase font-bold flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse border border-stone-950"></span>
                                    HD HISTORICAL CAPTURE: {focusedFighter.name.toUpperCase()} (RECONNAISSANCE)
                                  </span>
                                  <span className="text-stone-500 font-bold bg-stone-950 px-2 py-0.5 rounded border border-stone-900/60">
                                    REF: {focusedFighter.id.toUpperCase()}-RECON
                                  </span>
                                </div>

                                {/* Main Recon Image */}
                                <div className="absolute inset-0 z-0 select-none flex items-center justify-center bg-stone-950">
                                  {focusedFighter.posterUrl && !failedImages[focusedFighter.posterUrl] ? (
                                    <div className="w-full h-full flex items-center justify-center bg-stone-950 relative overflow-hidden">
                                      <img
                                        src={focusedFighter.posterUrl}
                                        alt={`${focusedFighter.name} Reconnaissance Capture`}
                                        referrerPolicy={focusedFighter.posterUrl.startsWith('http') ? 'no-referrer' : undefined}
                                        className="w-full h-full object-contain select-none transition-all duration-500 contrast-[1.05] saturate-[1.05] brightness-100"
                                        onError={() => setFailedImages(prev => ({ ...prev, [focusedFighter.posterUrl!]: true }))}
                                      />
                                      <PhotoAuthenticityBadge
                                        isVerified={focusedFighter.posterVerified || false}
                                        source={focusedFighter.posterSource || 'Allied Tactical Air Command Archive'}
                                        hasPhoto={true}
                                        type="aircraft"
                                        tooltipAlign="right"
                                      />
                                    </div>
                                  ) : (
                                    <PhotoPlaceholder 
                                      type="aircraft"
                                      name={focusedFighter.name}
                                      fighterId={focusedFighter.id}
                                      className="w-full h-full border-0 rounded-none bg-stone-950 p-4"
                                    />
                                  )}
                                  {/* Intelligent gradient shadow masks for UI text contrast */}
                                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent pointer-events-none" />
                                </div>

                                {/* Active view UI information details overlay */}
                                <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-4 mt-auto pt-48">
                                  <div className="bg-stone-950/95 border border-[#363f2d] p-3 rounded-lg flex-1 shadow-2xl backdrop-blur-md">
                                    <div className="font-mono text-xs">
                                      <span className="text-[#f3c360] font-stencil font-bold block uppercase tracking-wider text-[11px]">
                                        🔎 DECLASSIFIED RECONNAISSANCE PHOTOGRAPHY
                                      </span>
                                      <p className="text-[10px] text-stone-300 mt-1.5 leading-relaxed font-sans">
                                        Wartime tactical reconnaissance photograph of the <strong className="text-[#f3c360]">{focusedFighter.name}</strong>, declassified from the Allied Combined Air Fleet files. Used by flight staff for cockpit briefing and airframe identification before active sorties.
                                      </p>
                                    </div>
                                  </div>

                                  {/* Nose art toggle switch */}
                                  <button
                                    onClick={() => { audioEngine.playClick(); setShowNoseArtDecal(true); setActiveHotspot(null); }}
                                    className="w-full md:w-auto bg-stone-900 hover:bg-stone-800 text-[#f3c360] font-stencil border border-[#363f2d] text-[9.5px] tracking-widest font-bold py-2.5 px-3.5 rounded uppercase shadow-xl transition-all flex items-center justify-center gap-1.5 relative z-10 active:scale-95 cursor-pointer shrink-0"
                                  >
                                    <Camera className="w-3.5 h-3.5 text-[#bfa56a]" />
                                    NOSE ART ▶
                                  </button>
                                </div>
                              </div>
                            ) : (
                              // 2. INTERACTIVE WIREFRAME BLUEPRINT OPTION
                              <div className="w-full h-full relative min-h-[440px]">
                                <ArtistRenditionCanvas
                                  fighterId={focusedFighter.id}
                                  name={focusedFighter.name}
                                  country={focusedFighter.country}
                                  year={focusedFighter.year}
                                  faction={focusedFighter.faction}
                                />
                                
                                {/* Hotspot triggers overlayed directly on top of the Artist Rendition Canvas */}
                                {FIGHTER_HOTSPOTS[focusedFighter.id]?.map((hotspot, idx) => (
                                  <div
                                    key={idx}
                                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                                  >
                                    <button
                                      onClick={() => { audioEngine.playClick(); setActiveHotspot(hotspot); }}
                                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 relative cursor-pointer ${
                                        activeHotspot?.title === hotspot.title
                                          ? 'bg-diesel-crimson border-2 border-white scale-125 shadow-[0_0_15px_#ef4444]'
                                          : 'bg-diesel-gold/95 hover:bg-white border border-stone-950 hover:scale-110 shadow-[0_4px_10px_rgba(0,0,0,0.95)] text-stone-950'
                                      }`}
                                      title={hotspot.title}
                                    >
                                      <span className="absolute inset-0 rounded-full bg-diesel-gold animate-ping opacity-30" />
                                      <span className="font-mono text-[10px] font-bold">{idx + 1}</span>
                                    </button>
                                  </div>
                                ))}

                                {/* Floating Active view component detail box */}
                                {activeHotspot && (
                                  <div className="absolute bottom-[80px] left-3 right-3 sm:left-4 sm:right-auto sm:max-w-[420px] z-40 bg-stone-950/95 border-2 border-diesel-crimson p-3 rounded-lg shadow-2xl backdrop-blur-md font-mono text-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="text-diesel-crimson font-bold uppercase tracking-wider flex items-center justify-between gap-1.5">
                                      <span className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-diesel-crimson animate-pulse"></span>
                                        SYSTEM DETECT: {activeHotspot.title}
                                      </span>
                                      <button 
                                        onClick={() => { audioEngine.playClick(); setActiveHotspot(null); }}
                                        className="text-stone-500 hover:text-stone-300 ml-2 font-sans font-bold cursor-pointer"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                    <p className="text-[10.5px] text-stone-300 mt-1.5 leading-relaxed font-sans">
                                      {activeHotspot.desc}
                                    </p>
                                  </div>
                                )}

                                {/* Corner Nose art decaling launcher switch */}
                                <div className="absolute bottom-[92px] right-3 z-40">
                                  <button
                                    onClick={() => { audioEngine.playClick(); setShowNoseArtDecal(true); setActiveHotspot(null); }}
                                    className="bg-stone-950/90 hover:bg-stone-900 text-[#f3c360] font-stencil border border-[#363f2d] text-[9px] tracking-widest font-bold py-1.5 px-3 rounded uppercase shadow-2xl transition-all flex items-center gap-1.5 cursor-pointer"
                                  >
                                    <Camera className="w-3 h-3 text-[#bfa56a]" />
                                    NOSE ART ▶
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </motion.div>
                    )}

                    {fighterSubView === 'cockpit' && (
                      <motion.div
                        key="cockpit"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-4"
                      >
                        {/* High-Resolution Cockpit Plate */}
                        <div className="warbird-panel warbird-screws p-4 relative overflow-hidden min-h-[440px] flex flex-col justify-between" id="hd-cockpit-card">
                          <div className="rivet-row-top" />
                          <div className="warbird-plate-joint-h top-1/4" />
                          <div className="warbird-plate-joint-v left-1/3" />
                          
                          {/* Photo metadata */}
                          <div className="flex justify-between items-center border-b border-stone-800/80 pb-2 relative z-10 font-mono text-[10px]">
                            <span className="text-[#f3c360] font-stencil tracking-wider uppercase font-bold flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse border border-stone-950"></span>
                              COCKPIT FLIGHT INSTRUMENTATION: {focusedFighter.name.toUpperCase()}
                            </span>
                            <span className="text-stone-500 font-bold bg-stone-950 px-2 py-0.5 rounded border border-stone-900/60">
                              REF: {focusedFighter.id.toUpperCase()}-COCKPIT
                            </span>
                          </div>

                          {/* Image Box */}
                          <div className="absolute inset-0 z-0 select-none flex items-center justify-center bg-stone-950">
                            {focusedFighter.cockpitUrl && !failedImages[focusedFighter.cockpitUrl] ? (
                              <>
                                <img
                                  src={focusedFighter.cockpitUrl}
                                  alt={`${focusedFighter.name} Cockpit`}
                                  referrerPolicy={focusedFighter.cockpitUrl.startsWith('http') ? 'no-referrer' : undefined}
                                  className="w-full h-full object-cover select-none transition-all duration-500 contrast-[1.05] saturate-[1.05] brightness-100"
                                  onError={() => setFailedImages(prev => ({ ...prev, [focusedFighter.cockpitUrl!]: true }))}
                                />
                                <PhotoAuthenticityBadge
                                  isVerified={focusedFighter.cockpitVerified || false}
                                  source={focusedFighter.cockpitSource || 'Unspecified'}
                                  hasPhoto={true}
                                  type="cockpit"
                                  tooltipAlign="right"
                                />
                              </>
                            ) : (
                              <PhotoPlaceholder 
                                type="cockpit"
                                name={focusedFighter.name}
                                fighterId={focusedFighter.id}
                                className="w-full h-full border-0 rounded-none bg-stone-950 p-4"
                              />
                            )}
                            {/* Intelligent gradient shadow masks for UI text contrast */}
                            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent pointer-events-none" />
                            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
                          </div>

                          {/* Hotspot triggers */}
                          {COCKPIT_HOTSPOTS[focusedFighter.id]?.map((hotspot, idx) => (
                            <div
                              key={idx}
                              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                            >
                              <button
                                onClick={() => { audioEngine.playClick(); setActiveHotspot(hotspot); }}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 relative cursor-pointer ${
                                  activeHotspot?.title === hotspot.title
                                    ? 'bg-diesel-crimson border-2 border-white scale-125 shadow-[0_0_20px_#ef4444]'
                                    : 'bg-diesel-gold/90 hover:bg-white border-2 border-stone-950 hover:scale-110 shadow-[0_4px_10px_rgba(0,0,0,0.9)] text-stone-950'
                                }`}
                                title={hotspot.title}
                              >
                                <span className="absolute inset-0 rounded-full bg-diesel-gold animate-ping opacity-35" />
                                <span className="font-mono text-xs font-bold">{idx + 1}</span>
                              </button>
                            </div>
                          ))}

                          {/* Active view UI information details overlay */}
                          <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-4 mt-auto pt-48">
                            <div className="bg-stone-950/95 border-2 border-[#363f2d] p-3.5 rounded-lg w-full shadow-2xl backdrop-blur-md relative z-10">
                              {activeHotspot ? (
                                <div className="font-mono text-xs">
                                  <div className="text-[#bfa56a] font-bold uppercase tracking-wider flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-diesel-gold animate-pulse"></span>
                                    COCKPIT SYSTEM: {activeHotspot.title}
                                  </div>
                                  <p className="text-[11px] text-stone-300 mt-1.5 leading-relaxed font-sans">
                                    {activeHotspot.desc}
                                  </p>
                                </div>
                              ) : (
                                <div className="font-mono text-xs">
                                  <span className="text-[#f3c360] font-stencil font-bold block uppercase tracking-wider text-[11px]">
                                    🔎 HISTORICAL COCKPIT INSTRUMENT PANEL
                                  </span>
                                  <p className="text-[10px] text-stone-400 mt-1 leading-normal font-sans">
                                    Click any of the floating amber indicators on the cockpit flight deck photo above to inspect real-world analog circular gauges, needles, and numeric displays with glowing highlights.
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="rivet-row-bottom" />
                        </div>
                      </motion.div>
                    )}

                    {fighterSubView === 'specs' && (
                      <motion.div
                        key="specs"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-5"
                      >
                        {/* Title blueprint */}
                        <div className="warbird-panel warbird-screws p-6 relative overflow-hidden">
                          <div className="rivet-row-top" />
                          <div className="warbird-plate-joint-h top-1/3" />
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-stone-800/80 pb-4 relative z-10">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="bg-stone-950 border border-stone-800 text-[9px] font-mono font-bold text-[#f3c360] px-2.5 py-0.5 rounded">
                                  {focusedFighter.faction.toUpperCase()} MODEL
                                </span>
                                {focusedFighter.isTuskegee && (
                                  <span className="bg-red-950/90 text-red-400 text-[9px] font-bold px-2.5 py-0.5 rounded border border-red-900/40 tracking-wider uppercase animate-pulse">
                                    Tuskegee Airmen Mustang
                                  </span>
                                )}
                              </div>
                              <h2 className="font-stencil text-3xl text-stone-100 tracking-wide mt-2 uppercase font-bold text-shadow">
                                {focusedFighter.name}
                              </h2>
                              <span className="font-mono text-xs text-[#f3c360]">
                                "{focusedFighter.nickname}"
                              </span>
                            </div>

                            {/* Flag country marker */}
                            <div className="font-mono text-xs text-right text-stone-300 bg-stone-950 border-2 border-[#363f2d] px-3.5 py-2 rounded-lg shadow-inner">
                              <span>ORIGIN: <strong className="text-[#f3c360]">{focusedFighter.country}</strong></span>
                              <div className="text-[10px] text-stone-500 mt-0.5">DEPLOYED: {focusedFighter.year}</div>
                            </div>
                          </div>

                          {/* Specifications list with debossed-well panels */}
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6 font-mono text-xs border-b border-stone-800/40 pb-5 relative z-10">
                            <div className="debossed-well p-3">
                              <span className="text-stone-500 text-[10px] uppercase block mb-1 font-bold">Max Airspeed</span>
                              <strong className="text-[#f3c360] text-sm">{focusedFighter.specs.maxSpeed}</strong>
                            </div>
                            <div className="debossed-well p-3">
                              <span className="text-stone-500 text-[10px] uppercase block mb-1 font-bold">Engine Unit</span>
                              <strong className="text-[#f3c360] text-sm">{focusedFighter.specs.engine}</strong>
                            </div>
                            <div className="debossed-well p-3">
                              <span className="text-stone-500 text-[10px] uppercase block mb-1 font-bold">Wingspan</span>
                              <strong className="text-[#f3c360] text-sm">{focusedFighter.specs.wingspan}</strong>
                            </div>
                            <div className="debossed-well p-3 col-span-2">
                              <span className="text-stone-500 text-[10px] uppercase block mb-1 font-bold">Standard Armament</span>
                              <strong className="text-[#f3c360] text-sm">{focusedFighter.specs.armament}</strong>
                            </div>
                            <div className="debossed-well p-3">
                              <span className="text-stone-500 text-[10px] uppercase block mb-1 font-bold">Combat Range</span>
                              <strong className="text-[#f3c360] text-sm">{focusedFighter.specs.range}</strong>
                            </div>
                          </div>

                          <p className="text-sm text-stone-300 leading-relaxed text-justify mb-2 font-sans relative z-10">
                            {focusedFighter.description}
                          </p>
                          <div className="rivet-row-bottom" />
                        </div>
                      </motion.div>
                    )}

                    {fighterSubView === 'media' && (
                      <motion.div
                        key="media"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        <AviationMediaManager
                          focusedFighter={focusedFighter}
                          onUpdateFighterImages={handleUpdateFighterImages}
                          onResetFighterImages={handleResetFighterImages}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {activeTab === 'pilots' && (
              <motion.div
                key="pilots"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {/* Spotlight Banner explaining Tuskegee Airmen history if filter is clicked */}
                <div className="mb-6 warbird-panel warbird-screws p-5 flex flex-col md:flex-row gap-4 items-center border-2 border-red-950">
                  <div className="rivet-row-top" />
                  <div className="w-12 h-12 bg-red-950/80 border-2 border-red-700/50 rounded-full flex items-center justify-center text-red-500 text-xl font-stencil shrink-0 animate-pulse relative z-10">
                    332
                  </div>
                  <div className="font-mono text-xs relative z-10">
                    <h3 className="font-stencil text-sm text-[#f3c360] tracking-wider uppercase font-bold">
                      Spotlight: The Tuskegee Airmen "Red Tails"
                    </h3>
                    <p className="text-stone-300 mt-1 leading-relaxed font-sans">
                      The Tuskegee Airmen were the first African American military aviators in the United States Armed Forces, training at Tuskegee Army Airfield in Alabama. Flying their legendary P-51 Mustangs with tails painted bright red, the 332nd Fighter Group compiled one of the most distinguished bomber-escort logs of the war, fighting racial segregation at home while defeating fascism in the skies of Europe.
                    </p>
                  </div>
                  <div className="rivet-row-bottom" />
                </div>

                <PilotStories
                  pilots={pilots}
                  fighters={fighters}
                  initialFilter="tuskegee"
                />
              </motion.div>
            )}

            {activeTab === 'pilots-all' && (
              <motion.div
                key="pilots-all"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {/* Spotlight Banner explaining Allied Pilot records */}
                <div className="mb-6 warbird-panel warbird-screws p-5 flex flex-col md:flex-row gap-4 items-center border-2 border-[#363f2d]">
                  <div className="rivet-row-top" />
                  <div className="w-12 h-12 bg-[#2d241a] border-2 border-[#bfa56a] rounded-full flex items-center justify-center text-[#bfa56a] text-xl font-stencil shrink-0 relative z-10">
                    HQ
                  </div>
                  <div className="font-mono text-xs relative z-10">
                    <h3 className="font-stencil text-sm text-[#f3c360] tracking-wider uppercase font-bold">
                      Allied Service Dossiers
                    </h3>
                    <p className="text-stone-300 mt-1 leading-relaxed font-sans">
                      Explore the combat files, flight logs, and tactical briefs of Allied fighter aces who flew into the crucible of World War II. Select a pilot from the roster to review their custom record, specialized medals, and unit citations.
                    </p>
                  </div>
                  <div className="rivet-row-bottom" />
                </div>

                <PilotStories
                  pilots={pilots}
                  fighters={fighters}
                  initialFilter="all"
                />
              </motion.div>
            )}

            {activeTab === 'logs' && (
              <motion.div
                key="logs"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <FlightLogs
                  logs={flightLogs}
                  onAddNewLog={handleAddNewManualLog}
                />
              </motion.div>
            )}

            {activeTab === 'noseart' && (
              <motion.div
                key="noseart"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <NoseArtGallery
                  fighters={fighters}
                />
              </motion.div>
            )}

            {activeTab === 'registry' && (
              <motion.div
                key="registry"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <AlliedWarbirdsRegistry />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer credits */}
      <footer className="max-w-7xl mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-stone-900 text-center font-mono text-[10px] text-stone-500">
        <div className="flex justify-between flex-wrap gap-4">
          <span>CLASSIFIED MILITARY INTELLIGENCE // RESTRICTED USE</span>
          <span>CRAFTED IN DIESELPUNK SYNTAX // 1930s DRAFTING TABLE PROTOCOL</span>
        </div>
      </footer>
    </div>
  );
}
