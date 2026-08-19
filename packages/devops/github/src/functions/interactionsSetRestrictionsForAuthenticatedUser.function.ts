// interactions — Owner or admin management of users interactions.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnprocessableContentError } from '@pikku/core/errors'

export const InteractionsSetRestrictionsForAuthenticatedUserInput = z.object({
  expiry: z.enum(["one_day", "three_days", "one_week", "one_month", "six_months"]).optional().describe("The duration of the interaction restriction. Default: `one_day`."),
  limit: z.enum(["existing_users", "contributors_only", "collaborators_only"]).describe("The type of GitHub user that can comment, open issues, or create pull requests while the interaction limit is in effect."),
})

export const InteractionsSetRestrictionsForAuthenticatedUserOutput = z.object({
  expires_at: z.string().datetime(),
  limit: z.enum(["existing_users", "contributors_only", "collaborators_only"]).describe("The type of GitHub user that can comment, open issues, or create pull requests while the interaction limit is in effect."),
  origin: z.string(),
}).describe("Interaction limit settings.")

export const interactionsSetRestrictionsForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Temporarily restricts which type of GitHub user can interact with your public repositories. Setting the interaction limit at the user level will overwrite any interaction limits that are set for individual repositories owned by the user.",
  input: InteractionsSetRestrictionsForAuthenticatedUserInput,
  output: InteractionsSetRestrictionsForAuthenticatedUserOutput,
  errors: [UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/user/interaction-limits", data) as any
  },
})
