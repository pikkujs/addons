// Issue priorities — This resource represents issue priorities. Use it to get, create and update issue priorities and details for individual issue priorities.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError } from '@pikku/core/errors'

export const SearchPrioritiesInput = z.object({
  startAt: z.string().optional().default("0").describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.string().optional().default("50").describe("The maximum number of items to return per page."),
  id: z.array(z.string()).optional().describe("The list of priority IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=2&id=3`."),
  onlyDefault: z.boolean().optional().default(false).describe("Whether only the default priority is returned."),
})

export const SearchPrioritiesOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    description: z.string().optional().describe("The description of the issue priority."),
    iconUrl: z.string().optional().describe("The URL of the icon for the issue priority."),
    id: z.string().optional().describe("The ID of the issue priority."),
    isDefault: z.boolean().optional().describe("Whether this priority is the default."),
    name: z.string().optional().describe("The name of the issue priority."),
    self: z.string().optional().describe("The URL of the issue priority."),
    statusColor: z.string().optional().describe("The color used to indicate the issue priority."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const searchPriorities = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of priorities. The list can contain all priorities or a subset determined by any combination of these criteria:\n\n *  a list of priority IDs. Any invalid priority IDs are ignored.\n *  whether the field configuration is a default. This returns priorities from company-managed (classic) projects only, as there is no concept of default priorities in team-managed projects.\n\n**[Permissions](#permissions) required:** Permission to access Jira.",
  input: SearchPrioritiesInput,
  output: SearchPrioritiesOutput,
  errors: [UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/priority/search", data) as any
  },
})
