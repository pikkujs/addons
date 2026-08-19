// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsDownloadJobLogsForWorkflowRunInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  job_id: z.number().int().describe("The unique identifier of the job."),
})

export const actionsDownloadJobLogsForWorkflowRun = pikkuSessionlessFunc({
  description: "Gets a redirect URL to download a plain text file of logs for a workflow job. This link expires after 1 minute. Look\nfor `Location:` in the response header to find the URL for the download. Anyone with read access to the repository can\nuse this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must\nhave the `actions:read` permission to use this endpoint.",
  input: ActionsDownloadJobLogsForWorkflowRunInput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/actions/jobs/{job_id}/logs", data)
  },
})
