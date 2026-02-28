import { CELESTIAL_BODIES, Channel, COGNITIONS, DETERMINATIONS, ENVIRONMENTS, Gate, MOTIVATIONS, SENSES, VIEWS } from "./constants.js";

export type NotSelfTheme = 'Frustration' | 'Frustration and Anger' | 'Bitterness' | 'Anger' | 'Disappointment';
export type CelestialBody = typeof CELESTIAL_BODIES[number];
export type Cognition = typeof COGNITIONS[number];
export type Sense = typeof SENSES[number];
export type Motivation = typeof MOTIVATIONS[number];
export type Environment = typeof ENVIRONMENTS[number];
export type Determination = typeof DETERMINATIONS[number];
export type View = typeof VIEWS[number];

export interface Centers {
    head: boolean;
    ajna: boolean;
    throat: boolean;
    spleen: boolean;
    solarPlexus: boolean;
    gCenter: boolean;
    sacral: boolean;
    root: boolean;
    ego: boolean;
}
export type Center = keyof Centers

export interface Bodygraph {
    birthDate: string;
    birthTime: string;
    birthCountry: string;
    birthCity: string;
    timezone: string;
    birthDateUtc: Date;
    designDateUtc: Date;
    auraType?: AuraType;
    innerAuthority?: string;
    definition?: string;
    profile?: string;
    incarnationCross?: string;
    cognition?: Cognition;
    variables?: Variables;
    sense?: Sense;
    determination?: Determination;
    environment?: Environment;
    view?: View;
    motivation?: Motivation;
    personalityNodesTone?: any;
    designNodesTone?: any;
    gates: number[];
    channels: number[][];
    activations: {
        personality: Activations;
        design: Activations;
    }
    centers: Centers;
    notSelfTheme: NotSelfTheme;
    transit: Transit
}

export interface CelestialPositions {
    sun: number;
    northNode: number;
    moon: number;
    mercury: number;
    venus: number;
    mars: number;
    jupiter: number;
    saturn: number;
    uranus: number;
    neptune: number;
    pluto: number;
}

export interface ActivationResult {
    planet: string
    gate: Gate;
    line: number;
    exactLine: number;
}

export type Activations = Record<CelestialBody, ActivationResult>

export interface Transit {
    transitDateUtc?: Date;
    activations: {
        design: Activations;
        personality: Activations;
        transit?: Activations;
    };
    centers: Record<Center, {
        natal: boolean,
        transit: boolean
    }>
    gates: {
        [gateNumber: number]: Partial<{ personality: string; design: string; transit: string }>;
    };
    channels: {
        natal: Channel[];  // all channels defined in the natal bodygraph
        transit: Partial<Record<Channel, CelestialBody[]>>;  // channels activated by transit events
    };
}

export type GetTransitForDateOutput = {
    bodyGraph: Bodygraph, transit: Transit
}

export enum AuraType {
    Generator = "Generator",
    ManifestingGenerator = "Manifesting Generator",
    Projector = "Projector",
    Manifestor = "Manifestor",
    Reflector = "Reflector"
}

export type Variables =
    | 'PLL DLL'
    | 'PLL DLR'
    | 'PLL DRL'
    | 'PLL DRR'
    | 'PLR DLL'
    | 'PLR DLR'
    | 'PLR DRL'
    | 'PLR DRR'
    | 'PRL DLL'
    | 'PRL DLR'
    | 'PRL DRL'
    | 'PRL DRR'
    | 'PRR DLL'
    | 'PRR DLR'
    | 'PRR DRL'
    | 'PRR DRR';
