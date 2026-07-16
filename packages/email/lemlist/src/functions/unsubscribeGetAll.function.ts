import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UnsubscribeGetAllInput = z.object({
  limit: z.number().optional(),
})

export const UnsubscribeGetAllOutput = z.record(z.string(), z.unknown())

export const unsubscribeGetAll = pikkuSessionlessFunc({
  description: "Get many unsubscribed emails",
  input: UnsubscribeGetAllInput,
  output: UnsubscribeGetAllOutput,
  func: async ({ lemlist }, data) => {
    return lemlist.call("GET", "/unsubscribes", data) as any
  },
})
