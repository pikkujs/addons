import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const HubCreateInput = z.object({
  name: z.string().optional(),
})

export const HubCreateOutput = z.record(z.string(), z.unknown())

export const hubCreate = pikkuSessionlessFunc({
  description: "Create a hub",
  input: HubCreateInput,
  output: HubCreateOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("POST", "/hubs", data) as any
  },
})
