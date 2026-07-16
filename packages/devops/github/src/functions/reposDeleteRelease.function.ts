// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReposDeleteReleaseInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  release_id: z.number().int().describe("The unique identifier of the release."),
})

export const reposDeleteRelease = pikkuSessionlessFunc({
  description: "Users with push access to the repository can delete a release.",
  input: ReposDeleteReleaseInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/releases/{release_id}", data)
  },
})
