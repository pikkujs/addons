// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsListOrgVariablesInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  per_page: z.number().int().optional().default(10).describe("The number of results per page (max 30)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ActionsListOrgVariablesOutput = z.object({
  total_count: z.number().int(),
  variables: z.array(z.object({
    created_at: z.string().datetime().describe("The date and time at which the variable was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ."),
    name: z.string().describe("The name of the variable."),
    selected_repositories_url: z.string().url().optional(),
    updated_at: z.string().datetime().describe("The date and time at which the variable was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ."),
    value: z.string().describe("The value of the variable."),
    visibility: z.enum(["all", "private", "selected"]).describe("Visibility of a variable"),
  })),
})

export const actionsListOrgVariables = pikkuSessionlessFunc({
  description: "Lists all organization variables. You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `organization_actions_variables:read` organization permission to use this endpoint.",
  input: ActionsListOrgVariablesInput,
  output: ActionsListOrgVariablesOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/actions/variables", data) as any
  },
})
