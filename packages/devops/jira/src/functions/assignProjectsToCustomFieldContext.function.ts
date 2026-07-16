// Issue custom field contexts — This resource represents issue custom field contexts. Use it to: * get, create, update, and delete custom field contexts. * get context to issue types and projects mappings. * get custom field contexts for projects and issue types. * assign custom field contexts to projects. * remove custom field contexts from projects. * add issue types to custom field contexts.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const AssignProjectsToCustomFieldContextInput = z.object({
  fieldId: z.string().describe("The ID of the custom field."),
  contextId: z.number().int().describe("The ID of the context."),
  projectIds: z.array(z.string()).describe("The IDs of projects."),
})

export const AssignProjectsToCustomFieldContextOutput = z.unknown()

export const assignProjectsToCustomFieldContext = pikkuSessionlessFunc({
  description: "Assigns a custom field context to projects.\n\nIf any project in the request is assigned to any context of the custom field, the operation fails.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: AssignProjectsToCustomFieldContextInput,
  output: AssignProjectsToCustomFieldContextOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/field/{fieldId}/context/{contextId}/project", data) as any
  },
})
