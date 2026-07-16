import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FlowInvokeInput = z.object({
  flowName: z.string(),
  inputs: z.record(z.string(), z.unknown()).optional(),
})

export const FlowInvokeOutput = z.record(z.string(), z.unknown())

export const flowInvoke = pikkuSessionlessFunc({
  description: "Invoke flow",
  input: FlowInvokeInput,
  output: FlowInvokeOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("POST", "/actions/custom/flow/{flowName}", data) as any
  },
})
