import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SearchObjectTriggersInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
  query: z.string().optional().describe("Query string used to find all triggers with matching title. Example: \"important_trigger\""),
  filter: z.string().optional().describe("JSON-encoded trigger attribute filters for the search. See [Filter](#filter).\n\nExample: `{\"json\":{\"description\":\"Close a ticket\"}}`\n. Example: \"{\\\"json\\\":{\\\"description\\\":\\\"Close a ticket\\\"}}\""),
  active: z.boolean().optional().describe("Filter by active triggers if true or inactive triggers if false. Example: true"),
  sort: z.string().optional().describe("Cursor-based pagination only. Possible values are \"alphabetical\", \"created_at\", \"updated_at\", or \"position\".. Example: \"position\""),
  sort_by: z.string().optional().describe("Offset pagination only. Possible values are \"alphabetical\", \"created_at\", \"updated_at\", \"usage_1h\", \"usage_24h\", or \"usage_7d\". Defaults to \"position\". Example: \"position\""),
  sort_order: z.string().optional().describe("One of \"asc\" or \"desc\". Defaults to \"asc\" for alphabetical and position sort, \"desc\" for all others. Example: \"desc\""),
  include: z.string().optional().describe("A sideload to include in the response. See [Sideloads](#sideloads-2). Example: \"usage_24h\""),
})

export const SearchObjectTriggersOutput = z.object({
  count: z.number().int().optional(),
  next_page: z.string().nullable().optional(),
  previous_page: z.string().nullable().optional(),
  triggers: z.array(z.object({
    actions: z.array(z.object({
      field: z.string().optional(),
      value: z.union([z.string(), z.number().int(), z.array(z.union([z.string(), z.number().int()]))]).optional(),
    })).describe("An array of actions the trigger does when its conditions are met. See [Actions reference](/documentation/ticketing/reference-guides/actions-reference)"),
    active: z.boolean().optional().describe("Whether the trigger is active"),
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
    }).describe("An object that describes the circumstances under which the trigger performs its actions. See [Conditions reference](/documentation/ticketing/reference-guides/conditions-reference)"),
    created_at: z.string().optional().describe("The time the trigger was created"),
    default: z.boolean().optional().describe("Always false for object triggers"),
    description: z.string().optional().describe("The description of the trigger"),
    id: z.number().int().optional().describe("Automatically assigned when created"),
    position: z.number().int().optional().describe("Position of the trigger, determines the order they will execute in"),
    raw_title: z.string().optional().describe("The raw format of the title of the trigger"),
    title: z.string().describe("The title of the trigger"),
    updated_at: z.string().optional().describe("The time of the last update of the trigger"),
    url: z.string().optional().describe("The url of the trigger"),
  })).optional(),
})

export const searchObjectTriggers = pikkuSessionlessFunc({
  description: "Returns a list of object triggers that meet your filter or search criteria.\n\n#### Pagination\n\n* Offset pagination only\n\nSee [Using Offset Pagination](/api-reference/introduction/pagination/#using-offset-pagination).\n\n#### Allowed For\n\n* Agents\n\n#### Filter\n\nUse the `filter` query parameter to filter an object trigger search by one or more attributes. For example, the following `filter` argument filters object triggers by the `title` attribute:\n\n```json\n{\n  \"json\": {\n    \"title\": \"test\"\n  }\n}\n```",
  input: SearchObjectTriggersInput,
  output: SearchObjectTriggersOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/custom_objects/{custom_object_key}/triggers/search", data) as any
  },
})
