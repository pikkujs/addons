import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const HubUpdateInput = z.object({
  hubId: z.string(),
  name: z.string().optional(),
})

export const HubUpdateOutput = z.record(z.string(), z.unknown())

export const hubUpdate = pikkuSessionlessFunc({
  description: "Update a hub",
  input: HubUpdateInput,
  output: HubUpdateOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("PUT", "/hubs/{hubId}", data) as any
  },
})
