// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsSetGithubActionsDefaultWorkflowPermissionsOrganizationInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  can_approve_pull_request_reviews: z.boolean().optional().describe("Whether GitHub Actions can approve pull requests. Enabling this can be a security risk."),
  default_workflow_permissions: z.enum(["read", "write"]).optional().describe("The default workflow permissions granted to the GITHUB_TOKEN when running workflows."),
})

export const actionsSetGithubActionsDefaultWorkflowPermissionsOrganization = pikkuSessionlessFunc({
  description: "Sets the default workflow permissions granted to the `GITHUB_TOKEN` when running workflows in an organization, and sets if GitHub Actions\ncan submit approving pull request reviews. For more information, see\n\"[Setting the permissions of the GITHUB_TOKEN for your organization](https://docs.github.com/organizations/managing-organization-settings/disabling-or-limiting-github-actions-for-your-organization#setting-the-permissions-of-the-github_token-for-your-organization).\"\n\nYou must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `administration` organization permission to use this API.",
  input: ActionsSetGithubActionsDefaultWorkflowPermissionsOrganizationInput,
  func: async ({ github }, data) => {
    return github.call("PUT", "/orgs/{org}/actions/permissions/workflow", data)
  },
})
