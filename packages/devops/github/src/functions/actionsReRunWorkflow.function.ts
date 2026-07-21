// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsReRunWorkflowInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  run_id: z.number().int().describe("The unique identifier of the workflow run."),
  enable_debug_logging: z.boolean().optional().default(false).describe("Whether to enable debug logging for the re-run."),
})

export const ActionsReRunWorkflowOutput = z.record(z.string(), z.unknown()).describe("An object without any properties.")

export const actionsReRunWorkflow = pikkuSessionlessFunc({
  description: "Re-runs your workflow run using its `id`. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `actions:write` permission to use this endpoint.",
  input: ActionsReRunWorkflowInput,
  output: ActionsReRunWorkflowOutput,
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/actions/runs/{run_id}/rerun", data) as any
  },
})
