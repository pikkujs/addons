import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListSearchResultsInput = z.object({
  query: z.string().describe("The search query. See [Query basics](#query-basics) above. For details on the query syntax, see the [Zendesk Support search reference](https://support.zendesk.com/hc/en-us/articles/4408886879258). Example: \"https://subdomain.zendesk.com/api/v2/search?query=type:ticket status:closed&sort_by=status&sort_order=desc\""),
  sort_by: z.string().optional().describe("One of `updated_at`, `created_at`, `priority`, `status`, or `ticket_type`. Defaults to sorting by relevance"),
  sort_order: z.string().optional().describe("One of `asc` or `desc`.  Defaults to `desc`"),
  include: z.string().optional().describe("Sideloads to include in the response. Accepts a comma-separated list of values.\nThe available sideloads depend on the search result types.\n. Example: \"users,organizations\""),
})

export const ListSearchResultsOutput = z.object({
  count: z.number().int().optional().describe("The number of resources returned by the query corresponding to this page of results in the paginated response"),
  facets: z.string().nullable().optional().describe("The facets corresponding to the search query"),
  next_page: z.string().nullable().optional().describe("URL to the next page of results"),
  previous_page: z.string().nullable().optional().describe("URL to the previous page of results"),
  results: z.array(z.object({
    created_at: z.string().optional().describe("When the resource was created"),
    default: z.boolean().optional().describe("Flag to indicate whether this is the default resource"),
    deleted: z.boolean().optional().describe("Flag to indicate whether or not resource has been deleted"),
    description: z.string().optional().describe("The description of the resource"),
    id: z.number().int().optional().describe("The ID of the resource"),
    name: z.string().optional().describe("The name of the resource"),
    result_type: z.string().optional().describe("The type of the resource"),
    updated_at: z.string().optional().describe("When the resource was last updated"),
    url: z.string().optional().describe("The url of the resource"),
  })).optional().describe("May consist of tickets, users, groups, or organizations, as specified by the `result_type` property in each result object"),
})

export const listSearchResults = pikkuSessionlessFunc({
  description: "Returns the search results. See [Query syntax](#query-syntax) for details on the `query` parameter.\n\nUse the ampersand character (&) to append the `sort_by` or `sort_order` parameters to the URL.\n\nFor examples, see [Searching with Zendesk API](/documentation/ticketing/using-the-zendesk-api/searching-with-the-zendesk-api).\n\nThis endpoint has its own rate limit. The rate limit counts towards the global API rate limit. See [Limits](#limits).\n\n#### Allowed For\n\n* Agents\n\n#### Pagination\n\n* Offset pagination only\n\nOffset pagination may result in duplicate results when paging. You can also use the\n[Export Search Results](/api-reference/ticketing/ticket-management/search/#export-search-results) endpoint, which\nuses cursor-based pagination and doesn't return duplicate results. See\n[Using cursor pagination](/api-reference/introduction/pagination/#using-cursor-pagination) for more information.\n\n\n#### Errors JSON Format\n\nErrors are represented as JSON objects which have the following keys:\n\n| Name                  | Type                 | Comment\n| --------------------- | ---------------------| --------------------\n| error                 | string               | The type of error. Examples: \"unavailable\", \"invalid\"\n| description           | string               |\n\n##### Example Error\n```js\n{\n  \"error\": \"unavailable\",\n  \"description\": \"Sorry, we could not complete your search query. Please try again in a moment.\"\n}\n```",
  input: ListSearchResultsInput,
  output: ListSearchResultsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/search", data) as any
  },
})
