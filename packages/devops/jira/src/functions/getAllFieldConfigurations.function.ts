// Issue field configurations — This resource represents issue field configurations. Use it to get, set, and delete field configurations and field configuration schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetAllFieldConfigurationsInput = z.object({
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
  id: z.array(z.number().int()).optional().describe("The list of field configuration IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`."),
  isDefault: z.boolean().optional().default(false).describe("If *true* returns default field configurations only."),
  query: z.string().optional().default("").describe("The query string used to match against field configuration names and descriptions."),
})

export const GetAllFieldConfigurationsOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    description: z.string().max(255).optional().describe("The description of the field configuration."),
    name: z.string().max(255).describe("The name of the field configuration. Must be unique."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getAllFieldConfigurations = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of field configurations. The list can be for all field configurations or a subset determined by any combination of these criteria:\n\n *  a list of field configuration item IDs.\n *  whether the field configuration is a default.\n *  whether the field configuration name or description contains a query string.\n\nOnly field configurations used in company-managed (classic) projects are returned.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetAllFieldConfigurationsInput,
  output: GetAllFieldConfigurationsOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/fieldconfiguration", data) as any
  },
})
