// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsCreateEnvironmentVariableInput = z.object({
  repository_id: z.number().int().describe("The unique identifier of the repository."),
  environment_name: z.string().describe("The name of the environment."),
  name: z.string().describe("The name of the variable."),
  value: z.string().describe("The value of the variable."),
})

export const ActionsCreateEnvironmentVariableOutput = z.record(z.string(), z.unknown()).describe("An object without any properties.")

export const actionsCreateEnvironmentVariable = pikkuSessionlessFunc({
  description: "Create an environment variable that you can reference in a GitHub Actions workflow.\nYou must authenticate using an access token with the `repo` scope to use this endpoint.\nGitHub Apps must have the `environment:write` repository permission to use this endpoint.",
  input: ActionsCreateEnvironmentVariableInput,
  output: ActionsCreateEnvironmentVariableOutput,
  func: async ({ github }, data) => {
    return github.call("POST", "/repositories/{repository_id}/environments/{environment_name}/variables", data) as any
  },
})
