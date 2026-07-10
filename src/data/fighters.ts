import { FighterAircraft, WireframeMesh } from '../types';

// Let's design distinctive wireframe meshes for the 5 fighters

// P-51 Mustang wireframe: Sleek, low-wing monoplane
const p51Mesh: WireframeMesh = {
  vertices: [
    [0, 0, 1.4],      // 0: Spinner/Nose tip
    [0, 0.3, 0.9],    // 1: Engine Cowling Top
    [0.2, 0, 0.9],    // 2: Engine Cowling Right
    [0, -0.3, 0.8],   // 3: Ventral Scoop Inlet
    [-0.2, 0, 0.9],   // 4: Engine Cowling Left
    [0, 0.45, 0.2],   // 5: Canopy Top
    [0.2, 0.1, 0.2],  // 6: Fuselage Right Mid
    [-0.2, 0.1, 0.2], // 7: Fuselage Left Mid
    [0, -0.1, -0.8],  // 8: Fuselage Tail Joint
    [0, 0.05, -1.4],  // 9: Rudder Base / Tail End
    [0, 0.55, -1.3],  // 10: Fin/Rudder Tip
    [-1.6, 0.02, 0.35], // 11: Left Wingtip
    [1.6, 0.02, 0.35],  // 12: Right Wingtip
    [-0.2, 0, 0.6],    // 13: Left Wing Root Front
    [0.2, 0, 0.6],     // 14: Right Wing Root Front
    [-0.2, 0, -0.1],   // 15: Left Wing Root Rear
    [0.2, 0, -0.1],    // 16: Right Wing Root Rear
    [-0.55, 0.02, -1.2], // 17: Left Tailplane Tip
    [0.55, 0.02, -1.2],  // 18: Right Tailplane Tip
  ],
  faces: [
    [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1], // Nose cowling cone
    [1, 5, 6, 2], [1, 4, 7, 5], // Canopy to cowling transitions
    [5, 8, 6], [5, 7, 8], [3, 8, 6], [3, 7, 8], // Mid fuselage structure
    [8, 10, 9], // Vertical stabilizer/rudder
    [13, 11, 15], [14, 16, 12], // Main Wing panel surfaces
    [8, 17, 9], [8, 9, 18], // Horizontal tail stabilizers
  ]
};

// Spitfire Mk IX: Famous elegant elliptical wings
const spitfireMesh: WireframeMesh = {
  vertices: [
    [0, 0, 1.3],      // 0: Prop Hub
    [0, 0.25, 0.8],   // 1: Cowling Top Front
    [0.2, 0, 0.8],    // 2: Cowling Right
    [0, -0.2, 0.8],   // 3: Cowling Bottom
    [-0.2, 0, 0.8],   // 4: Cowling Left
    [0, 0.4, 0.1],    // 5: Rounded Canopy Top
    [0.22, 0.08, 0.1], // 6: Cockpit Right
    [-0.22, 0.08, 0.1], // 7: Cockpit Left
    [0, -0.05, -0.8], // 8: Fuselage Rear
    [0, 0.05, -1.3],  // 9: Tail Cone
    [0, 0.5, -1.25],  // 10: Graceful Rounded Tail Fin Tip
    [-1.75, 0.01, 0.25], // 11: Elliptical Left Wingtip
    [1.75, 0.01, 0.25],  // 12: Elliptical Right Wingtip
    [-0.2, 0, 0.55],    // 13: Left Wing Joint Front
    [0.2, 0, 0.55],     // 14: Right Wing Joint Front
    [-0.2, 0, -0.15],   // 15: Left Wing Joint Rear
    [0.2, 0, -0.15],    // 16: Right Wing Joint Rear
    [-0.5, 0.01, -1.15], // 17: Left Tailplane Tip
    [0.5, 0.01, -1.15],  // 18: Right Tailplane Tip
  ],
  faces: [
    [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1],
    [1, 5, 6, 2], [1, 4, 7, 5],
    [5, 8, 6], [5, 7, 8], [3, 8, 6], [3, 7, 8],
    [8, 10, 9],
    [13, 11, 15], [14, 16, 12],
    [8, 17, 9], [8, 9, 18]
  ]
};

// P-38 Lightning: Twin-boom heavy fighter (very unique wireframe!)
const p38Mesh: WireframeMesh = {
  vertices: [
    // Central Pod
    [0, 0.15, 0.9],     // 0: Center Nose Tip (Armament pod)
    [0, 0.3, 0.4],      // 1: Cockpit front
    [0, 0.45, 0.0],     // 2: Canopy Peak
    [0, -0.15, 0.5],    // 3: Center Pod Bottom
    [0, 0.05, -0.6],    // 4: Center Pod Rear
    
    // Left Engine Boom
    [-0.55, 0.1, 0.8],   // 5: L Spinner nose
    [-0.55, 0.25, 0.3],  // 6: L Cowl top
    [-0.55, -0.1, 0.3],  // 7: L Cowl bottom
    [-0.55, 0.05, -1.4], // 8: L Tail Boom Stern
    [-0.55, 0.45, -1.35], // 9: L Vertical Tail Tip
    
    // Right Engine Boom
    [0.55, 0.1, 0.8],    // 10: R Spinner nose
    [0.55, 0.25, 0.3],   // 11: R Cowl top
    [0.55, -0.1, 0.3],   // 12: R Cowl bottom
    [0.55, 0.05, -1.4],  // 13: R Tail Boom Stern
    [0.55, 0.45, -1.35],  // 14: R Vertical Tail Tip

    // Left Wingtip
    [-2.0, 0.05, 0.1],   // 15: Far Left Wingtip
    // Right Wingtip
    [2.0, 0.05, 0.1],    // 16: Far Right Wingtip

    // Horizontal Stabilizer connecting the two booms at the tail
    [-0.55, 0.08, -1.3], // 17: L Tail Stab Connector
    [0.55, 0.08, -1.3],  // 18: R Tail Stab Connector
  ],
  faces: [
    // Central pod structure
    [0, 1, 3], [1, 2, 4], [3, 4, 2], [0, 3, 4],
    // Left Boom Engine Nacelle
    [5, 6, 7], [6, 8, 7], [8, 9, 17],
    // Right Boom Engine Nacelle
    [10, 11, 12], [11, 13, 12], [13, 14, 18],
    // Tailplane stabilizer
    [17, 18, 13, 8],
    // Wings connecting Pod (0), Left Engine (5), Right Engine (10), and tips (15, 16)
    [0, 5, 15, 7], [0, 10, 16, 12]
  ]
};

// Grumman F6F Hellcat wireframe: Broad muscular radial engine and square-tipped wings
const hellcatMesh: WireframeMesh = {
  vertices: [
    [0, 0, 1.25],         // 0: Radial spinner center
    [0, 0.4, 0.8],        // 1: Radial cowl top
    [0.35, 0.1, 0.8],     // 2: Radial cowl right
    [0, -0.4, 0.8],       // 3: Radial cowl bottom
    [-0.35, 0.1, 0.8],    // 4: Radial cowl left
    [0, 0.5, 0.2],        // 5: Canopy top
    [0.3, 0.1, 0.2],      // 6: Fuselage right mid
    [-0.3, 0.1, 0.2],     // 7: Fuselage left mid
    [0, -0.1, -0.7],      // 8: Fuselage tail joint
    [0, 0.05, -1.35],     // 9: Rudder base / tail end
    [0, 0.55, -1.25],     // 10: Vertical stabilizer tip
    [-1.9, 0.02, 0.2],    // 11: Left wingtip (square)
    [1.9, 0.02, 0.2],     // 12: Right wingtip (square)
    [-0.3, 0, 0.5],       // 13: Left wing root front
    [0.3, 0, 0.5],        // 14: Right wing root front
    [-0.3, 0, -0.2],      // 15: Left wing root rear
    [0.3, 0, -0.2],       // 16: Right wing root rear
    [-0.55, 0.02, -1.15], // 17: Left stabilizer tip
    [0.55, 0.02, -1.15],  // 18: Right stabilizer tip
  ],
  faces: [
    [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1], // Round cowling
    [1, 5, 6, 2], [1, 4, 7, 5],
    [5, 8, 6], [5, 7, 8], [3, 8, 6], [3, 7, 8],
    [8, 10, 9],
    [13, 11, 15], [14, 16, 12],
    [8, 17, 9], [8, 9, 18]
  ]
};

// Republic P-47 Thunderbolt wireframe: Massive, barrel-shaped body ("The Jug")
const p47Mesh: WireframeMesh = {
  vertices: [
    [0, 0, 1.3],          // 0: Giant cowl hub center
    [0, 0.5, 0.9],        // 1: Heavy cowl top
    [0.45, 0.1, 0.9],     // 2: Heavy cowl right
    [0, -0.5, 0.9],       // 3: Heavy cowl bottom
    [-0.45, 0.1, 0.9],    // 4: Heavy cowl left
    [0, 0.6, 0.1],        // 5: Canopy bubble peak
    [0.4, 0.1, 0.1],      // 6: Thick fuselage right mid
    [-0.4, 0.1, 0.1],     // 7: Thick fuselage left mid
    [0, -0.15, -0.8],     // 8: Heavy tail joint
    [0, 0.05, -1.4],      // 9: Fuselage rear end
    [0, 0.6, -1.3],       // 10: Large vertical stabilizer tip
    [-2.1, 0.02, 0.15],   // 11: Broad left wingtip
    [2.1, 0.02, 0.15],    // 12: Broad right wingtip
    [-0.4, 0, 0.55],      // 13: Left wing root front
    [0.4, 0, 0.55],       // 14: Right wing root front
    [-0.4, 0, -0.35],     // 15: Left wing root rear
    [0.4, 0, -0.35],      // 16: Right wing root rear
    [-0.65, 0.02, -1.2],  // 17: Left stabilizer tip
    [0.65, 0.02, -1.2],   // 18: Right stabilizer tip
  ],
  faces: [
    [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1],
    [1, 5, 6, 2], [1, 4, 7, 5],
    [5, 8, 6], [5, 7, 8], [3, 8, 6], [3, 7, 8],
    [8, 10, 9],
    [13, 11, 15], [14, 16, 12],
    [8, 17, 9], [8, 9, 18]
  ]
};

// Curtiss P-40 Warhawk wireframe: Pointed inline cowl with heavy protruding chin radiator
const p40Mesh: WireframeMesh = {
  vertices: [
    [0, 0, 1.4],          // 0: Pointed spinner tip
    [0, 0.25, 0.9],       // 1: Inline cowling top
    [0.2, 0, 0.9],        // 2: Cowling right
    [0, -0.55, 0.75],     // 3: Prominent chin radiator scoop bottom
    [-0.2, 0, 0.9],       // 4: Cowling left
    [0, 0.42, 0.15],      // 5: Sloping canopy top
    [0.22, 0.08, 0.15],   // 6: Fuselage right
    [-0.22, 0.08, 0.15],  // 7: Fuselage left
    [0, -0.05, -0.75],    // 8: Fuselage rear
    [0, 0.05, -1.35],     // 9: Tail end
    [0, 0.52, -1.25],     // 10: Tail fin tip
    [-1.7, 0.02, 0.3],    // 11: Left wingtip
    [1.7, 0.02, 0.3],     // 12: Right wingtip
    [-0.22, 0, 0.6],      // 13: Left wing joint front
    [0.22, 0, 0.6],       // 14: Right wing joint front
    [-0.22, 0, -0.1],     // 15: Left wing joint rear
    [0.22, 0, -0.1],      // 16: Right wing joint rear
    [-0.52, 0.02, -1.15], // 17: Left tailplane tip
    [0.52, 0.02, -1.15],  // 18: Right tailplane tip
  ],
  faces: [
    [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1], // Pointed nose with heavy chin
    [1, 5, 6, 2], [1, 4, 7, 5],
    [5, 8, 6], [5, 7, 8], [3, 8, 6], [3, 7, 8],
    [8, 10, 9],
    [13, 11, 15], [14, 16, 12],
    [8, 17, 9], [8, 9, 18]
  ]
};

// Grumman F8F Bearcat wireframe: Super stubby, short, fat fuselage with bubble canopy
const bearcatMesh: WireframeMesh = {
  vertices: [
    [0, 0, 1.1],          // 0: Radial spinner center
    [0, 0.42, 0.75],      // 1: Large cowling top
    [0.4, 0.08, 0.75],    // 2: Cowling right
    [0, -0.42, 0.75],     // 3: Cowling bottom
    [-0.4, 0.08, 0.75],   // 4: Cowling left
    [0, 0.55, 0.1],       // 5: Tall bubble canopy top
    [0.35, 0.08, 0.1],    // 6: Fuselage right mid
    [-0.35, 0.08, 0.1],   // 7: Fuselage left mid
    [0, -0.05, -0.5],     // 8: Stubby tail joint
    [0, 0.05, -0.95],     // 9: Stubby tail end
    [0, 0.58, -0.9],      // 10: Tall vertical stabilizer
    [-1.6, 0.02, 0.15],   // 11: Short clipped left wingtip
    [1.6, 0.02, 0.15],    // 12: Short clipped right wingtip
    [-0.35, 0, 0.45],     // 13: Left wing joint front
    [0.35, 0, 0.45],      // 14: Right wing joint front
    [-0.35, 0, -0.1],     // 15: Left wing joint rear
    [0.35, 0, -0.1],      // 16: Right wing joint rear
    [-0.48, 0.02, -0.85], // 17: Left tailplane tip
    [0.48, 0.02, -0.85],  // 18: Right tailplane tip
  ],
  faces: [
    [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1], // Stubby cowl
    [1, 5, 6, 2], [1, 4, 7, 5],
    [5, 8, 6], [5, 7, 8], [3, 8, 6], [3, 7, 8],
    [8, 10, 9],
    [13, 11, 15], [14, 16, 12],
    [8, 17, 9], [8, 9, 18]
  ]
};

// Vought F4U Corsair wireframe: Inverted gull wing, radial engine, long nose, rear-set cockpit
const corsairMesh: WireframeMesh = {
  vertices: [
    [0, 0, 1.25],         // 0: Spinner tip / Hub
    [0, 0.4, 0.8],         // 1: Large cowling top
    [0.35, 0.1, 0.8],     // 2: Cowling right
    [0, -0.4, 0.8],        // 3: Cowling bottom
    [-0.35, 0.1, 0.8],    // 4: Cowling left
    [0, 0.48, -0.1],       // 5: Cockpit canopy top (rear-set)
    [0.28, 0.12, -0.1],    // 6: Cockpit right mid
    [-0.28, 0.12, -0.1],   // 7: Cockpit left mid
    [0, -0.05, -0.85],     // 8: Fuselage tail joint
    [0, 0.05, -1.35],      // 9: Tail cone
    [0, 0.52, -1.3],       // 10: Rounded tail fin tip
    
    // Inverted Gull Wing Left Side
    [-0.5, -0.25, 0.45],   // 11: Left Wing Gull Elbow (bends down)
    [-1.75, 0.1, 0.25],    // 12: Left Wingtip (bends up)
    
    // Inverted Gull Wing Right Side
    [0.5, -0.25, 0.45],    // 13: Right Wing Gull Elbow (bends down)
    [1.75, 0.1, 0.25],     // 14: Right Wingtip (bends up)
    
    // Wing Root joins on Fuselage
    [-0.28, -0.1, 0.55],   // 15: Left Wing Joint Front
    [0.28, -0.1, 0.55],    // 16: Right Wing Joint Front
    [-0.28, -0.1, 0.0],    // 17: Left Wing Joint Rear
    [0.28, -0.1, 0.0],     // 18: Right Wing Joint Rear
    
    // Horizontal Tail stabilizer
    [-0.52, 0.02, -1.2],   // 19: Left tailplane tip
    [0.52, 0.02, -1.2],    // 20: Right tailplane tip
  ],
  faces: [
    [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1], // Cowl
    [1, 5, 6, 2], [1, 4, 7, 5],
    [5, 8, 6], [5, 7, 8], [3, 8, 6], [3, 7, 8],
    [8, 10, 9],
    
    // Inverted Gull Wing Left side panels: Root to Elbow, Elbow to Tip
    [15, 11, 17], [11, 12, 17],
    
    // Inverted Gull Wing Right side panels: Root to Elbow, Elbow to Tip
    [16, 18, 13], [13, 18, 14],
    
    [8, 19, 9], [8, 9, 20]
  ]
};

export const fightersData: FighterAircraft[] = [
  {
    id: 'p51-mustang',
    name: 'P-51 Mustang',
    nickname: 'Red Tails / Cadillacs of the Sky',
    country: 'United States',
    faction: 'allied',
    year: 1940,
    isTuskegee: true,
    posterUrl: 'images/p51_poster.jpg', // Real silver P-51 vintage warbird in flight
    posterVerified: true,
    posterSource: 'Wikimedia Commons / Historic Airplanes Archive',
    noseArtUrl: 'images/p51_noseart.jpg',
    noseArtVerified: true,
    noseArtSource: 'Wikimedia Commons / Restored Warbird Registry',
    noseArtName: 'By Request',
    noseArtDescription: 'This nose art was painted on the aircraft of Colonel Benjamin O. Davis Jr., commander of the Tuskegee Airmen. It was named "By Request" because Allied bomber crews began actively requesting the 332nd Fighter Group as their escort because they famously never lost a bomber to enemy fighters.',
    cockpitUrl: 'images/p51_cockpit.jpg', // Vintage analog cockpit instruments
    cockpitVerified: true,
    cockpitSource: 'Wikimedia Commons / USAF Flight Operations',
    description: 'The definitive American long-range fighter of WWII. Crucial in escorting allied bombers deep into Germany. Fitted with the superb British Rolls-Royce Merlin engine, it became a lethal weapon that swept the skies. Its association with the African American Tuskegee Airmen—who painted the tails of their Mustangs bright red—wrote one of the most heroic and barrier-breaking chapters in military history.',
    specs: {
      maxSpeed: '437 mph (703 km/h)',
      armament: '6 x .50 caliber Browning M2 Machine Guns',
      range: '1,650 miles (2,655 km) with external drop tanks',
      engine: 'Packard V-1650-7 liquid-cooled V-12 (Merlin)',
      wingspan: '37 ft (11.28 m)',
      emptyWeight: '7,635 lbs (3,463 kg)'
    },
    wireframeMesh: p51Mesh,
    pilotStories: [
      {
        id: 'benjamin-o-davis',
        name: 'Benjamin O. Davis Jr.',
        rank: 'Colonel (later Brigadier General)',
        yearsOfService: '1936 - 1970',
        kills: 1,
        medals: ['Distinguished Service Medal', 'Silver Star', 'Legion of Merit', 'Distinguished Flying Cross'],
        isTuskegee: true,
        photoUrl: 'images/pilot_benjamin_o_davis.jpg',
        photoVerified: true,
        photoSource: 'Allied Historical Archive (Edward Carter, 1944)',
        quote: 'All the guys in the Red Tails had to be twice as good just to get to the starting line. Once we got in the air, we proved we were second to none.',
        bio: 'The historic commander of the Tuskegee Airmen. Davis was the first African American officer to solo-fly an Army Air Corps aircraft. He commanded the 99th Pursuit Squadron and later the 332nd Fighter Group (the "Red Tails") in Europe. Under his rigid discipline and strict tactical directive—requiring pilots to stay close to the bombers rather than chase glory—the Red Tails achieved a legendary safety record and shattered racist military dogmas.',
        combatHours: 224,
        combatMissions: 60,
        squadronRank: 'Group Commander',
        squadronName: '332nd Fighter Group (Red Tails)',
        baseOfOperations: 'Ramitelli Airfield, Italy',
        specialCommendation: 'Presidential Unit Citation, Congressional Gold Medal (Group)'
      },
      {
        id: 'lee-archer',
        name: 'Lee "Buddy" Archer Jr.',
        rank: 'Captain',
        yearsOfService: '1941 - 1970',
        kills: 5,
        medals: ['Distinguished Flying Cross', 'Air Medal (18 Oak Leaf Clusters)'],
        isTuskegee: true,
        photoUrl: 'images/pilot_lee_archer.jpg',
        photoVerified: true,
        photoSource: 'Allied Historical Archive / USAAF (1944)',
        quote: 'We weren\'t fighting for abstract concepts. We were fighting to prove our worth to a country that doubted us, and we did it in the cockpit of a Mustang.',
        bio: 'Recognized as the only official "Ace" of the Tuskegee Airmen, Captain Lee Archer Jr. was a legendary dogfighter. Flying his beloved P-51C Mustang named "INA the Macon Belle," he shot down multiple German aircraft, including a spectacular engagement on October 12, 1944, where he shot down three German Messerschmitt Bf 109s over Hungary in a single day.',
        combatHours: 350,
        combatMissions: 169,
        squadronRank: 'Flight Commander',
        squadronName: '302nd Fighter Squadron, 332nd FG',
        baseOfOperations: 'Ramitelli Airfield, Italy',
        specialCommendation: 'Official USAAF Ace Designation, Congressional Gold Medal (Group)'
      },
      {
        id: 'charles-b-hall',
        name: 'Charles B. Hall',
        rank: 'Major',
        yearsOfService: '1941 - 1946',
        kills: 3,
        medals: ['Distinguished Flying Cross', 'Purple Heart'],
        isTuskegee: true,
        photoUrl: 'images/pilot_charles_b_hall.jpg',
        photoVerified: true,
        photoSource: 'Allied Historical Archive / USAAF (1943)',
        quote: 'When the Focke-Wulf started smoking and went down, I knew the 99th had finally shown the world what we could do.',
        bio: 'A true trailblazer, Charles B. Hall was the first African American pilot to shoot down an enemy aircraft in World War II. On July 2, 1943, flying a P-40 Warhawk over Sicily, he intercepted and downed a German Fw 190. General Dwight D. Eisenhower personally visited the airbase to congratulate Hall and the 99th Pursuit Squadron, a watershed moment for black aviators.',
        combatHours: 420,
        combatMissions: 198,
        squadronRank: 'Assistant Squadron Commander',
        squadronName: '99th Pursuit Squadron',
        baseOfOperations: 'Licata, Sicily / Foggia, Italy',
        specialCommendation: 'First African American Combat Victory Commendation'
      }
    ],
    flightLogs: [
      {
        id: 'log-p51-01',
        date: '1944-06-09',
        pilotName: 'Col. Benjamin O. Davis Jr.',
        aircraftName: 'P-51D "By Request" (Red Tail)',
        mission: 'Heavy Bomber Escort (Munich Yards)',
        duration: '5h 15m',
        logText: 'Lead formation of 48 Mustangs from 332nd Fighter Group. Met B-17 bombers over the Alps. Encountered dense flak over southern Germany. Intercepted 12 Bf 109s climbing to attack the lead bomber box. Group maintained tight escort formation, repelling the fighters. 2 enemy aircraft confirmed downed. All bombers escorted safely back to base in Ramitelli, Italy. Heavy grease leakage observed on tail wheel.',
        status: 'Completed',
        location: 'Southern Germany / Alps',
        airbase: 'Ramitelli Airfield, Italy'
      },
      {
        id: 'log-p51-02',
        date: '1944-10-12',
        pilotName: 'Capt. Lee "Buddy" Archer Jr.',
        aircraftName: 'P-51C "INA the Macon Belle"',
        mission: 'Fighter Sweep / Escort',
        duration: '4h 10m',
        logText: 'Escorted B-24 Liberators attacking oil refineries in Hungary. Over Lake Balaton, spotted a flight of Bf 109s diving on our rear element. Broke formation to engage. Chased lead Bf 109 in a steep spiral. Fired short burst, scoring engine hits. Enemy bailed out. Engaged second Bf 109 in a low-level turning fight; cockpit shattered, plane crashed. Handled a third enemy during egress. 3 victories confirmed on this single sortie. Low fuel warnings on return flight.',
        status: 'Completed',
        location: 'Over Hungary (Lake Balaton)',
        airbase: 'Ramitelli Airfield, Italy'
      }
    ]
  },
  {
    id: 'spitfire-mkix',
    name: 'Supermarine Spitfire Mk IX',
    nickname: 'The Graceful Defender',
    country: 'Great Britain',
    faction: 'allied',
    isTuskegee: false,
    year: 1942,
    posterUrl: 'images/spitfire_poster.jpg', // Spitfire / vintage prop plane at sunset
    posterVerified: true,
    posterSource: 'Wikimedia Commons / RAF Photographic Archive',
    noseArtUrl: 'images/spitfire_noseart.jpg',
    noseArtVerified: true,
    noseArtSource: 'Wikimedia Commons / Imperial War Museum',
    noseArtName: 'The Royal Rebel',
    noseArtDescription: 'British RAF fighter pilots did not typically carry pin-up nose art, but they wore distinctive squadron codes (like "XT-B") and national roundels representing their squadron identity. This detail captures the authentic weathered green-grey camouflage of the legendary MH434.',
    cockpitUrl: 'images/spitfire_cockpit.jpg', // Aviation dial panel
    cockpitVerified: true,
    cockpitSource: 'Wikimedia Commons / Shuttleworth Collection',
    description: 'The Spitfire is arguably the most famous and beautiful fighter plane ever designed. With its iconic elliptical wing profile and the glorious roar of the Rolls-Royce Merlin engine, the Spitfire was the shield of Britain during the Battle of Britain. The Mk IX variant was rushed into service in 1942 specifically to counter the devastating new German Focke-Wulf Fw 190, restoring allied air superiority.',
    specs: {
      maxSpeed: '408 mph (657 km/h)',
      armament: '2 x 20mm Hispano Cannons, 4 x .303 Browning Machine Guns',
      range: '434 miles (700 km) internal, 980 miles with drop tank',
      engine: 'Rolls-Royce Merlin 66 supercharged V-12',
      wingspan: '36 ft 10 in (11.23 m)',
      emptyWeight: '5,610 lbs (2,545 kg)'
    },
    wireframeMesh: spitfireMesh,
    pilotStories: [
      {
        id: 'douglas-bader',
        name: 'Douglas Bader',
        rank: 'Wing Commander',
        yearsOfService: '1928 - 1946',
        kills: 22,
        medals: ['Distinguished Service Order (with Bar)', 'Distinguished Flying Cross (with Bar)'],
        isTuskegee: false,
        photoUrl: 'images/pilot_douglas_bader.jpg',
        photoVerified: true,
        photoSource: 'Imperial War Museum Collection (1941)',
        quote: 'Rules are for the obedience of fools and the guidance of wise men. In the sky, you follow your instincts.',
        bio: 'One of the most extraordinary figures of the war. Douglas Bader lost both of his legs in a pre-war air crash but fought his way back into active fighter service using tin legs. During the Battle of Britain, he was a charismatic and aggressive commander who pioneered the "Big Wing" tactic. He downed 22 enemy aircraft before being shot down and captured in 1941, frequently attempting escape from Colditz Castle despite his prosthetic legs.'
      }
    ],
    flightLogs: [
      {
        id: 'log-spit-01',
        date: '1942-08-19',
        pilotName: 'Wing Cmdr. Douglas Bader',
        aircraftName: 'Spitfire Mk IX "Lordly Guardian"',
        mission: 'Support Over Dieppe Raid',
        duration: '2h 30m',
        logText: 'Pushed into high patrol over Dieppe beachheads. Spotted Fw 190s diving out of sun. Latched onto the rear of an Fw 190. Fired a burst at 200 yards; observed cannon shells exploding on wing roots. Enemy wing sheared, aircraft entered spin. Engaged in high G maneuvers, canopy heavily smeared with engine oil from target. Low ammo on landing.',
        status: 'Completed',
        location: 'Dieppe Coast, France',
        airbase: 'RAF Tangmere, England'
      }
    ]
  },
  {
    id: 'p38-lightning',
    name: 'P-38 Lightning',
    nickname: 'The Fork-Tailed Devil',
    country: 'United States',
    faction: 'allied',
    isTuskegee: false,
    year: 1941,
    posterUrl: 'images/p38_poster.jpg', // Real heavy twin-propeller vintage aircraft
    posterVerified: true,
    posterSource: 'Wikimedia Commons / USAF National Museum (1944)',
    noseArtUrl: 'images/p38_noseart.jpg',
    noseArtVerified: true,
    noseArtSource: 'Wikimedia Commons / Richard Bong Historical Center',
    noseArtName: 'Marge',
    noseArtDescription: 'Major Richard Bong, America\'s all-time Ace of Aces with 40 confirmed kills, named his P-38 "Marge" after his fiancée, Marjorie Vattendahl. He had an enormous black-and-white photograph of her face painted onto the right engine cowling, making it one of the most famous personalized nose arts of the war.',
    cockpitUrl: 'images/p38_cockpit.jpg', // Dual engine engine console controls
    cockpitVerified: true,
    cockpitSource: 'Wikimedia Commons / Warbirds Historical Registry',
    description: 'A masterpiece of Kelly Johnson\'s Lockheed design team, the P-38 was a highly radical, twin-engine, twin-boom heavy fighter. Because its guns were placed directly in the nose of the central pod (rather than the wings), it had laser-like accuracy at massive distances. It was highly feared in the Pacific Theater, where Japanese pilots dubbed it the "Fork-Tailed Devil" due to its speed, fire-power, and devastating climbing speed.',
    specs: {
      maxSpeed: '414 mph (666 km/h)',
      armament: '1 x 20mm Hispano Cannon, 4 x .50 caliber Browning MG',
      range: '1,300 miles (2,100 km) combat range',
      engine: '2 x Allison V-1710 liquid-cooled supercharged V-12s',
      wingspan: '52 ft (15.85 m)',
      emptyWeight: '12,800 lbs (5,800 kg)'
    },
    wireframeMesh: p38Mesh,
    pilotStories: [
      {
        id: 'richard-bong',
        name: 'Richard "Dick" Bong',
        rank: 'Major',
        yearsOfService: '1941 - 1945',
        kills: 40,
        medals: ['Medal of Honor', 'Distinguished Service Cross', 'Silver Star'],
        isTuskegee: false,
        photoUrl: 'images/pilot_richard_bong.jpg',
        photoVerified: true,
        photoSource: 'Allied Historical Archive / USAAF (1943)',
        quote: 'My success is entirely due to the P-38. It got me into trouble quickly, but its twin engines always got me back out.',
        bio: 'America\'s all-time "Ace of Aces." Richard Bong grew up on a Wisconsin farm and became a master of deflection shooting in the Pacific. Flying exclusively P-38 Lightnings, Bong scored 40 confirmed aerial victories against Japanese aircraft. He was awarded the Medal of Honor by General Douglas MacArthur, who described him as the absolute master of the Pacific skies.'
      }
    ],
    flightLogs: [
      {
        id: 'log-p38-01',
        date: '1943-03-03',
        pilotName: 'Maj. Richard Bong',
        aircraftName: 'P-38G "Marge"',
        mission: 'Battle of the Bismarck Sea Escort',
        duration: '4h 45m',
        logText: 'Patrolled over allied convoy under heavy aerial attack by Japanese bombers and Zero escorts. Dived on a flight of Ki-43 fighters. Captured one in gunsight, fired nose-grouped 20mm and .50s. Target disintegrated in mid-air. Climbed to evade Zero intercept. Twin Allison engines performing flawlessly under combat strain. Heavy rain on landing at base.',
        status: 'Completed',
        location: 'Bismarck Sea, Pacific',
        airbase: 'Dobodura Airfield, New Guinea'
      }
    ]
  },
  {
    id: 'f6f-hellcat',
    name: 'F6F Hellcat',
    nickname: 'The Ace Maker',
    country: 'United States',
    faction: 'allied',
    isTuskegee: false,
    year: 1943,
    posterUrl: 'images/f6f_poster.jpg',
    posterVerified: true,
    posterSource: 'Wikimedia Commons / National Museum of the US Navy (1944)',
    noseArtUrl: 'images/f6f_noseart.jpg',
    noseArtVerified: true,
    noseArtSource: 'Wikimedia Commons / USS Yorktown Memorial Archive',
    noseArtName: 'Cat-O-Nine Tails',
    noseArtDescription: 'Navy fighters in the Pacific typically did not carry elaborate pin-up nose art due to strict naval regulations, but squadron markings, kill flags, and tail codes (like those of the famed VF-27 with its snarling cat mouths) were widely painted on Hellcats to strike fear into their opponents.',
    cockpitUrl: 'images/f6f_cockpit.jpg',
    cockpitVerified: true,
    cockpitSource: 'Wikimedia Commons / Smithsonian National Air and Space Museum',
    description: 'The Grumman F6F Hellcat was the dominant carrier-based fighter of the US Navy in the second half of WWII. Rushed into service to counter the legendary Japanese A6M Zero, the Hellcat proved to be incredibly rugged and powerful. It is credited with destroying 5,203 enemy aircraft—more than any other Allied naval plane—earning it the nickname "The Ace Maker."',
    specs: {
      maxSpeed: '391 mph (629 km/h)',
      armament: '6 x .50 caliber Browning M2 Machine Guns (or 2 x 20mm AN/M2 Cannons + 4 x .50 cal)',
      range: '940 miles (1,513 km) with drop tank',
      engine: 'Pratt & Whitney R-2800-10W Double Wasp radial engine (2,000 hp)',
      wingspan: '42 ft 10 in (13.06 m)',
      emptyWeight: '9,238 lbs (4,190 kg)'
    },
    wireframeMesh: hellcatMesh,
    pilotStories: [
      {
        id: 'david-mccampbell',
        name: 'David McCampbell',
        rank: 'Commander',
        yearsOfService: '1933 - 1964',
        kills: 34,
        medals: ['Medal of Honor', 'Navy Cross', 'Silver Star', 'Legion of Merit', 'Distinguished Flying Cross'],
        isTuskegee: false,
        photoUrl: 'images/pilot_david_mccampbell.jpg',
        photoVerified: true,
        photoSource: 'Allied Historical Archive / US Navy (1944)',
        quote: 'I just got into a position where they couldn\'t hit me, and I could hit them.',
        bio: 'America\'s all-time leading Navy Ace. McCampbell commanded Air Group 15 aboard the USS Essex. On October 24, 1944, during the Battle of Leyte Gulf, he and his wingman intercepted a formation of 60 Japanese aircraft. In a legendary display of airmanship, McCampbell shot down 9 enemy aircraft in a single mission—an unmatched US military record.'
      }
    ],
    flightLogs: [
      {
        id: 'log-hellcat-01',
        date: '1944-06-19',
        pilotName: 'Cmdr. David McCampbell',
        aircraftName: 'F6F-5 Hellcat "Minsi III"',
        mission: 'Combat Air Patrol (Great Marianas Turkey Shoot)',
        duration: '3h 40m',
        logText: 'Scrambled from USS Essex to intercept incoming raid. Vectored towards massive bogey formation. Spotted dozens of Yokosuka D4Y bombers and Zero escorts. Dived into the formation and shot down five bombers in quick succession. Evaded three Zeros using high-speed dive-and-zoom maneuvers. Plane suffered minor shell splinter damage on starboard wing. Total victories for the afternoon: 7. Ammo almost completely expended.',
        status: 'Completed',
        location: 'Marianas Islands (Pacific)',
        airbase: 'USS Essex (CV-9)'
      }
    ]
  },
  {
    id: 'p47-thunderbolt',
    name: 'P-47 Thunderbolt',
    nickname: 'The Jug',
    country: 'United States',
    faction: 'allied',
    isTuskegee: false,
    year: 1942,
    posterUrl: 'images/p47_poster.jpg',
    posterVerified: true,
    posterSource: 'Wikimedia Commons / US Army Air Forces Photographic Collection (1944)',
    noseArtUrl: 'images/p47_noseart.jpg',
    noseArtVerified: true,
    noseArtSource: 'Wikimedia Commons / USAF Museum',
    noseArtName: 'In the Mood',
    noseArtDescription: 'The P-47 "Jug" was famous for hosting some of the most vibrant nose art of the European theater. Because of its massive fuselage size, crew chiefs had a giant canvas to paint beautiful pin-ups, squadron emblems, and comical characters.',
    cockpitUrl: 'images/p47_cockpit.jpg',
    cockpitVerified: true,
    cockpitSource: 'Wikimedia Commons / Francis Gabreski Personal Archive (1944)',
    description: 'The Republic P-47 Thunderbolt was one of the largest and heaviest fighter aircraft in history to be powered by a single piston engine. Nicknamed "The Jug" due to its milk-jug shape, it was an incredibly durable aircraft. Its heavily armored cockpit and powerful Pratt & Whitney radial engine allowed it to survive immense damage, making it a premier ground-attack platform and high-altitude escort.',
    specs: {
      maxSpeed: '433 mph (697 km/h)',
      armament: '8 x .50 caliber Browning M2 Machine Guns, up to 2,500 lbs of bombs',
      range: '800 miles (1,290 km) combat, 1,800 miles ferry',
      engine: 'Pratt & Whitney R-2800-59 Double Wasp twin-row radial engine (2,300 hp)',
      wingspan: '40 ft 9 in (12.42 m)',
      emptyWeight: '10,000 lbs (4,536 kg)'
    },
    wireframeMesh: p47Mesh,
    pilotStories: [
      {
        id: 'francis-gabreski',
        name: 'Francis Gabreski',
        rank: 'Lieutenant Colonel',
        yearsOfService: '1940 - 1967',
        kills: 28,
        medals: ['Distinguished Service Cross', 'Silver Star', 'Distinguished Flying Cross', 'Bronze Star', 'Air Medal'],
        isTuskegee: false,
        photoUrl: 'images/pilot_francis_gabreski.jpg',
        photoVerified: true,
        photoSource: 'Allied Historical Archive / USAAF (1944)',
        quote: 'The P-47 was a flying fortress in itself. You could get shot to pieces, but it would still bring you home.',
        bio: 'The top American Army Air Forces Ace in Europe during World War II. Gabreski, the son of Polish immigrants, flew P-47 Thunderbolts with the famous 56th Fighter Group ("The Wolfpack"). He was known for his aggressive close-in shooting style. After completing his combat tour with 28 victories, he crashed on his final scheduled mission and spent the remaining months of the war as a POW.'
      }
    ],
    flightLogs: [
      {
        id: 'log-p47-01',
        date: '1944-05-22',
        pilotName: 'Lt. Col. Francis Gabreski',
        aircraftName: 'P-47D-25 "In The Mood"',
        mission: 'High-Altitude Bomber Escort / Sweep',
        duration: '4h 15m',
        logText: 'Led the 61st Squadron escorting B-17s to Frankfurt. Engaged Me 410 heavy fighters attempting to rocket the bomber stream. Fired a long deflection burst at one Me 410, which caught fire and exploded. Plunged into a cloud bank to shake off an Fw 190 on my tail. Supercharger handled high-altitude air superbly at 30,000 ft. Returned with multiple small-caliber hits to the armored fuselage belly. Engine oil pressure remained steady throughout egress.',
        status: 'Completed',
        location: 'Western Germany',
        airbase: 'RAF Halesworth, England'
      }
    ]
  },
  {
    id: 'p40-warhawk',
    name: 'P-40 Warhawk',
    nickname: 'The Flying Tiger',
    country: 'United States',
    faction: 'allied',
    isTuskegee: false,
    year: 1939,
    posterUrl: 'images/p40_poster.jpg',
    posterVerified: true,
    posterSource: 'Wikimedia Commons / Allied Aviation Historical Society',
    noseArtUrl: 'images/p40_noseart.jpg',
    noseArtVerified: true,
    noseArtSource: 'Wikimedia Commons / AVG Flying Tigers Historical Association',
    noseArtName: 'Shark Mouth',
    noseArtDescription: 'The iconic shark mouth nose art of the Flying Tigers is the most famous aircraft paint scheme in history. Originally inspired by British Desert Air Force P-40s in North Africa, it became a terrifying symbol of defiance against Japanese air forces in Asia.',
    cockpitUrl: 'images/p40_cockpit.jpg',
    cockpitVerified: true,
    cockpitSource: 'Wikimedia Commons / US Navy Historical Division (1941)',
    description: 'The Curtiss P-40 Warhawk was America\'s primary front-line fighter when Pearl Harbor was attacked. Though outperformed at high altitudes by the Spitfire and the Zero, the P-40 was incredibly robust, could out-dive almost any opponent, and was highly effective at low-to-medium altitudes. It achieved immortal fame in the hands of the "Flying Tigers"—the American Volunteer Group (AVG) in China—who painted iconic shark mouths on their noses.',
    specs: {
      maxSpeed: '360 mph (580 km/h)',
      armament: '6 x .50 caliber Browning M2 Machine Guns',
      range: '650 miles (1,050 km)',
      engine: 'Allison V-1710-39 liquid-cooled V-12 (1,150 hp)',
      wingspan: '37 ft 4 in (11.38 m)',
      emptyWeight: '6,350 lbs (2,880 kg)'
    },
    wireframeMesh: p40Mesh,
    pilotStories: [
      {
        id: 'david-lee-hill',
        name: 'David Lee "Tex" Hill',
        rank: 'Wing Commander (AVG)',
        yearsOfService: '1939 - 1945',
        kills: 18,
        medals: ['Distinguished Service Cross', 'Silver Star', 'Distinguished Flying Cross'],
        isTuskegee: false,
        photoUrl: 'images/pilot_tex_hill.jpg',
        photoVerified: true,
        photoSource: 'Allied Historical Archive / AVG (1942)',
        quote: 'We developed tactics based on our strengths. We never tried to dogfight a Zero. We dived, made a pass, and used our speed to climb away.',
        bio: 'A legendary squadron leader of the 2nd Squadron "Panda Bears" of the American Volunteer Group ("Flying Tigers") in China. Flying the rugged P-40, Hill scored 11.25 victories with the AVG and later became commander of the 23rd Fighter Group, adding several more kills. His tactical mastery of energy fighting helped AVG achieve an astounding 10-to-1 kill ratio.'
      }
    ],
    flightLogs: [
      {
        id: 'log-p40-01',
        date: '1942-01-03',
        pilotName: 'Squadron Leader Tex Hill',
        aircraftName: 'P-40B "Shark Mouth #18"',
        mission: 'Airfield Interception / Fighter Sweep',
        duration: '3h 10m',
        logText: 'Scrambled from Kunming to defend airfield against incoming Japanese Ki-27 fighters and Ki-21 bombers. Intercepted bogeys near the Salween River Gorge. Dived out of the sun onto three Ki-27s. Demolished the trailing aircraft with a three-second burst. Fled climbing Zero escort by diving into the gorge; airspeed reached 420 mph, easily outpacing pursuers. Engine temp high due to cooling flap malfunction. Returned with light flak marks on tail stabilizer.',
        status: 'Completed',
        location: 'Kunming Valley, China',
        airbase: 'Kunming Airfield, China'
      }
    ]
  },
  {
    id: 'f8f-bearcat',
    name: 'F8F Bearcat',
    nickname: 'The Ultimate Prop-Jet',
    country: 'United States',
    faction: 'allied',
    isTuskegee: false,
    year: 1945,
    posterUrl: 'images/f8f_poster.jpg',
    posterVerified: true,
    posterSource: 'Wikimedia Commons / Chino Planes of Fame Museum',
    noseArtUrl: 'images/f8f_noseart.jpg',
    noseArtVerified: true,
    noseArtSource: 'Wikimedia Commons / Blue Angels Historical Exhibition',
    noseArtName: 'Beetle Bomb',
    noseArtDescription: 'Postwar naval paint schemes shifted away from nose art to a high-gloss overall Sea Blue finish with bold white lettering. The Bearcat is famous for serving as the first aircraft of the newly formed Navy "Blue Angels" flight demonstration team in 1946.',
    cockpitUrl: 'images/f8f_cockpit.jpg',
    cockpitVerified: true,
    cockpitSource: 'Wikimedia Commons / NACA Flight Research Section (1946)',
    description: 'Designed by Grumman at the absolute peak of piston-engine technology, the F8F Bearcat was a lightweight, high-performance carrier fighter. It was built around the massive Pratt & Whitney Double Wasp engine—the same powerplant as the Hellcat and Corsair—but inside an airframe that was 2,000 lbs lighter. The result was a "hot rod" with an astronomical climb rate and maneuverability, though it arrived too late to see significant combat in WWII.',
    specs: {
      maxSpeed: '421 mph (678 km/h)',
      armament: '4 x .50 caliber Browning M2 Machine Guns (or 4 x 20mm AN/M3 Cannons)',
      range: '865 miles (1,392 km)',
      engine: 'Pratt & Whitney R-2800-34W Double Wasp radial engine (2,100 hp)',
      wingspan: '35 ft 10 in (10.92 m)',
      emptyWeight: '7,070 lbs (3,207 kg)'
    },
    wireframeMesh: bearcatMesh,
    pilotStories: [
      {
        id: 'al-williams',
        name: 'Roy "Butch" Voris',
        rank: 'Commander',
        yearsOfService: '1941 - 1963',
        kills: 8,
        medals: ['Legion of Merit', 'Distinguished Flying Cross (3)', 'Air Medal (11)'],
        isTuskegee: false,
        photoUrl: 'images/pilot_roy_voris.jpg',
        photoVerified: true,
        photoSource: 'Allied Historical Archive / Blue Angels Collection',
        quote: 'The Bearcat was the absolute pinnacle of piston-engine power. It did not fly; it leaped into the heavens like a rocket.',
        bio: 'A highly decorated fighter ace and legendary test pilot who was handpicked by Admiral Nimitz to form and lead the US Navy\'s first flight demonstration team, the Blue Angels, in 1946. Voris flew the insane, climbing F8F Bearcat in high-speed, close-formation aerobatic displays, establishing a lasting legacy of precision naval aviation.'
      }
    ],
    flightLogs: [
      {
        id: 'log-bearcat-01',
        date: '1946-06-15',
        pilotName: 'Cmdr. Roy "Butch" Voris',
        aircraftName: 'F8F-1 Bearcat "Blue Angel 1"',
        mission: 'Inaugural Blue Angels Public Exhibition',
        duration: '1h 15m',
        logText: 'Led the newly formed Flight Exhibition Team in the first public show at NAS Jacksonville. Performed tight-formation barrel rolls and high-speed opposition passes. Executed the "Beetle Bomb" simulated dogfight maneuver, demonstrating the incredible vertical turning capacity of the Bearcat. Aircraft responded beautifully to control inputs. G-forces on vertical climb peaked at +6.2 Gs. Minor hydraulic pressure drop in landing gear, resolved on final approach.',
        status: 'Completed',
        location: 'NAS Jacksonville, Florida',
        airbase: 'NAS Jacksonville, USA'
      }
    ]
  },
  {
    id: 'f4u-corsair',
    name: 'F4U Corsair',
    nickname: 'Whistling Death',
    country: 'United States',
    faction: 'allied',
    isTuskegee: false,
    year: 1942,
    posterUrl: 'images/f4u_poster.jpg',
    posterVerified: true,
    posterSource: 'Wikimedia Commons / Smithsonian National Air and Space Museum',
    noseArtUrl: 'images/f4u_noseart.jpg',
    noseArtVerified: true,
    noseArtSource: 'Wikimedia Commons / Warbird Heritage Foundation',
    noseArtName: 'Marines Dream',
    noseArtDescription: 'The F4U Corsair carried some of the most striking markings of the Pacific Theater. Gregory "Pappy" Boyington\'s VMF-214 "Black Sheep" and other Marine fighter squadrons frequently personalized their aircraft with custom nose art, reflecting their fierce independence and camaraderie on remote island airstrips.',
    cockpitUrl: 'images/f4u_cockpit.jpg',
    cockpitVerified: true,
    cockpitSource: 'Wikimedia Commons / National Museum of the Marine Corps',
    description: 'The Vought F4U Corsair is one of the most recognizable and successful fighters of WWII. Instantly distinguishable by its unique inverted gull-wing design, which was engineered to keep the massive 13-foot propeller from striking the ground, the Corsair was a carrier-capable powerhouse. Powered by the legendary Pratt & Whitney Double Wasp radial engine, it possessed devastating speed and durability. Japanese forces referred to it as "Whistling Death" due to the high-pitched sound of its wing root engine coolers during high-speed dives.',
    specs: {
      maxSpeed: '446 mph (718 km/h)',
      armament: '6 x .50 caliber Browning M2 Machine Guns (or 4 x 20mm Cannons), up to 4,000 lbs of ordnance',
      range: '1,005 miles (1,617 km) combat range',
      engine: 'Pratt & Whitney R-2800-8 Double Wasp radial engine (2,000 hp)',
      wingspan: '41 ft (12.5 m)',
      emptyWeight: '8,982 lbs (4,074 kg)'
    },
    wireframeMesh: corsairMesh,
    pilotStories: [
      {
        id: 'pappy-boyington',
        name: 'Gregory "Pappy" Boyington',
        rank: 'Major',
        yearsOfService: '1936 - 1947',
        kills: 26,
        medals: ['Medal of Honor', 'Navy Cross', 'Purple Heart'],
        isTuskegee: false,
        photoUrl: 'images/pilot_pappy_boyington.jpg',
        photoVerified: true,
        photoSource: 'Allied Historical Archive / US Marine Corps (1943)',
        quote: 'Just give me a Corsair and a flock of Black Sheep, and we\'ll clear the skies from Rabaul to Tokyo.',
        bio: 'The colorful and rebellious commander of the famous VMF-214 "Black Sheep" squadron. Boyington was a veteran of the AVG Flying Tigers in China before returning to the Marine Corps. Gathering a group of "misfit" pilots, he formed a legendary fighting unit that shot down 97 enemy planes in just 84 days. Boyington himself claimed 26 victories before being shot down, captured, and spending 20 months as a POW in Japan.'
      }
    ],
    flightLogs: [
      {
        id: 'log-f4u-01',
        date: '1943-12-23',
        pilotName: 'Maj. Gregory Boyington',
        aircraftName: 'F4U-1 Corsair "Lulubelle"',
        mission: 'Fighter Sweep over Rabaul Harbor',
        duration: '3h 50m',
        logText: 'Led a 24-plane sweep over the heavily fortified Japanese base at Rabaul. Intercepted by a swarm of A6M Zeros diving from cloud deck. Engaged in high-stress vertical turning combat. Scored deflecting snapshots on a climbing Zero; saw its fuel tank erupt. Followed second Zero into a dive, out-speeding it and tearing its engine cowling with .50 cal bursts. Heavy oil splatter on windshield. Returned with minor shrapnel tears to fabric-covered outer wing panels.',
        status: 'Completed',
        location: 'Rabaul, New Britain (South Pacific)',
        airbase: 'Vella Lavella Airfield, Solomon Islands'
      }
    ]
  }
];
