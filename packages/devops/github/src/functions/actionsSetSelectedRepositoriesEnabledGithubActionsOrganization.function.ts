// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsSetSelectedRepositoriesEnabledGithubActionsOrganizationInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  selected_repository_ids: z.array(z.number().int()).describe("List of repository IDs to enable for GitHub Actions."),
})

export const actionsSetSelectedRepositoriesEnabledGithubActionsOrganization = pikkuSessionlessFunc({
  description: "Replaces the list of selected repositories that are enabled for GitHub Actions in an organization. To use this endpoint, the organization permission policy for `enabled_repositories` must be configured to `selected`. For more information, see \"[Set GitHub Actions permissions for an organization](#set-github-actions-permissions-for-an-organization).\"\n\nYou must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `administration` organization permission to use this API.",
  input: ActionsSetSelectedRepositoriesEnabledGithubActionsOrganizationInput,
  func: async ({ github }, data) => {
    return github.call("PUT", "/orgs/{org}/actions/permissions/repositories", data)
  },
})
