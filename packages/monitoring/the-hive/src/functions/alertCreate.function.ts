import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AlertCreateInput = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  type: z.string().optional(),
  source: z.string().optional(),
  sourceRef: z.string().optional(),
  severity: z.number().optional(),
  tlp: z.number().optional(),
})

export const AlertCreateOutput = z.record(z.string(), z.unknown())

export const alertCreate = pikkuSessionlessFunc({
  description: "Create an alert",
  input: AlertCreateInput,
  output: AlertCreateOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("POST", "/alert", data) as any
  },
})
