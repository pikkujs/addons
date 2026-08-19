import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EventTrackInput = z.object({
  body: z.string().optional(),
})

export const EventTrackOutput = z.record(z.string(), z.unknown())

export const eventTrack = pikkuSessionlessFunc({
  description: "Event track",
  input: EventTrackInput,
  output: EventTrackOutput,
  func: async ({ vero }, data) => {
    return vero.call("POST", "/events/track", data) as any
  },
})
