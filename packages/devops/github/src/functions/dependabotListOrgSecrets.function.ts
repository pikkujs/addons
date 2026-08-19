// dependabot — Endpoints to manage Dependabot.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DependabotListOrgSecretsInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const DependabotListOrgSecretsOutput = z.object({
  secrets: z.array(z.object({
    created_at: z.string().datetime(),
    name: z.string().describe("The name of the secret."),
    selected_repositories_url: z.string().url().optional(),
    updated_at: z.string().datetime(),
    visibility: z.enum(["all", "private", "selected"]).describe("Visibility of a secret"),
  })),
  total_count: z.number().int(),
})

export const dependabotListOrgSecrets = pikkuSessionlessFunc({
  description: "Lists all secrets available in an organization without revealing their encrypted values. You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `dependabot_secrets` organization permission to use this endpoint.",
  input: DependabotListOrgSecretsInput,
  output: DependabotListOrgSecretsOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/dependabot/secrets", data) as any
  },
})
