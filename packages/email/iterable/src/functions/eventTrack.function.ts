import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EventTrackInput = z.object({
  events: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const EventTrackOutput = z.record(z.string(), z.unknown())

export const eventTrack = pikkuSessionlessFunc({
  description: "Track events in bulk",
  input: EventTrackInput,
  output: EventTrackOutput,
  func: async ({ iterable }, data) => {
    return iterable.call("POST", "/events/trackBulk", data) as any
  },
})
