// Issue custom field contexts — This resource represents issue custom field contexts. Use it to: * get, create, update, and delete custom field contexts. * get context to issue types and projects mappings. * get custom field contexts for projects and issue types. * assign custom field contexts to projects. * remove custom field contexts from projects. * add issue types to custom field contexts.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetCustomFieldContextsForProjectsAndIssueTypesInput = z.object({
  fieldId: z.string().describe("The ID of the custom field."),
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
  mappings: z.array(z.object({
  issueTypeId: z.string().describe("The ID of the issue type."),
  projectId: z.string().describe("The ID of the project."),
})).describe("The project and issue type mappings."),
})

export const GetCustomFieldContextsForProjectsAndIssueTypesOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    contextId: z.string().describe("The ID of the custom field context."),
    issueTypeId: z.string().describe("The ID of the issue type."),
    projectId: z.string().describe("The ID of the project."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getCustomFieldContextsForProjectsAndIssueTypes = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of project and issue type mappings and, for each mapping, the ID of a [custom field context](https://confluence.atlassian.com/x/k44fOw) that applies to the project and issue type.\n\nIf there is no custom field context assigned to the project then, if present, the custom field context that applies to all projects is returned if it also applies to the issue type or all issue types. If a custom field context is not found, the returned custom field context ID is `null`.\n\nDuplicate project and issue type mappings cannot be provided in the request.\n\nThe order of the returned values is the same as provided in the request.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetCustomFieldContextsForProjectsAndIssueTypesInput,
  output: GetCustomFieldContextsForProjectsAndIssueTypesOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/field/{fieldId}/context/mapping", data) as any
  },
})
