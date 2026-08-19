// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError } from '@pikku/core/errors'

export const ReposGetTopPathsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const ReposGetTopPathsOutput = z.array(z.object({
  count: z.number().int(),
  path: z.string(),
  title: z.string(),
  uniques: z.number().int(),
}))

export const reposGetTopPaths = pikkuSessionlessFunc({
  description: "Get the top 10 popular contents over the last 14 days.",
  input: ReposGetTopPathsInput,
  output: ReposGetTopPathsOutput,
  errors: [ForbiddenError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/traffic/popular/paths", data) as any
  },
})
