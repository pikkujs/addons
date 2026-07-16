// interactions — Owner or admin management of users interactions.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ConflictError } from '@pikku/core/errors'

export const InteractionsSetRestrictionsForRepoInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  expiry: z.enum(["one_day", "three_days", "one_week", "one_month", "six_months"]).optional().describe("The duration of the interaction restriction. Default: `one_day`."),
  limit: z.enum(["existing_users", "contributors_only", "collaborators_only"]).describe("The type of GitHub user that can comment, open issues, or create pull requests while the interaction limit is in effect."),
})

export const InteractionsSetRestrictionsForRepoOutput = z.object({
  expires_at: z.string().datetime(),
  limit: z.enum(["existing_users", "contributors_only", "collaborators_only"]).describe("The type of GitHub user that can comment, open issues, or create pull requests while the interaction limit is in effect."),
  origin: z.string(),
}).describe("Interaction limit settings.")

export const interactionsSetRestrictionsForRepo = pikkuSessionlessFunc({
  description: "Temporarily restricts interactions to a certain type of GitHub user within the given repository. You must have owner or admin access to set these restrictions. If an interaction limit is set for the user or organization that owns this repository, you will receive a `409 Conflict` response and will not be able to use this endpoint to change the interaction limit for a single repository.",
  input: InteractionsSetRestrictionsForRepoInput,
  output: InteractionsSetRestrictionsForRepoOutput,
  errors: [ConflictError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/repos/{owner}/{repo}/interaction-limits", data) as any
  },
})
