import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PreviewCountOutput = z.object({
  view_count: z.object({
    active: z.boolean().optional().describe("Only active views if true, inactive views if false, all views if null."),
    fresh: z.boolean().optional().describe("false if the cached data is stale and the system is still loading and caching new data"),
    pretty: z.string().optional().describe("A pretty-printed text approximation of the view count"),
    url: z.string().optional().describe("The API url of the count"),
    value: z.number().int().nullable().optional().describe("The cached number of tickets in the view. Can also be null if the system is loading and caching new data. Not to be confused with 0 tickets"),
    view_id: z.number().int().optional().describe("The id of the view"),
  }).optional(),
})

export const previewCount = pikkuSessionlessFunc({
  description: "Returns the ticket count for a single preview.\n\n#### Allowed For\n\n* Agents",
  output: PreviewCountOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("POST", "/api/v2/views/preview/count") as any
  },
})
