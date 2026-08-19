import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AlertResolveInput = z.object({
  externalId: z.string().optional(),
})

export const AlertResolveOutput = z.object({
  eventId: z.string().optional(),
})

export const alertResolve = pikkuSessionlessFunc({
  description: "Resolve an alert",
  input: AlertResolveInput,
  output: AlertResolveOutput,
  func: async ({ signl4 }, data) => {
    return signl4.call("POST", "/alert/resolve", data) as any
  },
})
