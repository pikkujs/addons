// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ConflictError } from '@pikku/core/errors'

export const ActionsSetSelectedReposForOrgVariableInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  name: z.string().describe("The name of the variable."),
  selected_repository_ids: z.array(z.number().int()).describe("The IDs of the repositories that can access the organization variable."),
})

export const actionsSetSelectedReposForOrgVariable = pikkuSessionlessFunc({
  description: "Replaces all repositories for an organization variable that is available to selected repositories. Organization variables that are available to selected repositories have their `visibility` field set to `selected`. You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `organization_actions_variables:write` organization permission to use this endpoint.",
  input: ActionsSetSelectedReposForOrgVariableInput,
  errors: [ConflictError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/orgs/{org}/actions/variables/{name}/repositories", data)
  },
})
