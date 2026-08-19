// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CodespacesGetOrgSecretInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  secret_name: z.string().describe("The name of the secret."),
})

export const CodespacesGetOrgSecretOutput = z.object({
  created_at: z.string().datetime().describe("The date and time at which the secret was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ."),
  name: z.string().describe("The name of the secret"),
  selected_repositories_url: z.string().url().optional().describe("The API URL at which the list of repositories this secret is visible to can be retrieved"),
  updated_at: z.string().datetime().describe("The date and time at which the secret was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ."),
  visibility: z.enum(["all", "private", "selected"]).describe("The type of repositories in the organization that the secret is visible to"),
}).describe("Secrets for a GitHub Codespace.")

export const codespacesGetOrgSecret = pikkuSessionlessFunc({
  description: "Gets an organization secret without revealing its encrypted value.\nYou must authenticate using an access token with the `admin:org` scope to use this endpoint.",
  input: CodespacesGetOrgSecretInput,
  output: CodespacesGetOrgSecretOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/codespaces/secrets/{secret_name}", data) as any
  },
})
