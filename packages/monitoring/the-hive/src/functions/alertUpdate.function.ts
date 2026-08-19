import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AlertUpdateInput = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  severity: z.number().optional(),
})

export const AlertUpdateOutput = z.record(z.string(), z.unknown())

export const alertUpdate = pikkuSessionlessFunc({
  description: "Update an alert",
  input: AlertUpdateInput,
  output: AlertUpdateOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("PATCH", "/alert/{id}", data) as any
  },
})
