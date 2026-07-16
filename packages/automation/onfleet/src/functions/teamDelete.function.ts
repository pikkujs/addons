import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TeamDeleteInput = z.object({
  teamId: z.string(),
})

export const TeamDeleteOutput = z.record(z.string(), z.unknown())

export const teamDelete = pikkuSessionlessFunc({
  description: "Delete a team",
  input: TeamDeleteInput,
  output: TeamDeleteOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("DELETE", "/teams/{teamId}", data) as any
  },
})
