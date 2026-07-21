import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListObjectTriggersInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
  active: z.boolean().optional().describe("Filter by active triggers if true or inactive triggers if false. Example: true"),
  sort_by: z.string().optional().describe("Offset pagination only. Possible values are \"alphabetical\", \"created_at\", \"updated_at\", \"usage_1h\", \"usage_24h\", or \"usage_7d\". Defaults to \"position\". Example: \"position\""),
  sort_order: z.string().optional().describe("One of \"asc\" or \"desc\". Defaults to \"asc\" for alphabetical and position sort, \"desc\" for all others. Example: \"desc\""),
})

export const ListObjectTriggersOutput = z.object({
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

export const listObjectTriggers = pikkuSessionlessFunc({
  description: "Lists all triggers for the specified custom object.\n\n#### Allowed For \n* Agents",
  input: ListObjectTriggersInput,
  output: ListObjectTriggersOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/custom_objects/{custom_object_key}/triggers", data) as any
  },
})
