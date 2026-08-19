import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { TooManyRequestsError } from '@pikku/core/errors'

export const GetViewCountsInput = z.object({
  ids: z.string().describe("List of view's ids separated by commas.. Example: \"1,2,3\""),
})

export const GetViewCountsOutput = z.object({
  view_counts: z.array(z.object({
    active: z.boolean().optional().describe("Only active views if true, inactive views if false, all views if null."),
    fresh: z.boolean().optional().describe("false if the cached data is stale and the system is still loading and caching new data"),
    pretty: z.string().optional().describe("A pretty-printed text approximation of the view count"),
    url: z.string().optional().describe("The API url of the count"),
    value: z.number().int().nullable().optional().describe("The cached number of tickets in the view. Can also be null if the system is loading and caching new data. Not to be confused with 0 tickets"),
    view_id: z.number().int().optional().describe("The id of the view"),
  })).optional(),
})

export const getViewCounts = pikkuSessionlessFunc({
  description: "Returns the ticket count of each view in a list of views. Accepts up to 20 view ids per request. For the ticket count of a single view, see [Count Tickets in View](#count-tickets-in-view).\n\nOnly returns values for personal and shared views accessible to the user performing the request.\n\n***Note:***\nDue to the asynchronous operation of computing the counts for the requested views, some of the views' counts could be null. This means that the system is still computing the count for that view.\nPeriodically issue another request until all of the views' counts in the response are integers greater than zero. \n\n#### Rate limiting\n\nThis endpoint is rate limited to 6 requests every 1 minute.\n\n#### Allowed For\n\n* Agents",
  input: GetViewCountsInput,
  output: GetViewCountsOutput,
  errors: [TooManyRequestsError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/views/count_many", data) as any
  },
})
