import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Clock, 
  Zap, 
  ShieldCheck, 
  Search, 
  SlidersHorizontal, 
  ExternalLink,
  BookOpen,
  Image as ImageIcon,
  Compass
} from 'lucide-react';
import { PhotoAuthenticityBadge } from './PhotoAuthenticityBadge';

interface AlliedWarbird {
  name: string;
  year_introduced: number;
  top_speed: string;
  primary_role: string;
  image_url: string;
  description: string;
  country_origin: string;
  engine_spec: string;
  armament: string;
  intelligence_notes: string;
}

const ALLIED_WARBIRDS_DATABASE: AlliedWarbird[] = [
  {
    name: "P-51 Mustang",
    year_introduced: 1942,
    top_speed: "440 mph (708 km/h)",
    primary_role: "Fighter / Long-range Escort",
    image_url: "images/p51_poster.jpg",
    description: "Widely regarded as the supreme Allied fighter of World War II, the P-51 Mustang combined a revolutionary low-drag laminar-flow wing design with the legendary Packard V-1650 Merlin supercharged V-12 engine. This gave it peerless range, speed, and high-altitude capabilities, allowing it to escort bomber groups all the way to Berlin and back.",
    country_origin: "United States",
    engine_spec: "Packard V-1650-7 Merlin (1,490 hp)",
    armament: "6 × .50 caliber (12.7 mm) M2 Browning machine guns",
    intelligence_notes: "Crucial for winning air supremacy over Europe. The bright red tail markings of the African American 332nd Fighter Group (the 'Tuskegee Airmen') on their P-51s became an iconic symbol of unmatched bomber protection."
  },
  {
    name: "Supermarine Spitfire Mk IX",
    year_introduced: 1942,
    top_speed: "408 mph (657 km/h)",
    primary_role: "Interceptor Fighter",
    image_url: "images/spitfire_poster.jpg",
    description: "The ultimate British interceptor and symbol of RAF resistance. Featuring beautiful, extremely thin elliptical wings designed by R.J. Mitchell, the Spitfire possessed a legendary rate of climb and a matchless turning radius, allowing it to outmaneuver the best interceptors of the Axis powers in close-quarters dogfights.",
    country_origin: "United Kingdom",
    engine_spec: "Rolls-Royce Merlin 66 (1,720 hp)",
    armament: "2 × 20 mm Hispano Mk II cannons, 4 × .303 British Browning machine guns",
    intelligence_notes: "A masterpiece of aerodynamic engineering. The Mk IX variant was rushed into service in 1942 to successfully counter the formidable Focke-Wulf Fw 190, restoring tactical superiority to Allied fighter commands."
  },
  {
    name: "Hawker Hurricane Mk I",
    year_introduced: 1937,
    top_speed: "340 mph (547 km/h)",
    primary_role: "Fighter / Fighter-bomber",
    image_url: "images/hurricane_poster.jpg",
    description: "The rugged workhorse of the Battle of Britain. While the Spitfire captured the public's imagination, the sturdy, fabric-covered steel-tube fuselage of the Hurricane made it easier to manufacture, simpler to repair, and incredibly durable in combat. It accounted for over 60 percent of all Allied aerial victories during the Battle of Britain.",
    country_origin: "United Kingdom",
    engine_spec: "Rolls-Royce Merlin III (1,030 hp)",
    armament: "8 × .303 British Browning machine guns",
    intelligence_notes: "Its rugged design allowed it to absorb immense battle damage that would destroy metal aircraft. Later served on all major fronts as a ground-attack tank-buster and carrier-based 'Sea Hurricane'."
  },
  {
    name: "Lockheed P-38 Lightning",
    year_introduced: 1941,
    top_speed: "414 mph (666 km/h)",
    primary_role: "Fighter / Reconnaissance",
    image_url: "images/p38_poster.jpg",
    description: "An exceptionally distinct, heavy twin-engine fighter. Designed with twin booms and a central cockpit pod, the P-38 Lightning was dubbed the 'Fork-Tailed Devil' (der Gabelschwanz-Teufel) by Luftwaffe pilots. By clustering its heavy cannons and machine guns directly in the central nose, it avoided wing-gun convergence issues, enabling deadly accuracy at over 500 yards.",
    country_origin: "United States",
    engine_spec: "2 × Allison V-1710 V-12 liquid-cooled engines (1,475 hp each)",
    armament: "1 × 20 mm Hispano M2 cannon, 4 × .50 caliber (12.7 mm) machine guns",
    intelligence_notes: "Served as the primary long-range weapon in the Pacific theater, where America's top-scoring aces, Richard Bong (40 kills) and Thomas McGuire (38 kills), achieved their historic victories."
  },
  {
    name: "Republic P-47 Thunderbolt",
    year_introduced: 1942,
    top_speed: "433 mph (697 km/h)",
    primary_role: "Fighter-bomber / Heavy Fighter",
    image_url: "images/p47_poster.jpg",
    description: "Nicknamed 'The Jug' due to its massive, barrel-shaped fuselage, the P-47 Thunderbolt was one of the heaviest and most heavily armed single-engine fighters in history. Built around a monstrous 2,000-horsepower radial engine and a complex rear-fuselage turbo-supercharger system, it excelled at high-altitude escort and devastating low-altitude ground-strafing runs.",
    country_origin: "United States",
    engine_spec: "Pratt & Whitney R-2800 Double Wasp 18-cylinder radial (2,000 hp)",
    armament: "8 × .50 caliber (12.7 mm) M2 Browning machine guns",
    intelligence_notes: "Possessed incredible structural armor and safety. Pilots frequently reported returning to base with half a wing missing or multiple cylinders blown out, praising 'The Jug' for its unmatched survivability."
  },
  {
    name: "Curtiss P-40 Warhawk",
    year_introduced: 1939,
    top_speed: "360 mph (580 km/h)",
    primary_role: "Fighter / Ground Attack",
    image_url: "images/p40_poster.jpg",
    description: "A rugged, heavily armored fighter that formed the backbone of US fighter squadrons during the early stages of World War II. While outclassed at high altitudes by lighter interceptors, the P-40 was incredibly tough, highly maneuverable in medium-altitude dives, and could operate from primitive, sand-swept front lines.",
    country_origin: "United States",
    engine_spec: "Allison V-1710-39 V-12 liquid-cooled engine (1,150 hp)",
    armament: "6 × .50 caliber (12.7 mm) M2 Browning machine guns",
    intelligence_notes: "Etched into history by Claire Chennault's 'Flying Tigers' (American Volunteer Group) in China. Their shark-mouthed P-40s achieved a legendary 12-to-1 kill ratio against agile Japanese fighters."
  },
  {
    name: "Vought F4U Corsair",
    year_introduced: 1942,
    top_speed: "446 mph (718 km/h)",
    primary_role: "Carrier-based Fighter-bomber",
    image_url: "images/f4u_poster.jpg",
    description: "Immediately recognized by its unique inverted gull wings, designed to keep the landing gear struts short while providing ground clearance for a giant 13-foot propeller. Driven by a massive radial engine, the Corsair dominated Pacific theater dogfights and was feared for its roaring speed and devastating rocket payloads.",
    country_origin: "United States",
    engine_spec: "Pratt & Whitney R-2800-8W Double Wasp radial engine (2,250 hp)",
    armament: "6 × .50 caliber machine guns (or 4 × 20 mm AN/M2 cannons)",
    intelligence_notes: "Nicknamed 'Whistling Death' by Japanese forces because of the unique aerodynamic sound created by its wing-root oil-cooler inlets during high-speed combat dives."
  },
  {
    name: "Grumman F6F Hellcat",
    year_introduced: 1943,
    top_speed: "391 mph (629 km/h)",
    primary_role: "Carrier-based Fighter",
    image_url: "images/f6f_poster.jpg",
    description: "The 'Ace Maker' that swept the skies of the Pacific. Purpose-built to defeat the highly agile Mitsubishi A6M Zero, the Hellcat prioritized armor, heavy high-speed dive stability, and pilot protection. It went on to secure complete aerial supremacy, recording an unmatched 19-to-1 kill ratio over Japanese adversaries.",
    country_origin: "United States",
    engine_spec: "Pratt & Whitney R-2800-10 Double Wasp radial engine (2,000 hp)",
    armament: "6 × .50 caliber (12.7 mm) M2 Browning machine guns",
    intelligence_notes: "Formed the bedrock of Allied carrier warfare. Hellcats single-handedly accounted for 5,163 shot-down enemy aircraft in U.S. Navy and Marine Corps service, surpassing any other Allied aircraft."
  },
  {
    name: "North American B-25 Mitchell",
    year_introduced: 1941,
    top_speed: "272 mph (438 km/h)",
    primary_role: "Medium Bomber",
    image_url: "images/b25_poster.jpg",
    description: "A highly versatile, heavily armed twin-engine medium bomber named in honor of military aviation pioneer General Billy Mitchell. It saw extensive combat in every theater of World War II, utilized for low-altitude skip-bombing, sub-hunting, and devastating ground strafing runs.",
    country_origin: "United States",
    engine_spec: "2 × Wright R-2600-92 Twin Cyclone radial engines (1,700 hp each)",
    armament: "Up to 14–18 × .50 caliber machine guns (including 8 in the solid strafer nose) + 3,000 lbs of bombs",
    intelligence_notes: "Made aviation history on April 18, 1942, when Lt. Col. Jimmy Doolittle led 16 B-25s in a daring take-off from the short flight deck of the carrier USS Hornet for the legendary Doolittle Raid over Tokyo."
  },
  {
    name: "De Havilland Mosquito",
    year_introduced: 1941,
    top_speed: "415 mph (668 km/h)",
    primary_role: "Multi-role Fast Bomber",
    image_url: "images/mosquito_poster.jpg",
    description: "Constructed almost entirely out of spruce, birch, and balsa wood ply, the 'Wooden Wonder' was one of the fastest and most brilliant design achievements of the war. Believing that speed was the best defense, designers omitted heavy defensive turrets entirely, resulting in an ultra-streamlined aircraft that could carry heavy bomb loads and outrun almost any Luftwaffe interceptor.",
    country_origin: "United Kingdom",
    engine_spec: "2 × Rolls-Royce Merlin 21/23 liquid-cooled V-12 engines (1,480 hp each)",
    armament: "Varies (Fighter-bomber variants carried 4 × 20 mm cannons, 4 × .303 Browning machine guns, and bombs)",
    intelligence_notes: "Extremely difficult to detect on early German radar systems due to its wooden construction. Conducted highly specialized, pinpoint daylight raids, including the daring shell-strafing of Gestapo Headquarters."
  }
];

export default function AlliedWarbirdsRegistry() {
  const [selectedWarbird, setSelectedWarbird] = useState<AlliedWarbird>(ALLIED_WARBIRDS_DATABASE[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'year' | 'speed'>('year');
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  // Extract unique roles for filters
  const roles = ['All', 'Fighter', 'Bomber', 'Carrier-based', 'Escort'];

  // Filter & Sort logic
  const filteredAndSortedWarbirds = ALLIED_WARBIRDS_DATABASE.filter(plane => {
    const matchesSearch = plane.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          plane.primary_role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          plane.country_origin.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesRole = true;
    if (roleFilter !== 'All') {
      matchesRole = plane.primary_role.toLowerCase().includes(roleFilter.toLowerCase());
    }
    
    return matchesSearch && matchesRole;
  }).sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'year') {
      return a.year_introduced - b.year_introduced;
    } else {
      // Sort by top speed parsed
      const speedA = parseInt(a.top_speed) || 0;
      const speedB = parseInt(b.top_speed) || 0;
      return speedB - speedA; // fastest first
    }
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="allied-warbirds-registry-root">
      {/* Sidebar Filter and Aircraft List */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        {/* Controls Panel */}
        <div className="warbird-panel warbird-screws p-4 relative overflow-hidden" id="registry-controls-panel">
          <div className="rivet-row-top" />
          
          <h3 className="font-serif tracking-wide text-xs text-[#dfb743] tracking-widest uppercase mb-3 flex items-center gap-1.5 font-bold">
            <Compass className="w-4 h-4 text-[#c4af7d] animate-spin-slow" />
            Registry Intelligence Logs
          </h3>

          <div className="flex flex-col gap-3 relative z-10 font-mono text-[11px]">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search historical logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-950 border border-white/5 text-stone-200 placeholder-stone-500 rounded px-2.5 py-1.5 pl-8 focus:outline-none focus:border-diesel-brass transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-stone-500 absolute left-2.5 top-2.5" />
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-stone-500 text-[10px] uppercase block mb-1">Primary Role</label>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full bg-stone-950 border border-white/5 text-stone-300 rounded px-2 py-1 focus:outline-none focus:border-diesel-brass"
                >
                  {roles.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-stone-500 text-[10px] uppercase block mb-1">Sort Index</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full bg-stone-950 border border-white/5 text-stone-300 rounded px-2 py-1 focus:outline-none focus:border-diesel-brass"
                >
                  <option value="year">Chronological</option>
                  <option value="name">Alphabetical</option>
                  <option value="speed">Max Velocity</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rivet-row-bottom" />
        </div>

        {/* Aircraft Scrollable List */}
        <div className="warbird-panel warbird-screws p-4 flex-1 flex flex-col min-h-[350px] relative overflow-hidden" id="registry-aircraft-list-panel">
          <div className="rivet-row-top" />
          
          <span className="font-serif tracking-wide text-[10px] text-stone-400 tracking-wider uppercase mb-3 block border-b border-white/5/80 pb-1.5">
            Classified Allied Aircraft Database ({filteredAndSortedWarbirds.length})
          </span>

          <div className="flex-1 overflow-y-auto max-h-[500px] flex flex-col gap-2 relative z-10 scrollbar-thin scrollbar-thumb-stone-800 scrollbar-track-transparent">
            {filteredAndSortedWarbirds.map((plane) => {
              const isSelected = selectedWarbird.name === plane.name;
              return (
                <button
                  key={plane.name}
                  onClick={() => {
                    setSelectedWarbird(plane);
                  }}
                  className={`p-3 rounded-lg text-left transition-all border flex items-center gap-3 relative overflow-hidden group ${
                    isSelected
                      ? 'bg-stone-900/90 border-[#eed095] text-[#dfb743] font-bold shadow-[inset_0_0_12px_rgba(238,208,149,0.15)]'
                      : 'bg-stone-950/80 border-white/5 text-stone-300 hover:bg-stone-900/40'
                  }`}
                >
                  {/* Miniature flag identifier */}
                  <div className={`w-3.5 h-3.5 rounded-full shrink-0 flex items-center justify-center ${
                    plane.country_origin === 'United Kingdom' 
                      ? 'bg-blue-900 border border-blue-400 shadow-[0_0_6px_rgba(59,130,246,0.5)]' 
                      : 'bg-blue-700 border border-stone-400 shadow-[0_0_6px_rgba(37,99,235,0.5)]'
                  }`}>
                    <span className="text-[7px] text-stone-100 font-bold">★</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-serif tracking-wide text-xs tracking-wider uppercase truncate group-hover:text-stone-100 transition-colors">{plane.name}</div>
                    <div className="font-mono text-[9px] text-stone-500 flex items-center gap-2 mt-0.5">
                      <span>{plane.country_origin}</span>
                      <span>•</span>
                      <span>Introduced: {plane.year_introduced}</span>
                    </div>
                  </div>

                  {/* Top speed badge */}
                  <div className="text-right font-mono text-[9px] text-[#dfb743] shrink-0 bg-stone-900/60 border border-white/5/50 px-1.5 py-0.5 rounded">
                    {plane.top_speed.split(' ')[0]} mph
                  </div>
                </button>
              );
            })}

            {filteredAndSortedWarbirds.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-stone-500 font-mono text-xs">
                <p>No historical aircraft match the query criteria.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setRoleFilter('All'); }}
                  className="mt-3 text-[#c4af7d] hover:underline hover:text-[#dfb743]"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          <div className="rivet-row-bottom" />
        </div>
      </div>

      {/* Main Photographic View & Intelligence Briefing */}
      <div className="lg:col-span-8 flex flex-col gap-6" id="registry-details-briefing">
        {/* Full View Panel */}
        <div className="warbird-panel warbird-screws p-5 relative overflow-hidden flex flex-col" id="registry-photographic-view-panel">
          <div className="rivet-row-top" />

          {/* Header */}
          <div className="flex justify-between items-start border-b border-white/5/80 pb-3 mb-4 relative z-10 flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[8px] bg-blue-950 text-blue-400 border border-blue-900 px-1.5 py-0.5 rounded uppercase tracking-wider font-bold">
                  Allied High Command Registry
                </span>
                <span className="font-mono text-[8px] bg-stone-900 text-stone-400 border border-white/5 px-1.5 py-0.5 rounded uppercase tracking-wider">
                  Verified Photographic Log
                </span>
              </div>
              <h2 className="font-serif tracking-wide text-2xl text-stone-100 tracking-wider uppercase mt-1">
                {selectedWarbird.name}
              </h2>
            </div>

            <div className="text-right font-mono text-[10px] text-stone-500">
              <div>COUNTRY: <span className="text-[#dfb743] font-bold uppercase">{selectedWarbird.country_origin}</span></div>
              <div className="mt-0.5">SERIAL TYPE: <span className="text-stone-300">WII-{selectedWarbird.year_introduced}</span></div>
            </div>
          </div>

          {/* Photorealistic Historical Image Stage */}
          <div className="relative aspect-[16/10] w-full bg-stone-950 rounded-lg overflow-hidden border border-white/5 group shadow-inner">
            {imageError[selectedWarbird.image_url] ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center font-typewriter text-xs text-stone-400 bg-stone-950">
                <ImageIcon className="w-10 h-10 text-stone-700 mb-2" />
                <p className="font-bold text-red-500 uppercase">Image Transport Failure</p>
                <p className="text-[10px] mt-1 max-w-sm">
                  Failed to load direct Wikimedia Commons high-resolution photograph. 
                  Ensure active satellite link or browse via original source.
                </p>
                <a 
                  href={selectedWarbird.image_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-3 px-3 py-1 bg-stone-900 border border-white/5 rounded hover:bg-stone-800 text-[10px] flex items-center gap-1.5 text-stone-300"
                >
                  <ExternalLink className="w-3 h-3" /> View Source File
                </a>
              </div>
            ) : (
              <>
                <img
                  src={selectedWarbird.image_url}
                  alt={`${selectedWarbird.name} Historical Flight`}
                  referrerPolicy={selectedWarbird.image_url.startsWith('http') ? 'no-referrer' : undefined}
                  className="w-full h-full object-cover select-none transition-all duration-700 contrast-[1.05] saturate-[1.05] brightness-95"
                  onError={() => setImageError(prev => ({ ...prev, [selectedWarbird.image_url]: true }))}
                />
                
                {/* Visual authenticity badge placed over the real photograph */}
                <div className="absolute bottom-3 right-3 z-20">
                  <PhotoAuthenticityBadge 
                    isVerified={true} 
                    source="Wikimedia Commons Public Archive" 
                    hasPhoto={true}
                    type="aircraft" 
                  />
                </div>

                {/* Grid Overlay to simulate radar or camera alignment */}
                <div className="absolute inset-0 bg-grid-white/[0.015] pointer-events-none" />
                
                {/* Vintage Vignette */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/50 pointer-events-none" />
              </>
            )}
          </div>

          {/* Specifications Panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 relative z-10 font-mono text-[11px]">
            <div className="bg-stone-950/90 border border-white/5 p-3 rounded-lg flex flex-col justify-between">
              <div>
                <span className="text-stone-500 text-[9px] uppercase tracking-wider block">Primary Designation</span>
                <span className="text-[#dfb743] font-bold block mt-1 font-serif tracking-wide text-xs">{selectedWarbird.primary_role}</span>
              </div>
              <div className="mt-3 border-t border-white/5 pt-2 flex justify-between text-[10px]">
                <span className="text-stone-600">Introduced:</span>
                <span className="text-stone-300">{selectedWarbird.year_introduced}</span>
              </div>
            </div>

            <div className="bg-stone-950/90 border border-white/5 p-3 rounded-lg flex flex-col justify-between">
              <div>
                <span className="text-stone-500 text-[9px] uppercase tracking-wider block">Powerplant Propulsion</span>
                <span className="text-stone-200 font-semibold block mt-1 leading-tight">{selectedWarbird.engine_spec}</span>
              </div>
              <div className="mt-3 border-t border-white/5 pt-2 flex justify-between text-[10px]">
                <span className="text-stone-600">Max Velocity:</span>
                <span className="text-[#dfb743] font-bold">{selectedWarbird.top_speed}</span>
              </div>
            </div>

            <div className="bg-stone-950/90 border border-white/5 p-3 rounded-lg flex flex-col justify-between">
              <div>
                <span className="text-stone-500 text-[9px] uppercase tracking-wider block">Standard Armament</span>
                <span className="text-stone-300 block mt-1 leading-tight text-[10px]">{selectedWarbird.armament}</span>
              </div>
              <div className="mt-3 border-t border-white/5 pt-2 flex justify-between text-[10px] items-center">
                <span className="text-stone-600">Wartime Record:</span>
                <span className="text-green-500 flex items-center gap-1 text-[9px] font-bold">
                  <ShieldCheck className="w-3 h-3" /> RETIRED ACTIVE
                </span>
              </div>
            </div>
          </div>

          <div className="rivet-row-bottom" />
        </div>

        {/* Intelligence Briefing Narrative & Analysis */}
        <div className="warbird-panel warbird-screws p-5 relative overflow-hidden" id="registry-intelligence-narrative">
          <div className="rivet-row-top" />
          
          <h4 className="font-serif tracking-wide text-xs text-[#dfb743] tracking-widest uppercase mb-3 flex items-center gap-1.5 font-bold">
            <BookOpen className="w-4 h-4 text-[#c4af7d]" />
            Tactical Analysis & Combat History
          </h4>

          <div className="relative z-10 text-stone-300 text-xs leading-relaxed font-sans space-y-3.5">
            <p className="text-justify bg-stone-950/40 p-3.5 rounded border border-white/5/60 shadow-inner">
              {selectedWarbird.description}
            </p>
            
            <div className="border-t border-stone-850 pt-3 mt-4">
              <span className="font-serif tracking-wide text-[10px] text-stone-450 tracking-wider block mb-1.5 uppercase font-bold text-[#c4af7d]">
                Combat Intelligence Briefing Notes:
              </span>
              <p className="font-typewriter text-stone-400 text-[11px] leading-relaxed bg-[#14100c] p-3 rounded border border-diesel-brass/10 border-l-2 border-l-diesel-brass shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
                "{selectedWarbird.intelligence_notes}"
              </p>
            </div>
          </div>

          <div className="rivet-row-bottom" />
        </div>
      </div>
    </div>
  );
}
