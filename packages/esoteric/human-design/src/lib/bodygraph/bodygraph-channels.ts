import { CHANNELS_LIST, InnerAuthority, Definition } from "../constants.js";
import { AuraType, Centers, NotSelfTheme } from "../types.js";

// Helper function to union two string arrays (removing duplicates)
function unionArrays(arr1: string[], arr2: string[]): string[] {
    return Array.from(new Set([...arr1, ...arr2]));
}

export class BodygraphFromGates {
    constructor(private activatedGates: Set<number>) {

    }

    public centers(): Centers {
        return {
            head: this.headDefined(),
            ajna: this.ajnaDefined(),
            throat: this.throatDefined(),
            spleen: this.spleenDefined(),
            solarPlexus: this.solarPlexusDefined(),
            gCenter: this.gCenterDefined(),
            sacral: this.sacralDefined(),
            root: this.rootDefined(),
            ego: this.egoDefined(),
        }
    }

    public auraType(): AuraType {
        if (this.sacralDefined()) {
            return this.motorToThroat() ? AuraType.ManifestingGenerator : AuraType.Generator;
        } else if (this.motorToThroat()) {
            return AuraType.Manifestor;
        } else if (this.noCentersDefined()) {
            return AuraType.Reflector;
        } else {
            return AuraType.Projector;
        }
    }

    public innerAuthority(): InnerAuthority {
        if (this.solarPlexusDefined()) {
            return "Solar Plexus";
        } else if (this.sacralDefined()) {
            return "Sacral";
        } else if (this.spleenDefined()) {
            return "Spleen";
        } else if (this.egoToThroat() || this.gToEgo()) {
            return "Ego";
        } else if (this.gToThroat()) {
            return "Self Projected";
        } else if (this.headToAjna() || this.ajnaToThroat()) {
            return "Outer Authority";
        } else {
            return "Lunar";
        }
    }

    public definition(): Definition {
        // Initialize areas of definition as arrays of center names.
        const areas: { [key: number]: string[] } = { 1: [], 2: [], 3: [], 4: [] };

        for (const channel of this.channels()) {
            const centers = this.getCentersByChannel(channel);
            // If area 1 is empty or any center in 'centers' is already in area 1.
            if (areas[1].length === 0 || centers.some((c) => areas[1].includes(c))) {
                areas[1] = unionArrays(areas[1], centers);
                if (
                    centers.some((c) => areas[1].includes(c)) &&
                    centers.some((c) => areas[2].includes(c))
                ) {
                    areas[1] = unionArrays(areas[1], areas[2]);
                    areas[2] = [];
                    areas[1] = unionArrays(areas[1], centers);
                }
            } else if (
                centers.some((c) => areas[1].includes(c)) &&
                centers.some((c) => areas[2].includes(c))
            ) {
                areas[1] = unionArrays(areas[1], areas[2]);
                areas[2] = [];
                areas[1] = unionArrays(areas[1], centers);
            } else if (areas[2].length === 0 || centers.some((c) => areas[2].includes(c))) {
                areas[2] = unionArrays(areas[2], centers);
            } else if (
                centers.some((c) => areas[1].includes(c)) &&
                centers.some((c) => areas[3].includes(c))
            ) {
                areas[1] = unionArrays(areas[1], areas[3]);
                areas[3] = [];
                areas[1] = unionArrays(areas[1], centers);
            } else if (
                centers.some((c) => areas[2].includes(c)) &&
                centers.some((c) => areas[3].includes(c))
            ) {
                areas[2] = unionArrays(areas[2], areas[3]);
                areas[3] = [];
                areas[2] = unionArrays(areas[2], centers);
            } else if (areas[3].length === 0 || centers.some((c) => areas[3].includes(c))) {
                areas[3] = unionArrays(areas[3], centers);
            } else if (
                centers.some((c) => areas[1].includes(c)) &&
                centers.some((c) => areas[4].includes(c))
            ) {
                areas[1] = unionArrays(areas[1], areas[4]);
                areas[4] = [];
                areas[1] = unionArrays(areas[1], centers);
            } else if (
                centers.some((c) => areas[2].includes(c)) &&
                centers.some((c) => areas[4].includes(c))
            ) {
                areas[2] = unionArrays(areas[2], areas[4]);
                areas[4] = [];
                areas[2] = unionArrays(areas[2], centers);
            } else if (
                centers.some((c) => areas[3].includes(c)) &&
                centers.some((c) => areas[4].includes(c))
            ) {
                areas[3] = unionArrays(areas[3], areas[4]);
                areas[4] = [];
                areas[3] = unionArrays(areas[3], centers);
            } else if (areas[4].length === 0 || centers.some((c) => areas[4].includes(c))) {
                areas[4] = unionArrays(areas[4], centers);
            }
        }

        if (areas[4].length > 0) {
            return "Quad Split";
        } else if (areas[3].length > 0) {
            return "Triple Split";
        } else if (areas[2].length > 0) {
            return "Split";
        } else if (areas[1].length > 0) {
            return "Single";
        } else {
            return "None";
        }
    }

    public gateActivated(gate: number): boolean {
        return this.activatedGates.has(gate);
    }

    public sacralDefined(): boolean {
        return this.sacralChannels().some((channel) => this.channelActivated(channel));
    }

    public throatDefined(): boolean {
        return this.throatChannels().some((channel) => this.channelActivated(channel));
    }

    public egoDefined(): boolean {
        return this.egoChannels().some((channel) => this.channelActivated(channel));
    }

    public rootDefined(): boolean {
        return this.rootChannels().some((channel) => this.channelActivated(channel));
    }

    public spleenDefined(): boolean {
        return this.spleenChannels().some((channel) => this.channelActivated(channel));
    }

    public solarPlexusDefined(): boolean {
        return this.solarPlexusChannels().some((channel) => this.channelActivated(channel));
    }

    public gCenterDefined(): boolean {
        return this.gCenterChannels().some((channel) => this.channelActivated(channel));
    }

    public headDefined(): boolean {
        return this.headChannels().some((channel) => this.channelActivated(channel));
    }

    public ajnaDefined(): boolean {
        return this.ajnaChannels().some((channel) => this.channelActivated(channel));
    }

    public channelActivated(channel: number[]): boolean {
        return this.gateActivated(channel[0]) && this.gateActivated(channel[1]);
    }

    // Returns the list of channels (as pairs) that are activated.
    public channels(): number[][] {
        return CHANNELS_LIST.filter(
            (channel) => this.gateActivated(channel[0]) && this.gateActivated(channel[1])
        );
    }

    public noCentersDefined(): boolean {
        return this.channels().length === 0;
    }

    // -- Channel Sets --

    public sacralChannels(): number[][] {
        return [
            [2, 14],
            [5, 15],
            [29, 46],
            [6, 59],
            [9, 52],
            [3, 60],
            [42, 53],
            [34, 10],
            [34, 57],
            [34, 20],
            [50, 27],
        ];
    }

    public throatChannels(): number[][] {
        return [
            [16, 48],
            [17, 62],
            [43, 23],
            [11, 56],
            [35, 36],
            [12, 22],
            [45, 21],
            [13, 33],
            [1, 8],
            [7, 31],
            [57, 20],
            [10, 20],
            [34, 20],
        ];
    }

    public egoChannels(): number[][] {
        return [
            [25, 51],
            [26, 44],
            [21, 45],
            [40, 37],
        ];
    }

    public rootChannels(): number[][] {
        return [
            [18, 58],
            [28, 38],
            [54, 32],
            [53, 42],
            [60, 3],
            [9, 52],
            [19, 49],
            [39, 55],
            [41, 30],
        ];
    }

    public spleenChannels(): number[][] {
        return [
            [18, 58],
            [28, 38],
            [54, 32],
            [50, 27],
            [44, 26],
            [57, 10],
            [57, 34],
            [57, 20],
            [48, 16],
        ];
    }

    public solarPlexusChannels(): number[][] {
        return [
            [6, 59],
            [37, 40],
            [36, 35],
            [12, 22],
            [19, 49],
            [39, 55],
            [41, 30],
        ];
    }

    public gCenterChannels(): number[][] {
        return [
            [15, 5],
            [2, 14],
            [29, 46],
            [25, 51],
            [13, 33],
            [7, 31],
            [1, 8],
            [10, 57],
            [10, 34],
            [10, 20],
        ];
    }

    public headChannels(): number[][] {
        return [
            [64, 47],
            [61, 24],
            [63, 4],
        ];
    }

    public ajnaChannels(): number[][] {
        return [
            [64, 47],
            [61, 24],
            [63, 4],
            [17, 62],
            [43, 23],
            [11, 56],
        ];
    }

    // -- Relationship Methods between Centers --

    public sacralToThroat(): boolean {
        return this.gateActivated(34) && this.gateActivated(20);
    }

    public egoToThroat(): boolean {
        return this.gateActivated(45) && this.gateActivated(21);
    }

    public solarPlexusToThroat(): boolean {
        return (
            (this.gateActivated(12) && this.gateActivated(22)) ||
            (this.gateActivated(35) && this.gateActivated(36))
        );
    }

    public gToThroat(): boolean {
        const pairs = [
            [13, 33],
            [1, 8],
            [7, 31],
            [10, 20],
        ];
        return pairs.some((pair) => pair.every((gate) => this.gateActivated(gate)));
    }

    public gToEgo(): boolean {
        return this.gateActivated(51) && this.gateActivated(25);
    }

    public gToSpleen(): boolean {
        return this.gateActivated(10) && this.gateActivated(57);
    }

    public gToSacral(): boolean {
        const pairs = [
            [15, 5],
            [2, 14],
            [46, 29],
        ];
        return pairs.some((pair) => pair.every((gate) => this.gateActivated(gate)));
    }

    public spleenToThroat(): boolean {
        return (
            (this.gateActivated(16) && this.gateActivated(48)) ||
            (this.gateActivated(57) && this.gateActivated(20))
        );
    }

    public spleenToRoot(): boolean {
        const pairs = [
            [54, 32],
            [28, 38],
            [18, 58],
        ];
        return pairs.some((pair) => pair.every((gate) => this.gateActivated(gate)));
    }

    public spleenToEgo(): boolean {
        return this.gateActivated(44) && this.gateActivated(26);
    }

    public headToAjna(): boolean {
        const pairs = [
            [64, 47],
            [61, 24],
            [63, 4],
        ];
        return pairs.some((pair) => pair.every((gate) => this.gateActivated(gate)));
    }

    public ajnaToThroat(): boolean {
        const pairs = [
            [17, 62],
            [43, 23],
            [11, 56],
        ];
        return pairs.some((pair) => pair.every((gate) => this.gateActivated(gate)));
    }

    public motorToThroat(): boolean {
        if (
            this.throatDefined() &&
            (this.sacralToThroat() ||
                this.egoToThroat() ||
                this.solarPlexusToThroat() ||
                (this.gToThroat() && this.gToEgo()) ||
                (this.gToThroat() && this.gToSpleen() && this.spleenToRoot()) ||
                (this.gToThroat() && this.gToSacral()) ||
                (this.spleenToThroat() && this.spleenToRoot()) ||
                (this.spleenToThroat() && this.spleenToEgo()))
        ) {
            return true;
        }
        return false;
    }

    public notSelfTheme(): NotSelfTheme {
        const type = this.auraType();
        switch (type) {
            case AuraType.Generator:
                return 'Frustration'
            case AuraType.ManifestingGenerator:
                return 'Frustration and Anger'
            case AuraType.Projector:
                return 'Bitterness'
            case AuraType.Manifestor:
                return 'Anger'
            case AuraType.Reflector:
                return 'Disappointment'
            default:
                throw new Error(`Unknown aura type: ${type}`);
        }
    }

    // -- Helper to get centers for a given channel pair --
    private getCentersByChannel(channel: number[]): string[] {
        const CENTERS_BY_CHANNEL: { [key: string]: string[] } = {
            "61,24": ["Head", "Ajna"],
            "43,23": ["Ajna", "Throat"],
            "20,10": ["Throat", "G Center"],
            "20,57": ["Throat", "Spleen"],
            "20,34": ["Throat", "Sacral"],
            "12,22": ["Throat", "Solar Plexus"],
            "8,1": ["Throat", "G Center"],
            "10,57": ["G Center", "Spleen"],
            "10,34": ["G Center", "Sacral"],
            "25,51": ["G Center", "Ego"],
            "2,14": ["G Center", "Sacral"],
            "57,34": ["Spleen", "Sacral"],
            "28,38": ["Spleen", "Root"],
            "55,39": ["Solar Plexus", "Root"],
            "3,60": ["Sacral", "Root"],
            "45,21": ["Throat", "Ego"],
            "26,44": ["Ego", "Spleen"],
            "40,37": ["Ego", "Solar Plexus"],
            "50,27": ["Spleen", "Sacral"],
            "6,59": ["Solar Plexus", "Sacral"],
            "32,54": ["Spleen", "Root"],
            "49,19": ["Solar Plexus", "Root"],
            "64,47": ["Head", "Ajna"],
            "63,4": ["Head", "Ajna"],
            "17,62": ["Ajna", "Throat"],
            "11,56": ["Ajna", "Throat"],
            "16,48": ["Throat", "Spleen"],
            "35,36": ["Throat", "Solar Plexus"],
            "31,7": ["Throat", "G Center"],
            "33,13": ["Throat", "G Center"],
            "15,5": ["G Center", "Sacral"],
            "46,29": ["G Center", "Sacral"],
            "18,58": ["Spleen", "Root"],
            "42,53": ["Sacral", "Root"],
            "9,52": ["Sacral", "Root"],
            "30,41": ["Solar Plexus", "Root"]
        };

        const key = channel.join(",");
        return CENTERS_BY_CHANNEL[key] || [];
    }
}
