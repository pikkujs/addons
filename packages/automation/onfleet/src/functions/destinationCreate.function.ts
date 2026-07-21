import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DestinationCreateInput = z.object({
  address: z.string().optional(),
})

export const DestinationCreateOutput = z.record(z.string(), z.unknown())

export const destinationCreate = pikkuSessionlessFunc({
  description: "Create a destination",
  input: DestinationCreateInput,
  output: DestinationCreateOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("POST", "/destinations", data) as any
  },
})
