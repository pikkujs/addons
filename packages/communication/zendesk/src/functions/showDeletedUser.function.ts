import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowDeletedUserInput = z.object({
  deleted_user_id: z.number().int().describe("The ID of the deleted user. Example: 35436"),
})

export const ShowDeletedUserOutput = z.object({
  deleted_user: z.object({
    active: z.boolean(),
    created_at: z.string(),
    email: z.string(),
    id: z.number().int(),
    locale: z.string(),
    locale_id: z.number().int(),
    name: z.string(),
    organization_id: z.number().int(),
    phone: z.string().nullable(),
    photo: z.record(z.string(), z.unknown()).nullable(),
    role: z.string(),
    separation: z.object({
      brand_id: z.number().int().optional(),
      scope: z.enum(["account", "brand"]).optional(),
    }).nullable().optional().describe("Brand separation information for the deleted user"),
    shared_phone_number: z.string().nullable(),
    time_zone: z.string(),
    updated_at: z.string(),
    url: z.string(),
  }).optional(),
})

export const showDeletedUser = pikkuSessionlessFunc({
  description: "Returns users that have been deleted but not permanently yet. See [Permanently Delete User](#permanently-delete-user).\n\n#### Allowed For:\n\n* Agents",
  input: ShowDeletedUserInput,
  output: ShowDeletedUserOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/deleted_users/{deleted_user_id}", data) as any
  },
})
