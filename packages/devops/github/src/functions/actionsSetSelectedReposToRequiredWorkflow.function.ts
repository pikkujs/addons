// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsSetSelectedReposToRequiredWorkflowInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  required_workflow_id: z.number().int().describe("The unique identifier of the required workflow."),
  selected_repository_ids: z.array(z.number().int()).describe("The IDs of the repositories for which the workflow should be required."),
})

export const actionsSetSelectedReposToRequiredWorkflow = pikkuSessionlessFunc({
  description: "Sets the repositories for a required workflow that is required for selected repositories.\n\nYou must authenticate using an access token with the `admin:org` scope to use this endpoint.\n\nFor more information, see \"[Required Workflows](https://docs.github.com/actions/using-workflows/required-workflows).\"",
  input: ActionsSetSelectedReposToRequiredWorkflowInput,
  func: async ({ github }, data) => {
    return github.call("PUT", "/orgs/{org}/actions/required_workflows/{required_workflow_id}/repositories", data)
  },
})
