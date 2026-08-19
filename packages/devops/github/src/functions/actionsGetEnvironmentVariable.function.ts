// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsGetEnvironmentVariableInput = z.object({
  repository_id: z.number().int().describe("The unique identifier of the repository."),
  environment_name: z.string().describe("The name of the environment."),
  name: z.string().describe("The name of the variable."),
})

export const ActionsGetEnvironmentVariableOutput = z.object({
  created_at: z.string().datetime().describe("The date and time at which the variable was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ."),
  name: z.string().describe("The name of the variable."),
  updated_at: z.string().datetime().describe("The date and time at which the variable was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ."),
  value: z.string().describe("The value of the variable."),
})

export const actionsGetEnvironmentVariable = pikkuSessionlessFunc({
  description: "Gets a specific variable in an environment. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `environments:read` repository permission to use this endpoint.",
  input: ActionsGetEnvironmentVariableInput,
  output: ActionsGetEnvironmentVariableOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repositories/{repository_id}/environments/{environment_name}/variables/{name}", data) as any
  },
})
