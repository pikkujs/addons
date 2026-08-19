// interactions — Owner or admin management of users interactions.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const InteractionsRemoveRestrictionsForOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
})

export const interactionsRemoveRestrictionsForOrg = pikkuSessionlessFunc({
  description: "Removes all interaction restrictions from public repositories in the given organization. You must be an organization owner to remove restrictions.",
  input: InteractionsRemoveRestrictionsForOrgInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/interaction-limits", data)
  },
})
