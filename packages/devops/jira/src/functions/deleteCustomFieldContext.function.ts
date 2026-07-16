// Issue custom field contexts — This resource represents issue custom field contexts. Use it to: * get, create, update, and delete custom field contexts. * get context to issue types and projects mappings. * get custom field contexts for projects and issue types. * assign custom field contexts to projects. * remove custom field contexts from projects. * add issue types to custom field contexts.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteCustomFieldContextInput = z.object({
  fieldId: z.string().describe("The ID of the custom field."),
  contextId: z.number().int().describe("The ID of the context."),
})

export const DeleteCustomFieldContextOutput = z.unknown()

export const deleteCustomFieldContext = pikkuSessionlessFunc({
  description: "Deletes a [ custom field context](https://confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html).\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeleteCustomFieldContextInput,
  output: DeleteCustomFieldContextOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/field/{fieldId}/context/{contextId}", data) as any
  },
})
