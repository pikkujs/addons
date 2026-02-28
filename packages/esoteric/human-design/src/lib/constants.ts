import { Center } from "./types.js";

export const GATES = [
  41, 19, 13, 49, 30, 55, 37, 63, 22, 36, 25, 17, 21, 51, 42, 3, 27, 24, 2, 23, 8,
  20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56, 31, 33, 7, 4, 29, 59, 40, 64, 47, 6,
  46, 18, 48, 57, 32, 50, 28, 44, 1, 43, 14, 34, 9, 5, 26, 11, 10, 58, 38, 54, 61, 60
] as const;

export type Gate = typeof GATES[number]

export const RIGHT_ANGLE_CROSSES_BY_SUN_GATE: { [gate: number]: string } = {
  1: "the Sphinx 4",
  2: "the Sphinx 2",
  3: "Laws",
  4: "Explanation 3",
  5: "Consciousness 4",
  6: "Eden 3",
  7: "the Sphinx 3",
  8: "Contagion 2",
  9: "Planning 4",
  10: "the Vessel of Love 4",
  11: "Eden 4",
  12: "Eden 2",
  13: "the Sphinx",
  14: "Contagion 4",
  15: "the Vessel of Love 2",
  16: "Planning 2",
  17: "Service",
  18: "Service 3",
  19: "the Four Ways 4",
  20: "the Sleeping Phoenix 2",
  21: "Tension",
  22: "Rulership",
  23: "Explanation 2",
  24: "the Four Ways",
  25: "the Vessel of Love",
  26: "Rulership 4",
  27: "the Unexpected",
  28: "the Unexpected 3",
  29: "Contagion 3",
  30: "Contagion",
  31: "the Unexpected 2",
  32: "Maya 3",
  33: "the Four Ways 2",
  34: "the Sleeping Phoenix 4",
  35: "Consciousness 2",
  36: "Eden",
  37: "Planning",
  38: "Tension 4",
  39: "Tension 2",
  40: "Planning 3",
  41: "the Unexpected 4",
  42: "Maya",
  43: "Explanation 4",
  44: "the Four Ways 3",
  45: "Rulership 2",
  46: "the Vessel of Love 3",
  47: "Rulership 3",
  48: "Tension 3",
  49: "Explanation",
  50: "Laws 3",
  51: "Penetration 2",
  52: "Service 2",
  53: "Penetration 2",
  54: "Penetration 4",
  55: "the Sleeping Phoenix",
  56: "Laws 2",
  57: "Penetration 3",
  58: "Service 4",
  59: "the Sleeping Phoenix 3",
  60: "Laws 4",
  61: "Maya 4",
  62: "Maya 2",
  63: "Consciousness",
  64: "Consciousness 3",
};

export const JUXTAPOSITION_CROSSES_BY_SUN_GATE: { [gate: number]: string } = {
  1: "Self-Expression",
  2: "the Driver",
  3: "Mutation",
  4: "Formulization",
  5: "Habits",
  6: "Conflict",
  7: "Interaction",
  8: "Contribution",
  9: "Focus",
  10: "Behavior",
  11: "Ideas",
  12: "Articulation",
  13: "Listening",
  14: "Empowering",
  15: "Extremes",
  16: "Experimentation",
  17: "Opinions",
  18: "Correction",
  19: "Need",
  20: "the Now",
  21: "Control",
  22: "Grace",
  23: "Assimilation",
  24: "Rationalization",
  25: "Innocence",
  26: "the Trickster",
  27: "Caring",
  28: "Risks",
  29: "Commitment",
  30: "Fates",
  31: "Influence",
  32: "Conservation",
  33: "Retreat",
  34: "Power",
  35: "Experience",
  36: "Crisis",
  37: "Bargains",
  38: "Opposition",
  39: "Provocation",
  40: "Denial",
  41: "Fantasy",
  42: "Completion",
  43: "Insight",
  44: "Alertness",
  45: "Posession",
  46: "Serendipity",
  47: "Oppression",
  48: "Depth",
  49: "Principles",
  50: "Laws 3",
  51: "Penetration 2",
  52: "Service 2",
  53: "Penetration 2",
  54: "Penetration 4",
  55: "the Sleeping Phoenix",
  56: "Laws 2",
  57: "Penetration 3",
  58: "Service 4",
  59: "the Sleeping Phoenix 3",
  60: "Laws 4",
  61: "Maya 4",
  62: "Maya 2",
  63: "Consciousness",
  64: "Consciousness 3",
};

export const LEFT_ANGLE_CROSSES_BY_SUN_GATE: { [gate: number]: string } = {
  1: "Defiance 2",
  2: "Defiance",
  3: "Wishes",
  4: "Revolution 2",
  5: "Separation 2",
  6: "the Plane 2",
  7: "Masks 2",
  8: "Uncertainty",
  9: "Identification 2",
  10: "Prevention 2",
  11: "Education 2",
  12: "Education",
  13: "Masks",
  14: "Uncertainty 2",
  15: "Prevention",
  16: "Identification",
  17: "Upheaval",
  18: "Upheaval 2",
  19: "Refinement 2",
  20: "Duality",
  21: "Endeavour",
  22: "Informing",
  23: "Dedication",
  24: "Incarnation",
  25: "Healing",
  26: "Confrontation 2",
  27: "Alignment",
  28: "Alignment 2",
  29: "Industry 2",
  30: "Industry",
  31: "the Alpha",
  32: "Limitation 2",
  33: "Refinement",
  34: "Duality 2",
  35: "Separation",
  36: "the Plane",
  37: "Migration",
  38: "Individualism 2",
  39: "Individualism",
  40: "Migration 2",
  41: "the Alpha 2",
  42: "Limitation",
  43: "Dedication 2",
  44: "Incarnation 2",
  45: "Confrontation",
  46: "Healing 2",
  47: "Informing 2",
  48: "Endeavour 2",
  49: "Revolution",
  50: "Wishes 2",
  51: "the Clarion",
  52: "Demands",
  53: "Cycles",
  54: "Cycles 2",
  55: "Spirit",
  56: "Distraction",
  57: "the Clarion 2",
  58: "Demands 2",
  59: "Spirit 2",
  60: "Distraction 2",
  61: "Obscuration 2",
  62: "Obscuration",
  63: "Dominion",
  64: "Dominion 2",
};

export const CHANNELS_LIST: number[][] = [
  [61, 24],
  [43, 23],
  [20, 10],
  [20, 57],
  [20, 34],
  [12, 22],
  [8, 1],
  [10, 57],
  [10, 34],
  [25, 51],
  [2, 14],
  [57, 34],
  [28, 38],
  [55, 39],
  [3, 60],
  [45, 21],
  [26, 44],
  [40, 37],
  [50, 27],
  [6, 59],
  [32, 54],
  [49, 19],
  [64, 47],
  [63, 4],
  [17, 62],
  [11, 56],
  [16, 48],
  [35, 36],
  [31, 7],
  [33, 13],
  [15, 5],
  [46, 29],
  [18, 58],
  [42, 53],
  [9, 52],
  [30, 41],
] as const

export type Channel =
  | '61-24'
  | '43-23'
  | '20-10'
  | '20-57'
  | '20-34'
  | '12-22'
  | '8-1'
  | '10-57'
  | '10-34'
  | '25-51'
  | '2-14'
  | '57-34'
  | '28-38'
  | '55-39'
  | '3-60'
  | '45-21'
  | '26-44'
  | '40-37'
  | '50-27'
  | '6-59'
  | '32-54'
  | '49-19'
  | '64-47'
  | '63-4'
  | '17-62'
  | '11-56'
  | '16-48'
  | '35-36'
  | '31-7'
  | '33-13'
  | '15-5'
  | '46-29'
  | '18-58'
  | '42-53'
  | '9-52'
  | '30-41';

export type InnerAuthority =
  | "Solar Plexus"
  | "Sacral"
  | "Spleen"
  | "Ego"
  | "Self Projected"
  | "Outer Authority"
  | "Lunar";

export type Definition =
  | "Quad Split"
  | "Triple Split"
  | "Split"
  | "Single"
  | "None";

export const CELESTIAL_BODIES = ["sun", "earth", "northNode", "southNode", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"] as const
export const COGNITIONS = ['Smell', 'Taste', 'Outer Vision', 'Inner Vision', 'Feeling', 'Touch'] as const;
export const SENSES = ['Security', 'Uncertainty', 'Action', 'Meditation', 'Judgment', 'Acceptance'] as const;
export const MOTIVATIONS = ['Fear', 'Hope', 'Desire', 'Need', 'Guilt', 'Innocence'] as const;
export const VIEWS = ['Survival', 'Possibility', 'Power', 'Wanting', 'Probability', 'Personal'] as const;
export const ENVIRONMENTS = ['Caves', 'Markets', 'Kitchens', 'Mountains', 'Valleys', 'Shores'] as const;
export const DETERMINATIONS = ['Appetite', 'Taste', 'Thirst', 'Touch', 'Sound', 'Light'] as const;

export const centerNameMapping: Record<Center, string> = {
  head: "Head",
  ajna: "Ajna",
  throat: "Throat",
  ego: "Heart",
  gCenter: "Self",
  spleen: "Spleen",
  solarPlexus: "Solar Plexus",
  sacral: "Sacral",
  root: "Root"
};
