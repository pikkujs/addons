import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UpdateAccessRuleInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
  id: z.string().describe("The access rule ID. Example: \"6862342718335\""),
  access_rule: z.object({
  conditions: z.object({
    all: z.array(z.object({
      field: z.string().optional().describe("The field to evaluate in the condition"),
      operator: z.enum(["is", "is_not", "greater_than", "less_than", "greater_than_equal", "less_than_equal", "includes", "not_includes", "matches", "present"]).optional().describe("The comparison operator to use. Not all field types support all operators."),
      value: z.union([z.string(), z.number().int(), z.number(), z.boolean(), z.unknown()]).optional().describe("The value to compare against. Can be null for terminal operators like 'present' and 'not_present'"),
    })).optional().describe("All conditions must be true (AND logic)"),
    any: z.array(z.object({
      field: z.string().optional().describe("The field to evaluate in the condition"),
      operator: z.enum(["is", "is_not", "greater_than", "less_than", "greater_than_equal", "less_than_equal", "includes", "not_includes", "matches", "present"]).optional().describe("The comparison operator to use. Not all field types support all operators."),
      value: z.union([z.string(), z.number().int(), z.number(), z.boolean(), z.unknown()]).optional().describe("The value to compare against. Can be null for terminal operators like 'present' and 'not_present'"),
    })).optional().describe("Any condition can be true (OR logic)"),
  }).optional().describe("The conditions that define when this rule applies"),
  description: z.string().optional().describe("A description of what this access rule does"),
  title: z.string().optional().describe("The title of the access rule"),
}).optional(),
})

export const UpdateAccessRuleOutput = z.object({
  access_rule: z.object({
    conditions: z.object({
      all: z.array(z.object({
        field: z.string().optional().describe("The field to evaluate in the condition"),
        operator: z.enum(["is", "is_not", "greater_than", "less_than", "greater_than_equal", "less_than_equal", "includes", "not_includes", "matches", "present"]).optional().describe("The comparison operator to use. Not all field types support all operators."),
        value: z.union([z.string(), z.number().int(), z.number(), z.boolean(), z.unknown()]).optional().describe("The value to compare against. Can be null for terminal operators like 'present' and 'not_present'"),
      })).optional().describe("All conditions must be true (AND logic)"),
      any: z.array(z.object({
        field: z.string().optional().describe("The field to evaluate in the condition"),
        operator: z.enum(["is", "is_not", "greater_than", "less_than", "greater_than_equal", "less_than_equal", "includes", "not_includes", "matches", "present"]).optional().describe("The comparison operator to use. Not all field types support all operators."),
        value: z.union([z.string(), z.number().int(), z.number(), z.boolean(), z.unknown()]).optional().describe("The value to compare against. Can be null for terminal operators like 'present' and 'not_present'"),
      })).optional().describe("Any condition can be true (OR logic)"),
    }).optional().describe("The conditions that define when this rule applies"),
    created_at: z.string().datetime().optional().describe("When the access rule was created"),
    description: z.string().optional().describe("A description of what this access rule does"),
    id: z.number().int().optional().describe("The access rule ID"),
    title: z.string().optional().describe("The title of the access rule"),
    updated_at: z.string().datetime().optional().describe("When the access rule was last updated"),
  }).optional(),
})

export const updateAccessRule = pikkuSessionlessFunc({
  description: "Updates an existing access rule for a custom object.\n#### Allowed For\n* Admins",
  input: UpdateAccessRuleInput,
  output: UpdateAccessRuleOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PATCH", "/api/v2/custom_objects/{custom_object_key}/access_rules/{id}", data) as any
  },
})
