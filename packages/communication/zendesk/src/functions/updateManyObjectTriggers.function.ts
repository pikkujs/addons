import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdateManyObjectTriggersInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
  triggers: z.array(z.object({
  active: z.boolean().optional().describe("Whether an object trigger is active"),
  id: z.number().int().describe("The id of the object trigger to update"),
  position: z.number().int().optional().describe("The new position of the object trigger"),
})).optional(),
})

export const UpdateManyObjectTriggersOutput = z.object({
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

export const updateManyObjectTriggers = pikkuSessionlessFunc({
  description: "Updates the position or the active status of multiple object triggers. Any additional properties are ignored.\n\n**Note**: You can only bulk-update triggers associated with one object at a time, specified by the `custom_object_key` in the request.\n\n#### Allowed For\n\n* Administrators\n* Agents in custom roles with the `manage_triggers` permission (Enterprise only)\n\n#### Request Parameters\n\nThe PUT request expects a `triggers` object that lists the object triggers to update. All of the specified object trigger `ids` must be associated with a single object.\n\nYou can specify the following properties for each object trigger you're updating:\n\n| Name        | Mandatory | Description\n| --------    | --------- | -----------\n| id          | yes       | The ID of the object trigger to update\n| position    | no        | The new position of the object trigger\n| active      | no        | The active status of the object trigger (true or false)\n\n#### Example Request\n\n```js\n{\n  \"triggers\": [\n    {\"id\": 25, \"position\": 3},\n    {\"id\": 23, \"active\": true},\n    {\"id\": 27, \"position\": 9, \"active\": false},\n    {\"id\": 22, \"position\": 7}\n  ]\n}\n```",
  input: UpdateManyObjectTriggersInput,
  output: UpdateManyObjectTriggersOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/custom_objects/{custom_object_key}/triggers/update_many", data) as any
  },
})
