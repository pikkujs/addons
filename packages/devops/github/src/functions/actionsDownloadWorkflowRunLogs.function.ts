// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsDownloadWorkflowRunLogsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  run_id: z.number().int().describe("The unique identifier of the workflow run."),
})

export const actionsDownloadWorkflowRunLogs = pikkuSessionlessFunc({
  description: "Gets a redirect URL to download an archive of log files for a workflow run. This link expires after 1 minute. Look for\n`Location:` in the response header to find the URL for the download. Anyone with read access to the repository can use\nthis endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have\nthe `actions:read` permission to use this endpoint.",
  input: ActionsDownloadWorkflowRunLogsInput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/actions/runs/{run_id}/logs", data)
  },
})
