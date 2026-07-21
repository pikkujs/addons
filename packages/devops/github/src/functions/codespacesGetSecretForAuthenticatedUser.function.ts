// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CodespacesGetSecretForAuthenticatedUserInput = z.object({
  secret_name: z.string().describe("The name of the secret."),
})

export const CodespacesGetSecretForAuthenticatedUserOutput = z.object({
  created_at: z.string().datetime().describe("The date and time at which the secret was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ."),
  name: z.string().describe("The name of the secret"),
  selected_repositories_url: z.string().url().describe("The API URL at which the list of repositories this secret is visible to can be retrieved"),
  updated_at: z.string().datetime().describe("The date and time at which the secret was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ."),
  visibility: z.enum(["all", "private", "selected"]).describe("The type of repositories in the organization that the secret is visible to"),
}).describe("Secrets for a GitHub Codespace.")

export const codespacesGetSecretForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Gets a secret available to a user's codespaces without revealing its encrypted value.\n\nYou must authenticate using an access token with the `codespace` or `codespace:secrets` scope to use this endpoint. User must have Codespaces access to use this endpoint.\n\nGitHub Apps must have read access to the `codespaces_user_secrets` user permission to use this endpoint.",
  input: CodespacesGetSecretForAuthenticatedUserInput,
  output: CodespacesGetSecretForAuthenticatedUserOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/user/codespaces/secrets/{secret_name}", data) as any
  },
})
