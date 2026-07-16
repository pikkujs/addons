// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const ReposDeleteAutolinkInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  autolink_id: z.number().int().describe("The unique identifier of the autolink."),
})

export const reposDeleteAutolink = pikkuSessionlessFunc({
  description: "This deletes a single autolink reference by ID that was configured for the given repository.\n\nInformation about autolinks are only available to repository administrators.",
  input: ReposDeleteAutolinkInput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/autolinks/{autolink_id}", data)
  },
})
