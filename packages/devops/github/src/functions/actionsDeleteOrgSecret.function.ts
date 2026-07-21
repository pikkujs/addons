// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsDeleteOrgSecretInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  secret_name: z.string().describe("The name of the secret."),
})

export const actionsDeleteOrgSecret = pikkuSessionlessFunc({
  description: "Deletes a secret in an organization using the secret name. You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `secrets` organization permission to use this endpoint.",
  input: ActionsDeleteOrgSecretInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/actions/secrets/{secret_name}", data)
  },
})
