import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GraphGetInput = z.object({
  node: z.string().describe("The node on which to operate, e.g. me"),
  edge: z.string().optional().describe("Edge of the node, e.g. videos"),
  fields: z.string().optional().describe("Comma separated list of fields to request"),
})

export const GraphGetOutput = z.record(z.string(), z.unknown())

export const graphGet = pikkuSessionlessFunc({
  description: "Read a Graph API node or edge",
  input: GraphGetInput,
  output: GraphGetOutput,
  func: async ({ facebookGraphApi }, data) => {
    return facebookGraphApi.call("GET", "/{node}", data) as any
  },
})
