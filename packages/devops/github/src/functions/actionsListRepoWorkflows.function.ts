// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsListRepoWorkflowsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ActionsListRepoWorkflowsOutput = z.object({
  total_count: z.number().int(),
  workflows: z.array(z.object({
    badge_url: z.string(),
    created_at: z.string().datetime(),
    deleted_at: z.string().datetime().optional(),
    html_url: z.string(),
    id: z.number().int(),
    name: z.string(),
    node_id: z.string(),
    path: z.string(),
    state: z.enum(["active", "deleted", "disabled_fork", "disabled_inactivity", "disabled_manually"]),
    updated_at: z.string().datetime(),
    url: z.string(),
  })),
})

export const actionsListRepoWorkflows = pikkuSessionlessFunc({
  description: "Lists the workflows in a repository. Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.",
  input: ActionsListRepoWorkflowsInput,
  output: ActionsListRepoWorkflowsOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/actions/workflows", data) as any
  },
})
