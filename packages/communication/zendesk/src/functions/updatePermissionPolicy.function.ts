import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdatePermissionPolicyInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
  id: z.string().describe("The permission policy ID. Use `custom-role-{custom_role_id}` for custom roles or `end-user` for the end user system role.\n. Example: \"custom-role-6678128886399\""),
  policy: z.object({
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
}).optional(),
})

export const UpdatePermissionPolicyOutput = z.object({
  policy: z.object({
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
  }).optional(),
})

export const updatePermissionPolicy = pikkuSessionlessFunc({
  description: "Updates a permission policy for a specific role on a custom object.\nDefine what actions (create, read, update, delete) the role can perform and optionally specify access rules.\n#### Allowed For\n* Admins",
  input: UpdatePermissionPolicyInput,
  output: UpdatePermissionPolicyOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PATCH", "/api/v2/custom_objects/{custom_object_key}/permission_policies/{id}", data) as any
  },
})
