// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsSetAllowedActionsOrganizationInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  github_owned_allowed: z.boolean().optional().describe("Whether GitHub-owned actions are allowed. For example, this includes the actions in the `actions` organization."),
  patterns_allowed: z.array(z.string()).optional().describe("Specifies a list of string-matching patterns to allow specific action(s) and reusable workflow(s). Wildcards, tags, and SHAs are allowed. For example, `monalisa/octocat@*`, `monalisa/octocat@v2`, `monalisa/*`.\n\n**Note**: The `patterns_allowed` setting only applies to public repositories."),
  verified_allowed: z.boolean().optional().describe("Whether actions from GitHub Marketplace verified creators are allowed. Set to `true` to allow all actions by GitHub Marketplace verified creators."),
})

export const actionsSetAllowedActionsOrganization = pikkuSessionlessFunc({
  description: "Sets the actions and reusable workflows that are allowed in an organization. To use this endpoint, the organization permission policy for `allowed_actions` must be configured to `selected`. For more information, see \"[Set GitHub Actions permissions for an organization](#set-github-actions-permissions-for-an-organization).\"\n\nYou must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `administration` organization permission to use this API.",
  input: ActionsSetAllowedActionsOrganizationInput,
  func: async ({ github }, data) => {
    return github.call("PUT", "/orgs/{org}/actions/permissions/selected-actions", data)
  },
})
