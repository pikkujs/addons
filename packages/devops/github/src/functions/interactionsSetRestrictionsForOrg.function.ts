// interactions — Owner or admin management of users interactions.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnprocessableContentError } from '@pikku/core/errors'

export const InteractionsSetRestrictionsForOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  expiry: z.enum(["one_day", "three_days", "one_week", "one_month", "six_months"]).optional().describe("The duration of the interaction restriction. Default: `one_day`."),
  limit: z.enum(["existing_users", "contributors_only", "collaborators_only"]).describe("The type of GitHub user that can comment, open issues, or create pull requests while the interaction limit is in effect."),
})

export const InteractionsSetRestrictionsForOrgOutput = z.object({
  expires_at: z.string().datetime(),
  limit: z.enum(["existing_users", "contributors_only", "collaborators_only"]).describe("The type of GitHub user that can comment, open issues, or create pull requests while the interaction limit is in effect."),
  origin: z.string(),
}).describe("Interaction limit settings.")

export const interactionsSetRestrictionsForOrg = pikkuSessionlessFunc({
  description: "Temporarily restricts interactions to a certain type of GitHub user in any public repository in the given organization. You must be an organization owner to set these restrictions. Setting the interaction limit at the organization level will overwrite any interaction limits that are set for individual repositories owned by the organization.",
  input: InteractionsSetRestrictionsForOrgInput,
  output: InteractionsSetRestrictionsForOrgOutput,
  errors: [UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/orgs/{org}/interaction-limits", data) as any
  },
})
