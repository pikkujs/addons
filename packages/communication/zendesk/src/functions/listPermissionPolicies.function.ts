import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListPermissionPoliciesInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
})

export const ListPermissionPoliciesOutput = z.object({
  policies: z.array(z.object({
    id: z.string().optional().describe("The policy ID (e.g., 'custom-role-123' or 'end-user')"),
    records: z.object({
      create: z.object({
        allowed: z.boolean().optional().describe("Whether this action is allowed for the role"),
        rule_id: z.number().int().nullable().optional().describe("Optional access rule ID that further restricts this permission. Use null when no rule applies."),
      }).optional(),
      delete: z.object({
        allowed: z.boolean().optional().describe("Whether this action is allowed for the role"),
        rule_id: z.number().int().nullable().optional().describe("Optional access rule ID that further restricts this permission. Use null when no rule applies."),
      }).optional(),
      read: z.object({
        allowed: z.boolean().optional().describe("Whether this action is allowed for the role"),
        rule_id: z.number().int().nullable().optional().describe("Optional access rule ID that further restricts this permission. Use null when no rule applies."),
      }).optional(),
      update: z.object({
        allowed: z.boolean().optional().describe("Whether this action is allowed for the role"),
        rule_id: z.number().int().nullable().optional().describe("Optional access rule ID that further restricts this permission. Use null when no rule applies."),
      }).optional(),
    }).optional().describe("Permission settings for different record operations"),
    role_name: z.string().optional().describe("The name of the role this policy applies to"),
  })).optional(),
})

export const listPermissionPolicies = pikkuSessionlessFunc({
  description: "Returns a list of permission policies for a custom object.\nPermission policies define what actions (create, read, update, delete) different roles can perform on custom object records.\n#### Allowed For\n* Admins",
  input: ListPermissionPoliciesInput,
  output: ListPermissionPoliciesOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/custom_objects/{custom_object_key}/permission_policies", data) as any
  },
})
