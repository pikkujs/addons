// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ConflictError, UnprocessableContentError } from '@pikku/core/errors'

export const ReposMergeUpstreamInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  branch: z.string().describe("The name of the branch which should be updated to match upstream."),
})

export const ReposMergeUpstreamOutput = z.object({
  base_branch: z.string().optional(),
  merge_type: z.enum(["merge", "fast-forward", "none"]).optional(),
  message: z.string().optional(),
}).describe("Results of a successful merge upstream request")

export const reposMergeUpstream = pikkuSessionlessFunc({
  description: "Sync a branch of a forked repository to keep it up-to-date with the upstream repository.",
  input: ReposMergeUpstreamInput,
  output: ReposMergeUpstreamOutput,
  errors: [ConflictError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/merge-upstream", data) as any
  },
})
