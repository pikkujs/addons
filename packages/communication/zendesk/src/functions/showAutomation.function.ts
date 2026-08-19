import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowAutomationInput = z.object({
  automation_id: z.number().int().describe("The ID of the automation. Example: 25"),
})

export const ShowAutomationOutput = z.object({
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

export const showAutomation = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents",
  input: ShowAutomationInput,
  output: ShowAutomationOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/automations/{automation_id}", data) as any
  },
})
