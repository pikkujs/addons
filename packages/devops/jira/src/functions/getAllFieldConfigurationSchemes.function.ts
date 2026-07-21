// Issue field configurations — This resource represents issue field configurations. Use it to get, set, and delete field configurations and field configuration schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetAllFieldConfigurationSchemesInput = z.object({
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
  id: z.array(z.number().int()).optional().describe("The list of field configuration scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`."),
})

export const GetAllFieldConfigurationSchemesOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    description: z.string().optional().describe("The description of the field configuration scheme."),
    id: z.string().describe("The ID of the field configuration scheme."),
    name: z.string().describe("The name of the field configuration scheme."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getAllFieldConfigurationSchemes = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of field configuration schemes.\n\nOnly field configuration schemes used in classic projects are returned.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetAllFieldConfigurationSchemesInput,
  output: GetAllFieldConfigurationSchemesOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/fieldconfigurationscheme", data) as any
  },
})
