// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsCreateWorkflowDispatchInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  workflow_id: z.union([z.number().int(), z.string()]).describe("The ID of the workflow. You can also pass the workflow file name as a string."),
  inputs: z.record(z.string(), z.string()).optional().describe("Input keys and values configured in the workflow file. The maximum number of properties is 10. Any default properties configured in the workflow file will be used when `inputs` are omitted."),
  ref: z.string().describe("The git reference for the workflow. The reference can be a branch or tag name."),
})

export const actionsCreateWorkflowDispatch = pikkuSessionlessFunc({
  description: "You can use this endpoint to manually trigger a GitHub Actions workflow run. You can replace `workflow_id` with the workflow file name. For example, you could use `main.yaml`.\n\nYou must configure your GitHub Actions workflow to run when the [`workflow_dispatch` webhook](/developers/webhooks-and-events/webhook-events-and-payloads#workflow_dispatch) event occurs. The `inputs` are configured in the workflow file. For more information about how to configure the `workflow_dispatch` event in the workflow file, see \"[Events that trigger workflows](/actions/reference/events-that-trigger-workflows#workflow_dispatch).\"\n\nYou must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `actions:write` permission to use this endpoint. For more information, see \"[Creating a personal access token for the command line](https://docs.github.com/articles/creating-a-personal-access-token-for-the-command-line).\"",
  input: ActionsCreateWorkflowDispatchInput,
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches", data)
  },
})
