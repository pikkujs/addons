import { Activations, Bodygraph } from "../types.js";
import { BodygraphFromActivations } from "./bodygraph-activations.js";
import { BodygraphFromGates } from "./bodygraph-channels.js";

export const getBodygraph = (gates: Set<number>) => {
  const fromGates = new BodygraphFromGates(gates);
  return {
    centers: fromGates.centers(),
    auraType: fromGates.auraType(),
    innerAuthority: fromGates.innerAuthority(),
    definition: fromGates.definition(),
    channels: fromGates.channels(),
    notSelfTheme: fromGates.notSelfTheme(),
  }
}

export const getNatalBodyGraph = (personalityActivations: Activations, designActivations: Activations) => {
  const bodygraph: Bodygraph = {
    activations: {
      personality: personalityActivations,
      design: designActivations,
    }
  } as Bodygraph;

  const fromActivations = new BodygraphFromActivations(personalityActivations, designActivations);
  bodygraph.profile = `${personalityActivations.sun.line}/${designActivations.sun.line}`;
  bodygraph.incarnationCross = fromActivations.incarnationCross();
  bodygraph.cognition = fromActivations.cognition();
  bodygraph.sense = fromActivations.sense();
  bodygraph.variables = fromActivations.variables();
  bodygraph.determination = fromActivations.determination();
  bodygraph.environment = fromActivations.environment();
  bodygraph.view = fromActivations.view();
  bodygraph.motivation = fromActivations.motivation();
  bodygraph.personalityNodesTone = fromActivations.personalityNodesTone();
  bodygraph.designNodesTone = fromActivations.designNodesTone();
  bodygraph.gates = [...fromActivations.allActivatedGates()]

  return {
    ...bodygraph,
    ...getBodygraph(fromActivations.allActivatedGates())
  };
}
