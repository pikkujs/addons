import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TeamUpdateInput = z.object({
  teamId: z.string(),
  name: z.string().optional(),
})

export const TeamUpdateOutput = z.record(z.string(), z.unknown())

export const teamUpdate = pikkuSessionlessFunc({
  description: "Update a team",
  input: TeamUpdateInput,
  output: TeamUpdateOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("PUT", "/teams/{teamId}", data) as any
  },
})
