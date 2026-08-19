// interactions — Owner or admin management of users interactions.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const InteractionsGetRestrictionsForRepoInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const InteractionsGetRestrictionsForRepoOutput = z.union([z.object({
  expires_at: z.string().datetime(),
  limit: z.enum(["existing_users", "contributors_only", "collaborators_only"]).describe("The type of GitHub user that can comment, open issues, or create pull requests while the interaction limit is in effect."),
  origin: z.string(),
}), z.record(z.string(), z.unknown())])

export const interactionsGetRestrictionsForRepo = pikkuSessionlessFunc({
  description: "Shows which type of GitHub user can interact with this repository and when the restriction expires. If there are no restrictions, you will see an empty response.",
  input: InteractionsGetRestrictionsForRepoInput,
  output: InteractionsGetRestrictionsForRepoOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/interaction-limits", data) as any
  },
})
