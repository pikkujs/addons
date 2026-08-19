import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListAccessRuleDefinitionsInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
})

export const ListAccessRuleDefinitionsOutput = z.object({
  definitions: z.object({
    conditions_all: z.array(z.object({
      group: z.string().optional(),
      metadata: z.object({
        collection_key: z.string().optional(),
        field_id: z.number().int().nullable().optional(),
        item_key: z.string().optional(),
        source: z.string().nullable().optional(),
        url: z.string().optional(),
      }).optional(),
      nullable: z.boolean().optional(),
      operators: z.array(z.object({
        format: z.string().optional(),
        terminal: z.boolean().optional(),
        title: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      repeatable: z.boolean().optional(),
      subject: z.string().optional(),
      title: z.string().optional(),
      type: z.string().optional(),
      values: z.array(z.object({
        dynamic: z.boolean().optional(),
        enabled: z.boolean().optional(),
        title: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
    })).optional().describe("Available field definitions for 'all' conditions (AND logic)"),
    conditions_any: z.array(z.object({
      group: z.string().optional(),
      metadata: z.object({
        collection_key: z.string().optional(),
        field_id: z.number().int().nullable().optional(),
        item_key: z.string().optional(),
        source: z.string().nullable().optional(),
        url: z.string().optional(),
      }).optional(),
      nullable: z.boolean().optional(),
      operators: z.array(z.object({
        format: z.string().optional(),
        terminal: z.boolean().optional(),
        title: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      repeatable: z.boolean().optional(),
      subject: z.string().optional(),
      title: z.string().optional(),
      type: z.string().optional(),
      values: z.array(z.object({
        dynamic: z.boolean().optional(),
        enabled: z.boolean().optional(),
        title: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
    })).optional().describe("Available field definitions for 'any' conditions (OR logic)"),
  }).optional(),
})

export const listAccessRuleDefinitions = pikkuSessionlessFunc({
  description: "Returns the available field definitions and operators that can be used when creating access rules for a custom object.\nThis endpoint helps you understand what fields are available for filtering and what operators can be applied to each field type.\n#### Allowed For\n* Admins",
  input: ListAccessRuleDefinitionsInput,
  output: ListAccessRuleDefinitionsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/custom_objects/{custom_object_key}/access_rules/definitions", data) as any
  },
})
