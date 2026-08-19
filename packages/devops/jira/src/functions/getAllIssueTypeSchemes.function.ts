// Issue type schemes — This resource represents issue type schemes in classic projects. Use it to: * get issue type schemes and a list of the projects that use them. * associate issue type schemes with projects. * add issue types to issue type schemes. * delete issue types from issue type schemes. * create, update, and delete issue type schemes. * change the order of issue types in issue type schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetAllIssueTypeSchemesInput = z.object({
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
  id: z.array(z.number().int()).optional().describe("The list of issue type schemes IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`."),
  orderBy: z.enum(["name", "-name", "+name", "id", "-id", "+id"]).optional().default("id").describe("[Order](#ordering) the results by a field:\n\n *  `name` Sorts by issue type scheme name.\n *  `id` Sorts by issue type scheme ID."),
  expand: z.string().optional().default("").describe("Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `projects` For each issue type schemes, returns information about the projects the issue type scheme is assigned to.\n *  `issueTypes` For each issue type schemes, returns information about the issueTypes the issue type scheme have."),
  queryString: z.string().optional().default("").describe("String used to perform a case-insensitive partial match with issue type scheme name."),
})

export const GetAllIssueTypeSchemesOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    defaultIssueTypeId: z.string().optional().describe("The ID of the default issue type of the issue type scheme."),
    description: z.string().optional().describe("The description of the issue type scheme."),
    id: z.string().describe("The ID of the issue type scheme."),
    isDefault: z.boolean().optional().describe("Whether the issue type scheme is the default."),
    name: z.string().describe("The name of the issue type scheme."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getAllIssueTypeSchemes = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of issue type schemes.\n\nOnly issue type schemes used in classic projects are returned.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetAllIssueTypeSchemesInput,
  output: GetAllIssueTypeSchemesOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/issuetypescheme", data) as any
  },
})
