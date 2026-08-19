// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsGetGithubActionsDefaultWorkflowPermissionsOrganizationInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
})

export const ActionsGetGithubActionsDefaultWorkflowPermissionsOrganizationOutput = z.object({
  can_approve_pull_request_reviews: z.boolean().describe("Whether GitHub Actions can approve pull requests. Enabling this can be a security risk."),
  default_workflow_permissions: z.enum(["read", "write"]).describe("The default workflow permissions granted to the GITHUB_TOKEN when running workflows."),
})

export const actionsGetGithubActionsDefaultWorkflowPermissionsOrganization = pikkuSessionlessFunc({
  description: "Gets the default workflow permissions granted to the `GITHUB_TOKEN` when running workflows in an organization,\nas well as whether GitHub Actions can submit approving pull request reviews. For more information, see\n\"[Setting the permissions of the GITHUB_TOKEN for your organization](https://docs.github.com/organizations/managing-organization-settings/disabling-or-limiting-github-actions-for-your-organization#setting-the-permissions-of-the-github_token-for-your-organization).\"\n\nYou must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `administration` organization permission to use this API.",
  input: ActionsGetGithubActionsDefaultWorkflowPermissionsOrganizationInput,
  output: ActionsGetGithubActionsDefaultWorkflowPermissionsOrganizationOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/actions/permissions/workflow", data) as any
  },
})
