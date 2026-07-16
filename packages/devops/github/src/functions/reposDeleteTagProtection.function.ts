// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ReposDeleteTagProtectionInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  tag_protection_id: z.number().int().describe("The unique identifier of the tag protection."),
})

export const reposDeleteTagProtection = pikkuSessionlessFunc({
  description: "This deletes a tag protection state for a repository.\nThis endpoint is only available to repository administrators.",
  input: ReposDeleteTagProtectionInput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/tags/protection/{tag_protection_id}", data)
  },
})
