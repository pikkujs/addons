import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EventGetAllInput = z.object({
  start: z.string().optional(),
  end: z.string().optional(),
})

export const EventGetAllOutput = z.record(z.string(), z.unknown())

export const eventGetAll = pikkuSessionlessFunc({
  description: "List events",
  input: EventGetAllInput,
  output: EventGetAllOutput,
  func: async ({ bitwarden }, data) => {
    return bitwarden.call("GET", "/public/events", data) as any
  },
})
