// Issue custom field contexts — This resource represents issue custom field contexts. Use it to: * get, create, update, and delete custom field contexts. * get context to issue types and projects mappings. * get custom field contexts for projects and issue types. * assign custom field contexts to projects. * remove custom field contexts from projects. * add issue types to custom field contexts.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetContextsForFieldInput = z.object({
  fieldId: z.string().describe("The ID of the custom field."),
  isAnyIssueType: z.boolean().optional().describe("Whether to return contexts that apply to all issue types."),
  isGlobalContext: z.boolean().optional().describe("Whether to return contexts that apply to all projects."),
  contextId: z.array(z.number().int()).optional().describe("The list of context IDs. To include multiple contexts, separate IDs with ampersand: `contextId=10000&contextId=10001`."),
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
})

export const GetContextsForFieldOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    description: z.string().describe("The description of the context."),
    id: z.string().describe("The ID of the context."),
    isAnyIssueType: z.boolean().describe("Whether the context apply to all issue types."),
    isGlobalContext: z.boolean().describe("Whether the context is global."),
    name: z.string().describe("The name of the context."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getContextsForField = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of [ contexts](https://confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html) for a custom field. Contexts can be returned as follows:\n\n *  With no other parameters set, all contexts.\n *  By defining `id` only, all contexts from the list of IDs.\n *  By defining `isAnyIssueType`, limit the list of contexts returned to either those that apply to all issue types (true) or those that apply to only a subset of issue types (false)\n *  By defining `isGlobalContext`, limit the list of contexts return to either those that apply to all projects (global contexts) (true) or those that apply to only a subset of projects (false).\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetContextsForFieldInput,
  output: GetContextsForFieldOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/field/{fieldId}/context", data) as any
  },
})
