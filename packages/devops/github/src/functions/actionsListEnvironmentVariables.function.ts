// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsListEnvironmentVariablesInput = z.object({
  repository_id: z.number().int().describe("The unique identifier of the repository."),
  environment_name: z.string().describe("The name of the environment."),
  per_page: z.number().int().optional().default(10).describe("The number of results per page (max 30)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ActionsListEnvironmentVariablesOutput = z.object({
  total_count: z.number().int(),
  variables: z.array(z.object({
    created_at: z.string().datetime().describe("The date and time at which the variable was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ."),
    name: z.string().describe("The name of the variable."),
    updated_at: z.string().datetime().describe("The date and time at which the variable was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ."),
    value: z.string().describe("The value of the variable."),
  })),
})

export const actionsListEnvironmentVariables = pikkuSessionlessFunc({
  description: "Lists all environment variables. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `environments:read` repository permission to use this endpoint.",
  input: ActionsListEnvironmentVariablesInput,
  output: ActionsListEnvironmentVariablesOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repositories/{repository_id}/environments/{environment_name}/variables", data) as any
  },
})
