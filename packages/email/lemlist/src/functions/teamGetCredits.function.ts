import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TeamGetCreditsOutput = z.record(z.string(), z.unknown())

export const teamGetCredits = pikkuSessionlessFunc({
  description: "Get team credits",
  output: TeamGetCreditsOutput,
  func: async ({ lemlist }) => {
    return lemlist.call("GET", "/team/credits") as any
  },
})
