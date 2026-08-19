// Issue resolutions — This resource represents issue resolution values. Use it to obtain a list of all issue resolution values and the details of individual resolution values.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError } from '@pikku/core/errors'

export const SearchResolutionsInput = z.object({
  startAt: z.string().optional().default("0").describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.string().optional().default("50").describe("The maximum number of items to return per page."),
  id: z.array(z.string()).optional().describe("The list of resolutions IDs to be filtered out"),
  onlyDefault: z.boolean().optional().default(false).describe("When set to true, return default only, when IDs provided, if none of them is default, return empty page. Default value is false"),
})

export const SearchResolutionsOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    default: z.boolean().optional(),
    description: z.string().optional(),
    iconUrl: z.string().optional(),
    id: z.string().optional(),
    name: z.string().optional(),
    self: z.string().optional(),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const searchResolutions = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of resolutions. The list can contain all resolutions or a subset determined by any combination of these criteria:\n\n *  a list of resolutions IDs.\n *  whether the field configuration is a default. This returns resolutions from company-managed (classic) projects only, as there is no concept of default resolutions in team-managed projects.\n\n**[Permissions](#permissions) required:** Permission to access Jira.",
  input: SearchResolutionsInput,
  output: SearchResolutionsOutput,
  errors: [UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/resolution/search", data) as any
  },
})
