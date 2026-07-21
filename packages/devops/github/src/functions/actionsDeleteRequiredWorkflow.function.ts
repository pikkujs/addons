// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsDeleteRequiredWorkflowInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  required_workflow_id: z.number().int().describe("The unique identifier of the required workflow."),
})

export const actionsDeleteRequiredWorkflow = pikkuSessionlessFunc({
  description: "Deletes a required workflow configured in an organization.\n\nYou must authenticate using an access token with the `admin:org` scope to use this endpoint.\n\nFor more information, see \"[Required Workflows](https://docs.github.com/actions/using-workflows/required-workflows).\"",
  input: ActionsDeleteRequiredWorkflowInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/actions/required_workflows/{required_workflow_id}", data)
  },
})
