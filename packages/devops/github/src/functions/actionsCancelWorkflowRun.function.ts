// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ConflictError } from '@pikku/core/errors'

export const ActionsCancelWorkflowRunInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  run_id: z.number().int().describe("The unique identifier of the workflow run."),
})

export const ActionsCancelWorkflowRunOutput = z.record(z.string(), z.unknown()).describe("An object without any properties.")

export const actionsCancelWorkflowRun = pikkuSessionlessFunc({
  description: "Cancels a workflow run using its `id`. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `actions:write` permission to use this endpoint.",
  input: ActionsCancelWorkflowRunInput,
  output: ActionsCancelWorkflowRunOutput,
  errors: [ConflictError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/actions/runs/{run_id}/cancel", data) as any
  },
})
