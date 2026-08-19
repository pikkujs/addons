// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CodespacesListOrgSecretsInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const CodespacesListOrgSecretsOutput = z.object({
  secrets: z.array(z.object({
    created_at: z.string().datetime().describe("The date and time at which the secret was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ."),
    name: z.string().describe("The name of the secret"),
    selected_repositories_url: z.string().url().optional().describe("The API URL at which the list of repositories this secret is visible to can be retrieved"),
    updated_at: z.string().datetime().describe("The date and time at which the secret was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ."),
    visibility: z.enum(["all", "private", "selected"]).describe("The type of repositories in the organization that the secret is visible to"),
  })),
  total_count: z.number().int(),
})

export const codespacesListOrgSecrets = pikkuSessionlessFunc({
  description: "Lists all Codespaces secrets available at the organization-level without revealing their encrypted values.\nYou must authenticate using an access token with the `admin:org` scope to use this endpoint.",
  input: CodespacesListOrgSecretsInput,
  output: CodespacesListOrgSecretsOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/codespaces/secrets", data) as any
  },
})
