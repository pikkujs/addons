// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsReRunWorkflowFailedJobsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  run_id: z.number().int().describe("The unique identifier of the workflow run."),
  enable_debug_logging: z.boolean().optional().default(false).describe("Whether to enable debug logging for the re-run."),
})

export const ActionsReRunWorkflowFailedJobsOutput = z.record(z.string(), z.unknown()).describe("An object without any properties.")

export const actionsReRunWorkflowFailedJobs = pikkuSessionlessFunc({
  description: "Re-run all of the failed jobs and their dependent jobs in a workflow run using the `id` of the workflow run. You must authenticate using an access token with the `repo` scope to use this endpoint.",
  input: ActionsReRunWorkflowFailedJobsInput,
  output: ActionsReRunWorkflowFailedJobsOutput,
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/actions/runs/{run_id}/rerun-failed-jobs", data) as any
  },
})
