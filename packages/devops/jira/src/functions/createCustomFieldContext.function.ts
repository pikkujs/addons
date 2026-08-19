// Issue custom field contexts — This resource represents issue custom field contexts. Use it to: * get, create, update, and delete custom field contexts. * get context to issue types and projects mappings. * get custom field contexts for projects and issue types. * assign custom field contexts to projects. * remove custom field contexts from projects. * add issue types to custom field contexts.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, NotFoundError, ConflictError } from '@pikku/core/errors'

export const CreateCustomFieldContextInput = z.object({
  fieldId: z.string().describe("The ID of the custom field."),
  description: z.string().optional().describe("The description of the context."),
  issueTypeIds: z.array(z.string()).optional().describe("The list of issue types IDs for the context. If the list is empty, the context refers to all issue types."),
  name: z.string().describe("The name of the context."),
  projectIds: z.array(z.string()).optional().describe("The list of project IDs associated with the context. If the list is empty, the context is global."),
})

export const CreateCustomFieldContextOutput = z.object({
  description: z.string().optional().describe("The description of the context."),
  id: z.string().optional().describe("The ID of the context."),
  issueTypeIds: z.array(z.string()).optional().describe("The list of issue types IDs for the context. If the list is empty, the context refers to all issue types."),
  name: z.string().describe("The name of the context."),
  projectIds: z.array(z.string()).optional().describe("The list of project IDs associated with the context. If the list is empty, the context is global."),
}).describe("The details of a created custom field context.")

export const createCustomFieldContext = pikkuSessionlessFunc({
  description: "Creates a custom field context.\n\nIf `projectIds` is empty, a global context is created. A global context is one that applies to all project. If `issueTypeIds` is empty, the context applies to all issue types.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: CreateCustomFieldContextInput,
  output: CreateCustomFieldContextOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError, ConflictError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/field/{fieldId}/context", data) as any
  },
})
