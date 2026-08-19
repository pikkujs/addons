// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsUpdateOrgVariableInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  name: z.string().describe("The name of the variable."),
  selected_repository_ids: z.array(z.number().int()).optional().describe("An array of repository ids that can access the organization variable. You can only provide a list of repository ids when the `visibility` is set to `selected`."),
  value: z.string().optional().describe("The value of the variable."),
  visibility: z.enum(["all", "private", "selected"]).optional().describe("The type of repositories in the organization that can access the variable. `selected` means only the repositories specified by `selected_repository_ids` can access the variable."),
})

export const actionsUpdateOrgVariable = pikkuSessionlessFunc({
  description: "Updates an organization variable that you can reference in a GitHub Actions workflow.\nYou must authenticate using an access token with the `admin:org` scope to use this endpoint.\nGitHub Apps must have the `organization_actions_variables:write` organization permission to use this endpoint.",
  input: ActionsUpdateOrgVariableInput,
  func: async ({ github }, data) => {
    return github.call("PATCH", "/orgs/{org}/actions/variables/{name}", data)
  },
})
