// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError } from '@pikku/core/errors'

export const ReposGetViewsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  per: z.enum(["day", "week"]).optional().default("day").describe("The time frame to display results for."),
})

export const ReposGetViewsOutput = z.object({
  count: z.number().int(),
  uniques: z.number().int(),
  views: z.array(z.object({
    count: z.number().int(),
    timestamp: z.string().datetime(),
    uniques: z.number().int(),
  })),
}).describe("View Traffic")

export const reposGetViews = pikkuSessionlessFunc({
  description: "Get the total number of views and breakdown per day or week for the last 14 days. Timestamps are aligned to UTC midnight of the beginning of the day or week. Week begins on Monday.",
  input: ReposGetViewsInput,
  output: ReposGetViewsOutput,
  errors: [ForbiddenError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/traffic/views", data) as any
  },
})
