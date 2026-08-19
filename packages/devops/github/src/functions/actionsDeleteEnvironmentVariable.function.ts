// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsDeleteEnvironmentVariableInput = z.object({
  repository_id: z.number().int().describe("The unique identifier of the repository."),
  name: z.string().describe("The name of the variable."),
  environment_name: z.string().describe("The name of the environment."),
})

export const actionsDeleteEnvironmentVariable = pikkuSessionlessFunc({
  description: "Deletes an environment variable using the variable name.\nYou must authenticate using an access token with the `repo` scope to use this endpoint.\nGitHub Apps must have the `environment:write` repository permission to use this endpoint.",
  input: ActionsDeleteEnvironmentVariableInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repositories/{repository_id}/environments/{environment_name}/variables/{name}", data)
  },
})
