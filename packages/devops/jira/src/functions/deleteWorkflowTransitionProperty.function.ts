// Workflow transition properties — This resource represents workflow transition properties, which provides for storing custom data against a workflow transition. Use it to get, create, and delete workflow transition properties as well as get a list of property keys for a workflow transition. Workflow transition properties are a type of [entity property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteWorkflowTransitionPropertyInput = z.object({
  transitionId: z.number().int().describe("The ID of the transition. To get the ID, view the workflow in text mode in the Jira admin settings. The ID is shown next to the transition."),
  key: z.string().describe("The name of the transition property to delete, also known as the name of the property."),
  workflowName: z.string().describe("The name of the workflow that the transition belongs to."),
  workflowMode: z.enum(["live", "draft"]).optional().describe("The workflow status. Set to `live` for inactive workflows or `draft` for draft workflows. Active workflows cannot be edited."),
})

export const deleteWorkflowTransitionProperty = pikkuSessionlessFunc({
  description: "Deletes a property from a workflow transition. Transition properties are used to change the behavior of a transition. For more information, see [Transition properties](https://confluence.atlassian.com/x/zIhKLg#Advancedworkflowconfiguration-transitionproperties) and [Workflow properties](https://confluence.atlassian.com/x/JYlKLg).\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeleteWorkflowTransitionPropertyInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/workflow/transitions/{transitionId}/properties", data)
  },
})
