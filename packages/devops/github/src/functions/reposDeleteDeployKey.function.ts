// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReposDeleteDeployKeyInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  key_id: z.number().int().describe("The unique identifier of the key."),
})

export const reposDeleteDeployKey = pikkuSessionlessFunc({
  description: "Deploy keys are immutable. If you need to update a key, remove the key and create a new one instead.",
  input: ReposDeleteDeployKeyInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/keys/{key_id}", data)
  },
})
