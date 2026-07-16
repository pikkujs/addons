// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError } from '@pikku/core/errors'

export const ActionsReRunJobForWorkflowRunInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  job_id: z.number().int().describe("The unique identifier of the job."),
  enable_debug_logging: z.boolean().optional().default(false).describe("Whether to enable debug logging for the re-run."),
})

export const ActionsReRunJobForWorkflowRunOutput = z.record(z.string(), z.unknown()).describe("An object without any properties.")

export const actionsReRunJobForWorkflowRun = pikkuSessionlessFunc({
  description: "Re-run a job and its dependent jobs in a workflow run. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `actions:write` permission to use this endpoint.",
  input: ActionsReRunJobForWorkflowRunInput,
  output: ActionsReRunJobForWorkflowRunOutput,
  errors: [ForbiddenError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/actions/jobs/{job_id}/rerun", data) as any
  },
})
