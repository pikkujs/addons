import { generateActivations } from "./activations.js";
import { getCelestialPositions } from "./astronomy/index.js";
import { BodygraphFromGates } from "./bodygraph/bodygraph-channels.js";
import { Channel, CHANNELS_LIST } from "./constants.js";
import { Transit, Activations, Bodygraph, Center, CelestialBody } from "./types.js";

// Process natal activations for both personality and design.
const processActivations = (transit: Transit, activations: Activations, type: 'personality' | 'design' | 'transit') => {
    for (const activation of Object.values(activations)) {
        if (activation.gate) {
            const gate = activation.gate;
            if (!transit.gates[gate]) {
                transit.gates[gate] = {}
            }
            transit.gates[gate][type] = activation.planet;
        }
    }
};

// Helper to check if a gate is natal (activated via personality or design)
const isNatal = (transit: Transit, gate: number): boolean => {
    const isNatal = transit.gates[gate] && (transit.gates[gate].personality || transit.gates[gate].design);
    return !!isNatal
};

export const getTransit = async (bodyGraph: Bodygraph, transitDateUtc: Date): Promise<Transit> => {
    const transitActivations = generateActivations(await getCelestialPositions(transitDateUtc));
    const transitGates = Object.values(transitActivations).map(({ gate }) => gate);
    const transit = getTransitFromGates(bodyGraph, transitGates, transitActivations);
    return {
        ...transit,
        transitDateUtc,
        activations: {
            ...transit.activations,
            transit: transitActivations,
        }
    }
}

export const getTransitFromGates =  (bodyGraph: Bodygraph, transitGates: number[], transitActivations?: Activations): Transit => {
    const transitFromGates = new BodygraphFromGates(new Set([...transitGates, ...bodyGraph.gates]));
    const transitCenters = transitFromGates.centers()

    const transit: Transit = {
        activations: {
            personality: bodyGraph.activations.personality,
            design: bodyGraph.activations.design,
        },
        centers: Object.keys(transitCenters).reduce((result, center) => {
            const natal = bodyGraph.centers[center as Center];
            const transit = transitCenters[center as Center] && !natal;
            result[center as Center] = { natal, transit };
            return result
        }, {} as Transit['centers']),
        gates: {},
        channels: {
            natal: [],
            transit: {}
        },
    };

    processActivations(transit, bodyGraph.activations.personality, 'personality');
    processActivations(transit, bodyGraph.activations.design, 'design');
    if (transitActivations) {
        processActivations(transit, transitActivations, 'transit');
    }

    const formatChannel = (channel: number[]) => {
        const sortedChannel = channel.sort((a, b) => a - b);
        return `${sortedChannel[0]}-${sortedChannel[1]}`;
    }

    const formatChannels = (channels: number[][]): Channel[] => {
        const formattedChannels = channels.map(channel => {
            const sortedChannel = channel.slice().sort((a, b) => a - b);
            return `${sortedChannel[0]}-${sortedChannel[1]}` as Channel;
        });
        return formattedChannels;
    };

    // Evaluate channels: a channel is activated if one gate is transit and its partner is natal.
    const transitChannels: Record<string, CelestialBody[]> = {};
    CHANNELS_LIST.forEach(channel => {
        if (channel.length !== 2) return;
        const [g1, g2] = channel;
        const planets: CelestialBody[] = []
        const gateOneCompleted = transit.gates[g1]?.transit && isNatal(transit, g2)
        if (gateOneCompleted) {
            planets.push(transit.gates[g1]?.transit! as CelestialBody)
        }
        const gateTwoCompleted = transit.gates[g2]?.transit && isNatal(transit, g1)
        if (gateTwoCompleted) {
            planets.push(transit.gates[g2]?.transit! as CelestialBody)
        }
        if (planets.length > 0) {
            transitChannels[formatChannel(channel)] = planets
        }
    });

    return {
        ...transit,
        channels: {
            natal: formatChannels(bodyGraph.channels),
            transit: transitChannels
        }
    };
};
