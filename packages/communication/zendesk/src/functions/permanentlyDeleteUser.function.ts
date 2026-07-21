import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PermanentlyDeleteUserInput = z.object({
  deleted_user_id: z.number().int().describe("The ID of the deleted user. Example: 35436"),
})

export const PermanentlyDeleteUserOutput = z.object({
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

export const permanentlyDeleteUser = pikkuSessionlessFunc({
  description: "Before permanently deleting a user, you must delete the user first. See [Delete User](/api-reference/ticketing/users/users/#delete-user).\n\nWARNING: Permanently deleting a user deletes all of their information. This information is not recoverable.\n\n#### Permanent user deletion rate limit\n\nYou can permanently delete 700 users every 10 minutes.\nThe rate limiting mechanism behaves as described in\n[Rates Limits](/api-reference/introduction/rate-limits/#monitoring-your-request-activity) in the API introduction.\nZendesk recommends that you obey the Retry-After header values.\n\n#### Allowed For\n\n* Admins and [agents in custom roles with permission](https://support.zendesk.com/hc/en-us/articles/4408882153882#topic_cxn_hig_bd) to manage end users or team members",
  input: PermanentlyDeleteUserInput,
  output: PermanentlyDeleteUserOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/deleted_users/{deleted_user_id}", data) as any
  },
})
