import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListAutomationsInput = z.object({
  page: z.union([z.number().int(), z.object({
  after: z.string().optional().describe("Cursor token for next page"),
  before: z.string().optional().describe("Cursor token for previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
})]).optional().describe("Pagination parameter. Supports both traditional offset and cursor-based pagination:\n\n- Traditional: `?page=2` (integer page number)\n- Cursor: `?page[size]=50&page[after]=cursor` (deepObject with size, after, before)\n\nThese are mutually exclusive - use one format or the other, not both.\n"),
  per_page: z.number().int().min(1).optional().describe("Number of records to return per page.\n\nNote: Default and maximum values vary by endpoint. Check endpoint-specific\ndocumentation for limits.\n. Example: 50"),
  sort: z.string().optional().describe("Field to sort results by. Prefix with `-` for descending order.\n\nWhen used with cursor pagination, this determines the cursor ordering.\n\nExample: `?sort=name` or `?sort=-created_at`\n. Example: \"name\""),
  active: z.boolean().optional().describe("Filter by active automations if true or inactive automations if false. Example: true"),
  include: z.string().optional().describe("A sideload to include in the response. See [Sideloads](#sideloads-2). Example: \"usage_24h\""),
})

export const ListAutomationsOutput = z.object({
  automations: z.array(z.object({
    actions: z.array(z.object({
      field: z.string().optional().describe("The name of a ticket field to modify"),
      value: z.string().optional().describe("The new value of the field"),
    })).optional().describe("An object describing what the automation will do. See [Actions reference](/documentation/ticketing/reference-guides/actions-reference)"),
    active: z.boolean().optional().describe("Whether the automation is active"),
    conditions: z.object({
      all: z.array(z.object({
        field: z.string().optional().describe("The name of a ticket field"),
        operator: z.string().optional().describe("A comparison operator"),
        value: z.string().optional().describe("The value of a ticket field"),
      })).optional().describe("Logical AND. Tickets must fulfill all of the conditions to be considered matching"),
      any: z.array(z.object({
        field: z.string().optional().describe("The name of a ticket field"),
        operator: z.string().optional().describe("A comparison operator"),
        value: z.string().optional().describe("The value of a ticket field"),
      })).optional().describe("Logical OR. Tickets may satisfy any of the conditions to be considered matching"),
    }).optional().describe("An object that describes the conditions under which the automation will execute. See [Conditions reference](/documentation/ticketing/reference-guides/conditions-reference)"),
    created_at: z.string().datetime().optional().describe("The time the automation was created"),
    default: z.boolean().optional().describe("If true, the automation is a default automation"),
    id: z.number().int().optional().describe("Automatically assigned when created"),
    position: z.number().int().optional().describe("The position of the automation which specifies the order it will be executed"),
    raw_title: z.string().optional().describe("The raw title of the automation"),
    title: z.string().optional().describe("The title of the automation"),
    updated_at: z.string().datetime().optional().describe("The time of the last update of the automation"),
  })).optional(),
  count: z.number().int().optional(),
  next_page: z.string().nullable().optional(),
  previous_page: z.string().nullable().optional(),
})

export const listAutomations = pikkuSessionlessFunc({
  description: "Lists all automations for the current account.\n\n#### Allowed For\n\n* Agents\n\n#### Available Parameters\n\nYou can pass in any combination of the following optional filters:\n\n| Name       | Type    | Comment\n| ---------- | ------- | -------\n| active     | boolean | Only active automations if true, inactive automations if false\n| sort_by    | string  | Possible values are \"alphabetical\", \"created_at\", \"updated_at\", \"usage_1h\", \"usage_24h\", or \"usage_7d\". Defaults to \"position\"\n| sort_order | string  | One of \"asc\" or \"desc\". Defaults to \"asc\" for alphabetical and position sort, \"desc\" for all others\n\n#### Sideloads\n\nThe following sideloads are supported. The usage sideloads are only supported on the Support Professional or Suite Growth plan or above.\n\n| Name             | Will sideload\n| ---------------- | -------------\n| app_installation | The app installation that requires each automation, if present\n| permissions      | The permissions for each automation\n| usage_1h         | The number of tickets processed by an automation in the past hour\n| usage_24h        | The number of tickets processed by an automation in the past day\n| usage_7d         | The number of tickets processed by an automation in the past week\n| usage_30d        | The number of tickets processed by an automation in the past thirty days\n\n#### Pagination\n\n- Cursor pagination (recommended)\n- Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.",
  input: ListAutomationsInput,
  output: ListAutomationsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/automations", data) as any
  },
})
