// interactions — Owner or admin management of users interactions.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const InteractionsGetRestrictionsForOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
})

export const InteractionsGetRestrictionsForOrgOutput = z.union([z.object({
  expires_at: z.string().datetime(),
  limit: z.enum(["existing_users", "contributors_only", "collaborators_only"]).describe("The type of GitHub user that can comment, open issues, or create pull requests while the interaction limit is in effect."),
  origin: z.string(),
}), z.record(z.string(), z.unknown())])

export const interactionsGetRestrictionsForOrg = pikkuSessionlessFunc({
  description: "Shows which type of GitHub user can interact with this organization and when the restriction expires. If there is no restrictions, you will see an empty response.",
  input: InteractionsGetRestrictionsForOrgInput,
  output: InteractionsGetRestrictionsForOrgOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/interaction-limits", data) as any
  },
})
