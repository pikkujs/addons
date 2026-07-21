// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const ReposGetParticipationStatsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const ReposGetParticipationStatsOutput = z.object({
  all: z.array(z.number().int()),
  owner: z.array(z.number().int()),
})

export const reposGetParticipationStats = pikkuSessionlessFunc({
  description: "Returns the total commit counts for the `owner` and total commit counts in `all`. `all` is everyone combined, including the `owner` in the last 52 weeks. If you'd like to get the commit counts for non-owners, you can subtract `owner` from `all`.\n\nThe array order is oldest week (index 0) to most recent week.",
  input: ReposGetParticipationStatsInput,
  output: ReposGetParticipationStatsOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/stats/participation", data) as any
  },
})
