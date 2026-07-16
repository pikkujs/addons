// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsGetJobForWorkflowRunInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  job_id: z.number().int().describe("The unique identifier of the job."),
})

export const ActionsGetJobForWorkflowRunOutput = z.object({
  check_run_url: z.string(),
  completed_at: z.string().datetime().nullable().describe("The time that the job finished, in ISO 8601 format."),
  conclusion: z.enum(["success", "failure", "neutral", "cancelled", "skipped", "timed_out", "action_required"]).nullable().describe("The outcome of the job."),
  head_branch: z.string().nullable().describe("The name of the current branch."),
  head_sha: z.string().describe("The SHA of the commit that is being run."),
  html_url: z.string().nullable(),
  id: z.number().int().describe("The id of the job."),
  labels: z.array(z.string()).describe("Labels for the workflow job. Specified by the \"runs_on\" attribute in the action's workflow file."),
  name: z.string().describe("The name of the job."),
  node_id: z.string(),
  run_attempt: z.number().int().optional().describe("Attempt number of the associated workflow run, 1 for first attempt and higher if the workflow was re-run."),
  run_id: z.number().int().describe("The id of the associated workflow run."),
  run_url: z.string(),
  runner_group_id: z.number().int().nullable().describe("The ID of the runner group to which this job has been assigned. (If a runner hasn't yet been assigned, this will be null.)"),
  runner_group_name: z.string().nullable().describe("The name of the runner group to which this job has been assigned. (If a runner hasn't yet been assigned, this will be null.)"),
  runner_id: z.number().int().nullable().describe("The ID of the runner to which this job has been assigned. (If a runner hasn't yet been assigned, this will be null.)"),
  runner_name: z.string().nullable().describe("The name of the runner to which this job has been assigned. (If a runner hasn't yet been assigned, this will be null.)"),
  started_at: z.string().datetime().describe("The time that the job started, in ISO 8601 format."),
  status: z.enum(["queued", "in_progress", "completed"]).describe("The phase of the lifecycle that the job is currently in."),
  steps: z.array(z.object({
    completed_at: z.string().datetime().nullable().optional().describe("The time that the job finished, in ISO 8601 format."),
    conclusion: z.string().nullable().describe("The outcome of the job."),
    name: z.string().describe("The name of the job."),
    number: z.number().int(),
    started_at: z.string().datetime().nullable().optional().describe("The time that the step started, in ISO 8601 format."),
    status: z.enum(["queued", "in_progress", "completed"]).describe("The phase of the lifecycle that the job is currently in."),
  })).optional().describe("Steps in this job."),
  url: z.string(),
  workflow_name: z.string().nullable().describe("The name of the workflow."),
}).describe("Information of a job execution in a workflow run")

export const actionsGetJobForWorkflowRun = pikkuSessionlessFunc({
  description: "Gets a specific job in a workflow run. Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.",
  input: ActionsGetJobForWorkflowRunInput,
  output: ActionsGetJobForWorkflowRunOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/actions/jobs/{job_id}", data) as any
  },
})
