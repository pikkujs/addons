// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsGetGithubActionsPermissionsOrganizationInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
})

export const ActionsGetGithubActionsPermissionsOrganizationOutput = z.object({
  allowed_actions: z.enum(["all", "local_only", "selected"]).optional().describe("The permissions policy that controls the actions and reusable workflows that are allowed to run."),
  enabled_repositories: z.enum(["all", "none", "selected"]).describe("The policy that controls the repositories in the organization that are allowed to run GitHub Actions."),
  selected_actions_url: z.string().optional().describe("The API URL to use to get or set the actions and reusable workflows that are allowed to run, when `allowed_actions` is set to `selected`."),
  selected_repositories_url: z.string().optional().describe("The API URL to use to get or set the selected repositories that are allowed to run GitHub Actions, when `enabled_repositories` is set to `selected`."),
})

export const actionsGetGithubActionsPermissionsOrganization = pikkuSessionlessFunc({
  description: "Gets the GitHub Actions permissions policy for repositories and allowed actions and reusable workflows in an organization.\n\nYou must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `administration` organization permission to use this API.",
  input: ActionsGetGithubActionsPermissionsOrganizationInput,
  output: ActionsGetGithubActionsPermissionsOrganizationOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/actions/permissions", data) as any
  },
})
