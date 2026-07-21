// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsDeleteWorkflowRunInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  run_id: z.number().int().describe("The unique identifier of the workflow run."),
})

export const actionsDeleteWorkflowRun = pikkuSessionlessFunc({
  description: "Delete a specific workflow run. Anyone with write access to the repository can use this endpoint. If the repository is\nprivate you must use an access token with the `repo` scope. GitHub Apps must have the `actions:write` permission to use\nthis endpoint.",
  input: ActionsDeleteWorkflowRunInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/actions/runs/{run_id}", data)
  },
})
