// Issue type screen schemes — This resource represents issue type screen schemes. Use it to: * get issue type screen schemes and a list of the projects that use them. * create issue type screen schemes. * update issue type screen schemes. * delete issue type screen schemes. * associate issue type screen schemes with projects. * append issue type to screen scheme mappings to issue type screen schemes. * remove issue type to screen scheme mappings from issue type screen schemes. * update default screen scheme of issue type screen scheme.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetIssueTypeScreenSchemesInput = z.object({
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
  id: z.array(z.number().int()).optional().describe("The list of issue type screen scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`."),
  queryString: z.string().optional().default("").describe("String used to perform a case-insensitive partial match with issue type screen scheme name."),
  orderBy: z.enum(["name", "-name", "+name", "id", "-id", "+id"]).optional().default("id").describe("[Order](#ordering) the results by a field:\n\n *  `name` Sorts by issue type screen scheme name.\n *  `id` Sorts by issue type screen scheme ID."),
  expand: z.string().optional().default("").describe("Use [expand](#expansion) to include additional information in the response. This parameter accepts `projects` that, for each issue type screen schemes, returns information about the projects the issue type screen scheme is assigned to."),
})

export const GetIssueTypeScreenSchemesOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    description: z.string().optional().describe("The description of the issue type screen scheme."),
    id: z.string().describe("The ID of the issue type screen scheme."),
    name: z.string().describe("The name of the issue type screen scheme."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getIssueTypeScreenSchemes = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of issue type screen schemes.\n\nOnly issue type screen schemes used in classic projects are returned.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetIssueTypeScreenSchemesInput,
  output: GetIssueTypeScreenSchemesOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/issuetypescreenscheme", data) as any
  },
})
