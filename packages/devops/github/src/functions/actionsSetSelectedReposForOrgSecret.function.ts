// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsSetSelectedReposForOrgSecretInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  secret_name: z.string().describe("The name of the secret."),
  selected_repository_ids: z.array(z.number().int()).describe("An array of repository ids that can access the organization secret. You can only provide a list of repository ids when the `visibility` is set to `selected`. You can add and remove individual repositories using the [Add selected repository to an organization secret](https://docs.github.com/rest/actions/secrets#add-selected-repository-to-an-organization-secret) and [Remove selected repository from an organization secret](https://docs.github.com/rest/reference/actions#remove-selected-repository-from-an-organization-secret) endpoints."),
})

export const actionsSetSelectedReposForOrgSecret = pikkuSessionlessFunc({
  description: "Replaces all repositories for an organization secret when the `visibility` for repository access is set to `selected`. The visibility is set when you [Create or update an organization secret](https://docs.github.com/rest/reference/actions#create-or-update-an-organization-secret). You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `secrets` organization permission to use this endpoint.",
  input: ActionsSetSelectedReposForOrgSecretInput,
  func: async ({ github }, data) => {
    return github.call("PUT", "/orgs/{org}/actions/secrets/{secret_name}/repositories", data)
  },
})
