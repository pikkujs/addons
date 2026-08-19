// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const CodespacesDeleteOrgSecretInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  secret_name: z.string().describe("The name of the secret."),
})

export const codespacesDeleteOrgSecret = pikkuSessionlessFunc({
  description: "Deletes an organization secret using the secret name. You must authenticate using an access token with the `admin:org` scope to use this endpoint.",
  input: CodespacesDeleteOrgSecretInput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/codespaces/secrets/{secret_name}", data)
  },
})
