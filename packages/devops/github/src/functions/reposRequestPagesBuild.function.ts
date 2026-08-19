// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReposRequestPagesBuildInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const ReposRequestPagesBuildOutput = z.object({
  status: z.string(),
  url: z.string().url(),
}).describe("Page Build Status")

export const reposRequestPagesBuild = pikkuSessionlessFunc({
  description: "You can request that your site be built from the latest revision on the default branch. This has the same effect as pushing a commit to your default branch, but does not require an additional commit. Manually triggering page builds can be helpful when diagnosing build warnings and failures.\n\nBuild requests are limited to one concurrent build per repository and one concurrent build per requester. If you request a build while another is still in progress, the second request will be queued until the first completes.",
  input: ReposRequestPagesBuildInput,
  output: ReposRequestPagesBuildOutput,
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/pages/builds", data) as any
  },
})
