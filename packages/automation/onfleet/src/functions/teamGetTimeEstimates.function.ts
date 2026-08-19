import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TeamGetTimeEstimatesInput = z.object({
  teamId: z.string(),
})

export const TeamGetTimeEstimatesOutput = z.record(z.string(), z.unknown())

export const teamGetTimeEstimates = pikkuSessionlessFunc({
  description: "Get time estimates for a team",
  input: TeamGetTimeEstimatesInput,
  output: TeamGetTimeEstimatesOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("GET", "/teams/{teamId}/estimate", data) as any
  },
})
