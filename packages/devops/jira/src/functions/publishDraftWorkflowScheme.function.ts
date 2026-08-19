// Workflow scheme drafts — This resource represents draft workflow schemes. Use it to manage drafts of workflow schemes. A workflow scheme maps issue types to workflows. A workflow scheme can be associated with one or more projects, which enables the projects to use the workflow-issue type mappings. Active workflow schemes (workflow schemes that are used by projects) cannot be edited. Editing an active workflow scheme creates a draft copy of the scheme. The draft workflow scheme can then be edited and published (replacing the active scheme). See [Configuring workflow schemes](https://confluence.atlassian.com/x/tohKLg) for more information.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const PublishDraftWorkflowSchemeInput = z.object({
  id: z.number().int().describe("The ID of the workflow scheme that the draft belongs to."),
  validateOnly: z.boolean().optional().default(false).describe("Whether the request only performs a validation."),
  statusMappings: z.array(z.object({
  issueTypeId: z.string().describe("The ID of the issue type."),
  newStatusId: z.string().describe("The ID of the new status."),
  statusId: z.string().describe("The ID of the status."),
})).optional().describe("Mappings of statuses to new statuses for issue types."),
})

export const publishDraftWorkflowScheme = pikkuSessionlessFunc({
  description: "Publishes a draft workflow scheme.\n\nWhere the draft workflow includes new workflow statuses for an issue type, mappings are provided to update issues with the original workflow status to the new workflow status.\n\nThis operation is [asynchronous](#async). Follow the `location` link in the response to determine the status of the task and use [Get task](#api-rest-api-3-task-taskId-get) to obtain updates.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: PublishDraftWorkflowSchemeInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/workflowscheme/{id}/draft/publish", data)
  },
})
