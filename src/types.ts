/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FighterSpecs {
  maxSpeed: string;
  armament: string;
  range: string;
  engine: string;
  wingspan: string;
  emptyWeight: string;
}

export interface PilotStory {
  id: string;
  name: string;
  rank: string;
  yearsOfService: string;
  kills: number;
  medals: string[];
  bio: string;
  quote: string;
  isTuskegee: boolean;
  photoUrl: string;
  photoVerified?: boolean;
  photoSource?: string;
  combatHours?: number;
  combatMissions?: number;
  squadronRank?: string;
  squadronName?: string;
  baseOfOperations?: string;
  specialCommendation?: string;
  extraImages?: ExtraImage[];
}

export interface FlightLog {
  id: string;
  date: string;
  pilotName: string;
  aircraftName: string;
  mission: string;
  duration: string;
  logText: string;
  status: 'Completed' | 'Aborted' | 'Engaged';
  location: string;
  airbase: string;
}

// 3D Wireframe coordinate definitions for Canvas drawing
export interface WireframeMesh {
  vertices: [number, number, number][]; // [x, y, z] coordinates
  faces: number[][]; // indexes in vertices array
}

export interface FighterAircraft {
  id: string;
  name: string;
  nickname: string;
  country: string;
  faction: 'allied' | 'axis';
  year: number;
  description: string;
  specs: FighterSpecs;
  pilotStories: PilotStory[];
  flightLogs: FlightLog[];
  isTuskegee: boolean;
  posterUrl: string;
  posterVerified?: boolean;
  posterSource?: string;
  noseArtUrl: string;
  noseArtName: string;
  noseArtVerified?: boolean;
  noseArtSource?: string;
  noseArtDescription?: string;
  cockpitUrl: string;
  cockpitVerified?: boolean;
  cockpitSource?: string;
  wireframeMesh: WireframeMesh;
  type?: 'fighter' | 'bomber';
  extraImages?: ExtraImage[];
}

export interface ExtraImage {
  url: string;
  title: string;
  description: string;
  label: string;
}

// User's virtual hangar item
export interface VirtualAircraft {
  id: string;
  aircraftId: string; // references FighterAircraft.id
  customName: string;
  noseArtChoice: string; // custom nose art tag
  fuelLevel: number; // 0 - 100
  ammoLevel: number; // 0 - 100
  condition: number; // 0 - 100 (maintenance)
  flightHours: number;
  assignedPilotId: string; // references PilotStory.id or 'unassigned'
  status: 'Hangar' | 'Ready' | 'In Maintenance' | 'Patrol';
  lastServiced: string;
}
