import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListActiveTriggersInput = z.object({
  sort: z.string().optional().describe("Cursor-based pagination only. Possible values are \"alphabetical\", \"created_at\", \"updated_at\", or \"position\".. Example: \"position\""),
  sort_by: z.string().optional().describe("Offset pagination only. Possible values are \"alphabetical\", \"created_at\", \"updated_at\", \"usage_1h\", \"usage_24h\", or \"usage_7d\". Defaults to \"position\". Example: \"position\""),
  sort_order: z.string().optional().describe("One of \"asc\" or \"desc\". Defaults to \"asc\" for alphabetical and position sort, \"desc\" for all others. Example: \"desc\""),
  category_id: z.string().optional().describe("Filter triggers by category ID. Example: \"10026\""),
})

export const ListActiveTriggersOutput = z.object({
  count: z.number().int().optional(),
  next_page: z.string().nullable().optional(),
  previous_page: z.string().nullable().optional(),
  triggers: z.array(z.object({
    actions: z.array(z.object({
      field: z.string().optional(),
      value: z.union([z.string(), z.number().int(), z.array(z.union([z.string(), z.number().int()]))]).optional(),
    })).describe("An array of actions describing what the ticket trigger will do. See [Actions reference](/documentation/ticketing/reference-guides/actions-reference)"),
    active: z.boolean().optional().describe("Whether the ticket trigger is active"),
    all: z.array(z.object({
      field: z.string().optional(),
      operator: z.string().optional(),
      value: z.union([z.string(), z.number().int(), z.array(z.union([z.string(), z.number().int()]))]).optional(),
    })).optional().describe("Legacy format for conditions (deprecated). Use conditions.all instead"),
    any: z.array(z.object({
      field: z.string().optional(),
      operator: z.string().optional(),
      value: z.union([z.string(), z.number().int(), z.array(z.union([z.string(), z.number().int()]))]).optional(),
    })).optional().describe("Legacy format for conditions (deprecated). Use conditions.any instead"),
    brand_id: z.number().int().optional().describe("The ID of the brand the ticket trigger belongs to"),
    category: z.object({
      name: z.string().optional(),
      position: z.number().int().optional(),
    }).optional().describe("A category to create and assign to the trigger"),
    category_id: z.string().nullable().optional().describe("The ID of the category the ticket trigger belongs to"),
    conditions: z.object({
      all: z.array(z.object({
        field: z.string().optional(),
        operator: z.string().optional(),
        value: z.union([z.string(), z.number().int(), z.array(z.union([z.string(), z.number().int()]))]).optional(),
      })).nullable().optional(),
      any: z.array(z.object({
        field: z.string().optional(),
        operator: z.string().optional(),
        value: z.union([z.string(), z.number().int(), z.array(z.union([z.string(), z.number().int()]))]).optional(),
      })).nullable().optional(),
    }).optional().describe("An object that describes the circumstances under which the trigger performs its actions. See [Conditions reference](/documentation/ticketing/reference-guides/conditions-reference)"),
    created_at: z.string().optional().describe("The time the ticket trigger was created"),
    default: z.boolean().optional().describe("If true, the ticket trigger is a standard trigger"),
    description: z.string().optional().describe("The description of the ticket trigger"),
    id: z.number().int().optional().describe("Automatically assigned when created"),
    position: z.number().int().optional().describe("Position of the ticket trigger, determines the order they will execute in"),
    raw_title: z.string().optional().describe("The raw format of the title of the ticket trigger"),
    restriction: z.record(z.string(), z.unknown()).nullable().optional().describe("Access restriction for this trigger. A null value allows unrestricted access"),
    title: z.string().describe("The title of the ticket trigger"),
    updated_at: z.string().optional().describe("The time of the last update of the ticket trigger"),
    url: z.string().optional().describe("The url of the ticket trigger"),
  })).optional(),
})

export const listActiveTriggers = pikkuSessionlessFunc({
  description: "Lists all active ticket triggers.\n\n#### Pagination\n\n- Cursor pagination (recommended)\n- Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n#### Allowed For\n\n* Agents\n\n#### Sideloads\n\nThe following sideloads are supported:\n\n| Name             | Will sideload\n| ---------------- | -------------\n| app_installation | The app installation that requires each ticket trigger, if present\n| permissions      | The permissions for each trigger\n| usage_1h         | The number of times each ticket trigger has been used in the past hour\n| usage_24h        | The number of times each ticket trigger has been used in the past day\n| usage_7d         | The number of times each ticket trigger has been used in the past week\n| usage_30d        | The number of times each ticket trigger has been used in the past thirty days",
  input: ListActiveTriggersInput,
  output: ListActiveTriggersOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/triggers/active", data) as any
  },
})
