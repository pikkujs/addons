// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError } from '@pikku/core/errors'

export const ReposGetTopReferrersInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const ReposGetTopReferrersOutput = z.array(z.object({
  count: z.number().int(),
  referrer: z.string(),
  uniques: z.number().int(),
}))

export const reposGetTopReferrers = pikkuSessionlessFunc({
  description: "Get the top 10 referrers over the last 14 days.",
  input: ReposGetTopReferrersInput,
  output: ReposGetTopReferrersOutput,
  errors: [ForbiddenError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/traffic/popular/referrers", data) as any
  },
})
