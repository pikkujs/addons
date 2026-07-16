import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateObjectTriggerInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
  trigger: z.object({
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
}).optional(),
})

export const CreateObjectTriggerOutput = z.object({
  trigger: z.object({
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
  }).optional(),
})

export const createObjectTrigger = pikkuSessionlessFunc({
  description: "Creates a new object trigger for a specified object.\n\n#### Allowed For\n\n* Administrators\n* Agents in custom roles with the `manage_triggers` permission (Enterprise only)",
  input: CreateObjectTriggerInput,
  output: CreateObjectTriggerOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/custom_objects/{custom_object_key}/triggers", data) as any
  },
})
