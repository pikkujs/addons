import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GraphDeleteInput = z.object({
  node: z.string().describe("The node on which to operate"),
  edge: z.string().optional().describe("Edge of the node"),
})

export const GraphDeleteOutput = z.record(z.string(), z.unknown())

export const graphDelete = pikkuSessionlessFunc({
  description: "Delete a Graph API node or edge",
  input: GraphDeleteInput,
  output: GraphDeleteOutput,
  func: async ({ facebookGraphApi }, data) => {
    return facebookGraphApi.call("DELETE", "/{node}", data) as any
  },
})
