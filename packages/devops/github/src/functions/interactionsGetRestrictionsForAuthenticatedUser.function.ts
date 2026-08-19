// interactions — Owner or admin management of users interactions.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const InteractionsGetRestrictionsForAuthenticatedUserOutput = z.union([z.object({
  expires_at: z.string().datetime(),
  limit: z.enum(["existing_users", "contributors_only", "collaborators_only"]).describe("The type of GitHub user that can comment, open issues, or create pull requests while the interaction limit is in effect."),
  origin: z.string(),
}), z.record(z.string(), z.unknown())])

export const interactionsGetRestrictionsForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Shows which type of GitHub user can interact with your public repositories and when the restriction expires.",
  output: InteractionsGetRestrictionsForAuthenticatedUserOutput,
  func: async ({ github }) => {
    return github.call("GET", "/user/interaction-limits") as any
  },
})
