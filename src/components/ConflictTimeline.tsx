import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Target, 
  Award, 
  Bookmark, 
  ChevronRight, 
  Compass, 
  ShieldAlert, 
  BookOpen,
  Skull,
  TrendingUp
} from 'lucide-react';
import { audioEngine } from './AudioEngine';

interface BattleInfo {
  id: string;
  date: string;
  name: string;
  location: string;
  role: string;
  description: string;
  result: string;
  alliedLosses?: string;
  axisLosses?: string;
  tacticalLesson?: string;
}

interface ConflictTimelineProps {
  fighterId: string;
  fighterName: string;
}

const HISTORICAL_TIMELINE: Record<string, BattleInfo[]> = {
  'p51-mustang': [
    {
      id: 'p51-pointblank',
      date: 'Jan 1944',
      name: 'Operation Pointblank',
      location: 'Skies over Germany',
      role: 'High-Altitude Bomber Escort',
      description: 'Equipped with heavy drop tanks, Mustang divisions escort bomber formations deep into Axis territory. By challenging the Luftwaffe in day-raids, they break German air intercept logistics.',
      result: 'Allied Air Superiority',
      alliedLosses: 'Moderate bomber casualties',
      axisLosses: 'Heavy veteran pilot attrition',
      tacticalLesson: 'Long-range drop tanks combined with laminar-flow wings allow escorts to stay with heavy bombers for the entire flight path.'
    },
    {
      id: 'p51-berlin',
      date: 'Mar 1944',
      name: 'Battle of Berlin Raids',
      location: 'Berlin Airspace, Germany',
      role: 'Combat Air Patrol / Escort',
      description: 'Defending B-17 Flying Fortresses in day-raids over Berlin. Mustangs intercept swarms of interceptors, dealing crushing blow to Germany\'s homeland air defense.',
      result: 'Decisive Victory',
      alliedLosses: '69 bombers, 11 escorts',
      axisLosses: '120+ Luftwaffe fighters',
      tacticalLesson: 'Mustangs use high-speed escort weaves to intercept German attackers before they can establish rocket firing lines.'
    },
    {
      id: 'p51-overlord',
      date: 'Jun 1944',
      name: 'Operation Overlord (D-Day)',
      location: 'Normandy Beachheads, France',
      role: 'Low-Altitude Strafing & Sweep',
      description: 'Establishing total Allied air supremacy over the landing zones. Mustangs sweep away Luftwaffe scouts and strafe Panzer supply links and bridges in landward Normandy.',
      result: 'Air Dominance Secured',
      alliedLosses: 'Extremely Low',
      axisLosses: 'Complete tactical suppression',
      tacticalLesson: 'Close coordination between ground forward-controllers and high-patrol Mustangs accelerates tactical tank suppression.'
    },
    {
      id: 'p51-bulge',
      date: 'Dec 1944',
      name: 'Battle of the Bulge Support',
      location: 'The Ardennes Forest, Belgium',
      role: 'Ground Attack & Escort',
      description: 'Operating in hazardous, sub-zero winter fog. As skies clear, Mustangs carry out low-level runs to shatter German troop spearheads, relieving besieged troops at Bastogne.',
      result: 'Critical Allied Victory',
      alliedLosses: '14 aircraft to flak',
      axisLosses: '80+ tanks and trucks destroyed',
      tacticalLesson: 'Fighters can double as tactical bombers when fitted with heavy underwing rocket rails.'
    },
    {
      id: 'p51-varsity',
      date: 'Mar 1945',
      name: 'Operation Varsity',
      location: 'Wesel, Rhine River, Germany',
      role: 'Airborne Escort & Protection',
      description: 'Safeguarding massive transport aircraft and gliders crossing the Rhine in the largest single-day airborne action in historical combat.',
      result: 'Strategic Air Success',
      alliedLosses: 'Minimal escort losses',
      axisLosses: '34 interceptors shot down',
      tacticalLesson: 'Establishing low-level patrol zones ahead of troop transports prevents slow gliders from being intercepted on approach.'
    }
  ],
  'spitfire-mkix': [
    {
      id: 'spit-britain',
      date: 'Jul-Oct 1940',
      name: 'Battle of Britain',
      location: 'Southern England Skies',
      role: 'Fighter Interceptor Sweep',
      description: 'While the Mk IX variant was rushed into service later in 1942, Spitfire legacy starts here. Spitfires engage German escort fighters to protect RAF airfields and civilian radar stations.',
      result: 'British Strategic Victory',
      alliedLosses: '544 pilots lost, 1,000+ planes',
      axisLosses: '1,800+ aircraft destroyed',
      tacticalLesson: 'Interceptors focus on escorting Bf 109s, allowing slower Hurricanes to destroy the bomber formations.'
    },
    {
      id: 'spit-dieppe',
      date: 'Aug 1942',
      name: 'Battle of Dieppe (Operation Jubilee)',
      location: 'Dieppe Beachheads, France',
      role: 'Early Combat Debut of Mk IX',
      description: 'The Spitfire Mk IX is rushed to the frontline to counter Germany\'s Fw 190. In heavy dogfights, the Mk IX successfully restores tactical equality.',
      result: 'Air Success / Ground Stalemate',
      alliedLosses: '106 aircraft total',
      axisLosses: '48 Luftwaffe planes',
      tacticalLesson: 'The Rolls-Royce Merlin 60-series engine with two-stage supercharger eliminates the performance gap at high altitude.'
    },
    {
      id: 'spit-malta',
      date: 'Oct 1942',
      name: 'Defense of Malta Siege',
      location: 'Malta Island, Mediterranean',
      role: 'Island Strategic Defense',
      description: 'Spitfires fly off Royal Navy carrier decks to safeguard the besieged fortress of Malta, intercepting heavy Axis bomber wings from Sicily.',
      result: 'Vital Air Siege Relieved',
      alliedLosses: '24 aircraft lost',
      axisLosses: '130+ Axis bombers and fighters',
      tacticalLesson: 'Tropicalized Spitfires fitted with sand filters can defend dusty Mediterranean airfields with minimal turbine failure.'
    },
    {
      id: 'spit-overlord',
      date: 'Jun 1944',
      name: 'Invasion of Normandy (D-Day)',
      location: 'Normandy beachheads, France',
      role: 'Beachhead Defense Patrols',
      description: 'RAF Spitfires fly continuous low-to-mid level sweeps. They successfully deny the Luftwaffe any chance of inspecting or bombing the Allied invasion fleets.',
      result: 'Total Air Supremacy',
      alliedLosses: 'Negligible in air-to-air',
      axisLosses: '15 reconnaissance planes',
      tacticalLesson: 'Maintaining continuous air umbrella patrols over the English Channel prevents German night-bomber insertions.'
    },
    {
      id: 'spit-bodenplatte',
      date: 'Jan 1945',
      name: 'Operation Bodenplatte Counter',
      location: 'Allied Airfields, Low Countries',
      role: 'Tactical Airfield Scramble',
      description: 'Luftwaffe launches a surprise New Year\'s Day airfield assault. Rallied Spitfire pilots scramble directly under strafing fire to shoot down the attackers.',
      result: 'Decisive Defense Victory',
      alliedLosses: '32 planes on ground',
      axisLosses: '300+ Luftwaffe aircraft lost',
      tacticalLesson: 'Luftwaffe\'s surprise raid fails due to low fuel reserves and a high ratio of inexperienced replacement pilots.'
    }
  ],
  'p38-lightning': [
    {
      id: 'p38-bismarck',
      date: 'Mar 1943',
      name: 'Battle of the Bismarck Sea',
      location: 'Bismarck Sea, South Pacific',
      role: 'Low-Altitude Bomber Escort',
      description: 'Lightnings provide fighter cover for Allied B-25 Mitchells, utilizing heavy fire-power to rip through Japanese naval convoy defenses.',
      result: 'Decisive Allied Victory',
      alliedLosses: '4 aircraft lost',
      axisLosses: '8 troop ships, 4 destroyers sunk',
      tacticalLesson: 'Concentrating heavy armament in the central nose pod rather than wings eliminates convergence issues during low strafes.'
    },
    {
      id: 'p38-vengeance',
      date: 'Apr 18, 1943',
      name: 'Operation Vengeance',
      location: 'Bougainville Skies, Solomons',
      role: 'Long-Range Air Intercept',
      description: 'Flying 400 miles at wave-top level under strict radio silence to intercept and down Admiral Yamamoto\'s transport plane in a precision stroke.',
      result: 'Flawless Operation Success',
      alliedLosses: '1 P-38 Lightning lost',
      axisLosses: '2 G4M Betty transports destroyed',
      tacticalLesson: 'Twin-engine redundancy is crucial for long-range oceanic operations where engine failure means certain loss.'
    },
    {
      id: 'p38-rabaul',
      date: 'Nov 1943',
      name: 'Raid on Rabaul',
      location: 'New Britain, Pacific',
      role: 'Carrier Bomber Escort',
      description: 'Providing air defense for SBD Dauntless dive bombers during heavy carrier-launched strikes on the fortified naval base.',
      result: 'Combined Strategic Victory',
      alliedLosses: '15 aircraft total',
      axisLosses: '25+ Japanese fighters downed',
      tacticalLesson: 'P-38 high climb speed allows pilots to guard slow dive-bombers from incoming Zero intercepts above.'
    },
    {
      id: 'p38-leyte',
      date: 'Oct 1944',
      name: 'Battle of Leyte Gulf',
      location: 'Philippine Sea / Leyte',
      role: 'Tactical Combat Air Patrol',
      description: 'Operating from crude runways, P-38s dominate the airspace over Leyte, providing heavy protection to landing troops.',
      result: 'Tactical Success',
      alliedLosses: 'Minimal air casualties',
      axisLosses: '45+ enemy aircraft',
      tacticalLesson: 'Excellent fuel capacity allows the P-38 to hover over the landing beachhead far longer than standard carrier fighters.'
    },
    {
      id: 'p38-mindoro',
      date: 'Dec 1944',
      name: 'Battle of Mindoro Convoy',
      location: 'Mindoro Island, Philippines',
      role: 'Kamikaze Air Defense',
      description: 'Intercepting suicide air wings targeting Allied troop ships during heavy monsoonal rain storms.',
      result: 'Successful Intercept Defense',
      alliedLosses: '2 transport ships damaged',
      axisLosses: '40+ kamikaze planes destroyed',
      tacticalLesson: 'Heavy nose cannons disintegrate suicide attackers at safe distances, preventing them from gliding into ship hulls.'
    }
  ],
  'f6f-hellcat': [
    {
      id: 'f6f-wake',
      date: 'Oct 1943',
      name: 'Raid on Wake Island',
      location: 'Wake Island, Central Pacific',
      role: 'Carrier-Based Combat Debut',
      description: 'The Grumman Hellcat is launched from fleet carriers to challenge Japanese Zeros, quickly proving its superior armour and firepower.',
      result: 'Tactical Air Victory',
      alliedLosses: '12 aircraft lost',
      axisLosses: '22 Zero fighters downed',
      tacticalLesson: 'Thick pilot armor plating and self-sealing fuel tanks give Hellcats unmatched durability in high-turn dogfights.'
    },
    {
      id: 'f6f-hailstone',
      date: 'Feb 1944',
      name: 'Operation Hailstone',
      location: 'Truk Lagoon, Carolines',
      role: 'Pre-emptive Airfield Sweep',
      description: 'Carrier-launched Hellcats sweep Japanese airbases around Truk Lagoon, destroying ground defenses and shielding Avenger bombers.',
      result: 'Crushing Strategic Blow',
      alliedLosses: '25 aircraft lost',
      axisLosses: '250+ Japanese planes, 40 ships',
      tacticalLesson: 'Strafing airfields during pre-dawn sweeps prevents the enemy from organizing air defenses.'
    },
    {
      id: 'f6f-turkeyshoot',
      date: 'Jun 19, 1944',
      name: 'Great Marianas Turkey Shoot',
      location: 'Philippine Sea, Pacific',
      role: 'Fleet Air Defense Intercept',
      description: 'F6F Hellcats intercept four waves of Japanese carrier aircraft attempting to sink the Allied invasion fleet, scoring a legendary lopsided victory.',
      result: 'Historical Air Victory',
      alliedLosses: '29 aircraft lost',
      axisLosses: '346 Japanese carrier planes',
      tacticalLesson: 'Radar-directed fighter control vectors Hellcats to high intercept points, giving them a decisive altitude advantage.'
    },
    {
      id: 'f6f-leyte',
      date: 'Oct 1944',
      name: 'Battle of Leyte Gulf',
      location: 'Leyte, Philippines',
      role: 'Fleet Combat Air Patrol / Escort',
      description: 'Guarding Allied task forces from Kamikaze attacks and escorting dive bombers during the sinking of the heavy battleship Musashi.',
      result: 'Decisive Naval Victory',
      alliedLosses: 'Light air casualties',
      axisLosses: 'Imperial Carrier Fleet destroyed',
      tacticalLesson: 'Hellcats can be equipped with heavy bombs to serve as carrier-launched strike platforms once air superiority is complete.'
    },
    {
      id: 'f6f-okinawa',
      date: 'Apr-Jun 1945',
      name: 'Battle of Okinawa Campaign',
      location: 'Okinawa Coast, Japan',
      role: 'Fleet Suicide-Attack Intercept',
      description: 'Hellcats fly around-the-clock defense sweeps to splash massive "Kikusui" suicide raids, defending carrier decks with relentless interceptions.',
      result: 'Allied Fleet Defended',
      alliedLosses: 'Dozens of destroyers damaged',
      axisLosses: '500+ suicide planes splashed',
      tacticalLesson: 'Utilizing destroyer picket lines in front of carriers provides early radar warning for interceptor scrambles.'
    }
  ],
  'p47-thunderbolt': [
    {
      id: 'p47-schweinfurt',
      date: 'Oct 1943',
      name: 'Schweinfurt-Regensburg Raid',
      location: 'Skies over Central Germany',
      role: 'Heavy Bomber Escort Sweep',
      description: 'Heavy P-47s equipped with early pressurized drop tanks escort B-17 Flying Fortresses to extreme limits, defending them from Fw 190 swarms.',
      result: 'Strategic Victory (High Loss)',
      alliedLosses: '60 bombers, 5 escorts',
      axisLosses: '40+ German fighters',
      tacticalLesson: 'Standard P-47 range is insufficient for deep German penetration, urging immediate production of the P-51.'
    },
    {
      id: 'p47-normandy',
      date: 'Jun 1944',
      name: 'Battle of Normandy Sweep',
      location: 'Normandy, France',
      role: 'Tactical Close Air Support',
      description: 'Nicknamed "The Jug", the P-47 is deployed as a heavy fighter-bomber, carrying underwing rockets and bombs to destroy Axis armor.',
      result: 'Allied Tactical Victory',
      alliedLosses: 'Moderate ground-fire losses',
      axisLosses: 'Thousands of tanks & trucks',
      tacticalLesson: 'The rugged Pratt & Whitney radial engine can survive cylinder hits that would immediately disable liquid-cooled planes.'
    },
    {
      id: 'p47-market',
      date: 'Sep 1944',
      name: 'Operation Market Garden',
      location: 'Eindhoven / Arnhem, Netherlands',
      role: 'Flak Suppression & Cover',
      description: 'Thunderbolts attack German anti-aircraft gun positions along paratrooper glider channels to ensure safe troop drops.',
      result: 'Air lanes successfully cleared',
      alliedLosses: '8 aircraft lost',
      axisLosses: 'Multiple flak nests neutralized',
      tacticalLesson: 'Strafing with 8 x .50 caliber machine guns creates massive fire suppression, preventing flak crews from aiming.'
    },
    {
      id: 'p47-bulge',
      date: 'Dec 1944',
      name: 'Ardennes Counter-Offensive',
      location: 'The Ardennes Forest, Belgium',
      role: 'Winter Close Support Strike',
      description: 'Under freezing conditions, P-47 crews fly close-support runs to strike Panzer spearheads and parachute supplies to the 101st Airborne.',
      result: 'Pivotal Allied Success',
      alliedLosses: '18 aircraft lost',
      axisLosses: '100+ tanks and half-tracks',
      tacticalLesson: 'Using heavy steel construction allows the P-47 to pull out of high-velocity low-altitude dive runs without structural wing warp.'
    },
    {
      id: 'p47-bodenplatte',
      date: 'Jan 1945',
      name: 'Operation Bodenplatte Counter',
      location: 'Allied Airfields, Western Europe',
      role: 'Emergency Airfield Intercept',
      description: 'P-47 units scramble amidst strafing German attackers during a surprise New Year\'s Day raid, launching an immediate defensive counter-strike.',
      result: 'Decisive Air Defense Success',
      alliedLosses: 'Multiple planes destroyed on strip',
      axisLosses: '45 Axis aircraft shot down',
      tacticalLesson: 'Luftwaffe surprise attacks fail to disable Allied operations because ground repair squads patch concrete airstrips in hours.'
    }
  ],
  'p40-warhawk': [
    {
      id: 'p40-pearl',
      date: 'Dec 7, 1941',
      name: 'Attack on Pearl Harbor',
      location: 'Oahu, Hawaii, USA',
      role: 'Emergency Defensive Scramble',
      description: 'Amidst Japanese surprise raids, pilots George Welch and Kenneth Taylor scramble in P-40s from an auxiliary strip, engaging Japanese fighters.',
      result: 'Heroic Stand',
      alliedLosses: '188 planes on the ground',
      axisLosses: '6 planes claimed by Welch & Taylor',
      tacticalLesson: 'Dispersing fighter planes to auxiliary grass strips prevents entire groups from being wiped out in initial bombing runs.'
    },
    {
      id: 'p40-burma',
      date: 'Dec 1941 - Jul 1942',
      name: 'Defense of the Burma Road',
      location: 'China & Burma Frontiers',
      role: 'Flying Tigers AVG Fighter Sweep',
      description: 'Flying under the Chinese Air Force, the "Flying Tigers" use shark-mouthed P-40s to protect strategic supply lanes against Japanese bombers.',
      result: 'Legendary AVG Air Victory',
      alliedLosses: '12 P-40s lost in combat',
      axisLosses: '286 Japanese aircraft destroyed',
      tacticalLesson: 'P-40 pilots avoid turning dogfights with Zeros, instead utilizing heavy weight to dive-attack and run.'
    },
    {
      id: 'p40-elalamein',
      date: 'Jul 1942',
      name: 'Battle of El Alamein Support',
      location: 'North African Desert, Egypt',
      role: 'Desert Air Force Fighter-Bomber',
      description: 'RAF Kittyhawk (P-40) squads attack Rommel\'s supply lines and engage Axis fighters under severe desert sandstorms.',
      result: 'Strategic Allied Victory',
      alliedLosses: 'Moderate losses to desert flak',
      axisLosses: 'Heavy logistics disruption',
      tacticalLesson: 'The simple mechanical design of the liquid-cooled Allison V-12 makes it exceptionally easy to service in sand-swept desert camps.'
    },
    {
      id: 'p40-aleutians',
      date: 'Jun 1942 - Aug 1943',
      name: 'Aleutian Islands Campaign',
      location: 'Alaska Skies, USA',
      role: 'Arctic Defensive Interception',
      description: 'Flying in thick arctic fog and freezing winds, P-40 pilots defend Alaskan ports and harass Japanese garrisons on Kiska Island.',
      result: 'Allied Regional Victory',
      alliedLosses: 'High operational losses to weather',
      axisLosses: 'Complete Japanese evacuation',
      tacticalLesson: 'Severe arctic weather requires pre-heating aircraft engines and applying de-icing chemicals to flight control hinges.'
    },
    {
      id: 'p40-husky',
      date: 'Jul 1943',
      name: 'Operation Husky (Sicily Landing)',
      location: 'Sicily Beachheads, Italy',
      role: 'Beachhead Ground Support',
      description: 'P-40 Warhawks carry heavy high-explosives to bomb Italian pillboxes and escort Allied landing craft across the Mediterranean.',
      result: 'Strategic Allied Success',
      alliedLosses: '6 aircraft lost',
      axisLosses: 'Beachhead defenses neutralized',
      tacticalLesson: 'Rugged undercarriages enable the P-40 to operate off freshly bulldozed dirt airstrips immediately behind the frontline.'
    }
  ],
  'f8f-bearcat': [
    {
      id: 'f8f-okinawa',
      date: 'Aug 1945',
      name: 'Okinawa Deployment',
      location: 'Okinawa Coast, Japan',
      role: 'Carrier Air Wing Deployment',
      description: 'Bearcat squadron VF-19 was deployed aboard carriers bound for Japan. However, the war concluded just as the fleet reached the target area.',
      result: 'Wartime Deployment Only',
      alliedLosses: 'None',
      axisLosses: 'None (Surrender signed)',
      tacticalLesson: 'Designed as a dedicated interceptor to counter Kamikaze attacks, the Bearcat arrived too late to verify its combat design.'
    },
    {
      id: 'f8f-blueangels',
      date: 'Jun 1946',
      name: 'Inaugural Blue Angels Flights',
      location: 'NAS Jacksonville, Florida, USA',
      role: 'Precision Demonstration Exhibition',
      description: 'Handpicked as the Navy\'s premium showcase aircraft, Bearcats perform close-formation aerobatic displays, launching the Blue Angels legacy.',
      result: 'Aerobatic Success',
      alliedLosses: 'None',
      axisLosses: 'None (Post-war demo)',
      tacticalLesson: 'The Bearcat\'s unmatched power-to-weight ratio allows it to outperform early military jets in vertical climbs.'
    },
    {
      id: 'f8f-dienbienphu',
      date: '1951 - 1954',
      name: 'Battle of Dien Bien Phu',
      location: 'Dien Bien Phu Valley, Indochina',
      role: 'French Air Force Close Support',
      description: 'Deployed by French squadrons in a brutal valley siege. Bearcats fly heavy bombing and napalm runs against Viet Minh positions under heavy flak.',
      result: 'Strategic Defeat (French garrison fell)',
      alliedLosses: 'Dozens of Bearcats destroyed',
      axisLosses: 'Heavy trench casualties',
      tacticalLesson: 'Fighters operating from a single surrounded valley airstrip are highly vulnerable to localized mortar and anti-aircraft artillery.'
    },
    {
      id: 'f8f-thailand',
      date: '1950s Era',
      name: 'Royal Thai Air Force Patrols',
      location: 'Thailand Borders, Southeast Asia',
      role: 'Cold War Border Sovereignty',
      description: 'Serving as Thailand\'s primary fighter shield, Bearcat divisions patrol remote borders to deter regional communist incursions.',
      result: 'Successful Air Deterrence',
      alliedLosses: 'None',
      axisLosses: 'None',
      tacticalLesson: 'Rugged piston fighters remain highly cost-efficient border deterrent platforms in regions lacking jet runways.'
    }
  ]
};

const FALLBACK_TIMELINE: BattleInfo[] = [
  {
    id: 'gen-britain',
    date: 'Sep 1940',
    name: 'Battle of Britain',
    location: 'Southern England Skies',
    role: 'Fighter-on-Fighter Interception',
    description: 'A pivotal air battle where Allied fighter pilots turn back massive Luftwaffe day-bomber offensives, denying Germany control of the skies.',
    result: 'Allied Strategic Victory',
    alliedLosses: '544 pilots lost',
    axisLosses: '1,800+ aircraft destroyed',
    tacticalLesson: 'Early radar tracking networks allow fighter commands to deploy interceptors exactly when and where raids approach.'
  },
  {
    id: 'gen-midway',
    date: 'Jun 1942',
    name: 'Battle of Midway',
    location: 'Midway Atoll, Pacific',
    role: 'Carrier Air Group Operations',
    description: 'The turning point of the Pacific war. Carrier-launched dive bombers and fighter escorts engage in a dramatic duel, sinking four Japanese fleet carriers.',
    result: 'Decisive Allied Victory',
    alliedLosses: '1 carrier, 150 planes',
    axisLosses: '4 aircraft carriers, 250+ planes',
    tacticalLesson: 'Sighting the enemy fleet first provides a decisive tactical advantage for coordinating air strike waves.'
  },
  {
    id: 'gen-overlord',
    date: 'Jun 1944',
    name: 'D-Day Invasion of Europe',
    location: 'Normandy Beachheads, France',
    role: 'Beachhead Air Supremacy',
    description: 'Allied fighter wings mount continuous patrols over the English Channel and Normandy coast, completely suppressing the German Luftwaffe.',
    result: 'Combined Strategic Victory',
    alliedLosses: 'Extremely Low',
    axisLosses: 'Complete air suppression',
    tacticalLesson: 'Establishing a massive continuous air umbrella over amphibious landings prevents ground strafing attacks.'
  },
  {
    id: 'gen-turkeyshoot',
    date: 'Jun 1944',
    name: 'Battle of the Philippine Sea',
    location: 'Philippine Sea, Pacific',
    role: 'Fleet Combat Air Patrol',
    description: 'Commonly known as the "Great Marianas Turkey Shoot", Allied fighter squadrons intercept hundreds of Japanese carrier planes, effectively destroying their naval air wing.',
    result: 'Allied Victory',
    alliedLosses: '29 aircraft lost',
    axisLosses: '340+ Japanese planes destroyed',
    tacticalLesson: 'Radar-directed fighter vectors allow defensive patrols to climb above incoming target waves prior to interception.'
  }
];

export default function ConflictTimeline({ fighterId, fighterName }: ConflictTimelineProps) {
  const battles = HISTORICAL_TIMELINE[fighterId] || FALLBACK_TIMELINE;
  const [selectedBattle, setSelectedBattle] = useState<BattleInfo>(battles[0]);

  // Sync selected battle if focused fighter changes
  useEffect(() => {
    setSelectedBattle(battles[0]);
  }, [fighterId]);

  const getResultColor = (result: string) => {
    const r = result.toLowerCase();
    if (r.includes('victory') || r.includes('dominance') || r.includes('success')) {
      return 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60';
    }
    if (r.includes('stalemate') || r.includes('draw') || r.includes('arrival')) {
      return 'text-amber-400 bg-amber-950/40 border-amber-800/60';
    }
    return 'text-stone-400 bg-stone-900/60 border-stone-800/60';
  };

  const handleSelectBattle = (battle: BattleInfo) => {
    audioEngine.playClick();
    setSelectedBattle(battle);
  };

  return (
    <div className="warbird-panel warbird-screws p-5 relative overflow-hidden flex flex-col h-full" id="historical-conflict-timeline">
      <div className="rivet-row-top" />
      
      {/* Widget Header */}
      <span className="font-stencil text-xs text-diesel-gold tracking-widest uppercase mb-4 block border-b border-stone-800 pb-2 font-bold flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-diesel-brass" />
          Conflict Service Record
        </span>
        <span className="text-[9px] font-mono text-stone-500 tracking-wider">
          CLASSIFIED WAR DOSSIER
        </span>
      </span>

      {/* Intelligence Briefing Dossier */}
      <div className="mb-5 border border-stone-900/80 bg-stone-950/90 rounded-lg p-4 font-mono text-[11px] relative">
        {/* Background drafting circle accent */}
        <div className="absolute right-3 top-3 w-16 h-16 rounded-full border border-stone-900/40 pointer-events-none flex items-center justify-center opacity-30">
          <div className="w-10 h-10 rounded-full border border-dashed border-[#eed095]/20 animate-spin-slow" />
        </div>

        <span className="text-[9px] text-stone-500 font-bold uppercase tracking-widest block mb-1">
          Active Combat Dossier
        </span>
        <h4 className="text-[14px] text-diesel-gold font-stencil uppercase mb-2 flex items-center gap-2">
          <Compass className="w-4 h-4 text-diesel-brass animate-pulse" />
          {selectedBattle.name}
        </h4>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-3 border-y border-stone-900 py-2.5 text-[10px]">
          <div>
            <span className="text-stone-500 uppercase block text-[8px]">Engagement Date</span>
            <span className="text-stone-300 flex items-center gap-1 font-bold">
              <Calendar className="w-3 h-3 text-diesel-brass" />
              {selectedBattle.date}
            </span>
          </div>
          <div>
            <span className="text-stone-500 uppercase block text-[8px]">Theater Area</span>
            <span className="text-stone-300 flex items-center gap-1 truncate font-bold" title={selectedBattle.location}>
              <MapPin className="w-3 h-3 text-diesel-brass" />
              {selectedBattle.location}
            </span>
          </div>
          <div className="col-span-2">
            <span className="text-stone-500 uppercase block text-[8px]">Airframe Mission Role</span>
            <span className="text-diesel-brass flex items-center gap-1 font-bold">
              <Target className="w-3 h-3 text-diesel-crimson" />
              {selectedBattle.role}
            </span>
          </div>
        </div>

        <p className="text-stone-300 leading-relaxed text-[11px] mb-3 font-mono">
          {selectedBattle.description}
        </p>

        {/* Statistics block */}
        <div className="bg-stone-900/30 border border-stone-900/60 rounded p-2.5 mb-3 text-[10px] flex flex-col gap-1.5">
          {selectedBattle.alliedLosses && (
            <div className="flex justify-between items-center">
              <span className="text-stone-500 flex items-center gap-1">
                <Bookmark className="w-3 h-3 text-[#eed095]/40" />
                Allied Force Outcome:
              </span>
              <span className="text-stone-300 font-bold">{selectedBattle.alliedLosses}</span>
            </div>
          )}
          {selectedBattle.axisLosses && (
            <div className="flex justify-between items-center">
              <span className="text-stone-500 flex items-center gap-1">
                <Skull className="w-3 h-3 text-diesel-crimson/50" />
                Axis Losses / Attrition:
              </span>
              <span className="text-stone-300 font-bold">{selectedBattle.axisLosses}</span>
            </div>
          )}
          {selectedBattle.tacticalLesson && (
            <div className="border-t border-stone-900/80 pt-1.5 mt-1">
              <span className="text-[#eed095] uppercase block text-[8px] tracking-wider mb-0.5 font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-diesel-brass" />
                Tactical Intelligence Lesson:
              </span>
              <span className="text-stone-400 italic text-[9.5px] leading-normal block">
                "{selectedBattle.tacticalLesson}"
              </span>
            </div>
          )}
        </div>

        {/* Outcome Badge */}
        <div className="flex justify-between items-center mt-2.5">
          <span className="text-[9px] text-stone-500 uppercase font-bold">Engagement Status:</span>
          <span className={`px-2 py-0.5 text-[9px] font-stencil uppercase tracking-widest border rounded font-bold ${getResultColor(selectedBattle.result)}`}>
            {selectedBattle.result}
          </span>
        </div>
      </div>

      {/* Timeline Chronological Milestones Selector */}
      <div className="flex-1 overflow-y-auto pr-1 max-h-[240px] scrollbar-thin">
        <span className="text-[9px] text-stone-500 font-bold uppercase tracking-widest block mb-2.5 pl-2">
          Service Record Timeline for {fighterName}
        </span>
        
        <div className="relative pl-6 border-l border-stone-800 ml-3.5 flex flex-col gap-2">
          {battles.map((battle, index) => {
            const isSelected = selectedBattle.id === battle.id;
            return (
              <div 
                key={battle.id} 
                className="relative cursor-pointer group"
                onClick={() => handleSelectBattle(battle)}
              >
                {/* Timeline node circle */}
                <div 
                  className={`absolute -left-[31px] top-1/2 -translate-y-1/2 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected 
                      ? 'bg-diesel-brass border-stone-950 scale-110 shadow-[0_0_8px_#c5a059]' 
                      : 'bg-stone-950 border-stone-700 group-hover:border-diesel-brass group-hover:bg-stone-900'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-stone-950' : 'bg-stone-600 group-hover:bg-diesel-brass'}`} />
                </div>

                {/* Milestone Card */}
                <div 
                  className={`p-2.5 rounded border transition-all flex justify-between items-center ${
                    isSelected 
                      ? 'bg-diesel-brass/10 border-diesel-brass shadow-md' 
                      : 'bg-stone-950/45 border-stone-900/60 hover:bg-stone-900/20 hover:border-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-[10px] font-bold py-0.5 px-1.5 rounded tracking-wide border transition-colors ${
                      isSelected 
                        ? 'bg-diesel-brass text-stone-950 border-transparent font-bold' 
                        : 'bg-stone-900 text-stone-400 border-stone-800 group-hover:text-[#eed095]'
                    }`}>
                      {battle.date}
                    </span>
                    <div className="text-left font-mono">
                      <span className={`block text-[11px] font-bold ${isSelected ? 'text-diesel-gold' : 'text-stone-300 group-hover:text-stone-200'}`}>
                        {battle.name}
                      </span>
                      <span className="text-[9px] text-stone-500 group-hover:text-stone-400 block truncate max-w-[170px] sm:max-w-none">
                        {battle.location}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                    isSelected ? 'text-diesel-brass translate-x-0.5' : 'text-stone-600 group-hover:text-stone-400'
                  }`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rivet-row-bottom" />
    </div>
  );
}
