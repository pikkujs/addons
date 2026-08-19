// Issue custom field contexts — This resource represents issue custom field contexts. Use it to: * get, create, update, and delete custom field contexts. * get context to issue types and projects mappings. * get custom field contexts for projects and issue types. * assign custom field contexts to projects. * remove custom field contexts from projects. * add issue types to custom field contexts.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const RemoveIssueTypesFromContextInput = z.object({
  fieldId: z.string().describe("The ID of the custom field."),
  contextId: z.number().int().describe("The ID of the context."),
  issueTypeIds: z.array(z.string()).describe("The list of issue type IDs."),
})

export const RemoveIssueTypesFromContextOutput = z.unknown()

export const removeIssueTypesFromContext = pikkuSessionlessFunc({
  description: "Removes issue types from a custom field context.\n\nA custom field context without any issue types applies to all issue types.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: RemoveIssueTypesFromContextInput,
  output: RemoveIssueTypesFromContextOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/field/{fieldId}/context/{contextId}/issuetype/remove", data) as any
  },
})
