import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EventGetInput = z.object({
  roomId: z.string(),
  eventId: z.string(),
})

export const EventGetOutput = z.object({
  type: z.string().optional(),
})

export const eventGet = pikkuSessionlessFunc({
  description: "Get a single event",
  input: EventGetInput,
  output: EventGetOutput,
  func: async ({ matrix }, data) => {
    return matrix.call("GET", "/rooms/{roomId}/event/{eventId}", data) as any
  },
})
