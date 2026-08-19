// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsDisableWorkflowInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  workflow_id: z.union([z.number().int(), z.string()]).describe("The ID of the workflow. You can also pass the workflow file name as a string."),
})

export const actionsDisableWorkflow = pikkuSessionlessFunc({
  description: "Disables a workflow and sets the `state` of the workflow to `disabled_manually`. You can replace `workflow_id` with the workflow file name. For example, you could use `main.yaml`.\n\nYou must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `actions:write` permission to use this endpoint.",
  input: ActionsDisableWorkflowInput,
  func: async ({ github }, data) => {
    return github.call("PUT", "/repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable", data)
  },
})
