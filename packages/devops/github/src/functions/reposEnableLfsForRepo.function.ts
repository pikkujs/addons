// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError } from '@pikku/core/errors'

export const ReposEnableLfsForRepoInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const ReposEnableLfsForRepoOutput = z.record(z.string(), z.unknown())

export const reposEnableLfsForRepo = pikkuSessionlessFunc({
  description: "Enables Git LFS for a repository. Access tokens must have the `admin:enterprise` scope.",
  input: ReposEnableLfsForRepoInput,
  output: ReposEnableLfsForRepoOutput,
  errors: [ForbiddenError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/repos/{owner}/{repo}/lfs", data) as any
  },
})
