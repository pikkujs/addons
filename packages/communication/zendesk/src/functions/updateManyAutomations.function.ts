import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdateManyAutomationsOutput = z.object({
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

export const updateManyAutomations = pikkuSessionlessFunc({
  description: "**Note**: You might be restricted from updating some default automations. If included in a bulk update, the unrestricted automations will be updated.\n\n#### Allowed For\n\n* Agents\n\n#### Request Parameters\n\nThe PUT request expects an `automations` object that lists the automations to update.\n\nEach automation may have the following properties:\n\n| Name     | Mandatory | Description\n| -------- | --------- | -----------\n| id       | yes       | The ID of the automation to update\n| position | no        | The new position of the automation\n| active   | no        | The active status of the automation (true or false)\n\n#### Example Request\n\n```js\n{\n  \"automations\": [\n    {\"id\": 25, \"position\": 3},\n    {\"id\": 23, \"position\": 5},\n    {\"id\": 27, \"position\": 9},\n    {\"id\": 22, \"position\": 7}\n  ]\n}\n```",
  output: UpdateManyAutomationsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("PUT", "/api/v2/automations/update_many") as any
  },
})
