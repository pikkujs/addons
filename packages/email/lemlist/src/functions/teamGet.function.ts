import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TeamGetOutput = z.record(z.string(), z.unknown())

export const teamGet = pikkuSessionlessFunc({
  description: "Get a team",
  output: TeamGetOutput,
  func: async ({ lemlist }) => {
    return lemlist.call("GET", "/team") as any
  },
})
