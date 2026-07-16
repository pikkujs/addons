// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsListSelfHostedRunnersForRepoInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ActionsListSelfHostedRunnersForRepoOutput = z.object({
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

export const actionsListSelfHostedRunnersForRepo = pikkuSessionlessFunc({
  description: "Lists all self-hosted runners configured in a repository. You must authenticate using an access token with the `repo` scope to use this endpoint.",
  input: ActionsListSelfHostedRunnersForRepoInput,
  output: ActionsListSelfHostedRunnersForRepoOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/actions/runners", data) as any
  },
})
