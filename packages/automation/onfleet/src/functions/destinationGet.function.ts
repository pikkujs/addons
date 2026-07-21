import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DestinationGetInput = z.object({
  destinationId: z.string(),
})

export const DestinationGetOutput = z.record(z.string(), z.unknown())

export const destinationGet = pikkuSessionlessFunc({
  description: "Get a destination",
  input: DestinationGetInput,
  output: DestinationGetOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("GET", "/destinations/{destinationId}", data) as any
  },
})
