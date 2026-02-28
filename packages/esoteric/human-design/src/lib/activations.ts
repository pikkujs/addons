import { Gate, GATES } from "./constants.js";
import { CelestialPositions, ActivationResult, Activations } from "./types.js";

const oppositeGate = (gate: Gate): Gate => {
    const index = GATES.indexOf(gate);
    const oppositeIndex = (index + 32) % GATES.length;
    return GATES[oppositeIndex];
};

// Adjusts the celestial position and calculates the corresponding gate, line, and color.
const activation = (celestialPositions: CelestialPositions, planet: keyof CelestialPositions): ActivationResult => {
    const celestialPosition = celestialPositions[planet];
    let adjustedPosition = celestialPosition + 58;
    if (adjustedPosition > 360) {
        adjustedPosition -= 360;
    }
    const percentageThrough = adjustedPosition / 360;

    // Gate
    const gateIndex = Math.floor(percentageThrough * 64);
    const gate = GATES[gateIndex];

    // Line
    const exactLine = 384 * percentageThrough;
    const line = Math.floor(exactLine % 6) + 1;

    return { gate, line, exactLine, planet };
};

export const generateActivations = (celestialPositions: CelestialPositions): Activations => {
    const sunActivation = activation(celestialPositions, 'sun');
    const northNodeActivation = activation(celestialPositions, 'northNode');
    const moonActivation = activation(celestialPositions, 'moon');
    const mercuryActivation = activation(celestialPositions,'mercury');
    const venusActivation = activation(celestialPositions,'venus');
    const marsActivation = activation(celestialPositions,'mars');
    const jupiterActivation = activation(celestialPositions,'jupiter');
    const saturnActivation = activation(celestialPositions,'saturn');
    const uranusActivation = activation(celestialPositions,'uranus');
    const neptuneActivation = activation(celestialPositions,'neptune');
    const plutoActivation = activation(celestialPositions,'pluto');

    return {
        sun: sunActivation,
        earth: {
            gate: oppositeGate(sunActivation.gate),
            exactLine: sunActivation.exactLine,
            line: sunActivation.line,
            planet: 'earth'
        },
        northNode: northNodeActivation,
        southNode: {
            gate: oppositeGate(northNodeActivation.gate),
            exactLine: northNodeActivation.exactLine,
            line: northNodeActivation.line,
            planet: 'southNode'
        },
        moon: moonActivation,
        mercury: mercuryActivation,
        venus: venusActivation,
        mars: marsActivation,
        jupiter: jupiterActivation,
        saturn: saturnActivation,
        uranus: uranusActivation,
        neptune: neptuneActivation,
        pluto: plutoActivation
    };
};
