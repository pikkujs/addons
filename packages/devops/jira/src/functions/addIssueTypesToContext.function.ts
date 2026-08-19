// Issue custom field contexts — This resource represents issue custom field contexts. Use it to: * get, create, update, and delete custom field contexts. * get context to issue types and projects mappings. * get custom field contexts for projects and issue types. * assign custom field contexts to projects. * remove custom field contexts from projects. * add issue types to custom field contexts.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError } from '@pikku/core/errors'

export const AddIssueTypesToContextInput = z.object({
  fieldId: z.string().describe("The ID of the custom field."),
  contextId: z.number().int().describe("The ID of the context."),
  issueTypeIds: z.array(z.string()).describe("The list of issue type IDs."),
})

export const AddIssueTypesToContextOutput = z.unknown()

export const addIssueTypesToContext = pikkuSessionlessFunc({
  description: "Adds issue types to a custom field context, appending the issue types to the issue types list.\n\nA custom field context without any issue types applies to all issue types. Adding issue types to such a custom field context would result in it applying to only the listed issue types.\n\nIf any of the issue types exists in the custom field context, the operation fails and no issue types are added.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: AddIssueTypesToContextInput,
  output: AddIssueTypesToContextOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/field/{fieldId}/context/{contextId}/issuetype", data) as any
  },
})
