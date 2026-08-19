import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListSatisfactionRatingsInput = z.object({
  page: z.union([z.number().int(), z.object({
  after: z.string().optional().describe("Cursor token for next page"),
  before: z.string().optional().describe("Cursor token for previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
})]).optional().describe("Pagination parameter. Supports both traditional offset and cursor-based pagination:\n\n- Traditional: `?page=2` (integer page number)\n- Cursor: `?page[size]=50&page[after]=cursor` (deepObject with size, after, before)\n\nThese are mutually exclusive - use one format or the other, not both.\n"),
  per_page: z.number().int().min(1).optional().describe("Number of records to return per page.\n\nNote: Default and maximum values vary by endpoint. Check endpoint-specific\ndocumentation for limits.\n. Example: 50"),
  sort: z.string().optional().describe("Field to sort results by. Prefix with `-` for descending order.\n\nWhen used with cursor pagination, this determines the cursor ordering.\n\nExample: `?sort=name` or `?sort=-created_at`\n. Example: \"name\""),
})

export const ListSatisfactionRatingsOutput = z.object({
  satisfaction_ratings: z.array(z.object({
    assignee_id: z.number().int().describe("The id of agent assigned to at the time of rating"),
    comment: z.string().optional().describe("The comment received with this rating, if available"),
    created_at: z.string().datetime().optional().describe("The time the satisfaction rating got created"),
    group_id: z.number().int().describe("The id of group assigned to at the time of rating"),
    id: z.number().int().optional().describe("Automatically assigned upon creation"),
    reason: z.string().optional().describe("The reason for a bad rating given by the requester in a follow-up question. Satisfaction reasons must be [enabled](https://support.zendesk.com/hc/en-us/articles/4408886173338)"),
    reason_code: z.number().int().optional().describe("The default reasons the user can select from a list menu for giving a negative rating. See [Reason codes](/api-reference/ticketing/ticket-management/satisfaction_reasons/#reason-codes) in the Satisfaction Reasons API. Can only be set on ratings with a `score` of \"bad\". Responses don't include this property"),
    reason_id: z.number().int().optional().describe("id for the reason the user gave a negative rating. Can only be set on ratings with a `score` of \"bad\". To get a descriptive value for the id, use the [Show Reason for Satisfaction Rating](/api-reference/ticketing/ticket-management/satisfaction_reasons/#show-reason-for-satisfaction-rating) endpoint"),
    requester_id: z.number().int().describe("The id of ticket requester submitting the rating"),
    score: z.string().describe("The rating \"offered\", \"unoffered\", \"good\" or \"bad\". For POST requests, only \"good\" or \"bad\" are valid"),
    ticket_id: z.number().int().describe("The id of ticket being rated"),
    updated_at: z.string().datetime().optional().describe("The time the satisfaction rating got updated"),
    url: z.string().optional().describe("The API url of this rating"),
  })).optional(),
})

export const listSatisfactionRatings = pikkuSessionlessFunc({
  description: "#### Allowed For\n* Admins\n\n#### Pagination\n\n* Cursor pagination (recommended)\n* Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\n#### Filters\n\n| Parameter  | Value\n| ---------- | -----\n| score      | offered, unoffered, received, received\\_with\\_comment, received\\_without\\_comment,<br/>good, good\\_with\\_comment, good\\_without\\_comment,<br/>bad, bad\\_with\\_comment, bad\\_without\\_comment\n| start_time | Time of the oldest satisfaction rating, as a [Unix epoch time](https://www.epochconverter.com/)\n| end_time   | Time of the most recent satisfaction rating, as a [Unix epoch time](https://www.epochconverter.com/)\n\nIf you specify an unqualified score such as `good`, the results include all the records with and without comments.\n\nExamples:\n\n* `/api/v2/satisfaction_ratings?score=bad`\n* `/api/v2/satisfaction_ratings?score=bad&start_time=1498151194`\n* `/api/v2/satisfaction_ratings?start_time=1340384793&end_time=1371920793`",
  input: ListSatisfactionRatingsInput,
  output: ListSatisfactionRatingsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/satisfaction_ratings", data) as any
  },
})
