// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsDownloadWorkflowRunAttemptLogsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  run_id: z.number().int().describe("The unique identifier of the workflow run."),
  attempt_number: z.number().int().describe("The attempt number of the workflow run."),
})

export const actionsDownloadWorkflowRunAttemptLogs = pikkuSessionlessFunc({
  description: "Gets a redirect URL to download an archive of log files for a specific workflow run attempt. This link expires after\n1 minute. Look for `Location:` in the response header to find the URL for the download. Anyone with read access to\nthe repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope.\nGitHub Apps must have the `actions:read` permission to use this endpoint.",
  input: ActionsDownloadWorkflowRunAttemptLogsInput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/logs", data)
  },
})
