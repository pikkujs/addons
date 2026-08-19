// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ActionsApproveWorkflowRunInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  run_id: z.number().int().describe("The unique identifier of the workflow run."),
})

export const ActionsApproveWorkflowRunOutput = z.record(z.string(), z.unknown()).describe("An object without any properties.")

export const actionsApproveWorkflowRun = pikkuSessionlessFunc({
  description: "Approves a workflow run for a pull request from a public fork of a first time contributor. For more information, see [\"Approving workflow runs from public forks](https://docs.github.com/actions/managing-workflow-runs/approving-workflow-runs-from-public-forks).\"\n\nYou must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `actions:write` permission to use this endpoint.",
  input: ActionsApproveWorkflowRunInput,
  output: ActionsApproveWorkflowRunOutput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/actions/runs/{run_id}/approve", data) as any
  },
})
