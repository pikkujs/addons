// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ConflictError } from '@pikku/core/errors'

export const ActionsRemoveSelectedRepoFromOrgVariableInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  name: z.string().describe("The name of the variable."),
  repository_id: z.number().int(),
})

export const actionsRemoveSelectedRepoFromOrgVariable = pikkuSessionlessFunc({
  description: "Removes a repository from an organization variable that is available to selected repositories. Organization variables that are available to selected repositories have their `visibility` field set to `selected`. You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `organization_actions_variables:write` organization permission to use this endpoint.",
  input: ActionsRemoveSelectedRepoFromOrgVariableInput,
  errors: [ConflictError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/actions/variables/{name}/repositories/{repository_id}", data)
  },
})
