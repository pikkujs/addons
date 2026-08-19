// Issue custom field contexts — This resource represents issue custom field contexts. Use it to: * get, create, update, and delete custom field contexts. * get context to issue types and projects mappings. * get custom field contexts for projects and issue types. * assign custom field contexts to projects. * remove custom field contexts from projects. * add issue types to custom field contexts.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetProjectContextMappingInput = z.object({
  fieldId: z.string().describe("The ID of the custom field, for example `customfield\\_10000`."),
  contextId: z.array(z.number().int()).optional().describe("The list of context IDs. To include multiple context, separate IDs with ampersand: `contextId=10000&contextId=10001`."),
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
})

export const GetProjectContextMappingOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    contextId: z.string().describe("The ID of the context."),
    isGlobalContext: z.boolean().optional().describe("Whether context is global."),
    projectId: z.string().optional().describe("The ID of the project."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getProjectContextMapping = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of context to project mappings for a custom field. The result can be filtered by `contextId`. Otherwise, all mappings are returned. Invalid IDs are ignored.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetProjectContextMappingInput,
  output: GetProjectContextMappingOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/field/{fieldId}/context/projectmapping", data) as any
  },
})
