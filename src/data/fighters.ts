import { FighterAircraft, WireframeMesh } from '../types';

// B-17 Flying Fortress Wireframe Mesh
const b17Mesh: WireframeMesh = {
  vertices: [
    [0, 0, 2.0], [0, 0.4, 1.2], [0.3, 0.1, 1.2], [-0.3, 0.1, 1.2], [0, -0.4, 1.2],
    [0, 0.1, -2.5], [0, 1.2, -2.3], [-4.5, 0.05, 0.2], [4.5, 0.05, 0.2], [-0.5, 0.1, 0.8],
    [0.5, 0.1, 0.8], [-0.5, 0.1, -0.6], [0.5, 0.1, -0.6], [-1.2, 0.05, -2.2], [1.2, 0.05, -2.2]
  ],
  faces: [
    [0, 1, 2], [0, 2, 4], [0, 4, 3], [0, 3, 1], [1, 2, 5], [1, 3, 5], [4, 2, 5], [4, 3, 5],
    [5, 6, 9], [9, 7, 11], [10, 8, 12], [5, 13, 9], [5, 14, 9]
  ]
};

// B-24 Liberator Mesh
const b24Mesh: WireframeMesh = {
  vertices: [
    [0, 0, 1.8], [0, 0.45, 1.0], [0.35, 0.1, 1.0], [-0.35, 0.1, 1.0], [0, -0.45, 1.0],
    [0, 0.1, -2.4], [-1.0, 0.8, -2.4], [1.0, 0.8, -2.4], [-4.8, 0.05, 0.1], [4.8, 0.05, 0.1],
    [-0.5, 0.1, 0.6], [0.5, 0.1, 0.6], [-1.1, 0.05, -2.4], [1.1, 0.05, -2.4]
  ],
  faces: [
    [0, 1, 2], [0, 2, 4], [0, 4, 3], [0, 3, 1], [1, 2, 5], [1, 3, 5], [4, 2, 5], [4, 3, 5],
    [10, 8, 5], [11, 9, 5], [5, 12, 6], [5, 13, 7]
  ]
};

// B-25 Mitchell Mesh
const b25Mesh: WireframeMesh = {
  vertices: [
    [0, 0, 1.5], [0, 0.35, 0.8], [0.25, 0.1, 0.8], [-0.25, 0.1, 0.8], [0, -0.35, 0.8],
    [0, 0.1, -2.0], [-0.8, 0.6, -2.0], [0.8, 0.6, -2.0], [-3.2, 0.05, 0.15], [3.2, 0.05, 0.15],
    [-0.4, 0.08, 0.5], [0.4, 0.08, 0.5]
  ],
  faces: [
    [0, 1, 2], [0, 2, 4], [0, 4, 3], [0, 3, 1], [1, 2, 5], [1, 3, 5], [4, 2, 5], [4, 3, 5],
    [10, 8, 5], [11, 9, 5], [5, 6, 5], [5, 7, 5]
  ]
};

// B-29 Superfortress Mesh
const b29Mesh: WireframeMesh = {
  vertices: [
    [0, 0, 2.4], [0, 0.4, 1.6], [0.35, 0.1, 1.6], [-0.35, 0.1, 1.6], [0, -0.4, 1.6],
    [0, 0.1, -3.0], [0, 1.5, -2.8], [-6.0, 0.05, 0.3], [6.0, 0.05, 0.3], [-0.6, 0.1, 1.0],
    [0.6, 0.1, 1.0], [-1.6, 0.05, -2.7], [1.6, 0.05, -2.7]
  ],
  faces: [
    [0, 1, 2], [0, 2, 4], [0, 4, 3], [0, 3, 1], [1, 2, 5], [1, 3, 5], [4, 2, 5], [4, 3, 5],
    [5, 6, 9], [9, 7, 5], [10, 8, 5], [5, 11, 5], [5, 12, 5]
  ]
};

// Avro Lancaster Mesh
const lancasterMesh: WireframeMesh = {
  vertices: [
    [0, 0, 1.9], [0, 0.45, 1.1], [0.3, 0.1, 1.1], [-0.3, 0.1, 1.1], [0, -0.45, 1.1],
    [0, 0.1, -2.6], [-0.9, 0.75, -2.6], [0.9, 0.75, -2.6], [-4.5, 0.05, 0.2], [4.5, 0.05, 0.2],
    [-0.5, 0.1, 0.7], [0.5, 0.1, 0.7], [-1.2, 0.05, -2.4], [1.2, 0.05, -2.4]
  ],
  faces: [
    [0, 1, 2], [0, 2, 4], [0, 4, 3], [0, 3, 1], [1, 2, 5], [1, 3, 5], [4, 2, 5], [4, 3, 5],
    [10, 8, 5], [11, 9, 5], [5, 12, 6], [5, 13, 7]
  ]
};

// Mosquito Mesh
const mosquitoMesh: WireframeMesh = {
  vertices: [
    [0, 0, 1.4], [0, 0.35, 0.7], [0.2, 0.08, 0.7], [-0.2, 0.08, 0.7], [0, -0.3, 0.7],
    [0, 0.05, -1.8], [0, 0.8, -1.7], [-2.4, 0.02, 0.15], [2.4, 0.02, 0.15], [-0.3, 0.05, 0.45],
    [0.3, 0.05, 0.45]
  ],
  faces: [
    [0, 1, 2], [0, 2, 4], [0, 4, 3], [0, 3, 1], [1, 2, 5], [1, 3, 5], [4, 2, 5], [4, 3, 5],
    [5, 6, 5], [9, 7, 5], [10, 8, 5]
  ]
};

// Halifax Mesh
const halifaxMesh: WireframeMesh = {
  vertices: [
    [0, 0, 1.8], [0, 0.4, 1.0], [0.3, 0.1, 1.0], [-0.3, 0.1, 1.0], [0, -0.4, 1.0],
    [0, 0.1, -2.5], [-0.9, 0.7, -2.5], [0.9, 0.7, -2.5], [-4.4, 0.05, 0.2], [4.4, 0.05, 0.2],
    [-0.5, 0.1, 0.7], [0.5, 0.1, 0.7]
  ],
  faces: [
    [0, 1, 2], [0, 2, 4], [0, 4, 3], [0, 3, 1], [1, 2, 5], [1, 3, 5], [4, 2, 5], [4, 3, 5],
    [10, 8, 5], [11, 9, 5]
  ]
};

// Wellington Mesh
const wellingtonMesh: WireframeMesh = {
  vertices: [
    [0, 0, 1.5], [0, 0.35, 0.8], [0.25, 0.1, 0.8], [-0.25, 0.1, 0.8], [0, -0.35, 0.8],
    [0, 0.1, -2.1], [0, 0.9, -2.0], [-3.6, 0.05, 0.15], [3.6, 0.05, 0.15], [-0.4, 0.08, 0.5],
    [0.4, 0.08, 0.5]
  ],
  faces: [
    [0, 1, 2], [0, 2, 4], [0, 4, 3], [0, 3, 1], [1, 2, 5], [1, 3, 5], [4, 2, 5], [4, 3, 5],
    [9, 7, 5], [10, 8, 5]
  ]
};

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

    extraImages: [
      {
            'url': 'images/p51-mustang_extra_0.jpg',
            'title': 'P-51 Mustang in flight',
            'description': 'Historical action shot of the P-51 Mustang captured during active aerial operations.',
            'label': 'FLIGHT'
      },
      {
            'url': 'images/p51-mustang_extra_1.jpg',
            'title': 'P-51 Mustang on tarmac',
            'description': 'Ground crew inspection and maintenance photograph of the P-51 Mustang parked at an allied airbase.',
            'label': 'AIRFIELD'
      }
],    nickname: 'Red Tails / Cadillacs of the Sky',
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

    extraImages: [
      {
            'url': 'images/benjamin-o-davis_extra_0.jpg',
            'title': 'Benjamin O. Davis Jr. in flight',
            'description': 'Historical action shot of the Benjamin O. Davis Jr. captured during active aerial operations.',
            'label': 'FLIGHT'
      },
      {
            'url': 'images/benjamin-o-davis_extra_1.jpg',
            'title': 'Benjamin O. Davis Jr. on tarmac',
            'description': 'Ground crew inspection and maintenance photograph of the Benjamin O. Davis Jr. parked at an allied airbase.',
            'label': 'AIRFIELD'
      }
],        rank: 'Colonel (later Brigadier General)',
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

    extraImages: [
      {
            'url': 'images/charles-b-hall_extra_0.jpg',
            'title': 'Charles B. Hall in flight',
            'description': 'Historical action shot of the Charles B. Hall captured during active aerial operations.',
            'label': 'FLIGHT'
      }
],        rank: 'Major',
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

    extraImages: [
      {
            'url': 'images/spitfire-mkix_extra_0.jpg',
            'title': 'Supermarine Spitfire Mk IX in flight',
            'description': 'Historical action shot of the Supermarine Spitfire Mk IX captured during active aerial operations.',
            'label': 'FLIGHT'
      },
      {
            'url': 'images/spitfire-mkix_extra_1.jpg',
            'title': 'Supermarine Spitfire Mk IX on tarmac',
            'description': 'Ground crew inspection and maintenance photograph of the Supermarine Spitfire Mk IX parked at an allied airbase.',
            'label': 'AIRFIELD'
      }
],    nickname: 'The Graceful Defender',
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

    extraImages: [
      {
            'url': 'images/douglas-bader_extra_0.jpg',
            'title': 'Douglas Bader in flight',
            'description': 'Historical action shot of the Douglas Bader captured during active aerial operations.',
            'label': 'FLIGHT'
      },
      {
            'url': 'images/douglas-bader_extra_1.jpg',
            'title': 'Douglas Bader on tarmac',
            'description': 'Ground crew inspection and maintenance photograph of the Douglas Bader parked at an allied airbase.',
            'label': 'AIRFIELD'
      }
],        rank: 'Wing Commander',
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

    extraImages: [
      {
            'url': 'images/p38-lightning_extra_0.jpg',
            'title': 'P-38 Lightning in flight',
            'description': 'Historical action shot of the P-38 Lightning captured during active aerial operations.',
            'label': 'FLIGHT'
      },
      {
            'url': 'images/p38-lightning_extra_1.jpg',
            'title': 'P-38 Lightning on tarmac',
            'description': 'Ground crew inspection and maintenance photograph of the P-38 Lightning parked at an allied airbase.',
            'label': 'AIRFIELD'
      }
],    nickname: 'The Fork-Tailed Devil',
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

    extraImages: [
      {
            'url': 'images/richard-bong_extra_0.jpg',
            'title': 'Richard \'Dick\' Bong in flight',
            'description': 'Historical action shot of the Richard \'Dick\' Bong captured during active aerial operations.',
            'label': 'FLIGHT'
      }
],        rank: 'Major',
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

    extraImages: [
      {
            'url': 'images/f6f-hellcat_extra_0.jpg',
            'title': 'F6F Hellcat in flight',
            'description': 'Historical action shot of the F6F Hellcat captured during active aerial operations.',
            'label': 'FLIGHT'
      },
      {
            'url': 'images/f6f-hellcat_extra_1.jpg',
            'title': 'F6F Hellcat on tarmac',
            'description': 'Ground crew inspection and maintenance photograph of the F6F Hellcat parked at an allied airbase.',
            'label': 'AIRFIELD'
      }
],    nickname: 'The Ace Maker',
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

    extraImages: [
      {
            'url': 'images/david-mccampbell_extra_0.jpg',
            'title': 'David McCampbell in flight',
            'description': 'Historical action shot of the David McCampbell captured during active aerial operations.',
            'label': 'FLIGHT'
      }
],        rank: 'Commander',
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
    posterUrl: 'images/p47_poster_v2.jpg',
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
    extraImages: [
      {
        url: 'images/p47_razorback.jpg',
        title: 'P-47D Thunderbolt "Razorback" Variant',
        description: 'An early production P-47D "Razorback" variant, characterized by the high rear canopy deck sloping down to the tail assembly.',
        label: 'RAZORBACK'
      }
    ],
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

    extraImages: [
      {
            'url': 'images/francis-gabreski_extra_0.jpg',
            'title': 'Francis Gabreski in flight',
            'description': 'Historical action shot of the Francis Gabreski captured during active aerial operations.',
            'label': 'FLIGHT'
      },
      {
            'url': 'images/francis-gabreski_extra_1.jpg',
            'title': 'Francis Gabreski on tarmac',
            'description': 'Ground crew inspection and maintenance photograph of the Francis Gabreski parked at an allied airbase.',
            'label': 'AIRFIELD'
      }
],        rank: 'Lieutenant Colonel',
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

    extraImages: [
      {
            'url': 'images/p40-warhawk_extra_0.jpg',
            'title': 'P-40 Warhawk in flight',
            'description': 'Historical action shot of the P-40 Warhawk captured during active aerial operations.',
            'label': 'FLIGHT'
      },
      {
            'url': 'images/p40-warhawk_extra_1.jpg',
            'title': 'P-40 Warhawk on tarmac',
            'description': 'Ground crew inspection and maintenance photograph of the P-40 Warhawk parked at an allied airbase.',
            'label': 'AIRFIELD'
      }
],    nickname: 'The Flying Tiger',
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

    extraImages: [
      {
            'url': 'images/f8f-bearcat_extra_0.jpg',
            'title': 'F8F Bearcat in flight',
            'description': 'Historical action shot of the F8F Bearcat captured during active aerial operations.',
            'label': 'FLIGHT'
      },
      {
            'url': 'images/f8f-bearcat_extra_1.jpg',
            'title': 'F8F Bearcat on tarmac',
            'description': 'Ground crew inspection and maintenance photograph of the F8F Bearcat parked at an allied airbase.',
            'label': 'AIRFIELD'
      }
],    nickname: 'The Ultimate Prop-Jet',
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

    extraImages: [
      {
            'url': 'images/al-williams_extra_0.jpg',
            'title': 'Roy \'Butch\' Voris in flight',
            'description': 'Historical action shot of the Roy \'Butch\' Voris captured during active aerial operations.',
            'label': 'FLIGHT'
      }
],        rank: 'Commander',
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

    extraImages: [
      {
            'url': 'images/f4u-corsair_extra_0.jpg',
            'title': 'F4U Corsair in flight',
            'description': 'Historical action shot of the F4U Corsair captured during active aerial operations.',
            'label': 'FLIGHT'
      },
      {
            'url': 'images/f4u-corsair_extra_1.jpg',
            'title': 'F4U Corsair on tarmac',
            'description': 'Ground crew inspection and maintenance photograph of the F4U Corsair parked at an allied airbase.',
            'label': 'AIRFIELD'
      }
],    nickname: 'Whistling Death',
    country: 'United States',
    faction: 'allied',
    isTuskegee: false,
    year: 1942,
    posterUrl: 'images/f4u_poster_v2.jpg',
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

    extraImages: [
      {
            'url': 'images/pappy-boyington_extra_0.jpg',
            'title': 'Gregory \'Pappy\' Boyington in flight',
            'description': 'Historical action shot of the Gregory \'Pappy\' Boyington captured during active aerial operations.',
            'label': 'FLIGHT'
      },
      {
            'url': 'images/pappy-boyington_extra_1.jpg',
            'title': 'Gregory \'Pappy\' Boyington on tarmac',
            'description': 'Ground crew inspection and maintenance photograph of the Gregory \'Pappy\' Boyington parked at an allied airbase.',
            'label': 'AIRFIELD'
      }
],        rank: 'Major',
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
,
  {
    id: 'b17-flyingfortress',
    name: 'B-17F Flying Fortress',

    extraImages: [
      {
            'url': 'images/b17-flyingfortress_extra_0.jpg',
            'title': 'B-17F Flying Fortress in flight',
            'description': 'Historical action shot of the B-17F Flying Fortress captured during active aerial operations.',
            'label': 'FLIGHT'
      },
      {
            'url': 'images/b17-flyingfortress_extra_1.jpg',
            'title': 'B-17F Flying Fortress on tarmac',
            'description': 'Ground crew inspection and maintenance photograph of the B-17F Flying Fortress parked at an allied airbase.',
            'label': 'AIRFIELD'
      }
],    nickname: 'Memphis Belle',
    country: 'United States',
    faction: 'allied',
    year: 1942,
    type: 'bomber',
    description: 'The Boeing B-17 Flying Fortress is the iconic heavy bomber of the United States Army Air Forces. Renowned for its extreme ruggedness and structural durability, the B-17 was capable of absorbing massive battle damage and returning home. Equipped with 13 defensive machine guns and carrying up to 8,000 lbs of bombs, it formed the backbone of the daylight precision bombing campaign over Nazi Germany.',
    specs: {
      maxSpeed: '287 mph (462 km/h)',
      armament: '13 × .50 in (12.7 mm) M2 Browning machine guns; up to 8,000 lbs of ordnance',
      range: '2,000 miles (3,219 km) combat range',
      engine: '4 × Wright R-1820-97 Cyclone radial engines (1,200 hp each)',
      wingspan: '103 ft 9 in (31.6 m)',
      emptyWeight: '36,135 lbs (16,391 kg)'
    },
    posterUrl: 'images/b17_poster.jpg',
    posterVerified: true,
    posterSource: 'US Army Air Forces / Boeing Historical Archive (1942)',
    noseArtUrl: 'images/b17_noseart.jpg',
    noseArtName: 'Memphis Belle Pin-up',
    noseArtVerified: true,
    noseArtSource: 'Tenth Air Force Archive (1943)',
    noseArtDescription: 'The legendary "Memphis Belle" features a classic red swimsuit pin-up girl painted on the left side of the forward nose fuselage, symbolizing the crew\'s mascot during 25 hazardous missions over Europe.',
    cockpitUrl: 'images/b17_cockpit.jpg',
    cockpitVerified: true,
    cockpitSource: 'National Museum of the USAF',
    wireframeMesh: b17Mesh,
    isTuskegee: false,
    pilotStories: [
      {
        id: 'robert-morgan',
        name: 'Robert K. Morgan',

    extraImages: [
      {
            'url': 'images/robert-morgan_extra_0.jpg',
            'title': 'Robert K. Morgan in flight',
            'description': 'Historical action shot of the Robert K. Morgan captured during active aerial operations.',
            'label': 'FLIGHT'
      }
],        rank: 'Captain',
        yearsOfService: '1941 - 1965',
        kills: 0,
        medals: ['Distinguished Flying Cross', 'Air Medal with 3 Oak Leaf Clusters'],
        isTuskegee: false,
        photoUrl: 'images/pilot_benjamin_o_davis.jpg',
        photoVerified: false,
        photoSource: 'USAAF Public Domain',
        quote: 'We were just ten guys from different parts of the country trying to get through the war in one piece.',
        bio: 'Captain Robert Morgan was the pilot of the famous "Memphis Belle," leading his crew to become one of the first USAAF heavy bomber crews to complete 25 combat missions in the European Theater without losing a single man, returning to the US to promote war bonds.'
      }
    ],
    flightLogs: [
      {
        id: 'log-b17-01',
        date: '1943-05-17',
        pilotName: 'Capt. Robert Morgan',
        aircraftName: 'B-17F Memphis Belle',
        mission: 'Bombing Raid on Lorient Submarine Pens',
        duration: '7h 15m',
        logText: 'Sortie targeting submarine dry docks on the French coast. Met heavy flak over target zone. Starboard inner engine hit by shrapnel, feathering prop. Attacked by Fw 190s on return leg; waist gunners scored hit on one bandit. Landed safely with 40 shrapnel holes in fuselage.',
        status: 'Completed',
        location: 'Lorient, France',
        airbase: 'RAF Bassingbourn, England'
      }
    ]
  },
  {
    id: 'b24-liberator',
    name: 'B-24D Liberator',

    extraImages: [
      {
            'url': 'images/b24-liberator_extra_0.jpg',
            'title': 'B-24D Liberator in flight',
            'description': 'Historical action shot of the B-24D Liberator captured during active aerial operations.',
            'label': 'FLIGHT'
      },
      {
            'url': 'images/b24-liberator_extra_1.jpg',
            'title': 'B-24D Liberator on tarmac',
            'description': 'Ground crew inspection and maintenance photograph of the B-24D Liberator parked at an allied airbase.',
            'label': 'AIRFIELD'
      }
],    nickname: 'Strawberry Bitch',
    country: 'United States',
    faction: 'allied',
    year: 1941,
    type: 'bomber',
    description: 'The Consolidated B-24 Liberator was the most produced American military aircraft of WWII. Featuring the revolutionary high-aspect ratio Davis wing and dual tail design, it had a higher top speed, longer range, and heavier bomb load than the B-17, though it was less forgiving to fly and less durable under heavy gunfire.',
    specs: {
      maxSpeed: '290 mph (467 km/h)',
      armament: '10 × .50 in (12.7 mm) M2 Browning machine guns; up to 8,800 lbs of bombs',
      range: '2,100 miles (3,379 km) combat range',
      engine: '4 × Pratt & Whitney R-1830-43 Twin Wasp radial engines (1,200 hp each)',
      wingspan: '110 ft 0 in (33.5 m)',
      emptyWeight: '36,500 lbs (16,556 kg)'
    },
    posterUrl: 'images/b24_poster.jpg',
    posterVerified: true,
    posterSource: 'Consolidated Aircraft Archive (1942)',
    noseArtUrl: 'images/b24_noseart.jpg',
    noseArtName: 'Strawberry Bitch Pin-up',
    noseArtVerified: true,
    noseArtSource: 'National Museum of the USAF',
    noseArtDescription: 'Strawberry Bitch features a green-clad pin-up girl on the nose cowl, representative of the colorful nose artwork painted by USAAF bomber crews to decorate their airframe skin.',
    cockpitUrl: 'images/b24_cockpit.jpg',
    cockpitVerified: true,
    cockpitSource: 'Historical Wings Archive',
    wireframeMesh: b24Mesh,
    isTuskegee: false,
    pilotStories: [
      {
        id: 'john-joseph',
        name: 'John R. Joseph',

    extraImages: [
      {
            'url': 'images/john-joseph_extra_0.jpg',
            'title': 'John R. Joseph in flight',
            'description': 'Historical action shot of the John R. Joseph captured during active aerial operations.',
            'label': 'FLIGHT'
      },
      {
            'url': 'images/john-joseph_extra_1.jpg',
            'title': 'John R. Joseph on tarmac',
            'description': 'Ground crew inspection and maintenance photograph of the John R. Joseph parked at an allied airbase.',
            'label': 'AIRFIELD'
      }
],        rank: '1st Lieutenant',
        yearsOfService: '1942 - 1945',
        kills: 0,
        medals: ['Silver Star', 'Purple Heart'],
        isTuskegee: false,
        photoUrl: 'images/pilot_pappy_boyington.jpg',
        photoVerified: false,
        photoSource: 'USAAF Historical File',
        quote: 'The Davis wing kept us flying high, but she was a beast to steer when the controls got shot up.',
        bio: 'First Lieutenant John Joseph served as a pilot in the Pacific Theater, executing long-range maritime bombing strikes and low-altitude supply runs over jungle coordinates.'
      }
    ],
    flightLogs: [
      {
        id: 'log-b24-01',
        date: '1943-08-01',
        pilotName: '1st Lt. John Joseph',
        aircraftName: 'B-24D Strawberry Bitch',
        mission: 'Operation Tidal Wave - Ploesti Oil Refineries',
        duration: '9h 30m',
        logText: 'Long-range low-level strike against oil refineries in Ploesti, Romania. Flew at tree-top level to evade radar. Encountered intense light flak. Bomb bay doors damaged by ground fire. Returned with heavy fuel leakage.',
        status: 'Completed',
        location: 'Ploesti, Romania',
        airbase: 'Benghazi Airfield, Libya'
      }
    ]
  },
  {
    id: 'b25-mitchell',
    name: 'B-25J Mitchell',

    extraImages: [
      {
            'url': 'images/b25-mitchell_extra_0.jpg',
            'title': 'B-25J Mitchell in flight',
            'description': 'Historical action shot of the B-25J Mitchell captured during active aerial operations.',
            'label': 'FLIGHT'
      },
      {
            'url': 'images/b25-mitchell_extra_1.jpg',
            'title': 'B-25J Mitchell on tarmac',
            'description': 'Ground crew inspection and maintenance photograph of the B-25J Mitchell parked at an allied airbase.',
            'label': 'AIRFIELD'
      }
],    nickname: 'Apache Princess',
    country: 'United States',
    faction: 'allied',
    year: 1941,
    type: 'bomber',
    description: 'The North American B-25 Mitchell was a highly versatile twin-engine medium bomber, named in honor of aviation pioneer General Billy Mitchell. It achieved fame during the Doolittle Raid of 1942, taking off from aircraft carriers to bomb Tokyo. In the Pacific, the B-25 was modified with a solid nose carrying up to eight .50-caliber machine guns for devastating low-level strafing runs.',
    specs: {
      maxSpeed: '272 mph (438 km/h)',
      armament: '12-18 × .50 in (12.7 mm) Browning machine guns; up to 3,000 lbs of bombs',
      range: '1,350 miles (2,173 km) range',
      engine: '2 × Wright R-2600-92 Twin Cyclone radial engines (1,700 hp each)',
      wingspan: '67 ft 7 in (20.6 m)',
      emptyWeight: '19,480 lbs (8,836 kg)'
    },
    posterUrl: 'images/b25_poster_v3.jpg',
    posterVerified: true,
    posterSource: 'North American Aviation Photo Archive',
    noseArtUrl: 'images/b25_noseart_v2.jpg',
    noseArtName: 'Apache Princess',
    noseArtVerified: true,
    noseArtSource: 'AVG Veterans Memorial Archive',
    noseArtDescription: 'Featuring a detailed profile of a Native American princess, Apache Princess decorated the nose of the twin-engine bomber during low-altitude shipping sweeps in the Pacific.',
    cockpitUrl: 'images/b25_cockpit_v2.jpg',
    cockpitVerified: true,
    cockpitSource: 'Chino Plains Aviation Museum',
    wireframeMesh: b25Mesh,
    isTuskegee: false,
    pilotStories: [
      {
        id: 'jimmy-doolittle',
        name: 'James H. Doolittle',

    extraImages: [
      {
            'url': 'images/jimmy-doolittle_extra_0.jpg',
            'title': 'James H. Doolittle in flight',
            'description': 'Historical action shot of the James H. Doolittle captured during active aerial operations.',
            'label': 'FLIGHT'
      },
      {
            'url': 'images/jimmy-doolittle_extra_1.jpg',
            'title': 'James H. Doolittle on tarmac',
            'description': 'Ground crew inspection and maintenance photograph of the James H. Doolittle parked at an allied airbase.',
            'label': 'AIRFIELD'
      }
],        rank: 'Lieutenant Colonel',
        yearsOfService: '1917 - 1946',
        kills: 0,
        medals: ['Medal of Honor', 'Distinguished Service Medal'],
        isTuskegee: false,
        photoUrl: 'images/pilot_tex_hill.jpg',
        photoVerified: false,
        photoSource: 'USAAF Public Archives',
        quote: 'There is nothing stronger than the heart of a volunteer.',
        bio: 'Jimmy Doolittle was a pioneer of instrument flight and aeronautical engineering who famously planned and led the historic Doolittle Raid on Tokyo, launching B-25 bombers off the deck of the USS Hornet.'
      }
    ],
    flightLogs: [
      {
        id: 'log-b25-01',
        date: '1942-04-18',
        pilotName: 'Lt. Col. Jimmy Doolittle',
        aircraftName: 'B-25B Mitchell Special',
        mission: 'Doolittle Raid on Tokyo',
        duration: '5h 15m',
        logText: 'Scrambled early from aircraft carrier USS Hornet due to patrol boat detection. Took off under stormy sea conditions. Delivered bombs successfully over military targets in Tokyo. Extended flight towards China; crew bailed out safely after fuel exhaustion.',
        status: 'Completed',
        location: 'Tokyo, Japan',
        airbase: 'USS Hornet (CV-8) Flight Deck'
      }
    ]
  },
  {
    id: 'b29-superfortress',
    name: 'B-29A Superfortress',

    extraImages: [
      {
            'url': 'images/b29-superfortress_extra_0.jpg',
            'title': 'B-29A Superfortress in flight',
            'description': 'Historical action shot of the B-29A Superfortress captured during active aerial operations.',
            'label': 'FLIGHT'
      },
      {
            'url': 'images/b29-superfortress_extra_1.jpg',
            'title': 'B-29A Superfortress on tarmac',
            'description': 'Ground crew inspection and maintenance photograph of the B-29A Superfortress parked at an allied airbase.',
            'label': 'AIRFIELD'
      }
],    nickname: 'Enola Gay',
    country: 'United States',
    faction: 'allied',
    year: 1944,
    type: 'bomber',
    description: 'The Boeing B-29 Superfortress was the most technologically advanced heavy bomber of the war. It featured a fully pressurized crew cabin, dual-wheeled tricycle landing gear, and remote-controlled gun turrets. Capable of carrying up to 20,000 lbs of bombs at altitudes above 30,000 feet, it conducted the strategic air campaign against the Japanese mainland and dropped the atomic bombs on Hiroshima and Nagasaki.',
    specs: {
      maxSpeed: '357 mph (574 km/h)',
      armament: '10 × .50 in (12.7 mm) machine guns in remote turrets; 20,000 lbs of ordnance',
      range: '3,250 miles (5,230 km) combat range',
      engine: '4 × Wright R-3350-23 Duplex-Cyclone radial engines (2,200 hp each)',
      wingspan: '141 ft 3 in (43.1 m)',
      emptyWeight: '74,500 lbs (33,793 kg)'
    },
    posterUrl: 'images/b29_poster.jpg',
    posterVerified: true,
    posterSource: 'Boeing Flight Test Group (1944)',
    noseArtUrl: 'images/b29_noseart.jpg',
    noseArtName: 'Enola Gay Lettering',
    noseArtVerified: true,
    noseArtSource: 'National Air and Space Museum',
    noseArtDescription: 'The Enola Gay features clean, simple black hand-lettered text on the silver cockpit side, named in honor of pilot Paul Tibbets\' mother.',
    cockpitUrl: 'images/b29_cockpit.jpg',
    cockpitVerified: true,
    cockpitSource: 'Smithsonian Collection',
    wireframeMesh: b29Mesh,
    isTuskegee: false,
    pilotStories: [
      {
        id: 'paul-tibbets',
        name: 'Paul W. Tibbets Jr.',

    extraImages: [
      {
            'url': 'images/paul-tibbets_extra_0.jpg',
            'title': 'Paul W. Tibbets Jr. in flight',
            'description': 'Historical action shot of the Paul W. Tibbets Jr. captured during active aerial operations.',
            'label': 'FLIGHT'
      }
],        rank: 'Colonel',
        yearsOfService: '1937 - 1966',
        kills: 0,
        medals: ['Distinguished Service Cross', 'Distinguished Flying Cross'],
        isTuskegee: false,
        photoUrl: 'images/pilot_benjamin_o_davis.jpg',
        photoVerified: false,
        photoSource: 'USAAF Public Files',
        quote: 'I had been told that this was going to be a very dangerous mission, but I didn\'t hesitate.',
        bio: 'Colonel Paul Tibbets commanded the 509th Composite Group and piloted the B-29 Superfortress Enola Gay during the nuclear attack on Hiroshima, marking the dawn of the atomic age.'
      }
    ],
    flightLogs: [
      {
        id: 'log-b29-01',
        date: '1945-08-06',
        pilotName: 'Col. Paul Tibbets',
        aircraftName: 'B-29 Enola Gay',
        mission: 'Special Bomb Delivery Mission',
        duration: '12h 00m',
        logText: 'Long-range flight from Tinian Island. Released special ordnance at 0915 over Hiroshima. Shockwave felt at distance; airplane entered steep bank maneuver to clear the blast cloud. Flight returned safely to base.',
        status: 'Completed',
        location: 'Hiroshima, Japan',
        airbase: 'North Field, Tinian Island'
      }
    ]
  },
  {
    id: 'lancaster-bomber',
    name: 'Avro Lancaster B I',

    extraImages: [
      {
            'url': 'images/lancaster-bomber_extra_0.jpg',
            'title': 'Avro Lancaster B I in flight',
            'description': 'Historical action shot of the Avro Lancaster B I captured during active aerial operations.',
            'label': 'FLIGHT'
      },
      {
            'url': 'images/lancaster-bomber_extra_1.jpg',
            'title': 'Avro Lancaster B I on tarmac',
            'description': 'Ground crew inspection and maintenance photograph of the Avro Lancaster B I parked at an allied airbase.',
            'label': 'AIRFIELD'
      }
],    nickname: 'G for George',
    country: 'United Kingdom',
    faction: 'allied',
    year: 1942,
    type: 'bomber',
    description: 'The Avro Lancaster was the premier heavy bomber of the Royal Air Force. Its cavernous, unobstructed bomb bay allowed it to carry the heaviest bombs used by the Allies, including the 12,000 lb "Tallboy" and the massive 22,000 lb "Grand Slam" earthquake bombs. Powering this legendary aircraft were four Rolls-Royce Merlin engines, enabling nighttime precision strikes.',
    specs: {
      maxSpeed: '282 mph (454 km/h)',
      armament: '8 × .303 in (7.7 mm) Browning machine guns; up to 14,000 lbs (normal) or 22,000 lbs (special) bomb load',
      range: '2,530 miles (4,072 km) range',
      engine: '4 × Rolls-Royce Merlin XX V12 engines (1,280 hp each)',
      wingspan: '102 ft 0 in (31.1 m)',
      emptyWeight: '36,900 lbs (16,738 kg)'
    },
    posterUrl: 'images/lancaster_poster.jpg',
    posterVerified: true,
    posterSource: 'RAF Historical Branch (1943)',
    noseArtUrl: 'images/lancaster_noseart.jpg',
    noseArtName: 'G for George Devil',
    noseArtVerified: true,
    noseArtSource: 'Australian War Memorial',
    noseArtDescription: 'Features a cartoon red devil with wings holding a pitchfork and trailing fire, representing the spirit of the Lancaster crew during heavy nighttime bombing runs over the Ruhr Valley.',
    cockpitUrl: 'images/lancaster_cockpit.jpg',
    cockpitVerified: true,
    cockpitSource: 'RAF Museum London',
    wireframeMesh: lancasterMesh,
    isTuskegee: false,
    pilotStories: [
      {
        id: 'guy-gibson',
        name: 'Guy P. Gibson',

    extraImages: [
      {
            'url': 'images/guy-gibson_extra_0.jpg',
            'title': 'Guy P. Gibson in flight',
            'description': 'Historical action shot of the Guy P. Gibson captured during active aerial operations.',
            'label': 'FLIGHT'
      }
],        rank: 'Wing Commander',
        yearsOfService: '1936 - 1944',
        kills: 0,
        medals: ['Victoria Cross', 'Distinguished Service Order'],
        isTuskegee: false,
        photoUrl: 'images/pilot_douglas_bader.jpg',
        photoVerified: false,
        photoSource: 'Imperial War Museum',
        quote: 'The searchlights were blinding, but we had to stay straight and level at sixty feet for the bounce.',
        bio: 'Wing Commander Guy Gibson famously led the "Dambusters" of No. 617 Squadron on Operation Chastise, using modified Lancasters with bouncing bombs to destroy hydro-electric dams in Germany.'
      }
    ],
    flightLogs: [
      {
        id: 'log-lanc-01',
        date: '1943-05-16',
        pilotName: 'Wing Cmdr. Guy Gibson',
        aircraftName: 'Lancaster B III Special',
        mission: 'Operation Chastise - Moehne Dam Raid',
        duration: '6h 40m',
        logText: 'Led attack wave at extremely low altitude (60 feet). Navigated through dense flak. Dropped Upkeep bouncing bomb; direct hit resulted in breach of Moehne Dam. Co-piloted flight back under intense defensive fire from ground batteries.',
        status: 'Completed',
        location: 'Ruhr Valley, Germany',
        airbase: 'RAF Scampton, England'
      }
    ]
  },
  {
    id: 'mosquito-bomber',
    name: 'de Havilland Mosquito B Mk IV',

    extraImages: [
      {
            'url': 'images/mosquito-bomber_extra_0.jpg',
            'title': 'de Havilland Mosquito B Mk IV in flight',
            'description': 'Historical action shot of the de Havilland Mosquito B Mk IV captured during active aerial operations.',
            'label': 'FLIGHT'
      }
],    nickname: 'The Wooden Wonder',
    country: 'United Kingdom',
    faction: 'allied',
    year: 1941,
    type: 'bomber',
    description: 'The de Havilland Mosquito was a revolutionary fast bomber constructed almost entirely of spruce and birch plywood. It was completely unarmed, relying on its outstanding speed (which matched or exceeded most single-engine fighters of the early war) to outrun interceptors. It performed precision low-level day strikes and pathfinder missions.',
    specs: {
      maxSpeed: '380 mph (612 km/h)',
      armament: 'Unarmed (bomber version); up to 4,000 lbs of bombs',
      range: '1,500 miles (2,414 km) range',
      engine: '2 × Rolls-Royce Merlin 21/23 V12 engines (1,480 hp each)',
      wingspan: '54 ft 2 in (16.5 m)',
      emptyWeight: '14,300 lbs (6,486 kg)'
    },
    posterUrl: 'images/mosquito_poster.jpg',
    posterVerified: true,
    posterSource: 'De Havilland Aircraft Archive',
    noseArtUrl: 'images/mosquito_noseart.jpg',
    noseArtName: 'Wooden Wonder Text',
    noseArtVerified: true,
    noseArtSource: 'RAF Museum Cosford',
    noseArtDescription: 'Mosquitos typically flew with bare camouflage or basic squadron codes. A clean font lettering painted under the windshield designated it as "The Wooden Wonder".',
    cockpitUrl: 'images/mosquito_cockpit.jpg',
    cockpitVerified: true,
    cockpitSource: 'Imperial War Museum',
    wireframeMesh: mosquitoMesh,
    isTuskegee: false,
    pilotStories: [
      {
        id: 'charles-patterson',
        name: 'Charles Patterson',

    extraImages: [
      {
            'url': 'images/charles-patterson_extra_0.jpg',
            'title': 'Charles Patterson in flight',
            'description': 'Historical action shot of the Charles Patterson captured during active aerial operations.',
            'label': 'FLIGHT'
      },
      {
            'url': 'images/charles-patterson_extra_1.jpg',
            'title': 'Charles Patterson on tarmac',
            'description': 'Ground crew inspection and maintenance photograph of the Charles Patterson parked at an allied airbase.',
            'label': 'AIRFIELD'
      }
],        rank: 'Squadron Leader',
        yearsOfService: '1940 - 1945',
        kills: 0,
        medals: ['Distinguished Flying Cross'],
        isTuskegee: false,
        photoUrl: 'images/pilot_douglas_bader.jpg',
        photoVerified: false,
        photoSource: 'RAF Cosford Files',
        quote: 'Speed was our armor. If a Focke-Wulf showed up, we simply pushed the Merlins to combat power and left them behind.',
        bio: 'Squadron Leader Charles Patterson led low-altitude precision strikes against Gestapo headquarters and power stations throughout German-occupied Western Europe.'
      }
    ],
    flightLogs: [
      {
        id: 'log-mosq-01',
        date: '1944-02-18',
        pilotName: 'Sqn. Ldr. Charles Patterson',
        aircraftName: 'Mosquito B Mk IV',
        mission: 'Operation Jericho - Amiens Prison Raid',
        duration: '3h 10m',
        logText: 'Precision daylight low-altitude strike against Amiens prison. Released bombs at 100 feet to breach walls for French Resistance escape. Evaded light flak batteries by flying at tree-top level on egress.',
        status: 'Completed',
        location: 'Amiens, France',
        airbase: 'RAF Hunsdon, England'
      }
    ]
  },
  {
    id: 'halifax-bomber',
    name: 'Handley Page Halifax B III',

    extraImages: [
      {
            'url': 'images/halifax-bomber_extra_0.jpg',
            'title': 'Handley Page Halifax B III in flight',
            'description': 'Historical action shot of the Handley Page Halifax B III captured during active aerial operations.',
            'label': 'FLIGHT'
      },
      {
            'url': 'images/halifax-bomber_extra_1.jpg',
            'title': 'Handley Page Halifax B III on tarmac',
            'description': 'Ground crew inspection and maintenance photograph of the Handley Page Halifax B III parked at an allied airbase.',
            'label': 'AIRFIELD'
      }
],    nickname: 'Friday the 13th',
    country: 'United Kingdom',
    faction: 'allied',
    year: 1940,
    type: 'bomber',
    description: 'The Handley Page Halifax was the second of the RAF\'s four-engine heavy bombers to enter service. Serving as a crucial pillar of Bomber Command, it was highly versatile and was adapted for glider towing, electronic warfare, maritime patrol, and parachuting agents behind enemy lines.',
    specs: {
      maxSpeed: '282 mph (454 km/h)',
      armament: '9 × .303 in (7.7 mm) Browning machine guns; up to 13,000 lbs of bombs',
      range: '1,860 miles (2,993 km) range',
      engine: '4 × Bristol Hercules XVI radial engines (1,615 hp each)',
      wingspan: '104 ft 2 in (31.8 m)',
      emptyWeight: '37,875 lbs (17,180 kg)'
    },
    posterUrl: 'images/halifax_poster.jpg',
    posterVerified: true,
    posterSource: 'Handley Page Aircraft Co. Archive',
    noseArtUrl: 'images/halifax_noseart.jpg',
    noseArtName: 'Friday the 13th Grim Reaper',
    noseArtVerified: true,
    noseArtSource: 'Imperial War Museum',
    noseArtDescription: 'Features a grim reaper with a scythe standing next to yellow bombs marking the missions completed, painted on the nose fuselage.',
    cockpitUrl: 'images/halifax_cockpit.jpg',
    cockpitVerified: true,
    cockpitSource: 'Historical Flying Club York',
    wireframeMesh: halifaxMesh,
    isTuskegee: false,
    pilotStories: [
      {
        id: 'arthur-harris',
        name: 'Arthur T. Harris',
        rank: 'Air Chief Marshal',
        yearsOfService: '1918 - 1945',
        kills: 0,
        medals: ['Knight Grand Cross', 'Order of the Bath'],
        isTuskegee: false,
        photoUrl: 'images/pilot_douglas_bader.jpg',
        photoVerified: false,
        photoSource: 'Imperial War Museum Collection',
        quote: 'The Nazis entered this war under the childish delusion that they were going to bomb everyone else, and nobody was going to bomb them.',
        bio: 'Air Chief Marshal Sir Arthur "Bomber" Harris was the head of RAF Bomber Command, coordinating the strategic night bombardment campaign using Halifax and Lancaster bombers.'
      }
    ],
    flightLogs: [
      {
        id: 'log-hali-01',
        date: '1944-06-05',
        pilotName: 'Pilot Officer Arthur Harris',
        aircraftName: 'Halifax B III Friday the 13th',
        mission: 'D-Day Pre-invasion Coastal Bombardment',
        duration: '5h 45m',
        logText: 'Night raid against German gun batteries near Normandy. Flew through heavy clouds. Targets saturated under visual flare guidance. Flak was light. Returned to base safely.',
        status: 'Completed',
        location: 'Normandy, France',
        airbase: 'RAF Halesworth, England'
      }
    ]
  },
  {
    id: 'wellington-bomber',
    name: 'Vickers Wellington B Mk X',

    extraImages: [
      {
            'url': 'images/wellington-bomber_extra_0.jpg',
            'title': 'Vickers Wellington B Mk X in flight',
            'description': 'Historical action shot of the Vickers Wellington B Mk X captured during active aerial operations.',
            'label': 'FLIGHT'
      }
],    nickname: 'Wimpy',
    country: 'United Kingdom',
    faction: 'allied',
    year: 1938,
    type: 'bomber',
    description: 'The Vickers Wellington was a twin-engine medium bomber designed by Barnes Wallis using a highly unique geodesic lattice framework. This structure gave the aircraft extraordinary strength; it was able to survive direct shrapnel hits that would dismantle other aircraft, and was the mainstay of early RAF bombing raids.',
    specs: {
      maxSpeed: '235 mph (378 km/h)',
      armament: '8 × .303 in (7.7 mm) Browning machine guns; up to 4,500 lbs of bombs',
      range: '1,200 miles (1,931 km) range',
      engine: '2 × Bristol Hercules VI radial engines (1,500 hp each)',
      wingspan: '86 ft 2 in (26.3 m)',
      emptyWeight: '22,450 lbs (10,183 kg)'
    },
    posterUrl: 'images/wellington_poster.jpg',
    posterVerified: true,
    posterSource: 'Vickers Aviation Heritage Archive',
    noseArtUrl: 'images/wellington_noseart.jpg',
    noseArtName: 'Wimpy Cartoon character',
    noseArtVerified: true,
    noseArtSource: 'Brooklands Museum',
    noseArtDescription: 'Wellingtons often featured Popeye\'s burger-loving companion J. Wellington Wimpy, indicating the bomber\'s robust shape.',
    cockpitUrl: 'images/wellington_cockpit.jpg',
    cockpitVerified: true,
    cockpitSource: 'Brooklands Museum Collection',
    wireframeMesh: wellingtonMesh,
    isTuskegee: false,
    pilotStories: [
      {
        id: 'barnes-wallis',
        name: 'Barnes N. Wallis',

    extraImages: [
      {
            'url': 'images/barnes-wallis_extra_0.jpg',
            'title': 'Barnes N. Wallis in flight',
            'description': 'Historical action shot of the Barnes N. Wallis captured during active aerial operations.',
            'label': 'FLIGHT'
      },
      {
            'url': 'images/barnes-wallis_extra_1.jpg',
            'title': 'Barnes N. Wallis on tarmac',
            'description': 'Ground crew inspection and maintenance photograph of the Barnes N. Wallis parked at an allied airbase.',
            'label': 'AIRFIELD'
      }
],        rank: 'Chief Designer',
        yearsOfService: '1913 - 1970',
        kills: 0,
        medals: ['Knight Bachelor', 'Royal Medal'],
        isTuskegee: false,
        photoUrl: 'images/pilot_douglas_bader.jpg',
        photoVerified: false,
        photoSource: 'Brooklands Museum',
        quote: 'Structure is the key to endurance.',
        bio: 'Barnes Wallis was the genius British engineer who invented the geodesic structural design for the Wellington and later designed the Dambuster bouncing bomb.'
      }
    ],
    flightLogs: [
      {
        id: 'log-well-01',
        date: '1940-09-04',
        pilotName: 'Pilot Officer Barnes Wallis',
        aircraftName: 'Wellington Wimpy',
        mission: 'Early Night Strike on Wilhelmshaven Port',
        duration: '6h 15m',
        logText: 'Long-range night sortie targeting battleship docks. Heavy searchlight grid encountered. Caught fire in fuselage fabric, but geodesic duralumin lattice held together perfectly. Landed safely.',
        status: 'Completed',
        location: 'Wilhelmshaven, Germany',
        airbase: 'RAF Weybridge, England'
      }
    ]
  }

];
