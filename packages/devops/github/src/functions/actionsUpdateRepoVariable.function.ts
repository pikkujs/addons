// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsUpdateRepoVariableInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  name: z.string().describe("The name of the variable."),
  value: z.string().optional().describe("The value of the variable."),
})

export const actionsUpdateRepoVariable = pikkuSessionlessFunc({
  description: "Updates a repository variable that you can reference in a GitHub Actions workflow.\nYou must authenticate using an access token with the `repo` scope to use this endpoint.\nGitHub Apps must have the `actions_variables:write` repository permission to use this endpoint.",
  input: ActionsUpdateRepoVariableInput,
  func: async ({ github }, data) => {
    return github.call("PATCH", "/repos/{owner}/{repo}/actions/variables/{name}", data)
  },
})
