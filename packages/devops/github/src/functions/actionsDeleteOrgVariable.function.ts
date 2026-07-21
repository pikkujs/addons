// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsDeleteOrgVariableInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  name: z.string().describe("The name of the variable."),
})

export const actionsDeleteOrgVariable = pikkuSessionlessFunc({
  description: "Deletes an organization variable using the variable name.\nYou must authenticate using an access token with the `admin:org` scope to use this endpoint.\nGitHub Apps must have the `organization_actions_variables:write` organization permission to use this endpoint.",
  input: ActionsDeleteOrgVariableInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/actions/variables/{name}", data)
  },
})
