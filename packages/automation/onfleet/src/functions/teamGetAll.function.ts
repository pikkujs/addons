import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TeamGetAllOutput = z.record(z.string(), z.unknown())

export const teamGetAll = pikkuSessionlessFunc({
  description: "Get many teams",
  output: TeamGetAllOutput,
  func: async ({ onfleet }) => {
    return onfleet.call("GET", "/teams") as any
  },
})
