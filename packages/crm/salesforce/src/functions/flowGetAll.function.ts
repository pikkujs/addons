import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FlowGetAllInput = z.object({
  limit: z.number().int().optional(),
})

export const FlowGetAllOutput = z.record(z.string(), z.unknown())

export const flowGetAll = pikkuSessionlessFunc({
  description: "Get many flows",
  input: FlowGetAllInput,
  output: FlowGetAllOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("GET", "/actions/custom/flow", data) as any
  },
})
