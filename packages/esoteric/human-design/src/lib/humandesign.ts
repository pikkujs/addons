
import { generateActivations } from "./activations.js";
import { getDesignDate } from "./astronomy/index.js";
import { getCelestialPositions } from "./astronomy/index.js";
import { getNatalBodyGraph } from "./bodygraph/bodygraph.js";
import { getTransitFromGates } from "./transit.js";
import { Bodygraph } from "./types.js";

export const getBodyGraph = async (birthDateUtc: Date): Promise<Bodygraph> => {
  const designDateUtc = await getDesignDate(birthDateUtc);
  if (!designDateUtc) {
    throw new Error("Design date is nil. Unable to find a design date.");
  }

  const celestialPositions = await getCelestialPositions(birthDateUtc);
  const designCelestialPositions = await getCelestialPositions(designDateUtc);

  const personalityActivations = generateActivations(celestialPositions);
  const designActivations = generateActivations(designCelestialPositions);

  const data = getNatalBodyGraph(personalityActivations, designActivations)
  const pseudoTransit = getTransitFromGates(data, [])

  return {
    ...data,
    transit: pseudoTransit,
    birthDateUtc,
    designDateUtc,
  }
};
