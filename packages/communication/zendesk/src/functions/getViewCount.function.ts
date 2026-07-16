import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GetViewCountInput = z.object({
  view_id: z.number().int().describe("The ID of the view. Example: 25"),
})

export const GetViewCountOutput = z.object({
  view_count: z.object({
    active: z.boolean().optional().describe("Only active views if true, inactive views if false, all views if null."),
    fresh: z.boolean().optional().describe("false if the cached data is stale and the system is still loading and caching new data"),
    pretty: z.string().optional().describe("A pretty-printed text approximation of the view count"),
    url: z.string().optional().describe("The API url of the count"),
    value: z.number().int().nullable().optional().describe("The cached number of tickets in the view. Can also be null if the system is loading and caching new data. Not to be confused with 0 tickets"),
    view_id: z.number().int().optional().describe("The id of the view"),
  }).optional(),
})

export const getViewCount = pikkuSessionlessFunc({
  description: "Returns the ticket count for a single view.\n\nThis endpoint is rate limited to 5 requests per minute, per view, per agent.\n\n#### View Counts\n\nThe view count endpoints, Count Tickets in View (this endpoint) and [Count Tickets in Views](#count-tickets-in-views), let you estimate how many tickets remain in a view without having to retrieve the entire view. They're designed to help estimate view size. From a business perspective, accuracy becomes less relevant as view size increases.\n\nTo ensure quality of service, these counts are cached more heavily as the number of tickets in a view grows. For a view with thousands of tickets, you can expect the count to be cached for 60-90 minutes. As a result, the count may not reflect the actual number of tickets in your view.\n\nView counts are represented as JSON objects with the following attributes:\n\n| Name            | Type        | Comment\n| --------------- | ------------| -------\n| view_id         | integer     | The id of the view\n| url             | string      | The API url of the count\n| value           | integer     | The cached number of tickets in the view. Can also be null if the system is loading and caching new data. Not to be confused with 0 tickets\n| pretty          | string      | A pretty-printed text approximation of the view count\n| fresh           | boolean     | false if the cached data is stale and the system is still loading and caching new data\n| active          | boolean     | Only active views if true, inactive views if false, all views if null.\n\n#### Example\n```js\n{\n  \"view_count\": {\n    \"view_id\": 25,\n    \"url\":     \"https://company.zendesk.com/api/v2/views/25/count\",\n    \"value\":   719,\n    \"pretty\":  \"~700\",\n    \"fresh\":   true\n  }\n}\n```",
  input: GetViewCountInput,
  output: GetViewCountOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/views/{view_id}/count", data) as any
  },
})
