import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GraphPostInput = z.object({
  node: z.string().describe("The node on which to operate, e.g. me"),
  edge: z.string().optional().describe("Edge of the node, e.g. feed"),
  message: z.string().optional(),
  link: z.string().optional(),
})

export const GraphPostOutput = z.record(z.string(), z.unknown())

export const graphPost = pikkuSessionlessFunc({
  description: "Create or publish to a Graph API node or edge",
  input: GraphPostInput,
  output: GraphPostOutput,
  func: async ({ facebookGraphApi }, data) => {
    return facebookGraphApi.call("POST", "/{node}", data) as any
  },
})
