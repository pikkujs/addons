// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsListRepoVariablesInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  per_page: z.number().int().optional().default(10).describe("The number of results per page (max 30)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ActionsListRepoVariablesOutput = z.object({
  total_count: z.number().int(),
  variables: z.array(z.object({
    created_at: z.string().datetime().describe("The date and time at which the variable was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ."),
    name: z.string().describe("The name of the variable."),
    updated_at: z.string().datetime().describe("The date and time at which the variable was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ."),
    value: z.string().describe("The value of the variable."),
  })),
})

export const actionsListRepoVariables = pikkuSessionlessFunc({
  description: "Lists all repository variables. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `actions_variables:read` repository permission to use this endpoint.",
  input: ActionsListRepoVariablesInput,
  output: ActionsListRepoVariablesOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/actions/variables", data) as any
  },
})
