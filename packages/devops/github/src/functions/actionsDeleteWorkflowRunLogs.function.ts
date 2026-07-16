// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, InternalServerError } from '@pikku/core/errors'

export const ActionsDeleteWorkflowRunLogsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  run_id: z.number().int().describe("The unique identifier of the workflow run."),
})

export const actionsDeleteWorkflowRunLogs = pikkuSessionlessFunc({
  description: "Deletes all logs for a workflow run. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `actions:write` permission to use this endpoint.",
  input: ActionsDeleteWorkflowRunLogsInput,
  errors: [ForbiddenError, InternalServerError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/actions/runs/{run_id}/logs", data)
  },
})
