// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsEnableSelectedRepositoryGithubActionsOrganizationInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  repository_id: z.number().int().describe("The unique identifier of the repository."),
})

export const actionsEnableSelectedRepositoryGithubActionsOrganization = pikkuSessionlessFunc({
  description: "Adds a repository to the list of selected repositories that are enabled for GitHub Actions in an organization. To use this endpoint, the organization permission policy for `enabled_repositories` must be must be configured to `selected`. For more information, see \"[Set GitHub Actions permissions for an organization](#set-github-actions-permissions-for-an-organization).\"\n\nYou must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `administration` organization permission to use this API.",
  input: ActionsEnableSelectedRepositoryGithubActionsOrganizationInput,
  func: async ({ github }, data) => {
    return github.call("PUT", "/orgs/{org}/actions/permissions/repositories/{repository_id}", data)
  },
})
