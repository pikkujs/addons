// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReposDisableLfsForRepoInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const reposDisableLfsForRepo = pikkuSessionlessFunc({
  description: "Disables Git LFS for a repository. Access tokens must have the `admin:enterprise` scope.",
  input: ReposDisableLfsForRepoInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/lfs", data)
  },
})
