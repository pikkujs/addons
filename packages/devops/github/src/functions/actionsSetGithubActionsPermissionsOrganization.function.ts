// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsSetGithubActionsPermissionsOrganizationInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  allowed_actions: z.enum(["all", "local_only", "selected"]).optional().describe("The permissions policy that controls the actions and reusable workflows that are allowed to run."),
  enabled_repositories: z.enum(["all", "none", "selected"]).describe("The policy that controls the repositories in the organization that are allowed to run GitHub Actions."),
})

export const actionsSetGithubActionsPermissionsOrganization = pikkuSessionlessFunc({
  description: "Sets the GitHub Actions permissions policy for repositories and allowed actions and reusable workflows in an organization.\n\nYou must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `administration` organization permission to use this API.",
  input: ActionsSetGithubActionsPermissionsOrganizationInput,
  func: async ({ github }, data) => {
    return github.call("PUT", "/orgs/{org}/actions/permissions", data)
  },
})
