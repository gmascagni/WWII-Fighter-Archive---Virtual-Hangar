import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FighterAircraft } from '../types';
import { PhotoAuthenticityBadge, PhotoPlaceholder } from './PhotoAuthenticityBadge';
import { audioEngine } from './AudioEngine';
import { 
  Images, 
  MapPin, 
  BookOpen, 
  ExternalLink, 
  Eye, 
  Crosshair, 
  X, 
  Compass, 
  Calendar,
  Volume2,
  Sparkles
} from 'lucide-react';

interface NoseArtGalleryProps {
  fighters: FighterAircraft[];
}

export default function NoseArtGallery({ fighters }: NoseArtGalleryProps) {
  const [selectedArt, setSelectedArt] = useState<FighterAircraft | null>(null);
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Extract unique countries
  const countries = ['all', ...Array.from(new Set(fighters.map(f => f.country)))];

  // Filter fighters that have nose art
  const filteredFighters = fighters.filter(f => {
    const matchesCountry = filterCountry === 'all' || f.country === filterCountry;
    return matchesCountry && f.noseArtUrl;
  });

  const handleCardClick = (fighter: FighterAircraft) => {
    audioEngine.playClick();
    setSelectedArt(fighter);
  };

  const handleCloseLightbox = () => {
    audioEngine.playClick();
    setSelectedArt(null);
  };

  const handlePlaySound = (type: 'gun' | 'flyby') => {
    audioEngine.playClick();
    if (type === 'gun') {
      audioEngine.playMachineGunBurst();
    } else {
      audioEngine.playFighterFlyby();
    }
  };

  return (
    <div className="flex flex-col gap-6" id="nose-art-gallery-tab">
      {/* Gallery Header and Filter Bar */}
      <div className="warbird-panel warbird-screws p-5 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="rivet-row-top" />
        <div className="flex items-center gap-4 relative z-10 text-center md:text-left">
          <div className="w-12 h-12 rounded-lg bg-stone-950 border-2 border-diesel-gold flex items-center justify-center text-diesel-gold shrink-0 shadow-lg">
            <Images className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="font-stencil text-2xl text-stone-100 tracking-wide uppercase leading-tight">
              Squadron Nose Art Registry
            </h2>
            <p className="font-mono text-[10px] text-[#eed095]/80 uppercase tracking-widest mt-0.5">
              WAR DEPARTMENT VISUAL MARKINGS INDEX // AUTHENTIC DECAL CODES
            </p>
          </div>
        </div>

        {/* Country Selector Filters */}
        <div className="flex flex-wrap items-center gap-2 relative z-10 font-mono text-xs">
          <span className="text-stone-400 text-[10px] font-bold uppercase tracking-wider hidden sm:block">
            COUNTRY:
          </span>
          <div className="flex gap-1 bg-stone-950 p-1 rounded-lg border border-stone-800">
            {countries.map(country => (
              <button
                key={country}
                onClick={() => { audioEngine.playClick(); setFilterCountry(country); }}
                className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  filterCountry === country
                    ? country === 'all'
                      ? 'bg-diesel-brass text-stone-950 font-bold'
                      : 'bg-diesel-crimson text-stone-100 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {country === 'all' ? 'All Factions' : country}
              </button>
            ))}
          </div>
        </div>
        <div className="rivet-row-bottom" />
      </div>

      {/* Grid of Nose Art Decals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFighters.map(fighter => {
          const isFailed = failedImages[fighter.noseArtUrl];
          
          return (
            <motion.div
              key={fighter.id}
              layoutId={`card-container-${fighter.id}`}
              onClick={() => handleCardClick(fighter)}
              className="warbird-panel warbird-screws p-4 relative flex flex-col justify-between overflow-hidden cursor-pointer group hover:border-[#eed095] hover:shadow-[0_8px_24px_rgba(238,208,149,0.15)] transition-all h-[360px]"
            >
              <div className="rivet-row-top" />
              
              {/* Outer Decal Frame / Joint lines */}
              <div className="absolute inset-0 border border-stone-800 pointer-events-none group-hover:border-diesel-gold/30" />
              <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-stone-900/40 pointer-events-none" />
              <div className="absolute top-0 bottom-0 left-1/3 w-[1px] bg-stone-900/40 pointer-events-none" />

              {/* Metal stamp details */}
              <div className="flex justify-between items-center border-b border-stone-800/80 pb-2 relative z-10 font-mono text-[9px] text-stone-500">
                <span className="uppercase font-bold text-[#eed095]/80 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-diesel-brass" />
                  {fighter.name.toUpperCase()}
                </span>
                <span className="bg-stone-950 px-1.5 py-0.5 rounded border border-stone-900 font-bold">
                  REF: {fighter.id.toUpperCase()}-ART
                </span>
              </div>

              {/* Artwork Box */}
              <div className="relative flex-1 w-full bg-stone-950 rounded-md overflow-hidden mt-3 shadow-inner border border-stone-900/60 flex items-center justify-center select-none group">
                {fighter.noseArtUrl && !isFailed ? (
                  <>
                    <img
                      src={fighter.noseArtUrl}
                      alt={`${fighter.name} Nose Art - ${fighter.noseArtName}`}
                      referrerPolicy={fighter.noseArtUrl.startsWith('http') ? 'no-referrer' : undefined}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 contrast-[1.05] saturate-[1.05] brightness-[0.85] group-hover:brightness-[1.0]"
                      onError={() => setFailedImages(prev => ({ ...prev, [fighter.noseArtUrl]: true }))}
                    />
                    {/* Visual search indicator hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                      <div className="bg-stone-950/90 border-2 border-[#eed095] text-[#eed095] rounded-full px-3 py-1.5 text-[9px] font-stencil uppercase tracking-widest flex items-center gap-1.5 shadow-xl scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Eye className="w-3.5 h-3.5" />
                        INSPECT DECAL
                      </div>
                    </div>
                    
                    <PhotoAuthenticityBadge
                      isVerified={fighter.noseArtVerified || false}
                      source={fighter.noseArtSource || 'Unspecified'}
                      hasPhoto={true}
                      type="noseart"
                      tooltipAlign="right"
                    />
                  </>
                ) : (
                  <PhotoPlaceholder 
                    type="noseart"
                    name={fighter.name}
                    fighterId={fighter.id}
                    className="w-full h-full border-0 rounded-none bg-stone-950 p-2"
                  />
                )}
                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-stone-950 to-transparent pointer-events-none" />
              </div>

              {/* Decal Card Footer text */}
              <div className="mt-3 relative z-10">
                <span className="font-typewriter text-xs text-red-500 font-bold rotate-[-1deg] block leading-none">
                  "{fighter.noseArtName}"
                </span>
                <span className="font-mono text-[9px] text-stone-400 uppercase tracking-widest block mt-1.5 truncate">
                  ORIGIN: {fighter.country} • DEPLOYED: {fighter.year}
                </span>
              </div>

              {/* Decorative Corner Rivets */}
              <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-stone-800" />
              <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-stone-800" />
              <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-stone-800" />
              <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-stone-800" />
              
              <div className="rivet-row-bottom" />
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {selectedArt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl bg-gradient-to-b from-stone-900 to-stone-950 border-4 border-[#3d342a] rounded-xl shadow-2xl p-6 md:p-8 flex flex-col gap-6 max-h-[90vh] overflow-y-auto scrollbar-thin"
              id="nose-art-lightbox"
            >
              {/* Header inside modal */}
              <div className="flex justify-between items-center border-b border-stone-800 pb-3 font-mono">
                <span className="text-[#eed095] font-stencil text-xs tracking-widest uppercase font-bold flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-diesel-brass" />
                  MILITARY DECAL SERVICE DOSSIER: "{selectedArt.noseArtName.toUpperCase()}"
                </span>
                <button
                  onClick={handleCloseLightbox}
                  className="bg-stone-950 border border-stone-800 text-stone-400 hover:text-stone-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors cursor-pointer"
                  title="Close inspection"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Large high-res image panel */}
                <div className="lg:col-span-7 flex flex-col gap-3">
                  <div className="relative aspect-video sm:aspect-square lg:aspect-auto lg:h-[450px] bg-stone-950 border border-stone-800 rounded-lg overflow-hidden shadow-inner flex items-center justify-center">
                    {selectedArt.noseArtUrl && !failedImages[selectedArt.noseArtUrl] ? (
                      <>
                        <img
                          src={selectedArt.noseArtUrl}
                          alt={`${selectedArt.name} Nose Art - ${selectedArt.noseArtName}`}
                          referrerPolicy={selectedArt.noseArtUrl.startsWith('http') ? 'no-referrer' : undefined}
                          className="w-full h-full object-contain contrast-[1.05] saturate-[1.05] brightness-[1.0]"
                          onError={() => setFailedImages(prev => ({ ...prev, [selectedArt.noseArtUrl]: true }))}
                        />
                        <PhotoAuthenticityBadge
                          isVerified={selectedArt.noseArtVerified || false}
                          source={selectedArt.noseArtSource || 'Unspecified'}
                          hasPhoto={true}
                          type="noseart"
                          tooltipAlign="right"
                        />
                      </>
                    ) : (
                      <PhotoPlaceholder 
                        type="noseart"
                        name={selectedArt.name}
                        fighterId={selectedArt.id}
                        className="w-full h-full border-0 rounded-none bg-stone-950 p-4"
                      />
                    )}
                  </div>
                  
                  {/* Image credit line */}
                  <div className="font-mono text-[9px] text-stone-500 flex justify-between bg-stone-950/60 p-2 rounded border border-stone-900">
                    <span>ARCHIVE CATALOG: USAAF-PL-{selectedArt.id.toUpperCase()}-043</span>
                    <span>SOURCE VERIFIED: {selectedArt.noseArtSource || 'Allied Aviation Collection'}</span>
                  </div>
                </div>

                {/* Historian Text Panel */}
                <div className="lg:col-span-5 flex flex-col gap-5 h-full justify-between">
                  {/* Ledger-style historical folder card */}
                  <div className="ledger-paper p-5 rounded-lg border-2 border-[#d2c29e] text-stone-900 flex-1 relative overflow-hidden">
                    {/* Retro Stamp */}
                    <div className="absolute right-3 top-3 border-2 border-red-700/60 text-red-700/70 font-stencil font-bold rounded px-2.5 py-0.5 text-center rotate-12 tracking-widest text-[9px] select-none uppercase">
                      Classified Photo
                    </div>

                    <span className="font-typewriter text-[10px] uppercase tracking-wider text-stone-500 block">
                      ARCHIVE SUBJECT METADATA
                    </span>
                    <h3 className="font-stencil text-2xl text-stone-900 tracking-wide mt-1 uppercase font-bold leading-none">
                      "{selectedArt.noseArtName}"
                    </h3>
                    <div className="font-typewriter text-[11px] text-stone-700 border-b border-stone-400/40 pb-3 mt-1.5 flex flex-wrap gap-x-4">
                      <span>AIRCRAFT: <strong>{selectedArt.name}</strong></span>
                      <span>COUNTRY: <strong>{selectedArt.country}</strong></span>
                    </div>

                    {/* Historical Writeup */}
                    <div className="mt-4 font-typewriter text-xs text-stone-800 leading-relaxed text-justify space-y-3">
                      <p className="font-bold flex items-center gap-1.5 text-stone-900 border-b border-stone-300 pb-1 text-[11px] uppercase tracking-wider font-stencil">
                        <MapPin className="w-3.5 h-3.5 text-red-700" />
                        Historical Background
                      </p>
                      <p>
                        {selectedArt.noseArtDescription || `This detail represents the authentic hand-painted squadron markings on the historic fuselage of the ${selectedArt.name}. In World War II, squadron ground crew chiefs and pilots often personalized their aircraft with artistic markings. This served as a critical booster of high morale, a beacon of identity, and a sign of defiance in the skies.`}
                      </p>
                      
                      {selectedArt.isTuskegee && (
                        <div className="bg-stone-100 border border-stone-300 rounded p-2.5 mt-4 text-[10.5px] leading-relaxed text-stone-800 font-sans">
                          <strong className="block text-stone-900 uppercase font-stencil text-[10px] tracking-wide mb-0.5">Airmen Legacy</strong>
                          This design is particularly historic. Painted on Benjamin Davis Jr's plane "By Request", it remains a powerful symbol of the barrier-breaking African American fighter squadron who flew with uncompromised courage and record-setting honor.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sound generator buttons & Close */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handlePlaySound('gun')}
                      className="flex-1 bg-stone-950 hover:bg-stone-900 text-[#eed095] border-2 border-[#3d342a] hover:border-diesel-gold font-stencil text-[10px] font-bold py-3 px-4 rounded-lg uppercase transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer shadow-md"
                    >
                      <Crosshair className="w-4 h-4 text-diesel-crimson" />
                      Test Armament
                    </button>
                    <button
                      onClick={() => handlePlaySound('flyby')}
                      className="flex-1 bg-stone-950 hover:bg-stone-900 text-[#eed095] border-2 border-[#3d342a] hover:border-diesel-gold font-stencil text-[10px] font-bold py-3 px-4 rounded-lg uppercase transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer shadow-md"
                    >
                      <Volume2 className="w-4 h-4 text-diesel-brass" />
                      Engage Flyby Synth
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
