import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const GetUserEntitlementsFullInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
})

export const GetUserEntitlementsFullOutput = z.object({
  entitlements: z.object({
    chat: z.object({
      is_active: z.boolean().optional().describe("Whether the entitlement is active for the product"),
      name: z.string().optional().describe("The role name for the product entitlement"),
    }).optional(),
    explore: z.object({
      is_active: z.boolean().optional().describe("Whether the entitlement is active for the product"),
      name: z.string().optional().describe("The role name for the product entitlement"),
    }).optional(),
    guide: z.object({
      is_active: z.boolean().optional().describe("Whether the entitlement is active for the product"),
      name: z.string().optional().describe("The role name for the product entitlement"),
    }).optional(),
    talk: z.object({
      is_active: z.boolean().optional().describe("Whether the entitlement is active for the product"),
      name: z.string().optional().describe("The role name for the product entitlement"),
    }).optional(),
  }).optional().describe("Entitlements for Zendesk products (Live Chat, Explore, Voice, Knowledge)"),
})

export const getUserEntitlementsFull = pikkuSessionlessFunc({
  description: "Returns the full entitlements for all Zendesk products (Explore, Voice, Knowledge, Live Chat) for the specified user. This includes the role name and active status for each product.\n\n An entitlement is only considered active if both of the following conditions apply: the user has access and the product is active on the account.\n\n#### Allowed For\n\n* Agents\n\n#### OAuth Scopes\n\nRequires one of the following OAuth scopes: `users:read` or `read`",
  input: GetUserEntitlementsFullInput,
  output: GetUserEntitlementsFullOutput,
  errors: [NotFoundError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/users/{user_id}/entitlements/full", data) as any
  },
})
