// dependabot — Endpoints to manage Dependabot.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DependabotGetOrgSecretInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  secret_name: z.string().describe("The name of the secret."),
})

export const DependabotGetOrgSecretOutput = z.object({
  created_at: z.string().datetime(),
  name: z.string().describe("The name of the secret."),
  selected_repositories_url: z.string().url().optional(),
  updated_at: z.string().datetime(),
  visibility: z.enum(["all", "private", "selected"]).describe("Visibility of a secret"),
}).describe("Secrets for GitHub Dependabot for an organization.")

export const dependabotGetOrgSecret = pikkuSessionlessFunc({
  description: "Gets a single organization secret without revealing its encrypted value. You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `dependabot_secrets` organization permission to use this endpoint.",
  input: DependabotGetOrgSecretInput,
  output: DependabotGetOrgSecretOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/dependabot/secrets/{secret_name}", data) as any
  },
})
