// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CodespacesListSecretsForAuthenticatedUserInput = z.object({
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const CodespacesListSecretsForAuthenticatedUserOutput = z.object({
  secrets: z.array(z.object({
    created_at: z.string().datetime().describe("The date and time at which the secret was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ."),
    name: z.string().describe("The name of the secret"),
    selected_repositories_url: z.string().url().describe("The API URL at which the list of repositories this secret is visible to can be retrieved"),
    updated_at: z.string().datetime().describe("The date and time at which the secret was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ."),
    visibility: z.enum(["all", "private", "selected"]).describe("The type of repositories in the organization that the secret is visible to"),
  })),
  total_count: z.number().int(),
})

export const codespacesListSecretsForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Lists all secrets available for a user's Codespaces without revealing their\nencrypted values.\n\nYou must authenticate using an access token with the `codespace` or `codespace:secrets` scope to use this endpoint. User must have Codespaces access to use this endpoint.\n\nGitHub Apps must have read access to the `codespaces_user_secrets` user permission to use this endpoint.",
  input: CodespacesListSecretsForAuthenticatedUserInput,
  output: CodespacesListSecretsForAuthenticatedUserOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/user/codespaces/secrets", data) as any
  },
})
