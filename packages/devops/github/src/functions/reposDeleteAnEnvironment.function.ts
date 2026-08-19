// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReposDeleteAnEnvironmentInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  environment_name: z.string().describe("The name of the environment."),
})

export const reposDeleteAnEnvironment = pikkuSessionlessFunc({
  description: "You must authenticate using an access token with the repo scope to use this endpoint.",
  input: ReposDeleteAnEnvironmentInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/environments/{environment_name}", data)
  },
})
