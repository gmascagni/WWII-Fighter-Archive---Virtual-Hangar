import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Map, 
  MapPin, 
  Compass, 
  Shield, 
  Globe, 
  Crosshair, 
  Radio, 
  Navigation,
  Info,
  Calendar,
  CloudLightning,
  Activity,
  Award
} from 'lucide-react';
import { audioEngine } from './AudioEngine';

interface MapLocation {
  id: string;
  name: string;
  coords: string;
  type: 'Base Airfield' | 'Battleground' | 'Strategic Fortress' | 'Deep Target' | 'Mobile Carrier Base';
  info: string;
  squadron?: string;
  weatherSim: string;
  altitudeSim: string;
  x: number; // Percent on SVG map (0-100)
  y: number; // Percent on SVG map (0-100)
}

interface TheaterData {
  theaterName: string;
  theaterCode: 'EUR' | 'PAC' | 'GBL';
  mapBounds: string;
  locations: MapLocation[];
}

interface TheaterMapProps {
  fighterId: string;
  fighterName: string;
}

const THEATER_DATABASE: Record<string, TheaterData> = {
  'p51-mustang': {
    theaterName: 'European-Mediterranean Theater of Operations',
    theaterCode: 'EUR',
    mapBounds: 'LAT: 35°N - 60°N | LON: 10°W - 20°E',
    locations: [
      {
        id: 'p51-bodney',
        name: 'RAF Bodney (Norfolk, England)',
        coords: '52°34\'N, 0°43\'E',
        type: 'Base Airfield',
        info: 'The main base of the legendary 352nd Fighter Group ("The Blue-Nosed Bastards of Bodney"). Instrumental launch coordinate for long-range deep escort runs protecting B-17 formations.',
        squadron: '352nd Fighter Group ("Blue-Nose")',
        weatherSim: 'Overcast, light wind, 14°C',
        altitudeSim: '140 ft AMSL',
        x: 42,
        y: 35
      },
      {
        id: 'p51-normandy',
        name: 'Normandy Beachhead (France)',
        coords: '49°20\'N, 0°50\'W',
        type: 'Battleground',
        info: 'Flew intense close-support sweeps during D-Day. Cleared Axis scouts, suppressed Panzer movements, and secured absolute Allied air dominance over the beachhead.',
        squadron: '354th Fighter Group',
        weatherSim: 'Scattered clouds, sea breeze, 18°C',
        altitudeSim: 'Sea Level',
        x: 40,
        y: 45
      },
      {
        id: 'p51-bastogne',
        name: 'Bastogne Pocket (Belgium)',
        coords: '50°00\'N, 5°43\'E',
        type: 'Battleground',
        info: 'Provided desperate support during the Battle of the Bulge. Once freezing ground fog cleared, Mustangs strafed Panzer columns and escorted resupply gliders to the 101st Airborne.',
        squadron: '361st Fighter Group',
        weatherSim: 'Severe Frost, Light Snow, -3°C',
        altitudeSim: '1,680 ft AMSL',
        x: 46,
        y: 43
      },
      {
        id: 'p51-wesel',
        name: 'Wesel Rhine Crossing (Germany)',
        coords: '51°39\'N, 6°37\'E',
        type: 'Deep Target',
        info: 'Operation Varsity. Created an absolute protective ring around hundreds of Allied troop-carrying gliders crossing the Rhine, countering high-altitude Luftwaffe interception.',
        squadron: '4th Fighter Group',
        weatherSim: 'Clear skies, calm wind, 11°C',
        altitudeSim: '80 ft AMSL',
        x: 49,
        y: 41
      },
      {
        id: 'p51-berlin',
        name: 'Berlin Airspace (Germany)',
        coords: '52°31\'N, 13°24\'E',
        type: 'Deep Target',
        info: 'Target coordinate for major long-range day-bombing escorts. Mustangs engaged Luftwaffe interceptors directly over the capital, shattering Germany\'s homeland air defense.',
        squadron: '357th Fighter Group ("Yoxford Boys")',
        weatherSim: 'High altitude haze, -42°C (FL280)',
        altitudeSim: '28,000 ft (Flight Level)',
        x: 55,
        y: 36
      }
    ]
  },
  'spitfire-mkix': {
    theaterName: 'European-Mediterranean Theater of Operations',
    theaterCode: 'EUR',
    mapBounds: 'LAT: 35°N - 60°N | LON: 10°W - 20°E',
    locations: [
      {
        id: 'spit-kenley',
        name: 'RAF Kenley (Surrey, England)',
        coords: '51°19\'N, 0°05\'W',
        type: 'Base Airfield',
        info: 'Famous Sector Station airfield. Deployed Spitfire interceptor wings around the clock to block incoming Luftwaffe bomber streams crossing the English Channel.',
        squadron: 'No. 485 Squadron RAF',
        weatherSim: 'Drizzle, cool mist, 12°C',
        altitudeSim: '570 ft AMSL',
        x: 41,
        y: 36
      },
      {
        id: 'spit-dieppe',
        name: 'Dieppe Coastal Zone (France)',
        coords: '49°55\'N, 1°04\'E',
        type: 'Battleground',
        info: 'Rushed combat debut of the Spitfire Mk IX during Operation Jubilee. Proved the new Rolls-Royce Merlin 61 engine could out-climb and counter Germany\'s Fw 190 high-altitude sweeps.',
        squadron: 'No. 611 Squadron (West Lancashire)',
        weatherSim: 'Gale breeze, cloudy, 16°C',
        altitudeSim: '50 ft AMSL',
        x: 41,
        y: 44
      },
      {
        id: 'spit-malta',
        name: 'RAF Luqa (Malta, Mediterranean)',
        coords: '35°51\'N, 14°28\'E',
        type: 'Strategic Fortress',
        info: 'A vital island defense stronghold. Tropicalized Spitfire wings flew off carriers and battled extreme dust to intercept massive Italian and German bombing campaigns from Sicily.',
        squadron: 'No. 126 Squadron RAF',
        weatherSim: 'Arid, dry sand haze, 29°C',
        altitudeSim: '250 ft AMSL',
        x: 49,
        y: 84
      },
      {
        id: 'spit-normandy',
        name: 'Normandy Front (France)',
        coords: '49°22\'N, 0°45\'W',
        type: 'Battleground',
        info: 'Maintained continuous high-cover combat air patrols to deny German night-bombers or photo-recon flights access to Allied troop movements and supply harbors.',
        squadron: 'No. 144 Wing RCAF',
        weatherSim: 'Warm sea breeze, 20°C',
        altitudeSim: '150 ft AMSL',
        x: 40,
        y: 45
      },
      {
        id: 'spit-volkel',
        name: 'Volkel Airbase (Netherlands)',
        coords: '51°39\'N, 5°42\'E',
        type: 'Base Airfield',
        info: 'Advanced tactical airfield inside liberated territory. Spitfire wings launched quick scrambled sweeps to defend allied bridges and intercept early Me 262 jet bombers.',
        squadron: 'No. 80 Squadron RAF',
        weatherSim: 'Cool damp mist, 8°C',
        altitudeSim: '70 ft AMSL',
        x: 46,
        y: 40
      }
    ]
  },
  'p38-lightning': {
    theaterName: 'Pacific-East Asia Theater of Operations',
    theaterCode: 'PAC',
    mapBounds: 'LAT: 30°S - 25°N | LON: 100°E - 170°E',
    locations: [
      {
        id: 'p38-amberley',
        name: 'Amberley Airfield (Queensland, Australia)',
        coords: '27°38\'S, 152°42\'E',
        type: 'Base Airfield',
        info: 'Key heavy-maintenance and strategic logistics assembly base. Prepared Twin-engine Lightnings for demanding combat sorties in the tropical New Guinea theater.',
        squadron: '80th Fighter Squadron ("Headhunters")',
        weatherSim: 'Subtropical, humid, 26°C',
        altitudeSim: '90 ft AMSL',
        x: 75,
        y: 85
      },
      {
        id: 'p38-bismarck',
        name: 'Bismarck Sea (New Guinea)',
        coords: '4°45\'S, 148°15\'E',
        type: 'Battleground',
        info: 'Destroyed crucial Japanese naval transport convoys. P-38 squadrons bypassed convergence difficulties by concentrating heavy 20mm cannons directly in the central nose pod.',
        squadron: '39th Fighter Squadron',
        weatherSim: 'Tropical squall, turbulent, 27°C',
        altitudeSim: '500 ft (Low Altitude)',
        x: 82,
        y: 60
      },
      {
        id: 'p38-rabaul',
        name: 'Rabaul Fortress (New Britain)',
        coords: '4°12\'S, 152\'11\'E',
        type: 'Deep Target',
        info: 'Escorted B-25 and Navy dive-bombers to strike Japan\'s primary south-pacific naval bastion, maintaining air cover over highly fortified anti-aircraft gun belts.',
        squadron: '433rd Fighter Squadron',
        weatherSim: 'Heavy cumulus clouds, 31°C',
        altitudeSim: '12,000 ft',
        x: 84,
        y: 62
      },
      {
        id: 'p38-bougainville',
        name: 'Bougainville (Solomon Islands)',
        coords: '6°12\'S, 155°15\'E',
        type: 'Strategic Fortress',
        info: 'Site of Operation Vengeance. P-38s flew a high-speed, radio-silent, wave-top 400-mile flight path to intercept and down Admiral Yamamoto\'s transport in a flawless ambush.',
        squadron: '339th Fighter Squadron',
        weatherSim: 'Clear sea views, tropical sun, 30°C',
        altitudeSim: '50 ft (Sea Level skimming)',
        x: 88,
        y: 65
      },
      {
        id: 'p38-leyte',
        name: 'Leyte Landing Zones (Philippines)',
        coords: '10°50\'N, 125°00\'E',
        type: 'Battleground',
        info: 'Operated from crude, rain-soaked mud strips. Defended landing troops and naval fleets against Japanese suicide runs and high-altitude bombing sweeps.',
        squadron: '475th Fighter Group ("Satan\'s Playboys")',
        weatherSim: 'Heavy monsoonal rains, 24°C',
        altitudeSim: '150 ft AMSL',
        x: 48,
        y: 52
      }
    ]
  },
  'f6f-hellcat': {
    theaterName: 'Pacific-East Asia Theater of Operations',
    theaterCode: 'PAC',
    mapBounds: 'LAT: 30°S - 25°N | LON: 100°E - 170°E',
    locations: [
      {
        id: 'f6f-enterprise',
        name: 'USS Enterprise CV-6 (Pacific Fleet)',
        coords: '14°00\'N, 142°00\'E',
        type: 'Mobile Carrier Base',
        info: 'The legendary "Big E". Served as the floating catapult deck for top-scoring F6F Navy fighter squadrons throughout major strategic carrier strikes.',
        squadron: 'VF-10 ("Grim Reapers")',
        weatherSim: 'Rolling ocean swells, clear, 28°C',
        altitudeSim: 'Flight Deck (Carrier)',
        x: 62,
        y: 42
      },
      {
        id: 'f6f-wake',
        name: 'Wake Island Atoll (Central Pacific)',
        coords: '19°17\'N, 166°36\'E',
        type: 'Strategic Fortress',
        info: 'Operational combat debut of the F6F. Hellcat divisions surprised Japanese defenses, proving their heavy armour and firepower completely outmatched the nimble Zero.',
        squadron: 'VF-9 Squadron',
        weatherSim: 'Strong trade winds, sunny, 29°C',
        altitudeSim: 'Sea level atoll',
        x: 72,
        y: 38
      },
      {
        id: 'f6f-truk',
        name: 'Truk Lagoon (Caroline Islands)',
        coords: '7°25\'N, 151°47\'E',
        type: 'Deep Target',
        info: 'Operation Hailstone. In a surprise strike, Hellcats swept down to strafe and destroy over 250 aircraft on the ground, neutralizing Japan\'s "Gibraltar of the Pacific".',
        squadron: 'VF-6 Squadron',
        weatherSim: 'Scattered tropical clouds, 30°C',
        altitudeSim: 'Low altitude strafe',
        x: 68,
        y: 55
      },
      {
        id: 'f6f-philippinesee',
        name: 'Philippine Sea (Marianas)',
        coords: '15°00\'N, 138°00\'E',
        type: 'Battleground',
        info: 'The "Great Marianas Turkey Shoot". Guided by carrier radar plots, Hellcats climbed high and systematically splashed 346 Japanese carrier planes in a single day.',
        squadron: 'VF-15 (Target-scoring Unit)',
        weatherSim: 'High altitude clear, -15°C (FL180)',
        altitudeSim: '18,000 ft',
        x: 48,
        y: 48
      },
      {
        id: 'f6f-okinawa',
        name: 'Okinawa Coast (Ryukyu Islands)',
        coords: '26°12\'N, 127°40\'E',
        type: 'Battleground',
        info: 'Around-the-clock defense sweeps to shield Allied fleet vessels. Splashed hundreds of incoming "Kikusui" Kamikaze suicide bombers targeting radar destroyer lines.',
        squadron: 'VF-84 ("Wolfpack")',
        weatherSim: 'Turbulent ocean fronts, 23°C',
        altitudeSim: '3,500 ft intercept',
        x: 42,
        y: 38
      }
    ]
  },
  'p47-thunderbolt': {
    theaterName: 'European-Mediterranean Theater of Operations',
    theaterCode: 'EUR',
    mapBounds: 'LAT: 35°N - 60°N | LON: 10°W - 20°E',
    locations: [
      {
        id: 'p47-halesworth',
        name: 'RAF Halesworth (Suffolk, England)',
        coords: '52°20\'N, 1°30\'E',
        type: 'Base Airfield',
        info: 'Station base for the 56th Fighter Group ("Zemke\'s Wolfpack"). Launched early, heavy Thunderbolt escort sweeps to test early drop-tank flight profiles.',
        squadron: '56th Fighter Group ("Wolfpack")',
        weatherSim: 'Overcast, damp runways, 10°C',
        altitudeSim: '120 ft AMSL',
        x: 42,
        y: 34
      },
      {
        id: 'p47-schweinfurt',
        name: 'Schweinfurt (Germany)',
        coords: '50°02\'N, 10°14\'E',
        type: 'Deep Target',
        info: 'Critical ball-bearing industrial hub. Thunderbolts escorted heavy B-17 formations to their absolute fuel boundaries, engaging swarms of Luftwaffe rocket interceptors.',
        squadron: '78th Fighter Group',
        weatherSim: 'High cirrus clouds, -30°C',
        altitudeSim: '22,000 ft',
        x: 52,
        y: 42
      },
      {
        id: 'p47-stlo',
        name: 'St. Lô Breakthrough (France)',
        coords: '49°07\'N, 1°05\'W',
        type: 'Battleground',
        info: 'Operation Cobra. Nicknamed "The Jug", P-47s became terrifying fighter-bombers, using 8 x .50cal machine guns and heavy wing-bombs to pulverize Panzer reinforcements.',
        squadron: '365th Fighter Group ("Hell Hawks")',
        weatherSim: 'Warm dust haze, 22°C',
        altitudeSim: '400 ft ground attack',
        x: 40,
        y: 45
      },
      {
        id: 'p47-bastogne',
        name: 'Ardennes Forest (Belgium)',
        coords: '50°01\'N, 5°44\'E',
        type: 'Battleground',
        info: 'Relieved encircled soldiers at Bastogne. Its rugged Pratt & Whitney radial engine allowed P-47 pilots to survive heavy ground flak that would cripple liquid-cooled units.',
        squadron: '405th Fighter Group',
        weatherSim: 'Freezing fog, high wind, -4°C',
        altitudeSim: '600 ft close support',
        x: 46,
        y: 43
      },
      {
        id: 'p47-arnhem',
        name: 'Arnhem Glider Lanes (Netherlands)',
        coords: '51°58\'N, 5°54\'E',
        type: 'Deep Target',
        info: 'Operation Market Garden. Flying ahead of transport aircraft, P-47 divisions bombed and strafed German mobile anti-aircraft flak nests along the paratrooper descent route.',
        squadron: '353rd Fighter Group',
        weatherSim: 'Low cloud ceiling, damp, 12°C',
        altitudeSim: '900 ft flak sweep',
        x: 47,
        y: 39
      }
    ]
  },
  'p40-warhawk': {
    theaterName: 'Global & Allied Frontier Theaters',
    theaterCode: 'GBL',
    mapBounds: 'LAT: 40°S - 65°N | LON: 160°W - 140°E',
    locations: [
      {
        id: 'p40-wheeler',
        name: 'Wheeler Field (Oahu, Pearl Harbor)',
        coords: '21°28\'N, 158°02\'W',
        type: 'Base Airfield',
        info: 'Under surprise Japanese raid, pilots George Welch and Ken Taylor scrambled from a small dirt strip, downing several attackers in an historic counter-stand.',
        squadron: '47th Pursuit Squadron',
        weatherSim: 'Explosive smoke, scattered, 25°C',
        altitudeSim: '835 ft AMSL',
        x: 92,
        y: 32
      },
      {
        id: 'p40-kunming',
        name: 'Kunming Airfield (China)',
        coords: '25°01\'N, 102°43\'E',
        type: 'Base Airfield',
        info: 'Main base of the American Volunteer Group ("Flying Tigers"). Blocked Japanese bombers from severing the vital Burma Road supply route using dive-and-zoom tactics.',
        squadron: '1st AVG ("Adam & Eves")',
        weatherSim: 'Monsoonal winds, humid, 21°C',
        altitudeSim: '6,200 ft AMSL',
        x: 28,
        y: 48
      },
      {
        id: 'p40-rangoon',
        name: 'Rangoon Port (Burma)',
        coords: '16°47\'N, 96°09\'E',
        type: 'Strategic Fortress',
        info: 'Flew desperate defensive scrambles against high-altitude Japanese bomber squadrons to preserve cargo docks and ammunition shipping routes.',
        squadron: '3rd AVG ("Hell\'s Angels")',
        weatherSim: 'Heavy tropical fog, 32°C',
        altitudeSim: 'Sea level harbor',
        x: 26,
        y: 55
      },
      {
        id: 'p40-elalamein',
        name: 'El Alamein Desert (Egypt)',
        coords: '30°50\'N, 28°57\'E',
        type: 'Battleground',
        info: 'Desert Air Force. Strafed Rommel\'s armored supply divisions. The P-40\'s robust Allison V-12 liquid cooling system was easy to service under heavy sandstorms.',
        squadron: 'No. 112 Squadron RAF ("Shark Mouth")',
        weatherSim: 'Severe sand gale, hot, 38°C',
        altitudeSim: '120 ft desert basin',
        x: 18,
        y: 78
      },
      {
        id: 'p40-coldbay',
        name: 'Cold Bay Outpost (Aleutian Islands)',
        coords: '55°12\'N, 162°43\'W',
        type: 'Strategic Fortress',
        info: 'Aleutians Campaign. Protected critical Alaskan ports from Japanese carrier scouts, flying missions under freezing, zero-visibility arctic conditions.',
        squadron: '11th Fighter Squadron',
        weatherSim: 'Freezing gale, thick fog, -2°C',
        altitudeSim: '100 ft AMSL',
        x: 78,
        y: 15
      }
    ]
  },
  'f8f-bearcat': {
    theaterName: 'Global & Post-War Operational Stations',
    theaterCode: 'GBL',
    mapBounds: 'LAT: 40°S - 65°N | LON: 160°W - 140°E',
    locations: [
      {
        id: 'f8f-jacksonville',
        name: 'NAS Jacksonville (Florida, USA)',
        coords: '30°13\'N, 81°40\'W',
        type: 'Base Airfield',
        info: 'Inaugural base for the US Navy Blue Angels aerobatic team. Selected for its insane power-to-weight ratio, easily out-climbing early military jets in displays.',
        squadron: 'Inaugural Blue Angels (1946)',
        weatherSim: 'Warm breeze, clear, 27°C',
        altitudeSim: '22 ft AMSL',
        x: 12,
        y: 25
      },
      {
        id: 'f8f-okinawapost',
        name: 'Okinawa Fleet Anchorage (Japan)',
        coords: '26°12\'N, 127°40\'E',
        type: 'Mobile Carrier Base',
        info: 'Deployed aboard front-line carrier wings sailing to challenge Kamikazes. Arrived exactly as the war concluded, shifting to tactical occupation operations.',
        squadron: 'VF-19 squadron ("Satan\'s Cats")',
        weatherSim: 'Calm ocean winds, sunny, 24°C',
        altitudeSim: 'Carrier deck level',
        x: 42,
        y: 38
      },
      {
        id: 'f8f-dienbienphu',
        name: 'Dien Bien Phu Valley (Indochina)',
        coords: '21°23\'N, 103°01\'E',
        type: 'Battleground',
        info: 'French Air Force. Flew heavy close ground-support, napalm and bombing runs under devastating anti-aircraft artillery from the surrounding jungle slopes.',
        squadron: 'GC I/22 "Saintonge" (Armée de l\'air)',
        weatherSim: 'Dense monsoonal humidity, 30°C',
        altitudeSim: '1,100 ft valley floor',
        x: 29,
        y: 54
      },
      {
        id: 'f8f-korat',
        name: 'Korat Airbase (Thailand Frontier)',
        coords: '14°56\'N, 102°04\'E',
        type: 'Strategic Fortress',
        info: 'Royal Thai Air Force. Served as the primary interceptor shield, patrolling remote mountainous border corridors to deter Cold War ground infiltrations.',
        squadron: 'Wing 1, Royal Thai Air Force',
        weatherSim: 'High humidity, tropical storm, 33°C',
        altitudeSim: '600 ft AMSL',
        x: 27,
        y: 58
      }
    ]
  }
};

const FALLBACK_THEATER: TheaterData = {
  theaterName: 'Global Joint Allied Operations Theater',
  theaterCode: 'GBL',
  mapBounds: 'LAT: 40°S - 65°N | LON: 160°W - 140°E',
  locations: [
    {
      id: 'gen-london',
      name: 'RAF Sector Station (London, UK)',
      coords: '51°30\'N, 0°07\'W',
      type: 'Base Airfield',
      info: 'Crucial defensive sector station for intercepting high-altitude bomber streams during major daylight campaigns.',
      weatherSim: 'Overcast, light rain, 11°C',
      altitudeSim: '80 ft AMSL',
      x: 41,
      y: 36
    },
    {
      id: 'gen-pearl',
      name: 'Pearl Harbor (Oahu, Hawaii)',
      coords: '21°22\'N, 157°57\'W',
      type: 'Strategic Fortress',
      info: 'Major Pacific fleet anchorage and tactical airfields. Historic surprise attack point that brought America into the war.',
      weatherSim: 'Tropical sea breeze, 26°C',
      altitudeSim: 'Sea level base',
      x: 92,
      y: 32
    },
    {
      id: 'gen-midway',
      name: 'Midway Island Atoll (Central Pacific)',
      coords: '28°12\'N, 177°21\'W',
      type: 'Battleground',
      info: 'Strategic mid-ocean airfield. The turning point of the Pacific war, where carrier bombers crushed Japan\'s fleet carriers.',
      weatherSim: 'High winds, sunny, 28°C',
      altitudeSim: '15 ft AMSL',
      x: 88,
      y: 28
    },
    {
      id: 'gen-normandy',
      name: 'Normandy Beachhead (France)',
      coords: '49°20\'N, 0°50\'W',
      type: 'Battleground',
      info: 'Operation Overlord. Landing sector for the massive Allied invasion of Europe, supported by continuous fighter sweeps.',
      weatherSim: 'Scattered clouds, 17°C',
      altitudeSim: 'Sea Level Beach',
      x: 40,
      y: 45
    }
  ]
};

export default function TheaterMap({ fighterId, fighterName }: TheaterMapProps) {
  const theater = THEATER_DATABASE[fighterId] || FALLBACK_THEATER;
  const [selectedLoc, setSelectedLoc] = useState<MapLocation>(theater.locations[0]);
  const [radarSweep, setRadarSweep] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showFlightPath, setShowFlightPath] = useState(true);
  const [locationFilter, setLocationFilter] = useState<string>('all');

  // Sync when fighter changes
  useEffect(() => {
    setSelectedLoc(theater.locations[0]);
  }, [fighterId]);

  const handleSelectLocation = (loc: MapLocation) => {
    audioEngine.playClick();
    setSelectedLoc(loc);
  };

  // Helper to render active map vectors based on theater code
  const renderTheaterVectorMap = () => {
    const code = theater.theaterCode;
    
    if (code === 'EUR') {
      return (
        <>
          {/* Great Britain */}
          <path 
            d="M 320 120 L 330 110 L 340 120 L 335 150 L 315 140 Z" 
            className="fill-[#dfd4ba] stroke-[#54432c]/80 stroke-1.5 transition-all duration-300 hover:fill-[#d2c4a4]" 
          />
          {/* Ireland */}
          <path 
            d="M 290 130 L 305 125 L 305 145 L 290 140 Z" 
            className="fill-[#dfd4ba] stroke-[#54432c]/75 stroke-1.5" 
          />
          {/* France / West Europe */}
          <path 
            d="M 320 160 L 350 160 L 380 180 L 410 210 L 360 250 L 320 230 L 330 190 Z" 
            className="fill-[#dfd4ba] stroke-[#54432c]/80 stroke-1.5 transition-all duration-300 hover:fill-[#d2c4a4]" 
          />
          {/* Spain / Portugal */}
          <path 
            d="M 280 240 L 320 230 L 320 270 L 290 280 L 260 270 Z" 
            className="fill-[#dfd4ba] stroke-[#54432c]/60 stroke-1.5" 
          />
          {/* Italy */}
          <path 
            d="M 400 230 L 410 240 L 430 260 L 450 285 L 435 290 L 415 260 L 395 240 Z" 
            className="fill-[#dfd4ba] stroke-[#54432c]/75 stroke-1.5" 
          />
          {/* Greece / Balkans */}
          <path 
            d="M 450 250 L 480 250 L 490 280 L 470 295 L 450 280 Z" 
            className="fill-[#dfd4ba] stroke-[#54432c]/60 stroke-1.5" 
          />
          {/* Scandinavia */}
          <path 
            d="M 360 70 L 390 50 L 420 50 L 410 110 L 380 120 L 360 100 Z" 
            className="fill-[#dfd4ba] stroke-[#54432c]/60 stroke-1.5" 
          />
          {/* Germany / Eastern Europe */}
          <path 
            d="M 350 160 L 420 150 L 490 140 L 510 190 L 470 230 L 400 230 Z" 
            className="fill-[#dfd4ba] stroke-[#54432c]/80 stroke-1.5 transition-all duration-300 hover:fill-[#d2c4a4]" 
          />
          {/* North Africa */}
          <path 
            d="M 200 310 L 350 300 L 450 310 L 580 320 L 580 360 L 200 360 Z" 
            className="fill-[#dfd4ba] stroke-[#54432c]/75 stroke-1.5" 
          />
        </>
      );
    } else if (code === 'PAC') {
      return (
        <>
          {/* Japan */}
          <path 
            d="M 480 80 L 510 90 L 550 130 L 530 140 L 490 100 L 475 90 Z" 
            className="fill-[#dfd4ba] stroke-[#54432c]/80 stroke-1.5 transition-all duration-300 hover:fill-[#d2c4a4]" 
          />
          {/* Okinawa */}
          <polygon points="455,145 460,145 458,150" className="fill-[#c9b99a] stroke-[#54432c]/50 stroke-1" />
          {/* Taiwan */}
          <polygon points="430,170 440,170 435,185" className="fill-[#c9b99a] stroke-[#54432c]/50 stroke-1" />
          {/* Philippines */}
          <path 
            d="M 420 210 L 440 215 L 450 250 L 420 260 L 410 230 Z" 
            className="fill-[#dfd4ba] stroke-[#54432c]/80 stroke-1.5" 
          />
          {/* Borneo / Indonesia */}
          <path 
            d="M 380 270 L 420 265 L 440 290 L 400 320 L 360 300 Z" 
            className="fill-[#dfd4ba] stroke-[#54432c]/60 stroke-1.5" 
          />
          {/* New Guinea */}
          <path 
            d="M 520 295 L 580 295 L 610 310 L 560 330 L 510 315 Z" 
            className="fill-[#dfd4ba] stroke-[#54432c]/80 stroke-1.5" 
          />
          {/* Solomons */}
          <path 
            d="M 620 310 L 650 325 L 640 335 L 610 320 Z" 
            className="fill-[#dfd4ba] stroke-[#54432c]/80 stroke-1.5" 
          />
          {/* Australia North */}
          <path 
            d="M 450 350 L 530 355 L 600 360 L 610 400 L 420 400 Z" 
            className="fill-[#dfd4ba] stroke-[#54432c]/60 stroke-1.5" 
          />
          {/* Wake Island Atoll circle */}
          <circle cx="720" cy="152" r="3" className="fill-[#dfd4ba] stroke-[#54432c]/50" />
          {/* Truk Lagoon circle */}
          <circle cx="680" cy="220" r="4" className="fill-[#dfd4ba] stroke-[#54432c]/50" />
        </>
      );
    } else {
      // Global wider map
      return (
        <>
          {/* North America */}
          <path 
            d="M 50 100 L 150 90 L 220 120 L 180 180 L 140 170 L 110 200 L 80 160 Z" 
            className="fill-[#dfd4ba] stroke-[#54432c]/60 stroke-1.5" 
          />
          {/* South America */}
          <path 
            d="M 140 210 L 180 210 L 210 260 L 180 340 L 150 350 L 130 250 Z" 
            className="fill-[#dfd4ba] stroke-[#54432c]/50 stroke-1.5" 
          />
          {/* Africa */}
          <path 
            d="M 360 200 L 430 200 L 480 230 L 490 280 L 450 340 L 410 340 L 370 250 Z" 
            className="fill-[#dfd4ba] stroke-[#54432c]/60 stroke-1.5" 
          />
          {/* Europe / Asia */}
          <path 
            d="M 360 100 L 450 80 L 600 80 L 700 110 L 720 160 L 650 200 L 550 210 L 480 170 Z" 
            className="fill-[#dfd4ba] stroke-[#54432c]/80 stroke-1.5" 
          />
          {/* India / SE Asia */}
          <path 
            d="M 480 170 L 520 180 L 540 210 L 560 230 L 520 220 Z" 
            className="fill-[#dfd4ba] stroke-[#54432c]/80 stroke-1.5" 
          />
          {/* Australia */}
          <path 
            d="M 620 290 L 680 295 L 690 330 L 630 330 Z" 
            className="fill-[#dfd4ba] stroke-[#54432c]/60 stroke-1.5" 
          />
        </>
      );
    }
  };

  const getPinColor = (type: string, isSelected: boolean) => {
    if (isSelected) return 'text-red-700 fill-red-700';
    switch (type) {
      case 'Base Airfield': return 'text-emerald-700 fill-emerald-800';
      case 'Battleground': return 'text-red-800 fill-red-900';
      case 'Strategic Fortress': return 'text-amber-800 fill-amber-900';
      case 'Mobile Carrier Base': return 'text-indigo-800 fill-indigo-900';
      default: return 'text-[#54432c] fill-[#8c7456]';
    }
  };

  const filteredLocations = theater.locations.filter(loc => {
    if (locationFilter === 'all') return true;
    return loc.type === locationFilter;
  });

  return (
    <div className="warbird-panel warbird-screws p-5 relative overflow-hidden flex flex-col gap-6" id="theater-operations-map">
      <div className="rivet-row-top" />

      {/* Panel Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-stone-800 pb-3 gap-3">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-diesel-brass animate-pulse" />
          <div className="text-left">
            <span className="font-stencil text-xs text-diesel-gold tracking-widest uppercase block font-bold">
              Theater of Operations Map
            </span>
            <span className="text-[10px] font-mono text-stone-500 block">
              {theater.theaterName}
            </span>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex flex-wrap gap-2 text-[10px] font-mono">
          {/* Map display triggers */}
          <button
            onClick={() => { audioEngine.playClick(); setShowGrid(!showGrid); }}
            className={`px-2 py-1 rounded border transition-colors uppercase font-stencil cursor-pointer ${
              showGrid 
                ? 'bg-diesel-brass/20 border-diesel-brass text-[#eed095]' 
                : 'bg-stone-950 border-stone-800/80 text-stone-500'
            }`}
          >
            Tactical Grid
          </button>
          <button
            onClick={() => { audioEngine.playClick(); setRadarSweep(!radarSweep); }}
            className={`px-2 py-1 rounded border transition-colors uppercase font-stencil cursor-pointer ${
              radarSweep 
                ? 'bg-diesel-brass/20 border-diesel-brass text-[#eed095]' 
                : 'bg-stone-950 border-stone-800/80 text-stone-500'
            }`}
          >
            Tactical Scan
          </button>
          <button
            onClick={() => { audioEngine.playClick(); setShowFlightPath(!showFlightPath); }}
            className={`px-2 py-1 rounded border transition-colors uppercase font-stencil cursor-pointer ${
              showFlightPath 
                ? 'bg-diesel-brass/20 border-diesel-brass text-[#eed095]' 
                : 'bg-stone-950 border-stone-800/80 text-stone-500'
            }`}
          >
            Flight Path
          </button>

          {/* Location Filters */}
          <select
            value={locationFilter}
            onChange={(e) => { audioEngine.playClick(); setLocationFilter(e.target.value); }}
            className="bg-stone-950 border border-stone-800 text-[#eed095] rounded px-2 py-1 cursor-pointer focus:outline-none focus:border-diesel-brass text-[10px]"
          >
            <option value="all">ALL LOCATIONS</option>
            <option value="Base Airfield">BASE AIRFIELDS</option>
            <option value="Battleground">BATTLEGROUNDS</option>
            <option value="Strategic Fortress">FORTRESSES</option>
            <option value="Deep Target">DEEP TARGETS</option>
          </select>
        </div>
      </div>

      {/* Main Map + Info Split */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">
        
        {/* Interactive Tactical Projection Map with Vintage Weathered Paper Aesthetic */}
        <div 
          className="xl:col-span-2 bg-[#ecdcb9] border-2 border-[#8c7456] rounded-lg p-3 relative overflow-hidden flex flex-col justify-between aspect-video min-h-[300px] shadow-[inset_0_0_80px_rgba(100,75,40,0.35),_0_10px_30px_rgba(0,0,0,0.65)]" 
          id="tactical-svg-canvas"
          style={{
            backgroundImage: `
              radial-gradient(circle at 15% 25%, rgba(139, 90, 43, 0.09) 0%, transparent 45%),
              radial-gradient(circle at 85% 75%, rgba(100, 70, 30, 0.09) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.35) 0%, transparent 100%)
            `
          }}
        >
          {/* Weathered paper fold crease overlays */}
          <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.14] mix-blend-multiply">
            {/* Top-left to bottom-right crease line */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-stone-800 to-transparent" style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 99.5%, 0 0.5%)' }} />
            {/* Horizontal fold */}
            <div className="absolute top-[49%] left-0 w-full h-[4px] bg-gradient-to-b from-stone-900 via-stone-100 to-transparent" />
            <div className="absolute top-[50%] left-0 w-full h-[3px] bg-gradient-to-b from-transparent via-stone-900 to-stone-100" />
            {/* Vertical fold */}
            <div className="absolute left-[51%] top-0 h-full w-[4px] bg-gradient-to-r from-stone-900 via-stone-100 to-transparent" />
            <div className="absolute left-[52%] top-0 h-full w-[3px] bg-gradient-to-r from-transparent via-stone-900 to-stone-100" />
            
            {/* Stains */}
            <div className="absolute top-[12%] left-[22%] w-[110px] h-[80px] bg-amber-900/15 rounded-full blur-2xl" />
            <div className="absolute top-[68%] left-[68%] w-[160px] h-[120px] bg-amber-900/15 rounded-full blur-3xl" />
          </div>

          {/* Tactical Crosshair Background */}
          {showGrid && (
            <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.16] mix-blend-multiply">
              {/* Concentric rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full border border-[#54432c] border-dashed" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-[#54432c] border-dashed" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] rounded-full border border-[#54432c]" />

              {/* Grid axes */}
              <div className="absolute inset-x-0 top-1/2 border-t border-[#54432c]" />
              <div className="absolute inset-y-0 left-1/2 border-l border-[#54432c]" />
              
              {/* Telemetry Labels */}
              <div className="absolute bottom-2 left-3 font-mono text-[8px] text-[#54432c] font-bold">
                PROJ: LAMBERT CONFORMAL | MAP RANGE: {theater.mapBounds}
              </div>
              <div className="absolute top-2 right-3 font-mono text-[8px] text-[#54432c] font-bold uppercase">
                STATUS: CARTOGRAPHIC POSITION INDEX
              </div>
            </div>
          )}

          {/* Animated Searchlight Sweep / Vintage Scanner Overlay */}
          {radarSweep && (
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden mix-blend-multiply opacity-20">
              <div className="w-full h-[300%] bg-gradient-to-b from-transparent via-[#8c7456]/25 to-transparent animate-radar-sweep absolute top-[-200%]" />
            </div>
          )}

          {/* Interactive SVG Map Container */}
          <div className="relative w-full h-full flex-1 z-10">
            <svg 
              viewBox="0 0 800 400" 
              className="w-full h-full select-none animate-fade-in"
              id="theaters-vector-graphics"
            >
              {/* Antique Compass Rose */}
              <g transform="translate(100, 310) scale(0.65)" className="opacity-45 pointer-events-none">
                <circle cx="0" cy="0" r="36" className="stroke-[#54432c]/50 fill-none stroke-[1]" />
                <circle cx="0" cy="0" r="32" className="stroke-[#54432c]/30 fill-none stroke-[1]" strokeDasharray="2,2" />
                {/* 8-point compass star */}
                <polygon points="0,0 -5,-9 0,-40" className="fill-[#54432c]" />
                <polygon points="0,0 5,-9 0,-40" className="fill-[#8c7456]" />
                <polygon points="0,0 -5,9 0,40" className="fill-[#8c7456]" />
                <polygon points="0,0 5,9 0,40" className="fill-[#54432c]" />
                <polygon points="0,0 9,-5 40,0" className="fill-[#54432c]" />
                <polygon points="0,0 9,5 40,0" className="fill-[#8c7456]" />
                <polygon points="0,0 -9,-5 -40,0" className="fill-[#8c7456]" />
                <polygon points="0,0 -9,5 -40,0" className="fill-[#54432c]" />
                {/* Diagonal secondary points */}
                <polygon points="0,0 -4,-4 -20,-20" className="fill-[#54432c]" />
                <polygon points="0,0 4,-4 -20,-20" className="fill-[#8c7456]" />
                <polygon points="0,0 -4,4 20,22" className="fill-[#8c7456]" />
                <polygon points="0,0 4,4 20,22" className="fill-[#54432c]" />
                <polygon points="0,0 4,-4 20,-20" className="fill-[#54432c]" />
                <polygon points="0,0 -4,-4 20,-20" className="fill-[#8c7456]" />
                <polygon points="0,0 4,4 -20,22" className="fill-[#8c7456]" />
                <polygon points="0,0 -4,4 -20,22" className="fill-[#54432c]" />
                {/* Center pin */}
                <circle cx="0" cy="0" r="4.5" className="fill-[#ecdcb9] stroke-[#54432c] stroke-[1.5]" />
                <text x="0" y="-45" textAnchor="middle" className="fill-[#54432c] font-stencil text-[11px] font-bold">N</text>
                <text x="0" y="52" textAnchor="middle" className="fill-[#54432c] font-stencil text-[10px]">S</text>
                <text x="46" y="4" textAnchor="start" className="fill-[#54432c] font-stencil text-[10px]">E</text>
                <text x="-46" y="4" textAnchor="end" className="fill-[#54432c] font-stencil text-[10px]">W</text>
              </g>

              {/* Scale of Nautical Miles */}
              <g transform="translate(640, 360)" className="opacity-55 pointer-events-none">
                <text x="0" y="-8" className="fill-[#54432c] font-mono text-[8px] tracking-wider uppercase font-bold">Nautical Miles</text>
                {/* Alternating ink bars */}
                <rect x="0" y="0" width="30" height="3" className="fill-[#54432c] stroke-[#54432c]" />
                <rect x="30" y="0" width="30" height="3" className="fill-none stroke-[#54432c]" />
                <rect x="60" y="0" width="30" height="3" className="fill-[#54432c] stroke-[#54432c]" />
                <rect x="90" y="0" width="30" height="3" className="fill-none stroke-[#54432c]" />
                <line x1="0" y1="6" x2="0" y2="3" className="stroke-[#54432c]" />
                <line x1="30" y1="6" x2="30" y2="3" className="stroke-[#54432c]" />
                <line x1="60" y1="6" x2="60" y2="3" className="stroke-[#54432c]" />
                <line x1="90" y1="6" x2="90" y2="3" className="stroke-[#54432c]" />
                <line x1="120" y1="6" x2="120" y2="3" className="stroke-[#54432c]" />
                <text x="0" y="14" textAnchor="middle" className="fill-[#54432c] font-mono text-[7px]">0</text>
                <text x="30" y="14" textAnchor="middle" className="fill-[#54432c] font-mono text-[7px]">200</text>
                <text x="60" y="14" textAnchor="middle" className="fill-[#54432c] font-mono text-[7px]">400</text>
                <text x="90" y="14" textAnchor="middle" className="fill-[#54432c] font-mono text-[7px]">600</text>
                <text x="120" y="14" textAnchor="middle" className="fill-[#54432c] font-mono text-[7px]">800</text>
              </g>

              {/* Latitude/Longitude grid lines overlay on vector */}
              {showGrid && (
                <g className="stroke-[#54432c]/25 stroke-[0.75]" strokeDasharray="2,3">
                  <line x1="0" y1="100" x2="800" y2="100" />
                  <line x1="0" y1="200" x2="800" y2="200" />
                  <line x1="0" y1="300" x2="800" y2="300" />
                  <line x1="200" y1="0" x2="200" y2="400" />
                  <line x1="400" y1="0" x2="400" y2="400" />
                  <line x1="600" y1="0" x2="600" y2="400" />
                  
                  {/* Grid Text Indicators */}
                  <text x="5" y="112" className="fill-[#54432c]/55 font-mono text-[9px] font-bold">45° N</text>
                  <text x="5" y="212" className="fill-[#54432c]/55 font-mono text-[9px] font-bold">15° N</text>
                  <text x="5" y="312" className="fill-[#54432c]/55 font-mono text-[9px] font-bold">15° S</text>
                  <text x="205" y="15" className="fill-[#54432c]/55 font-mono text-[9px] font-bold">120° W</text>
                  <text x="405" y="15" className="fill-[#54432c]/55 font-mono text-[9px] font-bold">20° E</text>
                  <text x="605" y="15" className="fill-[#54432c]/55 font-mono text-[9px] font-bold">140° E</text>
                </g>
              )}

              {/* Theater Landmass SVG Paths */}
              {renderTheaterVectorMap()}

              {/* Connecting Tactical Flight Path */}
              {showFlightPath && filteredLocations.length > 1 && (
                <g>
                  {filteredLocations.map((loc, idx) => {
                    if (idx === 0) return null;
                    const prevLoc = filteredLocations[idx - 1];
                    const startX = (prevLoc.x / 100) * 800;
                    const startY = (prevLoc.y / 100) * 400;
                    const endX = (loc.x / 100) * 800;
                    const endY = (loc.y / 100) * 400;

                    return (
                      <g key={`path-${idx}`}>
                        {/* Connecting line (Vintage red-ink dash path) */}
                        <line 
                          x1={startX} 
                          y1={startY} 
                          x2={endX} 
                          y2={endY} 
                          className="stroke-[#962d2d]/55 stroke-[1.5] transition-all"
                          strokeDasharray="4,4"
                        />
                        {/* Direction Arrow Vector */}
                        <circle 
                          cx={(startX + endX) / 2} 
                          cy={(startY + endY) / 2} 
                          r="3" 
                          className="fill-[#962d2d]/70" 
                        />
                      </g>
                    );
                  })}
                </g>
              )}

              {/* Active Location Pinned Marks */}
              {filteredLocations.map((loc) => {
                const isSelected = selectedLoc.id === loc.id;
                const mapX = (loc.x / 100) * 800;
                const mapY = (loc.y / 100) * 400;

                return (
                  <g 
                    key={loc.id}
                    className="cursor-pointer group"
                    onClick={() => handleSelectLocation(loc)}
                  >
                    {/* Glowing outer grease-pencil rings for selected location */}
                    {isSelected && (
                      <>
                        <circle 
                          cx={mapX} 
                          cy={mapY} 
                          r="15" 
                          className="stroke-[#962d2d]/30 fill-none animate-ping" 
                        />
                        <circle 
                          cx={mapX} 
                          cy={mapY} 
                          r="25" 
                          className="stroke-[#962d2d]/20 fill-none animate-pulse-slow" 
                        />
                      </>
                    )}

                    {/* Standard Hover pulse */}
                    <circle 
                      cx={mapX} 
                      cy={mapY} 
                      r="10" 
                      className="fill-[#8c7456]/15 stroke-[#8c7456]/20 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all" 
                    />

                    {/* Outer target ring for selected pin */}
                    {isSelected && (
                      <circle 
                        cx={mapX} 
                        cy={mapY} 
                        r="7" 
                        className="stroke-[#962d2d] fill-none stroke-[1.5]"
                      />
                    )}

                    {/* Main Vintage Tactical Map Pin */}
                    <circle 
                      cx={mapX} 
                      cy={mapY} 
                      r={isSelected ? "3.5" : "4.5"} 
                      className={`transition-all duration-300 ${
                        isSelected 
                          ? 'fill-[#b22222] stroke-[#ecdcb9] stroke-[1.5] drop-shadow-md' 
                          : loc.type === 'Base Airfield' 
                            ? 'fill-[#2e6f40] stroke-[#ecdcb9] stroke-1 hover:scale-110' 
                            : loc.type === 'Battleground'
                              ? 'fill-[#962d2d] stroke-[#ecdcb9] stroke-1 hover:scale-110'
                              : 'fill-[#a5702d] stroke-[#ecdcb9] stroke-1 hover:scale-110'
                      }`}
                    />

                    {/* Ink crosshair indicator inside active selection */}
                    {isSelected && (
                      <g className="stroke-[#962d2d] stroke-[0.75]">
                        <line x1={mapX - 11} y1={mapY} x2={mapX + 11} y2={mapY} />
                        <line x1={mapX} y1={mapY - 11} x2={mapX} y2={mapY + 11} />
                      </g>
                    )}

                    {/* Vintage Hand-inked Hover/Active Label */}
                    <text 
                      x={mapX} 
                      y={mapY - 14} 
                      textAnchor="middle" 
                      className={`font-mono text-[9px] font-extrabold select-none pointer-events-none transition-all ${
                        isSelected ? 'opacity-100 fill-[#8b0000] scale-105' : 'opacity-0 group-hover:opacity-100 fill-[#54432c]'
                      }`}
                    >
                      {loc.name.split(' (')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Color Legend */}
          <div className="flex justify-start items-center gap-4 border-t border-[#8c7456]/40 pt-2 z-10 font-mono text-[9px] text-[#54432c] flex-wrap">
            <span className="font-bold text-[#4a3a22]">MAP LEGEND:</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#2e6f40] border border-[#ecdcb9]" />
              Base Airfield
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#962d2d] border border-[#ecdcb9]" />
              Battleground
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#a5702d] border border-[#ecdcb9]" />
              Strategic Fortress / Op
            </span>
            <span className="text-[#6c593e] font-extrabold ml-auto hidden sm:inline">
              [VINTAGE CARTOGRAPHY SUITE v1.0]
            </span>
          </div>
        </div>

        {/* Intelligence Briefing Dossier Column */}
        <div className="xl:col-span-1 border border-stone-900/80 bg-stone-950/80 rounded-lg p-4 font-mono text-[11px] flex flex-col justify-between" id="map-intelligence-dossier">
          <div>
            <div className="flex items-center justify-between border-b border-stone-800 pb-2.5 mb-3">
              <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block">
                Deployment Intel Report
              </span>
              <span className="px-1.5 py-0.5 bg-diesel-brass/10 text-diesel-gold text-[8px] font-bold uppercase border border-diesel-brass/35 rounded">
                SECURE BRIEFING
              </span>
            </div>

            <span className="text-[9px] text-diesel-brass font-bold uppercase tracking-widest block mb-1">
              OPERATIONAL POSITION PROFILE
            </span>
            <h4 className="text-[15px] text-stone-100 font-stencil uppercase mb-3 flex items-start gap-1.5 leading-tight">
              <Navigation className="w-4.5 h-4.5 text-diesel-gold shrink-0 mt-0.5 animate-pulse" />
              {selectedLoc.name}
            </h4>

            {/* Grid stats */}
            <div className="grid grid-cols-2 gap-3 mb-4 border-y border-stone-900 py-3 text-[10px]">
              <div>
                <span className="text-stone-500 uppercase block text-[8px]">Coordinates</span>
                <span className="text-stone-300 flex items-center gap-1 font-bold">
                  <Crosshair className="w-3 h-3 text-diesel-brass" />
                  {selectedLoc.coords}
                </span>
              </div>
              <div>
                <span className="text-stone-500 uppercase block text-[8px]">AMSL Elevation</span>
                <span className="text-stone-300 flex items-center gap-1 font-bold">
                  <Activity className="w-3 h-3 text-diesel-brass" />
                  {selectedLoc.altitudeSim}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-stone-500 uppercase block text-[8px]">Tactical Sector Classification</span>
                <span className={`px-2 py-0.5 rounded font-bold uppercase text-[9px] border inline-block mt-1 ${
                  selectedLoc.type === 'Base Airfield' 
                    ? 'text-emerald-400 bg-emerald-950/40 border-emerald-900/40' 
                    : selectedLoc.type === 'Battleground'
                      ? 'text-red-400 bg-red-950/40 border-red-900/40'
                      : 'text-diesel-brass bg-stone-900/40 border-stone-800/60'
                }`}>
                  {selectedLoc.type}
                </span>
              </div>
              {selectedLoc.squadron && (
                <div className="col-span-2">
                  <span className="text-stone-500 uppercase block text-[8px]">Stationed Wing/Squadron</span>
                  <span className="text-stone-300 font-bold block mt-0.5 text-[9.5px]">
                    {selectedLoc.squadron}
                  </span>
                </div>
              )}
            </div>

            {/* Historical Summary */}
            <div className="space-y-3 mb-4">
              <div>
                <span className="text-stone-500 uppercase block text-[8px] tracking-wider mb-1">
                  HISTORICAL COMBAT SUMMARY
                </span>
                <p className="text-stone-300 leading-relaxed text-[11px] font-mono bg-stone-900/20 p-2.5 rounded border border-stone-900/40">
                  {selectedLoc.info}
                </p>
              </div>

              {/* Weather simulation condition */}
              <div className="flex justify-between items-center bg-stone-900/40 p-2 rounded border border-stone-900/60 text-[10px]">
                <span className="text-stone-500 flex items-center gap-1">
                  <CloudLightning className="w-3.5 h-3.5 text-diesel-brass" />
                  Local Combat Meteorology:
                </span>
                <span className="text-stone-300 font-bold">{selectedLoc.weatherSim}</span>
              </div>
            </div>
          </div>

          {/* Quick Selection Carousel */}
          <div>
            <span className="text-[9px] text-stone-500 font-bold uppercase tracking-widest block mb-2">
              Select Position Pinned on Map:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {theater.locations.map((loc) => {
                const isSelected = selectedLoc.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => handleSelectLocation(loc)}
                    className={`p-1.5 rounded text-left truncate transition-all border font-mono text-[9.5px] cursor-pointer ${
                      isSelected 
                        ? 'bg-diesel-brass/10 border-diesel-brass text-diesel-gold font-bold shadow-sm' 
                        : 'bg-stone-900/40 border-stone-900 hover:bg-stone-900/80 hover:border-stone-800 text-stone-400'
                    }`}
                  >
                    • {loc.name.split(' (')[0]}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      <div className="rivet-row-bottom" />
    </div>
  );
}
