// Workflow transition properties — This resource represents workflow transition properties, which provides for storing custom data against a workflow transition. Use it to get, create, and delete workflow transition properties as well as get a list of property keys for a workflow transition. Workflow transition properties are a type of [entity property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const CreateWorkflowTransitionPropertyInput = z.object({
  transitionId: z.number().int().describe("The ID of the transition. To get the ID, view the workflow in text mode in the Jira admin settings. The ID is shown next to the transition."),
  key: z.string().describe("The key of the property being added, also known as the name of the property. Set this to the same value as the `key` defined in the request body."),
  workflowName: z.string().describe("The name of the workflow that the transition belongs to."),
  workflowMode: z.enum(["live", "draft"]).optional().default("live").describe("The workflow status. Set to *live* for inactive workflows or *draft* for draft workflows. Active workflows cannot be edited."),
  value: z.string().describe("The value of the transition property."),
})

export const CreateWorkflowTransitionPropertyOutput = z.object({
  id: z.string().optional().describe("The ID of the transition property."),
  key: z.string().optional().describe("The key of the transition property. Also known as the name of the transition property."),
  value: z.string().describe("The value of the transition property."),
}).describe("Details about the server Jira is running on.")

export const createWorkflowTransitionProperty = pikkuSessionlessFunc({
  description: "Adds a property to a workflow transition. Transition properties are used to change the behavior of a transition. For more information, see [Transition properties](https://confluence.atlassian.com/x/zIhKLg#Advancedworkflowconfiguration-transitionproperties) and [Workflow properties](https://confluence.atlassian.com/x/JYlKLg).\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: CreateWorkflowTransitionPropertyInput,
  output: CreateWorkflowTransitionPropertyOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/workflow/transitions/{transitionId}/properties", data) as any
  },
})
