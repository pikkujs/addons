// dependabot — Endpoints to manage Dependabot.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DependabotDeleteOrgSecretInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  secret_name: z.string().describe("The name of the secret."),
})

export const dependabotDeleteOrgSecret = pikkuSessionlessFunc({
  description: "Deletes a secret in an organization using the secret name. You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `dependabot_secrets` organization permission to use this endpoint.",
  input: DependabotDeleteOrgSecretInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/dependabot/secrets/{secret_name}", data)
  },
})
