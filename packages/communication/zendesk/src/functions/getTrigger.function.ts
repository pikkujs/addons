import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GetTriggerInput = z.object({
  trigger_id: z.number().int().describe("The ID of the trigger. Example: 198"),
})

export const GetTriggerOutput = z.object({
  trigger: z.object({
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
  }).optional(),
})

export const getTrigger = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents\n\nThe Via Type value is a number instead of a text string. See [Via types reference](/documentation/ticketing/reference-guides/via-types/) for the keys.",
  input: GetTriggerInput,
  output: GetTriggerOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/triggers/{trigger_id}", data) as any
  },
})
