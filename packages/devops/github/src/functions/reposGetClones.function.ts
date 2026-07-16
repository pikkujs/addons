// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError } from '@pikku/core/errors'

export const ReposGetClonesInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  per: z.enum(["day", "week"]).optional().default("day").describe("The time frame to display results for."),
})

export const ReposGetClonesOutput = z.object({
  clones: z.array(z.object({
    count: z.number().int(),
    timestamp: z.string().datetime(),
    uniques: z.number().int(),
  })),
  count: z.number().int(),
  uniques: z.number().int(),
}).describe("Clone Traffic")

export const reposGetClones = pikkuSessionlessFunc({
  description: "Get the total number of clones and breakdown per day or week for the last 14 days. Timestamps are aligned to UTC midnight of the beginning of the day or week. Week begins on Monday.",
  input: ReposGetClonesInput,
  output: ReposGetClonesOutput,
  errors: [ForbiddenError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/traffic/clones", data) as any
  },
})
