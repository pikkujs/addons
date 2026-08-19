import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SearchAutomationsInput = z.object({
  query: z.string().describe("Query string used to find all automations with matching title. Example: \"close\""),
  active: z.boolean().optional().describe("Filter by active automations if true or inactive automations if false. Example: true"),
  sort_by: z.string().optional().describe("Possible values are \"alphabetical\", \"created_at\", \"updated_at\", and \"position\". If unspecified, the automations are sorted by relevance. Example: \"position\""),
  sort_order: z.string().optional().describe("One of \"asc\" or \"desc\". Defaults to \"asc\" for alphabetical and position sort, \"desc\" for all others. Example: \"desc\""),
  include: z.string().optional().describe("A sideload to include in the response. See [Sideloads](#sideloads-2). Example: \"usage_24h\""),
})

export const SearchAutomationsOutput = z.object({
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

export const searchAutomations = pikkuSessionlessFunc({
  description: "#### Pagination\n\n* Offset pagination only\n\nSee [Using Offset Pagination](/api-reference/introduction/pagination/#using-offset-pagination).\n\n#### Allowed For\n\n* Agents\n\n#### Sideloads\n\nThe following sideloads are supported. For more information, see [Side-loading](/documentation/ticketing/using-the-zendesk-api/side_loading/).\n\n| Name             | Will sideload\n| ---------------- | -------------\n| app_installation | The app installation that requires each automation, if present\n| permissions      | The permissions for each automation\n| usage_1h         | The number of tickets processed by an automation in the past hour\n| usage_24h        | The number of tickets processed by an automation in the past day\n| usage_7d         | The number of tickets processed by an automation in the past week\n| usage_30d        | The number of tickets processed by an automation in the past thirty days",
  input: SearchAutomationsInput,
  output: SearchAutomationsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/automations/search", data) as any
  },
})
