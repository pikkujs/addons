// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsUpdateEnvironmentVariableInput = z.object({
  repository_id: z.number().int().describe("The unique identifier of the repository."),
  name: z.string().describe("The name of the variable."),
  environment_name: z.string().describe("The name of the environment."),
  value: z.string().optional().describe("The value of the variable."),
})

export const actionsUpdateEnvironmentVariable = pikkuSessionlessFunc({
  description: "Updates an environment variable that you can reference in a GitHub Actions workflow.\nYou must authenticate using an access token with the `repo` scope to use this endpoint.\nGitHub Apps must have the `environment:write` repository permission to use this endpoint.",
  input: ActionsUpdateEnvironmentVariableInput,
  func: async ({ github }, data) => {
    return github.call("PATCH", "/repositories/{repository_id}/environments/{environment_name}/variables/{name}", data)
  },
})
