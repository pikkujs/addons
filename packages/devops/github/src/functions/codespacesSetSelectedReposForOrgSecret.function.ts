// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError, ConflictError } from '@pikku/core/errors'

export const CodespacesSetSelectedReposForOrgSecretInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  secret_name: z.string().describe("The name of the secret."),
  selected_repository_ids: z.array(z.number().int()).describe("An array of repository ids that can access the organization secret. You can only provide a list of repository ids when the `visibility` is set to `selected`. You can add and remove individual repositories using the [Set selected repositories for an organization secret](https://docs.github.com/rest/reference/codespaces#set-selected-repositories-for-an-organization-secret) and [Remove selected repository from an organization secret](https://docs.github.com/rest/reference/codespaces#remove-selected-repository-from-an-organization-secret) endpoints."),
})

export const codespacesSetSelectedReposForOrgSecret = pikkuSessionlessFunc({
  description: "Replaces all repositories for an organization secret when the `visibility` for repository access is set to `selected`. The visibility is set when you [Create or update an organization secret](https://docs.github.com/rest/reference/codespaces#create-or-update-an-organization-secret). You must authenticate using an access token with the `admin:org` scope to use this endpoint.",
  input: CodespacesSetSelectedReposForOrgSecretInput,
  errors: [NotFoundError, ConflictError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/orgs/{org}/codespaces/secrets/{secret_name}/repositories", data)
  },
})
