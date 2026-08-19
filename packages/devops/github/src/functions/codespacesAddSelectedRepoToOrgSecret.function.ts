// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError, ConflictError, UnprocessableContentError } from '@pikku/core/errors'

export const CodespacesAddSelectedRepoToOrgSecretInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  secret_name: z.string().describe("The name of the secret."),
  repository_id: z.number().int(),
})

export const codespacesAddSelectedRepoToOrgSecret = pikkuSessionlessFunc({
  description: "Adds a repository to an organization secret when the `visibility` for repository access is set to `selected`. The visibility is set when you [Create or update an organization secret](https://docs.github.com/rest/reference/codespaces#create-or-update-an-organization-secret). You must authenticate using an access token with the `admin:org` scope to use this endpoint.",
  input: CodespacesAddSelectedRepoToOrgSecretInput,
  errors: [NotFoundError, ConflictError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/orgs/{org}/codespaces/secrets/{secret_name}/repositories/{repository_id}", data)
  },
})
