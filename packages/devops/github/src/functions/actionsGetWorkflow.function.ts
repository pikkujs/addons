// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsGetWorkflowInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  workflow_id: z.union([z.number().int(), z.string()]).describe("The ID of the workflow. You can also pass the workflow file name as a string."),
})

export const ActionsGetWorkflowOutput = z.object({
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
}).describe("A GitHub Actions workflow")

export const actionsGetWorkflow = pikkuSessionlessFunc({
  description: "Gets a specific workflow. You can replace `workflow_id` with the workflow file name. For example, you could use `main.yaml`. Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.",
  input: ActionsGetWorkflowInput,
  output: ActionsGetWorkflowOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/actions/workflows/{workflow_id}", data) as any
  },
})
