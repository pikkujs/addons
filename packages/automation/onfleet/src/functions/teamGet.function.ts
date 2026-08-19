import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TeamGetInput = z.object({
  teamId: z.string(),
})

export const TeamGetOutput = z.record(z.string(), z.unknown())

export const teamGet = pikkuSessionlessFunc({
  description: "Get a team",
  input: TeamGetInput,
  output: TeamGetOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("GET", "/teams/{teamId}", data) as any
  },
})
