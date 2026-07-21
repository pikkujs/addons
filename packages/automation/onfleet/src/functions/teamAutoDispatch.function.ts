import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TeamAutoDispatchInput = z.object({
  teamId: z.string(),
})

export const TeamAutoDispatchOutput = z.record(z.string(), z.unknown())

export const teamAutoDispatch = pikkuSessionlessFunc({
  description: "Auto-dispatch a team",
  input: TeamAutoDispatchInput,
  output: TeamAutoDispatchOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("POST", "/teams/{teamId}/dispatch", data) as any
  },
})
