import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UpdateManyTriggersInput = z.object({
  triggers: z.array(z.object({
  active: z.boolean().optional().describe("The active status of the ticket trigger (true or false)"),
  category_id: z.string().optional().describe("The ID of the new category the ticket trigger is to be moved to"),
  id: z.number().int().describe("The ID of the ticket trigger to update"),
  position: z.number().int().optional().describe("The new position of the ticket trigger"),
})).max(100).optional(),
})

export const UpdateManyTriggersOutput = z.object({
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

export const updateManyTriggers = pikkuSessionlessFunc({
  description: "Updates the position or the active status of multiple ticket triggers. Any additional properties are ignored.\n\n#### Allowed For\n\n* Agents\n\n#### Request Parameters\n\nThe PUT request expects a `triggers` object that lists the ticket triggers to update.\n\nA maximum of 100 ticket triggers can be updated per request.\n\nEach ticket trigger may have the following properties:\n\n| Name        | Mandatory | Description\n| --------    | --------- | -----------\n| id          | yes       | The ID of the ticket trigger to update\n| position    | no        | The new position of the ticket trigger\n| active      | no        | The active status of the ticket trigger (true or false)\n| category_id | no        | The ID of the new category the ticket trigger is to be moved to\n\n#### Example Request\n\n```js\n{\n  \"triggers\": [\n    {\"id\": 25, \"position\": 3},\n    {\"id\": 23, \"position\": 5},\n    {\"id\": 27, \"position\": 9},\n    {\"id\": 22, \"position\": 7}\n  ]\n}\n```",
  input: UpdateManyTriggersInput,
  output: UpdateManyTriggersOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/triggers/update_many", data) as any
  },
})
