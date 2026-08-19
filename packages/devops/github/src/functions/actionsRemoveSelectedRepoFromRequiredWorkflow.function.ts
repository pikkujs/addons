// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const ActionsRemoveSelectedRepoFromRequiredWorkflowInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  required_workflow_id: z.number().int().describe("The unique identifier of the required workflow."),
  repository_id: z.number().int().describe("The unique identifier of the repository."),
})

export const actionsRemoveSelectedRepoFromRequiredWorkflow = pikkuSessionlessFunc({
  description: "Removes a repository from a required workflow. To use this endpoint, the required workflow must be configured to run on selected repositories.\n\nYou must authenticate using an access token with the `admin:org` scope to use this endpoint.\n\nFor more information, see \"[Required Workflows](https://docs.github.com/actions/using-workflows/required-workflows).\"",
  input: ActionsRemoveSelectedRepoFromRequiredWorkflowInput,
  errors: [NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/actions/required_workflows/{required_workflow_id}/repositories/{repository_id}", data)
  },
})
