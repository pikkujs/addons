// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsGetOrgSecretInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  secret_name: z.string().describe("The name of the secret."),
})

export const ActionsGetOrgSecretOutput = z.object({
  created_at: z.string().datetime(),
  name: z.string().describe("The name of the secret."),
  selected_repositories_url: z.string().url().optional(),
  updated_at: z.string().datetime(),
  visibility: z.enum(["all", "private", "selected"]).describe("Visibility of a secret"),
}).describe("Secrets for GitHub Actions for an organization.")

export const actionsGetOrgSecret = pikkuSessionlessFunc({
  description: "Gets a single organization secret without revealing its encrypted value. You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `secrets` organization permission to use this endpoint.",
  input: ActionsGetOrgSecretInput,
  output: ActionsGetOrgSecretOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/actions/secrets/{secret_name}", data) as any
  },
})
