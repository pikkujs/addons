// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsListSelfHostedRunnersForOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ActionsListSelfHostedRunnersForOrgOutput = z.object({
  runners: z.array(z.object({
    busy: z.boolean(),
    id: z.number().int().describe("The id of the runner."),
    labels: z.array(z.object({
      id: z.number().int().optional().describe("Unique identifier of the label."),
      name: z.string().describe("Name of the label."),
      type: z.enum(["read-only", "custom"]).optional().describe("The type of label. Read-only labels are applied automatically when the runner is configured."),
    })),
    name: z.string().describe("The name of the runner."),
    os: z.string().describe("The Operating System of the runner."),
    status: z.string().describe("The status of the runner."),
  })),
  total_count: z.number().int(),
})

export const actionsListSelfHostedRunnersForOrg = pikkuSessionlessFunc({
  description: "Lists all self-hosted runners configured in an organization.\n\nYou must authenticate using an access token with the `admin:org` scope to use this endpoint.",
  input: ActionsListSelfHostedRunnersForOrgInput,
  output: ActionsListSelfHostedRunnersForOrgOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/actions/runners", data) as any
  },
})
