// Workflows — This resource represents workflows. Use it to: * get workflows. * create workflows. * delete inactive workflows.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteInactiveWorkflowInput = z.object({
  entityId: z.string().describe("The entity ID of the workflow."),
})

export const deleteInactiveWorkflow = pikkuSessionlessFunc({
  description: "Deletes a workflow.\n\nThe workflow cannot be deleted if it is:\n\n *  an active workflow.\n *  a system workflow.\n *  associated with any workflow scheme.\n *  associated with any draft workflow scheme.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeleteInactiveWorkflowInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/workflow/{entityId}", data)
  },
})
