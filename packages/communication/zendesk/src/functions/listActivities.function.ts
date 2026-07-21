import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListActivitiesInput = z.object({
  since: z.string().optional().describe("A UTC time in ISO 8601 format to return ticket activities since said date.. Example: \"2013-04-03T16:02:46Z\""),
  page: z.union([z.number().int(), z.object({
  after: z.string().optional().describe("Cursor token for next page"),
  before: z.string().optional().describe("Cursor token for previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
})]).optional().describe("Pagination parameter. Supports both traditional offset and cursor-based pagination:\n\n- Traditional: `?page=2` (integer page number)\n- Cursor: `?page[size]=50&page[after]=cursor` (deepObject with size, after, before)\n\nThese are mutually exclusive - use one format or the other, not both.\n"),
  sort: z.string().optional().describe("Field to sort results by. Prefix with `-` for descending order.\n\nWhen used with cursor pagination, this determines the cursor ordering.\n\nExample: `?sort=name` or `?sort=-created_at`\n. Example: \"name\""),
  per_page: z.number().int().min(1).optional().describe("Number of records to return per page.\n\nNote: Default and maximum values vary by endpoint. Check endpoint-specific\ndocumentation for limits.\n. Example: 50"),
  include: z.string().optional().describe("A comma-separated list of sideloads to include. Supported values: `fields_metadata`.\n. Example: \"fields_metadata\""),
})

export const ListActivitiesOutput = z.object({
  activities: z.array(z.object({
    actor: z.unknown().optional().describe("The full user record of the user responsible for the ticket activity. See [Users](/api-reference/ticketing/users/users/)"),
    actor_id: z.number().int().optional().describe("The id of the user responsible for the ticket activity. An `actor_id` of \"-1\" is a Zendesk system user, such as an automations action."),
    created_at: z.string().optional().describe("When the record was created"),
    id: z.number().int().optional().describe("Automatically assigned on creation"),
    object: z.record(z.string(), z.unknown()).optional().describe("The content of the activity. Can be a ticket, comment, or change."),
    target: z.record(z.string(), z.unknown()).optional().describe("The target of the activity, a ticket."),
    title: z.string().optional().describe("Description of the activity"),
    updated_at: z.string().optional().describe("When the record was last updated"),
    url: z.string().optional().describe("The API url of the activity"),
    user: z.unknown().optional().describe("The full user record of the agent making the request. See [Users](/api-reference/ticketing/users/users/)"),
    user_id: z.number().int().optional().describe("The id of the agent making the request"),
    verb: z.string().optional().describe("The type of activity. Can be \"tickets.assignment\", \"tickets.comment\", or \"tickets.priority_increase\""),
  })).optional(),
  actors: z.array(z.record(z.string(), z.unknown())).optional(),
  count: z.number().int().optional(),
  next_page: z.string().nullable().optional(),
  previous_page: z.string().nullable().optional(),
  users: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const listActivities = pikkuSessionlessFunc({
  description: "Lists ticket activities in the last 30 days affecting the agent making the request.\nAlso sideloads the following arrays of user records:\n\n- actors - All actors involved in the listed activities\n- users - All users involved in the listed activities\n\n#### Pagination\n\n- Cursor pagination (recommended)\n- Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n#### Allowed For\n\n* Agents",
  input: ListActivitiesInput,
  output: ListActivitiesOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/activities", data) as any
  },
})
