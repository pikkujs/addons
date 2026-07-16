import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdateAutomationInput = z.object({
  automation_id: z.number().int().describe("The ID of the automation. Example: 25"),
})

export const UpdateAutomationOutput = z.object({
  automation: z.object({
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
  }).optional(),
})

export const updateAutomation = pikkuSessionlessFunc({
  description: "Updates an automation.\n\nUpdated automations must be unique and have at least one condition that is true only once or an action that nullifies at least one of the conditions. Active automations can have overlapping conditions but can't be identical.\n\nThe request must include the following conditions in the `all` array:\n- At least one time-based condition\n- At least one condition that checks one of the following fields: 'status', 'type', 'group_id', 'assignee_id', or 'requester_id'\n\n**Note**: Updating a condition or action updates both the `conditions` and `actions` arrays, clearing all existing values of both arrays. Include all your conditions and actions when updating any condition or action.\n**Note**: You might be restricted from updating some default automations.\n\n#### Allowed For\n\n* Agents",
  input: UpdateAutomationInput,
  output: UpdateAutomationOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/automations/{automation_id}", data) as any
  },
})
