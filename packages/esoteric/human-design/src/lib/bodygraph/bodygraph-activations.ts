import { CELESTIAL_BODIES, COGNITIONS, DETERMINATIONS, ENVIRONMENTS, JUXTAPOSITION_CROSSES_BY_SUN_GATE, LEFT_ANGLE_CROSSES_BY_SUN_GATE, MOTIVATIONS, RIGHT_ANGLE_CROSSES_BY_SUN_GATE, SENSES, VIEWS } from "../constants.js";
import { Activations, Cognition, Determination, Environment, Motivation, Sense, Variables, View } from "../types.js";

export class BodygraphFromActivations {
    constructor(private personalityActivations: Activations, private designActivations: Activations) {
    }

    // Returns an object whose keys (the activated gate numbers) are true.
    public allActivatedGates(): Set<number> {
        const activated = new Set<number>()
        for (const body of CELESTIAL_BODIES) {
            activated.add(this.personalityActivations[body].gate)
            activated.add(this.designActivations[body].gate)
        }
        return activated;
    }

    public incarnationCross(): string {
        if (
            this.personalityActivations.sun.line < 5 &&
            this.designActivations.sun.line >= 3
        ) {
            return (
                "Right Angle Cross of " +
                RIGHT_ANGLE_CROSSES_BY_SUN_GATE[
                this.personalityActivations.sun.gate
                ]
            );
        } else if (this.personalityActivations.sun.line >= 5) {
            return (
                "Left Angle Cross of " +
                LEFT_ANGLE_CROSSES_BY_SUN_GATE[
                this.personalityActivations.sun.gate
                ]
            );
        } else {
            return (
                "Juxtaposition Cross of " +
                JUXTAPOSITION_CROSSES_BY_SUN_GATE[
                this.personalityActivations.sun.gate
                ]
            );
        }
    }

    public determination(): Determination {
        const value = Math.floor((this.designActivations.sun.exactLine % 1) / (1 / 6));
        return DETERMINATIONS[value];
    }

    public environment(): Environment {
        const value = Math.floor(
            (this.designActivations.northNode.exactLine % 1) / (1 / 6)
        );
        return ENVIRONMENTS[value];
    }

    public view(): View {
        const value = Math.floor(
            (this.personalityActivations.northNode.exactLine % 1) / (1 / 6)
        );
        return VIEWS[value];
    }

    public motivation(): Motivation {
        const value = Math.floor((this.personalityActivations.sun.exactLine % 1) / (1 / 6));
        return MOTIVATIONS[value];
    }

    public cognition(): Cognition {
        // Extract the fractional part scaled to 0–6 and then its fractional part
        const colorValue =
            (((this.designActivations.sun.exactLine % 1) / (1 / 6)) % 1) / (1 / 6);
        return COGNITIONS[Math.floor(colorValue)];
    }

    public sense(): Sense {
        const colorValue =
            (((this.personalityActivations.sun.exactLine % 1) / (1 / 6)) % 1) / (1 / 6);
        const index = Math.floor(colorValue);
        return SENSES[index];
    }

    public designNodesTone(): number {
        return Math.floor(
            (this.designActivations.northNode.exactLine % 1) / (1 / 6)
        ) + 1;
    }

    public personalityNodesTone(): number {
        return Math.floor(
            (this.personalityActivations.northNode.exactLine % 1) / (1 / 6)
        ) + 1;
    }

    public variables(): Variables {
        const pSunLine = this.personalityActivations.sun.exactLine;
        const pNorthLine = this.personalityActivations.northNode.exactLine;
        const dSunLine = this.designActivations.sun.exactLine;
        const dNorthLine = this.designActivations.northNode.exactLine;
        let variable = "P";
        variable += (pSunLine % (1 / 6)) * 6 < 0.5 ? "L" : "R";
        variable += (pNorthLine % (1 / 6)) * 6 < 0.5 ? "L" : "R";
        variable += " D";
        variable += (dSunLine % (1 / 6)) * 6 < 0.5 ? "L" : "R";
        variable += (dNorthLine % (1 / 6)) * 6 < 0.5 ? "L" : "R";
        return variable as Variables;
    }
}
