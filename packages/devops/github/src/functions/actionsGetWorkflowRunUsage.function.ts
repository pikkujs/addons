// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsGetWorkflowRunUsageInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  run_id: z.number().int().describe("The unique identifier of the workflow run."),
})

export const ActionsGetWorkflowRunUsageOutput = z.object({
  billable: z.object({
    MACOS: z.object({
      job_runs: z.array(z.object({
        duration_ms: z.number().int(),
        job_id: z.number().int(),
      })).optional(),
      jobs: z.number().int(),
      total_ms: z.number().int(),
    }).optional(),
    UBUNTU: z.object({
      job_runs: z.array(z.object({
        duration_ms: z.number().int(),
        job_id: z.number().int(),
      })).optional(),
      jobs: z.number().int(),
      total_ms: z.number().int(),
    }).optional(),
    WINDOWS: z.object({
      job_runs: z.array(z.object({
        duration_ms: z.number().int(),
        job_id: z.number().int(),
      })).optional(),
      jobs: z.number().int(),
      total_ms: z.number().int(),
    }).optional(),
  }),
  run_duration_ms: z.number().int().optional(),
}).describe("Workflow Run Usage")

export const actionsGetWorkflowRunUsage = pikkuSessionlessFunc({
  description: "Gets the number of billable minutes and total run time for a specific workflow run. Billable minutes only apply to workflows in private repositories that use GitHub-hosted runners. Usage is listed for each GitHub-hosted runner operating system in milliseconds. Any job re-runs are also included in the usage. The usage does not include the multiplier for macOS and Windows runners and is not rounded up to the nearest whole minute. For more information, see \"[Managing billing for GitHub Actions](https://docs.github.com/github/setting-up-and-managing-billing-and-payments-on-github/managing-billing-for-github-actions)\".\n\nAnyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.",
  input: ActionsGetWorkflowRunUsageInput,
  output: ActionsGetWorkflowRunUsageOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/actions/runs/{run_id}/timing", data) as any
  },
})
