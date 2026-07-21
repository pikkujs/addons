import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PerformInput = z.object({
  processor: z.string().describe("The uProc tool key in dashed lowercase form, e.g. check-email-exists"),
  params: z.record(z.string(), z.unknown()).optional().describe("Key/value parameters required by the selected processor"),
  callback: z.object({
  data: z.string().optional().describe("URL to receive the tool response once resolved"),
}).optional().describe("Optional webhook callback configuration"),
})

export const PerformOutput = z.object({
  message: z.record(z.string(), z.unknown()).optional(),
})

export const perform = pikkuSessionlessFunc({
  description: "Executes a uProc processor (tool). Set processor to the tool key and supply its parameters in params.",
  input: PerformInput,
  output: PerformOutput,
  func: async ({ uproc }, data) => {
    return uproc.call("POST", "/process", data) as any
  },
})
