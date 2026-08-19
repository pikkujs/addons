// interactions — Owner or admin management of users interactions.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ConflictError } from '@pikku/core/errors'

export const InteractionsRemoveRestrictionsForRepoInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const interactionsRemoveRestrictionsForRepo = pikkuSessionlessFunc({
  description: "Removes all interaction restrictions from the given repository. You must have owner or admin access to remove restrictions. If the interaction limit is set for the user or organization that owns this repository, you will receive a `409 Conflict` response and will not be able to use this endpoint to change the interaction limit for a single repository.",
  input: InteractionsRemoveRestrictionsForRepoInput,
  errors: [ConflictError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/interaction-limits", data)
  },
})
