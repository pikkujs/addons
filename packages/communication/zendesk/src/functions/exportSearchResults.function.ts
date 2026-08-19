import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ExportSearchResultsInput = z.object({
  query: z.string().describe("The search query. See [Query basics](#query-basics) above. For details on the query syntax, see the [Zendesk Support search reference](https://support.zendesk.com/hc/en-us/articles/4408886879258). Example: \"https://subdomain.zendesk.com/api/v2/search?query=type:ticket status:closed&sort_by=status&sort_order=desc\""),
  "page[size]": z.number().int().optional().describe("The number of results shown in a page."),
  "page[after]": z.string().optional().describe("The cursor token for fetching the next page of results."),
  "filter[type]": z.string().optional().describe("The object type returned by the export query. Can be `ticket`, `organization`, `user`, or `group`."),
  include: z.string().optional().describe("Sideloads to include in the response. Accepts a comma-separated list of values.\nThe available sideloads depend on the search result types.\n. Example: \"users,organizations\""),
})

export const ExportSearchResultsOutput = z.object({
  facets: z.string().nullable().optional().describe("The facets corresponding to the search query"),
  links: z.object({
    next: z.string().nullable().optional().describe("The url to the next entry via the cursor."),
    prev: z.string().nullable().optional().describe("The url to the previous entry via the cursor."),
  }).optional().describe("The links to the previous and next entries via the cursor ids in the metadata."),
  meta: z.object({
    after_cursor: z.string().nullable().optional().describe("The cursor id for the next object."),
    before_cursor: z.string().nullable().optional().describe("The cursor id for the previous object."),
    has_more: z.boolean().optional().describe("Whether there are more items yet to be returned by the cursor."),
  }).optional().describe("Metadata for the export query response."),
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

export const exportSearchResults = pikkuSessionlessFunc({
  description: "Exports a set of results. See [Query syntax](#query-syntax) for the syntax of the `query` parameter.\n\nUse this endpoint for search queries that will return more than 1000 results. The result set is ordered only by the `created_at` attribute.\n\nThe search only returns results of a single object type. The following object types are supported: ticket, organization, user, or group.\n\nYou must specify the type in the `filter[type]` parameter. Searches with type in the query string will result in an error.\n\n#### Allowed For\n\n- Agents\n\n#### Pagination\n\n- Cursor pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 1000 records per page. The number of results shown in a page is determined by the `page[size]` parameter.\n\n**Note**: You may experience a speed reduction or a timeout if you request 1000 results per page and you have many archived tickets in the results. Try reducing the number of results per page. We recommend 100 results per page.\n\nThe cursor specified by the `after_cursor` property in a response expires after one hour.\n\nFor more information on cursor-based pagination, see the following articles:\n\n- [Comparing cursor pagination and offset pagination](/documentation/developer-tools/pagination/comparing-cursor-pagination-and-offset-pagination)\n- [Paginating through lists using cursor pagination](/documentation/developer-tools/pagination/paginating-through-lists-using-cursor-pagination)\n\n#### Export Search Results Limits\n\nThis API endpoint is rate-limited to 100 requests per minute per account. The limit also counts towards the global API rate limit.\n\n#### Response Format\n\n| Name                  | Type                 | Comment\n| --------------------- | ---------------------| --------------------\n| links[next]           | string               | URL to the next page of results\n| meta[has_more]        | string               | Boolean indicating if there are more results\n| meta[after_cursor]    | string               | Cursor object returned from the Search Service\n| results               | array                | May consist of tickets, users, groups, or organizations, as specified by the `filter_type` parameter\n\nThe response is similar to the response of `GET /api/v2/search?`, with a few changes:\n\n* `links` - Has the following nested properties: `prev` and `next`. These replace the `next_page` and `prev_page` links. The `prev` property is always null because backward pagination is not supported. The `next` property may include an auto-generated link to the next page of results.\n* `meta` - Has the following nested properties: `has_more` and `after_cursor`. The `has_more` property indicates whether the next page has more results. The `after_cursor` property is the cursor used to paginate to the next page. It expires after one hour.\n\nThere's no `count` property.",
  input: ExportSearchResultsInput,
  output: ExportSearchResultsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/search/export", data) as any
  },
})
