// Labels — This resource represents available labels. Use it to get available labels for the global label field.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GetAllLabelsInput = z.object({
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(1000).describe("The maximum number of items to return per page."),
})

export const GetAllLabelsOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.string()).optional().describe("The list of items."),
}).describe("A page of items.")

export const getAllLabels = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of labels.",
  input: GetAllLabelsInput,
  output: GetAllLabelsOutput,
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/label", data) as any
  },
})
