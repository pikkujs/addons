// Screen schemes — This resource represents screen schemes in classic projects. Use it to get, create, update, and delete screen schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetScreenSchemesInput = z.object({
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(25).describe("The maximum number of items to return per page."),
  id: z.array(z.number().int()).optional().describe("The list of screen scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`."),
  expand: z.string().optional().default("").describe("Use [expand](#expansion) include additional information in the response. This parameter accepts `issueTypeScreenSchemes` that, for each screen schemes, returns information about the issue type screen scheme the screen scheme is assigned to."),
  queryString: z.string().optional().default("").describe("String used to perform a case-insensitive partial match with screen scheme name."),
  orderBy: z.enum(["name", "-name", "+name", "id", "-id", "+id"]).optional().describe("[Order](#ordering) the results by a field:\n\n *  `id` Sorts by screen scheme ID.\n *  `name` Sorts by screen scheme name."),
})

export const GetScreenSchemesOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    description: z.string().optional().describe("The description of the screen scheme."),
    id: z.number().int().optional().describe("The ID of the screen scheme."),
    issueTypeScreenSchemes: z.object({
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
    }).optional().describe("Details of the issue type screen schemes associated with the screen scheme."),
    name: z.string().optional().describe("The name of the screen scheme."),
    screens: z.object({
      create: z.number().int().optional().describe("The ID of the create screen."),
      default: z.number().int().optional().describe("The ID of the default screen. Required when creating a screen scheme."),
      edit: z.number().int().optional().describe("The ID of the edit screen."),
      view: z.number().int().optional().describe("The ID of the view screen."),
    }).optional().describe("The IDs of the screens for the screen types of the screen scheme."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getScreenSchemes = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of screen schemes.\n\nOnly screen schemes used in classic projects are returned.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetScreenSchemesInput,
  output: GetScreenSchemesOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/screenscheme", data) as any
  },
})
