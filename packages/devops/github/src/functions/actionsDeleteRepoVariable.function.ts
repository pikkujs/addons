// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsDeleteRepoVariableInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  name: z.string().describe("The name of the variable."),
})

export const actionsDeleteRepoVariable = pikkuSessionlessFunc({
  description: "Deletes a repository variable using the variable name.\nYou must authenticate using an access token with the `repo` scope to use this endpoint.\nGitHub Apps must have the `actions_variables:write` repository permission to use this endpoint.",
  input: ActionsDeleteRepoVariableInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/actions/variables/{name}", data)
  },
})
