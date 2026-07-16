import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TeamCreateInput = z.object({
  name: z.string().optional(),
})

export const TeamCreateOutput = z.record(z.string(), z.unknown())

export const teamCreate = pikkuSessionlessFunc({
  description: "Create a team",
  input: TeamCreateInput,
  output: TeamCreateOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("POST", "/teams", data) as any
  },
})
